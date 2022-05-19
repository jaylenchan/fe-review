/**
 * 题目：给定一系列的任务，这些任务可能有依赖关系，有依赖关系须相继执行，没有依赖关系则可以同时执行。
 * 写一个函数，计算完成给定所有任务需要的时间。（面试官没有要求多依赖，或者一个任务会被多个任务依赖）
 */

//例如下面这些任务执行总时间为 4
const tasks = [
  {
    name: 'task1',
    time: 1,
    dependency: ''
  },
  {
    name: 'task2',
    time: 2,
    dependency: ''
  },
  {
    name: 'task3',
    time: 3,
    dependency: 'task1'
  },
  {
    name: 'task4',
    time: 4,
    dependency: 'task2'
  }
]

// 遍历整个tasks，拿到当前每一个任务
// 获取当前每一个任务花费的时间
function getTime(tasks, dep) {
  let max = 0

  for (let task of tasks) {
    if (task.dependency === dep) {
      let curTime = task.time + getTime(tasks, task.name)
      max = Math.max(max, curTime)
    }
  }
  return max
}

const time = getTime(tasks, '')
console.log(time)
