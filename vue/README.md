# Vue

```js
import App from './App.vue'
new Vue({
  render: (h) => h(app)
})
```

`render: (h) => h(app)`执行完毕render函数之后返回的是一个虚拟的dom，而不是真实的dom。
`import App from './App.vue'`中的App也不是一个真实的组件，它只是一个描述组件的对象。它就是

```vue
 {
   name: 'App',
   components: {xxx},
   render() {}
 }
```

并不是一个真实的DOM。在Vue内部会把这个对象转换成如下：

```js
const AppConstructor = Vue.extend(
  {
   name: 'App',
   components: {xxx},
   render() {}
 }
)
const appComponent = new AppConstructor() // 这里才是创建了一个组件的额实例
```
