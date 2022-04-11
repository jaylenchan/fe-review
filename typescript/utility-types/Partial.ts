/**
 * 将T中所有属性转换为可选属性。返回的类型可以是T的任意子集
 */
export type Partial<T> = {
  [key in keyof T]?: T[key]
}

export type TestCase = {
  name: string
  age: number
}

export type TestCasePartial = Partial<TestCase>
