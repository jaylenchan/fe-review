const toString = Object.prototype.toString
function isType(name) {
  return function (obj) {
    return toString.call(obj) === '[object ' + name + ']'
  }
}

export const isObject = isType('Object')
export const isFuntion = isType('Function')
export const isArray = isType('Array')
export const isString = isType('String')

export const noop = () => { }

let id = 1
export const guid = () => id++

export const toRgb = str => {
  let res = []
  let hexColor = str.toLowerCase()
  //十六进制颜色值的正则表达式
  const REG_COLOR = /^#([0-9a-f]{3}|[0-9a-f]{6})$/
  // 若颜色不正确默认为白色
  if (!REG_COLOR.test(hexColor)) return [255, 255, 255]
  // 如果是16进制颜色
  if (hexColor.length === 4) {
    let newHexColor = '#'
    for (var i = 1; i < 4; i += 1) {
      let str = hexColor[i]
      newHexColor += `${str}${str}`
    }
    hexColor = newHexColor
  }
  //处理六位的颜色值
  for (var i = 1; i < 7; i += 2) {
    res.push(parseInt(`0x${hexColor.slice(i, i + 2)}`))
  }
  return res
}

export const toColor = (hexColor, opacity = 1) => {
  let [red, green, blue] = toRgb(hexColor)
  return {
    red,
    green,
    blue,
    alpha: Math.floor(opacity * 255)
  }
}

export const now = () => {
  return (new Date()).valueOf()
}

export const parseParams = params => {
  let res
  try {
    res = JSON.parse(params)
  } catch (err) {
    res = params
  }
  return res
}
export const resolveCallback = action => response => action(response)