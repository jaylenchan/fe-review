class ListNode {
  constructor(val) {
    this.val = val
    this.next = null
  }
}

function createList(arr) {
  if (!arr) return null
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

function reverseList(head) {
  head = createList(head)
  if (!head) return null
  let low = head

  let fast = low.next

  low.next = null

  if (!fast) return low // 只有一个结点

  let cur = fast.next

  // 两个结点的情况
  if (!cur) {
    fast.next = low
    return fast
  }

  while (cur) {
    fast.next = low
    low = fast
    fast = cur
    cur = cur.next
  }
  fast.next = low
  low = fast
  return fast
}

const res = reverseList([1, 2, 3])
console.log(res)
