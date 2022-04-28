/*
 * @lc app=leetcode.cn id=7 lang=javascript
 *
 * [7] 整数反转
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  let strArr = String(x).split('')
  let operator = ''
  let tempStack = []

  if (/[+-]/.test(strArr[0])) {
    operator = strArr[0]
    strArr = strArr.slice(1)
  }
  for (let i = 0, len = strArr.length; i < len; i++) {
    const topEl = strArr.pop()
    tempStack.push(topEl)
  }
  tempStack.unshift(operator)
  const num = Number(tempStack.join(''))
  if (num < -Math.pow(2, 31) || num > Math.pow(2, 31) - 1) return 0
  return num
}
// @lc code=end
/**
 * 栈
 * 步骤：
 * 1. 将数字从字符串再变成数组
 * 2. 取出数组当中的第一个元素，判断如果是字符的话要将这个字符拿出来，放在一个变量中存着
 * 然后更新数组成为一个不含符号的数组
 * 3. 依次pop元素，从顶弹出元素，再倒入一个栈中
 * 4. 最后再栈中的元素就是颠倒之后的元素
 * 5. 使用unshift从前边加入符号，最后转换成数字
 * 6. 判断数字是否超过表示范围，如果超过按照题目要求返回0，否则返回反转之后的数字
 */
