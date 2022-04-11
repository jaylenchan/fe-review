# 模板引擎实现

```ts
let str = `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Template-Engine</title>
</head>

<body> `
arr.forEach((item) => {
  str += `<li>1</li>`
})
str += `</body>
</html>`
```

我们希望最终生成这样一串代码拿来执行，就能够完成我们模板引擎实现的结果。