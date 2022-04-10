import axios from 'axios'

function getData() {
  return axios.get('/api/user')
}

const app = document.getElementById('app')

getData().then(({ data: { msg } }) => {
  app.innerHTML = `<h2>${msg}</h2>`
})
