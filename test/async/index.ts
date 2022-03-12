import axios from 'axios'

export const fetchData = () => {
  return axios.get('http://www.dell-lee.com/react/api/demo.json').then((res) => res.data)
}

export const fetchError = () => {
  return axios.get('http://www.dell-lee.com/react/api/error.json').then((res) => res.data)
}
