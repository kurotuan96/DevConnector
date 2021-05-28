import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueProgressBar from 'vue-progressbar'
import { loadingBarOptions } from '@/config/loading-bar'
import moment from 'moment'
Vue.prototype.moment = moment
Vue.use(VueProgressBar, loadingBarOptions)

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
