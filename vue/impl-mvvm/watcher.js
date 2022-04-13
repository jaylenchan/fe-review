/**
 * 给需要变化的元素都增加一个观察者，当数据变化的时候执行对应的方法
 * <input v-model="message"/> 这个元素使用了message
 * data = {
 *   message: 1
 * }
 * 当data.message = 2时，应该修改input中的值。这个修改的操作交给watcher去做
 */
class Watcher {
  constructor(vm, expr, cb) {
    this.vm = vm
    this.expr = expr // v-model = "message"这个message就是expr
    this.cb = cb

    // 当watcher实例创建的时候就会执行构造函数，当执行构造函数的时候就会执行getoldVal,
    // 当执行getOldVal的时候，就会将wactcher实例放到Dep.target身上
    this.value = this.getOldVal()
  }
  getVal(vm, expr) {
    expr = expr.split('.')
    /** [message, a] 不断递归获取vm.$data['message']['a']*/
    return expr.reduce((preVal, curKey) => {
      return preVal[curKey]
    }, vm.$data)
  }
  getOldVal() {
    Dep.target = this // 将当前的watcher实例给Dep的target
    /**
     * 在这个地方，由于会去实例获取值，即vm[expr]
     * 就会触发getter方法
     */
    const value = this.getVal(this.vm, this.expr)
    Dep.target = null
    return value
  }
  update() {
    const newValue = this.getVal(this.vm, this.expr)
    const oldValue = this.value
    if (newValue !== oldValue) {
      this.cb(newValue)
    }
  }
}

class Dep {
  constructor() {
    // 订阅的数组
    this.subs = []
  }

  addSub(watcher) {
    this.subs.push(watcher)
  }

  notify() {
    if (this.subs.length > 0) {
      this.subs.forEach((watcher) => {
        watcher.update()
      })
    }
  }
}
