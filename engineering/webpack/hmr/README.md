## 理解打包后的`main.js`

打包后的main.js的结构其实是一个iife自执行函数：

```js
(function(modules) {
  
}({
  './src/index.js': function() {}
}))
```

函数的参数是一个modules，实参传递的其实就是一个对象。这个modules对象里头key是模块相对路径，value是函数）。

在自执行函数里头，`var installedModules = {}`是模块的缓存，其中key就是模块的ID，value就是模块export导出的对象

webpack自己内部实现了一个cjs规范，类似于commonjs的require方法，叫做__webpack__require。
