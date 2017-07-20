<template>
  <div class="setting-wraaper">
    <div class="setting-header">
      <div class="pull-right">
        <div class="top-search pull-left">
          <input class="top-searchinput pull-left" placeholder="搜索院区／科室／医生">
          <i class="iconfont icon-sousuo"></i>
        </div>
        <router-link
          :to="'/scheduling/clinic/tpcard'" >
          <i class="el-icon-close"></i>
        </router-link>
      </div>
      <router-link tag="span" to="/scheduling/clinic/tpcard">
        <i class="el-icon-arrow-left"></i>
        <span v-for="(item,index) in crumbs">{{item}}<span v-if="index != crumbs.length-1"> / </span></span>
      </router-link>
      <span class="used-time"> <i class="el-icon-time"></i>使用时间：2017/03/02-2017/05/02</span>
    </div>
    <div class="setting-body">
      <div class="setting-main">
        <div class="page-head">
          <div class="type-filter">
            <span><i class="el-icon-menu all"></i>全部</span>
            <span class="submit"><i></i>已提交（10）</span>
            <span class="unsubmit"><i></i>待提交（2）</span>
            <span class="pull-right">
              <router-link tag="span" to="/scheduling/clinic/sortset">
                <el-button class="btn-blue"  type="primary">设置费用及号序</el-button>
                </router-link>
              </span>
          </div>
        </div>
        <div class="Att-list-body">
          <div class="Att-row" v-for="item in attList">
            <div class="Att-row-lable">
              {{item.name}}
            </div>
            <div class="Att-row-data">
            <span v-for="(att,index) in item.children">
              <router-link to="/scheduling/clinic/tptable">
                  <el-popover  placement="bottom" width="200" trigger="hover">
                 <div class="fixed-info">
                  <p class="fixed-info-title">门诊号源信息</p>
                  <p><i class="default"></i>普通（10）</p>
                  <p><i class="expert"></i>专家（2）</p>
                  <p><i class="disease"></i>专病（3）</p>
                  <p><i class="union"></i>联合（4）</p>
                  <p><i class="VIP"></i>特需（5）</p>
                 </div>
                  <el-button type="text" slot="reference">{{att.ksmc}}</el-button>
            </el-popover>
                </router-link>
            </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="设置费用及号序" :visible.sync="SettingVisible" size="large" top="5%">
      <!--<div class="Adjustment" style="">-->
      <!--<a>调整记录</a>-->
      <!--</div>-->
      <div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="服务类型">
            <div class="type-filter in-model">
              <span><i class="el-icon-menu all"></i>全部</span>
              <span v-for="(item,index) in form.Type.category">
                <!--,{active:active==index}-->
                <i @click="selection(index)"  :class="[item.type,{active:form.Type.active==index}]"></i>
                {{item.text}}（{{item.num}}）
              </span>
            </div>
          </el-form-item>
          <el-form-item label="选择科室">
            <el-select style="width: 30%" @change="SelectInit" v-model="form.DepartmentValue" multiple filterable placeholder="请选择">
              <el-option v-for="item in form.DepartOptions" :key="item.ksbm" :label="item.ksmc" :value="item.ksmc">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="form.DocShow" label="选择医生">
            <el-select v-model="form.DocValue" :disabled="form.DocDisabled" :placeholder='form.Doctext'>
              <el-option v-for="item in form.DocOptions" :key="item.zgbm" :label="item.zgxm" :value="item.zgxm"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="form.DiseaseShow" label="选择病种">
            <el-select v-model="form.DiseaseValue" placeholder="请选择病种">
              <el-option v-for="item in form.Disease" :key="item.zydm" :label="item.zymc" :value="item.zydm">
              </el-option>
            </el-select>
          </el-form-item>
          <!--<el-form-item label="选择院区">-->
          <!--<el-radio-group v-model="form.radio">-->
          <!--<el-radio :label="1">徐汇院区</el-radio>-->
          <!--<el-radio :label="2">黄埔院区</el-radio>-->
          <!--</el-radio-group>-->
          <!--</el-form-item>-->
          <el-form-item label="就诊时间">
            <el-checkbox-group v-model="form.VisitTime">
              <el-checkbox label="周一" value="周一" name="time"></el-checkbox>
              <el-checkbox label="周二" value="周二" name="time"></el-checkbox>
              <el-checkbox label="周三" value="周三" name="time"></el-checkbox>
              <el-checkbox label="周四" value="周四" name="time"></el-checkbox>
              <el-checkbox label="周五" value="周五" name="time"></el-checkbox>
              <el-checkbox label="周六" value="周六" name="time"></el-checkbox>
              <el-checkbox label="周日" value="周日" name="time"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="出诊时间">
            <el-col :span="14">
              <el-radio-group v-model="form.OutTimeValue">
                <el-radio v-for="item in form.OutTime" :label="item.sjdmc+item.kssj+'-'+item.jssj" :value="item.sjddm"></el-radio>
              </el-radio-group>
            </el-col>
            <el-col :span="10">
              <el-form-item label="时间段">
                <el-time-picker is-range v-model="form.Times" placeholder="选择时间范围">
                </el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="服务费用">
            <el-radio-group v-model="form.cost" @change="CostChange">
              <el-radio label="1">按号序设置费用</el-radio>
              <el-radio label="2">不按号序设置费用</el-radio>
            </el-radio-group>
            <span class="cost">服务总费用</span>
            <el-input class="cost-input"></el-input>元
          </el-form-item>
          <div class="source" v-if="form.Source">
            <div class="source-card" @mouseenter="SourceMouseOver()" @mouseleave="SourceMouseLeave()">
              <el-form label-width="45px">
                <el-form-item label="号段">
                  <el-col :span="10">
                    <el-input></el-input>
                  </el-col>
                  <el-col class="line" style="text-align: center" :span="4">-</el-col>
                  <el-col :span="10">
                    <el-input></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="费用">
                  <el-input placeholder="元"></el-input>
                </el-form-item>
              </el-form>
              <i v-if="form.CloseShow" @click="DelCard()" class="card-close el-icon-close"></i>
            </div>
            <div @click="AddCard()" class="source-plus">
              <i class="el-icon-plus"></i>
            </div>
          </div>
          <div class="unsource" v-if="form.UnSource">
            <el-form label-width="100px">
              <el-form-item label="设置总号源数">
                <el-input style="width: 170px"></el-input>
              </el-form-item>
            </el-form>
          </div>
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
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="SettingVisible = false">取消</el-button>
        <el-button @click="MsgSuccess" type="primary">保存</el-button>
        <el-button type="success">保存并设置下一位</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import api from '../../../../api'
  import * as listArray from '../../../filters/array'
  import channeldrag from '../../../components/base/drag/channel-drag.vue'
  export default {
    data() {
      return {
        crumbs:[],//面包屑数据
        SettingVisible: false,
        attList: [],
        form: {
          //        服务类型
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
          //        科室
          DepartOptions: [],
          DepartmentValue: '',
          //        医生
          DocOptions: '',
          DocDisabled: true,
          Doctext: '请先选择科室',
          DocShow: false,
          DocValue: '',
          //        专病
          Disease: [],
          DiseaseValue: '',
          DiseaseShow: false,
          //        出诊时间
          radio: '1',
          radio2: '1',
          //        出诊时间
          OutTimeValue: '',
          OutTime: [],
          //        出诊时间
          VisitTime: [],
          //        时间段
          Times: [new Date(2017, 1, 1, 0), new Date(2017, 1, 1, 23)],
          desc: '',
          cost: '',
          channel: '',
          Source: false,
          UnSource: false,
          CloseShow: false,
          Channel: false,
          UnChannel: false,

        }
      }
    },
    created() {
      this.$nextTick(() => {
        this.getCrumbs();//获取面包屑数据
        this.TpListInit(); //科室列表
        this.DiseaseInit(); //专病病种
        this.OutTimeInit(); //出诊时间
    })
    },
    methods: {
      //获取面包屑数据
      getCrumbs(){
        this.crumbs = this.$store.state.scheduling.crumbs.tplist;
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
      CostChange(value) {
        if (value == '1') {
          this.form.Source = true;
          this.form.UnSource = false;
        } else if (value == '2') {
          this.form.Source = false;
          this.form.UnSource = true;

        }
      }, //服务费用Dom切换
      ChannelChange(value) {
        if (value == '1') {
          this.form.Channel = true;
          this.form.UnChannel = false;
        } else if (value == '2') {
          this.form.Channel = false;
          this.form.UnChannel = true;

        }
      }, //配置号序Dom切换
      SourceMouseOver() {
        this.form.CloseShow = true;
      }, //服务类型卡片关闭按钮显示
      SourceMouseLeave() {
        this.form.CloseShow = false;
      }, //服务类型卡片关闭按钮显示
      DelCard() {
        alert('卡片删除事件.');
      }, //删除服务类型卡片
      AddCard() {
        alert('增加卡片事件.');
      }, //添加服务类型卡片
      selection(index) {
        this.form.Type.active = index;
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
        console.log(this.attList);
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
        console.log(this.form.OutTime);
      }).catch(err => {
          console.log(err);
        //这里错误有2种错误
        //1. 服务端业务错误，错误码邮件中有
        //2. 网络错误，本地网络断开、超时等
      });
      } //出诊时间
    },
    components: {
      channeldrag
    }
  };
</script>

<style scoped>
  .setting-header {
    height: 60px;
    width: 100%;
    display: inline-block;
    line-height: 60px;
    padding: 0 30px 0 30px;
    background: rgb(63, 81, 181);
    color: #fff;
    border-bottom: 1px solid #e0e0e0;
    cursor: default;
    box-sizing: border-box;
  }

  .setting-header >div> a > i {
    font-size: 14px;
    color: #fff;
  }

  .setting-header > span {
    font-size: 16px;
    cursor: pointer;
  }

  .setting-header > .used-time {
    font-size: 14px;
    color: #bbb;
    margin-left: 15px;
    color: rgba(255, 255, 255, .5);
  }

  .setting-header > .used-time>i {
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

  .Adjustment {
    height: 25px;
    line-height: 25px;
    position: absolute;
    right: 40px;
    top: 45px;
  }

  .Adjustment>a {
    text-decoration: none;
    color: rgb(32, 160, 255);
  }

  .setting-dialog-text {
    padding-left: 20%;
  }

  .setting-dialog-text>p {
    color: #999;
    height: 30px;
    line-height: 30px;
  }
  /*-------------------------------*/

  .page-head > div {
    height: 50px;
    line-height: 50px;
  }

  .type-filter > span {
    display: inline-block;
    cursor: default;
  }

  .type-filter > span > i {
    width: 16px;
    height: 16px;
    float: left;
    border-radius: 4px;
    margin: 15px 5px 0 10px;
    cursor: pointer;
  }

  .type-filter > span > .all {
    border: 1px solid transparent;
    margin-top: 15px;
    color: #e0e0e0;
    font-size: 16px;
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

  .type-filter>.submit {
    color: #3f51b5;
  }

  .type-filter>.unsubmit {
    color: #e0e0e0;
  }

  .type-filter>.submit>i {
    background: #3f51b5;
  }

  .type-filter>.unsubmit>i {
    background: #e0e0e0;
  }

  .type-filter > span > i {
    width: 16px;
    height: 16px;
    float: left;
    border-radius: 4px;
    margin: 16px 5px 0 10px;
    cursor: pointer;
  }

  .in-model > span > i,
  .in-model > span>.all {
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

  .Att-row {
    width: 100%;
    display: inline-block;
    position: relative;
    margin-bottom: 10px;
    cursor: default;
  }

  .Att-row>.Att-row-lable {
    font-weight: bold;
    font-size: 14px;
    width: 100%;
    height: 20px;
    line-height: 20px;
  }

  .Att-row>.Att-row-data {
    width: 100%;
    box-sizing: border-box;
    display: inline-block;
    border-bottom: 1px solid #E7ECF4;
    padding-bottom: 15px;
  }

  .Att-row-data>span {
    float: left;
    width: 185px;
    height: 30px;
    line-height: 30px;
    color: rgb(32, 178, 255);
  }

  .Att-list-body {
    padding: 10px;
  }

  .fixed-info-title {
    font-size: 14px;
  }

  .fixed-info > p {
    display: inline-block;
    cursor: default;
    width: 100%;
    padding: 5px;
  }

  .fixed-info > p > .default {
    background: #fff;
  }

  .fixed-info > p > .expert {
    border: 1px solid rgb(192, 229, 255);
    background: rgb(233, 246, 255);
  }

  .fixed-info > p > .disease {
    border: 1px solid rgb(188, 241, 212);
    background: rgb(231, 250, 240);
  }

  .fixed-info > p > .union {
    border: 1px solid rgb(254, 235, 195);
    background: rgb(255, 248, 234);
  }

  .fixed-info > p > .VIP {
    border: 1px solid rgb(255, 204, 204);
    background: rgb(255, 237, 237);
  }

  .fixed-info > p > i {
    width: 16px;
    height: 16px;
    float: left;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    margin: 0px 20px 0 0px;
    cursor: pointer;
  }

  .page-head > div {
    height: 50px;
    line-height: 50px;
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

  .el-button--text {
    color: #1d90e6;
  }


  .form-line {
    width: 100%;
    float: left;
    margin: 22px 0 22px 0;
    display: inline-block;
    border-bottom: 1px dashed #e0e0e0;
  }
  .top-search {
    margin: 10px 15px 0 0 ;
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
    color:    #FFF;
    opacity: .5;
  }
  .top-searchinput:-moz-placeholder{  /* Mozilla Firefox 4 to 18 */
    color:    #FFF;
    opacity: .5;
  }
  .top-searchinput::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:    #FFF;
    opacity: .5;
  }
  .top-searchinput:-ms-input-placeholder { /* Internet Explorer 10+ */
    color:    #FFF;
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
</style>
