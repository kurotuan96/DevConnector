import { ProfileService } from "@/api";

const state = {
  profiles: [],
  profile: {}
};

const mutations = {
  setProfiles(state, payload) {
    state.profiles = payload;
  },

  setProfile(state, payload) {
    state.profile = payload;
  }
};

const actions = {
  async getAllProfiles({ commit }) {
    const { data } = await ProfileService.getProfiles();
    commit("setProfiles", data);
  },

  async getCurrentProfile({ commit }) {
    const { data } = await ProfileService.getLoggedInProfile();
    commit("setProfile", data);
  },

  async addProfile(_, body) {
    await ProfileService.updateProfile(body);
  },

  async addExp(_, body) {
    await ProfileService.addExp(body);
  },

  async addEdu(_, body) {
    await ProfileService.addEdu(body);
  }
};

const getters = {
  profiles: state => state.profiles,
  profile: state => state.profile
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
