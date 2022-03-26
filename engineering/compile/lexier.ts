/** 分词 */
const tokens: Array<Record<string, any>> = []

const NUMBERS = /[0-9]/
const Numeric = 'Numeric'
const Punctuator = 'Punctuator'

class Token {
  type: string
  value: string

  constructor(type: string, value: string) {
    this.type = type
    this.value = value
  }
}
let currentToken: Token

// 确定一个新的token了，只要emit就说明确定了token
function emit(token: Record<string, any>) {
  tokens.push(token)
}

function start(char: string) {
  currentToken = new Token(Numeric, '')
  return number(char) // 进入新的状态了
}

function number(char: string) {
  if (NUMBERS.test(char)) {
    currentToken.value += char
    return number
  } else if (char === '+' || char === '-') {
    emit(currentToken)
    currentToken = new Token(Punctuator, char)
    emit(currentToken)
    currentToken = new Token(Numeric, '')
    return number
  }
  return number
}

function tokenizer(input: string) {
  let state: any = start
  for (let char of input) {
    state = state(char)
  }
  if (currentToken.value.length > 0) {
    emit(currentToken)
  }
}

tokenizer('10+20-5')

console.log('tokens => ', tokens)
