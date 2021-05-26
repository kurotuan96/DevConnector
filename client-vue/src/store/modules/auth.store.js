import { AuthService } from "@/api";
import Cookie from "js-cookie";

const state = {
  isAuthenticated: !!Cookie.get("token")
};

const mutations = {
  setToken(state, payload) {
    state.isAuthenticated = true;
    Cookie.set("token", payload.token);
  },

  setLogout(state) {
    state.isAuthenticated = false;
    Cookie.set("token", "");
  }
};

const actions = {
  async login({ commit }, body) {
    const { data } = await AuthService.getAuthToken(body);
    commit("setToken", data);
  }
};

const getters = {
  isAuthenticated: state => state.isAuthenticated
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
