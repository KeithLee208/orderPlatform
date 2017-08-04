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
              <span v-for="(item,index) in form.Type.category">
                <!--,{active:active==index}-->
                <i @click="selection(index)"  :class="[item.type,{active:form.Type.active==index}]"></i>
                {{item.text}}
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
      <div slot="footer"  class="dialog-footer">
        <el-button>取消</el-button>
        <el-button type="primary">保存并继续</el-button>
        <!--<el-button type="success" >保存并设置下一位</el-button>-->
      </div>
    </div>

  </div>
</template>
<script>
  import * as listArray from '../../../filters/array'
  import channeldrag from '../../../components/base/drag/channel-drag.vue'
  export default{
    data() {
      return {
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
          UnChannel: false
        },
        timeSlot:[],//时间段列表
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
        let selcetArr = [];
        for (var i = 0; i < data.length; i++) {
          console.log(data[i].ksbm);
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
    components: {
      channeldrag
    }
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
    position: relative;
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
    width: 100%;
    display: inline-block;
  }

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
  .info-detail{
    position: absolute;
    right: 20px;
    font-size: 14px;
    color: rgb(63, 169, 255);
    cursor: pointer;
    z-index: 9;
  }
</style>

