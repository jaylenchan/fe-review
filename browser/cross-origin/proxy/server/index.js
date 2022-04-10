const express = require('express')
const http = require('http')

const app = express()

app.get('/api/user', (req, res) => {
  res.json({
    code: 0,
    msg: 'Cross-Origin By Proxy Successfully!'
  })
})

app.listen(3000, () => {
  console.log('server is listening port 3000...')
})
