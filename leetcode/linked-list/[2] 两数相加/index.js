/*
 * @lc app=leetcode.cn id=2 lang=javascript
 *
 * [2] 两数相加
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let carry = 0
  let head = null
  let tail = null
  while (l1 || l2) {
    const l1Val = l1 ? l1.val : 0
    const l2Val = l2 ? l2.val : 0
    const sum = l1Val + l2Val + carry
    const target = sum % 10

    if (!head) {
      head = new ListNode(target, null)
      tail = head
    } else {
      tail.next = new ListNode(target, null)
      tail = tail.next
    }
    carry = Math.floor(sum / 10)

    if (l1) {
      l1 = l1.next
    }
    if (l2) {
      l2 = l2.next
    }
  }
  if (carry > 0) {
    tail.next = new ListNode(carry, null)
    tail = tail.next
  }
  return head
}
// @lc code=end
