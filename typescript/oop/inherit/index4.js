function object(proto) {
  function F() {}
  F.prototype = proto
  /** instanceF -> F.prototype -> proto -> proto.__proto__ */
  return new F()
}

const jaylen = {
  name: 'jaylen',
  colors: ['red', 'yellow', 'blue']
}

/**
 * ashley -> jaylen -> jaylen.prototype
 */
const ashley = object(jaylen)
ashley.name = 'ashley'
ashley.colors.push('black')

console.log('jaylen.colors', jaylen.colors)
console.log('ashley.colors', ashley.colors)

console.log('jaylen.name', jaylen.name)
console.log('ahshley.name', ashley.name)
