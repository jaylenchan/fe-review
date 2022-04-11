/**
 * 将T中所有属性设置为只读
 */
export type Readonly<T> = {
  readonly [key in keyof T]: T[key]
}

export type TestCase = {
  name: string
  age: number
}

export type TestCaseReadonly = Readonly<TestCase>
