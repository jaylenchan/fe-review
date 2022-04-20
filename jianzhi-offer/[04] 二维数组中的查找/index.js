/**
 * {在一个 n * m 的二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。
 * 请完成一个高效的函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
 * [
    [1,   4,  7, 11, 15],
    [2,   5,  8, 12, 19],
    [3,   6,  9, 16, 22],
    [10, 13, 14, 17, 24],
    [18, 21, 23, 26, 30]
  ]
 * 给定 target = 5，返回 true 
 * 给定 target = 20，返回 false
 */
function findNumberIn2DArray(matrix, target) {
  if (!matrix.length) return false
  let matrixLen = matrix.length
  let curRow = 0 // 代表行
  let curCol = matrix[0].length - 1 // 代表列

  let curNum = matrix[curRow][curCol] // 代表第一行最右边的数字

  while (curRow < matrixLen || curCol >= 0) {
    if (curNum === target) break
    if (curNum > target) {
      curCol--
    }
    if (curNum < target) {
      curRow++
    }
    if (curRow >= matrixLen || curCol < 0) break
    curNum = matrix[curRow][curCol]
  }

  return curNum === target
}
