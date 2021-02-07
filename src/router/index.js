import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Details from '../views/Details.vue'
import Login from '../views/Login.vue'
import Overview from '../views/Overview.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { requiresAuth: true },
    component: Home,
    children: [
      {
        path: 'details',
        name: 'Details',
        component: Details
      },
      {
        path: 'overview',
        name: 'Overview',
        component: Overview
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    meta: { requiresVisitor: true },
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLogin) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.isLogin) {
      next({
        path: '/overview'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
