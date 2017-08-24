<template>
  <div class="setting-wraaper">
    <div class="setting-header">
      <router-link
        to="/scheduling/department/tptable" class="pull-right">
        <i class="el-icon-close"></i>
      </router-link>
      <span>设置出班信息</span>
    </div>
    <div v-loading="loading" element-loading-text="拼命加载中" class="set-body">
      <div class="box-title">
        <span>出班预览</span>
      </div>
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
                <span class="name">{{currentDocSchedule.ysmc}}</span>
                <span class="position">主治医师</span>
              </p>
            </div>
          </div>
          <div class="AdTableRight">
            <div class="table-body">
              <div v-for="(slot,indexI) in currentDocSchedule.slot"  :class="[indexI === 0 ? 'border-top-1':'']">
                <span>{{slot.sjdmc}}</span>
                <span v-for="(week,indexJ) in slot.weekday">
                    <span v-if="week.ysdm" class="ordered" :class="[week.mzlx,equalsArray(schedulingSelectIndex,[indexI,indexJ]) ? 'select':'']"  @click="getSingleSchedule(indexI,indexJ,week)">
                      <p>{{week.kssj}}-{{week.jssj}}</p>
                      <p>{{week.ksmc}}</p>
                      <i v-on:click.stop="delSchedule(week)" class="icon iconfont icon-shanchu"></i>
                    </span>
                    <span v-else class="ordered"
                          :class="[equalsArray(schedulingSelectIndex,[indexI,indexJ]) ? 'select':'']"
                          @click="setNewSchedule(indexI,indexJ)">
                    </span>
              </span>
              </div>
            </div>
          </div>
        </div>
        <div class="box-title">
          <span>编辑出班信息</span>
        </div>
        <el-form-item label="服务类型">
          <div class="type-filter in-model">
            <span><i class="el-icon-menu all"></i>全部</span>
            <span v-for="(item,index) in formOptions.serviceType.list">
                <!--,{active:active==index}-->
                <i @click="selection(index)"  :class="[item.mzlx,{active:formOptions.serviceType.activeIndex==index}]"></i>
                {{item.fwlxmc}}
              </span>
          </div>
        </el-form-item>
        <el-form-item label="选择科室">
          <el-select v-model="form.ksdm" filterable  placeholder="请选择" @change="handlerDepartChange">
            <el-option v-for="item in formOptions.department.list" :key="item.ksbm" :label="item.ksmc" :value="item.kstybm">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择医生">
          <el-select v-model="form.ysdm" filterable  :placeholder='form.ysdm'>
            <el-option v-for="item in formOptions.doctor.list" :label="item.zgxm" :value="item.zgtybm"></el-option>
          </el-select>
        </el-form-item>
        <!--<el-form-item label="选择病种">-->
        <!--<el-select v-model="form.disease" placeholder="请选择病种">-->
        <!--<el-option v-for="item in formOptions.disease.list" :key="item.zydm" :label="item.zymc" :value="item.zydm">-->
        <!--</el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item label="就诊时间">
          <el-checkbox-group v-model="form.cbrqlx">
            <el-checkbox v-for="item in formOptions.visitTime.list" :label="item.val" :value="item.val" name="time"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="出诊时间">
          <el-col :span="8">
            <el-checkbox-group v-model="form.sjddm">
              <el-checkbox v-for="item in formOptions.slotTime.list" :label="item.sjddm" :value="item.sjddm">{{item.kssj+'-'+item.jssj}}</el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-form-item>
        <el-form-item label="就诊地址">
          <el-input type="input" v-model="form.czdz"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer"  class="dialog-footer">
        <el-button>取消</el-button>
        <el-button type="primary" @click="save()">保存并继续</el-button>
      </div>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        size="tiny"
        :before-close="handleClose">
        <span>是否确认覆盖?</span>
        <span slot="footer" class="dialog-footer">
    <el-button @click="handleCancel">取 消</el-button>
    <el-button type="primary" @click="handleConfirm">确 定</el-button>
  </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import * as arr from '../../../filters/array'
  export default{
    data() {
      return {
        schedulingSelectIndex:[-1,-1],
        form:{
          cbrqlx: [],
          cbzt: 'ZC',
          czdz: '',
          czry: 'EMP.20000000.00',
          fscj: '',
          fwlxdm:'',
          ghfdm:'',
          hxzs:'',
          jssj:'',
          ksdm:'',
          ksmc:'',
          kssj:'',
          lrsj:'',
          mbdm:'',
          mxxh:'',
          sjddm:[],
          ysdm:'',
          ysmc:'',
          yxzt:'',
          zbxh:'',
          zlfdm:''
        },
        formOptions:{
          serviceType:{
            isShow:true,
            list:[],
            activeIndex:0
          },
          doctor:{
            isShow:true,
            isEdit:true,
            list:[]
          },
          disease:{
            isShow:true,
            isEdit:true,
            list:[]
          },
          department:{
            isShow:true,
            isEdit:true,
            list:[]
          },
          week:{
            isShow:true,
            isEdit:true,
            list:[]
          },
          visitTime:{
            isShow:true,
            isEdit:true,
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
            list:[]
          },
          slotTime:{
            isShow:true,
            isEdit:true,
            list:[]
          },
          address:'',
          note:''
        },//表单控制
        currentDocSchedule:{
          ysmc:"默认",
          ysdm:"",
          slot:[
            {
              jssj : "12:00",
              kssj : "8:00",
              sjddm : "SW",
              sjdmc : "上午",
              weekday:[{},{},{},{},{},{},{}],
            },
            {
              jssj : "19:00",
              kssj : "12:01",
              sjddm : "XW",
              sjdmc : "下午",
              weekday:[{},{},{},{},{},{},{}],

            },
            {
              jssj : "23:59",
              kssj : "19:01",
              sjddm : "WS",
              sjdmc : "晚上",
              weekday:[{},{},{},{},{},{},{}],

            }
          ]
        },//当前所选医生出班时间表
        singleSchedule:{},
        timeSlot:[],//时间段列表
        templateData:[],//排版模板数据
        isAdd:false,//添加或修改操作
        loading:true,//数据读取状态
        isCover:false,//是否覆盖
        dialogVisible: false//确认覆盖弹窗显示
      };
    },
    created() {
      this.$nextTick(() => {
        setTimeout(_ => {
          this.init();
        },0);
      })
    },
    methods: {
      init(){
        this.getDicData();//获取字典数据
//        this.getDocScheduleList();//获取医生出班模板列表
        if(this.$store.state.scheduling.currentSchedulingSet['ysdm']){
          this.getDocScheduleList();//获取医生出班模板列表
        }else{
          this.$message('无医生信息');
          //获取医生出班模板列表缺省信息
          this.getDocScheduleListDefault();
          this.loading = false;
        }
      },
      //获取各种字典数据
      getDicData(){
        this.formOptions.serviceType.list = this.$store.state.scheduling.serviceTypeList;
        this.formOptions.department.list = this.$store.state.scheduling.departmentList;
        this.formOptions.disease.list = this.$store.state.scheduling.specDiseaseList;
        this.formOptions.slotTime.list = this.timeSlot = this.$store.state.scheduling.timeSlotList;
      },
      //科室选择不同医生
      handlerDepartChange(val){
        this.$wnhttp("PAT.WEB.APPOINTMENT.BASEINFO.Q04", {kstybm:val}).then(data => {
          this.formOptions.doctor.list = data;
        }).catch(err => {
          console.log(err);
        });
      },
      //获取医生排班模板列表缺省信息
      getDocScheduleListDefault(){
        this.timeSlot.map((slot,index) => {
          Object.assign(this.currentDocSchedule.slot[index],arr.clone(slot))
        });
        this.currentDocSchedule.slot.map(slot => {
          slot.weekday = [
            {cbrqlx:['星期一'],sjddm:[slot.sjddm]},
            {cbrqlx:['星期二'],sjddm:[slot.sjddm]},
            {cbrqlx:['星期三'],sjddm:[slot.sjddm]},
            {cbrqlx:['星期四'],sjddm:[slot.sjddm]},
            {cbrqlx:['星期五'],sjddm:[slot.sjddm]},
            {cbrqlx:['星期六'],sjddm:[slot.sjddm]},
            {cbrqlx:['星期日'],sjddm:[slot.sjddm]}
          ];
        })
      },
      //获取医生出班模板列表
      getDocScheduleList(){
        let params = {
          ksdm : this.$store.state.scheduling.currentSchedulingSet.ksdm,
          mbdm : this.$store.state.scheduling.currentSchedulingSet.mbdm,
          ysdm : this.$store.state.scheduling.currentSchedulingSet.ysdm,
        };
        this.$wnhttp("PAT.WEB.APPOINTMENT.SCHEDULE.Q04", params).then(data => {
          this.currentDocSchedule = this.formatData(arr.classifyArr(data, 'ysmc'))[0];
          this.setDefaultInfo();
        }).catch(err => {
          console.log(err);
        });
      },
      //获取默认信息:有医生信息，科室、医生会被自动拉取
      setDefaultInfo(){
        //科室默认
        this.form.ksdm = this.$store.state.scheduling.currentSchedulingSet.ksdm;
        //医生默认
        this.form.ysdm = this.$store.state.scheduling.currentSchedulingSet.ysdm;
      },
      //数据处理
      formatData(list){
        //医生→时间段→日期
        let newArr = [];
        list.map((item,index) => {
          newArr[index] = {"ysmc":item.name,"slot":[]};
          this.timeSlot.map(slot => {
            slot.weekday = [
              {cbrqlx:['星期一'],sjddm:[slot.sjddm]},
              {cbrqlx:['星期二'],sjddm:[slot.sjddm]},
              {cbrqlx:['星期三'],sjddm:[slot.sjddm]},
              {cbrqlx:['星期四'],sjddm:[slot.sjddm]},
              {cbrqlx:['星期五'],sjddm:[slot.sjddm]},
              {cbrqlx:['星期六'],sjddm:[slot.sjddm]},
              {cbrqlx:['星期日'],sjddm:[slot.sjddm]}
            ];
            item.children.map(week => {
              newArr[index].ysmc = week.ysmc;
              if(week.sjddm != slot.sjddm)return
              if(week.cbrqlx === '星期一'){
                Object.assign(slot.weekday[0],week)
              }
              if(week.cbrqlx === '星期二'){
                Object.assign(slot.weekday[1],week)
              }
              if(week.cbrqlx === '星期三'){
                Object.assign(slot.weekday[2],week)
              }
              if(week.cbrqlx === '星期四'){
                Object.assign(slot.weekday[3],week)
              }
              if(week.cbrqlx === '星期五'){
                Object.assign(slot.weekday[4],week)
              }
              if(week.cbrqlx === '星期六'){
                Object.assign(slot.weekday[5],week)
              }
              if(week.cbrqlx === '星期日'){
                Object.assign(slot.weekday[6],week)
              }
            })
            newArr[index].slot.push(slot);
            this.loading=false;
          });
        });
        return newArr;
      },
      //获取单次出班信息
      getSingleSchedule(i,j,item){
        this.schedulingSelectIndex = [i,j];
        //修改添加/保存状态
        this.isAdd = false;
        this.form = arr.clone(item);
        this.form.cbrqlx = [this.form.cbrqlx];
        this.form.sjddm = [this.form.sjddm];
        this.setForm(this.form);
      },
      //表单填充策略
      setForm(data){
        Object.assign(this.form,data)
      },
      //设置新的排班信息
      setNewSchedule(i,j){
        this.schedulingSelectIndex = [i,j];
        this.$message('设置新的出班信息');
        //修改添加/保存状态
        this.isAdd = true;
        let _data = {
          cbrqlx: this.currentDocSchedule.slot[i].weekday[j].cbrqlx,//必填:表单获取
          cbzt: 'ZC',//必填:默认值
          czdz: '',//必填:表单获取
          czry: this.$store.state.login.userInfo.userId,//必填:登录信息
          yxzt:'YX',//必填:默认值
          mbdm: this.$store.state.scheduling.currentSchedulingSet.mbdm,//必填
          fwlxdm:'',//必填:表单获取
          ghfdm:'',//必填:挂号费 数据转换
          zlfdm:'',//必填:诊疗费 数据转换
          sjddm:this.currentDocSchedule.slot[i].weekday[j].sjddm,//必填:表单获取
          kssj:'',//必填:时间段列表 数据转换
          jssj:'',//必填:时间段列表 数据转换
          ysdm: this.$store.state.scheduling.currentSchedulingSet.ysdm,//必填:医生列表 数据转换
          ysmc:'',//必填:表单获取
          ksdm: this.$store.state.scheduling.currentSchedulingSet.ksdm,//必填:科室列表 数据转换
          ksmc:'',//必填:表单获取
          mxxh:'',
          hxzs:'',
          fscj: '',
          lrsj:'',
          zbxh:'',
        };
        this.setForm(_data);
      },
      //数据转换
      formDataFormat(form){
        let newForm = arr.clone(form);
        newForm.ghfdm = newForm.fwlxdm ? this.formOptions.serviceType.list
          .filter(item => item.fwlxdm == newForm.fwlxdm)[0].sfxm
          .filter(item => item.lx == 'GHF')[0].mxxh : '';
        newForm.zlfdm = newForm.fwlxdm ? this.formOptions.serviceType.list
          .filter(item => item.fwlxdm == newForm.fwlxdm)[0].sfxm
          .filter(item => item.lx == 'ZLF')[0].mxxh : '';
        newForm.sjddmList = [];
        newForm.sjddm.map(sjddm => {
          newForm.sjddmList.push({
            sjddm:sjddm,
            kssj:this.formOptions.slotTime.list.filter(item => item.sjddm == sjddm)[0].kssj,
            jssj:this.formOptions.slotTime.list.filter(item => item.sjddm == sjddm)[0].jssj,
          });
        });
        newForm.userList = [{
          ksdm:newForm.ksdm,
          ksmc:this.formOptions.department.list.filter(item => item.kstybm == newForm.ksdm)[0].ksmc,
          ysdm:newForm.ysdm,
          ysmc:this.formOptions.doctor.list.filter(item => item.zgtybm == newForm.ysdm)[0].zgxm
        }];
        newForm.hxmbList = [];
        newForm.zydmList = [];
        newForm.cbrqlxList = newForm.cbrqlx;
        delete newForm['cbrqlx'];
        delete newForm['sjddm'];
        delete newForm['kssj'];
        delete newForm['jssj'];
        delete newForm['ysmc'];
        delete newForm['ysdm'];
        delete newForm['ksmc'];
        delete newForm['ksdm'];
        return newForm;
      },
      //按照出班日期转换保存数据模型
      cbrqlxDataFormat(data){
        let newData = [];
        data.cbrqlx.map(() => {
          newData.push(arr.clone(data));
        })
        return newData;
      },
      MsgSuccess() {
        this.SubmitVisible = false;
        this.$message({
          message: '提交成功！',
          type: 'success'
        });
      },
      TemSuccess() {
        this.$message({
          message: '成功！',
          type: 'success'
        });
      },
      selection(index) {
        this.form.fwlxdm = this.formOptions.serviceType.list[index].fwlxdm;
        this.formOptions.serviceType.activeIndex = index;
      },
      //保存/新增接口
      save(){
        let data = this.formDataFormat(this.form);
        console.log('保存时的数据 %o',data);
        this.$wnhttp("PAT.WEB.APPOINTMENT.SCHEDULE.S02", { insert: data,ifCover:this.isCover}).then(data => {
          this.$message('保存成功');
          this.isCover = false;
          this.getDocScheduleList();//获取医生出班模板列表
        }).catch(err => {
          console.log(err);
          if(err.data.Response.Head.AckCode.indexOf('400')>-1){
            this.dialogVisible = true;
          }
          //这里错误有2种错误
          //1. 服务端业务错误，错误码邮件中有
          //2. 网络错误，本地网络断开、超时等
        });
      },
      //删除
      delSchedule(item){
        this.$wnhttp("PAT.WEB.APPOINTMENT.SCHEDULE.S02", { delete: [{mxxh:item.mxxh}],isCover:true }).then(data => {
          this.$message('已删除');
          this.getDocScheduleList();//获取医生出班模板列表
        }).catch(err => {
          console.log(err);
          //这里错误有2种错误
          //1. 服务端业务错误，错误码邮件中有
          //2. 网络错误，本地网络断开、超时等
        });
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      handleCancel(){
        this.dialogVisible = false;
        this.isCover = false;
      },
      handleConfirm(){
        this.dialogVisible = false;
        this.isCover = true;
        this.save();
      },
      equalsArray(array1,array2) {
        if(array1[0] != array2[0] || array1[1] != array2[1]){
          return false;
        }
        return true;
      }
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
    margin: 0 0 10px 0;
    display: inline-block;
    width: 100%;
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
    position: relative;
    cursor: pointer;
  }
  .ordered:hover{
    background: #eef6ff;
  }
  .ordered:hover>i{
    display: inline-block;
  }
  .ordered>i{
    position: absolute;
    top:5px;
    right: 5px;
    font-size: 10px;
    height: 12px;
    line-height: 12px;
    display: none;
  }
  .ordered > p {
    height: 20px;
    line-height: 20px;
  }
  /*default,expert,disease,union,VIP*/
  .ordered.active{
    background: red;
  }
  .ordered.PT {
    background: rgb(185, 185, 185);
    color: #fff;
  }
  .ordered.ZJ {
    color: rgb(32, 160, 255);
    background: rgb(192, 229, 255);
  }
  .ordered.disease {
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
  .select{
    border:1px solid red !important;
  }
  .box-title{
    width: 100%;
    height: 20px;
    line-height: 20px;
    font-weight: bold;
    font-size: 16px;
    display: inline-block;
    padding-left: 10px;
    margin-left: 12px;
    border-left: 6px solid #3f51b5;
    margin-bottom: 10px;
  }
</style>

