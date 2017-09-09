// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import login from './login'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import wnhttp from "../api/wnhttp";
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(wnhttp, { mode: 'dev' });
/* eslint-disable no-new */
new Vue({
  el: '#login',
  render: h => h(login),
  router,
  store,
  data: {
    eventHub: new Vue()
  },
  template: '<login/>',
  components: { login }
})
