import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from "./actions";
import * as getters from "./getters";
import state from "./state";
import mutations from "./mutations";

import user from "./modules/user";
import settings from "./modules/settings";
import assessment from "./modules/assessment";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    settings,
    assessment
  },
  state,
  actions,
  getters,
  mutations,
  strict: process.env.NODE_ENV !== "production"
});