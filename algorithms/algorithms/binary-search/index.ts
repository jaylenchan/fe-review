export default function binarySearch(arr: Array<number>, target: number): number {
  let left = 0
  let right = arr.length - 1

  while (left <= right) {
    let guess = Math.floor((left + right) / 2)

    if (arr[guess] === target) {
      return guess
    }
    if (arr[guess]! > target) {
      right = guess - 1
    }
    if (arr[guess]! < target) {
      left = guess + 1
    }
  }
  return -1
}
