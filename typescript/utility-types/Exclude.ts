/**
 * 从T中排除可分配给U的属性，剩余的属性构成新的类型
 * 实现原理：T是联合类型，会一个个分发属性去匹配U，如果一样，直接never（最终不会出现在联合类型中）
 */
export type Exclude<T, U> = T extends U ? never : T

export type TestCase = 'name' | 'age' | 'username'

export type TestCaseExclude = Exclude<TestCase, 'name' | 'age'>
