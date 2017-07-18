/**
 * Created by sven on 2017/7/18.
 */

import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import scheduling from './modules/scheduling'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login,
    scheduling
  }
})
