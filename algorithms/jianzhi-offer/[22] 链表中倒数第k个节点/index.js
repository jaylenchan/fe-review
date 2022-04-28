/**
 * 输入一个链表，输出该链表中倒数第k个节点。为了符合大多数人的习惯，本题从1开始计数，即链表的尾节点是倒数第1个节点。
 * 例如，一个链表有 6 个节点，从头节点开始，它们的值依次是 1、2、3、4、5、6。这个链表的倒数第 3 个节点是值为 4 的节点。
 * 给定一个链表: 1->2->3->4->5, 和 k = 2.
 * 返回链表 4->5
 */

class ListNode {
  constructor(val) {
    this.val = val
    this.next = null
  }
}

function createList(arr) {
  let curNode = new ListNode(arr.shift())
  let head = curNode
  arr.reduce((curHead, curVal) => {
    const newNode = new ListNode(curVal)
    curHead.next = newNode
    curHead = curHead.next
    return curHead
  }, curNode)
  return head
}

function getKthFromEnd(head, k) {
  head = createList(head)
  const dummy = createList([-1])
  dummy.next = head

  let low = dummy
  let fast = head

  let i = 0
  while (i < k) {
    fast = fast.next
    i++
  }

  while (fast) {
    fast = fast.next
    low = low.next
  }
  return low.next
}

const res = getKthFromEnd([1, 2, 3, 4, 5], 2)
console.log(res)
