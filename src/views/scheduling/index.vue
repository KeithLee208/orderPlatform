<template id="Scheduling">
  <div class="Scheduling-body">
   <div class="filter-warrper">
      <div class="Scheduling-tab">
        <router-link v-if="$store.state.login.userInfo.type === '科室'" to="/scheduling/department/worktable" tag="span">出班表(科室)</router-link>
        <router-link v-if="$store.state.login.userInfo.type === '科室'" to="/scheduling/department/templatelist" tag="span">
          出班模板(科室)
        </router-link>
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
  export default{

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
