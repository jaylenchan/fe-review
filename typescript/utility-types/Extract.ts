export type Extract<T, U extends T> = T extends U ? T : never

export type TestCase = 'name' | 'age' | 'username'

export type TestCaseExtract = Extract<TestCase, 'name' | 'username'>
