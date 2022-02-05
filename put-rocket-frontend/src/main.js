import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import * as VueGoogleMaps from "vue2-google-maps";
import { config } from "./config";

Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
  load: {
    key: config.apiKey,
    libraries: "places",
    region: "PL",
    language: "pl",
  },
  autobindAllEvents: true,
  installComponents: true,
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
