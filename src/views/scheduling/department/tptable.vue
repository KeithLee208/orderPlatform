<template>
  <div class="setting-wraaper">
    <div class="setting-header">
      <div class="pull-right">
        <div class="top-search pull-left">
          <input class="top-searchinput pull-left" placeholder="搜索院区／科室／医生">
          <i class="iconfont icon-sousuo"></i>
        </div>
        <router-link
          :to="'/scheduling/department/templateList'">
          <i class="el-icon-close"></i>
        </router-link>
      </div>
      <span v-for="(item,index) in crumbs">{{item}}<span v-if="index != crumbs.length-1"> / </span></span>
      <span class="used-time"> <i class="el-icon-time"></i>使用时间：2017/03/02-2017/05/02</span>
    </div>
    <div class="setting-body" v-loading="loading" element-loading-text="拼命加载中">
      <div class="setting-main">
        <div>
          <div class="page-head">
            <div class="type-filter">
              <span>服务类型</span>
              <span><i class="el-icon-menu all"></i>全部</span>
              <span v-for="(item,index) in serviceTypeList">
                <i :class="[item.mzlx]"></i>{{item.fwlxmc}}（{{item.sfxm.length}}）
              </span>
               <span class="pull-right">
                <!--<el-button @click="SubmitVisible = true" type="primary" size="small">提交</el-button>-->
                <span class="icon-group">
                  <el-tooltip class="item" effect="dark"
                              content="设置出班模板" placement="bottom">
                      <router-link tag="span"  to="/scheduling/department/tpset">
                     <i  class="icon iconfont icon iconfont icon-shezhi_"></i>
                           </router-link>
                  </el-tooltip>
                </span>
              </span>
            </div>
          </div>
          <div class="page-body">
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
                  <div  v-for="(slot,index) in item.slot" :class="[index ===0 ? 'border-top-1':'']">
                    <span>{{slot.sjdmc}}</span>
                  <span v-for="week in slot.weekday" key="week.zbxh">
                    <el-popover :open-delay="500" v-if="week.cbrqlx" placement="bottom" width="200" trigger="hover">
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
                           <p>
                            <span class="fixed-label">医生名称：</span>
                            <span>{{week.ysmc}}</span>
                          </p>
                        </div>
                        <div class="fixed-footer">
                            <router-link tag="span" to="/scheduling/department/tpset">
                          <span @click="selectDoc(week)">查看详情</span>
                            </router-link>
                        </div>
                      </div>
                      <div slot="reference" class="ordered" :class="[week.fwlxdm]">
                        <p>{{week.kssj }}-{{week.jssj}}</p>
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
  </div>
</template>

<script>
  import * as arr from 'filters/array.js'
  export default {
    data() {
      return {
        loading: true,
        crumbs: [],//面包屑数据
        serviceTypeList: [],//服务类型列表
        timeSlot: [],//时间段列表
        templateData: [],//排版模板数据
        checkList:[],//已选科室列表
        checkLIstActive:0//已选科室列表点击active
      };
    },
    created(){
      this.$nextTick(() => {
        setTimeout(_ => {
          this.init();
        },0);
    })
    },
    methods: {
      init(){
        //获取面包屑
        this.getCrumbs();
        //获取服务类型
        this.getServiceType();
        //获取时间段
        this.getTimeSlot();
        //获取已选科室列表
        this.getCheckList();
        this.ksdataInit();
      },
      //获取面包屑
      getCrumbs(){
        this.crumbs = this.$store.state.scheduling.crumbs.tptable;
      },
      //获取服务类型
      getServiceType(){
        this.serviceTypeList = this.$store.state.scheduling.serviceTypeList;
      },
      //获取时间段列表
      getTimeSlot(){
        this.timeSlot = this.$store.state.scheduling.timeSlotList;
      },
      //获取已选科室列表
      getCheckList(){
        this.checkList = this.$store.state.scheduling.curSelDepartList;
      },
      //科室数据初始化
      ksdataInit(){
        this.$wnhttp("PAT.WEB.APPOINTMENT.SCHEDULE.Q02", {
          ksdm: this.$store.state.login.userInfo.ksdm ,
          mbdm: this.$store.state.scheduling.mbdm ,
          yydm: this.$store.state.login.userInfo.yydm
        }).then(data => {
          if(data==''){
            this.loading = false;
          }
          else{
            this.TpCard = data;
            this.templateData = this.formatData(arr.classifyArr(data, 'ysdm'));
            console.log('分组的数据 %o',arr.classifyArr(data, 'ysdm'));
            console.log('处理的数据 %o',this.formatData(arr.classifyArr(data, 'ysdm')));
            this.loading = false;
          }

      }).catch(err => {
          console.log(err);
        });
      },
      //数据处理
      formatData(list){
        //医生→时间段→日期
        let newArr = [];
        list.map((item, index) => {
          newArr[index] = arr.clone(item);
          newArr[index].slot = [];
          this.timeSlot.map((slot) => {
            slot.weekday = [{}, {}, {}, {}, {}, {}, {}];
            item.children.map((week) => {
              newArr[index].ysmc = week.ysmc;
              if (week.sjddm === slot.sjddm && week.cbrqlx == '星期一') {
                slot.weekday.splice(0,1,arr.clone(week));
              }
              if (week.sjddm === slot.sjddm && week.cbrqlx == '星期二') {
                slot.weekday.splice(1,1,arr.clone(week));
              }
              if (week.sjddm === slot.sjddm && week.cbrqlx == '星期三') {
                slot.weekday.splice(2,1,arr.clone(week));
              }
              if (week.sjddm === slot.sjddm && week.cbrqlx == '星期四') {
                slot.weekday.splice(3,1,arr.clone(week));
              }
              if (week.sjddm === slot.sjddm && week.cbrqlx == '星期五') {
                slot.weekday.splice(4,1,arr.clone(week));
              }
              if (week.sjddm === slot.sjddm && week.cbrqlx == '星期六') {
                slot.weekday.splice(5,1,arr.clone(week));
              }
              if (week.sjddm === slot.sjddm && week.cbrqlx == '星期天') {
                slot.weekday.splice(6,1,arr.clone(week));
              }
            })
            newArr[index].slot.push(slot);
          });
      });
        return newArr;
      },
      //选择医生进入排班设置页
      selectDoc(item){
        this.$store.commit('scheduling/SET_CURRENTSCHEDULING', item)
      },
      MsgSuccess() {
        this.SettingVisible = false;
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
      },
      selection(index) {
        this.checkLIstActive = index;
        console.log(this.checkList[index].kstybm);
        this.$wnhttp("PAT.WEB.APPOINTMENT.SCHEDULE.Q02", {
          ksdm: this.checkList[index].kstybm,
          mbdm: this.$store.state.scheduling.mbdm || '001',
          yydm: this.$store.state.login.userInfo.yydm || '001',
        }).then(data => {
          if(data==''){
            this.$message('暂无数据');
            this.loading = true;
          }
          else{
            this.TpCard = data;
            this.templateData = this.formatData(arr.classifyArr(data, 'ysdm'));
            this.loading = false;
          }

        }).catch(err => {
          console.log(err);
        });

      },
      selectDel(index){
        if(this.checkList.length==1)
        {
          alert('已是最后一个科室');
          return
        }
        this.checkList.splice(index,1);
      },
      //门办设置出班模板，清空vuex的医生模板信息
      clearCurrentDocSchedule(){
        this.$store.commit('scheduling/SET_CURRENTSCHEDULING', {})
      }
    },
    filters: {
      timeFormat: function (time) {
        if (!time)return;
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
  .setting-header > div > a > i {
    font-size: 14px;
    color: #fff;
  }
  .setting-header > span {
    font-size: 16px;
  }
  .setting-header > .used-time {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.5);
    margin-left: 15px;
  }
  .setting-header > .used-time > i {
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
    /*min-height: 790px;*/
    display: inline-block;
    background: #fff;
    box-sizing: border-box;
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
  .AdTable {
    position: relative;
    padding: 10px;
    display: inline-block;
    width: 100%;
    transition:all .2s;
    box-shadow: 0 0 15px rgba(63,81,181, 0);
    cursor: pointer;
    box-sizing: border-box;
  }
  .AdTable:hover{
    box-shadow: 0 0 15px rgba(63,81,181, 0.5);
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
  .AdTableLeft > div {
    height: 166px;
    line-height: 166px;
  }
  .AdTableLeft > div > i {
    width: 60px;
    height: 60px;
    float: left;
    margin: 60px 0 0 10px;
    background: url("../../../../static/img/man.png") center center no-repeat;
  }
  .AdTableLeft > div > p {
    float: left;
    width: 90px;
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
  .type-filter > span > .PT {
    background: #fff;
  }
  .type-filter > span > .ZJ {
    border: 1px solid rgb(192, 229, 255);
    background: rgb(233, 246, 255);
  }
  .type-filter > span > .ZB {
    border: 1px solid rgb(188, 241, 212);
    background: rgb(231, 250, 240);
  }
  .type-filter > span > .LH {
    border: 1px solid rgb(254, 235, 195);
    background: rgb(255, 248, 234);
  }
  .type-filter > span > .TX {
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
  .setting-wraaper {
    position: absolute;
    display: inline-block;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 885px;
    background: #fff;
  }
  .fixed-info {
    padding: 5px;
    color: #999;
  }
  .fixed-body {
    padding-bottom: 10px;
    border-bottom: 1px dashed #e0e0e0;
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
    display: inline-block;
  }
  .fixed-footer>span>span{
    cursor: pointer;
    color:#50bfff;
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
  .icon-group > i {
    margin-left: 15px;
    color: rgb(192, 189, 185);
  }
  .icon-group > i:hover {
    color: rgb(89, 100, 185);
  }
  .top-search {
    margin: 10px 15px 0 0;
    position: relative;
  }
  .top-searchinput {
    width: 184px;
    height: 34px;
    background: rgb(84, 106, 199);
    margin: 3px 10px 0 0;
    border-radius: 2px;
    border: none;
    line-height: 34px;
    padding: 0 35px 0 10px;
    color: #fff;
    transition: box-shadow ease-in-out .25s;
  }
  .top-searchinput:focus {
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.4) !important;
    outline: 0;
  }
  .top-searchinput::-webkit-input-placeholder { /* WebKit browsers */
    color: #FFF;
    opacity: .5;
  }
  .top-searchinput:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #FFF;
    opacity: .5;
  }
  .top-searchinput::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #FFF;
    opacity: .5;
  }
  .top-searchinput:-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #FFF;
    opacity: .5;
  }
  .top-search > i {
    position: absolute;
    right: 20px;
    top: 5px;
    height: 30px;
    line-height: 30px;
    color: #fff;
    background: rgb(84, 106, 199);
    cursor: pointer;
  }
  .page-body {
    height: calc(90vh - 300px);
  }

</style>
