export class Form {
  public username: string
  public password: string
  public phone: string

  public constructor(username: string, password: string, phone: string) {
    this.username = username
    this.password = password
    this.phone = phone
  }
}

interface IValidate {
  name: string
  validate(formItem: string): boolean
}

export class IsEmpty implements IValidate {
  public name: string = 'isEmpty'
  validate(formItem: string): boolean {
    if (formItem === '') {
      return false
    }
    return true
  }
}

export class IsMobile implements IValidate {
  public name: string = 'isMobile'
  validate(formItem: string): boolean {
    if (!/(^1[3|5|8][0-9]{9}$)/.test(formItem)) {
      return false
    }
    return true
  }
}

export class IsMinlength implements IValidate {
  public name: string = 'isMinLength'
  validate(formItem: string): boolean {
    if (formItem.length < 6) {
      return false
    }
    return true
  }
}

interface IRules<T extends IValidate[]> {
  [prop: string]: T
}

type ChangeType<T> = {
  [prop in keyof T]: {
    [prop: string]: boolean
  }
}

export default class Validator<U extends IValidate[]> {
  private form: Form
  private rules: IRules<U>

  constructor(form: Form, rules: IRules<U>) {
    this.form = form
    this.rules = rules
  }
  public validate() {
    const validateResult = {} as ChangeType<Form>

    Reflect.ownKeys(this.rules).forEach((formItem) => {
      this.rules[formItem as string]?.forEach((rule) => {
        if (!validateResult[formItem as keyof Form]) {
          validateResult[formItem as keyof Form] = {}
        }
        validateResult[formItem as keyof Form][rule.name] = rule.validate(
          this.form[formItem as keyof Form]
        )
      })
    })

    return validateResult
  }
}
