<template>
  <div class="setting-wraaper">
    <div class="setting-header">
      <router-link to="/scheduling/template" class="pull-right">
      <i class="el-icon-close"></i>
      </router-link>
      <span>春季排班模板设置</span>
      <span class="used-time"> <i class="el-icon-time"></i>使用时间：2017/03/02-2017/05/02</span>
    </div>
    <div class="setting-body">
      <div class="setting-main">
        <div>
          <div class="page-head">
            <div>
              <span>服务类型</span>
              <span ><i class="el-icon-menu all"></i>全部</span>
              <span><i class="default"></i>普通（10）</span>
              <span><i class="expert"></i>专家（2）</span>
              <span><i class="disease"></i>专病（3）</span>
              <span><i class="union"></i>联合（4）</span>
              <span><i class="VIP"></i>特需（5）</span>
        <span class="pull-right">
           <el-button icon="plus"  type="primary" size="small">设置排班模板</el-button>
           <el-button @click="SubmitVisible = true"  type="primary" size="small">提交</el-button>
           <el-button @click="ExportVisible = true"  type="primary" size="small">导出</el-button>
          <el-button @click="PrintVisible = true" type="primary" size="small">打印</el-button>
          <el-dialog
            title="打印出班表"
            :visible.sync="PrintVisible"
            size="tiny"
          >
            <span>
              <p>起始时间：
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  size="small"
                  :picker-options="pickerOptions0"
                  v-model="value1"
                >
              </el-date-picker>
              </p>
              <p>截止日期：
              <el-date-picker
                type="date"
                placeholder="选择日期"
                size="small"
              >
              </el-date-picker>
              </p>
            </span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="PrintVisible = false">取 消</el-button>
                <el-button type="primary" @click="PrintVisible = false">打 印</el-button>
              </span>
          </el-dialog>
          <el-dialog
            title="导出为Excel"
            :visible.sync="ExportVisible"
            size="tiny"
          >
            <span>
              <p>起始时间：
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  size="small"
                >
              </el-date-picker>
              </p>
              <p>截止日期：
              <el-date-picker
                type="date"
                placeholder="选择日期"
                size="small"
              >
              </el-date-picker>
              </p>
            </span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="ExportVisible = false">取 消</el-button>
                <el-button type="primary" @click="ExportVisible = false">导 出</el-button>
              </span>
          </el-dialog>
          <el-dialog
            title="导出为Excel"
            :visible.sync="SubmitVisible"
            size="tiny"
          >
            <span>
              <p>
                当前已设置
              </p>
              <p>
                普通门诊：10个
              </p>
              <p>
                专家门诊：2个
              </p>
              <p>
                专病门诊：3个
              </p>
              <p>
                联合门诊：4个
              </p>
              <p>
                特需门诊：3个
              </p>
            </span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="SubmitVisible = false">取 消</el-button>
                <el-button type="primary" @click="SubmitVisible = false">提 交</el-button>
              </span>
          </el-dialog>
          </span>
            </div>
          </div>
          <div class="table-time">
                <span></span>
                <span>周一</span>
                <span>周二</span>
                <span>周三</span>
                <span>周四</span>
                <span>周五</span>
                <span>周六</span>
                <span>周日</span>
            </div>
          <div class="AdTable">
            <div class="AdTableLeft">
              <div>
                <i></i>
                <p>
                  <span>主治医师</span>
                  <span>张文</span>
                </p>
              </div>
            </div>
            <div class="AdTableRight">

              <div class="table-body">
              <div class="border-top-1">
                <span>上午</span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div>
                <span>下午</span>
                <span>
                  <div class="ordered disease">
                    <p>09:00-11:30</p>
                    <p>胸外科精品B</p>
                  </div>
                </span>
                <span></span>
                <span>

                </span>
                <span></span>
                <span></span>
                <span>
                  <div class="ordered union">
                    <p>09:00-11:30</p>
                    <p>胸外科精品B</p>
                  </div>
                </span>
                <span></span>
              </div>
              <div>
                <span>晚上</span>
                <span></span>
                <span>
                  <div class="ordered VIP">
                    <p>09:00-11:30</p>
                    <p>胸外科精品B</p>
                  </div>
                </span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              </div>
            </div>
          </div>
          <div class="AdTable">
            <div class="AdTableLeft">
              <div>
                <i></i>
                <p>
                  <span>主治医师</span>
                  <span>张文</span>
                </p>
              </div>
            </div>
            <div class="AdTableRight">

              <div class="table-body">
                <div class="border-top-1">
                  <span>上午</span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div>
                  <span>下午</span>
                  <span></span>
                  <span>
                    <div class="ordered expert">
                    <p>09:00-11:30</p>
                    <p>胸外科精品B</p>
                  </div>
                  </span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div>
                  <span>晚上</span>
                  <span></span>
                  <span>
                    <div class="ordered default">
                    <p>09:00-11:30</p>
                    <p>胸外科精品B</p>
                  </div>
                  </span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
          <div class="AdTable">
            <div class="AdTableLeft">
              <div>
                <i></i>
                <p>
                  <span>主治医师</span>
                  <span>张文</span>
                </p>
              </div>
            </div>
            <div class="AdTableRight">

              <div class="table-body">
                <div class="border-top-1">
                  <span>上午</span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div>
                  <span>下午</span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div>
                  <span>晚上</span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
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
        PrintVisible:false,
        ExportVisible:false,
        SubmitVisible:false,
        value1: '',
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        }
      };
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
  .setting-header>a>i{
    color:#fff;

  }
  .setting-header>span{
    font-size: 16px;
     }
  .setting-header>.used-time{
    font-size: 14px;
    color: #bbb;
    margin-left: 15px;
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
.table-time{
  display: inline-block;width: 100%;padding-left: 170px;box-sizing: border-box;
}
.table-time>span{
  width: 12.5%;
  height: 55px;
  line-height: 55px;
  float: left;
  text-align: center;
  box-sizing: border-box;
}
  .AdTable > .AdTableLeft, .AdTable > .AdTableRight {
    box-sizing: border-box;
    float: left;
  }

  .AdTable > .AdTableLeft {
    width: 160px;
    height: 166px;
    position: absolute;
    left: 0;
  }

  .AdTable > .AdTableRight {
    width: 100%;
    padding-left: 160px;
    box-sizing: border-box;
  }
  .table-body{
    width: 100%;
    display: inline-block;
    border-right: 1px solid #e0e0e0;
  }

  .AdTable {
    position: relative;
    margin: 0 0 10px 0;
    display: inline-block;
    width: 100%;
  }
  .AdTableLeft > div {
    height: 166px;
    line-height: 166px;
  }

  .AdTableLeft > div > i {
    width: 40px;
    height: 40px;
    float: left;
    margin: 53px 0px;
    background: red;
  }
  .AdTableLeft > div > p{
    float: left;
    width: 120px;
    height: 166px;
    text-align: center;
    padding: 50px 0;
    box-sizing: border-box;
  }
  .AdTableLeft > div > p>span{
    height: 30px;
    line-height: 30px;
    width: 100px;
    display: inline-block;
    float: left;
  }

  .table-body > div {
    width: 100%;
    display: inline-block;
    float: left;
  }
  .table-body>.border-top-1{
    border-top: 1px solid #e0e0e0;
  }
  .table-body > div > span {
    width: 12.5%;
    height: 60px;
    line-height: 60px;
    float: left;
    text-align: center;
    box-sizing: border-box;
    border-left: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    box-sizing: border-box;
  }
  .ordered{
    width: 100%;
    height: 100%;
    display: inline-block;
    font-size: 14px;
  }
  .ordered>p{
    height: 30px;
    line-height: 30px;
  }
  /*default,expert,disease,union,VIP*/
  .ordered.default{
     background: rgb(185,185,185);
    color: #fff;
  }
  .ordered.expert{
    color: rgb(32,160,255);
    background:rgb(192,229,255);

  }
  .ordered.disease{
    color: rgb(12,175,148);
    background: rgb(231,250,240);
  }
  .ordered.union{
    color: rgb(232,166,35);
    background: rgb(255,248,234);
  }
  .ordered.VIP{
    color:rgb(255,73,73);
    background: rgb(255,237,237);
  }
  .page-head > div {
    height: 50px;
    line-height: 50px;
  }
  .page-head > div > span {
    display: inline-block;
  }
  .page-head > div > span>.all{
    border:1px solid transparent;
    margin-top: 15px;
    color: #e0e0e0;
    font-size: 16px;
  }
  .page-head > div > span>.default{
    background: #fff;
  }
  .page-head > div > span>.expert{
    border: 1px solid rgb(192,229,255);
    background: rgb(233,246,255);
  }
  .page-head > div > span>.disease{
    border: 1px solid rgb(188,241,212);
   background: rgb(231,250,240);
  }
  .page-head > div > span>.union{
    border: 1px solid rgb(254,235,195);
    background: rgb(255,248,234);
  }
  .page-head > div > span>.VIP{
    border: 1px solid rgb(255,204,204);
    background: rgb(255,237,237);
  }
  .page-head > div > span > i {
    width: 16px;
    height: 16px;
    float: left;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    margin: 15px 5px 0 10px;
  }
.setting-wraaper{
  position: absolute;
  display: inline-block;
  top: 0;
  left: 0;
  width: 100%;
  height:880px;
  z-index:200;
  background:#fff;
}
</style>
