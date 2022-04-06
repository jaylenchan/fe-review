```ts
//正常情况：
http://localhost:8080/goods?category=books
http://localhost:8080/goods?category=electronic
//异常情况：
http://localhost:8080/goods?category=<script>alert(1)</script>

反射型XSS示例：用户在浏览器端输入查询参数category=xxx，就可以在网页当中展示出当前输入的category分类的名字是xxx。正常输入没啥问题，结果有天黑客往网页地址栏的categroy查询参数使坏，给catagory参数注入的值是一个script脚本。于是这个参数被发送给了服务器，服务器代码里头需要拿到这个参数值，放入网页html当中。由于这个参数值是一个脚本不是一个category正常值，因此这个<script>alert(1)</script>就被发送回用户的浏览器，在用户浏览器打开html的同时被执行起来了。

## 反射的重点在于，用户输入的参数会重新在网页中展示回来。
## 反射型XSS，服务器是不会存储攻击的脚本的，直接返回。
```