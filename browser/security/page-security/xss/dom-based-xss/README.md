```ts
 DOM型的XSS是不需要服务器参与的。导致的原因是因为DOM结构被修改了。这是一种基于浏览器解析DOM的攻击。


 攻击输入："><script>while(true){alert("dom-based-xss")}</script>
 输入以上代码到input框中，">就会闭合示例中的a标签让代码脚本插入执行起来，从而引起xss攻击
```