<template>
  <div class="setting-wraaper">
    <div class="setting-header">
      <router-link
        to="/scheduling/clinic/tplist" class="pull-right">
        <i class="el-icon-close"></i>
      </router-link>
      <span>设置费用及号序</span>
    </div>

    <div class="set-body">
      <div class="info-detail">查看设置详情</div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="服务类型">
          <div class="type-filter in-model">
            <span><i class="el-icon-menu all"></i>全部</span>
            <span v-for="(item,index) in formOptions.serviceType.list">
                <i @click="formOptions.serviceType.activeIndex = index"  :class="[item.fwlxdm,{active:formOptions.serviceType.activeIndex==index}]"></i>
                {{item.fwlxmc}}
              </span>
          </div>
        </el-form-item>
        <el-form-item label="选择科室">
          <el-select v-model="form.ksmc"  placeholder="请选择">
            <el-option v-for="item in formOptions.department.list" :key="item.ksbm" :label="item.ksmc" :value="item.ksmc">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择医生">
          <el-select v-model="form.ysmc" :placeholder='form.ysmc'>
            <el-option v-for="item in formOptions.doctor.list" :key="item.zgbm" :label="item.zgxm" :value="item.zgxm"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择病种">
          <el-select v-model="form.disease" placeholder="请选择病种">
            <el-option v-for="item in formOptions.disease.list" :key="item.zydm" :label="item.zymc" :value="item.zydm">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="就诊时间">
          <el-radio-group v-model="form.cbrqlx">
            <el-radio v-for="item in formOptions.visitTime.list" :label="item.val" :value="item.val" name="time"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出诊时间">
          <el-col :span="8">
            <el-radio-group v-model="form.sjddm">
              <el-radio v-for="item in formOptions.slotTime.list" :label="item.sjddm" :value="item.sjddm">{{item.kssj+'-'+item.jssj}}</el-radio>
            </el-radio-group>
          </el-col>
          <el-col :span="10">
            <el-form-item label="时间段">
              <el-time-picker is-range v-model="form.time" placeholder="选择时间范围">
              </el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer"  class="dialog-footer">
        <el-button>取消</el-button>
        <el-button type="primary">保存并继续</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        form:{
          fwlxdm:'',
          ysmc:'',
          disease:'',
          ksmc:'',
          cbrqlx:'',
          time:'',
          sjddm:'',
          czdz:'',
          note:''
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
        timeSlot:[],//时间段列表
      }
    },
    created(){
        this.$nextTick(()=> {
//          setTimeout( _ => {
            this.init();
//          },0);
        })
    },
    methods:{
      init(){
        this.getDicData();//获取字典数据
      },
      //获取各种字典数据
      getDicData(){
        this.formOptions.serviceType.list = this.$store.state.scheduling.serviceTypeList;
        this.formOptions.department.list = this.$store.state.scheduling.departmentList;
        this.formOptions.doctor.list = this.$store.state.scheduling.doctorList;
        this.formOptions.disease.list = this.$store.state.scheduling.specDiseaseList;
        this.formOptions.slotTime.list = this.timeSlot = this.$store.state.scheduling.timeSlotList;
      },
    }
  }
</script>
<style scoped>
  /******************************头部*******************************/
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
  .setting-header>span{
    font-size: 16px;
  }
  .setting-header > a > i{
    color: #fff;
  }
  /******************************头部*******************************/

  .set-body{
    padding: 20px;
    position: relative;
  }
  .info-detail{
    position: absolute;
    right: 20px;
    font-size: 14px;
    color: rgb(63, 169, 255);
    cursor: pointer;
    z-index: 9;
  }
  .dialog-footer{
    text-align: right;
    width: 100%;
    display: inline-block;
  }

  /******************************服务类型*******************************/
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
  /******************************服务类型*******************************/
</style>
