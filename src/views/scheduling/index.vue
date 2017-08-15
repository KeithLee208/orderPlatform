<template id="Scheduling">
  <div class="Scheduling-body">
   <div class="filter-warrper">
      <div class="Scheduling-tab">

        <!--<router-link to="/scheduling/department/worktable" exact tag="span">科室出班表</router-link>-->
        <!--<router-link to="/scheduling/department/templatesetting" tag="span">科室排班模板</router-link>-->
        <!--<router-link to="/scheduling/medical/wordtable" exact tag="span">医务科出班表</router-link>-->
        <!--<router-link to="/scheduling/medical/template" tag="span">医务科排班模板</router-link>-->
        <router-link  :to="$store.state.login.userInfo.type === '科室'?'/scheduling/clinic/timetable':'/scheduling/clinic/worklist'"  exact tag="span">出班表</router-link>
        <router-link to="/scheduling/clinic/tpcard" tag="span">出班模板</router-link>

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
//          this.login().then(() => {
            this.init();
//          });
      })
    },
    methods:{
        init(){
          this.getDepartmentList();
          this.getDocList();
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
            resolve();
          }).catch(error => {
            reject(error);
          });
        });
      },
        //获取医院所有预约科室
        getDepartmentList(){
          this.$wnhttp("PAT.WEB.APPOINTMENT.BASEINFO.Q01", {kstybm: '20000000.1.1.0320',yydm:this.$store.state.login.userInfo.yydm}).then(data => {
            this.$store.commit('scheduling/SET_DEPARTMENTLIST',data)
          }).catch(err => {
            console.log(err);
          });
        },
        //获取医生列表
      getDocList(){
        this.$wnhttp("PAT.WEB.APPOINTMENT.BASEINFO.Q04", { kstybm: '20000000.1.1.0320',yydm:this.$store.state.login.userInfo.yydm}).then(data => {
          console.log('Q04 %o', data);
          this.$store.commit('scheduling/SET_DOCTORLIST',data)
        }).catch(err => {
          console.log(err);
        });
      },
        //获取服务类型
      getServiceTypeList(){
        this.$wnhttp("PAT.WEB.APPOINTMENT.BASEINFO.Q05", {yydm:this.$store.state.login.userInfo.yydm}).then(data => {
          console.log('Q05 %o', data);
          this.$store.commit('scheduling/SET_SERVICETYPELIST',data)
        }).catch(err => {
          console.log(err);
        });
      },
      //获取时间段列表
      getTimeSlotList(){
        this.$wnhttp("PAT.WEB.APPOINTMENT.BASEINFO.Q06", {yydm:this.$store.state.login.userInfo.yydm}).then(data => {
          console.log('Q06 %o', data);
          this.$store.commit('scheduling/SET_TIMESLOTLIST',data)
        }).catch(err => {
          console.log(err);
        });
      },
      //获取专病信息
      getSpecDiseaseList(){
        this.$wnhttp("PAT.WEB.APPOINTMENT.BASEINFO.Q07", {yydm:this.$store.state.login.userInfo.yydm}).then(data => {
          console.log('Q07 %o', data);
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
