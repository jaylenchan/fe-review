export default function stringify(data: Array<any>) {
  const regex = /(?<=\[)|(?=\])/g
  const dt = JSON.stringify(data).replace(regex, ' ')
  return dt.replace(/,/g, ' ')
}
