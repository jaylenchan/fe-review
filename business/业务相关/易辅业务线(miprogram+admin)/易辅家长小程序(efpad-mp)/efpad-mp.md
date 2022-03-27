![img](../../../pic/Web开发流程图.png)
## 总览

## 一、项目概述

- 开发模式：前后端分离
- 主要技术：Taro+Vue3+TypeScript+Scss
- 项目地址：`https://gitlab.ekwing.com/wisdom/fe/efpad-mp`


## 二、常见问题

- taro-vue3 不支持 tsx 语法编译（报错），删除内置 ts 配置，添加 @babel/preset-typescript @vue/babel-plugin-jsx 编译
- 以 vue3 开发时建议还是遵循原本 template 下只有一个标签的形式，目前 taro 中多标签会出现 bug（remoteCapture -- IntervalSelect 组件在作为多页面弹窗时会出现修改不了值的情况）
- 线下环境可能会出现websocket连接报错，原因是websocket协议的问题，使用wss的话可能线下证书错误，可以改成ws协议发出进行调试
  