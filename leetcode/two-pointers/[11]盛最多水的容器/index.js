/*
 * @lc app=leetcode.cn id=11 lang=javascript
 *
 * [11] 盛最多水的容器
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let left = 0
  let right = height.length - 1
  let max = 0

  while (left < right) {
    const leftHeight = height[left]
    const rightHeight = height[right]

    if (leftHeight < rightHeight) {
      max = max < leftHeight * (right - left) ? leftHeight * (right - left) : max
      left++
    } else {
      max = max < rightHeight * (right - left) ? rightHeight * (right - left) : max
      right--
    }
  }

  return max
}
// @lc code=end
/**
 * 双指针
 * 步骤：
 * 只需要从左右开始两个指针相向走
 * 因为长板的移动最终只会导致面积变得更小，不管新长板是变大还是变小了，面积终究是变小
 * 而短板的移动则不一定，短板移动可能变成更长的短板，或者变成比长板还要长的，把长板变成新的短板，面积未知，但是可能变大
 * 因此，每次只需要判断左右谁的短，不断取面积，然后判断到最后两个指针相遇了，停🤚
 * 最终结果返回就是最大的面积
 */
