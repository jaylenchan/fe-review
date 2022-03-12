export const runCallback = function (callback: (...args: any[]) => any) {
  callback()
}

export const forEach = function (arr: any[], callback: (...args: any[]) => any) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i)
  }
}
