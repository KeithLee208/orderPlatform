<template>
<div class="setting-wraaper">
  <div class="setting-header">
    <router-link
      to="/scheduling/clinic/tptable" class="pull-right">
      <i class="el-icon-close"></i>
    </router-link>
    <span>设置出班信息</span>
  </div>
  <div class="set-body">
    <el-form  ref="form" :model="form" label-width="80px">
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
              <span class="position">{{currentDocSchedule.ysmc}}</span>
            </p>
          </div>
        </div>
        <div class="AdTableRight">
          <div class="table-body">
            <div v-for="(slot,index) in currentDocSchedule.slot"  :class="[index === 0 ? 'border-top-1':'']">
              <span>{{slot.sjdmc}}</span>
              <span v-for="week in slot.weekday">
                    <div v-if="week.cbrqlx" class="ordered disease" @click="getSingleSchedule()">
                      <p>{{week.kssj | timeFormat}}-{{week.jssj |timeFormat}}</p>
                      <p>{{week.ksmc}}</p>
                    </div>
              </span>
            </div>
          </div>
        </div>
      </div>
      <el-form-item label="服务类型">
        <div class="type-filter in-model">
          <span><i class="el-icon-menu all"></i>全部</span>
              <span v-for="(item,index) in form1.serviceType.list">
                <!--,{active:active==index}-->
                <i @click="selection(index)"  :class="[item.fwlxdm,{active:form1.serviceType.activeIndex==index}]"></i>
                {{item.fwlxmc}}
              </span>
        </div>
      </el-form-item>
      <el-form-item label="选择科室">
        <el-select style="width: 30%" @change="SelectInit" v-model="form1.department.val" multiple filterable placeholder="请选择">
          <el-option v-for="item in form1.department.list" :key="item.ksbm" :label="item.ksmc" :value="item.ksmc">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择医生">
        <el-select v-model="form1.doctor.val" :placeholder='form.Doctext'>
          <el-option v-for="item in form1.doctor.list" :key="item.zgbm" :label="item.zgxm" :value="item.zgxm"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择病种">
        <el-select v-model="form1.disease.val" placeholder="请选择病种">
          <el-option v-for="item in form1.disease.list" :key="item.zydm" :label="item.zymc" :value="item.zydm">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="就诊时间">
        <el-checkbox-group v-model="form1.visitTime.val">
          <el-checkbox v-for="item in form1.visitTime.list" :label="item.val" :value="item.val" name="time"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="出诊时间">
        <el-col :span="8">
          <el-radio-group v-model="form1.slot.val">
            <el-radio v-for="item in form1.slot.list" :label="item.sjdmc+item.kssj+'-'+item.jssj" :value="item.sjddm"></el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="10">
          <el-form-item label="时间段">
            <el-time-picker is-range v-model="form.Times" placeholder="选择时间范围">
            </el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="就诊地址">
        <el-input type="input" v-model="form1.address"></el-input>
      </el-form-item>
      <el-form-item label="备注信息">
        <el-input type="input" v-model="form1.note"></el-input>
      </el-form-item>
      <el-form-item >
        <el-button @click="TemSuccess" class="pull-right"  type="success">保存并继续</el-button>
      </el-form-item>
    </el-form>
    <div slot="footer"  class="dialog-footer">
      <el-button>取消</el-button>
      <el-button type="primary">保存</el-button>
      <el-button type="success" >保存并设置下一位</el-button>
    </div>
  </div>

</div>
</template>
<script>
  import * as listArray from '../../../filters/array'
  export default{
    data() {
      return {
        form1:{
          serviceType:{
            isShow:true,
            val:'',
            list:[],
            activeIndex:0
          },
          doctor:{
            isShow:true,
            isEdit:true,
            val:'',
            list:[]
          },
          disease:{
            isShow:true,
            isEdit:true,
            val:'',
            list:[]
          },
          department:{
            isShow:true,
            isEdit:true,
            val:[],
            list:[]
          },
          week:{
            isShow:true,
            isEdit:true,
            val:'',
            list:[]
          },
          visitTime:{
            isShow:true,
            isEdit:true,
            val:[],
            list:[
                {name:"周一",val:"星期一"},
                {name:"周二",val:"星期二"},
                {name:"周三",val:"星期三"},
                {name:"周四",val:"星期四"},
                {name:"周五",val:"星期五"},
                {name:"周六",val:"星期六"},
                {name:"周日",val:"星期日"}]
          },
          time:{
            isShow:true,
            isEdit:true,
            val:'',
            list:[]
          },
          slot:{
            isShow:true,
            isEdit:true,
            val:'',
            list:[]
          },
          address:'',
          note:''
        },
        form: {
          //服务类型
          Type: {
            active: 0,
            category: [
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
          //科室
          DepartOptions: [],
          DepartmentValue: '',
          //医生
          DocOptions: '',
          DocDisabled: true,
          Doctext: '请先选择科室',
          DocShow: false,
          DocValue: '',
          //专病
          Disease: [],
          DiseaseValue: '',
          DiseaseShow: false,
          //出诊时间
          radio: '1',
          radio2: '1',
          //出诊时间
          OutTimeValue: '',
          OutTime: [],
          //出诊时间
          VisitTime: [],
          //时间段
          Times: [new Date(2017, 1, 1, 0), new Date(2017, 1, 1, 23)],
          address: '',
          info: '',
          channel: '',
          Source: false,
          UnSource: false,
          CloseShow: false,
          Channel: false,
          UnChannel: false
        },
        currentDocSchedule:{},//当前所选医生出班时间表
        timeSlotList:[],//时间段列表
        templateData:[],//排版模板数据
      };
    },
    created() {
      this.$nextTick(() => {
        this.init();
      })
    },
    methods: {
      init(){
        this.DiseaseInit(); //专病病种
        this.OutTimeInit(); //出诊时间
        this.TpListInit();

        this.getDicData();//获取字典数据
        this.getDocScheduleInfo();//获取具体出班信息
      },
      //获取时间段列表
      getDicData(){
          this.form1.serviceType.list = this.$store.state.scheduling.serviceTypeList;
          this.form1.doctor.list = this.$store.state.scheduling.doctorList;
          this.form1.department.list = this.$store.state.scheduling.departmentList;
          this.form1.disease.list = this.$store.state.scheduling.specDiseaseList;
          this.form1.slot.list = this.$store.state.scheduling.timeSlotList;
      },
      //获取当前所选医生出班信息
      getDocScheduleInfo(){
        setTimeout( _ => {
          this.currentDocSchedule = this.$store.state.scheduling.currentDocSchedule;
        },0)
      },
      //获取单次出班信息
      getSingleSchedule(){
        this.$wnhttp("PAT.WEB.APPOINTMENT.SCHEDULE.Q03", { mxxh: '0001'}).then(data => {
            this.setForm(data);
        }).catch(err => {
          console.log(err);
        });
      },
      //表单填充策略
      setForm(data){
        this.form1.department.val.push(data.ksmc);
        this.form1.doctor.val = data.ysmc;
        this.form1.visitTime.val.push(data.cbrqlx);
        this.form1.address = data.czdz;
      },
      MsgSuccess() {
        this.SubmitVisible = false;
        this.$message({
          message: '提交成功！',
          type: 'success'
        });
      }, //提交消息提示
      TemSuccess() {
        this.$message({
          message: '成功！',
          type: 'success'
        });
      }, //保存消息提示
      selection(index) {
        this.form1.serviceType.activeIndex = index;
        this.form.DocShow = false;
        this.form.DiseaseShow = false;
        if (this.form.Type.category[index].text !== '普通') {
          this.form.DocShow = true;
        }
        if (this.form.Type.category[index].text == '专病') {
          this.form.DiseaseShow = true;
        }
      }, //服务类型筛选表单
      DiseaseInit() {
        this.$wnhttp("PAT.WEB.APPOINTMENT.BASEINFO.Q07", {
          kstybm: '20000000.1.1.0320'
        }).then(data => {
          this.form.Disease = data;
        let newArr = [];
        for (var i = 0; i < this.form.Disease.length; i++) {
          newArr.push({
            zydm: this.form.Disease[i].zydm,
            zymc: this.form.Disease[i].zymc
          });
        }
        this.form.Disease = newArr;
      }).catch(err => {
          console.log(err);
        //这里错误有2种错误
        //1. 服务端业务错误，错误码邮件中有
        //2. 网络错误，本地网络断开、超时等
      });
      }, //专病病种
      TpListInit() {
        this.$wnhttp("PAT.WEB.APPOINTMENT.BASEINFO.Q01", {
          kstybm: '20000000.1.1.0320'
        }).then(data => {
          let newArr = listArray.classifyArr(data, 'sjksbm');
        let selcetArr = [];
        this.attList = newArr;
        for (var i = 0; i < data.length; i++) {
          selcetArr.push({
            ksbm: data[i].ksbm,
            ksmc: data[i].ksmc
          });
        }
        this.form.DepartOptions = selcetArr;
      }).catch(err => {
          console.log(err);
        //这里错误有2种错误
        //1. 服务端业务错误，错误码邮件中有
        //2. 网络错误，本地网络断开、超时等
      });
      }, //科室列表
      SelectInit() {
        if (this.form.DepartmentValue != '') {
          this.form.DocDisabled = false;
          this.form.Doctext = '请选择对应科室的医生';
          this.$wnhttp("PAT.WEB.APPOINTMENT.BASEINFO.Q04", {
            kstybm: this.form.DepartmentValue
          }).then(data => {
            this.form.DocOptions = data;
        }).catch(err => {
            console.log(err);
          //这里错误有2种错误
          //1. 服务端业务错误，错误码邮件中有
          //2. 网络错误，本地网络断开、超时等
        });
        } else {
          this.form.DocValue = '';
          this.form.DocDisabled = true;
          this.form.Doctext = '请先选择科室';
        }

      }, //选择科室根据所选筛选医生
      OutTimeInit() {
        this.$wnhttp("PAT.WEB.APPOINTMENT.BASEINFO.Q06", {
          kstybm: '20000000.1.1.0320'
        }).then(data => {
          this.form.OutTime = data;
      }).catch(err => {
          console.log(err);
        //这里错误有2种错误
        //1. 服务端业务错误，错误码邮件中有
        //2. 网络错误，本地网络断开、超时等
      });
      } //出诊时间
    },
    filters: {
      timeFormat: function (time) {
        if(!time)return;
        return time.split(' ')[1]
      },
    },
  }
</script>

<style scoped>
  .setting-wraaper {
    position: absolute;
    display: inline-block;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 940px;
    background: #fff;
  }
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
  .set-body{
    padding: 20px;
  }
  .setting-header>span{
    font-size: 16px;
  }
  .setting-header > a > i{
    color: #fff;
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
  .dialog-footer{
    text-align: right;
  }
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
</style>

