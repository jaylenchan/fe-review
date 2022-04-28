function isSymmetric(root) {
  if (!root) return true

  return check(root.left, root.right)
}

function check(nodeLeft, nodeRight) {
  if (!nodeLeft && !nodeRight) {
    return true
  }
  if (!nodeLeft || !nodeRight) {
    return false
  }

  return (
    nodeLeft.val === nodeRight.val &&
    check(nodeLeft.left, nodeRight.right) &&
    check(nodeLeft.right, nodeRight.left)
  )
}
