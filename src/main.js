// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import wnhttp from "../api/wnhttp";
import wnstorage from  './wnstorage'
import 'babel-polyfill'
import promise from 'es6-promise';
promise.polyfill();
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(wnhttp, { mode: 'dev' });
Vue.use(wnstorage);

//路由钩子
router.beforeEach((to, from, next) => {
  if(to.path === '/login'){
    next();
  }else{
    if(sessionStorage.getItem('jwtToken')){
      next();
    }else{
      next('/login'); // 如果没有token,全部定位到登录页
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  data: {
    eventHub: new Vue()
  },
  template: '<App/>',
  components: { App }
})


