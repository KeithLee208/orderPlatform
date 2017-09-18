<template>
  <div class="setting-body">
    <div v-loading="loading" element-loading-text="拼命加载中" class="setting-main">
      <div class="page-head">
        <div class="type-filter">
          <span>服务类型</span>
          <span v-for="(item,index) in serviceTypeList">
                <i @click="serviceTypeIndex = index" :class="[item.fwlxdm,{active:serviceTypeIndex==index}]"></i>
                {{item.fwlxmc}}（{{item.number}}）
          </span>

          <span class="pull-right">
                <span class="icon-group">
                  <el-tooltip class="item" effect="dark" content="导出" placement="bottom">
                     <i @click="exportVisible = true" class="icon iconfont icon-daochu"></i>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="打印" placement="bottom">
                    <i @click="printVisible = true" class="icon iconfont icon-dayin"></i>
                  </el-tooltip>
                </span>
          </span>
        </div>
      </div>
      <div class="page-body">
        <div class="table-time">
          <div  class="btn-left" @click="pageleft">
            <i class="icon iconfont icon-xiangzuo"></i>
          </div>
          <div class="btn-right" @click="pageright">
            <i class="icon iconfont icon-xiangzuo"></i>
          </div>
          <span></span>
          <span v-for="item in moduleTimeListSelect">
            <p class="day">{{item.week}}</p>
            <p class="date">{{item.date}}</p>
          </span>
        </div>
        <div v-for="item in filterListFormatTable" class="adtable">
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
                      <el-popover :open-delay="500" v-if="week.fwlxdm" placement="bottom" width="200" trigger="hover">
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
                              <span>{{slot.sjdmc}}{{week.kssj | timeFormat}}-{{week.jssj | timeFormat}}</span>
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
                            <el-button @click="handleTableAdjust(week)" type="text" size="small"
                                       class="el-button ">出班调整</el-button>
                            <el-button @click="recordVisible=true" type="text" size="small"
                                       class="el-button pull-right">调整记录</el-button>
                          </div>
                        </div>
                        <div slot="reference" class="ordered disease">
                          <p>{{week.kssj}}-{{week.jssj}}</p>
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
    <!--打印-->
    <el-dialog title="打印出班表" :visible.sync="printVisible" size="tiny">
              <span>
              <p>起始时间：
                <el-date-picker type="date" placeholder="选择日期" size="small" :picker-options="pickerOptions0">
                </el-date-picker>
              </p>
              <p>截止日期：
                <el-date-picker type="date" placeholder="选择日期" size="small">
                </el-date-picker>
              </p>
            </span>
      <span slot="footer" class="dialog-footer">
                <el-button @click="printVisible = false">取 消</el-button>
                <el-button type="primary" @click="printVisible = false">打 印</el-button>
              </span>
    </el-dialog>
    <!--导出-->
    <el-dialog title="导出为Excel" :visible.sync="exportVisible" size="tiny">
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
                <el-button @click="exportVisible = false">取 消</el-button>
                <el-button type="primary" @click="exportVisible = false">导 出</el-button>
              </span>
    </el-dialog>
  </div>
</template>

<script>
  import * as arr from 'filters/array.js'
  import * as time from 'filters/time.js'
  export default {
    data(){
      return {
        serviceTypeList: [],//服务类型列表
        serviceTypeIndex: -1,//当前所选服务
        exportVisible: false,//导出弹窗控制
        printVisible: false,//打印弹窗控制
        shiftVisible: false,//出班调整弹窗控制
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },//日期控制
        loading: false,//loading状态控制
        timeSlot: [],//时间段列表
        departmentList: [],//科室列表
        props: {
          value: 'label',
          children: 'doctorList'
        },//科室级联
        moduleTimeList:[],//出班日期列表
        moduleTimeListPage:0,//出班日期当前所选页
        startTime:'',
        endTime:'',
        list:[],//出班列表
        filterListFormatTable:[],//过滤出班列表表格形式
        tableList: [],//出班列表表格形式
        selectWeek: {},//当前所选单次排班
        shiftForm: {
          shiftType: '替诊',
          replaceForm: {
            doctor: '',
            desc: ''
          },
          stopForm: {
            date: '',
            desc: ''
          },
          adjustForm: {
            doctorList: [],
            date: '',
            desc: ''
          }
        },//出班调整表单
        recordVisible: false,//调整记录弹窗控制
        loading: true//loading状态
      };
    },
    created(){
      this.$nextTick(() => {

        this.init();
      });
    },
    computed:{
      moduleTimeListSelect(){
        return this.moduleTimeList.slice(7*this.moduleTimeListPage,7*(this.moduleTimeListPage+1));
      },
      filterList(){
          if(!this.fwlxdm)return this.list;
          return this.list.filter(item => item.fwlxdm == this.fwlxdm)
      }
    },
    watch:{
      moduleTimeListPage:
        {
          handler(curVal){
            //初始化表格双栏设置
            this.filterListFormatTable = this.formatData(arr.classifyArr(this.filterList, 'ysdm'));
          }
        }
    },
    methods: {
      init(){
        //获取服务类型
        this.getServiceList();
        //获取时间段列表
        this.getTimeSlot();
        //获取出班时间
        this.getmModuleTime();
        //获取出报表数据
        this.getTableList();
        //获取今天日期
        this.getDateNow();
      },
      //获取服务类型
      getServiceList(){
        this.serviceTypeList = this.$store.state.scheduling.serviceTypeList;
        this.serviceTypeList.map(item => {
          item.number = Math.floor(Math.random() * 100)
        });
      },
      //获取时间段列表
      getTimeSlot(){
        this.timeSlot = this.$store.state.scheduling.timeSlotList;
      },
      //获取出班时间
      getmModuleTime(){
        let startTime=this.$store.state.scheduling.workTableTime.startTime;
        let endTime=this.$store.state.scheduling.workTableTime.endTime;
//        let startTime = new Date(Date.parse('2017-09-01'.replace(/-/g,   "/"))).getTime();
//        let endTime = new Date(Date.parse('2017-09-30'.replace(/-/g,   "/"))).getTime();
        let weekArr = [];
        for(let i = 0;i<=6;i++)weekArr.push(new Date(startTime + 1000*60*60*24*i).getDay());
//
//        startTime = startTime - 1000*60*60*24*(weekArr[0] - 1);
//        endTime = endTime + 1000*60*60*24*(7-weekArr[weekArr.length-1]);
//        weekArr = (Array.apply(null, {length: weekArr[0] - 1}))
//                  .concat(weekArr)
//                  .concat(Array.apply(null, {length: 7-weekArr[weekArr.length-1]})).map((v,j) => j%7);
        console.log('-n-',weekArr)
        weekArr = weekArr.map((item,index) => ({
                                date:time.timeFormat(new Date(startTime + 1000*60*60*24*index)),
                                week:"星期" + "一二三四五六日".charAt(item)
                              }));
        console.log('weekArr',weekArr);
        this.moduleTimeList =weekArr;
      },
      //时间转换
      dateFormat(date){
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
      },
      //获取出报表数据
      getTableList(){
        this.$wnhttp("PAT.WEB.APPOINTMENT.SCHEDULE.Q09", {
          ksrq: this.dateFormat(new Date(this.$store.state.scheduling.workTableTime.startTime)),
          ksdmList: ['20000000.23.23.2180'],
          jsrq: this.dateFormat(new Date(this.$store.state.scheduling.workTableTime.endTime))}).then(data => {
          this.list = data;
          if(this.list==''){
            this.filterListFormatTable=this.list;
          }
          else {
            this.filterListFormatTable = this.formatData(arr.classifyArr(this.filterList, 'ysdm'));
          }
          this.loading = false;
        }).catch(err => {
          console.log(err);
        });
      },
      //获取当前日期
      getDateNow(){
        let datenow=new Date(Date.now()).getTime();
        let daynow=new Date(datenow).getDay();
        let startTime='';
        let endTime='';
        switch (daynow){
          case 1:
            startTime=datenow;
            endTime=datenow+1000*60*60*24*6;
            break;
          case 2:
            startTime=datenow-1000*60*60*24*1;
            endTime=datenow+1000*60*60*24*5;
            break;
          case 3:
            startTime=datenow-1000*60*60*24*2;
            endTime=datenow+1000*60*60*24*4;
            break;
          case 4:
            startTime=datenow-1000*60*60*24*3;
            endTime=datenow+1000*60*60*24*3;
            break;
          case 5:
            startTime=datenow-1000*60*60*24*4;
            endTime=datenow+1000*60*60*24*2;
            break;
          case 6:
            startTime=datenow-1000*60*60*24*5;
            endTime=datenow+1000*60*60*24*1;
            break;
          case 0:
            startTime=datenow-1000*60*60*24*6;
            endTime=datenow;
            break;
        }
        this.$store.commit('scheduling/SET_DATETIMENOW', {
          startTime:startTime,
          endTime:endTime
        });
      },
      //数据处理
      formatData(list){
        //医生→时间段→日期
        let newArr = arr.clone(list);
        let timeSlot = arr.clone(this.timeSlot);
        newArr.map(item => {
          item.slot = arr.clone(timeSlot);
          item.slot.map(slot => {
            slot.weekday = [
              {cbrqlx:this.moduleTimeListSelect[0].week,sjddm:slot.sjddm,cbrq:this.moduleTimeListSelect[0].date},
              {cbrqlx:this.moduleTimeListSelect[1].week,sjddm:slot.sjddm,cbrq:this.moduleTimeListSelect[1].date},
              {cbrqlx:this.moduleTimeListSelect[2].week,sjddm:slot.sjddm,cbrq:this.moduleTimeListSelect[2].date},
              {cbrqlx:this.moduleTimeListSelect[3].week,sjddm:slot.sjddm,cbrq:this.moduleTimeListSelect[3].date},
              {cbrqlx:this.moduleTimeListSelect[4].week,sjddm:slot.sjddm,cbrq:this.moduleTimeListSelect[4].date},
              {cbrqlx:this.moduleTimeListSelect[5].week,sjddm:slot.sjddm,cbrq:this.moduleTimeListSelect[5].date},
              {cbrqlx:this.moduleTimeListSelect[6].week,sjddm:slot.sjddm,cbrq:this.moduleTimeListSelect[6].date}
            ];
            let weekTemp = item.children.filter(child => child.sjddm == slot.sjddm && child.ysdm == item.name);
            weekTemp.map(week => {
              item.ysmc = week.ysmc;
              if(week.sjddm != slot.sjddm)return;
              let _day = slot.weekday.filter(weekday => weekday.cbrq == week.cbrq).length ?
              slot.weekday.filter(weekday => weekday.cbrq == week.cbrq)[0]:{};
              Object.assign(_day,week);
            })
          })
        });
        return newArr;
      },
      //处理出班调整点击事件
      handleTableAdjust(item){
        this.shiftVisible = true;
        this.selectWeek = item;
      },
      //处理调整记录点击事件
      handleRecordAdjust(){

      },
      //处理科室医生级联
      handleItemChange(item){
        console.log(item);
        this.getDoctorList().then(data => {
          console.log('医生列表 %o', data);
          data.map(item => {
            item.label = item.zcmc;
          });
          this.departmentList.map(item => {
            item.label = item.ksmc;
            item.doctorList = data;
          });
        })
      },
      //科室获取医生列表
      getDoctorList(){
        return new Promise((resolve, reject) => {
          this.$wnhttp("PAT.WEB.APPOINTMENT.BASEINFO.Q04", {
            kstybm: '20000000.1.1.0320',
            yydm:this.$store.state.login.userInfo.yydm
          }).then(data => {
            resolve(data);
          }).catch(err => {
            console.log(err);
          });
        })
      },
      pageleft(){
        this.$store.commit('scheduling/SET_DATETIMENOW', {
          startTime:this.$store.state.scheduling.workTableTime.startTime-1000*60*60*24*7,
          endTime:this.$store.state.scheduling.workTableTime.endTime-1000*60*60*24*7
        });
        console.log(this.dateFormat(new Date(this.$store.state.scheduling.workTableTime.startTime)));
       this.getmModuleTime();
       this.getTableList();
      },
      pageright(){
        this.$store.commit('scheduling/SET_DATETIMENOW', {
          startTime:this.$store.state.scheduling.workTableTime.startTime+1000*60*60*24*7,
          endTime:this.$store.state.scheduling.workTableTime.endTime+1000*60*60*24*7
        });
        this.getmModuleTime();
        this.getTableList();
      },
      //出班调整-保存分类别：替诊、停诊、调班
      handleSaveClick(){
        if (this.shiftForm.shiftType == '替诊') {
          this.saveReplace();
        } else if (this.shiftForm.shiftType == '停诊') {
          this.saveStop();
        } else if (this.shiftForm.shiftType == '调班') {
          this.saveAdjust();
        }
      },
      //替诊保存
      saveReplace(){
        console.log(this.shiftForm.replaceForm.doctor);
        let params = {
          ksdm: '',
          ksmc: '',
          mxxh: '',
          tzyy: '',
          ysdm: '',
          ysmc: ''
        };
        return new Promise((resolve, reject) => {
          this.$wnhttp("PAT.WEB.APPOINTMENT.SCHEDULE.S06", params).then(data => {
            resolve(data);
          }).catch(err => {
            reject(err);
            console.log(err);
          });
        })
      },
      //停诊保存
      saveStop(){
        console.log(this.shiftForm.stopForm);
        let params = {
          mxxh: '',
          tzsj: '',
          tzyy: ''
        };
        return new Promise((resolve, reject) => {
          this.$wnhttp("PAT.WEB.APPOINTMENT.SCHEDULE.S05", params).then(data => {
            resolve(data);
          }).catch(err => {
            reject(err);
            console.log(err);
          });
        })
      },
      //调班保存
      saveAdjust(){
        console.log(this.shiftForm.adjustForm);
        let params = {
          mxxh1: '',
          mxxh2: '',
          tbyy: ''
        };
        return new Promise((resolve, reject) => {
          this.$wnhttp("PAT.WEB.APPOINTMENT.SCHEDULE.S07", params).then(data => {
            resolve(data);
          }).catch(err => {
            reject(err);
            console.log(err);
          });
        })
      }
    },
    filters: {
      timeFormat: function (time) {
        if (!time)return;
        return time.split(' ')[1]
      },
    }
  }
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

  .type-filter > span > .all.active {
    color: #a0a0a0;
  }

  .type-filter > span > .PT {
    border: 1px solid #e0e0e0;
    background: #fff;
  }

  .type-filter > span > .PT.active {
    background: #e0e0e0;
  }

  .type-filter > span > .ZJ {
    border: 1px solid rgb(192, 229, 255);
    background: rgb(233, 246, 255);
  }

  .type-filter > span > .ZJ.active {
    background: rgb(192, 229, 255);
  }

  .type-filter > span > .disease {
    border: 1px solid rgb(188, 241, 212);
    background: rgb(231, 250, 240);
  }

  .type-filter > span > .disease.active {
    background: rgb(188, 241, 212);
  }

  .type-filter > span > .LH {
    border: 1px solid rgb(254, 235, 195);
    background: rgb(255, 248, 234);
  }

  .type-filter > span > .LH.active {
    background: rgb(254, 235, 195);
  }

  .type-filter > span > .TX {
    border: 1px solid rgb(255, 204, 204);
    background: rgb(255, 237, 237);
  }

  .type-filter > span > .TX.active {
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

  .icon-group > i {
    margin-left: 15px;
    color: rgb(192, 189, 185);
  }

  .icon-group > i:hover {
    color: rgb(89, 100, 185);
  }

  .page-body {
    height: calc(90vh - 300px);
  }

  .table-time {
    display: inline-block;
    width: 100%;
    padding-left: 170px;
    box-sizing: border-box;
    position: relative;
  }

  .table-time>.btn-left,
  .table-time>.btn-right {
    position: absolute;
    width: 25px;
    height: 25px;
    top: 25px;
    cursor: pointer;
  }

  .table-time>.btn-left {
    left: 160px;
  }

  .table-time>.btn-right {
    right: -10px;
  }

  .table-time > span {
    width: 12.5%;
    height: 45px;
    line-height: 45px;
    float: left;
    font-size: 14px;
    text-align: center;
    box-sizing: border-box;
  }
  .table-time > span>p{
    height: 23px;
    line-height: 23px;
  }
  .table-time > span>p.day{
    font-weight: bold;
  }
  .table-time > span>p.today{
    color: rgb(32, 160, 255);
  }
  .adtable > .AdTableLeft,
  .adtable > .AdTableRight {
    box-sizing: border-box;
    float: left;
  }

  .adtable > .AdTableLeft {
    width: 160px;
    height: 166px;
    position: absolute;
    left: 0;
  }

  .adtable > .AdTableRight {
    width: 100%;
    padding-left: 160px;
    box-sizing: border-box;
  }

  .table-body {
    width: 100%;
    display: inline-block;
    border-right: 1px solid #e0e0e0;
  }

  .adtable {
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

  .AdTableLeft > div > p > .name {
    font-size: 15px;
    font-weight: bold;
    color: #333;
  }

  .AdTableLeft > div > p > .position {
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

  .fixed-info {
    padding: 5px;
    color: #999;
  }

  .fixed-body {
    border-bottom: 1px dashed #e0e0e0;
    padding-bottom: 10px;
  }

  .fixed-body > p {
    width: 100%;
    display: inline-block;
  }

  .fixed-body > p > span {
    display: inline-block;
    float: left;
    width: 130px;
  }

  .fixed-body > p > span.fixed-label {
    width: 60px;
  }

  .fixed-title {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #333;
  }

  .fixed-footer {
    margin-top: 15px;
  }

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

  .now-num {
    position: absolute;
    top: 18px;
    right: 36px;
    color: rgb(255, 197, 61);
  }

  /******************************出班调整*******************************/
  .change-icon {
    text-align: center;
    float: left;
    width: 100%;
    position: relative;
    top: -15px;
  }

  .change-icon > i {
    font-size: 60px;
    color: rgb(62, 156, 255);
  }

  .tab-label {
    width: 110px;
    text-align: right;
    display: inline-block;
    font-size: 14px;
    padding: 0px 12px 20px 0;
    box-sizing: border-box;
  }

  /******************************出班调整*******************************/
  /******************************调整记录*******************************/
  .time-line {
    width: 100%;
    height: 100px;
    display: inline-block;
    position: relative;
    color: #999;
  }

  .time-line > .time-left {
    width: 150px;
    height: 100%;
    border-right: 1px solid #e0e0e0;
    line-height: 40px;
    text-align: center;
    position: absolute;
    left: 0;
    top: 0;
  }

  .time-line > .time-left > span {
    position: absolute;
    right: 20px;
    top: -15px;
  }

  .time-line > .time-right {
    box-sizing: border-box;
    padding-left: 170px;
    width: 100%;
    height: 100px;
    position: relative;
    top: -10px;
  }

  .time-right > div > p {
    height: 30px;
    line-height: 30px;
  }

  .time-right > div > .title, .time-left > span {
    color: #666;
  }

  .time-left > i {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #e0e0e0;
    position: absolute;
    top: -2px;
    right: -8px;
  }

  .time-left > i.active {
    background: #20a0ff;
  }

  /******************************调整记录*******************************/
</style>
