const namespaced = true;
const state = {
    orderTable:{
      startTime:'',
      endTime:''
    },
    //筛选条件中的科室统一编码
    departmentValue:'',
    //预约页面接收的明细
    detailInfo:{},
    //预约页面接收的患者信息
    patientInfo:{}

}
// state 中派生出一些状态
const getters = {

};
//同步操作
const mutations = {
  SET_ORDERTABLETIME (state, data){
    state.orderTable.startTime=data.startTime;
    state.orderTable.endTime=data.endTime;
  },
  SET_DEPARTMENTVALUE (state, data){
    state.departmentValue=data;
  },
  SET_DETAILINFO(state,data){
    state.detailInfo=data;
  },
  SET_PATIENTINFO(state,data){
    state.patientInfo=data;
    console.log('state.patientInfo',state.patientInfo)
  }
}
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
