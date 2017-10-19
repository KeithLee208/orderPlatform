/**
 * Created by sven on 2017/10/19.
 */
import api from '../../../api'
const namespaced = true;
const state = {
  departmentList:[],//医院所有预约科室
  serviceTypeList:[],//服务类型
  timeSlotList:[],//时间段列表
  specDiseaseList:[],//专病列表
};

const getters = {

};

const mutations = {
  //更新医院所有预约科室
  SET_DEPARTMENTLIST (state, data){
    state.departmentList = data;
  },
  //更新服务类型
  SET_SERVICETYPELIST (state, data){
    state.serviceTypeList = data;
  },
  //更新时间段列表
  SET_TIMESLOTLIST (state, data) {
    state.timeSlotList = data;
  },
  //更新专病列表
  SET_SPECDISEASELIST (state, data) {
    state.specDiseaseList = data;
  },
};

const actions = {
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
  }
};

export default {
  namespaced,
  state,
  getters,
  mutations ,
  actions,
}
