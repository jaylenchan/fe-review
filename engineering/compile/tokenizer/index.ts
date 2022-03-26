import {
  LeftParentheses,
  // RightParentheses,
  JSXIdentifier,
  AttributeKey,
  AttributeValue,
  AttributeStringValue
  // JSXText,
  // BackSlash
} from './types'

class Token {
  type: string
  value: string

  constructor(type: string, value: string) {
    this.type = type
    this.value = value
  }
}

class Tokenizer {
  tokens: Array<Token> = []
  input: string
  curToken: Token = new Token('', '')
  state: any = this.start

  constructor(input: string) {
    this.input = input
  }

  run() {
    for (let char of this.input) {
      this.state = this.state(char)
    }

    return this.tokens
  }

  start(char: string) {
    if (char === '<') {
      this.curToken.type = LeftParentheses
      this.curToken.value = '<'
      this.emit(this.curToken)
      return this.foundLeftParentheses
    }

    throw new Error('第一个字符必须是<')
  }

  foundLeftParentheses(char: string) {
    const letter = /[a-z]/
    if (letter.test(char)) {
      this.curToken.type = JSXIdentifier
      this.curToken.value += char
      return this.jsxIdentifier
    }
    throw new Error('foundLeftParentheses error')
  }

  jsxIdentifier(char: string) {
    const letterOrDigit = /[a-z0-9]/
    if (letterOrDigit.test(char)) {
      this.curToken.value += char
      return this.jsxIdentifier
    } else if (char === ' ') {
      this.emit(this.curToken)
      return this.attribute
    }
    throw new Error('jsxIdentifier error')
  }

  attribute(char: string) {
    const letter = /[a-z]/
    if (letter.test(char)) {
      this.curToken.type = AttributeKey
      this.curToken.value += char
      return this.attributeKey
    }
    throw new Error('attribute error')
  }

  attributeKey(char: string) {
    const letter = /[a-z]/
    if (letter.test(char)) {
      this.curToken.value += char
      return this.attributeKey
    } else if (char === '=') {
      this.emit(this.curToken)
      this.curToken.type = AttributeValue
      return this.attributeValue
    } else if (char === ' ') {
      return this.attributeKey
    }
    throw new Error('attributeKey error')
  }

  attributeValue(char: string) {
    if (char === '"') {
      this.curToken.value = '"'
      this.emit(this.curToken)
      this.curToken.type = AttributeStringValue
      return this.attributeStringValue
    }
    throw new Error('attributeValue error')
  }

  attributeStringValue(char: string) {
    const letter = /[a-z]/
    if (letter.test(char)) {
      this.curToken.value += char
      return this.attributeStringValue
    } else if (char === '"') {
      this.emit(this.curToken)
      this.curToken.type = AttributeValue
      this.curToken.value = '"'
      this.emit(this.curToken)
      this.curToken.type = AttributeKey
      return this.attributeKey
    }
    throw new Error('attributeStringValue error')
  }

  tryLeaveAttribute() {}

  foundRightParentheses() {}

  jsxText() {}

  emit(token: Token) {
    this.tokens.push(token)
    this.curToken = new Token('', '')
  }
}

const tokenizer = new Tokenizer('<h1 id="title" name={name}><span>hello</span>world</h1>')
const tokens = tokenizer.run()
console.log('tokens =>', tokens)
