/**
 * 横向模糊：字符串的长度不是固定的，可以是多种情况
 * 实现横向模糊匹配的技术：使用量词
 * 量词: ?, *, + , {m,n}, {m,}
 */
var regex = /ab{2,5}c/g
var string = 'abc abbc abbbc abbbbc abbbbbc abbbbbbc'
console.log(string.match(regex))

/**
 * 纵向模糊：字符串具体到某个字符进行匹配的时候，这个具体的字符是有多个可能的情况的
 * 实现纵向模糊匹配的技术：使用字符组
 * 字符组: [abc],只表示一个字符，a或者b或者c
 * 遇到字符组可能的情况很多，但是连续的可能，可以用范围表示法: [a-z]
 * 排除字符组: [^abc]: 除了abc三个字符之外的任意的一个字符
 * 特殊的字符组： \d \D \w \W \b \B \s \S .
 */
var regex = /a[123]b/g
var string = 'a0b a1b a2b a3b a4b'
console.log(string.match(regex))

/**
 * 贪婪匹配：正则匹配字符串默认是在满足条件的基础上越多越好
 * 取消贪婪：在量词后加?
 */
// var regex = /\d{2,5}/g
var regex = /\d{2,5}?/g
/**
 * 这种情况固定量词 === 取消贪婪的原因在于规则前后没有限定条件，所以可能相同结果，如果在规则前后加个ab，结果就变了
 * 不加限定条件/\d{2,5}?/g就相当于全局不断搜索满足(''加2-5个数字（满足了最小的就可停止了)加'')
 */
// var regex = /\d{2}/g
var string = '123 1234 12345 123456'
console.log(string.match(regex))

/**
 * 取消贪婪 !== 固定量词
 * /a\d??b/ !== /a\d{0}b/
 * /a\b??b/ 的意思是a和b中间夹着着0个或者1个数字，优先匹配捕获0个数字，即ab,然后没有就匹配捕获a1b
 * /a\d{0}b/ 的意思是a和b中间一定要夹着0个数字，即只匹配上ab，对于a1b是不匹配的
 */
var regex = /a\d??b/
// var regex = /a\d{0}b/
var string = 'a1b'
console.log(string.match(regex))

/**
 * 多分支：多个模式任选其一匹配
 * 实现技术： (p1子模式|p2子模式|p3子模式)
 */
var regex = /good|nice/g
var string = 'good idea, nice try.'
console.log(string.match(regex))

/**
 * 分支结构也是有惰性的，子模式一个匹配上了，就不会再用另一个子模式对同一个字符串进行二次匹配了
 * 同一个字符串只应用一个子模式匹配
 */
var regex = /good|goodbey/g
var regex = /goodbey|good/g
var string = 'goodbey'
console.log(string.match(regex))
