class SyncWaterfallHook {
  constructor(args) {
    this.args = args
    this.tasks = []
  }

  tap(name, task) {
    this.tasks.push(task)
  }

  call(...args) {
    const initTask = this.tasks.shift()
    const initResult = initTask(...args)
    this.tasks.reduce((result, curTask) => {
      result = curTask(result)
      return result
    }, initResult)
  }
}

const syncwaterfallhook = new SyncWaterfallHook(['num'])

syncwaterfallhook.tap('第一次的值', (num) => {
  console.log('第一次的值', num)
  return num + 1
})

syncwaterfallhook.tap('第二次的值', (num) => {
  console.log('第二次的值', num)
  return num + 1
})

syncwaterfallhook.tap('第三次的值', (num) => {
  console.log('第三次的值', num)
})

syncwaterfallhook.call(1)
