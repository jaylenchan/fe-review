# Vue-Router-Source

## Vue-Router运行流程

1. `Vue.use(VueRouter)`，然后调用`VueRouter.install`方法，进入install方法后做了如下事情：
   - `registerComponent`负责注册`router-link`和`router-view`两个全局组件
   - `injectRouterToAllComponents`负责往每一个vue组件身上mixin一个`beforeCreate`钩子，这个钩子做了两件事：1.利用根的router属性，然后向所有子组件注入根的router属性。2.在根组件处理注入的同时，利用根组件的router路由器的init方法传入根组件进行路由器router初始化。

2. `new VueRouter()`，同时传入用户自定义的routes路由表。于是调用起Vue Router的构造函数，里头做了如下的事情：
   - 利用用户自定义的routes路由表交给`createMatcher`创建出matcher匹配器。

3. 当router实例创建完毕后，导出给根所在的js文件，于是`new Vue({ router })`创造出了根组件。进而触发了根组件的beforeCreate生命周期钩子。于是进入钩子，判断是否存在router属性（{router}这个对象其实就是$options）
`this.$options.router`存在，所以进入`if`分支语句，创建出两个新的属性`_routerRoot`和`_router`，其实就是根自己和router实例。最后使用router实例进行初始化操作`this._router.init(this)`。  

## Vue-Router的使用

1. 在项目当中`router/index.js`引入Vue-router插件，使用Vue-router插件`Vue.use(VueRouter)`
2. 用户自定义routes路由表，作为Vue-Router构建实例需要用到的参数routes。
3. 构建实例`new VueRouter({routes})`，并且传入一份路由器配置对象，然后将routes作为配置对象的属性放入
4. 将创建出来的路由器router导出，在app入口`index.js`当中`new Vue({ router })`导入vue的根组件。

## Vue-Router本质

vue-router本质是一个vue插件，而所有的vue插件按照vue插件规范需要提供一个install的接口实现，install是一个方法。
（问题1: 如何实现一个vue插件？）在vue注册插件的时候，会默认调用插件对象身上的install方法，或者该插件本来就是一个install函数。vue-router插件的install方法是挂在VueRouter类上的，因为在外头注册插件的时候是使用`Vue.use(VueRouter)`)。

## install方法

install方法在实现上一般都是拿来定义一些全局使用的内容。比如指令，全局组件，或者给原型扩展方法
instal的执行，做了如下事情：

1. 注册两个全局组件。一个是用于导航的`router-link`，一个是用于匹配路由渲染的`router-view`。

## Vue-Router

1. vue-router要接收一个配置对象
2. 配置对象里头含有：routes属性：这个route是用户使用的时候自定义的路由配置，可以配置什么样的路由展示什么样的组件。

## `new Vue({ router })`做了啥？

将router作为根的属性，this.$options.router。可是这样只能够在根组件上获取到router。问题：如何让所有组件获取到router？
方式1：直接讲router挂载到Vue原型上，可是这样一来Vue的所有实例都会有router了。我们想要`new Vue({router})`，而再次
`new Vue()`只要我们不传入router就没有router。新旧vue实例没有任何关联。但是按照我们现在的做法就会有污染了。
方式2: 借助vue组件创建的生命周期（父组件会先创建，子组件再创建。子组件先挂载，然后父组件才挂载）配合Vue.mixin解决。由于一开始肯定只有vue的根实例上有`router`属性（因为`new Vue({ router })`）。而利用Vue.mixin给所有vue组件包括根实例和所有子组件注入beforeCreate生命钩子，判断是否组件是有router属性，如果有肯定是这个根实例。

## router-link实现

`<router-link to="/home">首页</router-link>`其中“首页”的放置形式其实就是放入插槽中。所以router-link在实现上应该是`this.$slots.default`获取到“首页”这个字符串。
