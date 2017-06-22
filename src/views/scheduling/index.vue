<template id="Scheduling">
<div class="Scheduling-body">
    <div class="filter-warrper">
      <div class="Scheduling-tab">
        <router-link to="/scheduling/attendacnce" exact tag="span">预约</router-link>
        <router-link to="/scheduling/template" tag="span">排班</router-link>
      </div>
    </div>
    <div class="pagebody">
    <router-view></router-view>
    </div>
    </div>
</template>

<script>
  export default{

  }
</script>

<style scoped>
  .Scheduling-tab{
    height: 60px;
    line-height: 60px;
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
