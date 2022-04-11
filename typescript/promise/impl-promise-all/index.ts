/**
 * Promise.all: 多个promise全部完成之后获得结果
 * 但是，其中如果有一个promise失败了，整体就失败了
 * 其实就是同步（就是同一个时刻拿到）多个异步请求的结果。
 */

const MyPromise = Object.create(Promise.prototype)

MyPromise.all = function (promises: any[]) {
  return new Promise((resolve, reject) => {
    const result = [] as Array<any>
    let count = 0

    function processSuccess(index: number, data: any) {
      result[index] = data
      /** ⚠️：不要写出如下写法
       * 万一最后一个直接先成功了，那么length直接就扩大到promises.length
       * 这个是不准确的
       * 解决这个问题需要靠定时器count
       */
      // if(result.length === promises.length) {}
      if (++count === promises.length) {
        resolve(result)
      }
    }

    for (let i = 0; i < promises.length; i++) {
      const promise = promises[i]
      /** 通过then判断是不是一个promise */
      if (promise.then && typeof promise.then('function')) {
        promise
          .then((data: any) => {
            processSuccess(i, data)
          })
          .catch((err: any) => reject(err)) /** 如果其中一个失败了，直接reject失败 */
      } else {
        /** 如果是普通值，直接处理 */
        processSuccess(i, promise)
      }
    }
  })
}

export default MyPromise
