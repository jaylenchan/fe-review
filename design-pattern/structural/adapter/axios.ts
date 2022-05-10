function xhr(config: any) {
  const { url, method } = config
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()
    request.open(method, url)
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        if (request.status === 200) {
          resolve(request.responseText)
        }
      } else {
        reject('请求失败')
      }
    }
    request.send()
  })
}

function http(config: any) {
  const http = require('http')
  const urlTool = require('url')
  const { url, method } = config
  const urlObj = urlTool.parse(url)
  return new Promise((resolve, reject) => {
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.path,
      method
    }
    const req = http.request(options, function (response: any) {
      let chunks: any[] = []
      response.on('data', function (chunk: any) {
        chunks.push(chunk)
      })
      response.on('end', function () {
        const result = Buffer.concat(chunks).toString()
        resolve(result)
      })
    })
    req.on('error', function (err: any) {
      if (err) {
        reject(err)
      }
    })
    req.end()
  })
}

function getDefaultAdapter() {
  let adapter

  if (typeof XMLHttpRequest !== 'undefined') {
    adapter = xhr
  } else if (typeof process !== 'undefined') {
    adapter = http
  } else {
    throw new Error('adapter error')
  }

  return adapter
}

function axios(config: any) {
  const adapter = getDefaultAdapter()

  return adapter(config)
}

axios({
  url: 'http://localhost:3000/api/user?id=1',
  method: 'GET'
}).then(
  (res: any) => console.log(res),
  (err: any) => console.error(err)
)
