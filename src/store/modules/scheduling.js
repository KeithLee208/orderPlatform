/**
 * Created by sven on 2017/7/18.
 */
const namespaced = true;
const state = {
  departmentList:[],//医院所有预约科室
  serviceTypeList:[],//服务类型
  doctorList:[],//医生列表
  timeSlotList:[],//时间段列表
  specDiseaseList:[],//专病列表
  crumbs:{
    tptable:[]
  },//面包屑对象集合
  currentDocSchedule:{},//当前所选医生出班表
  currentTemplateSet:{
    ksdm:'',
    ysdm:''
  }//当前出班模板设置
};

// state 中派生出一些状态
const getters = {

};

//同步操作
const mutations = {
  //更新医院所有预约科室
  SET_DEPARTMENTLIST (state, data){
    state.departmentList = data;
  },
  //更新服务类型
  SET_SERVICETYPELIST (state, data){
    state.serviceTypeList = data;
  },
  //更新医生列表
  SET_DOCTORLIST(state, data){
    state.doctorList = data;
  },
  //更新时间段列表
  SET_TIMESLOTLIST (state, data) {
    state.timeSlotList = data;
  },
  //更新专病列表
  SET_SPECDISEASELIST (state, data) {
    state.specDiseaseList = data;
  },
  //更新面包屑
  SET_CRUMBS(state, payload) {
    state.crumbs[payload.key] = [];
    payload.val.map(item => {
      state.crumbs[payload.key].push(item)
    });
  },
  //更新当前所选医生出班表
  SET_CURRENTDOCSCHEDULE(state,data){
    state.currentDocSchedule =  data;
  },
  //更新当前出班模板设置
  SET_CURRENTTEMPLATESET(state,payload){
    state.currentTemplateSet[payload.key] =  payload.value;
    console.log(state.currentTemplateSet);
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
