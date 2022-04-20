/**
 * 千分符分割
 */

// var string = '123456789'
/**
 * 思路：每次找一个数字，要求这个数字后边的所有数字直到末尾，数字的个数必须是3的倍数。找到这样的数字后，就插入一个,
 * 思路2: 或者直接找一个'',这个''之后开始的数字匹配到末尾，数字的个数必须是3的倍数
 * 其实找数字和找位置都是一个套路，只不过位置是''看起来是虚的一样
 * ''^1''2''3''4''5''6''7''8''9$''
 */
// var regex = /(?!^)(?=(\d{3})+$\)/g
/**
 * /(\d)(?=(\d{3})+$)/g 全局匹配这样的位置：往左看是一个数字，往右看到末尾是3的倍数的数字
 */
// var regex = /(\d)(?=(\d{3})+$)/g
// var result = string.replace(regex, '$1,')
// console.log(result)

/**
 * b左边有一个位置，这个位置往右看是a
 * 矛盾了，所以找不出东西
 * 或者说：有一个位置，往右看必须是a，同时必须是b。矛盾
 *
 */
// var reg = /(?=a)b/
// console.log(reg.exec('ab'))

/**
 * b左边有一个位置，这个位置往左看是a
 * 所以ab可以的
 * 或者说：有一个位置，往左看是a往右看是b
 */
// var reg = /(?<=a)b/
// console.log(reg.exec('ab')) // 结果 b
// www.baidu.com?age=10&name=jaylen#1.html
/**
 * 获取url查询参数的对应value
 */
function getQueryParam(url, key) {
  if (key.includes('?')) key = `\\${key}`
  const regex = new RegExp(`(?=[^&?])\\b${key}`, 'g')
  const foundKey = regex.exec(url)
  let value = ''
  if (foundKey) {
    value = new RegExp(`(?<=${foundKey}=)\\w+`).exec(url)
  }
  return value ? value[0] : null
}
console.log(getQueryParam('www.baidu.com?kkey=jaylen&age=10&class=ff/#1.html', 'age'))
