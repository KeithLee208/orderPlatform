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
        <el-form-item label="服务费用">
          <span>50元</span>
        </el-form-item>
        <div class="form-line"></div>
        <el-form-item label="配置号序">
          <span class="num-info">(当前号源数18)</span>
        </el-form-item>
        <div class="Channel">
          <el-radio-group v-model="form.channel" @change="ChannelChange">
            <el-radio label="1">区分渠道</el-radio>
            <el-radio label="2">不区分渠道</el-radio>
          </el-radio-group>
          <channeldrag v-if="form.Channel"></channeldrag>
          <div class="UnChannel" v-if="form.UnChannel">
            <el-form label-width="100px">
              <el-form-item label="设置总号源数">
                <el-input style="width: 170px"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-form>
      <div slot="footer"  class="dialog-footer">
        <el-button>取消</el-button>
        <el-button type="primary">保存并继续</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import channeldrag from '../../../components/base/drag/channel-drag.vue'
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
          note:'',
          desc: '',//
          cost: '',//服务总费用
          ordertype:'',
          channel: '',
          Source: false,
          UnSource: false,
          CloseShow: false,
          Channel: false,
          UnChannel: false,

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
      //服务费用Dom切换
      CostChange(value) {
        if (value == '1') {
          this.form.Source = true;
          this.form.UnSource = false;
        } else if (value == '2') {
          this.form.Source = false;
          this.form.UnSource = true;
        }
      },
      //配置号序Dom切换
      ChannelChange(value) {
        if (value == '1') {
          this.form.Channel = true;
          this.form.UnChannel = false;
        } else if (value == '2') {
          this.form.Channel = false;
          this.form.UnChannel = true;

        }
      },
      //服务类型卡片关闭按钮显示
      SourceMouseOver() {
        this.form.CloseShow = true;
      },
      //服务类型卡片关闭按钮显示
      SourceMouseLeave() {
        this.form.CloseShow = false;
      },
      //删除服务类型卡片
      DelCard() {
        alert('卡片删除事件.');
      },
      //添加服务类型卡片
      AddCard() {
        alert('增加卡片事件.');
      },
    },
    components: {
      channeldrag
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
  /******************************服务费用*******************************/

  .source,
  .unsource {
    margin-left: 80px;
    width: 100%;
    display: inline-block;
  }

  .source-card {
    width: 300px;
    height: 155px;
    border: 1px solid #E7ECF4;
    border-radius: 2px;
    box-sizing: border-box;
    padding: 25px 25px 25px 10px;
    transition: all .2s;
    display: inline-block;
    margin-right: 20px;
    float: left;
    position: relative;
  }

  .source-plus {
    width: 155px;
    height: 155px;
    border: 1px dashed #E7ECF4;
    border-radius: 2px;
    box-sizing: border-box;
    padding: 65px 25px 25px 60px;
    transition: all .2s;
    display: inline-block;
    margin-right: 20px;
    float: left;
    cursor: pointer;
  }

  .source-plus>i {
    color: #e0e0e0;
    font-size: 25px;
  }

  .source-card:hover {
    border: 1px solid rgba(132, 166, 181, .6);
    box-shadow: 0 0 15px rgba(63, 81, 181, 0.3);
  }

  .source-plus:hover {
    border: 1px dashed rgba(132, 166, 181, .6);
    box-shadow: 0 0 15px rgba(63, 81, 181, 0.3);
  }

  .card-close {
    position: absolute;
    top: 8px;
    right: 8px;
    font-size: 12px;
    color: #e0e0e0;
    cursor: pointer;
  }

  .card-close:hover {
    color: #C5C5C5;
  }
  .cost {
    width: 100px;
    margin: 0 10px 0 40px;
  }

  .cost-input {
    width: 100px;
    margin: 0 10px 0 0px;
  }

  .num-info {
    color: rgb(63, 169, 255);
  }
  .Channel {
    margin-left: 80px;
  }

  .UnChannel {
    margin-top: 20px;
  }
  /******************************服务费用*******************************/
</style>
