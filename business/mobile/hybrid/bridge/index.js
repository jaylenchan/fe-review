import {
  isFuntion,
  isArray,
  isString,
  toColor,
  parseParams,
  resolveCallback,
  guid,
  now,
  noop
} from './utils'

const APP_CONTEXT = 'jscomm'
const APP_URL = 'ekwing:abc'
const BRIDGE_NAME = 'bridgeClass'

/**
 * Class representing a jsbridge.
 * @param {object} options
 * @param {object} [options.context=window] 运行时上下文
 * @param {boolean} [options.debug=false] 启动调试模式
 * @param {function} [options.debugHandler=console.log] 调试函数
 */
class Bridge {
  constructor ({
    context = window,
    debug = false,
    debugHandler = console.log
  } = {}) {
    this.hookMap = {}
    this.debug = debug
    this.debugHandler = debug ? debugHandler.bind(this) : noop

    if (!context[BRIDGE_NAME]) {
      context[BRIDGE_NAME] = this
    }
  }

  call(url) {
    const caller = document.createElement('iframe')
    caller.setAttribute('style', 'display:none;width:0;height:0;border:none;')
    caller.setAttribute('src', url)
    document.body.appendChild(caller)
    setTimeout(() => {
      document.body.removeChild(caller)
    }, 100)
  }

  /**
   * 扩展
   * @param {object} params - 扩展对象
   */
  extend (params) {
    for (const key in params) {
      const obj = params[key]
      this[key] = isFuntion(obj) ? obj.bind(this) : obj
    }
  }

  /**
   * 触发本地事件
   * @param {string} event - 本地事件名称
   * @param {string|object=} params - 事件回调参数
   */
  emit (event, params) {
    if (!isString(params)) {
      params = JSON.stringify(params)
    }

    if (window[APP_CONTEXT]) {
      // android
      this.debugHandler('debug[Android][toLocalEvent]', event, params)
      window[APP_CONTEXT].toLocalEvent(event, params)
    } else {
      // ios
      const url = `${APP_URL}?${JSON.stringify({event, params})}`
      this.debugHandler('debug[IOS][toLocalEvent]', url)
      this.call(url)
    }
  }

  /**
   * 以promise形式注册事件回调
   * @param {string} event 事件名称
   * @param {Promise.resolve|Promise.reject} action promise动作
   * @return {string} eventId 事件Id
   */
  register (event, action) {
    const eventId = `${event}-${guid()}`
    this.hookMap[eventId] = resolveCallback(action)
    return eventId
  }

  /**
   * 注册事件回调
   * @param {string} event 事件名称
   * @param {function} callback 事件回调
   * @param {boolean} autoGenerateHookId 是否自动生成hookId，传入false时hookId为event的值
   * @returns {string} eventId 事件Id
   */
  registerSync(event, callback, autoGenerateHookId = true) {
    const eventId = autoGenerateHookId ? `${event}-${guid()}` : event
    this.hookMap[eventId] = callback.bind(this)
    return eventId
  }

  /**
   * 注册事件钩子
   * @param {string} event 事件名称
   * @param {function} callback 事件回调
   * @return {function} clearer 事件清除器
   */
  registerHook (event, callback) {
    this.hookMap[event] = this.hookMap[event] || []
    const hook = callback.bind(this)
    this.hookMap[event].push(hook)
    return () => {
      this.hookMap[event] = this.hookMap[event].filter(_ => _ !== hook)
    }
  }

  /**
   * 由本地触发
   * @private
   * @param {string} event 事件名称
   * @param {string=} params 事件回调参数
   */
  toJsEvent (event, params) {
    const hook = this.hookMap[event]
    if (!hook) {
      const error = new Error(`hook[${event}] is undefined`)
      this.debugHandler(error)
      return false
    }
    params = parseParams(params)
    if (isFuntion(hook)) {
      hook(params)
      delete this.hookMap[event]
    } else if (isArray(hook)) {
      hook.forEach(h => h(params))
    }
    this.debugHandler(`debug[${event}][response]`, params)
  }

  /**
   * event[proxy] 通过本地代理请求
   * @param {object} params
   * @param {string} params.type 请求方法
   * @param {url} params.url 请求地址
   * @param {object} params.data 发送数据
   * @param {Promise<response>}
   */
  request ({
    type,
    url,
    data
  }) {
    return new Promise((resolve, reject) => {
      this.emit('proxy', {
        type,
        url,
        data,
        success: this.register('proxy', resolve),
        fail: this.register('proxy', reject)
      })
    })
  }

  /**
   * event[openView] 跳转本地页面
   * @param {object} params
   * @param {string} params.url 页面地址，使用全域名，intentData的className_xx的优先级高于url
   * @param {boolean} [params.titleBarVisible=false] 是否显示标题栏
   * @param {string} params.title 标题栏标题
   * @param {number} params.titleBarHeight 标题栏高度(px)
   * @param {string} params.statusBarColor 状态栏颜色
   * @param {string} [params.statusBarOpacity=1] 状态栏透明度
   * @param {object=} params.data 发送的数据，用来拼接url（不包含auth认证数据，不包含设备信息需要app拼接，包括：uid,author_id,token,client,v,is_http,driverCode,这些参数由本地拼接）；如果参数重名，不要覆盖data中的值为准。
   * @param {object=} params.intentData 跳转自定义view使用，具体参数需双方协定；非App相关的h5打开本地界面也在这里处理。已定义键值：className_android, className_ios, jump
   * @param {boolean} [params.retain=true] 是否将新开页面推入页面访问历史栈，用于back操作
   * @param {string} [params.animation=none] 入场动画，leftIn、rightIn、topIn、bottomIn、none
   * @param {boolean} [params.fullScreen=false] 是否全屏（不带电池状态栏）
   * @param {boolean} [params.isPortrait=false] 是否竖屏（需要js判断当前是竖屏还是横屏）
   * @param {function=} params.callback 成功回调
   * @param {boolean} [params.refresh=false] 是否在其他页面返回时需要刷新该界面的数据
   * @param {function=} params.afterRefresh 返回时，刷新界面数据后的回调
   */
  push ({
    url,
    titleBarVisible = false,
    title,
    titleBarHeight,
    statusBarColor,
    statusBarOpacity = 1,
    data,
    intentData,
    retain = true,
    animation = 'none',
    fullScreen = false,
    isPortrait = false,
    callback = noop,
    refresh = false,
    afterRefresh = noop
  }) {
    const params = {
      url,
      localTitleBar: titleBarVisible,
      title,
      titleBarHeight,
      data,
      intentData,
      retain,
      anim: animation,
      fullScreen,
      isPortrait,
      callBack: this.registerSync('openView', callback),
      needRefresh: refresh,
      refreshCallBack: this.registerSync('openViewRefresh', afterRefresh)
    }

    if (statusBarColor) {
      params.naviBarColor = toColor(statusBarColor, statusBarOpacity)
    }

    this.emit('openView', params)
  }

  /**
   * event[changeOpenViewData] 更改View中的data数据
   * @param {object} params
   * @param {string} params.url 更新后的url地址
   * @param {object} params.data 数据键值对
   */
  changeViewData ({url, data}) {
    this.emit('changeOpenViewData', {url, data})
  }

  /**
   * event[goback] 返回上一个页面
   */
  back () {
    this.emit('goback')
  }

  /**
   * {@link Bridge#playAudio playAudio}
   * @typedef playAudioCallback
   * @type {function}
   * @param {object} params
   * @param {'playing'|'paused'|'ended'|'error'} [params.status] playing: 播放、paused: 暂停、ended: 结束、error: 出错
   * @param {boolean} [params.currentSrc] 当前播放器播放的地址
   * @param {number} [params.duration] 音频时长(ms)
   * @param {number} [params.progress] 当前进度(ms)，needDetails为true才有，每隔0.1s回调一次
   */

  /**
   * event[playAudio] 操作音频
   * @param {object} params
   * @param {'play'|'stop'} [params.action='play'] play/stop 播放/停止
   * @param {string} params.src 音频地址，本地文件或者网络url
   * @param {boolean} [params.newPlayer=true] 是否创建新的播放器
   * @param {boolean} [params.pauseOthers=true] 是否暂停其他播放器
   * @param {number=} params.seekTime 播放开始的进度，单位为毫秒，默认为-1。如大于音频长度则不会播放，对type=stop无效
   * @param {boolean} [params.needDetails=false] 是否需要播放的详细信息，对type=stop无效
   * @param {boolean} [params.loop=false] 是否循环播放
   * @param {boolean} [params.playLocalFile=false] 是否优先使用本地提前下好的文件
   * @param {playAudioCallback} [params.callback] 更新回调，每隔0.1s回调一次
   */
  playAudio({
    action = 'play',
    src,
    newPlayer = true,
    pauseOthers = true,
    seekTime,
    needDetails = false,
    loop = false,
    playLocalFile = false,
    callback = noop
  }) {
    const event = 'playAudio'
    const hookId = `${event}-${guid()}`
    this.registerHook(hookId, callback)
    this.emit(event, {
      run: action,
      src,
      callBack: hookId,
      newPlayer,
      pauseOthers,
      seekTime,
      needDetails,
      loop,
      playLocalFile
    })
  }

  /**
   * {@link Bridge#getAudio getAudio}
   * @typedef getAudioResponse
   * @type {object}
   * @property {string} src 当前播放器播放的音频地址
   * @property {boolean} isPlaying 是否正在播放
   * @property {number} duration 音频时长(ms)
   */

  /**
   * event[playStatus] 获取音频播放状态
   * @param {string} src 音频地址，本地文件或者网络url
   * @return {Promise<getAudioResponse>}
   */
  getAudio (src) {
    return new Promise(resolve => {
      this.emit('playStatus', {
        src,
        callBack: this.register('playStatus', resolve)
      })
    })
  }

  /**
   * event[fetchLocalAudioSrc] 调用本地预加载音频
   * @param {array<string>} urls 包含所有音频地址的数组
   * @param {function} callback 更新回调，每0.1s更新一次，接收一个0-100的数据（下载进度）
   * @return {Promise<array<string|null>>} 包含本地所有音频地址的数组，若音频下载失败，对应url为null
   */
  fetchAudio ({ urls, callback }) {
    const event = 'fetchLocalAudioSrc'
    const hookId = `${event}-${guid()}`
    return new Promise((resolve, reject) => {
      const hook = ({ loadingFailed, loadingProgress, localAudioSrcArr }) => {
        if (loadingFailed) return reject({ status: 1 })
        if (loadingProgress <= 100) {
          callback(loadingProgress)
          if (loadingProgress == 100 && !loadingFailed && localAudioSrcArr) resolve(localAudioSrcArr)
          return
        }
        reject({ status: 2 })
      }
      this.registerHook(hookId, hook)
      this.emit(event, {
        oriAudioSrcArr: urls,
        callBack: hookId
      })
    })
  }

  /**
   * event[localVideoPlay] 调用浮层弹窗，下载音视频资源并播放
   * @param {object} params
   * @param {string} params.id 配音id
   * @param {string} params.dubbingId 唯一标识某题某学生某次配音的id(教师1.5版本添加)
   * @param {string} params.type 	播放类型，"1"：播放原视频，"2"：播放用户录音；如果合成了，直接播放合成的视频；未合成视频，需要同时播放用户的录音和视频
   * @param {string=} params.compoundAudio 合成音频
   * @param {string=} params.compoundVideo 合成视频
   * @param {string} params.video 视频
   * @param {string} params.videoBgm 视频背景音乐
   * @param {string} params.videoCover 视频缩略图
   * @param {object[]} params.sentence 用户的录音，必须按顺序
   * @param {string} params.sentence[].id 唯一标识
   * @param {string} params.sentence[].start 开始时间
   * @param {string} params.sentence[].duration 持续时间
   * @param {string} params.sentence[].audioUrl 录音服务器地址
   */
  playVideo ({id, dubbingId, type, compoundAudio, compoundVideo, video, videoBgm, videoCover, sentence}) {
    this.emit('localVideoPlay', {
      id,
      dubbingId,
      type,
      compoundAudio,
      compoundVideo,
      video,
      videoBg: videoBgm,
      videoImg: videoCover,
      sentence
    })
  }

  /**
   * {@link Bridge#getSystemInfo getSystemInfo}
   * @typedef SystemInfoResponse
   * @type {object}
   * @property {string} platform 平台，如IOS/Android
   * @property {string} osVersion 系统版本
   * @property {string} network 网络类型，0:无网络、WIFI:wifi网络、其他：mobile网络
   * @property {string} agent web内核
   * @property {string} token
   * @property {string} device 设备机型
   */

  /**
   * event[getSysInfo] 获取本地信息
   * @param {string} [str='platform osVersion network agent token device'] 需要返回的属性值，用空格隔开；默认属性值必带
   * @return {Promise<SystemInfoResponse>}
   */
  getSystemInfo (str) {
    return new Promise(resolve => {
      this.emit('getSysInfo', {
        request: str,
        callBack: this.register('getSysInfo', resolve)
      })
    })
  }

  /**
   * event[getLocalCache] 获取保存数据
   * @param {string} key 保存数据的key值
   * @returns {Promise<string|null>}
   */
  getCache (key) {
    return new Promise(resolve => {
      this.emit('getLocalCache', {
        key,
        callBack: this.register('getLocalCache', resolve)
      })
    })
  }

  /**
   * event[setLocalCache] 保存数据
   * @param {string} key 保存内容的key值，唯一标识
   * @param {string} value 保存内容
   * @param {object} options
   * @param {boolean} [options.cover=true] 是否覆盖
   * @param {boolean} [options.persistent=false] 是否持久储存
   */
  setCache (key, value, {cover, persistent}) {
    this.emit('setLocalCache', {
      key,
      value,
      cover,
      persistent
    })
  }

  /**
   * event[setNaviBar] 设置顶部状态栏背景颜色，仅限于iOS有用
   * @param {string} color 颜色值HexColor：#000000
   * @param {number} [opacity=1] 透明度0~1，1为完全不透明
   */
  setStatusBarColor (color, opacity = 1) {
    const params = toColor(color, opacity)
    this.emit('setNaviBar', params)
  }

  /**
   * event[statisticalEvent] 统计事件
   * @param {string} event 事件名称，xs_1_001（学生-xs、家长-jz、翼赛-ys 等），中间1代表版本号，001代表的是序号
   * @param {object} [data] 数据键值对，不能多层嵌套
   */
  log(event, data = {}) {
    this.emit('statisticalEvent', {event, maps: data})
  }

  /**
   * event[removeHistory] 移除当前页之前的访问历史
   * @param {number} number 移除历史记录数（从最新的历史记录开始移除）
   */
  removeHistory (number) {
    this.emit('removeHistory', number)
  }

  /**
   * {@link Bridge#showTimePicker showTimePicker}
   * @typedef TimerPickerResponse
   * @type {object}
   * @property {'confirmed'|'canceled'} status 用户确认/取消操作
   * @property {number} timeStamp 用户设定的时间戳(ms)，canceled时为0
   */

  /**
   * event[dtPicker] 调取本地时间的轮盘，返回用户选择的时间
   * @param {object} params
   * @param {number} [params.timeStamp=Date.now()] 轮盘默认选取时间(ms)
   * @param {number} params.minTime 轮盘显示的最小时间(ms)
   * @param {number} params.maxTime 轮盘显示的最大时间(ms)
   * @param {number} [params.step=1] 步长，给分设定5的步长(ios 只能设置 (1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30))
   * @param {boolean} [params.showMinute=true] 是否显示分钟
   * @return {Promise<TimerPickerResponse>}
   */
  showTimePicker ({
    timeStamp = now(),
    minTime,
    maxTime,
    step = 1,
    showMinute = true
  }) {
    return new Promise(resolve => {
      this.emit('dtPicker', {
        timeStamp,
        minTime,
        maxTime,
        minuStep: step,
        minuIsShow: showMinute,
        callBack: this.register('dtPicker', resolve)
      })
    })
  }

  /**
   * event[vipPop] 调用VIP弹窗
   */
  showVipModal () {
    this.emit('vipPop')
  }

  /**
   * {@link Bridge#share share}
   * @typedef ShareResponse
   * @type {object}
   * @property {'success'|'fail'|'cancel'} status 成功|失败|取消
   */

  /**
   * event[sharePage] 调用本地分享功能
   * @param {object} params
   * @param {string} params.type 分享到的平台（qq: share_qq、qq空间: share_qzone、微信: share_wechat、朋友圈: share_wechatmoments、微博: share_sinaweibo）
   * @param {string} params.title 分享信息标题
   * @param {string} params.url 分享信息地址
   * @param {string} params.imageURL 分享信息图片
   * @param {string} params.description 分享信息描述
   * @return {Promise<ShareResponse>}
   */
  share ({type, title, url, imageURL, description}) {
    return new Promise(resolve => {
      this.emit('sharePage', {
        type,
        title,
        url,
        imageURL,
        description,
        callBack: this.register('sharePage', resolve)
      })
    })
  }

  /**
   * event[visitor_pop] 调用游客弹窗
   */
  showVisitorModal () {
    this.emit('visitor_pop')
  }

  /**
   * {@link Bridge#getPhoneInfo getPhoneInfo}
   * @typedef PhoneInfoResponse
   * @type {object}
   * @property {string} operator 运营商，1：中国移动；2：中国联通；4：中国电信，查询失败为''
   * @property {string} location 归属地，精确到省、直辖市，查询失败为''
   * @property {string} msg 错误信息提示，如手机号码不正确、查询不到手机归属地
   * @property {string} status 查询状态，1：成功查询到归属地；-1：手机号码位数格式不正确；-2：未查询到归属地；-3：其它错误
   */

  /**
   * event[queryLocation] 查询手机号码信息
   * @param {number} number 要查询的手机号码
   * @return {Promise<PhoneInfoResponse>}
   */
  getPhoneInfo (number) {
    return new Promise(resolve => {
      this.emit('queryLocation', {
        number,
        callBack: this.register('queryLocation', resolve)
      })
    })
  }

  /**
   * {@link Bridge#showAddressBook showAddressBook}
   * @typedef AddressBookResponse
   * @type {object}
   * @property {string} number 通讯录电话号码
   * @property {string} userName 联系人姓名
   */

  /**
   * event[addressBook] 调用通讯录
   * @return {Promise<AddressBookResponse>}
   */
  showAddressBook () {
    return new Promise(resolve => {
      this.emit('addressBook', {
        callBack: this.register('addressBook', resolve)
      })
    })
  }

  /**
   * event[ek_login_failed] 登录失效
   * @param {object} params
   */
  loginFailed (params) {
    this.emit('ek_login_failed', params)
  }

  /**
   * hook[jsPageHide] 当本地app点击home键退出到手机主界面和电源键关闭手机触发
   * @param {function} callback 操作完成回调
   * @return {function} clearer 事件清除器
   */
  afterPageHide (callback) {
    return this.registerHook('jsPageHide', callback)
  }

  /**
   * hook[jsPageShow] app从界面关闭状态进入当前页面触发
   * @param {function} callback 操作完成回调
   * @return {function} clearer 事件清除器
   */
  afterPageShow (callback) {
    return this.registerHook('jsPageShow', callback)
  }

  /**
   * hook[goback] app点击andriod物理返回键触发
   * @param {function} callback 操作完成回调
   * @return {function} clearer 事件清除器
   */
  beforeBack (callback) {
    return this.registerHook('goback', callback)
  }

  /**
   * hook[gobackCB] app返回之后触发（主要用于返回之后的数据局部更新）
   * @param {function} callback 操作完成回调
   * @return {function} clearer 事件清除器
   */
  afterBack (callback) {
    return this.registerHook('gobackCB', callback)
  }
}

export default new Bridge()