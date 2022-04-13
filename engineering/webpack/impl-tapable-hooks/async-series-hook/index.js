class AsyncSeriesHook {
  constructor(args) {
    this.args = args
    this.tasks = []
  }

  tapAsync(name, task) {
    this.tasks.push(task)
  }

  callAsync(...args) {
    const finalCb = args.pop()
    const next = () => {
      const task = this.tasks.shift()
      if (!task) return finalCb()
      task(...args, next)
    }

    next()
  }

  tapPromise(name, task) {
    this.tasks.push(task)
  }

  promise(...args) {
    const task = this.tasks.shift()
    const p1 = task(...args)
    return this.tasks.reduce((curP, curTask) => {
      curP = curP.then(() => curTask(...args))
      return curP
    }, p1)
  }
}

// const asyncserieshook = new AsyncSeriesHook(['name'])

// asyncserieshook.tapAsync('第一件事', (name, cb) => {
//   setTimeout(() => {
//     console.log(name, '第一件事')
//     cb()
//   }, 1000)
// })
// asyncserieshook.tapAsync('第二件事', (name, cb) => {
//   setTimeout(() => {
//     console.log(name, '第二件事')
//     cb()
//   }, 1000)
// })
// asyncserieshook.callAsync('jaylen', () => {
//   console.log('end')
// })

const asyncserieshook1 = new AsyncSeriesHook()

asyncserieshook1.tapPromise('第一件事', (name, cb) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(name, '第一件事')
      resolve()
    }, 1000)
  })
})
asyncserieshook1.tapPromise('第二件事', (name, cb) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(name, '第二件事')
      resolve()
    }, 1000)
  })
})
asyncserieshook1.promise('jaylen').then(() => {
  console.log('end')
})
