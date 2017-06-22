<template>
  <div>
    <div>
      <span>时间段</span>
      <span>
        <el-date-picker
          size="small"
        v-model="value6"
        type="daterange"
        placeholder="选择日期范围">
    </el-date-picker>
         <el-button class="margin-right-10" type="primary" size="small">查询</el-button>
      </span>
      <el-button class="pull-right margin-right-10" type="primary" size="small">导出</el-button>
    </div>
    <div>
      <div class="channel">
        预约各渠道分布饼状图
      </div>
      <div class="Analysis">
        某渠道预约情况分析（已就诊、失约、已取消分布）
      </div>
      <div class="Statistical-report">
        2017年06月01日 - 06月11日 预约统计报表
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'footer'
  }
</script>

<style scoped>
  .channel,.Analysis{
    float: left;
    width: 830px;
    height: 400px;
    display: inline-block;
    background: red;
    margin:40px;
    color: #fff;
    text-align: center;
  }
  .Statistical-report{
    width:1740px;
    height: 400px;
    display: inline-block;
    margin:40px;
    background: red;
    color: #fff;
    text-align: center;
  }
</style>
