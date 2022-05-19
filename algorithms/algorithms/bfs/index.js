// 实现广度优先遍历，最后输出a->a2->b->c->d->b2->c2->d2->e->f->g->e2->f2->g2

function bfsData(data) {
  const queue = []
  const stack = []
  bfs(data, queue, stack)
  console.log(stack)
}

function bfs(data, queue, stack) {
  if (!data) return
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    queue.push(item)
  }
  while (queue.length > 0) {
    const item = queue.shift()
    stack.push(item.name)
    if (item.children && item.children.length > 0) {
      bfs(item.children, queue, stack)
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

console.log(bfsData(data))
