import express from 'express'
import path from 'path'

const app = express()

app.use(express.static(path.resolve(__dirname, 'public')))

const goods = {
  books: [
    {
      name: '变形记'
    },
    {
      name: ' 哆啦A梦'
    },
    {
      name: '汤姆索亚历险记'
    }
  ],
  electronic: [
    {
      name: 'ipad'
    },
    {
      name: 'iphone'
    },
    {
      name: '华为'
    }
  ]
}

app.get('/goods', (req, res) => {
  const { category } = req.query
  const curGoods = goods[category as keyof typeof goods]
  let detail = ''
  if (curGoods) {
    detail = curGoods
      .map(
        (item) => `
     <li>${item.name}</li>
     `
      )
      .join('')
  } else {
    detail = '不存在该分类的商品'
  }
  res.setHeader('Content-Type', 'text/html;charset=utf8')
  res.send(`
   <!DOCTYPE html>
   <html lang="en">
     <body>
       <h1>你选择的商品分类是${category}</h1>
       ${detail}
     </body>
   </html>
  `)
})

app.listen(8080, () => {
  console.log('服务器启动中[8080]...')
})
