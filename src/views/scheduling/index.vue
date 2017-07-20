<template id="Scheduling">
  <div class="Scheduling-body">
   <div class="filter-warrper">
      <div class="Scheduling-tab">
        <!--<router-link to="/scheduling/department/worktable" exact tag="span">科室出班表</router-link>-->
        <!--<router-link to="/scheduling/department/templatesetting" tag="span">科室排班模板</router-link>-->
        <!--<router-link to="/scheduling/medical/wordtable" exact tag="span">医务科出班表</router-link>-->
        <!--<router-link to="/scheduling/medical/template" tag="span">医务科排班模板</router-link>-->
        <router-link  :to="$store.state.login.userInfo.type === '科室'?'/scheduling/clinic/worktable':'/scheduling/clinic/worklist'"  exact tag="span">出班表</router-link>
        <router-link to="/scheduling/clinic/tpcard" tag="span">出班模板</router-link>
      </div>
    </div>
    <div class="pagebody">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        msg: '1'
      }
    },
    created(){
      this.$nextTick(() => {
          this.init();
      })
    },
    methods:{
        init(){
          this.getDepartmentList();
          this.getServiceTypeList();
          this.getTimeSlotList();
          this.getSpecDiseaseList();
        },
        //获取医院所有预约科室
        getDepartmentList(){
          this.$wnhttp("PAT.WEB.APPOINTMENT.BASEINFO.Q01", {}).then(data => {
            this.$store.commit('scheduling/SET_DEPARTMENTLIST',data)
          }).catch(err => {
            console.log(err);
          });
        },
        //获取医生列表
      getDocList(){
        this.$wnhttp("PAT.WEB.APPOINTMENT.BASEINFO.Q04", {}).then(data => {
          this.$store.commit('scheduling/SET_DOCTORLIST',data)
        }).catch(err => {
          console.log(err);
        });
      },
        //获取服务类型
      getServiceTypeList(){
        this.$wnhttp("PAT.WEB.APPOINTMENT.BASEINFO.Q05", {}).then(data => {
          this.$store.commit('scheduling/SET_SERVICETYPELIST',data)
        }).catch(err => {
          console.log(err);
        });
      },
      //获取时间段列表
      getTimeSlotList(){
        this.$wnhttp("PAT.WEB.APPOINTMENT.BASEINFO.Q06", {}).then(data => {
          this.$store.commit('scheduling/SET_TIMESLOTLIST',data)
        }).catch(err => {
          console.log(err);
        });
      },
      //获取专病信息
      getSpecDiseaseList(){
        this.$wnhttp("PAT.WEB.APPOINTMENT.BASEINFO.Q07", {}).then(data => {
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
