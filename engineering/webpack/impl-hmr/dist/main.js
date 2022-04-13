;(function (modules) {
  /**
   * 缓存
   */
  var installedModules = {}

  /**
   * webpack自己实现的require方法（跟cjs的差不多）
   */
  function __webpack_require__(moduleId) {
    /**
     * 判断require的模块是不是在缓存中有了
     * 有的话直接返回
     */
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports
    }
    /**
     * 当缓存中不存在指定的模块时，创建一个新的模块，叫做module
     * 同时用模块id（moduleId）作为key，将新模块存入缓存当中
     * 一个创建出来的模块module具备以下属性：
     * i: 其实就是模块的id
     * l: 表示该模块是否已经初始化或者说加载了
     * exports: 表示这个模块导出的对象
     */
    var module = (installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    })

    /**
     * modules {
     *  './webpack/hmr/index.js': function(module，module.exports,__webpack_require__) {}
     * }
     *
     * 所以其实这一步是执行模块的方法，其中：
     * './webpack/hmr/index.js'模块函数内部的this指向module.epxports
     * './webpack/hmr/index.js'模块函数接受三个参数：module(新创建的模块)，module.exports(新创建模块的导出对象),__webpack_require__（require方法本身，其实这个地方很像next）
     */
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__)

    /**
     * 重新标志下这个模块的加载状态，设置为已经加载
     * 那其实就是将moduleId对应的module函数执行一次就被称作加载
     */
    module.l = true

    /**
     * 一切搞定后，返回module.exports，就是一个模块的导出对象
     */
    return module.exports
  }

  /**
   * 往webpack自定义的require方法身上添加c属性：c其实就是缓存对象installedModules
   * c = installedModules {
   *      './webpack/hmr/index.js' : {
   *        i: './webpack/hmr/index.js',
   *        l: true,
   *        exports: {}
   *     }
   * }
   */
  __webpack_require__.c = installedModules

  /**
   * 加载'./webpack/hmr/index.js'入口模块
   */
  return __webpack_require__((__webpack_require__.s = './webpack/hmr/index.js'))
})({
  './webpack/hmr/index.js': function (module, __webpack_exports__, __webpack_require__) {
    var _title__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      './webpack/hmr/title.js'
    )
    const root = document.getElementById('root')
    function render() {
      const title = require('./title')
      root.innerHTML = _title__WEBPACK_IMPORTED_MODULE_0__['default']
    }
    render()
  },

  './webpack/hmr/title.js': function (module, __webpack_exports__, __webpack_require__) {
    __webpack_require__.r(__webpack_exports__)
    __webpack_exports__['default'] = 'hello'
  }
})
