function mirrorTree(root) {
  /** 当叶子结点的左右子树交换时，触发这个条件返回
   * 即在左边一个null，右边一个null镜像时，会直接返回null
   */
  if (!root) return null

  /** 镜像左子树
   * 叶子结点获取到的就是null == leftRoot
   */
  const leftRoot = mirrorTree(root.left)
  /** 镜像右子树
   * 叶子结点获取到的就是null == rightRoot
   */
  const rightRoot = mirrorTree(root.right)

  /** 镜像完毕后，让每一个根左右交换
   * 叶子结点特殊，左右交换其实就是两个null交换
   */
  root.left = rightRoot
  root.right = leftRoot

  return root
}
