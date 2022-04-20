/**
 * 用两个栈实现一个队列。队列的声明如下，请实现它的两个函数 appendTail 和 deleteHead ，
 * 分别完成在队列尾部插入整数和在队列头部删除整数的功能。(若队列中没有元素，deleteHead 操作返回 -1 )
 */
class CQueue {
  constructor() {
    this.pushStack = []
    this.shiftStack = []
  }

  appendTail(value) {
    this.pushStack.push(value)
  }

  deleteHead() {
    let value = -1
    if (this.shiftStack.length) {
      value = this.shiftStack.pop()
      return value
    }
    let temp = this.pushStack.pop()
    while (temp) {
      this.shiftStack.push(temp)
      temp = this.pushStack.pop()
    }
    if (this.shiftStack.length) {
      value = this.shiftStack.pop()
      return value
    }
    return value
  }
}
