<template>
  <div>
    <div class="page-head">
      <div>
        <span>当前模板：春季模板 使用时间：2017/03/02-2017/05/02</span>
        <el-button class="pull-right margin-right-10" type="primary" size="small">导出</el-button>
        <el-button class="pull-right margin-right-10" type="primary" size="small">打印</el-button>
      </div>
      <div>
        <span>服务类型</span>
        <span><i></i>普通（10）</span>
        <span><i></i>专家（2）</span>
        <span><i></i>专病（3）</span>
        <span><i></i>联合（4）</span>
        <span><i></i>特需（5）</span>
        <span class="pull-right">
        <el-input
          placeholder="请选择日期"
          icon="search"
          size="small">
        </el-input>
          </span>
      </div>
    </div>
    <div class="page-main">
      <div class="AdTable">
        <div class="AdTableLeft">
          <div><i></i>普通门诊</div>
        </div>
        <div class="AdTableRight">
          <div>
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
      <div class="AdTable">
        <div class="AdTableLeft">
          <div><i></i>张文 主任医师</div>
        </div>
        <div class="AdTableRight">
          <div>
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
      <div class="AdTable">
        <div class="AdTableLeft">
          <div><i></i>李峰 副主任医师</div>
        </div>
        <div class="AdTableRight">
          <div>
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
</template>

<script>
  export default{}
</script>

<style scoped>
  .margin-right-10 {
    margin-right: 10px;
  }
  .page-head > div {
    height: 50px;
    line-height: 50px;
  }
  .page-head > div > span {
    display: inline-block;
  }
  .page-head > div > span > i {
    width: 20px;
    height: 20px;
    float: left;
    background: #999;
    border: 1px solid #e0e0e0;
    margin: 12px 5px 0 10px;
  }
  .AdTable > .AdTableLeft, .AdTable > .AdTableRight {
    box-sizing: border-box;
    float: left;
  }
  .AdTable > .AdTableLeft {
    width: 15%;
  }
  .AdTable > .AdTableRight {
    width: 85%;
  }
  .AdTable{
    margin: 10px 0 10px 0;
    display: inline-block;
    width: 100%;
  }
  .AdTableLeft > div {
    height: 150px;
    line-height: 150px;
  }
  .AdTableLeft > div > i {
    width: 40px;
    height: 40px;
    float: left;
    margin: 53px 10px;
    background: red;
  }
  .AdTableRight>div{
    width:100%;
  }
  .AdTableRight>div>span{
    width: 12.5%;
    height: 55px;
    line-height: 55px;
    float: left;
    text-align: center;
    box-sizing: border-box;
    border: 1px solid #e0e0e0;
  }
</style>
