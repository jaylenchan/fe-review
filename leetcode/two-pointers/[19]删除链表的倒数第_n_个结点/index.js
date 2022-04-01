/*
 * @lc app=leetcode.cn id=19 lang=javascript
 *
 * [19] 删除链表的倒数第 N 个结点
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
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  const dummy = new ListNode(0)
  dummy.next = head
  let slow = dummy
  let fast = dummy
  let i = 0

  while (i < n + 1) {
    // 先让快指针走n+1步，才能让fast和slow之间相差两站
    fast = fast.next
    i++
  }
  while (fast !== null) {
    fast = fast.next
    slow = slow.next
  }
  slow.next = slow.next.next

  return dummy.next // 这里千万别直接返回head，因为要是只有[1], 1，那head自己就是要被删除的，如果返回就错了
}
// @lc code=end
/**
 * 快慢指针
 * 步骤：
 * 1. 要想删除倒数第N个结点，就要找到倒数第N+1个结点。也就是倒数N结点的前驱结点倒数N+1
 * 2. 问题就转换成了如何找到倒数第N+1个结点？
 * 3. 利用快慢指针，经过一次遍历完全可以实现这个效果。不过在理解之前，我们推导下思路：
  [1，2，3，4]，假设一个fast指针走到3的位置停下。于是此时slow和fast相差两站。接着大家都同时往前走，一站一站走。
  直到fast来到数组外边了，此时slow来到2的位置。那么倒数第二个就是3，他之前的就是这个2，也就是倒数第N+1，其中N=2
  因此要找出倒数第N个，就让fast先走然后和slow相差N站即可，当fast走到边界外边了，此时slow所在的地方就是倒数第N+1站，
  这样子就可以判断出下一站就是N站了。

 */
