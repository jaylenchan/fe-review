/*
 * @lc app=leetcode.cn id=21 lang=javascript
 *
 * [21] 合并两个有序链表
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
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  const dummy = new ListNode(-1, null)
  let tail = dummy

  while (list1 && list2) {
    const l1Val = list1.val
    const l2Val = list2.val

    if (l1Val < l2Val) {
      tail.next = list1
      tail = tail.next
      list1 = list1.next
    } else {
      tail.next = list2
      tail = tail.next
      list2 = list2.next
    }
  }

  if (list1) tail.next = list1
  if (list2) tail.next = list2

  return dummy.next
}
// @lc code=end
/**
 * 链表
 * 步骤：
 * 1. 设置一个dummy结点，为链接一个新链条做准备。此时tail尾部跟头部dummy相同
 * 2. 当l1和l2都是链表的时候（因为总有一刻两个指针往后跑到一定程度后就是null）判断l1和l2的值
 * 如果l1的值比l2的值小的话，dummy结点的tail指针指向了l1，然后允许l1指针往后跳一个格子
 * 完成后，tail指针也要往后跳一个格子，说明新链表的有了新的tail尾部（刚刚的是久的tail）
 * 如果l2的值比l1的小，也是类似操作
 *
 * 3. 最后完成循环后，有可能是l1或者l2其中一个指针指的是空后结束的循环（或者两个都为空），那这时候要额外判断是否两个指针指的地方还有值
 * 如果有的话，让tail的next指向他们，这样才是一段完整的新链表。
 * 最后返回Dummy.next。
 *
 */
