// Promise.all = function (promises) {
//   const result = []
//   let index = 0
//   return new Promise((resolve, reject) => {
//     function process(value) {
//       result[index] = value
//       index++
//       if (index === promises.length) return resolve(result)
//     }

//     for (let i = 0; i < promises.length; i++) {
//       const promise = promises[i]
//       if (promise.then && typeof promise.then === 'function') {
//         promise
//           .then((result) => {
//             process(result)
//           })
//           .catch((err) => {
//             reject(err)
//           })
//       } else {
//         process(promise)
//       }
//     }
//   })
// }

// Promise.all([1, 2, 3]).then((res) => console.log(res))
class MPromise {
  static status = 'pending'

  constructor(executor) {
    this.value = undefined
    this.err = undefined
    this.status = 'pending'
    this.successCbs = []
    this.failedCbs = []

    const resolve = (value) => {
      if (this.status === 'pending') {
        this.value = value
        this.status = 'fulfilled'
        this.successCbs.forEach((cb) => cb(this.value))
      }
    }

    const reject = (err) => {
      if (this.status === 'pending') {
        this.err = err
        this.status = 'rejected'
        this.failedCbs.forEach((cb) => cb(this.err))
      }
    }

    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  then(onFulfill, onReject) {
    return new Promise((res, rej) => {
      if (this.status === 'pending') {
        this.successCbs.push(onFulfill)
        this.failedCbs.push(onReject)
      }
      if (this.status === 'fulfilled') {
        const value = onFulfill(this.value)
      }
      if (this.status === 'rejected') {
        const err = onReject(this.err)
      }
    })
  }
}

const p = new MPromise((res, rej) => {
  setTimeout(() => {
    res(1)
  }, 3000)
})
p.then(
  (res) => console.log(res),
  (err) => console.log(err)
)
