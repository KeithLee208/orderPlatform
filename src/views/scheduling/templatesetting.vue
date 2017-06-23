<template>
  <div
    style="position: absolute;top: 0;left: 0;width: 100%;height:944px;z-index:2009;display: inline-block;background:rgb(238,238,238)">
    <div class="setting-header">
      <router-link to="/scheduling/template">
      <i class="el-icon-arrow-left"></i>
      </router-link>
      <span>春季排班模板设置</span>
      <span>使用时间：2017/03/02-2017/05/02</span>
    </div>
    <div class="setting-body">
      <div class="setting-main">
        <div style="height: 30px; line-height: 30px;padding: 20px">
          <el-button @click="PrintVisible = true" class="pull-right" type="primary" size="small">打印</el-button>
          <el-button @click="ExportVisible = true" class="pull-right" type="primary" size="small">导出</el-button>
          <el-button @click="SubmitVisible = true" class="pull-right" type="primary" size="small">提交</el-button>
          <el-button icon="plus" class="pull-right" type="primary" size="small">设置排班模板</el-button>
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
        </div>
        <div>
          <div class="page-head">
            <div>
              <span>服务类型</span>
              <span><i></i>普通（10）</span>
              <span><i></i>专家（2）</span>
              <span><i></i>专病（3）</span>
              <span><i></i>联合（4）</span>
              <span><i></i>特需（5）</span>
        <span class="pull-right">
        <el-input
          placeholder="搜索院区／科室／医生"
          icon="search"
          size="small">
        </el-input>
          </span>
            </div>
          </div>
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
    padding: 0 60px 0 30px;
    background: #fff;
    border-bottom: 1px solid #e0e0e0;
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

  .AdTable {
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

  .AdTableRight > div {
    width: 100%;
  }

  .AdTableRight > div > span {
    width: 12.5%;
    height: 55px;
    line-height: 55px;
    float: left;
    text-align: center;
    box-sizing: border-box;
    border: 1px solid #e0e0e0;
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
