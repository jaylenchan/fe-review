/**
 * 位置匹配：就是相邻字符之间的位置的匹配
 * 实现技术：^ $ \b \B (?=p) (?!p)
 */

/**
 * /^|$/g意思是让行的开头和结尾的位置替换成#号，可以看成是将''看成是#
 */
// var result = 'hello'.replace(/^|$/g, '#')
// console.log(result)

// var result = 'I Love JS\nI Love Cookie'.replace(/^|$/gm, '#')
// console.log(result)

/**
 * \b 表示单词边界，包括\w和\W之间，^和\w之间，\w和$之间
 */
// var string = '[JS] Lesson_01.mp4'
// var result = string.replace(/\b/g, '#')
// console.log(result)

/**
 * \B 表示非单词的边界
 */
// var string = '[JS] Lesson_01.mp4'
// var result = string.replace(/\B/g, '#')
// console.log(result)

/**
 * 定义：前后的定义是左边是后，右边是前
 * lookahead是就是指右边
 * lookbehind：往后看，谁往后看，(?<=p)或者(?<!p)右边的元素往后看(?<=p)或者(?<!p)
 * x(?=p)和x(?!p) :   x右边必须要是p模式 和 x右边必须不能是p模式
 * (?<=p)x和(?<!p)x :  x左边必须要是p模式 和 x左边必须不能是p模式
 */

// 意思是/(?=l)/g全局匹配所有的''后边必须是l的这中''，然后插入#
// /(?=l)/g假装(?=l)左边有一个
// var result = 'hello'.replace(/(?=l)/g, '#')
// console.log(result)

// var result = 'hello'.replace(/(?<=l)/g, '#')
// console.log(result)

/**
 * /?!^/ 把非开头的字符前边的位置（咋样咋样）
 * /(?l)/g 在全局进行匹配，把l前边的位置（咋样咋样）
 * /(?!l)/g 在全局进行匹配，把非l的字符前边的位置（咋样咋样）
 */
// var result = 'hello'.replace(/(?!l)/g, '#')
// // #h#ell#o# 注意前后都有，是因为开头位置^和结尾位置#
// console.log(result)
