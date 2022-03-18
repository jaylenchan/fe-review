# Tapable及其发布订阅机制相关理解

之前学习webpack的时候看到“webpack本质是一种基于事件流的机制”。但是对这句话的认识比较浅。hooks自己也实现过，却总是感觉抓不到核心。今天重新回顾了下hook，经过将其和基于EventEmitter的发布订阅进行对比之后，得到如下结论：
基于EventEmitter的发布订阅tasks是包含一系列事件的task，每个task自身又拥有一系列处理函数。而基于Hook的发布订阅task相当于基于EventEmitter的发布订阅tasks中的某一个task，只包含该hook对应的一系列处理函数。因此说“webpack本质是一种基于事件流的机制”我觉得又可以说“webpack本质是一种基于hook流的机制”，这里的hook就是某个事件。这样子也就达到了逻辑自洽了。
因此写一个hook，其实就是在写一个基础版本的发布订阅，只有hook一个事件，只需要添加hook这个事件相关的处理函数，发布的时候也只会发布hook自身这个事件，调用相关的一系列处理函数。看到这里，你应该明白咋样实现一个hook了吧？

## 基于EventEmitter的发布订阅

```ts
  EventEmitter {
    tasks = {
      hook1: [处理函数1，处理函数2，处理函数3],
      hook2: [处理函数1，处理函数2，处理函数3],
    },
    on(hook名，处理函数) {
      EventEmitter.tasks[事件名].push(处理函数)
    }，
    emit(hook名) {
      EventEmitter.tasks[事件名].forEach(fn => fn())
    }
  }
```

## 基于Hook的发布订阅

```ts
  Hook {
    task = [处理函数1，处理函数2，处理函数3],
    tap(处理函数备注， 处理函数){ // tap只负责为该hook，也就是该事件添加处理函数
      Hook.task.push(处理函数)
    },
    call() {
      Hook.task.forEach(fn => fn())// call也就是直接触发事件。这里跟基于EventEmitter的发布订阅的emit不同。call没有参数，是因为hook.call本来就知道调用哪个事件了，就是hook本身。但是emit不一样，tasks很多事件，需要emit(事件名)才能将相关事件的一系列处理函数进行调用。
    }
  }
```