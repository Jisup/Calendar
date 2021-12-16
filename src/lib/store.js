import { createStore } from "vuex";
import root from "@/store.js";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  modules: { root },
  plugins: [createPersistedState()],
});
