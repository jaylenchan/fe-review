const path = require('path')
const app = require('express')()
const httpServer = require('http').createServer(app)
const io = require('socket.io')(httpServer)

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/socket-io-client.html'))
})

io.on('connection', (socket) => {
  socket.on('chatEvent', (msg) => {
    console.log(msg)
    socket.send('msg=>', msg)
  })
})

httpServer.listen(3000, () => {
  console.log('app is listening 3000 port')
})
