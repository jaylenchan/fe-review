/**
 * 输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。
 * 输入：head = [1,3,2]
 * 输出：[2,3,1]
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

function reversePrint(head) {
  if (!head) return []
  const res = []
  while (head) {
    res.unshift(head.val)
    head = head.next
  }
  return res
}

const list = createList([1, 3, 2])
const res = reversePrint(list)
console.log(res)
