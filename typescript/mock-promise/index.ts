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

  public constructor(executor: IExecutor) {
    const resolve = (value: any) => {
      if (this.status !== MyPromise.PENDING) return
      this.status = MyPromise.FULFILLED
      this.value = value
    }
    const reject = (reason: any) => {
      if (this.status !== MyPromise.PENDING) return
      this.status = MyPromise.RJECTED
      this.reason = reason
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
    }
  }
}
