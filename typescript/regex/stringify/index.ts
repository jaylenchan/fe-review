export default function stringify(data: Array<any>) {
  // 匹配某个左边是[的位置，或者匹配某个右边是]的位置
  const regex = /(?<=\[)|(?=\])/g
  const dt = JSON.stringify(data).replace(regex, ' ')
  return dt.replace(/,/g, ' ')
}
