import Vue from 'vue'
import App from './App.vue'
import router from './router'

new Vue({
  name: 'root',
  el: '#app',
  render: (h) => h(App),
  router
})
