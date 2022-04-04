![img](../../../pic/Web开发流程图.png)
## 总览

`raceapp`是**翼赛sdk答题页**的实现项目。

## 项目概述

- 开发模式：**前后端混合**

- 业务技术：**Avalon+JS+JSBridge+Css**

- 项目地址：

- 磁盘路径：

  ```shell
  ## html主页
  raceapp/views/html/mapi/1.2/exam/load_exam_test.html
  
  ## 静态资源
  raceapp/resource/mapi/res/js/student/exam
  ```

## 常见问题

### `competition-app`如何进入`raceapp`的？

学生从**翼赛SDK**进入比赛或者进入练习开始，你看到的界面就是**答题页**了。从项目角度来说，如果你想要知道如何从`competition-app`跳转到`raceapp`的话，请你来到`competition-app`中的`src/views/race-question/official/index.js`这个文件下，进入文件搜索`navigateToQuestionPage`，正是这个函数作为通往`competition-app`到`raceapp`的桥梁，内部其实调用了一个桥接口`this.$bridge.sdkStartRace`。



### 答题页首页如何链接答题页JS文件的？

在raceapp当中的`raceapp/views/html/mapi/1.2/exam/load_exam_test.html`这个文件就是翼赛答题页的首页，将代码拉到整个文件的最底，你可以看到如下代码

```js
	/** 如果load_type是1 - 即时正式竞赛 - 走主文件exam_main_new.js*/
	if (GLO_INFO.load_type == 1) {
		require(['exam/exam_main_new']);
	} else {/** 否则load_type是模拟练习的话 - 走主文件exam_main.js*/
		require(['exam/exam_main']);
	}
```

这个位置就是判断活动的类型（正式竞赛【load_type值为1】还是模拟练习【load_type值为0】），从而进入到不同的JS主文件当中（因为之前有一个系统拆分优化需求，将模拟练习和正式比赛的主JS文件区别开了）。



### `exam/exam_main_new`和`'exam/exam_main'`在哪里？

这两个文件的前缀都是`exam`,它处于`raceapp/resource/mapi/res/js/student/exam`这个文件夹底下。之后，在项目操作过程中，如果你看到了类似的前缀，都是可以到这个目录下寻找相关的文件的。



### 怎么理解`define(['exam/initData'], function(initData) {})`这种语法？

`define`是一种前端的模块规范，俗称`AMD`。这种语法目前基本上已经是淘汰了的，所以你可以不需要去理解具体的含义。你只需要用我教你如下的方式，知道这个语法是在干什么就够了。

那么`define`的语法到底在干嘛呢？其实，我用另一种规范的语法对标写一下，你就可以立刻明白了：

`import initData from 'exam/initData'`这样子，你是否看得懂了呢？没错，其实这个语法就是说从`exam/initData`当中引入模块并命名成`initData`。

按照`define`模块规范的书写顺序，你可以想象成如下`from exam/initData import initData`。是不是瞬间感觉理解了（跟python的 语法贼像，简直一样）？



### 项目文件是如何做区分的呢？

js文件从命名来区分，大致可以分成主要两类`as*`和`js*`。其中`as*`是就是口语相关文件，`js*`就是笔试相关文件。

更进一步地，我们在每种大类型当中还可以看到`as_analysis*`/`js_analysis*`/`as_model*`/`js_model*`/`as_ctrl`/`js_ctrl`等分类文件。其中`*_analysis*`这样的就是答题分析页相关的，`*_model*`这样的就是答题页的model模型文件（类似于vue当中export default出去的那个对象），`*_ctrl*`这样的就是控制作用的文件。其他相关文件，你可以以此类推。



### 如何部署测试环境

实际上答题页相关的内容都是需要到`22`服务器和`23	`服务器进行手动拉取的（没有Jenkins帮忙这个前后端混合部分的内容）。而在`22`服务器上只需要直接拉取下来，测试代码会自动生效。



### 如何部署上线？

1. 修改以下文件的`version_id`字段：`/home/www/raceapp/views/config/global.conf`

​        若使用了`requirejs`，则还需要修改对应的config文件，

​        例如mapi项目修改：`/home/www/raceapp/resource/mapi/res/js/student/conf.js`找到该行： 

​        `GC("VERSION",20171580)`然后   进行修改，版本号加一即可。

2. 将修改后的代码提交到gitlab，然后从gitlab将对应修改代码拉取下来。

3. 在23服务器` /home/www/raceapp/sh/online`目录下，新建`xxx.code`，如`23admin20200928.code`。你可以使用如下脚本获取某个目录下所有文件`sh /home/www/raceapp/sh/scanfile.sh ` `/home/www/raceapp/项目的资源路径`。找出来之后，将其填写到code文件当中。
4. 执行 `sh /home/www/raceapp/sh/simpleonline_client.sh ` `xxx ` `huliyuan`进行上线。（⚠️注意：这里的xxx就是xxx.code中的文件名，不要带后缀！）
5. 输入上线密码上线：`cT1lS7hA0gJ6eM5rI7pU5jL7uP9sC8hJ`



### 如何区分`172.17.20.22`和`172.17.20.23`？

`22`服务器作为测试环境服务器，当你项目中代码开发完成之后，到`22`服务器中就可以直接`git pull`相关的代码文件了，这时候不需要再做任何事情，因为这台服务器下的`php`服务器会自动解析相关文件的。你只需要到浏览器查看你的开发结果就OK了。

`23`服务器作为发布代码上线的服务器，当你项目中代码开发完成之后，到`23`服务器中就可以直接`git pull`相关的代码文件了。但是接下来要做的跟`22`不同，`23`服务器还需要将代码进行正式上线。其实你完全可以把`23`服务器看成是没有前端操作界面的`cpsd`，那个平台只是提供了一个可视化的前端界面给开发人员，直接通过界面操作的方式将代码发布上线罢了。而`23`服务器因为缺少前端界面，你就自然而然需要自己进去服务器做相关的事情而已。
