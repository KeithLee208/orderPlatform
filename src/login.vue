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
          <el-form-item prop="name">
          <span>用户名</span>
            <el-input class="login-input"  v-model="ruleForm.name">
            </el-input>
          </el-form-item>
          <el-form-item prop="pwd">
        <span>密码</span>
        <el-input class="login-input"  v-model="ruleForm.pwd" :type="pwdview" icon="more" :on-icon-click="eyeClick"></el-input>
          </el-form-item>
        <el-button class="login-btn" type="primary"  @click="submitForm('ruleForm')">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm:{
          name:'',
          pwd:''
        },
        rules:{
          name: [
            { required: true, message: '请输入用户名', trigger: 'change' }
          ],
          pwd: [
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
        console.log(formName)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

<style>
  @import './../static/css/reset.css';
  @import './../static/font/iconfont.css';
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
    background: url("./../static/img/login-bg.jpg") no-repeat no-repeat center;
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
    background: url("./../static/img/login-logo.png") no-repeat no-repeat center;
    background-size: 95px 95px;
    margin: 120px 0 30px 0;
  }
  .login-box{
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
    }
  .el-form-item__content>span{
    color: #999;
    font-size: 10px;
    float: left;
    margin-bottom: -12px;
  }
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
  .el-form-item__error{
    top:100%;
    margin-top: -10px;
  }
  .el-form-item{
    margin-bottom: 10px;
  }
</style>
