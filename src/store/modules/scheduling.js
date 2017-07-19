/**
 * Created by sven on 2017/7/18.
 */
const namespaced = true;
const state = {
  departmentList:[],//医院所有预约科室
  serviceTypeList:[],//服务类型
  timeSlotList:[],//时间段列表
  specDiseaseList:[],//专病列表
  crumbs:{
    tptable:[]
  }
};

// state 中派生出一些状态
const getters = {

};

//同步操作
const mutations = {
  //更新医院所有预约科室
  SET_DEPARTMENTLIST (state, departmentList){
    state.departmentList = departmentList;
  },
  //更新服务类型
  SET_SERVICETYPELIST (state, serviceTypeList){
    state.serviceTypeList = serviceTypeList;
  },
  //更新时间段列表
  SET_TIMESLOTLIST (state, timeSlotList) {
    state.timeSlotList = timeSlotList;
  },
  //更新专病列表
  SET_SPECDISEASELIST (state, specDiseaseList) {
    state.specDiseaseList = specDiseaseList;
  },
  //更新面包屑
  SET_CRUMBS(state, payload) {
    state.crumbs[payload.key] = [];
    payload.val.map(item => {
      state.crumbs[payload.key].push(item)
    });
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
