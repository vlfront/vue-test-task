import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Task from './views/Task.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/user/1/task/1',
      component: Home
    },
    {
      path: '/user/:userId/task/:taskId',
      name: 'task',
      props: true,
      component: Task
    }
  ]
})
