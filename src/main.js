import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import UUID from 'vue-uuid'
import draggable from 'vuedraggable'


Vue.use(ElementUI);
Vue.use(UUID);
Vue.use(draggable);

Vue.component('draggable', draggable)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
