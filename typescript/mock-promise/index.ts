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
    return new MyPromise((resolve, reject) => {
      if (this.status === MyPromise.FULFILLED) {
        try {
          const value = onFulfilled(this.value)
          resolve(value)
        } catch (err) {
          reject(err)
        }
      } else if (this.status === MyPromise.REJECTED) {
        try {
          const reason = onRejected(this.reason)
          resolve(reason)
        } catch (err) {
          reject(err)
        }
      } else {
        // 异步代码调用才可能用了then方法这里还是PENDING
        // 订阅
        this.onResolvedCallbacks.push(() => {
          try {
            const value = onFulfilled(this.value)
            resolve(value)
          } catch (err) {
            reject(err)
          }
        })
        // 订阅
        this.onRejectedCallbacks.push(() => {
          try {
            const reason = onRejected(this.reason)
            resolve(reason)
          } catch (err) {
            reject(err)
          }
        })
      }
    })
  }
}
