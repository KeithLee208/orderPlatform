<template>
  <div class="setting-body">
    <div v-loading="loading" element-loading-text="拼命加载中" class="setting-main">
      <div class="page-head">
        <div class="type-filter">
          <span>服务类型</span>
          <span @click="allTyepList"><i class="el-icon-menu all"></i>全部</span>
          <span @click="listTypeChange(index,item)" v-for="(item,index) in serviceTypeList">
                <i @click="serviceTypeIndex = index" :class="[item.mzlx,{active:serviceTypeIndex==index}]"></i>
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
                <span v-if="item.ysmc!=='普通门诊'" class="position">主治医师</span>
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
                              <span>{{week.mzlx}}</span>
                            </p>
                            <p>
                              <span class="fixed-label">出诊时间：</span>
                              <span>{{slot.sjdmc}}{{week.kssj}}-{{week.jssj}}</span>
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
                        <div slot="reference" class="ordered" :class="[week.mzlx]">
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
    <!--出班调整-->
    <el-dialog title="出班调整" :visible.sync="shiftVisible" size="small">
      <div>
        <div class="now-num">已有32位患者预约</div>
        <div class="now-info">
          <div>
            <span class="tab-label">调整类型</span>
            <el-radio-group v-model="shiftForm.shiftType">
              <el-radio label="替诊">替诊</el-radio>
              <el-radio label="停诊">停诊</el-radio>
              <el-radio label="调班">调班</el-radio>
            </el-radio-group>
            <!--替诊-->
            <el-form v-if="shiftForm.shiftType == '替诊'" ref="form" :model="shiftForm.replaceForm" label-width="110px">
              <el-form-item label="当前医生">
                <span>{{selectWeek.ysmc}}/{{selectWeek.ksmc}}</span>
              </el-form-item>
              <div class="line"></div>
              <el-form-item label="替诊医生">
                <el-cascader
                  :model="shiftForm.replaceForm.doctor"
                  :options="departmentList"
                  @active-item-change="handleItemChange"
                  :props="props"
                  filterable
                ></el-cascader>
              </el-form-item>
              <el-form-item label="替诊原因">
                <el-input class="width-300" type="textarea" v-model="shiftForm.replaceForm.desc"></el-input>
              </el-form-item>
            </el-form>
            <!--停诊-->
            <el-form v-if="shiftForm.shiftType == '停诊'" ref="form" :model="shiftForm.stopForm" label-width="110px">
              <el-form-item label="停诊原因">
                <el-input class="width-300" type="textarea" v-model="shiftForm.stopForm.desc"></el-input>
              </el-form-item>
            </el-form>
            <!--调班-->
            <el-form v-if="shiftForm.shiftType == '调班'" ref="form" :model="shiftForm.adjustForm" label-width="110px">
              <el-form-item label="医生/科室">
                <span>{{selectWeek.ysmc}}/{{selectWeek.ksmc}}</span>
              </el-form-item>
              <el-form-item label="预约时间">
                <span>2015/05/01</span>
              </el-form-item>
              <div class="change-icon">
                <i class="icon iconfont icon-duihuan"></i>
              </div>
              <el-form-item label="调班医生">
                <el-cascader
                  :options="departmentList"
                  @active-item-change="handleItemChange"
                  :props="props"
                ></el-cascader>
              </el-form-item>
              <el-form-item label="调班时间">
                <el-date-picker
                  class="width-300"
                  v-model="shiftForm.adjustForm.date"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
              <div class="line"></div>
              <el-form-item label="调班原因">
                <el-input class="width-300" type="textarea" v-model="shiftForm.adjustForm.desc"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
      <el-button>恢复到最初排班</el-button>
      <el-button @click="shiftVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSaveClick()">确 定</el-button>
    </span>
    </el-dialog>
    <!--记录调整-->
    <el-dialog title="调整记录" :visible.sync="recordVisible" size="small">
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
                <el-button @click="recordVisible = false">取 消</el-button>
                <el-button type="primary" @click="recordVisible = false">确定</el-button>
              </span>
    </el-dialog>
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
        allTypeList:[],//服务类型列表
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },//日期控制
        loading: false,//loading状态控制
        timeSlot: [],//时间段列表
        departmentList: [],//科室列表
        props: {
          label:'label',
          value:'value',
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
            let _list = arr.classifyArr(this.filterList, 'ysdm');
            let _timeSlot = this.formatTimeSlot(this.timeSlot,this.moduleTimeListSelect);
            this.filterListFormatTable = this.formatData(_list,_timeSlot);
          }
        }
    },
    methods: {
      init(){
        //获取今天日期
        this.getDateNow();
        //获取服务类型
        this.getServiceList();
        //获取时间段列表
        this.getTimeSlot();
        //获取出班时间
        this.getmModuleTime();
        //获取出报表数据
        this.getTableList();
        //获取科室列表
        this.getDepartmentList();
      },
      //获取服务类型
      getServiceList(){
        this.serviceTypeList = this.$store.state.scheduling.serviceTypeList;
        this.serviceTypeList.map(item => {
          item.number = Math.floor(Math.random() * 100)
        });
      },
      //获取科室列表
      getDepartmentList(){
        this.departmentList = this.$store.state.scheduling.departmentList;
        this.departmentList.map(item => {
          item.label = item.ksmc;
          item.value = item.kstybm;
          this.$set(item, 'doctorList', []);
        });
      },
      //获取统计接口
      setServieNumber(data){
        let fwlxtj = data;
        console.log('fwlxtj',fwlxtj);
        this.serviceTypeList.map(item => {
          item.number = fwlxtj.filter(tItem => tItem.fwlxdm == item.fwlxdm).length;
        })
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
        weekArr = weekArr.map((item,index) => ({
          date:time.timeFormat(new Date(startTime + 1000*60*60*24*index)),
          week:"星期" + "日一二三四五六".charAt(item)
        }));
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
        console.log('time',this.$store.state.scheduling.workTableTime.startTime,this.$store.state.scheduling.workTableTime.endTime)
        this.$wnhttp("PAT.WEB.APPOINTMENT.SCHEDULE.Q09", {
          ksrq: this.dateFormat(new Date(this.$store.state.scheduling.workTableTime.startTime)),
          ksdmList: [this.$store.state.login.userInfo.ksdm],
          jsrq: this.dateFormat(new Date(this.$store.state.scheduling.workTableTime.endTime))}).then(data => {
          this.list = data;
          this.setServieNumber(data);
          let _list = arr.classifyArr(this.filterList, 'ysdm');
          let _timeSlot = this.formatTimeSlot(this.timeSlot,this.moduleTimeListSelect);
          this.filterListFormatTable = this.formatData(_list,_timeSlot);
          this.allTypeList=arr.clone(this.filterListFormatTable);
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
        let day=1000*60*60*24;
        switch (daynow){
          case 1:
            startTime=datenow;
            endTime=datenow+day*6;
            break;
          case 2:
            startTime=datenow-day*1;
            endTime=datenow+day*5;
            break;
          case 3:
            startTime=datenow-day*2;
            endTime=datenow+day*4;
            break;
          case 4:
            startTime=datenow-day*3;
            endTime=datenow+day*3;
            break;
          case 5:
            startTime=datenow-day*4;
            endTime=datenow+day*2;
            break;
          case 6:
            startTime=datenow-day*5;
            endTime=datenow+day*1;
            break;
          case 0:
            startTime=datenow-day*6;
            endTime=datenow;
            break;
        }
        this.$store.commit('scheduling/SET_DATETIMENOW', {
          startTime:startTime,
          endTime:endTime
        });
      },
      formatTimeSlot(timeSlot,moduleTimeListSelect){
        let _timeSlot = arr.clone(timeSlot);
        let _moduleTimeListSelect = arr.clone(moduleTimeListSelect);
        _timeSlot.map(slot => {
          slot.weekday = [
            {cbrqlx:_moduleTimeListSelect[0].week,sjddm:slot.sjddm,cbrq:_moduleTimeListSelect[0].date},
            {cbrqlx:_moduleTimeListSelect[1].week,sjddm:slot.sjddm,cbrq:_moduleTimeListSelect[1].date},
            {cbrqlx:_moduleTimeListSelect[2].week,sjddm:slot.sjddm,cbrq:_moduleTimeListSelect[2].date},
            {cbrqlx:_moduleTimeListSelect[3].week,sjddm:slot.sjddm,cbrq:_moduleTimeListSelect[3].date},
            {cbrqlx:_moduleTimeListSelect[4].week,sjddm:slot.sjddm,cbrq:_moduleTimeListSelect[4].date},
            {cbrqlx:_moduleTimeListSelect[5].week,sjddm:slot.sjddm,cbrq:_moduleTimeListSelect[5].date},
            {cbrqlx:_moduleTimeListSelect[6].week,sjddm:slot.sjddm,cbrq:_moduleTimeListSelect[6].date}
          ];
        });
        return _timeSlot;
      },
      //数据处理
      formatData(list,timeSlot){
        //医生→时间段→日期
        let newArr = list;
        let normalTypeData = [{
          ysmc:"普通门诊",
          name:"",
          slot:arr.clone(timeSlot)
        }];
        let flag = true;
        if(!newArr.length){
          return normalTypeData;
        }
        newArr.map(item => {
          if(!item.name) flag = false;
          item.slot = arr.clone(timeSlot);
          item.slot.map(slot => {
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
        if(flag) {
          newArr = normalTypeData.concat(newArr);
        }
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
      handleItemChange(value){
        console.log('Orz',value);
        this.getDoctorList(value).then(data => {
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
      getDoctorList(value){
        return new Promise((resolve, reject) => {
          this.$wnhttp("PAT.WEB.APPOINTMENT.BASEINFO.Q04", {
            kstybm: value.join(),
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
        this.serviceTypeIndex=-1;//还原服务类型筛选
        this.getmModuleTime();//设置新的开始结束时间
        this.getTableList();//请求出班表数据
      },
      pageright(){
        this.$store.commit('scheduling/SET_DATETIMENOW', {
          startTime:this.$store.state.scheduling.workTableTime.startTime+1000*60*60*24*7,
          endTime:this.$store.state.scheduling.workTableTime.endTime+1000*60*60*24*7
        });
        this.serviceTypeIndex=-1;//还原服务类型筛选
        this.getmModuleTime();//设置新的开始结束时间
        this.getTableList();//请求出班表数据
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
        let params = {
          mxxh: this.selectWeek.mxxh,
          tzyy: this.shiftForm.stopForm.desc
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
      },
      //点击服务类型（全部）时展示全部数据
      allTyepList(){
        this.checkLIstActive='';
        this.serviceTypeIndex=-1;//还原服务类型筛选
        this.filterListFormatTable=this.allTypeList;
      },
      //服务类型筛选
      listTypeChange(index,item){
        this.checkLIstActive=index;
        let newArr=[];
        newArr=arr.clone(this.allTypeList);
        for(let i=0;i<newArr.length;i++){
          for(let x=0;x<newArr[i].slot.length;x++){
            for(let y=0;y<newArr[i].slot[x].weekday.length;y++){
              if(item.fwlxdm!==newArr[i].slot[x].weekday[y].fwlxdm){
                newArr[i].slot[x].weekday[y]={};
              }
            }
          }
        }
        this.filterListFormatTable=[];
        this.filterListFormatTable=newArr;
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
  .type-filter > span > .ZB {
    border: 1px solid #bcf1d4;
    background: #e7faf0;
  }
  .type-filter > span > .ZB.active {
    background: #bcf1d4;
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
    cursor: default;
  }

  .ordered > p {
    height: 20px;
    line-height: 20px;
  }

  /*default,expert,disease,union,VIP*/
  .ordered.PT {
    background: rgb(185, 185, 185);
    color: #fff;
  }
  .ordered.ZJ {
    color: rgb(32, 160, 255);
    background: rgb(192, 229, 255);
  }
  .ordered.ZB {
    color: rgb(12, 175, 148);
    background: rgb(231, 250, 240);
  }
  .ordered.LH {
    color: rgb(232, 166, 35);
    background: rgb(255, 248, 234);
  }
  .ordered.TX {
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
