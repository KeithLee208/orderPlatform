<template id="count">
  <div class="Scheduling-body">
    <div class="filter-warrper">
      <div class="Scheduling-tab">
        <router-link to="/count/ReservationRegistration" exact tag="span">预约统计</router-link>
        <router-link to="/count/RegistrationClassification" tag="span">等级分类</router-link>
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
    }
  }
</script>

<style scoped>
  .Scheduling-tab{
    height: 60px;
    line-height: 60px;
    cursor: default;
  }
  .Scheduling-tab>span{
    display: inline-block;
    text-align: center;
    width: 50px;
    background: red;
    color: #FFF;
  }
  .Scheduling-tab>span.nav-active{
    background: blue;
  }
</style>
