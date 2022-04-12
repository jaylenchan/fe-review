const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')
const mime = require('mime')

/**
 * 缓存：这里指的是静态文件的缓存
 * 分类：强制缓存和对比缓存
 * 强制缓存：直接缓存放在浏览器，不会向服务器发起请求了
 * 对比缓存：会向服务器发请求
 */
/**
 * 如果服务器这边给客户端返回的是一个html，那么html会再次向服务器发请求获取其他静态资源文件
 */
/**
 * 当浏览器第一次向服务器发送请求的时候，这个请求一定不会被缓存
 * 比如：访问输入www.baidu.com，当你回车的时候，它一定会向服务器发请求html，不会走缓存
 * 假如连首页都缓存了，那么断网的情况下，它还是能够访问到，这是不太合理的。
 * 而当浏览器拿到html后，解析道还有其他资源的时候，就会继续向服务器发请求获取。
 */
const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true)
  /** 处理获取用户想要访问的资源的磁盘路径 */
  const filepath = path.join(__dirname, 'public', pathname)

  /** 通过req.url可以看到确实10s内对资源是缓存不访问js的 */
  console.log('route', req.url)
  /**
   * 开始设置缓存头，告诉客户端，缓存住返回的静态资源，十秒内就别过来找我了
   */
  res.setHeader(
    /** 设置的是相对时间 ， 从你浏览器当前访问的时间开始算10秒
     * Cache-Control常见值：
     * no-cache： 浏览器会缓存资源，但是每次请求资源都会向服务器发请求
     * no-store: 浏览器不缓存资源，每次请求资源都会向服务器发请求。这个就是直接走服务器，压根就没啥缓存
     *
     * no-cahce使用场景：指示浏览器把资源存储下，然后每次请求被设置了no-cache的文件时，都直接发到原始的服务器去
     * 这样做，可以到服务器那边看看资源是否被修改了，修改了就给新的回来，没有就直接304.那么如何知道修改了，就可以
     * 继续去利用last-modified/if-modfied-since和Etag/if-none-match两个头去使用才能知道是否被修改了。
     * 强制缓存失效后，也会发生上述的场景，即拿着last-modified/if-modfied-since和Etag/if-none-match去服务器，
     * 然后服务器对比内容，看是返回新文件，还是直接304
     */
    'Cache-Control',
    'no-cache'
  )

  fs.stat(filepath, (err, stats) => {
    /**
     * 如果报错了，找不到这个想要访问的路径
     * 那么就设置状态码 = 404
     * 然后返回Not Found
     */
    if (err) {
      res.statusCode = 404
      res.end('Not Found')
    } else {
      /** 如果找到了对应的路径,看看是不是一个普通文件 */
      if (stats.isFile()) {
        res.setHeader('Content-Type', `${mime.getType(filepath)};charset=utf-8`)
        fs.createReadStream(filepath).pipe(res)
      } else {
        //       /** 到这里说明访问的是一个目录，需要找目录下的index.html
        //        * 比如说：用户直接访问的是localhost:3000/，
        //        * 那么由于路由/对应的磁盘public，于是应该返回public下的index.html
        //        */
        const indexHtml = path.join(filepath, 'index.html')
        fs.access(indexHtml, (err) => {
          if (err) {
            res.statusCode = 404
            res.end('Not Found')
          } else {
            res.setHeader('Content-Type', `text/html;charset=utf-8`)
            fs.createReadStream(indexHtml).pipe(res)
          }
        })
      }
    }
  })
})

server.listen(3000, () => {
  console.log('server is listening port 3000')
})
