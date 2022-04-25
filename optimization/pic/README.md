## 图片优化

- image-inline：其实就是变成base64嵌入html，比如webpack当中的url-loader就可以做这种事情，将不是很大的图片内嵌。

- 预加载：1. img src 然后设置display:none，此时就算display:none，也是发请求的，只是不渲染。然后业务场景就可以等需要再设置display:block展示，就会从缓存中读取图片。2. 使用new Image() .src = xxx做方式1同样的事情。3.通过ajax，不过有跨域的问题。