import Vue from 'vue'
import Router from 'vue-router'
import { routes } from '@/router/routes'
import store from '@/store'

Vue.use(Router)

const router = new Router({
  base: '/',
  routes
})

router.beforeEach(async (to, from, next) => {
  if (store.getters['auth/isAuthenticated']) {
    if (to.matched.some(page => page.meta.isPublic)) {
      store.commit('auth/setLogout')
      next()
    } else {
      next()
    }
  } else {
    store.commit('auth/setLogout')
    next()
  }
})

export default router
