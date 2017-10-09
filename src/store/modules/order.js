const namespaced = true;
const state = {
    orderTable:{
      startTime:'',
      endTime:''
    }
}
// state 中派生出一些状态
const getters = {

};
//同步操作
const mutations = {
  SET_ORDERTABLETIME (state, data){
    state.orderTable.startTime=data.startTime;
    state.orderTable.endTime=data.endTime;
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
