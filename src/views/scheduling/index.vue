<template id="Scheduling">
  <div class="Scheduling-body">
   <div class="filter-warrper">
      <div class="Scheduling-tab">
        <!--<router-link to="/scheduling/department/worktable" exact tag="span">科室出班表</router-link>-->
        <!--<router-link to="/scheduling/department/templatesetting" tag="span">科室排班模板</router-link>-->
        <!--<router-link to="/scheduling/medical/wordtable" exact tag="span">医务科出班表</router-link>-->
        <!--<router-link to="/scheduling/medical/template" tag="span">医务科排班模板</router-link>-->
        <router-link to="/scheduling/clinic/worklist" exact tag="span">出班表</router-link>
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
