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

function deleteNode(head, val) {
  head = createList(head)
  const dummy = createList([-1])
  dummy.next = head
  let low = dummy
  let fast = dummy.next

  while (fast) {
    if (fast.val === val) {
      low.next = fast.next
      break
    }
    fast = fast.next
    low = low.next
  }
  return dummy.next
}

const res = deleteNode([4, 5, 1, 9], 5)
console.log(res)
