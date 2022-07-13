import gitlab from "@/gitlab";

const state = {
  connectedUser: null,
  userName: (typeof localStorage.getItem("userName") == "string" ? localStorage.getItem("userName") : ""),
  userAvatar: (typeof localStorage.getItem("userAvatar") == "string" ? localStorage.getItem("userAvatar") : "")
};

const getters = {
  getConnectedUser(state) {
    return state.connectedUser;
  }
};

const actions = {
  fetchConnectedUser({ commit }) {
    return gitlab
      .get()
      .client.fetchCurrentUser()
      .then(user => {
        commit("setConnectedUser", user);
      });
  }
};

const mutations = {
  setConnectedUser(state, user) {
    state.connectedUser = user;
    state.userName = user.name;
    state.userAvatar = user.avatar_url;
    localStorage.setItem("userName", user.name);
    localStorage.setItem("userAvatar", user.avatar_url);
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
