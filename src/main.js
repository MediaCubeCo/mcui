import Vue from "vue";
import App from "./App.vue";
import WebFontLoader from "../src/utils/webFontLoader" // eslint-disable-line no-unused-vars
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)

Vue.config.productionTip = false;
Vue.prototype.toJSON = function () {
  return this;
};

new Vue({
  render: h => h(App)
}).$mount("#app");
