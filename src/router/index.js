import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import News from '@/views/news'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/news',
      name: 'news',
      component: News
    }
  ]
})
