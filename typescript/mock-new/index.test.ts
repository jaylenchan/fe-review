import mockNew from './index'

describe('mock new', () => {
  test('jaylen.name === "jaylen"', () => {
    function Person(name: string) {
      // @ts-ignore
      this.name = name
    }
    const jaylen = mockNew(Person, 'jaylen')
    expect(jaylen['name']).toBe('jaylen')
  })

  test('jaylen.sayName() === "jaylen"', () => {
    function Person(name: string) {
      //@ts-ignore
      this.name = name
    }

    Person.prototype.sayName = function () {
      return this.name
    }

    const jaylen = mockNew(Person, 'jaylen')
    expect(jaylen['sayName']()).toBe('jaylen')
  })

  test('jaylen.name === jaylen, because Person constructor return an primitive type', () => {
    function Person(name: string) {
      //@ts-ignore
      this.name = name

      return name
    }

    const jaylen = mockNew(Person, 'jaylen')

    expect(jaylen['name']).toBe('jaylen')
  })

  test('jaylen.name === ashely, because Person constructor return an Object type', () => {
    function Person(name: string) {
      //@ts-ignore
      this.name = name

      return {
        name: 'ashely'
      }
    }

    const jaylen = mockNew(Person, 'jaylen')

    expect(jaylen['name']).toBe('ashely')
  })
})
