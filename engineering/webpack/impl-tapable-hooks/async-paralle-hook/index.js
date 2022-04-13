class AsyncParalleHook {
  constructor(args) {
    this.args = args
    this.tasks = []
  }

  tapAsync(name, task) {
    this.tasks.push(task)
  }

  callAsync(...args) {
    // 拿出最终的函数
    const finalCb = args.pop()
    let index = 0
    const done = () => {
      // index表示执行了几个任务了
      if (this.tasks.length === ++index) {
        finalCb()
      }
    }

    this.tasks.forEach((task) => {
      task(...args, done)
    })
  }

  tapPromise(name, task) {
    this.tasks.push(task)
  }

  promise(...args) {
    const tasks = this.tasks.map((task) => {
      return task(...args)
    })
    return Promise.all(tasks)
  }
}

const asyncparallehook1 = new AsyncParalleHook(['name'])

asyncparallehook1.tapAsync('做第一件事', (name, cb) => {
  setTimeout(() => {
    console.log('做第一件事')
    cb()
  }, 2000)
})

asyncparallehook1.tapAsync('做第二件事', (name, cb) => {
  setTimeout(() => {
    console.log('做第二件事')
    cb()
  }, 2000)
})
asyncparallehook1.callAsync('jaylen', () => {
  console.log('end')
})

const asyncparallehook = new AsyncParalleHook(['name'])

asyncparallehook.tapPromise('做第一件事', (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('做第一件事')
      resolve()
    }, 2000)
  })
})
asyncparallehook.tapPromise('做第二件事', (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('做第二件事')
      resolve()
    }, 2000)
  })
})
asyncparallehook.promise('jaylen').then(() => {
  console.log('end')
})
