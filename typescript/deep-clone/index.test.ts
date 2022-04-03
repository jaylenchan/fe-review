import deepClone from './index'

describe('deep-clone', () => {
  test('cloneObj.pet.reg !== obj.pet.reg', () => {
    const obj = {
      name: 'jaylen',
      pet: {
        name: 'dog',
        reg: /\d/,
        date: new Date()
      },
      freinds: [1, 2, 3]
    }
    ;(obj as Record<string, any>)['circle'] = obj
    const cloneObj = deepClone(obj)

    cloneObj.pet.reg = /\w/
    cloneObj.freinds[0] = 4
    console.log('cloneObj', cloneObj)
    expect(cloneObj.pet.reg).not.toBe(obj.pet.reg)
    expect(cloneObj.freinds[0]).not.toBe(obj.freinds[0])
  })
})
