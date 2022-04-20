function hammingWeight(n) {
  n = n.toString(2)
  var regex = /1/g
  let count = 0
  let matched = regex.exec(`${n}`)
  while (matched) {
    count++
    matched = regex.exec(`${n}`)
  }
  return count
}

hammingWeight(00000000000000000000000000001011)
