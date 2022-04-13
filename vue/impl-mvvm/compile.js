class Compile {
  constructor(el, vm) {
    /** el可能是一个选择器也可能是一整个真实dom节点，所以要记得判断一下 */
    this.el = this.isElementNode(el) ? el : document.querySelector(el)
    this.vm = vm

    if (this.el) {
      /** 如果这个元素真的能够获取到，我们才执行编译 */
      /** 1. 先把真实的dom移入到内存当中 fragment */
      const fragment = this.nodeToFragment(this.el)
      /** 2. 提取想要的元素节点v-model和文本节点{{}} */
      this.compile(fragment)
      /**  把编译好的fragment再塞回页面去 */
      this.el.appendChild(fragment)
    }
  }
  // 专门写一些辅助的方法

  /** 判断是否是元素节点 */
  isElementNode(node) {
    return node.nodeType === 1
  }

  /** 判断是否是指令 */
  isDirective(name) {
    return name.includes('v-')
  }

  //核心的方法

  /** 将el的内容全部放入内存当中 */
  nodeToFragment(el) {
    const fragment = document.createDocumentFragment()
    let firstChild = el.firstChild
    /** 不断取第一个孩子节点，将孩子节点加入fragment，这是一个会改变el本身的操作 */
    while (firstChild) {
      fragment.appendChild(firstChild)
      firstChild = el.firstChild
    }
    return fragment
  }

  /** 编译元素
   * 带v-model的
   */
  compileElement(node) {
    // 取出当前节点的属性
    const attrs = node.attributes
    Array.from(attrs).forEach((attr /** name=value的形式*/) => {
      const { name, value: expr } = attr
      if (this.isDirective(name)) {
        // 取到对应的值放到节点的值上
        // 1. 从this.vm中获取到value对应key的值
        const type = name.match(/(?<=v-).+/)[0] // 获取指令类型
        CompileUtil[type](node, this.vm, expr)
      }
    })
  }

  /** 编译文本
   * 带{{}}的
   */
  compileText(node) {
    const { textContent: expr } = node // 取文本中的内容{{textContent}}
    const reg = /\{\{([^}]+)\}\}/
    if (reg.test(expr)) {
      CompileUtil['text'](node, this.vm, expr)
    }
  }

  /** 编译模板*/
  compile(fragment) {
    const childNodes = fragment.childNodes
    /**
     * 实际就是递归获取所有文本节点，只要是元素节点就继续递归
     */
    Array.from(childNodes).forEach((node) => {
      // 如果是元素节点
      if (this.isElementNode(node)) {
        /** 这里需要编译元素 */
        this.compileElement(node)
        this.compile(node)
      } else {
        // 文本节点
        /** 这里需要编译文本*/
        this.compileText(node)
      }
    })
  }
}

const CompileUtil = {
  getVal(vm, expr) {
    expr = expr.split('.')
    /** [message, a] 不断递归获取vm.$data['message']['a']*/
    return expr.reduce((preVal, curKey) => {
      return preVal[curKey]
    }, vm.$data)
  },
  setVal(vm, expr, value) {
    // vm.$data.message = value
    /** [message, a] 不断递归获取vm.$data['message']['a']*/
    expr = expr.split('.')
    expr.reduce((preVal, curKey, index) => {
      if (index === expr.length - 1) {
        return (preVal[curKey] = value)
      }
      return preVal[curKey]
    }, vm.$data)
  },
  /** 获取编译后的文本节点 */
  getTextVal(vm, expr) {
    expr = expr.replace(/\{\{([^}]+)\}\}/, (...args) => {
      return args[1]
    })
    return this.getVal(vm, expr)
  },
  // 文本处理
  text(node, vm, expr) {
    /**
     * 有可能指令上写的表达式的值是expr =  message.a
     * 那么我们不可能再data['message.a']是没有这个属性的
     * 应该的做法是将message.a展开成数组，然后将数组遍历依次往里头取值
     * data['message']['a']
     */
    const updateFn = this.updater['textUpdater']
    // 因为文本节点可能有多个 {{q}} {{b}}
    expr.replace(/\{\{([^}]+)\}\}/, (...args) => {
      new Watcher(vm, args[1], () => {
        // 如果数据变化了，文本节点需要重新获取依赖的属性，更新文本的内容
        updateFn && updateFn(node, this.getTextVal(vm, expr))
      })
    })

    updateFn && updateFn(node, this.getTextVal(vm, expr))
  },
  // 输入框处理
  model(node, vm, expr) {
    const updateFn = this.updater['modelUpdater']
    /** 这里应该加一个监控，目前的话只能初始化调用一次，
     * 正常来说，应该是监控着这里，然后每当数据值更新，就调用一次这里的逻辑
     */
    new Watcher(vm, expr, (newVal) => {
      // 当值变化后会调用cb，也就是当前的匿名函数，将新的值发送进来
      updateFn && updateFn(node, this.getVal(vm, expr))
    })
    node.addEventListener('input', (e) => {
      const newVal = e.target.value
      this.setVal(vm, expr, newVal)
    })
    updateFn && updateFn(node, this.getVal(vm, expr))
  },
  updater: {
    // 文本更新
    textUpdater(node, value) {
      node.textContent = value
    },
    // 输入框更新
    modelUpdater(node, value) {
      node.value = value
    }
  }
}
