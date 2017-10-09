<template>
  <div>
    <WHeader></WHeader>
    <div class="content-warrper">
       <router-view></router-view>
    </div>
    <WFooter></WFooter>
  </div>
</template>

<script>
  import WHeader from 'components/base/header/index'
  import WFooter from 'components/base/footer/index'
  import axios from "axios";
  export default {
    created(){
      this.$nextTick(() => {
        this.login().then(() => {
//            this.getUserInfo();
          this.init();
        });
      })
    },
    methods:{
      init(){
        this.getDepartmentList();
        this.getServiceTypeList();
        this.getTimeSlotList();
        this.getSpecDiseaseList();
      },
      login(){
        return new Promise((resolve, reject) => {
          let target = 'http://172.16.0.131:8888/auth/login';
          let OFFICE='00';//门办用户名
          let DEPARTMENT='02';//科室用户名
          axios({
            url: target,
            method: 'get',
            params:{
              p:111111,
              u:DEPARTMENT,
            },
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'application/json;charset=UTF-8'
            }
          }).then(res => {
            console.log('123',res)
            sessionStorage.setItem('jwtToken',res.data.Response.body.jwtToken);
            this.$store.commit('login/SET_USERINFO',res.data.Response.body);
            console.log('登录信息 %o',this.$store.state.login.userInfo);
            resolve();
          }).catch(error => {
            reject(error);
          });
        });
      },
      //获取医院所有预约科室
      getDepartmentList(){
        this.$wnhttp("PAT.WEB.APPOINTMENT.BASEINFO.Q02", {yydm:this.$store.state.login.userInfo.yydm}).then(data => {
          console.log('Q01科室列表 %o', data);
          this.$store.commit('scheduling/SET_DEPARTMENTLIST',data)
        }).catch(err => {
          console.log(err);
        });
      },
      //获取服务类型
      getServiceTypeList(){
        this.$wnhttp("PAT.WEB.APPOINTMENT.BASEINFO.Q05", {yydm:this.$store.state.login.userInfo.yydm}).then(data => {
          console.log('Q05服务类型列表 %o', data);
          this.$store.commit('scheduling/SET_SERVICETYPELIST',data)
        }).catch(err => {
          console.log(err);
        });
      },
      //获取时间段列表
      getTimeSlotList(){
        this.$wnhttp("PAT.WEB.APPOINTMENT.BASEINFO.Q06", {yydm:this.$store.state.login.userInfo.yydm}).then(data => {
          for (var i = 0; i < data.length; i++) {
            if (data[i].sjdmc === '全天') {
              let allday=data[i];
              data.splice(i, 1);
              data.push(allday);
              break;
            }
          }
          console.log('Q06时间段列表 %o', data);
          this.$store.commit('scheduling/SET_TIMESLOTLIST',data)
        }).catch(err => {
          console.log(err);
        });
      },
      //获取专病信息
      getSpecDiseaseList(){
        this.$wnhttp("PAT.WEB.APPOINTMENT.BASEINFO.Q07", {yydm:this.$store.state.login.userInfo.yydm}).then(data => {
          console.log('Q07专病列表 %o', data);
          this.$store.commit('scheduling/SET_SPECDISEASELIST',data)
        }).catch(err => {
          console.log(err);
        });
      }
    },
    components: {
      WHeader, WFooter
    }
  }
</script>

<style>
  @import '../../static/css/reset.css';
  @import '../../static/font/iconfont.css';
  body {
    overflow-x: hidden;
    background-color: #f9f9f9;
    height: 100%;
  }
  .content-warrper{
    box-sizing: border-box;
    width: 100%;
    min-height: 833px;
    padding:20px;
    background: #F3F6FA;
  }
  .filter-warrper{
    width: 100%;
    box-sizing: border-box;
  }
  .pagebody{
    box-sizing: border-box;
    display: inline-block;
    width: 100%;
  }
  .pull-left{
    float: left;
  }
  .pull-right{
    float: right;
  }
  .pull-width{
    width: 100%;
  }
  .color-333{
    color: #333;
  }
  @media screen and (max-width: 1225px){
    .header > .logo>span{
      display: none !important;
    }
    .nav-1st{
      margin-left: 0px !important;
    }
  }
  ::-webkit-scrollbar
  {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track-piece
  {
    background-color: #CCCCCC;
    -webkit-border-radius: 6px;
  }
  ::-webkit-scrollbar-thumb:vertical
  {
    height: 5px;
    background-color: #999;
    -webkit-border-radius: 6px;
  }
  ::-webkit-scrollbar-thumb:horizontal
  {
    width: 5px;
    background-color: #CCCCCC;
    -webkit-border-radius: 6px;
  }
</style>
