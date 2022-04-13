function object(proto) {
  function F() {}

  F.prototype = proto

  return new F()
}

function createAnother(proto) {
  const clone = object(proto)

  clone.say = function () {
    console.log('say')
  }
  return clone
}
