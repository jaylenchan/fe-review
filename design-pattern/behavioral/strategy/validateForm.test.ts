/**
 * 需求：假设我们正在编写一个注册的页面,在点击注册按钮之前,有如下几条校验逻辑：
 * 1. 用户名不能为空
 * 2. 密码长度不能少于 6 位
 * 3. 手机号码必须符合格式
 * 使用策略模式编写一段代码，完成以上的校验逻辑。
 */
import Validator, { Form, IsEmpty, IsMinlength, IsMobile } from './validateForm'
describe('test validate form', () => {
  test('valid Form', () => {
    const form = new Form('jaylen', '123456', '13332084354')
    const validator = new Validator(form, {
      username: [new IsEmpty()],
      password: [new IsMinlength()],
      phone: [new IsMobile()]
    })
    const validateResult = validator.validate()

    expect(validateResult.username['isEmpty']).toBe(true)
    expect(validateResult.password['isMinLength']).toBe(true)
    expect(validateResult.phone['isMobile']).toBe(true)
  })

  test('inValid Form', () => {
    const form = new Form('', '123', '11111111')
    const validator = new Validator(form, {
      username: [new IsEmpty()],
      password: [new IsMinlength()],
      phone: [new IsMobile()]
    })
    const validateResult = validator.validate()

    expect(validateResult.username['isEmpty']).toBe(false)
    expect(validateResult.password['isMinLength']).toBe(false)
    expect(validateResult.phone['isMobile']).toBe(false)
  })
})
