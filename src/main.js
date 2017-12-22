// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import store from './store';
import { router } from './router';
import {
  sync
} from 'vuex-router-sync';
import Emitter from './libs/emitter';
import filters from './libs/filters';

import ElementUI from 'element-ui';
import '../theme/index.css'
// router.beforeEach((to, from, next) => {
//   if ((to.name == 'login') || (to.meta && to.meta.role && localStorage.getItem("ms_role") && (to.meta.role.indexOf(localStorage.getItem("ms_role")) > -1) || localStorage.getItem("ms_role") == to.meta.role)) {
//     next();
//   } else {
//     next({ path: '/login' });
//     // history.back();
//   }
// });
// 实例化Vue的filter
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));
Vue.use(ElementUI);

Vue.config.productionTip = false;
// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router);
/* eslint-disable no-new */
window.callerDashboardApp = new Vue({
  mixins: [Emitter],
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {
    App
  }
});
