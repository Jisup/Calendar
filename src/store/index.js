import state from "./state.js";
import * as actions from "./actions.js";
import * as getters from "./getters.js";
import * as mutations from "./mutations.js";

const root = {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
export default root;
