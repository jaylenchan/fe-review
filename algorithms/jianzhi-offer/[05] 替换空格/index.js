/**
 * {请实现一个函数，把字符串 s 中的每个空格替换成"%20"。}
 */

function replaceSpace(s) {
  const regex = /\s/g
  return s.replace(regex, '%20')
}
