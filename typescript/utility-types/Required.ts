/**
 * 通过将T的所有属性设置为必选属性来构造一个新的类型。与Partial相反
 */
export type Required<T> = {
  [key in keyof T]-?: T[key]
}

export type TestCase = {
  name?: string
  age?: number
}

export type TestCaseRequired = Required<TestCase>
