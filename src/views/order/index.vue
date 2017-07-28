<template id="order">
  <div class="order-warrper">
    <div class="filter-warrper">
      <div class="order-search-box">
        <span class="pull-right">
            <el-button @click="AddVisible = true" type="primary">新增患者信息</el-button>
            <el-button class="btn-blue" @click="ListVisible = true" type="primary">预约列表</el-button>
         </span>
        <span class="order-search ">
             <el-input
               placeholder="刷卡或输入，磁卡／保障卡／IC卡／病历号／身份证／姓名／电话"
               icon="search"
               >
            </el-input>
        </span>
      </div>
      <div>
        <el-form :inline="true" class="demo-form-inline" label-width="80px" label-position="left">
          <div class="form-row">
              <el-form-item label="姓名">
                <el-input class="width-230" size="small" placeholder="请填写姓名"></el-input>
              </el-form-item>
              <el-form-item label="身份证号">
                <el-select class="width-230" size="small" v-model="value" placeholder="身份证号">
                  <el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="联系电话">
                <el-input class="width-230" size="small" placeholder="请填写电话"></el-input>
              </el-form-item>
          </div>
          <el-collapse-transition>
          <div v-if="detailShow">
            <div class="form-row">
            <el-form-item label="性别">
              <el-radio-group class="width-230" >
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
                <el-radio label="不详"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="婚姻状况">
              <el-radio-group class="width-230" >
                <el-radio label="已婚"></el-radio>
                <el-radio label="未婚"></el-radio>
                <el-radio label="不详"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="身份证号">
              <el-select class="width-230" size="small" v-model="value" placeholder="身份证号">
                <el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            </div>
            <div class="form-row">
              <el-form-item label="联系地址">
                <el-input class="width-230" size="small" placeholder="请填写姓名"></el-input>
              </el-form-item>
              <el-form-item label="费用类别">
                <el-select class="width-230" size="small" v-model="value" placeholder="身份证号">
                  <el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="患者职业">
                <el-select class="width-230" size="small" v-model="value" placeholder="身份证号">
                  <el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="form-row">
              <el-form-item label="民族">
                <el-select class="width-230" size="small" v-model="value" placeholder="身份证号">
                  <el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="form-row">
              <el-form-item label="户口地|省">
                <el-select class="width-230" size="small" v-model="value" placeholder="身份证号">
                  <el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="详细地址">
                <el-input class="width-635" size="small" placeholder="请填写详细地址"></el-input>
              </el-form-item>
            </div>
            <div class="form-row">
              <el-form-item label="居住地|省">
                <el-select class="width-230" size="small" v-model="value" placeholder="身份证号">
                  <el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="详细地址">
                <el-input class="width-635" size="small" placeholder="请填写详细地址"></el-input>
              </el-form-item>
            </div>
          </div>
            </el-collapse-transition>
          <div class="line"></div>
          <span @click="collapse" class="detail-collapse">{{btntext}}<i class="icon iconfont icon-xiangzuo"></i></span>
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
      <div class="type-filter">
        <span>服务类型</span>
        <span><i class="el-icon-menu all"></i>全部</span>
        <span class="allcan"><i></i>全部可约</span>
        <span class="somecan"><i></i>部分可约</span>
        <span class="cant"><i></i>预约已满</span>
        </div>
      <div>

        <div class="table-time">
          <span>
            <p>周一</p>
            <p>1</p>
          </span>
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
                <span class="name">主治医师</span>
                <span class="position">张文</span>
              </p>
            </div>
          </div>
          <div class="AdTableRight">
            <div class="table-body">
              <div class="border-top-1">
                <span>
                 <el-popover placement="bottom" width="250" trigger="hover">
                      <div class="fixed-info">
                        <div class="fixed-body">
                          <div class="fixed-title">出班信息1</div>
                           <p>
                            <span class="fixed-label">出诊院区：</span>
                            <span>黄埔院区</span>
                          </p>
                          <p>
                            <span class="fixed-label">就诊科室：</span>
                            <span>胸外科精品B</span>
                          </p>
                          <p>
                            <span class="fixed-label">服务类型：</span>
                            <span>特需</span>
                          </p>
                          <p>
                            <span class="fixed-label">服务费用：</span>
                            <span class="service-cost">
                             <p>100元</p>
                             <p>1-10</p>
                             </span>
                            <span class="service-cost">
                              <p>200元</p>
                              <p>11-50</p>
                            </span>
                            <span class="service-cost">
                              <p>300元</p>
                              <p>51-70</p>
                            </span>
                          </p>
                          <p>
                            <span class="fixed-label">出诊时间：</span>
                            <span>上午8:00-12:00</span>
                          </p>
                          <p>
                            <span class="fixed-label">就诊地址：</span>
                            <span>3号楼9楼胸外科(超过12个字自动换行)</span>
                          </p>
                          <p>
                            <span class="fixed-label">号源数量：</span>
                            <span>60/70</span>
                          </p>
                          <p>
                            <span @click="orderplus" class="order-plus-text">预约加号</span>
                          </p>
                         <el-collapse-transition>
                          <div v-if="plusshow">
                            <div class="fixed-line"></div>
                            <div class="order-plus-row">
                            <span class="plus-lable fixed-label">选择渠道：</span>
                            <span>
                              <el-select size="small" placeholder="请选择">
                                <el-option>
                                  1
                                </el-option>
                              </el-select>
                            </span>
                            </div>
                            <div class="order-plus-row">
                            <span class="plus-lable fixed-label">添加号序：</span>
                            <span>
                              <el-input-number size="small" :min="1" v-model="num6"></el-input-number>
                            </span>
                              </div>
                            <div class="order-plus-label">
                              <el-button @click="plusshow=false" size="small">取消</el-button>
                              <el-button size="small">添加</el-button>
                              <el-button size="small">添加并预约</el-button>
                            </div>
                          </div>
                        </el-collapse-transition>
                          <div class="fixed-line"></div>
                        </div>

                      </div>
                  <div slot="reference" class="ordered union">
                    <p>上午</p>
                    <p>20元｜已预约2/46</p>
                  </div>
                    </el-popover>

                </span>
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
        <div class="AdTable">
          <div class="AdTableLeft">
            <div>
              <i></i>
              <p>
                <span class="name">主治医师</span>
                <span class="position">姜文</span>
              </p>
            </div>
          </div>
          <div class="AdTableRight">
            <div class="table-body">
              <div class="border-top-1">
                <span>
                </span>
                <span></span>
                <span></span>
                <span>
                   <div class="ordered VIP">
                    <p>08:00-11:00</p>
                    <p>20元｜已预约2/46</p>
                  </div>
                </span>
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
                <span class="name">普通门诊</span>
              </p>
            </div>
          </div>
          <div class="AdTableRight">
            <div class="table-body">
              <div class="border-top-1">
                <span>
                </span>
                <span></span>
                <span></span>
                <span>
                   <div class="ordered disease">
                    <p>08:00-11:00</p>
                    <p>20元｜已预约2/46</p>
                  </div>
                </span>
                <span></span>
                <span></span>
                <span></span>
              </div>
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
        detailShow:false,
        plusshow:false,
        btntext:'展开',
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
          }],
        num6: 1
      }
    },
    methods:{
      collapse(){
        if(this.btntext=='展开'){
          this.detailShow=true;
          this.btntext='收起';
        }
        else{
          this.detailShow=false;
          this.btntext='展开';
        }
      },
      orderplus(){
       this.plusshow=true;
      }
    }
  }
</script>
<style scoped>
  .filter-warrper > div {
    margin-bottom: 10px;
  }

  .order-search {
    width: 550px;
    display: inline-block;
  }

  .form-input {
    display: inline-block;
    width: 250px;
  }

  .bottom-border {
    border-bottom: 1px dashed #e0e0e0;
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
  .el-input{
    height: 36px !important;
    line-height: 36px !important;
  }
  .order-warrper{
    padding: 20px;
    background: #fff;
  }
.line{
  width: 100%;
  display: inline-block;
  height: 1px;
  border-bottom: 1px dashed #e0e0e0;
  position: relative;
  bottom: 5px;
}
  .el-form-item{
    margin-bottom: 10px;
  }
  .detail-collapse{
    float: right;
    color: #20a0ff;
    cursor: pointer;
    width: 100%;
    display: inline-block;
    text-align: right;
  }
  .order-search-box{
    margin-bottom: 20px !important;
  }
.width-230{
  width: 230px;
  margin-right: 40px;
}
.width-635{
  width: 635px;
}
  .form-row{
    display: inline-block;
    width: 100%;
  }
  .table-time {
    display: inline-block;
    width: 100%;
    padding-left: 170px;
    box-sizing: border-box;
  }

  .table-time > span {
    width: 14.285%;
    height: 55px;
    line-height: 55px;
    float: left;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    box-sizing: border-box;
  }

  .AdTable > .AdTableLeft,
  .AdTable > .AdTableRight {
    box-sizing: border-box;
    float: left;
  }

  .AdTable > .AdTableLeft {
    width: 160px;
    height: 80px;
    position: absolute;
    left: 0;
  }

  .AdTable > .AdTableRight {
    height: 80px;
    width: 100%;
    padding-left: 160px;
    box-sizing: border-box;
  }

  .table-body {
    width: 100%;
    display: inline-block;
    border-right: 1px solid #e0e0e0;
  }

  .AdTable {
    position: relative;
    display: inline-block;
    width: 100%;
    float: left;
  }

  .AdTableLeft > div {
    height: 80px;
    line-height: 80px;
  }

  .AdTableLeft > div > i {
    width: 60px;
    height: 60px;
    float: left;
    margin: 10px 0px;
    background: url('../../../static/img/man.png') center center no-repeat;

  }
  .AdTableLeft > div > p > span {
    height: 20px;
    line-height: 20px;
    width: 100px;
    display: inline-block;
    float: left;
  }

  .table-body > div {
    width: 100%;
    display: inline-block;
    float: left;
  }

  .table-body > .border-top-1 {
    border-top: 1px solid #D4DEED;
  }

  .table-body > div > span {
    width: 14.285%;
    height: 80px;
    line-height: 80px;
    float: left;
    text-align: center;
    border-left: 1px solid #D4DEED;
    border-bottom: 1px solid #D4DEED;
    box-sizing: border-box;
  }
  .AdTableLeft > div > p{
    float: left;
    width: 100px;
    text-align: center;
    box-sizing: border-box;
    height: 80px;
    padding: 20px 0;
  }
  .AdTableLeft > div > p>.name{
    font-size: 15px;
    font-weight: bold;
    color: #333;
  }
  .AdTableLeft > div > p>.position{
    color: #999;
  }
  .ordered {
    width: 100%;
    height: 100%;
    display: inline-block;
    font-size: 14px;
    box-sizing: border-box;
    padding: 10px 0;
  }

  .ordered > p {
    height: 30px;
    line-height: 30px;
  }
  /*default,expert,disease,union,VIP*/

  .ordered.default,
  .ordered.expert,
  .ordered.disease,
  .ordered.union,
  .ordered.VIP {
    cursor: pointer;
  }

  .ordered.default {
    background: rgb(185, 185, 185);
    color: #fff;
  }

  .ordered.expert {
    color: rgb(32, 160, 255);
    background: rgb(192, 229, 255);
  }

  .ordered.disease {
    color: rgb(12, 175, 148);
    background: rgb(231, 250, 240);
  }

  .ordered.union {
    color: rgb(232, 166, 35);
    background: rgb(255, 248, 234);
  }

  .ordered.VIP {
    color: rgb(255, 73, 73);
    background: rgb(255, 237, 237);
  }
  .type-filter > span {
    display: inline-block;
    cursor: default;
  }

  .type-filter > span > .all {
    border: 1px solid transparent;
    color: #e0e0e0;
    font-size: 16px;
  }
  .type-filter > .somecan{
    color: rgb(32, 160, 255);
  }
  .type-filter > .allcan{
    color: rgb(12, 175, 148);
  }
  .type-filter > .cant{
    color: rgb(255, 73, 73);
  }
  .type-filter > .somecan>i {
    border: 1px solid rgb(192, 229, 255);
    background: rgb(233, 246, 255);
  }

  .type-filter > .allcan >i {
    border: 1px solid rgb(188, 241, 212);
    background: rgb(231, 250, 240);
  }
  .type-filter > .cant > i {
    border: 1px solid rgb(255, 204, 204);
    background: rgb(255, 237, 237);
  }
  .type-filter > span > i {
    width: 16px;
    height: 16px;
    float: left;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    margin: 0px 5px 0 10px;
    cursor: pointer;
  }
  .fixed-info{
    padding: 5px;
    color: #999;
  }
  .fixed-body{
    padding-bottom: 10px;
  }
  .fixed-body>p{
    width: 100%;
    display: inline-block;
  }
  .fixed-body>p>span,.order-plus-row>span{
    display: inline-block;
    float: left;
    width: 130px;
  }

  .fixed-body>p>span.fixed-label,.order-plus-row>span.fixed-label{
    width: 60px;
  }
  .fixed-title{
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #333;
    font-weight: bold;
  }
  .fixed-footer{
    margin-top: 15px;
  }
  .service-cost{
    float: left;
    width: 35px !important;
    display: inline-block;
    padding:0 3px ;
    border-right:1px dashed #D4DEED ;
    text-align: center;
  }

  .service-cost:nth-last-child(1){
    border-right:1px dashed transparent ;
  }
  .order-plus-text{
    margin: 5px 0;
    color:rgb(43,145,255);
    cursor: pointer;
  }
  .order-plus-text:hover{
    color: rgb(6, 187, 255);
  }
  .fixed-line{
    width: 100%;
    display: inline-block;
    border-bottom: 1px dashed #e0e0e0;
    float: left;
    margin: 10px 0;
  }
  .width-190{
    width: 190px;
  }
  .plus-lable{
    margin: 5px 0;
  }
.order-plus-row{
  width: 100%;
  display: inline-block;
  float: left;
  margin-bottom: 10px;
}
</style>
