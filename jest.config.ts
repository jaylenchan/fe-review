export default {
  preset: 'ts-jest',
  clearMocks: true,
  testEnvironment: 'jsdom',
  coverageProvider: 'v8',
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)']
}
