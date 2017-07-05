<template>
  <div class="setting-wraaper">
    <div class="setting-header">
      <router-link to="/scheduling/clinic/tpcard">
        <i class="el-icon-arrow-left"></i>
      </router-link>
      <span>XX出班模板</span>
      <span class="used-time"> <i class="el-icon-time"></i>使用时间：2017/03/02-2017/05/02</span>
    </div>
    <div class="setting-body">
      <div class="setting-main">
        <div>
          <div class="page-head">
            <div class="type-filter">
              <span><i class="el-icon-menu all"></i>全部</span>
              <span class="submit"><i></i>已提交（10）</span>
              <span class="unsubmit"><i></i>待提交（2）</span>
               <span class="pull-right">
                <el-button icon="plus" type="primary" size="small">设置排班模板</el-button>
              </span>
            </div>
          </div>
          <div class="Att-list-body">
            <div class="Att-row" v-for="item in attList">
              <div class="Att-row-lable">
                {{item.name}}
              </div>
              <div class="Att-row-data">
            <span v-for="(att,index) in item.children">
              <router-link to="/scheduling/clinic/tptable">
                  <el-popover  placement="bottom" width="200" trigger="hover">
                 <div class="fixed-info">
                  <p class="fixed-info-title">门诊号源信息</p>
                  <p><i class="default"></i>普通（10）</p>
                  <p><i class="expert"></i>专家（2）</p>
                  <p><i class="disease"></i>专病（3）</p>
                  <p><i class="union"></i>联合（4）</p>
                  <p><i class="VIP"></i>特需（5）</p>
                 </div>
                  <el-button type="text" slot="reference">{{att.name}}</el-button>
            </el-popover>
                </router-link>
            </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        attList:[
          {
            name:"外科",
            children:[
              { name:"胃肠科（东院）" },{ name:"烧伤科" },{ name:"胸心外科" },{ name:"脑外科（西园）" },
              { name:"胃肠科（西院）" },{ name:"心血管科" },{ name:"泌尿外科" },{ name:"烧伤科" },
              { name:"口腔科门诊（东院）" },{ name:"胸心外科" },{ name:"胃肠科（东院）" }
            ]
          },
          {
            name:"外科",
            children:[
              { name:"胃肠科（东院）" },{ name:"烧伤科" },{ name:"胸心外科" },{ name:"脑外科（西园）" },
              { name:"胃肠科（西院）" },{ name:"心血管科" },{ name:"泌尿外科" },{ name:"烧伤科" },
              { name:"口腔科门诊（东院）" },{ name:"胸心外科" },{ name:"胃肠科（东院）" }
            ]
          },
          {
            name:"外科",
            children:[
              { name:"胃肠科（东院）" },{ name:"烧伤科" },{ name:"胸心外科" },{ name:"脑外科（西园）" },
              { name:"胃肠科（西院）" },{ name:"心血管科" },{ name:"泌尿外科" },{ name:"烧伤科" },
              { name:"口腔科门诊（东院）" },{ name:"胸心外科" },{ name:"胃肠科（东院）" }
            ]
          },
          {
            name:"外科",
            children:[
              { name:"胃肠科（东院）" },{ name:"烧伤科" },{ name:"胸心外科" },{ name:"脑外科（西园）" },
              { name:"胃肠科（西院）" },{ name:"心血管科" },{ name:"泌尿外科" },{ name:"烧伤科" },
              { name:"口腔科门诊（东院）" },{ name:"胸心外科" },{ name:"胃肠科（东院）" }
            ]
          }
        ]
        }
    },
    methods: {
      MsgSuccess() {
        this.SubmitVisible=false;
        this.$message({
          message: '噢啦啦啦啦啦啦提交成功！',
          type: 'success'
        });
      },
      TemSuccess(){
        this.$message({
          message: '成功！',
          type: 'success'
        });
      }
    }
  };
</script>

<style scoped>
  .setting-header {
    height: 60px;
    width: 100%;
    display: inline-block;
    line-height: 60px;
    padding: 0 30px 0 30px;
    background: #3f51b5;
    color: #fff;
    border-bottom: 1px solid #e0e0e0;
    cursor: default;
    box-sizing: border-box;
  }

  .setting-header > a > i {
    color: #fff;
  }

  .setting-header > span {
    font-size: 16px;
  }

  .setting-header > .used-time {
    font-size: 14px;
    color: #bbb;
    margin-left: 15px;
  }
  .setting-header > .used-time>i{
    margin-right: 5px;
  }
  .setting-body {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    display: inline-block;
  }

  .setting-main {
    width: 100%;
    height: 790px;
    display: inline-block;
    background: #fff;
    box-sizing: border-box;
  }

  .Adjustment{
    height: 25px; line-height:25px;position: absolute;right: 20px;top: 30px;
  }
  .Adjustment>a{
    text-decoration: none;
    color:rgb(32, 160, 255);
  }
  .setting-dialog-text{
    padding-left: 20%;
  }
  .setting-dialog-text>p{
    color: #999;
    height: 30px;
    line-height: 30px;
  }
  /*-------------------------------*/

  .page-head > div {
    height: 50px;
    line-height: 50px;
  }

  .type-filter > span {
    display: inline-block;
    cursor: default;
  }

  .type-filter > span > .all {
    border: 1px solid transparent;
    margin-top: 15px;
    color: #e0e0e0;
    font-size: 16px;
  }

  .type-filter > span > .default {
    background: #fff;
  }
  .type-filter>.submit{
    color:#20a0ff;
  }
  .type-filter>.unsubmit{
    color:#ccc;
  }
  .type-filter>.submit>i{
    background: #20a0ff;
  }
  .type-filter>.unsubmit>i{
    background: #ccc;
  }
  .type-filter > span > i {
    width: 16px;
    height: 16px;
    float: left;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    margin: 16px 5px 0 10px;
    cursor: pointer;
  }
  .in-model > span > i, .in-model > span>.all{
    margin: 10px 5px 0 10px;
  }
  .setting-wraaper {
    position: absolute;
    display: inline-block;
    top: 0;
    left: 0;
    width: 100%;
    height: 880px;
    background: #fff;
  }
  .Att-row{
    width: 100%;
    display: inline-block;
    position: relative;
    margin-bottom: 10px;
    cursor: default;
  }
  .Att-row>.Att-row-lable{
    position: absolute;
    width: 150px;
    height: 40px;
    line-height: 40px;
    left: 0;
    top: 0;
  }
  .Att-row>.Att-row-data{
    width: 100%;
    box-sizing: border-box;
    padding-left: 150px;
  }
  .Att-row-data>span{
    float: left;
    width: 185px;
    height: 40px;
    line-height: 40px;
    color: rgb(32,178,255);
  }
  .Att-list-body{
    padding:10px ;
  }
  .fixed-info-title{
    font-size: 14px;
  }
  .fixed-info > p {
    display: inline-block;
    cursor: default;
    width: 100%;
    padding: 5px;

  }

  .fixed-info > p > .default {
    background: #fff;
  }

  .fixed-info > p > .expert {
    border: 1px solid rgb(192, 229, 255);
    background: rgb(233, 246, 255);
  }

  .fixed-info > p > .disease {
    border: 1px solid rgb(188, 241, 212);
    background: rgb(231, 250, 240);
  }

  .fixed-info > p > .union {
    border: 1px solid rgb(254, 235, 195);
    background: rgb(255, 248, 234);
  }

  .fixed-info > p > .VIP {
    border: 1px solid rgb(255, 204, 204);
    background: rgb(255, 237, 237);
  }

  .fixed-info > p > i {
    width: 16px;
    height: 16px;
    float: left;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    margin: 0px 20px 0 10px;
    cursor: pointer;
  }
</style>
