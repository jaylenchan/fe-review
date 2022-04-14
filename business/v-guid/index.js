import domDefs from './domDefs'

/** DOM盒子 */
class DOMBox {
  constructor({ domDefs }) {
    this.domDefs = domDefs
  }

  /** 添加...args的缘故是为了不让此函数强耦合形参，无参也是能够执行成功的 */
  init(...args) {
    this.domDefs.forEach((domDef) => this.createDOM(domDef, ...args))
    this.mask.init()
    this.curEl.init()
    this.popOver.init()
  }

  createDOM(domDef, ...args) {
    let {
      type = 'div',
      id,
      name,
      style = {},
      innerHTML = '',
      events = {},
      init = () => {},
      bind = false,
      dom = null
    } = domDef(...args)
    if (bind && dom) {
      this[name] = dom
      this[name].init = init
      return
    }
    dom = document.createElement(type)
    this.dressUp(dom, style)
    dom.setAttribute('id', id)
    dom.innerHTML = innerHTML
    Object.keys(events).forEach((event) => {
      dom.addEventListener(event, events[event])
    })
    this[name] = dom
    this[name].init = init
  }

  /** 设置style样式 */
  dressUp(el, style) {
    const elStyle = el.style
    Object.keys(style).forEach((prop) => {
      elStyle[prop] = style[prop]
    })
  }
}

/** 用户指引 */
class Guid {
  constructor({ page, steps, domDefs }) {
    const domBox = new DOMBox({ domDefs })
    this.domBox = domBox
    this.page = page
    this.steps = steps
    this.curStepIndex = 0
    this.curStep = this.steps[this.curStepIndex]
    const curElId = this.steps[this.curStepIndex].el
    const curEl = document.querySelector(curElId)
    this.curEl = curEl
  }

  init() {
    this.domBox.init(this)
  }

  goStep(index) {
    this.curStepIndex = index
    this.curStep = this.steps[this.curStepIndex]
    this.curEl = document.querySelector(this.curStep.el)
    this.init()
  }
}

const guidDirective = {
  el: null,
  arg: null,
  guid: null,
  init: false,
  mounted(el, binding) {
    console.log('guid mounted')
    guidDirective.el = el
    guidDirective.arg = binding.arg
    guidDirective.guid = new Guid({
      page: guidDirective.el,
      steps: guidDirective.arg,
      domDefs
    })
    if (binding.value.showGuid) {
      guidDirective.guid.init()
    }
  },
  updated(el, binding) {
    if (binding.value.showGuid && binding.value.emitType === 'system' && !guidDirective.init) {
      guidDirective.init = true
      guidDirective.el = el
      guidDirective.arg = binding.arg
      guidDirective.guid = new Guid({
        page: guidDirective.el,
        steps: guidDirective.arg,
        domDefs
      })
      guidDirective.guid.init()
    } else if (binding.value.showGuid && binding.value.emitType === 'user') {
      guidDirective.el = el
      guidDirective.arg = binding.arg
      guidDirective.guid = new Guid({
        page: guidDirective.el,
        steps: guidDirective.arg,
        domDefs
      })
      guidDirective.guid.init()
    }
  }
}

export default guidDirective
