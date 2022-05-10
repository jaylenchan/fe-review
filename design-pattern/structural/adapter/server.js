const express = require('express')

const app = express()

app.get('/api/user', (req, res) => {
  return res.json({
    id: req.query.id,
    name: 'jaylen'
  })
})

app.listen(3000, function () {
  console.log('server in 3000')
})
