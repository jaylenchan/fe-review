## 文件合并

### 问题

- 首屏渲染问题
  - 如果a.js,b.js,c.js合并成了一个文件，如果三个文件都比较大就会导致整个文件可能会很大，这样子浏览器请求回来的时候会增加请求的时间。而由于现在的spa应用都是由前端js文件去生成一个应用，接管页面渲染的，那很可能一个vue项目当中如果js构建打包成一个文件，很可能这个bundle.js就会很大,而页面渲染又必须等到这个文件下载完成执行接管渲染页面的工作，于是首屏的渲染就会耗费长的时间
- 缓存失效问题
  - 正是由于a.js,b.js,c.js合并成了一个文件，那么由于webpack打包后会根据内容是否改变去生成新的hash作为文件名的构造，结果就是这三个文件任何一个改动了，我们的整个合并后的文件就会发生改变。而改变的话，浏览器本地缓存就直接失效了。但是其实我们本来对于其中的一些文件是压根不需要请求的，因为内容压根没变动，却因为合并成了一个文件导致只有一个文件内容改动引起整个合并的文件改变进而导致缓存失效的问题。

### 最佳实践

- 公共库合并：公共库和业务代码分离，公共库打包合并成一个文件，业务代码打包合并成一个文件。原因是：公共库不经常改动，而业务代码经常改动。这样子业务代码变动不会导致缓存失效并不会让公共库的缓存也一起失效。
- 不同页面的合并：对于spa应用，我们让首屏需要渲染参与的js文件进行合并即可，不需要让不参与首屏渲染的页面文件也合并进去。实际上，应该让某个页面被路由到的时候，才加载对应的js文件，而不是整个应用的文件都加载进去。实践上：对于不同的路由对应的页面的js文件进行合并，分割开不同路由对应的页面文件，每个页面只合并自己页面参与渲染的js文件。

### 合并解决的问题

- 解决浏览器请求并发上限问题，通过文件合并能在一定程度上减少请求并发数量。将多文件合并成一个文件就可以减少请求的数量，从而减少有的时候需要并发发起请求的数量。不过也可以配合域名分片的方式进一步解决并发请求的数量限制的问题。