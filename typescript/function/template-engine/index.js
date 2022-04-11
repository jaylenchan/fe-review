/**
 * 模板引擎的实现：new Function + with
 * webpack-loader\vue模板底层的原理都是：使用字符串拼接的方式拼接出我们想要的代码拿来执行
 */

const fs = require('fs')
const path = require('path')
const util = require('util')

const readFile = util.promisify(fs.readFile)

class Ejs {
  async renderFile(filename, data) {
    let content = await readFile(filename, 'utf8')
    /** 注意⚠️：这里正则要取消贪婪，要不然这个 <%=name%> <%=age%>整个都会匹配到
     * 即： <%=(name%> <%=age)%> 就是name%> <%=age
     */
    content = content.replace(/<%=(.+?)%>/g, function (...args) {
      return '${' + args[1] + '}'
    })

    /** 其实就是拼接出代码，最终把那段代码执行起来 */
    let head = 'let str = "";\nwith(obj){\nstr+=`'
    /** 用正则捕获出相关的部分做替换，然后将替换后的template赋值到body身上
     * body其实就是处理过后的整个html:
     * <!DOCTYPE html>
     * <html>....</html>
     */
    let body = content.replace(/<%(.+?)%>/g, function (...args) {
      // 第一次捕获到： arr.forEach((item) => {
      // 于是需要继续添加字符串 str+=`
      // 第二次捕获到 item
      // 于是需要继续添加字符串 str+=`
      // 第三次匹配到 }
      // ⚠️：处理的流程是：当正则定位到<%arr.forEach((item) => { %>的时候，就捕获出arr.forEach((item) => {
      // 同时要注意一点，我们要记得让arr.forEach((item) => {开头添加上`,用来闭合之前的str+=`。然后继续下一次的str+=`
      return '`\n' + args[1] + '\nstr +=`'
    })
    let tail = '`\n} \n return str'
    const templateFunc = new Function('obj', head + body + tail)
    return console.log(templateFunc(data))
  }
}

const ejs = new Ejs()

ejs.renderFile(path.resolve(__dirname, 'template.html'), {
  name: 12,
  age: 13,
  arr: [1, 2, 3]
})
