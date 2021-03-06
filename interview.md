## 答题模板

- 实现技术
- 包含功能点
- 方案选型
- 实现思路

## 前端基础工程建设

1. 说说你为什么要搭建这个前端的统一环境？
   在我们的项目开发中，公司没有约束大家去使用统一的开发设备的。因此每个人开发的操作系统都不是太一样，有的人用windows，有的人用mac，也有的人用Linux。这样就导致了项目当中一些环境问题的产生，比如说：Node。因为大家的操作系统都不一定相同，导致了可能在Mac Intel下和Mac M1下Node环境就出现了问题。比如说16.13.0这个版本Mac Intel可以下载，而Mac M1架构的系统直接下载报错，进而导致node_modules下载也会报错。本质的原因就是因为系统的架构不同，导致Node的使用上在当时没法进行统一。为此，启发了我想要去做一个事情，一个什么样的事情呢？那就是利用容器化的方式分离因为系统的影响导致不同的系统前端开发的环境不相同的问题。
2. 具体描述下你是如何使用Docker+DevContainer去搭建前端统一开发环境的？
   - 前端统一的地方：规范统一、环境统一、工具统一
   - 环境优化
3. 请说下Docker+DevContainer搭建统一环境的原理？它是如何做到的？

## 易辅管理员后台

1. 介绍一下你这个项目1.0版本两个子系统的开发方式
   - 实现技术：项目1.0两个子系统是在一个项目当中进行开发的，（技术栈）是基于Vue2.0开发的具有两个html的多页项目。
   - 实现思路：一般项目当中我们都会有一个main.js作为构建打包的主入口。但是由于我开发的两个子系统在大体结构上是十分相似的，而在路由和数据状态管理上是不一样的。因此基于这种业务场景，综合考虑过后，我采用的方式是在这个main.js当中导出一个工厂方法initPage，这个工厂方法接收两个参数，一个是router，一个是store。这样子在我的两个子系统当中，都可以有一个自己的main.js，然后通过这个initPage工厂方法，去实现页面实例初始化。这么做的好处是，在代码上实现了最大程度的复用，同时对于每个系统又拥有了自己独立的路由和数据状态。剩下要做的就是每个子系统根据业务需求去开发相应的业务内容了。
   - 部署方式
     - 线下测试环境：线下测试部署上我们采用的依旧是静态资源和html分开部署。每个子系统部署的路径都不相同，其中`/home/www/res/admin-pc-wisdom/super`和`/home/www/res/admin-pc-wisdom/school`代表的磁盘路径就是两个子系统的部署路径，里头分别放置着静态资源文件。而`/home/www/web/pc/admin/school/index.html`和`/home/www/web/pc/admin/super/index.html`分别放置我们的html文件。

   - 为什么你的项目当中需要分别放置静态资源和html文件呢？
     因为我们的所有项目采用的部署策略都是：静态资源最终都是需要放CDN上边加速，而html一般都是去源服务器获取。放CDN上边的静态资源一般都是强缓存的，而html一般都是协商缓存或者压根就不缓存。所以在构建打包的时候，静态资源的public-path都会变成类似于`//wisdom-res.100efly.com/admin-pc-wisdom/static/css/chunk-004388a4.977fbfba.css`。
   - 你说到静态资源放CDN加速，能不能说下CDN的工作原理？
     - 用户向浏览器输入网站的域名：www.web.com，浏览器第一次发现本地没有DNS缓存，则向网站的DNS服务器请求；
     - 网站的DNS域名解析器设置了CNAME，指向了CDN域名：www.web.51cdn.com,于是请求就继续发给了CDN网络中的DNS负载均衡系统；
     - DNS负载均衡系统解析域名，把对用户响应速度最快的IP节点（CDN服务器）返回给用户；
     - 用户向该IP节点（CDN服务器）发出请求；
     - 由于是第一次访问，CDN服务器会向原web站点请求，并缓存内容；
     - CDN服务器将请求结果返回给用户。
   - 说说什么是强缓存和协商缓存？
     - 强缓存和协商缓存是web缓存当中的概念。其中强缓存是用户发起请求压根不用向服务器发送真正的请求，直接从浏览器本地缓存当中获取即可。而协商缓存是用户会向服务器发请求，服务器判断资源的新鲜度，然后做出判断：资源如果更改了，返回新资源，状态码200，如果没有更改直接返回304，告诉浏览器使用本地缓存。
2. 说下你的账号权限系统是如何设计的？
   - 实现技术：Vue-router路由守卫+递归
   - 包含功能点：登录功能+菜单权限+页面路由权限
   - 登陆功能：
      - 利用用户认证方式是jwt
      - 前端在header.Authorization = getToken()获取保存在本地的token
      - token具体保存在
   - 路由权限：
     - 利用vue-router的路由守卫beforeEach+afterEach配合完成
     - 在router.js当中对于constantRoutes是所有用户都肯定会加载到的路由。而asyncRoutes则是对部分有该路由权限的用户才能访问到。

   - token过期处理: 利用window自定义事件，发布订阅
     - window.addEventListenr('logout',() => {
       if(getToken()) {
          // token过期
         router.push('/login?logout=1')
         Message.alert('账号登陆已经失效')
       }
     })
    - axios.interceptors.response.use((res)=> {
        if(res.code === 40001) window.dispatch('logout')
     })

3. 说下App文件上传的实现思路
   - 实现技术：Blob.prototype.slice() + axios实现
   - 包含功能点：分片上传、进度条、中断上传
   - 实现思路：
     - 分片上传：使用Blobl.prototype.slice()对文件进行切片，设置一个cur不断计算切片的位置，最终生成一个切片数组。
     - 上传优化：这里跟后端沟通，也为了前端的优化，选取了4片，4片的并发上传优化。实现 [并发控制优化](typescript/promise/impl-parallel)
     - 进度条：利用axios的onUploadProgress事件，将每一片切片的loaded累加起来/文件的总大小。然后为了不断刷新总大小进度，需要在每一个切片当中实时计算progress的总上传总大小和文件总大小之间的比值
     - 中断上传：
      利用axios的cancelToken实现的。具体时利用createRequestList这个创建分片请求的函数直接添加一个cancelFns的属性，是一个数组。然后axios的cancelToken会有一个回调函数，函数接收一个fn，将这些fn放入createRequestList的cancelFns就OK了。
      使用的时候，设置一个取消按钮，以此遍历cancelfns中的fn取消即可
      ```js
       {
          cancelToken: new axios.CancelToken((cancelFn) => {
          if (!(createRequestList as any).cancelFns) {
            ;(createRequestList as any).cancelFns = []
          }
          ;(createRequestList as any).cancelFns.push(cancelFn)
        })
       }
      ```

## bingo pc2.2校园版

1. 说下你在这个项目当中碰到的难点，都是怎么解决的？
   - 背景：跟读类型当中有一个类型是文章跟读，由于题库给出的音频是完整的一篇文章，现在后端只能给到文章中的每一个句子的起始位置
   - 需求：现在给出了一篇文章的所有句子按照标签li取排列了，能够让文章在朗读的过程当中，在朗读某一句话的时候，能够让这一句话一致保持高亮，到下一句的时候就切换
   - 难点：一篇文章的朗读时不间断的，怎么样通过朗读的时刻配合后端给出的句子起始位置去实现相应的功能
   - 解决：通过audio的事件可以不断地获取当前朗读的时刻，将当前朗读的时刻curretTime跟句子起始位置去做不断对比，用一个数组startTimeList数组，找出那些比当前时刻要早的那些朗读时刻。最后从这些朗读时刻当中取最大值，再取出这个最大值所在的下标位置作为高亮序号，如何当前朗读的地方时这个地方，就让它高亮。
2. 说下你这个用户指引功能的实现思路？
   - 实现技术：项目当中用户指引功能是通过自定义指令的方式去实现的。
   - 功能点：需要实现不同的跟读模式拥有不同的指引内容
     - “自动跟读模式”指引，指引面板右下角有一个按钮，它会倒计时三秒后自动跳到下一个指引区域
     - “手动跟读模式”指引，指引面板右下角有一个按钮，点击它也可以实现跳转到下一个指引区域
   - 方案选型：
      - intro.js： 商用需要许可证，放弃
      - driver.js：很多issue没解决，第三方不可控bug
      - v-guid：满足自身业务，可定制，不会耦合业务场景，bug可及时追踪修复
   - v-guid设计结构：
   - v-guid实现思路：

3. 说下这个流程中央控制器的功能和实现思路？
   - 实现技术：发布订阅+compositionApi
   - 功能点：自动跟读+流程控制

## 易辅家长小程序

1. 看到你这里是参照了Axios架构结合Taro实现了类Axios API，是想解决什么问题呢？
2. 小程序的运行架构是怎么样的？

## 翼赛SDK

1. 项目中有说到联同客户端去制定业务桥接口，你制定过哪些接口？
   - 本地撤回隐私政策协议接口
   - 网络请求调用接口
2. 桥接jsBridge的原理有了解过吗？实现的方式你知道的都有哪些？
   - js调native：
     - native往window注入api：由前端直接调用api
     - js使用iframe.src发送，native拦截：由前端发送请求，让native拦截调用
   - native调js：
     - js api直接挂载到window，native可以直接调用
3. 不同种方式实现jsBridge的优缺点了解过吗？
4. 你开发的这个ReplaceSmartyPlugin的实现思路是怎么样的？
   - 问题：开发产出的最终dist当中的 index.html实际上是一个php-smarty模板，最终的解析还需要交给后端去做。在开发环境当中，这个模板又不太可能交给后端，只能另想办法。
   - 解决：利用htmlWebpackPluginBeforeHtmlProcessing和htmlWebpackPluginAlterAssetTags分别将相关的smarty语法链接修改成相关CDN或者开发环境的打包资源文件路径