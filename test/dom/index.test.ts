import { addDivToBody } from './index'
import $ from 'jquery'

describe('test dom', () => {
  test('addDivToBody调用两次后，body中的div数量应该为2', () => {
    addDivToBody()
    addDivToBody()
    const divNums = $('body').find('div').length

    expect(divNums).toBe(2)
  })
})
