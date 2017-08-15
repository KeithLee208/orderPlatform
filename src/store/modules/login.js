/**
 * Created by sven on 2017/7/18.
 */
const namespaced = true;
const state = {
  userInfo:{
    type:'科室',
    yydm:'001'
  },//登录信息
};

// state 中派生出一些状态
const getters = {

};

//同步操作
const mutations = {
  //更新登录信息
  SET_USERINFO (state, userInfo){
    state.userInfo = userInfo;
  }
};

//异步操作
const actions = {

};

export default {
  namespaced,
  state,
  getters,
  mutations ,
  actions,
}
