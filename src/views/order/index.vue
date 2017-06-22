<template id="order">
  <div>
    <div class="filter-warrper">
      <div>
        <span>
           <el-button type="primary" size="small">新增患者信息</el-button>
           <el-button type="primary" size="small">预约列表</el-button>
        </span>
        <span class="order-search pull-right">
             <el-input
               placeholder="刷卡或输入，磁卡／保障卡／IC卡／病历号／身份证／姓名／电话"
               icon="search"
               size="small">
        </el-input>
        </span>
      </div>
      <div class="bottom-border">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="姓名">
            <el-input size="small" placeholder="请填写姓名"></el-input>
          </el-form-item>
          <el-form-item label="身份证号">
            <el-select size="small" v-model="value" placeholder="身份证号">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-select size="small" v-model="value" placeholder="联系电话">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-form :inline="true">
          <el-form-item label="门诊类型">
            <el-input size="small" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="预约科室">
            <el-select size="small" v-model="value" placeholder="">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择医生">
            <el-select size="small" v-model="value" placeholder="">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="pagebody">
      <div>
        <el-button-group class="pull-left">
          <el-button size="small" type="primary" icon="arrow-left">上一天</el-button>
          <el-button size="small" type="primary">下一天<i class="el-icon-arrow-right el-icon--right"></i></el-button>
          <el-button size="small" type="primary">今天<i class="el-icon-date el-icon--right"></i></el-button>
        </el-button-group>
        <div class="legendgroup pull-right">
          <span><i></i>全部预约</span>
          <span><i></i>部分可约</span>
          <span><i></i>预约已满</span>
        </div>
      </div>
      <div>
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
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: '选项1',
          label: '341282198912250333'
        }, {
          value: '选项2',
          label: '341282198912250444'
        }, {
          value: '选项3',
          label: '341282198912250555'
        }, {
          value: '选项4',
          label: '341282198912250666'
        }, {
          value: '选项5',
          label: '341282198912250777'
        }],
        value: ''
      }
    }
  }
</script>

<style scoped>
  .filter-warrper > div {
    margin-bottom: 10px;
  }

  .order-search {
    width: 450px;
    display: inline-block;
  }

  .form-input {
    display: inline-block;
    width: 250px;
  }

  .bottom-border {
    border-bottom: 1px solid #e0e0e0;
  }

  .legendgroup > span {
    display: inline-block;
    margin-right: 20px;
  }

  .legendgroup > span > i {
    width: 20px;
    height: 20px;
    float: left;
    background: #999;
    border: 1px solid #e0e0e0;
    margin: 0px 5px 0 10px;
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
</style>
