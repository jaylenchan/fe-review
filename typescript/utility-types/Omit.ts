/**
 * 从T中取出除去K的其他所有属性。与Pick相对。
 * 实现原理：先使用keyof T 取出T中的所有key(联合类型)，然后使用Exclude<keyof T, U>一一派发对比，抽出除了U之外的类型
 * 最后使用Pick,从T中取出Exclude排除的类型
 */
export type Omit<T, U extends keyof T> = Pick<T, Exclude<keyof T, U>>

export type TestCase = {
  name: string
  age: number
  username: string
}

export type TestCaseOmit = Omit<TestCase, 'name' | 'username'>
