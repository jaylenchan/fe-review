class SyncBailHook {
  constructor(args) {
    this.args = args
    this.tasks = []
  }

  tap(name, task) {
    this.tasks.push(task)
  }

  call(...args) {
    for (let i = 0; i < this.tasks.length; i++) {
      const result = this.tasks[i](...args)
      if (result) break
    }
  }
}

const syncbailhook = new SyncBailHook()

syncbailhook.tap('做第一件事', () => {
  console.log('做第一件事')
  return '太难了第一件事'
})

syncbailhook.tap('做第二件事', () => {
  console.log('做第二件事')
})

syncbailhook.call()
