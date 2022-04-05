# Vue-Router

```js
  new Vue({
    router
  })
```

将router放入根的本意是想让所有子组件都能拿到router。

场景1: 不同ID的用户都需要用同一个用户组件渲染
解决方式：使用动态路径参数实现这个效果 - `{ path: '/user/:id ', component: User}`
其中，`:id`是一个变量。也就是当`/user/1`,`/user/2`都会匹配到`User`组件。
在渲染的组件当中如何获取`:id`中的`id` - 使用`this.$route.params.id`。
动态路径参数实现动态路由匹配所带来的问题：
如果从`/user/a`到`/user/b`，组件会被复用，那么组件的生命周期不会再次调用起对应的钩子。假如组件要在`mounted`
获取数据，那么只有第一次`/user/a`会调用钩子获取，而`/user/b`的时候就不会获取数据了。因为钩子没被调用。
解决方式1：使用`watch`去监测`this.$route`的变化，从`/user/a`到`/user/b`，`this.$route`会发生改变，于是就可以知道路由改变了。这时候就可以进行数据获取的操作了。
解决方式2: 使用路由守卫的钩子，`beforeRouteUpdate(to, from, next) {}`当路由改变的时候，需要做些啥

场景2: 捕获404界面。所有路由都不匹配的时候，就需要跳转404界面。应该如何做？
解决方式：利用`{ path: "*", component: 404 }` 解决。因为`*`可以匹配所有的路由，我们可以将完全对应的路由匹配到完全
对应的组件上，剩余的路由我们没法处理，直接指向404界面。`*`放在最后一个路由位置，当前面的没有匹配到的时候全部会被它吸收匹配。

场景3: 两种导航方式。`router-link`和编程式导航。即`<router-link :to="...">`和`router.push(...)`。
`router.push(param)`，`param`既可以是一个url字符串，也可以时一个描述地址对象。比如说`router.push('/user/a')`，或者是`router.push({ name: 'user-a'})`。其中url字符串更像是人的身份证，描述地址对象更像是一个人的相关信息。用身份证可以对应到一个人，用描述信息，名字也可以对应到那个人。
两个等价调用`<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>` == `router.push({ name: 'user', params: { userId: 123 } })`

场景3: 想要在一个路由当中对应展示的组件不止一个，比如layout布局，有`header``body``footer` 应该如何制作路由？
解决方式：使用命名视图，即给每一个`<router-view></router-view>`取一个名字，然后在`router`定义`routes` 的使用给到对应名字的`router-view`要展示什么样的组件即可。具体如下

```vue
  <router-view name="header"></router-view>
  <router-view name="body"></router-view>
  <router-view name="footer"></router-view>
```

```js
  const routes = [
     {
       path: '/',
       components: { // 注意，这里的components是复数
         header: Header, // key就是router-view的name，一一对应的
         body: Body,
         footer: Footer
       }
     }
  ]
```

场景4: 一般地我们在制作网站的时候都会想要输入`www.baidu.com`的时候，自动重定向跳转到`www.baidu.com/home`。应该如何制作路由？
解决方式：使用路由重定向功能，即

```js
  const routes = [
    {
       path: '/',
       redirect: {
         name: 'home'//这里的name要填写的就是底下 name: 'home'的'home'
       }
    },
    {
      name: 'home',
      path: '/home',
      component: Home
    }
  ]
```

场景5: 使用history模式，我们需要让服务端配合，无论啥路径都返回一个首页`index.html`。配置nginx如下：

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

但是正因为这么配置，不管啥路由都是返回这个。我们可能想要的是，用户在访问错误的路由的时候，我们应该返回一个404界面。这个时候应该这么做？
解决方式：交给前端处理，就是用通配符`*`加上一个404相关的页面。
