/** DOM定义 */
const domDefs = [
  /** mask遮罩 */
  (guid) => ({
    type: 'div',
    id: 'mask',
    name: 'mask',
    style: {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 10,
      backgroundColor: '#000000',
      opacity: 0.5
    },
    init() {
      guid.page.appendChild(this)
    }
  }),

  /** popOver弹框的三角形 */
  (guid) => {
    const {
      popOver: { iconType }
    } = guid.curStep
    const iconStyleType = {
      left: {
        position: 'absolute',
        width: 0,
        height: 0,
        border: '9px solid transparent',
        borderRight: '13px solid #ffffff',
        top: '15px',
        left: '-18px'
      },
      right: {
        position: 'absolute',
        width: 0,
        height: 0,
        border: '9px solid transparent',
        borderLeft: '13px solid #ffffff',
        top: '15px',
        right: '-18px'
      },
      bottom: {
        position: 'absolute',
        width: 0,
        height: 0,
        border: '9px solid transparent',
        borderTop: '13px solid #ffffff',
        bottom: '-18px',
        right: '35px'
      }
    }
    return {
      type: 'div',
      id: 'triangle',
      name: 'triangle',
      style: iconStyleType[iconType]
    }
  },

  /** popOver弹窗的内容 */
  (guid) => {
    const {
      popOver: { intro }
    } = guid.curStep
    return {
      type: 'div',
      id: 'introContent',
      name: 'introContent',
      style: {
        color: '#333333',
        fontSize: '18px'
      },
      innerHTML: intro
    }
  },

  /** popOver弹窗的按钮 */
  (guid) => {
    const {
      popOver: {
        button: { btnText, overlay }
      }
    } = guid.curStep

    return {
      type: 'div',
      id: 'button',
      name: 'button',
      style: {
        position: 'absolute',
        bottom: '20px',
        right: '25px',
        width: '110px',
        height: '30px',
        background: '#00C18A',
        borderRadius: '2px',
        lineHeight: '30px',
        textAlign: 'center',
        color: '#ffffff',
        fontSize: '16px',
        fontWeight: 600,
        cursor: 'pointer'
      },
      innerHTML: `${btnText}(${overlay}s)`,
      events: {
        click: () => {
          clearInterval(guid.timer)
          const {
            popOver: {
              button: { handler = () => {} }
            }
          } = guid.curStep
          handler(guid)
          const domBox = guid.domBox
          domBox.dressUp(guid.curEl, {
            position: '',
            zIndex: '',
            background: '',
            padding: '',
            borderRadius: ''
          })
          domBox.page.init()
          const { curStepIndex, steps } = guid
          if (curStepIndex + 1 === steps.length) {
            return
          }
          guid.goStep(guid.curStepIndex + 1)
        }
      }
    }
  },

  /** popOver弹框 */
  (guid) => {
    const {
      popOver: { position }
    } = guid.curStep

    return {
      type: 'div',
      id: 'popOver',
      name: 'popOver',
      style: {
        position: 'absolute',
        zIndex: 100,
        width: '400px',
        height: '124px',
        padding: '17px 25px 20px',
        backgroundColor: '#FFFFFF',
        left: `${position.left}px`,
        top: `${position.top}px`,
        right: `${position.right}px`,
        bottom: `${position.bottom}px`,
        borderRadius: '3px'
      },
      init() {
        const { page, domBox, curStep } = guid
        const popOver = domBox.popOver
        const button = domBox.button
        const {
          popOver: {
            button: { overlay, btnText }
          }
        } = curStep
        if (overlay) {
          let count = overlay
          let timer = null
          const countDown = () => {
            count--
            if (count === 0) {
              button.innerHTML = `${btnText}`
              clearInterval(timer)
              return button.click()
            }
            button.innerHTML = `${btnText}(${count}s)`
          }
          guid.timer = timer = setInterval(countDown, 1000)
        } else {
          button.innerText = `${btnText}`
        }
        popOver.appendChild(domBox.triangle)
        popOver.appendChild(domBox.introContent)
        popOver.appendChild(button)
        page.appendChild(popOver)
      }
    }
  },

  /** 当前高亮的元素 */
  (guid) => {
    return {
      name: 'curEl',
      bind: true,
      dom: guid.curEl,
      init() {
        let styleOptions = {
          position: 'relative',
          zIndex: 100
        }
        if (guid.steps[guid.curStepIndex].showHighLightBox) {
          styleOptions = Object.assign(styleOptions, {
            background: '#ffffff',
            padding: '23px',
            borderRadius: '6px'
          })
        }

        guid.domBox.dressUp(this, styleOptions)
      }
    }
  },

  /** 当前用户指引的page页面 */
  (guid) => {
    return {
      name: 'page',
      bind: true,
      dom: guid.page,
      init() {
        const elChild = ['mask', 'popOver']
        elChild.forEach((childId) => {
          const el = document.getElementById(childId)
          el && guid.page.removeChild(el)
        })
      }
    }
  }
]

export default domDefs
