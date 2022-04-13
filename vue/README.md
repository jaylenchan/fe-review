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

## 面试题

1. vue2-diff算法的原理？
   - diff实现利用了递归+双指针
   - 首先判断是不是同一个元素，不是同一个元素直接替换
   - 如果是同一个元素
     - 比对属性，看看属性是否相同。
     - 比对子元素：
       - 老的有儿子，新的没有儿子。直接删除老儿子
       - 老的没儿子，新的有儿子。递归添加创建儿子
       - 如果是文本的情况，那就创建文本
       - 老的有儿子，新的有儿子。利用双指针，头头比较，尾尾比较，头尾比较，尾头比较。对比查找之后进行复用。

2. vue中key的作用和原理
   - vue在patch过程中会利用到这个key去判断两个虚拟节点是否相同，如果相同的话，就可以直接复用老的节点。那如果没有key的话，就不好判断了，这就会导致更新的时候出错。因此在实际工程上，遍历的时候要记得给上一个key

3. vue2中是如何检测数组变化的
   - vue2中没有使用对数组当中的每一项进行拦截，而是选择重写数组，比如说push,splice等数组方法。不过如果数组里头的元素是对象的话，还是会使用Object.defineProperty进行递归数据劫持。
   数组的长度和索引的变化是没办法监控的。

4. nextTick在什么地方会使用到？
   - 使用nextTick回调函数，在下一次DOM更新循环结束之后，执行nextTick中的回调函数。一般用在DOM操作完成后，立马想要获取更新后的DOM和相关的DOM数据。
   - 为啥有这个东西，是因为vue中的视图更新是异步的，使用nextTick就可以保证用户定义的逻辑在更新之后执行起来。

5. nextTick实现原理？
  
  
6. 为什么Vue要使用异步渲染？
   - 因为如果不采用异步更新，那么每次更新数组都会对当前组件进行重新渲染。因此为了性能考虑，vue会在本轮数据更新之后，再去异步更新视图。