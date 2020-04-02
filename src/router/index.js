import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Word from '../components/Word.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/word/:id?',
    name: 'Word',
    component: Word
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
