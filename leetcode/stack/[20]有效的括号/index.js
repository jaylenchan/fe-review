/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const map = new Map()
  map.set('{', '}')
  map.set('[', ']')
  map.set('(', ')')

  let stack = []

  for (let c of s) {
    if (map.has(c)) {
      stack.push(c)
    } else {
      const char = stack.pop()
      if (map.get(char) !== c) return false
    }
  }
  return stack.length === 0
}
// @lc code=end
/**
 * 栈
 * 步骤：
 * 1.建立一个哈希表map，里头存放着括号匹配的相关信息：
 * 其中，key是左括号，value是右括号
 * 2. 开始遍历s括号字符串，依次获取其中的char字符进行判断：
 * 如果说，通过map.has(char)是true，说明这是一个左括号（因为key都是左括号）
 * 同时需要做的是将左括号放入栈stack中；
 *
 * 当map.has(char)是false的时候，那么说明出现的是右括号了。
 * 那么此时应该从栈stack弹出一个左括号进行匹配，匹配的方式是map.get(弹出的左括号)
 * 在map中查询下是不是就是这个右括号，如果不是直接退出循环返回false，这是一个无效括号
 * 当整个循环完毕之后，stack应该是空的。因为如果它是一个有效括号字符串，那么应该会一一弹出消耗
 * 消耗的步骤就是stack.pop()，会改变原数组。
 *
 * 最后判断stack的大小是否是0，是的话就是有效括号了
 */
