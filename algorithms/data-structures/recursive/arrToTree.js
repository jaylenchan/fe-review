let arr = [
  { id: 1, name: '部门1', pid: 0 },
  { id: 2, name: '部门2', pid: 1 },
  { id: 3, name: '部门3', pid: 1 },
  { id: 4, name: '部门4', pid: 3 },
  { id: 5, name: '部门5', pid: 4 }
]

/**
请把该数据整理为树状结构, 该树每个节点的结构如下, 
node = {
    children: [],
    id: id,
    value: value
}
**/

/**
 * 递归查找，获取children
 * 思路：
 */
const getChildren = (data, children, pid) => {
  for (const item of data) {
    if (item.pid === pid) {
      item.children = []
      children.push(item)
      getChildren(data, item.children, item.id)
    }
  }
}

/**
 * 转换方法
 */
const arrayToTree = (data, pid) => {
  const children = []
  getChildren(data, children, pid)
  return children
}

const result = arrayToTree(arr, 0)
console.log(result)
