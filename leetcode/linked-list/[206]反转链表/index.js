/*
 * @lc app=leetcode.cn id=206 lang=javascript
 *
 * [206] 反转链表
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
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  if (!head) return null

  let s = null
  let p = head
  while (head !== null) {
    head = head.next
    p.next = s
    s = p
    p = head
  }
  return s
}
// @lc code=end
/**
 * 链表
 * 1. 设置一个结点s，初始值是空
 * 2. 然后让一个指针p等于head指针
 * 3.不断判断head是否为空，不为空的话，进入循环
 * 将head往右移动一格
 * 让p的下一个指向s，其实就是让第一个元素指向null
 * 然后让s指向p所在的位置，相当于s来到了第一个元素。因为后边要继续指向s必须有值
 * 最后让p指向head，其实相当于到下一个元素去了。
 * 最终返回s
 */
