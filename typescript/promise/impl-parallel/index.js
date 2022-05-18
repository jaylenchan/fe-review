function asyncPool(pool, tasks) {
  let together = new Array(pool).fill(null)
  const results = []
  let index = 0

  together = together.map(() => {
    return new Promise((resolve, reject) => {
      function run() {
        if (index >= tasks.length) {
          resolve(results)
        }
        const old_index = index
        const task = tasks[index++]
        task()
          .then((result) => {
            results[old_index] = result
            run()
          })
          .catch((err) => {
            reject()
          })
      }

      run()
    })
  })

  return Promise.all(together).then(() => results)
}

asyncPool(2, [
  () => Promise.resolve(1),
  () => Promise.resolve(2),
  () => Promise.resolve(3),
  () => Promise.resolve(4),
  () => Promise.resolve(5),
  () => Promise.resolve(6)
]).then((res) => {
  console.log('res=>', res)
})
