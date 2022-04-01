/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let max = 0
  let left = 0
  const history = new Set()
  for (let right = 0; right < s.length; right++) {
    const curChar = s[right]
    while (history.has(curChar)) {
      history.delete(s[left])
      left += 1
    }
    history.add(curChar)
    max = history.size > max ? history.size : max
  }
  return max
}
// @lc code=end

/**
 * 最长不重复子串
 * 步骤1: 从right往右边循环
 * 每次都取当前末尾right元素，然后看看记录当中有没这个元素
 * 有的话，直接从记录删除left元素，然后left往右移动一格
 * 然后不断继续这个过程，看right元素在不在history存在过
 * 如果存在还是一样删除新的left元素，并往右一格
 * 在某个时刻，这个left一定会来到某个元素，这个元素一定是跟right元素一样的
 * 这个时候将这个特殊的left删除掉，再次来到循环后，循环就不满足了
 * 不满足循环，一律往记录中添加元素存着
 * 最后，判断当前history经过操作后的具体大小，如果大小大于max，就更新一下max的值
 */
