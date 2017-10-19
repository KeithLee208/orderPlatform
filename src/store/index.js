/**
 * Created by sven on 2017/7/18.
 */

import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import datasets from './modules/datasets'
import login from './modules/login'
import scheduling from './modules/scheduling'
import order from './modules/order'
import promise from 'es6-promise';
promise.polyfill();
Vue.use(Vuex);
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    datasets,
    login,
    scheduling,
    order
  }
})
