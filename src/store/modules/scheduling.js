/**
 * Created by sven on 2017/7/18.
 */
const namespaced = true;
const state = {
  //----- 出班模板 ----//
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
  selDepartListKsdm:[],//门办已选科室列表进入详情页科室代码
  mbdm:[],//点击卡片传递所选科室代码
  curSelDepartList:[],//当前选择科室列表
  currentDocSchedule:{},//当前所选医生出班表
  currentSchedulingSet:{},//当前排班设置
  allTypeList:{},//用于点击服务类型切换数据的总集合
  //----- 出班模板 ----//

  //----- 出班表 ----//
  workTableTime:{},
  headofficePostList:{},
  plusWork:{}
  //----- 出班表 ----//
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
    Object.assign(state.currentSchedulingSet,data)
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
  },
  //更新出班表查询开始结束日期
  SET_DATETIMENOW(state,data){
    state.workTableTime=data;
  },
  //更新门办点击进入科室代码
  SET_HEADOFFICEPOSTLIST(state,data){
    Object.assign(state.headofficePostList,data);
  },
  //更新临时出班
  SET_WORKPLUS(state,data){
    Object.assign(state.plusWork,data);
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
