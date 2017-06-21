<template>
  <nav class="header">
    <div class="logo">
      <i></i>
      <span>预约系统</span>
    </div>
    <div class="nav-1st">
      <router-link to="/order" exact tag="span">预约</router-link>
      <router-link to="/scheduling" tag="span">排班</router-link>
      <router-link to="/count" tag="span">统计</router-link>
      <router-link to="/setting" tag="span">设置</router-link>
    </div>
    <div class="icon-menu">
      <el-dropdown menu-align="end">
        <span class="el-dropdown-link">
   <i class="el-icon-caret-bottom el-icon--right"></i>
  </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>电子药历</el-dropdown-item>
            <el-dropdown-item>医学智库</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown menu-align="end">
        <span class="el-dropdown-link">
   <i class="el-icon-caret-bottom el-icon--right"></i>
  </span>
        <el-dropdown-menu slot="dropdown">

          <el-dropdown-item>个人设置</el-dropdown-item>

            <el-dropdown-item>注销</el-dropdown-item>

        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown menu-align="end">
        <span class="el-dropdown-link">
   <i class="el-icon-caret-bottom el-icon--right"></i>
  </span>
        <el-dropdown-menu slot="dropdown">

          <el-dropdown-item>个人设置</el-dropdown-item>

          <el-dropdown-item>注销</el-dropdown-item>

        </el-dropdown-menu>
      </el-dropdown>
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
    color: #333;
  }

  .header {
    width: 100%;
    padding: 15px 45px;
    box-sizing: border-box;
    line-height: 25px;
    border-bottom: 1px solid #EAEFF5;
    background-color: #fff;
    height: 60px;
    z-index: 5;
  }

  .header > .logo {
    float: left;
    line-height: 25px;
  }

  .header > .logo > i {
    float: left;
    height: 25px;
    width: 40px;
    background: blue;
  }

  .nav-1st {
    float: left;
    margin-left: 120px;
  }

  .nav-1st > span {
    width: 120px;
    display: inline-block;
    text-align: center;
    font-size: 18px;
    color: #ccc;
    cursor: pointer;
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
