<div align="center">
<h1 align="center"> FE-Review</h1>
<img  src="business/ekwing/pic/Web开发流程图.png"/>
</div>

## [Typescript生态](typescript)

- ### [Function](typescript/function)

  - [x] [实现模板引擎](typescript/function/template-engine)
  - [x] [手写模拟call](typescript/function/impl-call)
  - [x] [手写模拟apply](typescript/function/impl-apply)
  - [x] [手写模拟bind](typescript/function/impl-bind)
  - [x] [手写实现curringAdd(1)(2)(3)](typescript/function/curring)

- ### [Promise](typescript/promise)

  - [x] [手写Promise](typescript/promise/impl-promise)
  - [x] [手写Promise.all](typescript/promise/impl-promise-all)
  - [x] [手写Promise.race](typescript/promise/impl-promise-race)
  - [x] [实现控制请求并发数量](typescript/promise/impl-parallel)

- ### [RegExp](typescript/regex)
  
  - [x] [解析url](typescript/regex/parse-url)

- ### [Others](typescript/others)

  - [x] [手写防抖与节流](typescript/others/debounce-throttle)
  - [x] [手写深拷贝](typescript/others/deep-clone)
  - [x] [手写模拟instanceof](typescript/others/impl-instanceof)
  - [x] [手写模拟new](typescript/others/impl-new)

- ### [utility-types](typescript/utility-types)

  - [x] [Omit](typescript/utility-types/Omit.ts)
  - [x] [Exclude](typescript/utility-types/Exclude.ts)
  - [x] [Extract](typescript/utility-types/Extract.ts)
  - [x] [Pick](typescript/utility-types/Pick.ts)
  - [x] [Readonly](typescript/utility-types/Readonly.ts)
  - [x] [Required](typescript/utility-types/Required.ts)
  - [x] [Partial](typescript/utility-types/Partial.ts)
  - [x] [NonNullable](typescript/utility-types/NonNullable.ts)
  - [x] [ReturnType](typescript/utility-types/ReturnType.ts)

## [SCSS生态](scss)

- [ ] [总结垂直居中方案]()
- [ ] [总结flex布局](scss/flex)
- [ ] [总结层叠上下文(stacking-context)](scss/stacking-context)

## [Vue生态](vue)

- ### [Vue-Core]()

  - [x] [手写vue3核心源码]()

- ### [Vue-Router](vue/vue-router)

  - [x] [手写vue-router源码](vue/vue-router)

- ### [Vuex]()

## [浏览器生态](browser)

- ### [安全](browser/security)

  - [x] [实现三种xss攻击+总结xss防御策略]()
  - [x] [实现csrf攻击+总结csrf防御策略]()

- ### [跨域](browser/cross-origin)

  - [ ] [实现跨域方案 - JSONP](browser/cross-origin/jsonp)
  - [x] [实现跨域方案 - PROXY](browser/cross-origin/proxy)
  - [ ] [实现跨域方案 - CORS](browser/cross-origin/cors)

- ### [http](browser/http)

  - [缓存](browser/http/web-cache)
    - [x] [max-age强制缓存]()
    - [x] [no-cache缓存但发请求]()
    - [x] [no-cache+last-modfied协商缓存](browser/http/cache/no-cache+last-modfied.js)
    - [x] [no-cache+etag协商缓存](browser/http/cache/no-cache+etag.js)

- ### [websocket](browser/websocket)

## [设计模式](design-pattern)

- [x] [实现单例模式](design-pattern/singleton-pattern)
- [x] [实现策略模式](design-pattern/strategy-pattern)
- [x] [实现命令模式](design-pattern/command-pattern)
- [ ] [实现发布订阅模式]()

## [工程化技术](engineering)

- ### [webpack](engineering/webpack)

  - [x] [实现plugin](engineering/webpack/plugin)
  - [x] [实现Tapable的SyncHook](engineering/webpack/tapable)

- ### [docker](engineering/docker)

  - [x] [实现dev-container](engineering/docker/devcontainer-project)

## [业务技术](business)

- ### [实现大文件上传](business/file-upload)

  - [x] [分片上传]()
  - [ ] [上传进度条]()
  - [ ] [断点续传]()
  - [ ] [文件秒传]()
- [x] [手写jsBridge](business/hybrid)

- ### [业务项目](business/ekwing)

  - [ ] [bingo-pc](business/ekwing/业务相关/易辅业务线(miprogram+admin)/易辅校园客户端（teacher-pc-wisdom）)
  - [ ] [bingo-admin](business/ekwing/业务相关/易辅业务线(miprogram+admin)/易辅管理后台(admin-pc+bingo-admin))
  - [ ] [efpad-mp](business/ekwing/业务相关/易辅业务线(miprogram+admin)/易辅家长小程序(efpad-mp))
  - [ ] [esmatch-sdk](business/ekwing/业务相关/翼赛业务线(pc+admin+app)/翼赛SDK(competition-app+raceapp))

## [Leecode](leetcode)

- ### [双指针题目](leetcode/two-pointers)

  - [x] [[9]回文数](leetcode/two-pointers/[9]回文数)
  - [x] [[19]删除链表的倒数第_n_个结点](leetcode/two-pointers/[19]删除链表的倒数第_n_个结点)
  - [x] [[11]盛最多水的容器](leetcode/two-pointers/[11]盛最多水的容器)

- ### [字符串题目](leetcode/string)

  - [x] [[14]最长公共前缀](leetcode/string/[14]最长公共前缀)

- ### [栈题目](leetcode/stack)

  - [x] [[7]整数反转](leetcode/stack/[7]整数反转)
  - [x] [[20]有效的括号](leetcode/stack/[20]有效的括号)

- ### [链表题目](leetcode/linked-list)

  - [x] [[2]两数相加](leetcode/linked-list/[2]两数相加)
  - [x] [[21]合并两个有序链表](leetcode/linked-list/[21]合并两个有序链表)
  - [x] [[206]反转链表](leetcode/linked-list/[206]反转链表)

- ### [滑动窗口题目](leetcode/sliding-window)

  - [x] [[3]无重复字符的最长子串](leetcode/sliding-window/[3]无重复字符的最长子串)

- ### [动态规划题目](leetcode/dynamic-programming)

  - [x] [[53]最大子数组和](leetcode/dynamic-programming/[53]最大子数组和)
  - [x] [[70]爬楼梯](leetcode/dynamic-programming/[70]爬楼梯)
