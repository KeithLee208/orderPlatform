/**
 * Created by sven on 2017/7/18.
 */
const namespaced = true;
const state = {
  userInfo:{
    type:'科室',
    yydm:'001',
    ksdm:'20000000.23.23.2180',
  },//登录信息
  userAuth:{
    type:'科室'
  }
};

// state 中派生出一些状态
const getters = {

};

//同步操作
const mutations = {
  //更新登录信息
  SET_USERINFO (state, userInfo){

    console.log('2',userInfo);
    Object.assign(state.userInfo,userInfo);
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
