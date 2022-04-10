const Websocket = require('ws')

const wsServer = new Websocket.Server({ port: 3000 })

wsServer.on('connection', (ws) => {
  /** 接收客户端传递过来的消息 */
  ws.on('message', (msg) => {
    console.log(msg)
  })

  /** 主动发送消息给客户端 */
  ws.send('Message from server')
})
