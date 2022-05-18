function dfsData(data) {
  const stack = []
  dfs(data, stack)
  console.log(stack)
}

function dfs(data, stack) {
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    stack.push(item.name)
    if (item.children && item.children.length > 0) {
      dfs(item.children, stack)
    }
  }
}

const data = [
  {
    name: 'a',
    children: [
      { name: 'b', children: [{ name: 'e' }] },
      { name: 'c', children: [{ name: 'f' }] },
      { name: 'd', children: [{ name: 'g' }] }
    ]
  },
  {
    name: 'a2',
    children: [
      { name: 'b2', children: [{ name: 'e2' }] },
      { name: 'c2', children: [{ name: 'f2' }] },
      { name: 'd2', children: [{ name: 'g2' }] }
    ]
  }
]

console.log(dfsData(data))
