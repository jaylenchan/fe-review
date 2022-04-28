/*
 * @lc app=leetcode.cn id=9 lang=javascript
 *
 * [9] 回文数
 */

// @lc code=start
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  const strX = String(x)
  let left = 0
  let right = strX.length - 1

  while (left < right) {
    if (strX[left] === strX[right]) {
      left++
      right--
    } else {
      return false
    }
  }
  return true
}
// @lc code=end

/**
 * 双指针
 * 步骤：
 * 先把数字变字符串
 * left指针指向头
 * right指针指向尾部
 * 然后如果left比right小，就不断取出左元素和右元素
 * 判断两个元素是否相等，如果相等，说明到此时两个元素的回文概念是成立的
 * 于是left往右移动一格，right往左移动一格，两个指针走向对方
 * 但是如果在这个过程当中，两个指针手里的元素不一样，推翻回文概念，直接判错返回❌
 * 在以上循环能够完成后，还能够执行到最底下，说明两个指针相遇（奇数）了或者侧肩而过（偶数）left比right大
 * 这时候返回true，回文数成立
 */
