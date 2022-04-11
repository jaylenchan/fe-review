export type NonNullable<T> = T extends null | undefined ? never : T

export type TestCase = number | string | null | undefined

export type TestCaseNonNullable = NonNullable<TestCase>
