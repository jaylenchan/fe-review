export default function curring(fn: (...args: any[]) => any, ...args: any[]) {
  if (args.length >= fn.length) {
    return fn(...args)
  }
  let args1 = args
  return function (...args: any[]) {
    return curring(fn, ...args, ...args1)
  }
}
