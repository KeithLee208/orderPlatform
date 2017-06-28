<template>
  <div>
    <div class="setting-body">
      <div>

          <div>
            <span>当前模版：春季模板 使用时间：2017/03/02-2017/05/02</span>
        <span class="pull-right">
        <el-input
          placeholder="搜索院区／科室／医生"
          icon="search"
          size="small">
        </el-input>
          </span>
          </div>

        <div>
          <div>口腔科</div>
          <div>
            <span>口腔科（东院）</span>
          </div>
        </div>
        <div>
          <div>外科</div>
          <div>
            <span>胃肠科</span>
            <span>烧伤科</span>
            <span>胸心外科</span>
            <span>脑外科</span>
            <span>脑外科</span>
            <span>脑外科</span>
            <span>脑外科</span>
            <span>脑外科</span>
            <span>脑外科</span>
            <span>脑外科</span>
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
    padding: 0 60px 0 30px;
    background: #fff;
    border-bottom: 1px solid #e0e0e0;
    box-sizing: border-box;
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
    padding: 20px;
    box-sizing: border-box;
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
</style>
