/**
 * Created by sven on 2017/7/18.
 */
const namespaced = true;
const state = {
  userInfo:{
    type:'',
    yydm:'',
    ksdm:'',
  }//登录信息
};

// state 中派生出一些状态
const getters = {

};

//同步操作
const mutations = {
  //更新登录信息
  SET_USERINFO (state, userInfo){
    if(userInfo.context.roleList[0].name=="HIS.APPOINTMENT.DEPARTMENT") state.userInfo.type='科室';
    if(userInfo.context.roleList[0].name=="HIS.APPOINTMENT.OFFICE") state.userInfo.type='门办';
    state.userInfo.ksdm=userInfo.context.zgxx.kstybm;
    state.userInfo.yydm=userInfo.context.zgxx.yljgbm;
    console.log('2',userInfo);
  },
  CHANGE_USERINFO(state, userInfo){
     state.userInfo.type=userInfo;
     console.log(state.userInfo);
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
