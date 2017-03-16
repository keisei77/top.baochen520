import Vue from 'vue'
import Router from 'vue-router'

function registerComponent (component) {
  return require(`@/pages/${component}/${component}.vue`)
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: registerComponent('home')
    },
    {
      path: '/wander',
      name: 'wander',
      component: registerComponent('wander')
    },
    {
      path: '/login',
      name: 'login',
      component: registerComponent('login')
    },
    {
      path: '/register',
      name: 'register',
      component: registerComponent('register')
    },
    {
      path: '/moments/:userId',
      name: 'moments',
      component: registerComponent('moments')
    },
    {
      path: '/share/:userId',
      name: 'share',
      component: registerComponent('share')
    }
  ]
})
