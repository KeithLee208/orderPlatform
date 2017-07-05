<template>
    <div class="setting-body">
            <div class="Att-list-title">
              当前模版：<span class="name">春季模板</span>
              <span><i class="el-icon-time"></i>使用时间：2017/03/02-2017/05/02</span>
              <el-button class="pull-right btn-blue" @click="SettingVisible=true" type="primary" size="small">设置出班</el-button>
              <el-dialog title="设置出班" :visible.sync="SettingVisible" size="tiny">
              <div>
                <el-form ref="form" :model="form" label-width="80px">
                  <el-form-item label="选择模板">
                    <el-select v-model="form.region" style="width: 100%" placeholder="请选择活动区域">
                      <el-option label="春季模板" value="1"></el-option>
                      <el-option label="国庆节模板" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="开始时间">
                      <el-date-picker type="date" placeholder="选择日期" style="width: 100%" v-model="form.date1"></el-date-picker>
                  </el-form-item>
                  <el-form-item label="结束时间">
                    <el-date-picker type="date" placeholder="选择日期" style="width: 100%" v-model="form.date2" ></el-date-picker>
                  </el-form-item>
                </el-form>
            </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="SettingVisible = false">取 消</el-button>
                <el-button type="primary" @click="SettingVisible = false">确定</el-button>
              </span>
              </el-dialog>
            </div>
      <div class="Att-list-body">
        <div class="Att-row" v-for="item in attList">
          <div class="Att-row-lable">
            {{item.name}}
          </div>
          <div class="Att-row-data">
            <span v-for="(att,index) in item.children">
               <router-link to="/scheduling/clinic/worktable" exact tag="span">
               <el-popover  placement="bottom" width="200" trigger="hover">
                 <div class="fixed-info">
                  <p class="fixed-info-title">门诊号源信息</p>
                  <p class="default"><i></i>普通（10）</p>
                  <p class="expert"><i></i>专家（2）</p>
                  <p class="disease"><i></i>专病（3）</p>
                  <p class="union"><i></i>联合（4）</p>
                  <p class="VIP"><i></i>特需（5）</p>
                 </div>
                  <el-button type="text" slot="reference">{{att.name}}</el-button>
            </el-popover>
              </router-link>
            </span>
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
        ],
        SettingVisible:false,
        form: {
          region: '',
          date1: '',
          date2: ''
        }
      }
    },
    created(){
      console.log(this.$refs);
    }
    ,
    computed: {

    },
    methods: {
    }
  }
</script>


<style scoped>
  .setting-body {
    margin-top: 20px;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    display: inline-block;
    background: #fff;
  }
  .setting-main {
    width: 100%;
    height: 790px;
    display: inline-block;
    background: #fff;
    padding: 20px;
    box-sizing: border-box;
  }
  .Att-list-title{
    color: #999;
    height: 40px;
    line-height: 30px;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 10px;
  }
  .Att-list-title>.name{
    color: #333;
    margin-right: 20px;
  }
  .Att-list-title>span>i{
    font-size: 14px;
    margin-right: 5px;
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
  .fixed-info-title{
    font-size: 14px;
  }
  .fixed-info > p {
    display: inline-block;
    cursor: default;
    width: 100%;
    padding: 5px;
    height: 25px;
  }

  .fixed-info > .default >i {
    background: #fff;
  }
  .fixed-info > .expert{
    color: rgb(87, 179, 255);
  }
  .fixed-info > .expert > i {
    border: 1px solid rgb(192, 229, 255);
    background: rgb(233, 246, 255);
  }
  .fixed-info > .disease{
    color:rgb(48, 182, 88) ;
  }
  .fixed-info > .disease >i {
    border: 1px solid rgb(188, 241, 212);
    background: rgb(231, 250, 240);
  }
  .fixed-info >.union{
    color:rgb(240, 196, 99) ;
  }
  .fixed-info >.union >i{
    border: 1px solid rgb(254, 235, 195);
    background: rgb(255, 248, 234);
  }
  .fixed-info > .VIP{
    color: rgb(255, 93, 82)
  }
  .fixed-info > .VIP>i {
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
  .btn-blue {
    background: #fff;
    border-color: #50bfff;
    color: #50bfff;
  }
  .btn-blue:hover {
    color: #fff;
    background-color: #20a0ff;
    border-color: #20a0ff;
  }
</style>
