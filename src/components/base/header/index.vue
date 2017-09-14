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
        <i class="iconfont icon-sousuo"></i>
      <i class="iconfont icon-tixing">
        <sup style="background-color: #ff4949;height: 18px;"></sup>
      </i>
      <span style="">胸外科</span>
      <el-popover
        placement="bottom"
        width="150"
        trigger="hover">
        <div class="block">
          <span class="wrapper">
            <el-button @click="setUserInfo('科室')" type="success">科室</el-button>
            <!--<el-button @click="setUserInfo('医务科')" type="danger">医务科</el-button>-->
            <el-button @click="setUserInfo('门办')" type="info">门办</el-button>
          </span>
        </div>
        <span class="adminlogo" slot="reference">
         <i ></i>
          {{userInfo.type}}
        </span>
      </el-popover>
    </div>
  </nav>
</template>
<script>
  export default {
    name: 'header',
    data(){
        return{
            userInfo:{
                type:'科室'
            }
        }
    },
    created(){
      this.$nextTick( () => {

      })
    },
    methods:{
      setUserInfo(type){
          this.userInfo.type = type;
          this.$store.commit('login/CHANGE_USERINFO',this.userInfo.type);
      }
    }
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
    color: #FFFFFF;
    font-size: 18px;
  }

  .icon-menu > i {
    height: 40px;
    line-height: 40px;
    width: 24px;
    font-size: 18px;
    display: inline-block;
    margin-left: 40px;
    cursor: pointer;
    float: left;
  }
  .icon-menu>span{
    float: left;
    margin-left: 20px;
    height: 40px;
    line-height: 40px;
  }

  .el-dropdown-menu__item {
    min-width: 145px;
    text-align: center;
  }
.adminlogo>i{
  width: 40px;
  height: 40px;
  display: inline-block;
  background: url("user.png") center center no-repeat;
  float: left;
  margin-right: 20px;
}
  .adminlogo>i:hover{
    background: url("user-hover.png") center center no-repeat;
  }
  .adminlogo{
    float: left;
    height: 40px;
    line-height: 40px;

  }
</style>
