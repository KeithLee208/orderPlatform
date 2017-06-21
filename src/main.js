// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'wued-ui/lib/theme-default/index.css'
import WuedUI from 'wued-ui'

Vue.config.productionTip = false
Vue.use(WuedUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
