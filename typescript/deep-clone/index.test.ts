import deepClone from './index'

describe('deep-clone', () => {
  test('cloneObj.pet.reg !== obj.pet.reg', () => {
    const obj = {
      name: 'jaylen',
      pet: {
        name: 'dog',
        reg: /\d/,
        date: new Date()
      }
    }
    const cloneObj = deepClone(obj)

    cloneObj.pet.reg = /\w/
    expect(cloneObj.pet.reg).not.toBe(obj.pet.reg)
  })
})
