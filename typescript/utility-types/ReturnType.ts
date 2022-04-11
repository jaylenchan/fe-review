export type ReturnType<T extends (...args: any[]) => any> = T extends (
  ...args: any[]
) => infer O
  ? O
  : never

export const TestCase = function () {
  return {
    name: 'jaylen',
    age: 20,
    username: 'jaylenchan'
  }
}

export type TestCaseReturnType = ReturnType<typeof TestCase>
