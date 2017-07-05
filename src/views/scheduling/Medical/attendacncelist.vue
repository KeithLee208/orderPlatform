<template>
    <div class="setting-body">
            <div class="Att-list-title">
              当前模版：<span class="name">春季模板</span>
              <span><i class="el-icon-time"></i>使用时间：2017/03/02-2017/05/02</span>
            </div>
      <div class="Att-list-body">
        <div class="Att-row" v-for="item in attList">
          <div class="Att-row-lable">
            {{item.name}}
          </div>
          <div class="Att-row-data">
            <span v-for="(att,index) in item.children">
               <el-popover  placement="bottom" width="200" trigger="hover">
                 <div class="fixed-info">
                  <p class="fixed-info-title">服务类型</p>
                  <p><i class="default"></i>普通（10）</p>
                  <p><i class="expert"></i>专家（2）</p>
                  <p><i class="disease"></i>专病（3）</p>
                  <p><i class="union"></i>联合（4）</p>
                  <p><i class="VIP"></i>特需（5）</p>
                 </div>
                  <el-button type="text" slot="reference">{{att.name}}</el-button>
            </el-popover>
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
        ]
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
    height: 30px;
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
