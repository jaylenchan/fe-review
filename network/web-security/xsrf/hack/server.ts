import express from 'express'
import path from 'path'

const app = express()

app.use(express.static(path.resolve(__dirname, 'public')))

app.listen(3000, () => {
  console.log('黑客服务器启动中[3000]...')
})
