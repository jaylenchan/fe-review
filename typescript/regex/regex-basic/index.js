/**
 * exec: 正则捕获
 * 捕获的内容是一个数组
 * 数组中的第一项是当前大正则捕获的内容
 * index: 捕获的内容在字符串中开始的索引位置
 * input: 捕获的原始字符串
 * 只有匹配的内容才会捕获到，没有匹配的话返回null
 */
// const regex = /\d+/

// const str = '2015jaylen2016'
// const strNull = 'jaylen'
/**
 * [ '2015', index: 0, input: '2015jaylen2016', groups: undefined ]
 *
 */
// console.log(regex.exec(str))
// console.log(regex.lastIndex) // lastIndex = 0，说明从第二次开始捕获还是0开始捕获
/**
 * 第二次捕获，还是匹配的2015
 * 因为正则捕获是具有懒惰性的，每一次执行exec只捕获第一个匹配的内容
 * 在不进行任何处理的情况下，执行多次捕获都是一样的结果，都是只捕获第一个匹配的内容
 * lastIndex是正则在字符串中进行捕获开始查找的位置
 */
// console.log(regex.exec(str))
// console.log(regex.lastIndex) // lastIndex = 0，说明从第二次开始捕获还是0开始捕获

/**
 * 如何解决正则的懒惰性，改变lastIndex
 * 解决：在正则的末尾加入修饰符g解决懒惰性
 * 修饰符：
 * global(g): 全局匹配
 * ignoreCase(i): 忽略大小写
 * multiline(m): 多行匹配
 *
 * 加入g之后，正则每一次都会在捕获到之后，更新lastIndex的值，下一次捕获就会从lastIndex继续开始查找
 * 当最后一次捕获结果是null的时候就知道捕获结束了
 */

// const regx1 = /\d+/g
// console.log(regx1.exec(str))
// console.log(regx1.exec(str))

/**
 * 默认地，正则捕获是贪婪的，比如说\d+，意思是包含至少一个连续数字的地方我都捕获出来，
 * 按理说1就是捕获到了，应该结束了，结果正则会继续捕获，直到无法再捕获为止。
 * 为了解决正则的贪婪性质，我们可以使用/\d+?/取消贪婪匹配
 */
// const regex1 = /\d+/
// console.log(regex1.exec('dd1023dd'))

// function getNum(str) {
//   const reg = /\d+/g
//   const result = []
//   let res = reg.exec(str)
//   while (res) {
//     result.push(res[0])
//     res = reg.exec(str)
//   }
//   return result
// }

// const result = getNum('2015jaylen2016chan2017')
// console.log(result)

/**
 * 解决正则的贪婪性：在量词之后加?
 * ?在正则当中有很多作用：
 * 1. 放在一个元字符后边，代表0-1次
 * 2. 放在一个量词元字符后头，代表取消贪婪捕获，中了就返回
 */
// function getNum1(str) {
//   const result = []
//   const reg = /\d+?/g
//   let res = reg.exec(str)
//   while (res) {
//     result.push(res[0])
//     res = reg.exec(str)
//   }
//   return result
// }

// const result1 = getNum1('2015jaylen1024')
// console.log(result1)

/**
 * 字符串中的match
 * 不加g修饰符，str.match的结果跟reg.exec结果一致
 * 加了g，str.match的结果就是将所有符合条件的值直接取出来组成数组
 */
// const reg = /\d+/g
// const str = '2015jaylen2016'

// console.log(str.match(reg))

/**
 * 虽然match比exec更加简洁，但是match中存在一些问题：在分组捕获的情况下，match只能捕获到大正则匹配的内容，对于小正则捕获的内容是没法提取的
 */

/**
 * 正则分组：
 * 1. 改变优先级
 * 2. 分组引用
 */
/**
 * \1 表示跟第一个分组长一样的内容
 * \2 表示跟第二个分组长一样的内容
 */
// const reg = /^\w+\1\w+$/
// const str = 'jayjaylenlen'
// console.log(reg.test(str))

/**
 * 正则分组:分组捕获。不仅匹配大正则，也匹配小正则
 */
// const reg = /^(\d{2})(\d{4})(\d{4})(\d{2})(\d{2})(\d{2})(\d)(\d|X)$/
// const str = '460103187603212135'
/**
 * reg.exec(str)结果是一个数组
 * 其中：
 * 第一个元素是大正则捕获到的内容
 * 第二个元素开始依次是小正则捕获到的内容
 * 但是这样子就捕获了所有内容，我们其实很多时候不想要捕获部分内容，只需要匹配即可
 * 使用?:就可以实现，只匹配，但是不捕获的效果
 *
 */
// console.log(reg.exec(str))
// const reg = /^(\d{2})(\d{4})(\d{4})(\d{2})(\d{2})(?:\d{2})(\d)(\d|X)$/
// const str = '460103187603218935'

/**
 * [
  '460103187603218935',
  '46',
  '0103',
  '1876',
  '03',
  '21',
  '3',
  '5',
  index: 0,
  input: '460103187603218935',
  groups: undefined
]
 * 可以看到并没有捕获89
 */
// console.log(reg.exec(str))
// 我们用match试试
/**
 * [
  '460103187603218935',
  '46',
  '0103',
  '1876',
  '03',
  '21',
  '3',
  '5',
  index: 0,
  input: '460103187603218935',
  groups: undefined
]
发现结果一样
 */
// console.log(str.match(reg))

// const reg = /jaylen(\d+)chan(\d+)/
/**
[
  'jaylen1234chan12',
  '1234',
  '12',
  index: 0,
  input: 'jaylen1234chan12',
  groups: undefined
]

 * 结果是既能捕获到大正则的内容，也能够捕获到小正则的内容
 */
// console.log(reg.exec('jaylen1234chan12'))
// const reg = /[a-z]+(\d+)/g

// const str = 'jaylen123chan13ashley143'

/*
[
  'jaylen123',
  '123',
  index: 0,
  input: 'jaylen123chan13ashley143',
  groups: undefined
]
*/
// console.log(reg.exec(str))
/*
[
  'chan13',
  '13',
  index: 9,
  input: 'jaylen123chan13ashley143',
  groups: undefined
]
*/
// console.log(reg.exec(str))

// 接下来我们看看str.match
// [ 'jaylen123', 'chan13', 'ashley143' ]
// 当全局匹配的时候，str.match只捕获大正则的内容，不捕获小正则匹配的内容。这也是exec在全局匹配上和match的区别
// console.log(str.match(reg))

/**
 * replace：把原有的字符替换成新的字符
 */
// const str = 'jaylenloveashleyjaylen'
/**
 * 结果：chanloveashleyjaylen
 * 在不使用正则的情况下啊，每次用replace执行一次，只能替换一次jaylen这个字符串成chan。
 */
// console.log(str.replace('jaylen', 'chan'))
/**
 * 多次使用这种方式替换，依旧是从第一个开始替换，不会替换多个。不做任何处理，总是从0开始的
 */
// console.log(str.replace('jaylen', 'chan'))

// 下面使用正则的方式处理
// chanloveashleyjaylen
// 可以看到普通正则在处理上跟直接用字符串没啥区别
// console.log(str.replace(/jaylen/, 'chan'))
// 即使执行多次，也是从0开始捕获替换，而不会替换新的开始查找的位置
// console.log(str.replace(/jaylen/, 'chan'))
// 不过，如果我们加了g修饰符的话，那么就可以全部替换了
// console.log(str.replace(/jaylen/g, 'chan'))

/**
 * replace的原理：
 * 当replace第一个参数的值是一个正则的时候，首先会像exec一样，将所有满足要求的内容依次捕获起来（相当于执行多次exec）
 * 然后捕获完成之后，将捕获到的目标内容一一替换
 */

// 下面我们使用正则，不同的是第二个参数换成函数之后再看
// 结果： chanloveashleychan
// 我们发现，所有内容都替换掉了， 就像str.replace(/jaylen/g, 'chan')一样

// 我们发现一个现象：当正则捕获到一次匹配的内容的时候，传入的函数就会执行一次。匹配捕获多少次，就执行几次该函数
// console.log(
//   str.replace(/jaylen/g, function () {
//     return 'chan'
//   })
// )

// 但我们发现正则取消全局匹配了，那么就只捕获一次，结果就是fn只执行一次替换
// console.log(
//   str.replace(/jaylen/, function () {
//     return 'chan'
//   })
// )

// console.log(
//   str.replace(/jaylen/, function (...args) {
//     /**
//      * [ 'jaylen', 0, 'jaylenloveashleyjaylen' ]
//      * 打印出函数的args，发现这个东西跟正则exec捕获的内容形式完全，只不过是数组的方式出现
//      * 元素0:捕获到的内容
//      * 元素1: 捕获到的开始位置
//      * 元素2: 输入待捕获的字符串内容
//      */
//     console.log(args)
// return 'chan'  // return 返回的是啥，就将大正则当中捕获到的内容替换成啥
//   })
// )

/**
 * [
  'jaylen',
  index: 0,
  input: 'jaylenloveashleyjaylen',
  groups: undefined
]

 */
// console.log(/jaylen/.exec(str))

// const str = 'jaylen123chan'
// console.log(
//   str.replace(/(\d+)/, function (...args) {
//     // 获取使用RegExp.$1 ，就是获取第一个分组捕获的内容（了解）
//     // return RegExp.$1 + 1
//     // args[1]就是正则分组捕获到的第一个分组的内容
//     return args[1] + 1
//   })
// )

// const str = '20220414'

// const maps = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
// console.log(
//   str.replace(/\d/g, function (...args) {
//     return maps[args[0]]
//   })
// )
