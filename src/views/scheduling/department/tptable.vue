<template>
  <div class="setting-wraaper">
    <div class="setting-header">
      <div class="pull-right">
        <div class="top-search pull-left">
          <input class="top-searchinput pull-left" placeholder="搜索院区／科室／医生">
          <i class="iconfont icon-sousuo"></i>
        </div>
          <i @click="$router.go(-1)" class="el-icon-close"></i>
      </div>
      <span>{{mbmc}}</span>
    </div>
    <div class="setting-body" v-loading="loading" element-loading-text="拼命加载中">
      <div class="setting-main">
        <div>
          <div class="page-head">
            <div v-if="templateData!=''" class="type-filter">
              <span>服务类型</span>
              <span @click="allTyepList"><i class="el-icon-menu all"></i>全部</span>
              <span @click="listTypeChange(index,item)" v-for="(item,index) in serviceTypeList">
                <i :class="[item.mzlx,{active:checkLIstActive==index}]"></i>{{item.fwlxmc}}（{{item.number}}）
              </span>
            </div>
            <span class="pull-right">
                <!--<el-button @click="SubmitVisible = true" type="primary" size="small">提交</el-button>-->
                <span class="icon-group">
                  <el-tooltip class="item" effect="dark"
                              content="设置出班模板" placement="bottom">
                      <router-link tag="span"  to="/scheduling/department/tpset">
                         <i @click="handleSetClick" class="icon iconfont icon iconfont icon-shezhi_"></i>
                       </router-link>
                  </el-tooltip>
                </span>
              </span>
          </div>
          <div v-if="templateData!=''" class="page-body">
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
                    <span v-if="item.ysmc!==''" class="name">{{item.ysmc}}</span>
                    <span v-if="item.ysmc!=='普通门诊'" class="position">主治医师</span>
                  </p>
                </div>
              </div>
              <div class="AdTableRight">
                <div class="table-body">
                  <div  v-for="(slot,index) in item.slot" :class="[index ===0 ? 'border-top-1':'']">
                    <span>{{slot.sjdmc}}</span>
                  <span v-for="week in slot.weekday" key="week.zbxh">
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
                            <span>
                                  <span @click="selectDoc(week)">查看详情</span>
                            </span>
                        </div>
                      </div>
                      <div slot="reference" class="ordered" :class="[week.mzlx]">
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
          <div v-if="templateData==''" class="no-data">
            暂无出班模板数据，请添加模板信息。
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
        serviceTypeList: [],//服务类型列表
        timeSlot: [],//时间段列表
        templateData: [],//排版模板数据
        checkList:[],//已选科室列表
        checkLIstActive:0,//已选科室列表点击active
        allTypeList:[],
        test:1
      };
    },
    props:{
      mbmc:{
          type:String,
          required:true
      },
      mbdm:{
        type:String,
        required:true
      }
    },
    created(){
      this.$nextTick(() => {
        this.init();
      })
    },
    methods: {
      init(){
        this.$store.dispatch('scheduling/getAllDicData',{yydm:this.$store.state.login.userInfo.yydm}).then(() => {
          this.getServiceType();
          this.getTimeSlot();
          this.getCheckList();
          this.dataInit();
        })
      },
      //获取服务类型
      getServiceType(){
        this.serviceTypeList = this.$store.state.scheduling.serviceTypeList;
      },
      //获取统计接口
      setServieNumber(data){
        let fwlxtj = data;
        this.serviceTypeList.map(item => {
            item.number = fwlxtj.filter(tItem => tItem.fwlxdm == item.fwlxdm).length;
        })
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
      dataInit(){
        this.$wnhttp("PAT.WEB.APPOINTMENT.SCHEDULE.Q02", {
          ksdm: this.$store.state.login.userInfo.ksdm,
          mbdm: this.mbdm
        }).then(data => {
          if(data=='')this.loading = false;
          else {
            this.TpCard = data;
            this.setServieNumber(data);
            this.templateData = this.formatData(arr.classifyArr(data, 'ysdm'));
            this.loading = false;
            this.allTypeList=arr.clone(this.templateData);
          }
      }).catch(err => {
          console.log(err);
        });
      },
      //服务类型筛选
      listTypeChange(index,item){
        this.checkLIstActive=index;
        let newArr = [];
        newArr = arr.clone(this.allTypeList);
        for(let i=0;i<newArr.length;i++){
          for(let x=0;x<newArr[i].slot.length;x++){
            for(let y=0;y<newArr[i].slot[x].weekday.length;y++){
              if(item.fwlxdm!==newArr[i].slot[x].weekday[y].fwlxdm){
                  newArr[i].slot[x].weekday[y]={};
                }
            }
          }
        }
        this.templateData=[];
        this.templateData=newArr;
      },
      //点击服务类型（全部）时展示全部数据
      allTyepList(){
        this.checkLIstActive='';
        this.templateData=this.allTypeList;
      },
      //数据处理
      formatData(list){
        //医生→时间段→日期
        let newArr = arr.clone(list);
        let timeSlot = arr.clone(this.timeSlot);
        timeSlot.map(slot => {
          slot.weekday = [
            {cbrqlx:['星期一'],sjddm:[slot.sjddm]},
            {cbrqlx:['星期二'],sjddm:[slot.sjddm]},
            {cbrqlx:['星期三'],sjddm:[slot.sjddm]},
            {cbrqlx:['星期四'],sjddm:[slot.sjddm]},
            {cbrqlx:['星期五'],sjddm:[slot.sjddm]},
            {cbrqlx:['星期六'],sjddm:[slot.sjddm]},
            {cbrqlx:['星期日'],sjddm:[slot.sjddm]}
          ];
        });
        newArr.map(item => {
          item.slot = arr.clone(timeSlot);
          item.slot.map(slot => {
            let weekTemp = item.children.filter(child => child.sjddm == slot.sjddm && child.ysdm == item.name);
            weekTemp.map(week => {
              item.ysmc = week.ysmc;
              switch (week.cbrqlx) {
                case '星期一':
                  Object.assign(slot.weekday[0],week);
                  break;
                case '星期二':
                  Object.assign(slot.weekday[1],week);
                  break;
                case '星期三':
                  Object.assign(slot.weekday[2],week);
                  break;
                case '星期四':
                  Object.assign(slot.weekday[3],week);
                  break;
                case '星期五':
                  Object.assign(slot.weekday[4],week);
                  break;
                case '星期六':
                  Object.assign(slot.weekday[5],week);
                  break;
                case '星期日':
                  Object.assign(slot.weekday[6],week);
                  break;
              }
            })
          })
        });
        return newArr;
      },
      //选择医生进入排班设置页
      selectDoc(item){
        this.$store.commit('scheduling/SET_CURRENTSCHEDULING', item);
        this.$router.push({name:'dTempalteSet', params: {mbmc:this.mbmc,mbdm:this.mbdm}});
      },
      //点击设置按钮进入设置页，默认请求获取当前科室普通排班
      handleSetClick(){
        this.$store.commit('scheduling/SET_CURRENTSCHEDULING', {
            ysdm:'',
            mbdm:this.$store.state.scheduling.currentsSelectTemplate.mbdm,
            ksdm:this.$store.state.login.userInfo.ksdm
        });
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
  /*.AdTable:hover{*/
    /*box-shadow: 0 0 15px rgba(63,81,181, 0.5);*/
  /*}*/
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
    display: inline-block;
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
.no-data{
  width: 100%;
  height:500px;
  line-height: 500px;
  font-size: 24px;
  color: #999;
  text-align: center;
  vertical-align: middle;
}
</style>
