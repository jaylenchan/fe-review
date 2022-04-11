function createRequest(tasks: any[], pool = 5) {
  const results = [] as any[]
  let together = new Array(pool).fill(null)
  let index = 0

  together = together.map(() => {
    return new Promise<void>((resolve, reject) => {
      function run() {
        if (index >= tasks.length) {
          return resolve()
        }
        const old_index = index
        const task = tasks[index++]

        task()
          .then((result: any) => {
            results[old_index] = result
            run()
          })
          .catch((err: any) => {
            reject(err)
          })
      }

      run()
    })
  })

  return Promise.all(together).then(() => results)
}

function delay(interval: number) {
  return new Promise((res, _rej) => {
    setTimeout(() => {
      res(interval)
    }, interval)
  })
}

const tasks = [
  () => {
    return delay(1000)
  },
  () => {
    return delay(1003)
  },
  () => {
    return delay(1005)
  },
  () => {
    return delay(1002)
  },
  () => {
    return delay(1004)
  },
  () => {
    return delay(1006)
  }
]

createRequest(tasks, 2)
  .then((result) => {
    console.log(result)
  })
  .catch((err) => {
    console.log('err', err)
  })
