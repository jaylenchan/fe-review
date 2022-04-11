/**
 * 在一个声明好的对象中，挑选一部分出来组成一个新的声明对象
 * 实现关键：U要满足是T中的key
 */
export type Pick<T, U extends keyof T> = {
  [key in U]: T[key]
}

export type TestCase = {
  name: string
  age: string
  username: string
}

export type TestCasePick = Pick<TestCase, 'name' | 'username'>
