class SyncHook {
  constructor(args /** ["param1", "param2"] */) {
    this.args = args
    this.tasks = []
  }

  tap(name, task) {
    this.tasks.push(task)
  }

  call(...args) {
    this.tasks.forEach((task) => {
      task(...args)
    })
  }
}

const synchook = new SyncHook()

synchook.tap('做第一件事', () => {
  console.log('做第一件事')
})

synchook.tap('做第二件事', () => {
  console.log('做第二件事')
})

synchook.call()
