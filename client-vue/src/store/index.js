import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/store/modules/auth.store'
import profile from '@/store/modules/profile.store'
import post from '@/store/modules/post.store'

Vue.use(Vuex)

const modules = {
  auth,
  profile,
  post
}

const state = {
  alertState: {
    status: '',
    data: [],
    isShow: false
  }
}

const mutations = {
  setAlertState (state, payload) {
    state.alertState = payload
  }
}

const actions = {
  showAlert ({ commit }, payload) {
    commit('setAlertState', payload)
    setTimeout(() => {
      commit('setAlertState', { ...payload, isShow: false })
    }, 2000)
  }
}

const getters = {
  alertState: state => state.alertState
}

export default new Vuex.Store({
  state,
  modules,
  actions,
  mutations,
  getters
})
