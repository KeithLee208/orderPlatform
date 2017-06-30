<template id="order">
  <div>
    <div class="filter-warrper">
      <div>
        <span>
            <el-button @click="AddVisible = true" type="primary" size="small">新增患者信息</el-button>
            <el-button @click="ListVisible = true" type="primary" size="small">预约列表</el-button>
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
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-select size="small" v-model="value" placeholder="联系电话">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
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
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择医生">
            <el-select size="small" v-model="value" placeholder="">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
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
              <span>
                <span @click="PrintVisible = true"
                      style="width: 100%;height: 50px;display: inline-block;cursor: pointer">
                  <p style="float: left">100元</p>
                  <p>已约0/46</p>
                </span>
                            </span>
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
    <el-dialog title="患者信息登记" :visible.sync="AddVisible" size="large">
            <span>
              <el-form :inline="true" class="demo-form-inline">
                 <el-row>
                <el-col :span="8">
                  <el-form-item label="姓名：">
                    <el-input placeholder="请输入姓名"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="身份证号：">
                     <el-input placeholder="请输入身份证号"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系电话：">
                     <el-input placeholder="请输入联系电话"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
                 <el-row>
                <el-col :span="8">
                  <el-form-item label="性别：">
                    <el-input placeholder="请输入性别"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="费用列别：">
                     <el-input placeholder="请输入费用列别"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="初复诊：">
                     <el-input placeholder="请输入初复诊"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
                 <el-row>
                <el-col :span="8">
                  <el-form-item label="民族：">
                    <el-input placeholder="请输入民族"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="联系地址：">
                     <el-input placeholder="请输入联系地址"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="患者职业：">
                     <el-input placeholder="请输入患者职业"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
                 <el-row>
                <el-col :span="8">
                  <el-form-item label="婚姻状况：">
                    <el-input placeholder="请输入婚姻状况"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
                <div
                  style="width: 100%;height: 1px;display: inline-block;margin-bottom:20px;border-bottom: 1px dashed #e0e0e0;"></div>
                 <el-row>
                  <el-col :span="8">
                  <el-form-item label="户口所在地：">
                    <el-input placeholder="请输入户口所在地"></el-input>
                  </el-form-item>
                </el-col>
                  <el-col :span="16">
                  <el-form-item label="详细地址：">
                    <el-input placeholder="请输入详细地址"></el-input>
                  </el-form-item>
                </el-col>
                </el-row>
                 <el-row>
                  <el-col :span="8">
                  <el-form-item label="居住地址：">
                    <el-input placeholder="请输入居住地址"></el-input>
                  </el-form-item>
                </el-col>
                  <el-col :span="16">
                  <el-form-item label="详细地址：">
                    <el-input placeholder="请输入详细地址"></el-input>
                  </el-form-item>
                </el-col>
                </el-row>
             </el-form>
            </span>
      <span slot="footer" class="dialog-footer">
                <el-button @click="AddVisible = false">取 消</el-button>
                <el-button type="primary" @click="PrintVisible = false">生成就诊卡号并保存</el-button>
              </span>

    </el-dialog>
    <el-dialog title="预约列表" :visible.sync="ListVisible" size="large">
            <span>
              <el-form :inline="true" class="demo-form-inline">
                <el-row>
                <el-col :span="24">
                    <span style="float: right;width: 500px">
                    <el-input
                      placeholder="刷卡或输入，磁卡／保障卡／IC卡／病历号／身份证／姓名／电话"
                      icon="search"
                      size="small">
                    </el-input>
                    </span>
            </el-col>
            </el-row>
            <el-row>
                <div style="height: 200px;line-height: 200px;background: red;color: #fff;text-align: center">查询条件</div>
            </el-row>
            <el-row>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="date" label="日期" width="180">
                    </el-table-column>
                    <el-table-column prop="name" label="姓名" width="180">
                    </el-table-column>
                    <el-table-column prop="address" label="地址">
                    </el-table-column>
                </el-table>
            </el-row>
            <el-row>
                <el-pagination layout="prev, pager, next" :total="50">
                </el-pagination>
            </el-row>
            </el-form>
            </span>
    </el-dialog>
    <el-dialog title="患者信息登记" :visible.sync="PrintVisible" size="large">
            <span>
              <el-form :inline="true" class="demo-form-inline">
                <el-row>
                <el-col :span="8">
                  <el-form-item label="姓名：">
                    <span>张文</span>
            </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="门诊类型：">
                    <span>普通门诊</span>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="科室：">
                    <span>胸外科</span>
                </el-form-item>
            </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="就诊时间：">
                        <span>2017/05/01</span>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="医院：">
                        <span>黄埔院区</span>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="挂号费用：">
                        <span>100元</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <div  style="width: 100%;height: 1px;display: inline-block;margin-bottom:20px;border-bottom: 1px dashed #e0e0e0;"></div>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="姓名：">
                        <el-input placeholder="请输入姓名"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="身份证号：">
                        <el-input placeholder="请输入身份证号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="联系电话：">
                        <el-input placeholder="请输入联系电话"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="性别：">
                        <el-input placeholder="请输入性别"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="费用列别：">
                        <el-input placeholder="请输入费用列别"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="初复诊：">
                        <el-input placeholder="请输入初复诊"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="民族：">
                        <el-input placeholder="请输入民族"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="联系地址：">
                        <el-input placeholder="请输入联系地址"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="患者职业：">
                        <el-input placeholder="请输入患者职业"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="婚姻状况：">
                        <el-input placeholder="请输入婚姻状况"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <div
              style="width: 100%;height: 1px;display: inline-block;margin-bottom:20px;border-bottom: 1px dashed #e0e0e0;"></div>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="户口所在地：">
                        <el-input placeholder="请输入户口所在地"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="16">
                    <el-form-item label="详细地址：">
                        <el-input placeholder="请输入详细地址"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="居住地址：">
                        <el-input placeholder="请输入居住地址"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="16">
                    <el-form-item label="详细地址：">
                        <el-input placeholder="请输入详细地址"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            </el-form>
            </span>
      <span slot="footer" class="dialog-footer">
                <el-button @click="PrintVisible = false">取 消</el-button>
                <el-button type="primary" @click="PrintVisible = false">打 印</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        options: [
          {
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
        value: '',
        AddVisible: false,
        ListVisible: false,
        PrintVisible: false,
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
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

  .AdTable > .AdTableLeft,
  .AdTable > .AdTableRight {
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
