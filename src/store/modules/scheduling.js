/**
 * Created by sven on 2017/7/18.
 */
import api from '../../../api'
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
  //获取相关字典
  getAllDicData({dispatch,commit},params){
    return new Promise((resolve, reject) => {
        Promise.all([dispatch('getDepartmentList',params),dispatch('getServiceTypeList',params),dispatch('getTimeSlotList',params),dispatch('getSpecDiseaseList',params)]).then(() => {
          console.log("%c%s", "color:blue" , "=======> 字典数据加载成功");
          resolve();
        }).catch(err => {
          console.log("%c%s", "color:blue" , "=======> 字典数据加载失败");
          reject(err);
        })
    })
  },
  //获取医院所有预约科室
  getDepartmentList({commit} ,params){
    return new Promise((resolve, reject) =>{
      api.post("PAT.WEB.APPOINTMENT.BASEINFO.Q02", params).then(data => {
        commit('SET_DEPARTMENTLIST',data);
        console.log("%c%s", "color:blue" , "=======> 医院所有预约科室列表加载成功");
        resolve(data);
      }).catch(err => {
        console.log(err);
        reject();
      });
    })
  },
  //通过科室选择医生列表
  getDocListByDepartment({commit} ,params){
    return new Promise((resolve, reject) =>{
      api.post("PAT.WEB.APPOINTMENT.BASEINFO.Q04", params).then(data => {
        console.log("%c%s", "color:blue" , "=======> 医生列表加载成功");
        resolve(data);
      }).catch(err => {
        console.log(err);
        reject();
      });
    })
  },
  //获取服务类型
  getServiceTypeList({commit} ,params){
    return new Promise((resolve, reject) =>{
      api.post("PAT.WEB.APPOINTMENT.BASEINFO.Q05", params).then(data => {
        commit('SET_SERVICETYPELIST',data);
        console.log("%c%s", "color:blue" , "=======> 服务类型列表加载成功");
        resolve(data);
      }).catch(err => {
        console.log("%c%s", "color:red" , "=======> 服务类型列表加载失败");
        reject(err);
      });
    })
  },
  //获取时间段列表
  getTimeSlotList({commit} ,params){
    return new Promise((resolve, reject) =>{
      api.post("PAT.WEB.APPOINTMENT.BASEINFO.Q06", params).then(data => {
        for (var i = 0; i < data.length; i++) {
          if (data[i].sjdmc === '全天') {
            let allday=data[i];
            data.splice(i, 1);
            data.push(allday);
            break;
          }
        }
        console.log("%c%s", "color:blue" , "=======> 时间段列表加载成功");
        commit('SET_TIMESLOTLIST',data);
        resolve(data);
      }).catch(err => {
        console.log("%c%s", "color:red" , "=======> 时间段列表加载失败");
        reject(err);
      });
    })
  },
  //获取专病信息
  getSpecDiseaseList({commit} ,params){
    return new Promise((resolve, reject) =>{
      api.post("PAT.WEB.APPOINTMENT.BASEINFO.Q07", params).then(data => {
        commit('SET_SPECDISEASELIST',data);
        console.log("%c%s", "color:blue" , "=======> 专病信息列表加载成功");
        resolve(data);
      }).catch(err => {
        console.log("%c%s", "color:red" , "=======> 专病信息列表加载失败");
        reject(err);
      });
    })
  },
  //获取医生出班模板列表
  getDocScheduleList({commit} ,params){
    return new Promise((resolve, reject) =>{
      api.post("PAT.WEB.APPOINTMENT.SCHEDULE.Q04", params).then(data => {
        console.log("%c%s", "color:blue" , "=======> 医生出班模板列表加载成功");
        resolve(data);
      }).catch(err => {
        console.log("%c%s", "color:red" , "=======> 医生出班模板列表加载失败");
        reject(err);
      });
    })
  }
};

export default {
  namespaced,
  state,
  getters,
  mutations ,
  actions,
}
