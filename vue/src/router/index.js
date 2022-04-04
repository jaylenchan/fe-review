import Vue from 'vue'
import VueRouter from '../../vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    component: {
      render() {
        return (
          <div>
            Home <router-view></router-view>
          </div>
        )
      }
    },
    children: [
      {
        path: 'achild',
        component: {
          render() {
            return <div>achild</div>
          }
        }
      },
      {
        path: 'bchild',
        component: {
          render() {
            return <div>bchild</div>
          }
        }
      }
    ]
  },
  {
    path: '/login',
    component: {
      render() {
        return <div>Login</div>
      }
    }
  }
]

export default new VueRouter({
  routes
})
