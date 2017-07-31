<template>
    <div class="setting-body">
      <div  class="setting-main">
        <div>
          <div class="page-head">
            <div class="type-filter">
              <span>服务类型</span>
               <span v-for="(item,index) in Type.category">
                <!--,{active:active==index}-->
                <i @click="selection(index)"  :class="[item.type,{active:Type.active==index}]"></i>
                {{item.text}}（{{item.num}}）
              </span>

             <span class="pull-right">
                <span class="icon-group">
                  <el-tooltip class="item" effect="dark" content="导出" placement="bottom">
                     <i @click="ExportVisible = true" class="icon iconfont icon-daochu"></i>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="打印" placement="bottom">
                    <i @click="PrintVisible = true" class="icon iconfont icon-dayin"></i>
                  </el-tooltip>
                </span>
                 <!--打印-->
              <el-dialog title="打印出班表" :visible.sync="PrintVisible" size="tiny">
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
                 <!--导出-->
              <el-dialog title="导出为Excel" :visible.sync="ExportVisible" size="tiny" >
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
                <el-button type="primary" @click="TemSuccess">导 出</el-button>
              </span>
            </el-dialog>
              </span>
            </div>
          </div>
          <div class="page-body" v-loading="loading" element-loading-text="拼命加载中">
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
            <div v-for="item in templateData" class="AdTable">
              <div class="AdTableLeft">
                <div>
                  <i></i>
                  <p>
                    <span class="name">{{item.ysmc}}</span>
                    <span class="position">主治医师</span>
                  </p>
                </div>
              </div>
              <div class="AdTableRight">
                <div class="table-body">
                  <div v-for="(slot,index) in item.slot" :class="[index ===0 ? 'border-top-1':'']">
                    <span>{{slot.sjdmc}}</span>
                    <span v-for="week in slot.weekday">
                      <el-popover v-if="week.cbrqlx"  placement="bottom" width="200" trigger="hover">
                        <div class="fixed-info">
                          <div class="fixed-body">
                            <div class="fixed-title">出班信息</div>
                            <p>
                              <span class="fixed-label">就诊科室：</span>
                              <span>{{week.ksmc}}</span>
                            </p>
                            <p>
                              <span class="fixed-label">服务类型：</span>
                              <span>{{week.fwlxdm}}</span>
                            </p>
                            <p>
                              <span class="fixed-label">出诊时间：</span>
                              <span>{{slot.sjdmc}}{{week.kssj | timeFormat}}-{{week.jssj |timeFormat}}</span>
                            </p>
                            <p>
                              <span class="fixed-label">就诊地址：</span>
                              <span>{{week.czdz}}</span>
                            </p>
                            <p>
                              <span class="fixed-label">号源数量：</span>
                              <span>{{week.hxzs}}</span>
                            </p>
                          </div>
                          <div class="fixed-footer">
                            <el-button @click="ShiftVisible = true" type="text" size="small" class="el-button ">出班调整</el-button>
                            <el-button @click="RecordVisible=true" type="text" size="small" class="el-button pull-right">调整记录</el-button>
                          </div>
                        </div>
                        <div slot="reference" class="ordered disease">
                          <p>{{week.kssj | timeFormat}}-{{week.jssj |timeFormat}}</p>
                          <p>{{week.ksmc}}</p>
                        </div>
                      </el-popover>
                    </span>
                  </div>
                </div>
              </div>
            </div>
              <el-dialog title="出班调整" :visible.sync="ShiftVisible" size="small"  >
              <div>
                <div class="now-num">已有32位患者预约</div>
                <div class="now-info">
                  <div>
                    <span class="tab-label">调整类型</span>
                    <el-radio-group v-model="form1.resource" @change="FormChange">
                      <el-radio label="替诊"></el-radio>
                      <el-radio label="停诊"></el-radio>
                      <el-radio label="调班"></el-radio>
                    </el-radio-group>
                  </div>
                  <!--替诊-->
                  <el-form v-if="replace" ref="form" :model="form1" label-width="110px">
                    <el-form-item label="当前医生">
                      <span>张文</span>
                    </el-form-item>
                    <div class="line"></div>
                    <el-form-item label="替诊医生">
                      <el-select class="width-300" v-model="form1.data1" filterable placeholder="请选择">
                        <el-option
                          v-for="item in form1.region"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="替诊原因">
                      <el-input class="width-300" type="textarea" v-model="form1.desc"></el-input>
                    </el-form-item>
                  </el-form>
                  <!--停诊-->
                  <el-form v-if="stop" ref="form" :model="form2" label-width="110px">
                    <el-form-item label="停诊时间">
                      <el-date-picker
                        class="width-300"
                        v-model="form2.date1"
                        type="datetime"
                        placeholder="选择日期时间">
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item label="停诊原因">
                      <el-input class="width-300" type="textarea" v-model="form2.desc"></el-input>
                    </el-form-item>
                  </el-form>
                  <!--调班-->
                  <el-form v-if="change" ref="form" :model="form3" label-width="110px">
                    <el-form-item label="医生/科室">
                      <span>张文/黄埔院区胸外科1</span>
                    </el-form-item>
                    <el-form-item label="预约时间">
                      <span>2015/05/01</span>
                    </el-form-item>
                    <div class="change-icon">
                      <i class="icon iconfont icon-duihuan"></i>
                    </div>
                    <el-form-item label="调班医生">
                      <el-cascader
                        class="width-300"
                        placeholder="可搜索"
                        :options="form3.options"
                        filterable
                      ></el-cascader>
                    </el-form-item>
                    <el-form-item label="调班时间">
                      <el-date-picker
                        class="width-300"
                        v-model="form3.date1"
                        type="datetime"
                        placeholder="选择日期时间">
                      </el-date-picker>
                    </el-form-item>
                    <div class="line"></div>
                    <el-form-item label="调班原因">
                      <el-input class="width-300" type="textarea" v-model="form3.desc"></el-input>
                    </el-form-item>
                  </el-form>

                </div>
              </div>
    <span slot="footer" class="dialog-footer">
      <el-button>恢复到最初排班</el-button>
      <el-button @click="ShiftVisible = false">取 消</el-button>
      <el-button type="primary" @click="MsgSuccess">确 定</el-button>
    </span>
            </el-dialog>
              <el-dialog title="调整记录" :visible.sync="RecordVisible" size="small">
              <div class="time-wrapper">
                <div class="time-line">
                 <div class="time-left">
                   <span>2017/04/28</span>
                   <i class="active"></i>
                 </div>
                 <div class="time-right">
                   <div>
                     <p class="title">调整为"停诊"</p>
                     <p>停诊时间：2017/05/01 8:00-12:00</p>
                     <p>停诊原因：突发意外情况需要处理</p>
                   </div>
                 </div>
               </div>
                <div class="time-line">
                  <div class="time-left">
                    <span>2017/04/28</span>
                    <i></i>
                  </div>
                  <div class="time-right">
                    <div>
                      <p class="title">调整为"停诊"</p>
                      <p>停诊时间：2017/05/01 8:00-12:00</p>
                      <p>停诊原因：突发意外情况需要处理</p>
                    </div>
                  </div>
                </div>
                <div class="time-line">
                  <div class="time-left">
                    <span>2017/04/28</span>
                    <i></i>
                  </div>
                  <div class="time-right">
                    <div>
                      <p class="title">调整为"停诊"</p>
                      <p>停诊时间：2017/05/01 8:00-12:00</p>
                      <p>停诊原因：突发意外情况需要处理</p>
                    </div>
                  </div>
                </div>
                <div class="time-line">
                  <div class="time-left">
                    <span>2017/04/28</span>
                    <i></i>
                  </div>
                  <div class="time-right">
                    <div>
                      <p class="title">调整为"停诊"</p>
                      <p>停诊时间：2017/05/01 8:00-12:00</p>
                      <p>停诊原因：突发意外情况需要处理</p>
                    </div>
                  </div>
                </div>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="RecordVisible = false">取 消</el-button>
                <el-button type="primary" @click="RecordVisible = false">确定</el-button>
              </span>
            </el-dialog>
            </div>
          </div>
      </div>
    </div>

</template>

<script>
  import * as arr from 'filters/array.js'
  export default {
    data() {
      return {
        SettingVisible: false,
        PrintVisible: false,
        ExportVisible: false,
        SubmitVisible: false,
        ShiftVisible:false,
        RecordVisible:false,
        replace:true,
        stop:false,
        change:false,
        value1: '',
        form1: {
          name: '',
          region:[
            {
              value: '选项1',
              label: '张晓峰'
            }, {
              value: '选项2',
              label: '李云云'
            }, {
              value: '选项3',
              label: '王海'
            }, {
              value: '选项4',
              label: '刘峰'
            }, {
              value: '选项5',
              label: '孙海'
            }, {
              value: '选项6',
              label: '孙海6'
            }, {
              value: '选项7',
              label: '孙海7'
            }, {
              value: '选项8',
              label: '孙海8'
            }, {
              value: '选项9',
              label: '孙海9'
            }, {
              value: '选项10',
              label: '孙海10'
            }, {
              value: '选项11',
              label: '孙海11'
            }
          ],
          data1: '',
          resource: '替诊',
          desc:''
        },
        form2: {
          name: '',
          region: '',
          date1: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        form3: {
          name: '',
          region: '',
          date1: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          options: [
            {
              value: '1',
              label: '李峰',
              children: [
                {
                  value: '黄埔院区胸外科1',
                  label: '黄埔院区胸外科1'
                },
                {
                  value: '黄埔院区胸外科2',
                  label: '黄埔院区胸外科2'
                }]
            },
            {
              value: '2',
              label: '李云云',
              children: [{
                value: '徐汇院区胸外科精品A',
                label: '徐汇院区胸外科精品A'
              }, {
                value: '徐汇院区胸外科精品B',
                label: '徐汇院区胸外科精品B'
              }]
            },
            {
              value: '3',
              label: '王浩',
              children: [
                {
                  value: '徐汇园区胸外科精品C',
                  label: '徐汇园区胸外科精品C'
                },
                {
                  value: '徐汇园区胸外科精品D',
                  label: '徐汇园区胸外科精品D'
                }]
            },

          ]
        },
        addtable:[1,2,3],
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        Type: {
          active: 0,
          category: [
            {
              type: 'all el-icon-menu ',
              text: '全部',
              num: 10,},
            {
              type: 'default',
              text: '普通',
              num: 10,
            },
            {
              type: 'expert',
              text: '专家',
              num: 2
            },
            {
              type: 'disease',
              text: '专病',
              num: 3
            },
            {
              type: 'union',
              text: '联合',
              num: 4
            },
            {
              type: 'VIP',
              text: '特需',
              num: 5
            }
          ]
        },
        templateData:[],
        loading:true
      };
    },
    created(){
      this.$nextTick(() => {
        this.init();
    })
    },
    methods: {
      MsgSuccess() {
        this.SubmitVisible=false;
        this.$message({
          message: '噢啦啦啦啦啦啦提交成功！',
          type: 'success'
        });
      },
      TemSuccess(){
        this.$message({
          message: '成功！',
          type: 'success'
        });
      },
      FormChange(value){
        if (value == '替诊'){
          this.replace=true;
          this.stop=false;
          this.change=false;
        }
        else if(value == '停诊'){
          this.replace=false;
          this.stop=true;
          this.change=false;
        }
        else if(value == '调班'){
          this.replace=false;
          this.stop=false;
          this.change=true;
        }
      },
      init(){
        //获取服务类型
        this.getServiceType();
        //获取时间段
        this.getTimeSlot();
        this.dataInit();
      },
      //获取服务类型
      getServiceType(){
        this.serviceTypeList = this.$store.state.scheduling.serviceTypeList;
      },
      //获取时间段列表
      getTimeSlot(){
        this.timeSlot = this.$store.state.scheduling.timeSlotList;
      },
      //数据初始化
      dataInit(){
        this.$wnhttp("PAT.WEB.APPOINTMENT.SCHEDULE.Q02", { ksdm: '',mbdm:'' }).then(data => {
          this.TpCard = data;
        this.formatData(arr.classifyArr(data, 'ysdm'));
        this.loading=false;
      }).catch(err => {
          console.log(err);
      });
      },
      formatData(list){
        //医生→时间段→日期
        let newArr = [];
        list.map((item,index) => {
          newArr[index] = {"ysdm":item.name,"slot":[]};
        this.timeSlot.map(slot => {console.log(slot);
        slot.weekday = [{},{},{},{},{},{},{}];
        item.children.map(week => {
          newArr[index].ysmc = week.ysmc;
        if(week.sjddm === slot.sjddm && week.cbrqlx === '星期一'){
          slot.weekday[0] = week;
        }
        if(week.sjddm === slot.sjddm && week.cbrqlx === '星期二'){
          slot.weekday[1] = week;
        }
        if(week.sjddm === slot.sjddm && week.cbrqlx === '星期三'){
          slot.weekday[2] = week;
        }
        if(week.sjddm === slot.sjddm && week.cbrqlx === '星期四'){
          slot.weekday[3] = week;
        }
        if(week.sjddm === slot.sjddm && week.cbrqlx === '星期五'){
          slot.weekday[4] = week;
        }
        if(week.sjddm === slot.sjddm && week.cbrqlx === '星期六'){
          slot.weekday[5] = week;
        }
        if(week.sjddm === slot.sjddm && week.cbrqlx === '星期天'){
          slot.weekday[6] = week;
        }
      })
        newArr[index].slot.push(slot);
      });
      });
        this.templateData = newArr;
      },
      //服务类型筛选表单
      selection(index) {
        this.Type.active = index;
      },
    },
    filters: {
      timeFormat: function (time) {
        if(!time)return;
        return time.split(' ')[1]
      },
    }
  };
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
    display: inline-block;
    background: #fff;
    box-sizing: border-box;
  }
  .Adjustment{
    height: 25px; line-height:25px;position: absolute;right: 20px;top: 30px;
  }
  .Adjustment>a{
    text-decoration: none;
    color:rgb(32, 160, 255);
  }
  .setting-dialog-text{
    padding-left: 20%;
  }
  .setting-dialog-text>p{
    color: #999;
    height: 30px;
    line-height: 30px;
  }
  /*-------------------------------*/
  .table-time {
    display: inline-block;
    width: 100%;
    padding-left: 170px;
    box-sizing: border-box;
    margin-top: 10px;
  }

  .table-time > span {
    width: 12.5%;
    height: 45px;
    line-height: 45px;
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
    height: 166px;
    position: absolute;
    left: 0;
  }

  .AdTable > .AdTableRight {
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
    margin: 0 0 10px 0;
    display: inline-block;
    width: 100%;
  }

  .AdTableLeft > div {
    height: 166px;
    line-height: 166px;
  }

  .AdTableLeft > div > i {
    width: 60px;
    height: 60px;
    float: left;
    margin: 60px 0px;
    background: url("../../../../static/img/man.png") center center no-repeat;
  }

  .AdTableLeft > div > p {
    float: left;
    width: 100px;
    height: 166px;
    text-align: center;
    padding: 70px 0;
    box-sizing: border-box;
  }

  .AdTableLeft > div > p > span {
    height: 20px;
    line-height: 20px;
    width: 100px;
    display: inline-block;
    float: left;
  }
  .AdTableLeft > div > p>.name{
    font-size: 15px;
    font-weight: bold;
    color: #333;
  }
  .AdTableLeft > div > p>.position{
    color: #999;
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
    width: 12.5%;
    height: 60px;
    line-height: 60px;
    float: left;
    text-align: center;
    box-sizing: border-box;
    border-left: 1px solid #D4DEED;
    border-bottom: 1px solid #D4DEED;
    box-sizing: border-box;
  }
  /*-------------------------*/

  .ordered {
    width: 100%;
    height: 100%;
    display: inline-block;
    font-size: 14px;
    padding: 10px 0 10px 0;
    box-sizing: border-box;
  }

  .ordered > p {
    height: 20px;
    line-height: 20px;
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

  .page-head > div {
    height: 50px;
    line-height: 50px;
  }

  .type-filter > span {
    display: inline-block;
    cursor: default;
  }

  .type-filter > span > .all {
    border: 1px solid transparent;
    margin-top: 15px;
    color: #e0e0e0;
    font-size: 16px;
  }
  .type-filter > span > .all.active{
    color: #a0a0a0;
  }
  .type-filter > span > .default {
    border: 1px solid #e0e0e0;
    background: #fff;
  }

  .type-filter > span > .default.active {
    background: #e0e0e0;
  }

  .type-filter > span > .expert {
    border: 1px solid rgb(192, 229, 255);
    background: rgb(233, 246, 255);
  }

  .type-filter > span > .expert.active {
    background: rgb(192, 229, 255);
  }

  .type-filter > span > .disease {
    border: 1px solid rgb(188, 241, 212);
    background: rgb(231, 250, 240);
  }

  .type-filter > span > .disease.active {
    background: rgb(188, 241, 212);
  }

  .type-filter > span > .union {
    border: 1px solid rgb(254, 235, 195);
    background: rgb(255, 248, 234);
  }

  .type-filter > span > .union.active {
    background: rgb(254, 235, 195);
  }

  .type-filter > span > .VIP {
    border: 1px solid rgb(255, 204, 204);
    background: rgb(255, 237, 237);
  }

  .type-filter > span > .VIP.active {
    background: rgb(255, 204, 204);
  }

  .type-filter > span > i {
    width: 16px;
    height: 16px;
    float: left;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    margin: 15px 5px 0 10px;
    cursor: pointer;
  }
  .in-model > span > i, .in-model > span>.all{
    margin: 10px 5px 0 10px;
  }
  .setting-wraaper {
    position: absolute;
    display: inline-block;
    top: 0;
    left: 0;
    width: 100%;
    height: 880px;
    background: #fff;
  }
  .fixed-info{
    padding: 5px;
    color: #999;
  }
  .fixed-body{
    border-bottom: 1px dashed #e0e0e0;
    padding-bottom: 10px;
  }
  .fixed-body>p{
    width: 100%;
    display: inline-block;
  }
  .fixed-body>p>span{
    display: inline-block;
    float: left;
    width: 130px;
  }

  .fixed-body>p>span.fixed-label{
    width: 60px;
  }
  .fixed-title{
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #333;
  }
  .fixed-footer{
    margin-top: 15px;
  }
  .btn-blue{
    background: #fff;
    border-color: #50bfff;
    color: #50bfff;
  }
  .btn-blue:hover{
    color: #fff;
    background-color: #20a0ff;
    border-color: #20a0ff;
  }
  .now-num{
    position: absolute;
    top:18px;
    right: 36px;
    color: rgb(255,197,61);
  }
  .tab-label{
    width: 110px;
    text-align: right;
    display: inline-block;
    font-size: 14px;
    padding: 0px 12px 20px 0;
    box-sizing: border-box;
  }
  .line{
    width: 100%;
    float: left;
    margin-bottom: 22px;
    display: inline-block;
    border-bottom: 1px dashed #e0e0e0;
  }
  /*----时间轴----*/
  .time-wrapper{

  }
.time-line{
  width: 100%;
  height: 100px;
  display: inline-block;
  position: relative;
  color: #999;

}
.time-line>.time-left{
  width: 150px;
  height: 100%;
  border-right: 1px solid #e0e0e0;
  line-height: 40px;
  text-align: center;
  position: absolute;
  left: 0;
  top: 0;
}
  .time-line>.time-left>span{
    position: absolute;
    right: 20px;
    top: -15px;
  }
  .time-line>.time-right{
    box-sizing: border-box;
    padding-left: 170px;
    width: 100%;
    height: 100px;
    position: relative;
    top: -10px;
  }
  .time-right>div>p{
    height: 30px;
    line-height: 30px;
  }
  .time-right>div>.title,.time-left>span{
    color: #666;
  }
  .time-left>i{
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #e0e0e0;
    position: absolute;
    top: -2px;
    right: -8px;
  }
  .time-left>i.active{
    background: #20a0ff;
  }
  .change-icon{
    text-align: center;
    float: left;
    width: 100%;
    position: relative;
    top: -15px;
  }
  .change-icon>i{
    font-size: 60px;
    color: rgb(62,156,255);
  }
  .icon-group>i{
    margin-left: 15px;
    color: rgb(192,189,185);
  }
  .icon-group>i:hover{
    color: rgb(89,100,185);
  }
  .fixed-footer-btn{
    border-right: 1px solid #e0e0e0;
    padding-right: 15px;
  }
  .page-body{
    height: calc(90vh - 300px);
  }
  .width-300{
    width: 300px;
  }
</style>
