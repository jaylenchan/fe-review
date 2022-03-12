export const timer = (callback: (...args: any) => any) => {
  setTimeout(() => {
    callback()
  }, 3000)
}
