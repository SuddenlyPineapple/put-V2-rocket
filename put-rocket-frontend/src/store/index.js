import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: false,
    routes: [
      {
        text: "Dashboard",
        to: "/",
      },
    ],
  },
  getters: {
    routes: (state) => state.routes,
  },
  mutations: {
    setDrawer: (state, payload) => (state.drawer = payload),
    toggleDrawer: (state) => (state.drawer = !state.drawer),
  },
  actions: {},
});
