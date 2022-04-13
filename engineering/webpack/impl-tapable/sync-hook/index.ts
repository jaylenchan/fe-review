import SyncHook from './syncHook'

const syncHook = new SyncHook(['name'])

syncHook.tap('第一次', (name: string) => {
  console.log('第一次 name', name)
})

syncHook.tap('第二次', (name: string) => {
  console.log('第二次 name', name)
})

syncHook.call('Jaylen Chan')
