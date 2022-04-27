/**
 * 先对年排序，获取到所有年份
 * 遍历年份
 */
const removeDuplicate = (arr) => Array.from(new Set(arr))

function sortTimes(times, type = 'latest') {
  const sortType = {
    latest: (a, b) => b - a,
    oldest: (a, b) => a - b
  }
  const result = []
  times = times.join('&')
  removeDuplicate(times.match(/\w{4}(?=-)/g))
    .sort(sortType[type])
    .forEach((year, index) => {
      const monthReg = new RegExp(`(?<=${year}-)\\w+`, 'g')
      return removeDuplicate(times.match(monthReg))
        .sort(sortType[type])
        .map((month) => {
          const dayReg = new RegExp(`(?<=${year}-${month}-)\\w+`, 'g')
          times
            .match(dayReg)
            .sort(sortType[type])
            .forEach((day) => {
              if (!result.includes(`${year}-${month}-${day}`))
                result.push(`${year}-${month}-${day}`)
            })
        })
    })
  return result
}

const res = sortTimes(
  [
    '2020-01-29',
    '2019-06-10',
    '2018-02-01',
    '2013-06-12',
    '2020-01-31',
    '2019-03-12',
    '2018-03-05',
    '2014-02-22',
    '2018-03-05',
    '2019-08-19',
    '2018-02-01',
    '2013-06-12',
    '2020-01-31',
    '2019-03-12'
  ],
  'oldest'
)
console.log(res)
