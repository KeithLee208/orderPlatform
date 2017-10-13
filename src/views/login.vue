<template>
  <div id="login">
    <div class="left">
      <span class="title">预约平台</span>
      <span class="describe">为医务人员打造最实用的资源管理平台</span>
    </div>
    <div class="right">
      <div class="logo">
      </div>
      <div class="login-box">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item prop="u">
          <span>用户名</span>
            <el-input class="login-input"  v-model="ruleForm.u">
            </el-input>
          </el-form-item>
          <el-form-item prop="p">
        <span>密码</span>
        <el-input class="login-input"  v-model="ruleForm.p" :type="pwdview" icon="more" :on-icon-click="eyeClick"></el-input>
          </el-form-item>
            <el-button class="login-btn" type="primary"  @click="submitForm('ruleForm')">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  export default {
    data() {
      return {
        ruleForm:{
          u:'02',
          p:'111111'
        },
        rules:{
          u: [
            { required: true, message: '请输入用户名', trigger: 'change' }
          ],
          p: [
            { required: true, message: '请输入密码', trigger: 'change' }
          ],
        },
        error:'',
        pwdview:'password',

      }
    },
    computed: {
//      user() {
//        return this.$store.state.user
//      }
    },
    methods: {
      eyeClick(ev) {
        if(this.pwdview=='password')this.pwdview='text';
        else this.pwdview='password';
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.login().then(() => {
              this.$router.push('/');
              this.$message('登录成功');
            });
          } else {
            this.$message('登录失败');
            return false;
          }
        });
      },
      login(){
        return new Promise((resolve, reject) => {
          let target = 'http://172.16.0.131:8888/auth/login';
          let OFFICE='00';//门办用户名
          let DEPARTMENT='02';//科室用户名
          axios({
            url: target,
            method: 'get',
            params:{
              p:111111,
              u:DEPARTMENT,
            },
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'application/json;charset=UTF-8'
            }
          }).then(res => {
            sessionStorage.setItem('jwtToken',res.data.Response.body.jwtToken);
            this.$wnstorage.set('userInfo',res.data.Response.body);
            this.$store.commit('login/SET_USERINFO',res.data.Response.body);
            resolve();
          }).catch(error => {
            reject(error);
          });
        });
      }
    }
  }
</script>

<style scoped>
  @import '../../static/css/reset.css';
  @import '../../static/font/iconfont.css';
  #login{
    width: 800px;
    height: 580px;
    position: absolute;
    top: 50%;
    margin: -290px 0 0 -400px;
    left: 50%;
    box-shadow: 0px 0px 10px #999;
  }
  body {
    overflow-x: hidden;
    background: rgb(252,253,255);
    height: 100%;
  }
  .left{
    width: 490px;
    height: 100%;
    background: url("../../static/img/login-bg.jpg") no-repeat no-repeat center;
    background-size: 490px 580px;
    float: left;
    box-sizing: border-box;
    padding: 110px 0 0 60px;
  }
  .right{
    width: 310px;
    height: 100%;
    background: #fff;
    float: left;
  }
  .logo{
    height: 100px;
    width: 100%;
    display: inline-block;
    background: url("../../static/img/login-logo.png") no-repeat no-repeat center;
    background-size: 95px 95px;
    margin: 120px 0 30px 0;
  }
  .login-box{
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
    }

  .login-btn{
    margin-top: 30px;
    width: 100%;
    background: rgb(68,94,237);
    border: 1px solid rgb(68,94,237);
  }
  .login-btn:hover{
    background: rgb(81, 121, 237);
    border: 1px solid rgb(81, 121, 237);
  }
  .login-btn:active{
    background: rgb(81, 121, 237);
    border: 1px solid rgb(81, 121, 237);
  }
  .login-btn:focus{
    background: rgb(81, 121, 237);
    border: 1px solid rgb(81, 121, 237);
  }
  .title,.describe{
    display: inline-block;
    color: #fff;
    width: 100%;
    letter-spacing:5px;
    -webkit-font-smoothing: subpixel-antialiased
  }
  .title{
    font-size: 24px;
    margin-bottom: 15px;
  }
  .describe{
    font-size: 16px;
  }

</style>
<style>
  .login-input>input{
    border-radius: 0px;
    border: 1px solid transparent !important;
    border-bottom: 1px solid #e0e0e0 !important;
    padding: 0;
    float: left;
  }
  .login-input>input:focus{
    border-bottom: 1px solid rgb(139,192,240) !important;
  }
  .el-form-item__content>span{
    color: #999;
    font-size: 10px;
    float: left;
    margin-bottom: -12px;
  }
  .el-form-item__error{
    top:100%;
    margin-top: -10px;
  }
  .el-form-item{
    margin-bottom: 10px;
  }
</style>
