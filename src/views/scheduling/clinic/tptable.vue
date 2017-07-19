<template>
  <div class="setting-wraaper">
    <div class="setting-header">
      <router-link
        :to="$store.state.login.userInfo.type === '科室'?'/scheduling/clinic/tpcard':'/scheduling/clinic/tplist'" class="pull-right">
        <i class="el-icon-close"></i>
      </router-link>
      <span>XX排班模板设置/XX科室</span>
      <span class="used-time"> <i class="el-icon-time"></i>使用时间：2017/03/02-2017/05/02</span>
    </div>
    <div class="setting-body">
      <div class="setting-main">
        <div>
          <div class="page-head">
            <div class="type-filter">
              <span>服务类型</span>
              <span><i class="el-icon-menu all"></i>全部</span>
              <span><i class="default"></i>普通（10）</span>
              <span><i class="expert"></i>专家（2）</span>
              <span><i class="disease"></i>专病（3）</span>
              <span><i class="union"></i>联合（4）</span>
              <span><i class="VIP"></i>特需（5）</span>
               <span class="pull-right">
                <!--<el-button @click="SubmitVisible = true" type="primary" size="small">提交</el-button>-->
                <span class="icon-group">
                  <el-tooltip class="item" effect="dark" content="导出" placement="bottom">
                     <i @click="ExportVisible = true" class="icon iconfont icon-daochu"></i>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="打印" placement="bottom">
                    <i @click="PrintVisible = true" class="icon iconfont icon-dayin"></i>
                  </el-tooltip>
                </span>
                 <!--设置-->
              <el-dialog  title="设置出班信息" :visible.sync="SettingVisible" size="large"  top="5%">
             <!--<div class="Adjustment" style="">-->
               <!--<a>调整记录</a>-->
             <!--</div>-->
            <div>
              <el-form  ref="form" :model="form" label-width="80px">
                  <el-form-item label="服务类型">
                       <div class="type-filter in-model">
                        <span ><i class="el-icon-menu all"></i>全部</span>
                        <span><i class="default"></i>普通（10）</span>
                        <span><i class="expert"></i>专家（2）</span>
                        <span><i class="disease"></i>专病（3）</span>
                        <span><i class="union"></i>联合（4）</span>
                        <span><i class="VIP"></i>特需（5）</span>
                        </div>
                  </el-form-item>
                 <el-form-item label="选择医生">
                      <el-col :span="14">
                        <el-select v-model="form.region" placeholder="请选择医生">
                          <el-option label="赵大宝" value="赵大宝"></el-option>
                          <el-option label="秦明" value="秦明"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="10">
                          <el-form-item label="选择病种">
                              <el-select v-model="form.region" placeholder="请选择病种">
                                  <el-option label="赵大宝" value="赵大宝"></el-option>
                                  <el-option label="秦明" value="秦明"></el-option>
                              </el-select>
                          </el-form-item>
                      </el-col>
                   </el-form-item>
                  <el-form-item label="选择院区">
                    <el-radio-group v-model="form.radio">
                      <el-radio :label="1">徐汇院区</el-radio>
                      <el-radio :label="2">黄埔院区</el-radio>
                    </el-radio-group>
                  </el-form-item>
                   <el-form-item label="就诊科室">
                    <el-radio-group v-model="form.radio2">
                      <el-radio :label="4">胸外科精品A</el-radio>
                      <el-radio :label="5">胸外科精品B</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="就诊时间">
                      <el-checkbox-group v-model="form.type">
                          <el-checkbox label="周一" name="type"></el-checkbox>
                          <el-checkbox label="周二" name="type"></el-checkbox>
                          <el-checkbox label="周三" name="type"></el-checkbox>
                          <el-checkbox label="周四" name="type"></el-checkbox>
                          <el-checkbox label="周五" name="type"></el-checkbox>
                          <el-checkbox label="周六" name="type"></el-checkbox>
                          <el-checkbox label="周七" name="type"></el-checkbox>
                      </el-checkbox-group>
                  </el-form-item>
                 <el-form-item label="出诊时间">
                  <el-col :span="14">
                      <el-radio-group v-model="form.resource">
                          <el-radio label="上午 8:00-12:00"></el-radio>
                          <el-radio label="下午 13:00-17:00"></el-radio>
                          <el-radio label="晚上 17:00-22:00"></el-radio>
                      </el-radio-group>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="时间段">
                     <el-time-picker
                       is-range
                       v-model="form.value3"
                       placeholder="选择时间范围">
                    </el-time-picker>
                      </el-form-item>
                  </el-col>
                    </el-form-item>
                  <el-form-item label="就诊地址">
                      <el-input type="input" v-model="form.desc"></el-input>
                  </el-form-item>
                <el-form-item label="备注信息">
                      <el-input type="input" v-model="form.desc"></el-input>
                  </el-form-item>
                <el-form-item >
                      <el-button @click="TemSuccess" class="pull-right"  type="success">保存并继续</el-button>
                  </el-form-item>
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
                  <span class="name">主治医师</span>
                  <span class="position">张文</span>
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
                  <div @click="dialogVisible = true" class="ordered disease">
                    <p>09:00-11:30</p>
                    <p>胸外科精品B</p>
                  </div>
                </span>
                  <span></span>
                  <span></span>
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
              </el-form>
              </div>
             <div slot="footer" class="dialog-footer">
                <el-button  @click="SettingVisible = false" >取消</el-button>
                 <el-button @click="MsgSuccess" type="primary">保存</el-button>
                  <el-button type="success" >保存并设置下一位</el-button>
              </div>
              </el-dialog>
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
                           <router-link to="/scheduling/clinic/tpset">
                          <el-button @click="SettingVisible = true" type="text" size="small">查看详情</el-button>
                             </router-link>
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
        value1: '',
        form: {
          name: '',
          region: '',
          radio: '1',
          radio2: '1',
          type: [],
          resource: '',
          value3: [new Date(2017, 1, 1, 0), new Date(2017, 1, 1, 23)],
          desc: ''
        },
        addtable:[1,2,3],
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        serviceTypeList:[],//服务类型列表
        timeSlot:[],//时间段列表
        templateData:[],//排版模板数据
      };
    },
    created(){
      this.$nextTick(() => {
          this.init();
      })
    },
    methods: {
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
        console.log(this.serviceTypeList);
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
      MsgSuccess() {
        this.SettingVisible=false;
        this.$message({
          message: '提交成功！',
          type: 'success'
        });
      },
      TemSuccess(){
        this.$message({
          message: '成功！',
          type: 'success'
        });
      }
    },
    filters: {
      timeFormat: function (time) {
        if(!time)return;
        return time.split(' ')[1]
      },
    },
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

  .setting-header > a > i {
    color: #fff;
  }

  .setting-header > span {
    font-size: 16px;
  }

  .setting-header > .used-time {
    font-size: 14px;
    color: rgba(255,255,255,0.5);
    margin-left: 15px;
  }
  .setting-header > .used-time>i{
    margin-right: 5px;
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

  .type-filter > span > .default {
    background: #fff;
  }

  .type-filter > span > .expert {
    border: 1px solid rgb(192, 229, 255);
    background: rgb(233, 246, 255);
  }

  .type-filter > span > .disease {
    border: 1px solid rgb(188, 241, 212);
    background: rgb(231, 250, 240);
  }

  .type-filter > span > .union {
    border: 1px solid rgb(254, 235, 195);
    background: rgb(255, 248, 234);
  }

  .type-filter > span > .VIP {
    border: 1px solid rgb(255, 204, 204);
    background: rgb(255, 237, 237);
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
    top:15px;
    right: 30px;
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
  .icon-group>i{
    margin-left: 15px;
    color: rgb(192,189,185);
  }
  .icon-group>i:hover{
    color: rgb(89,100,185);
  }
</style>
