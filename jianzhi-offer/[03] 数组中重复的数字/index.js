function findRepeatNumber(nums) {
  const numSet = new Set()
  let i = 0
  while (i < nums.length) {
    if (numSet.has(nums[i])) return nums[i]
    numSet.add(nums[i])
    i++
  }
}

const res = findRepeatNumber([2, 3, 1, 0, 2, 5, 3])
console.log(res)
