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

function mergeTwoLists(l1, l2) {
  const dummy = createList([-1])
  let tail = dummy
  const res = []
  while (l1 && l2) {
    if (l1.val < l2.val) {
      tail.next = l1 // 谁小tail的下一个就指向谁
      tail = l1 // 指定完成后tail来到这个小的位置
      l1 = l1.next //更新下新的l1位置
    } else {
      tail.next = l2
      tail = l2
      l2 = l2.next
    }
  }
  if (l1) {
    tail.next = l1
  }
  if (l2) {
    tail.next = l2
  }
  return dummy.next
}

const l1 = createList([1, 2, 3])
const l2 = createList([1, 3, 4])
const list = mergeTwoLists(l1, l2)
console.log(list)
