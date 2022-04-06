import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import path from 'path'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.resolve(__dirname, 'public')))

type IUser = {
  username: string
  password: string
  balance: number
}

// 模拟数据库users
const users = [
  {
    username: 'a',
    password: 'a',
    balance: 1000
  },
  {
    username: 'b',
    password: 'b',
    balance: 1000
  }
]

const sessions = {} as Record<string, any>

app.post('/api/login', (req, res) => {
  const { username, password } = req.body

  function getUser(): IUser | null {
    for (let i = 0; i < users.length; i++) {
      if (
        (users[i] as IUser).username === username &&
        (users[i] as IUser).password === password
      ) {
        return users[i] as IUser
      }
    }
    return null
  }

  const user = getUser()
  if (user) {
    // 登录成功,设置cookie和session
    const sessionId = `session-${Date.now() + Math.random() * 1000}`
    sessions[sessionId] = {
      user
    }
    res.cookie('sessionId', sessionId)
    res.json({
      code: 0
    })
  } else {
    res.json({
      code: 1,
      error: '用户名或密码错误'
    })
  }
})

app.get('/api/userinfo', (req, res) => {
  const session = sessions[req.cookies.sessionId]

  if (session && session.user) {
    res.json({
      code: 0,
      user: session.user
    })
  } else {
    res.json({
      code: 1,
      error: '用户未登录'
    })
  }
})

app.post('/api/transfer', (req, res) => {
  const session = sessions[req.cookies.sessionId]
  console.log('session=>', req.cookies.sessionId)
  if (session && session.user) {
    let { target, amount } = req.body
    amount = isNaN(amount) ? 0 : Number(amount)
    for (let i = 0; i < users.length; i++) {
      if ((users[i] as IUser).username === session.user.username) {
        ;(users[i] as IUser).balance -= amount
      } else if ((users[i] as IUser).username === target) {
        ;(users[i] as IUser).balance += amount
      }
    }
    res.json({
      code: 0
    })
  } else {
    res.json({
      code: 1,
      error: '用户未登录'
    })
  }
})

app.listen(8080, () => {
  console.log('银行服务器启动中[8080]...')
})
