/**
 * Promise.race: 有一个成功或者失败，看谁最快处理完成就直接采用它的结果
 * 但是就算执行最快的哪个，其他的promises还是会继续执行完，只是不参与结果清算
 * 应用： 超时处理
 */

const MyPromise = Object.create(Promise.resolve)

MyPromise.race = function (promises: any[]) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      const promise = promises[i]

      if (promise.then && typeof promise.then === 'function') {
        promise.then(resolve, reject) // 一旦成功就直接停止，一旦失败就直接停止
      } else {
        return resolve(promise)
      }
    }
  })
}

export default MyPromise
