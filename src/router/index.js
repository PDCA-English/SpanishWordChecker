import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Quiz from '../views/Quiz.vue'
import Finish from '../views/Finish.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/quiz',
    name: 'Quiz',
    component: Quiz
  },
  {
    path: '/finish',
    name: 'Finish',
    component: Finish
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
