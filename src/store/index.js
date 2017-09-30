/**
 * Created by sven on 2017/7/18.
 */

import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import scheduling from './modules/scheduling'
import promise from 'es6-promise';
promise.polyfill();
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login,
    scheduling
  }
})
