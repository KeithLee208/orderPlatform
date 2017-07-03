<template>
  <nav class="header">
    <div class="logo">
      <i></i>
      <span>上海六院预约平台</span>
    </div>
    <div class="nav-1st">
      <router-link to="/order" exact tag="span">预约</router-link>
      <router-link to="/scheduling" tag="span">排班</router-link>
      <router-link to="/count" tag="span">统计</router-link>
      <router-link to="/setting" tag="span">设置</router-link>
    </div>
    <div class="icon-menu">
      1
    </div>
  </nav>
</template>
<script>
  export default {
    name: 'header'
  }
</script>
<style scoped>
  .nav-1st .nav-active {
    color: #fff;
    border-bottom: 4px solid #fff;
  }
  .header {
    width: 100%;
    padding: 10px 20px;
    box-sizing: border-box;
    line-height: 35px;
    border-bottom: 1px solid #EAEFF5;
    background-color: rgb(63,81,181);
    height: 60px;
    z-index: 5;
  }

  .header > .logo {
    float: left;
    line-height: 25px;
  }
  .header > .logo>i{
    width: 32px;
    height: 35px;
    display: inline-block;
    background: url("./logo.png") left center no-repeat;
    background-size:31px 25px ;
    float: left;
  }
  .header > .logo>span{
    float: left;
    height: 35px;
    line-height: 35px;
    display: inline-block;
    color: #fff;
    font-size: 16px;
    margin-left: 10px;
  }
  .nav-1st {
    float: left;
    margin-left: 120px;
  }

  .nav-1st > span {
    width: 80px;
    height: 45px;
    display: inline-block;
    text-align: center;
    font-size: 18px;
    color: #fff;
    cursor: pointer;
    margin: 0 30px;
  }

  .icon-menu {
    float: right;
  }

  .icon-menu > i {
    height: 24px;
    width: 24px;
    background: black;
    display: inline-block;
    margin-left: 40px;
    cursor: pointer;
  }

  .el-dropdown-menu__item {
    min-width: 145px;
    text-align: center;
  }
</style>
