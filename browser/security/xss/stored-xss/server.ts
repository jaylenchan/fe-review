import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.resolve(__dirname, 'public')))

const comments = [
  {
    username: '章三',
    content: '我是李思',
    avatar: 'https://avatars.githubusercontent.com/u/72691225?v=4',
    time: new Date().toLocaleString()
  },
  {
    username: '帅到没祖先',
    content: '我宣布abcd',
    avatar: 'https://avatars.githubusercontent.com/u/94287306?v=4',
    time: new Date().toLocaleString()
  },
  {
    username: 'Ruster',
    content: 'what the fuck?',
    avatar: 'https://avatars.githubusercontent.com/u/94676967?s=200&v=4',
    time: new Date().toLocaleString()
  }
]
// 这个是获取所有当前评论的api接口
app.get('/api/comments', (_req, res) => {
  res.json({
    code: 0,
    data: comments
  })
})

app.post('/api/comments', (req, res) => {
  const comment = req.body
  comments.push({
    username: comment.username,
    content: comment.content,
    avatar: 'https://avatars.githubusercontent.com/u/72691225?v=4',
    time: new Date().toLocaleString()
  })
  res.json({
    code: 0,
    data: {}
  })
})

app.listen(8080, () => {
  console.log('服务器启动中[8080]...')
})
