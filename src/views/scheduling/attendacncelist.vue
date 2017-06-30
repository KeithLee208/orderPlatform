<template>
  <div>
    <div class="setting-body">
            <div class="Att-list-title">
              当前模版：<span class="name">春季模板</span>
              <span><i class="el-icon-time"></i>使用时间：2017/03/02-2017/05/02</span>
            </div>
      <div class="Att-list-body">
        <div class="Att-row">
          <div class="Att-row-lable">
            口腔科
          </div>
          <div class="Att-row-data">
            <span>
            <el-popover ref="popover1" placement="bottom" width="200" trigger="hover">
              <div>
                <p>门诊号院信息</p>
                <p>普通 18个</p>
                <p>专家 16个</p>
                <p>专病 10个</p>
                <p>联合 18个</p>
                <p>特需 18个</p>
              </div>
            </el-popover>
            <el-button type="text" v-popover:popover1>口腔科（东院）</el-button>
              </span>
          </div>
        </div>
        <div class="Att-row" v-for="item in attList">
          <div class="Att-row-lable">
            {{item.name}}
          </div>
          <div class="Att-row-data" v-for="att in item.children">
            <span>{{att.name}}</span>
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
</style>
