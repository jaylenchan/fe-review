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

/**
 * 移动长板：没啥卵用，一定比之前小面积
1. 移动后，新的板子变得比对面的板子还是大，但是宽因为移动了，结果面积还是要变小
2. 移动后，新的板子变得跟对面的板子一样大了，但是宽因为移动了，相当于直接把之前的那种变成了小宽*等高，结果还是变小了
3. 移动后，新的板子变得比对面的板子还小，宽小，高小，结果面积就比之前的小

  *移动短板：短板移动，应该只是可能面积变大，因为也可能变小把
1. 移动后，新的板子变的比对面的要大，宽随着向里头移动变小了，但是高很可能因为对面的板子跟现在板子的关系反转，对面的板子变成新的短板了，因此面积可能是小宽*新高（曾经的长板替代了自己对面的短板变成了新短板，高度自然比曾经高。虽然成为了短板决定最终面积）
2. 移动后，新的板子变的跟对面的一样，宽随着向里头变小了，但是高跟对面一样了，导致短板高度变高了。于是面积 = 小宽*新高，面积可能变大
3. 移动后，新的板子变的比对面还是小，甚至小过曾经的自己，宽也因为向里头变小了，导致面积 = 小宽*小高，面积变小了
 */
