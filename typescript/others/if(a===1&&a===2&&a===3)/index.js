var num = 1
Object.defineProperty(window, 'a', {
  get() {
    return num++
  }
})

const isFlag = a === 1 && a === 2 && a === 3

console.log(isFlag)
