const test = () => {
  const listArray = [
    {
      input: [1, 2, [3, 4, 5]],
      output: '[ 1 2 [ 3 4 5 ] ]'
    },
    {
      input: [79, [[88, 98], 99]],
      output: '[ 79 [ [ 88 98 ] 99 ] ]'
    },
    {
      input: [11, [22, [23, 24], 25, [26]]],
      output: '[ 11 [ 22 [ 23 24 ] 25 [ 26 ] ] ]'
    }
  ]
  listArray.map((data) => {
    const result = stringify(data.input)
    console.log(result === data.output)
  })
}

function stringify(data) {
  const regex = /(?<=\[)|(?=\])/g
  const dt = JSON.stringify(data).replace(regex, ' ')
  return dt.replace(/,/g, ' ')
}

test()
