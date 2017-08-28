<template id="Scheduling">
  <div class="Scheduling-body">
   <div class="filter-warrper">
      <div class="Scheduling-tab">
        <router-link v-if="$store.state.login.userInfo.type === '科室'" to="/scheduling/department/worktable" tag="span">出班表(科室)</router-link>
        <router-link v-if="$store.state.login.userInfo.type === '科室'" to="/scheduling/department/templatelist" tag="span">出班模板(科室)</router-link>
        <router-link v-if="$store.state.login.userInfo.type === '门办'" to="/scheduling/headoffice/worklist" tag="span">出班表(门办)</router-link>
        <router-link v-if="$store.state.login.userInfo.type === '门办'" to="/scheduling/headoffice/templatelist" tag="span">出班模板(门办)</router-link>
      </div>
    </div>
    <div class="pagebody">
      <transition name="el-fade-in-linear">
      <router-view></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
  import axios from "axios";
  export default{
    data(){
      return {
        msg: '1'
      }
    },
    created(){
      this.$nextTick(() => {
          this.login().then(() => {
            this.getUserInfo();
            this.init();
            console.log('test in home.')
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
            axios({
              url: target,
              method: 'get',
              params:{
                p:111111,
                u:'00'
              },
              headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json;charset=UTF-8'
              }
            }).then(res => {
              sessionStorage.setItem('jwtToken',res.data.Response.Body.jwtToken);
              this.$store.commit('login/SET_USERINFO',res.data.Response.Body.employeeUser);
              console.log('登录信息 %o',this.$store.state.login.userInfo);
              resolve();
            }).catch(error => {
              reject(error);
            });
          });
        },
        getUserInfo(){
          this.$wnhttp("PAT.WEB.APPOINTMENT.BASEINFO.Q10", {zgtybm:this.$store.state.login.userInfo.zgtybm}).then(data => {
            this.$store.commit('login/SET_USERINFO',data);
            console.log('职工信息 %o',this.$store.state.login.userInfo);
          }).catch(err => {
            console.log(err);
          });
        },
        //获取医院所有预约科室
        getDepartmentList(){
          this.$wnhttp("PAT.WEB.APPOINTMENT.BASEINFO.Q01", {kstybm:this.$store.state.login.userInfo.ksdm,yydm:this.$store.state.login.userInfo.yydm}).then(data => {
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
    }
  }
</script>
<style scoped>
  .Scheduling-tab {
    height: 32px;
    cursor: default;
  }
  .Scheduling-tab > span {
    display: inline-block;
    text-align: center;
    width:100px;
    margin-right: 8px;
    line-height: 32px;
    height: 32px;
    font-size: 14px;
    background: #fff;
    border-radius: 2px;
  }
  .Scheduling-tab > span.nav-active {
    background: rgb(63,81,181);
    color: #fff;
  }

</style>
