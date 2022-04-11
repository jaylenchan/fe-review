interface IExecutor {
  (resolve: (...args: any[]) => any, reject: (...args: any[]) => any): void
}

type IStatus = 'PENDING' | 'FULFILLED' | 'REJECTED'

export default class MyPromise {
  private static PENDING: IStatus = 'PENDING'
  private static FULFILLED: IStatus = 'FULFILLED'
  private static REJECTED: IStatus = 'REJECTED'

  private status: IStatus = MyPromise.PENDING
  private value: any
  private reason: any
  private onResolvedCallbacks: Array<(...args: any[]) => any> = []
  private onRejectedCallbacks: Array<(...args: any[]) => any> = []

  public constructor(executor: IExecutor) {
    const resolve = (value: any) => {
      if (this.status !== MyPromise.PENDING) return
      this.status = MyPromise.FULFILLED
      this.value = value

      //发布
      this.onResolvedCallbacks.forEach((resolvedCallback) => resolvedCallback())
    }
    const reject = (reason: any) => {
      if (this.status !== MyPromise.PENDING) return
      this.status = MyPromise.REJECTED
      this.reason = reason

      //发布
      this.onRejectedCallbacks.forEach((rejectedCallback) => rejectedCallback())
    }

    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }
  /**
   * then的参数onFulfilled返回的结果可能有如下几种情况：
   * (1) 普通值，这时候，返回的普通值会作为下一个promise的then中的onFulfilled的value
   * (2) throw err,这时候，抛出的err会作为下一个promise的then中的onRejected的reason
   * (3)promise,这时候就会根据promise的结果来处理。如果成功，直接传递给下一个promise中then的then的参数onFulfilled反之就是onRejected
   */
  public then(onFulfilled: (...args: any[]) => any, onRejected: (...args: any[]) => any) {
    const promise = new MyPromise((resolve, reject) => {
      if (this.status === MyPromise.FULFILLED) {
        setTimeout(() => {
          try {
            const value = onFulfilled(this.value)
            this.resolvePromise(promise, value, resolve, reject)
            resolve(value)
          } catch (err) {
            reject(err)
          }
        }, 0)
      } else if (this.status === MyPromise.REJECTED) {
        setTimeout(() => {
          try {
            const reason = onRejected(this.reason)
            this.resolvePromise(promise, reason, resolve, reject)
          } catch (err) {
            reject(err)
          }
        }, 0)
      } else {
        // 异步代码调用才可能用了then方法这里还是PENDING
        // 订阅
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const value = onFulfilled(this.value)
              this.resolvePromise(promise, value, resolve, reject)
              resolve(value)
            } catch (err) {
              reject(err)
            }
          }, 0)
        })
        // 订阅
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const reason = onRejected(this.reason)
              this.resolvePromise(promise, reason, resolve, reject)
              resolve(reason)
            } catch (err) {
              reject(err)
            }
          }, 0)
        })
      }
    })

    return promise
  }

  private resolvePromise(
    promise: MyPromise,
    x: any,
    resolve: (...args: any[]) => any,
    reject: (...args: any[]) => any
  ) {
    // promise 和 x指向同一个promise要报错
    if (promise === x) throw TypeError('Chaining cycle detected for promise #<Promise>')
    // 自己写的promise要和别人的兼容
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
      let called = false
      try {
        // 有可能then是通过Object.defineProperty实现的，这种实现方式取值如果没有是会报错的
        let then = x.then
        if (typeof then === 'function') {
          // 这里就可以认为x是promise了
          then.call(
            x,
            (y: any) => {
              if (called) return
              called = true
              this.resolvePromise(promise, y, resolve, reject)
            },
            (r: any) => {
              if (called) return
              called = true
              reject(r)
            }
          ) // 等价于x.then()
        } else {
          resolve(x)
        }
      } catch (err) {
        if (called) return
        called = true
        reject(err)
      }
    } else {
      resolve(x) // 这里说明返回的就是一个普通的值，直接放入promise的resolve
    }
  }
}
