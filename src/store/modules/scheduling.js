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
  currentsSelectTemplate:{},//当前所选出班模板
  channalList:[],//预约渠道列表
  SelDepartListKsdm:[],//门办已选科室列表进入详情页科室代码
  mbdm:[],//点击卡片传递所选科室代码
  curSelDepartList:[],//当前选择科室列表
  currentDocSchedule:{},//当前所选医生出班表

  currentSchedulingSet:{}//当前排班设置
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
  //更新当前所选出班模板
  SET_CURRENTSELECTTEMPLATE(state, data){
    state.currentsSelectTemplate = data;
  },
  //更新当前所选医生出班表
  SET_CURRENTDOCSCHEDULE(state,data){
    state.currentDocSchedule =  data;
  },
  //更新当前排班设置CURRENTSCHEDULING
  SET_CURRENTSCHEDULING(state,data){
    state.currentSchedulingSet = data;
  },
  //更新预约渠道
  SET_CHANNALLIST(state,data){
    state.channalList =  data;
  },
  //更新当前选择科室列表
  SET_CURSELDEPARTLIST(state,data){
    state.curSelDepartList =  data;

  },
  //卡片页点击传递模板代码
  SET_MBDM(state,data){
    state.mbdm=data;
    console.log('模板代码',state.mbdm);
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
