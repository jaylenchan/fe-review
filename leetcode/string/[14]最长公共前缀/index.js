/*
 * @lc app=leetcode.cn id=14 lang=javascript
 *
 * [14] 最长公共前缀
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  let longest = strs[0]

  for (let i = 1; i < strs.length; i++) {
    const curStr = strs[i]
    let j = 0
    for (; j < longest.length && j < curStr.length; j++) {
      if (longest[j] !== curStr[j]) {
        break
      }
    }
    longest = longest.slice(0, j)
  }

  return longest
}
// @lc code=end
/**
 * 步骤：
 * 1. 将第一个字符串从字符串数组中当作目前的最长公共前缀
 * 2. 然后从第二个字符串开始，依次获取当前字符串
 * 3. 将当前字符串和此时和最长公共前缀比较。以此从字符0（j）位置开始，一个个字符比较
 * 4. 如果j位置到某个地方，两个字符串的字符已经不等了，退出循环。说明到这个位置是两个字符串的最长公共前缀
 * 5. 更新最长公共前缀字符串，截取相关位置。
 * 6. 最终返回最长公共前缀（长度一定是小于或者等于初始值的）。
 */
