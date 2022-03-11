interface IExecutor {
  (resolve: (...args: any[]) => any, reject: (...args: any[]) => any): void
}

type IStatus = 'PENDING' | 'FULFILLED' | 'RJECTED'

export default class MyPromise {
  private static PENDING: IStatus = 'PENDING'
  private static FULFILLED: IStatus = 'FULFILLED'
  private static RJECTED: IStatus = 'RJECTED'

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
      this.status = MyPromise.RJECTED
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

  public then(onFulfilled: (...args: any[]) => any, onRejected: (...args: any[]) => any) {
    if (this.status === MyPromise.FULFILLED) {
      onFulfilled(this.value)
    } else if (this.status === MyPromise.RJECTED) {
      onRejected(this.reason)
    } else {
      // 异步代码调用才可能用了then方法这里还是PENDING
      // 订阅
      this.onResolvedCallbacks.push(() => {
        onFulfilled(this.value)
      })
      // 订阅
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason)
      })
    }
  }
}
