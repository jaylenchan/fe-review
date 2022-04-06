## Cache-Control

### 可缓存性：指定哪些地方可以进行缓存

```shell
Cache-Control: public 
# http请求经过的http代理服务器和http发起的客户端浏览器都可以对返回内容进行缓存。
```

```shell
Cache-Control: private
# 只有http发起的客户端浏览器才可以对返回内容进行缓存。
```

```shell
Cache-Control: no-cache
# 任何一个节点（http代理服务器和客户端浏览器）可以使用本地的缓存，但是需要在使用之前，去服务器咨询一次是不是真的可以使用缓存。
```

### 到期: 指定资源缓存啥时候到期

```shell
Cache-Control: max-age=<seconds>
# 使用max-age缓存的内容要经过多少秒到期。
```

### 重新验证

```shell
Cache-Control: must-revalidate
# 当使用了max-age=<seconds>时，再多加一个must-revalidate的意思是，如果max-age到期了，那么一定要重新把请求发给服务器验证我们的资源是不是真的过期了。
```

### 其他

```shell
Cache-Control: no-store
# 任何一个节点（http代理服务器和客户端浏览器）都不使用本地的缓存，永远都要发请求给服务器，从服务器拉取新的内容。
```

### 缓存强度

```shell
最强：Cache-control: max-age=3600
次强：Cache-control: max-age=3600 no-cache
最弱：Cache-control: max-age=3600 no-store
```

强缓存强在浏览器发出去的请求不会向服务端发起，而是直接在浏览器本地缓存中寻找相关缓存文件去进行资源获取。这有个缺点就是：如果要是服务端的资源更新了，浏览器依旧走本地缓存那咋办？

所以要想办法解决这个问题，让浏览器能够感知到服务端发生变化了。



## Last-Modified/If-Modified-Since

利用last-Modified/If-Modified-Since就可以让浏览器拥有感知服务端资源发生变化的能力。使用这个header组合常常要配合Cache-Control一起使用。如果Cache-Control的max-age没过期就用本地缓存，如果过期了就使用last-Modified/If-Modified-Since去服务器协商。

这有个缺点：如果文件内容压根没变，但是日期过期了，If-Modified-Since过来服务器协商的结果就是返回新的响应文件，跟本地缓存一样。这是不合理的额。另外一个缺点是服务端有时候没法获取足够精确的文件修改时间。



## ETag/If-None-Match

利用ETag/If-None-Match就可以解决last-Modified/If-Modified-Since产生的问题。ETag的本质就是一个有关于文件的hash值。只有文件内容改变的时候，这个值才会发生变化。所以可以解决问题：【如果文件内容压根没变，但是日期过期了，If-Modified-Since过来服务器协商的结果就是返回新的响应文件，跟本地缓存一样。】