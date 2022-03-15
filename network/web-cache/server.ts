// import bodyParser from 'body-parser'
import express from 'express'
// import path from 'path'

const app = express()

app.set('etag', false)
app.set('x-powered-by', false)
//app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({ extended: true }))
//app.use(express.static(path.resolve(__dirname, 'public')))

app.get('/cache', (_req, res) => {
  // res.setHeader('Cache-Control', 'no-cache')
  // res.setHeader('Content-Type', 'text/html;charset=utf8')
  res.setHeader('Etag', '777')
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
    <body>
       <div>No-Store</div>
    </body>
  </html>
  `)
})

app.listen(3000, () => {
  console.log('服务器启动在[3000]')
})
