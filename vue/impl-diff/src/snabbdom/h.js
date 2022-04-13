import vnode from './vnode'

/**
 * h('div', {}, '文字')
 * h('div', {}, [])
 * h('div', {}, h())
 */
export default function h(sel, data, c) {
  // 检查参数个数
  if (arguments.length != 3) {
    throw new Error('参数不正确')
  }

  // 检查c的类型
  if (/** h('div', {}, '文字') */ ['number', 'string'].includes(typeof c)) {
    return vnode(sel, data, null, c, null)
  } else if (/** h('div', {}, [])*/ Array.isArray(c)) {
  } else if (/** h('div', {}, h())*/ typeof c === 'object' && c.hasOwnProperty('sel')) {
    for (let i = 0; i < c.length; i++) {
      if (!typeof c[i] === 'object' && c.hasOwnProperty('sel')) {
      }
    }
  } else {
    throw new Error('Error')
  }
}
