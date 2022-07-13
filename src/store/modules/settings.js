import gitlab from "@/gitlab";

const state = {
  // eslint-disable-next-line
  darkMode: (typeof localStorage.getItem("darkMode") == "boolean" ? localStorage.getItem("darkMode") : (localStorage.getItem("darkMode") == "false" ? false : true)),
  apiEndpoint:
    localStorage.getItem("apiEndpoint") || process.env.VUE_APP_DEFAULT_GITLAB,
  apiToken: process.env.VUE_APP_API_TOKEN || localStorage.getItem("apiToken"),
};

const getters = {
  isConfigured(state) {
    return !!state.apiToken;
  }
};

const actions = {
  updateSettings({ commit, dispatch }, settings) {
    commit("updateSettings", settings);
    dispatch("fetchConnectedUser");
  },
  updateTheme({ commit }, mode) {
    commit("updateTheme", mode);
  }
};

const mutations = {
  updateSettings(state, settings) {
    state.apiEndpoint = settings.apiEndpoint;
    state.apiToken = settings.apiToken;
    localStorage.setItem("apiEndpoint", state.apiEndpoint || "");
    localStorage.setItem("apiToken", state.apiToken || "");

    // Re-initialize gitlab connection with new info
    // Unsure this approach is the best way to do so
    gitlab.init(this);
  },
  updateTheme(state, mode) {
    state.darkMode = mode;
    localStorage.setItem("darkMode", mode);
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};