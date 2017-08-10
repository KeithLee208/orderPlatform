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
          <el-select v-model="form.ksdmList" multiple  placeholder="请选择">
            <el-option v-for="item in formOptions.department.list" :key="item.ksbm" :label="item.ksmc" :value="item.ksbm">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择医生">
          <el-select v-model="form.ysdmList" multiple placeholder='请选择'>
            <el-option v-for="item in formOptions.doctor.list" :key="item.zgbm" :label="item.zgxm" :value="item.zgbm"></el-option>
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
          <!--<el-col :span="10">-->
            <!--<el-form-item label="时间段">-->
              <!--<el-time-picker is-range v-model="form.time" placeholder="选择时间范围">-->
              <!--</el-time-picker>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
        </el-form-item>
        <el-form-item label="服务费用">
          <span>50元</span>
        </el-form-item>
        <div class="form-line"></div>
        <el-form-item label="配置号序">
          <span class="num-info">(当前号源数18)</span>
        </el-form-item>
        <div class="Channel">
          <el-radio-group v-model="formOptions.channel" @change="channelChange">
            <el-radio label="1">区分渠道</el-radio>
            <el-radio label="2">不区分渠道</el-radio>
          </el-radio-group>
          <div v-if="formOptions.Channel">
            <div class="Channel-Warrper">
              <draggable v-model="channalList" @update="datadragEnd"  @start="drag=true" @end="drag=false">
                <div v-for="(item,index) in channalList" :key="index" class="channel-box" :class="item.qdmc">
                  <p v-if="!item.edit" @click="channalList[index].edit = true" class="top">{{item.num}}</p>
                  <input  v-else="item.edit" @blur="channalList[index].edit = false" v-model="item.num" v-focus class="num-edit" type="text">
                  <p class="footer">{{item.qdmc}}</p>
                </div>
              </draggable>
            </div>
            <div class="production">
              <el-button @click="getSortList" class="pull-right" type="success">生成号序</el-button>
            </div>
            <div v-if="ball">
              <div class="ball-row">
                <draggable  v-model="ballList" @update="datadragEnd" @start="drag=true" @end="drag=false">
                  <transition-group tag="div" :name="'flip-list'">
                     <span v-for="(item,index) in ballList" :key="item.hx">
                       <i :class="item.qddm" :style="item.style">
                         <p class="num">{{item.hx}}</p>
                         <p class="price">
                           <span class="ball-price pull-left" v-if="!item.edit" @click="ballList[index].edit = true">{{item.je}}</span>
                            <input v-if="item.edit" v-model="item.je" @blur="ballList[index].edit = false" v-focus class="ball-edit" type="text">
                           <span class="pull-left">¥</span>
                         </p>
                        </i>
                     </span>
                  </transition-group>
                </draggable>
                <span>
                 <i class="plus el-icon-plus"></i>
               </span>
              </div>
            </div>
          </div>
          <div class="UnChannel" v-if="formOptions.UnChannel">
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
        <el-button type="primary" @click="save">保存并继续</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import channeldrag from '../../../components/base/drag/channel-drag.vue'
  import draggable from 'vuedraggable'
  export default {
    data(){
      return{
        form:{
          fwlxdm:'',
          ysdmList:[],
          disease:'',
          ksdmList:[],
          cbrqlx:[],
          time:'',
          sjddm:[],
          czdz:'',
          note:'',
          desc: '',//
          cost: '',//服务总费用
          ordertype:'',
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
          note:'',
          channel: '1',
          Source: false,
          UnSource: false,
          CloseShow: false,
          Channel: true,
          UnChannel: false,
        },//表单控制
        timeSlot:[],//时间段列表
        channalList:[],
        channal:[
          {
            name:'非预约',
            num:5,
            type:'default',
            edit:false,
            children:
              [
                {
                  name:88,
                },
                {
                  name:89
                },
                {
                  name:90
                },
                {
                  name:91
                },
                {
                  name:92
                },
              ]
          },
          {
            name:'院内预约',
            num:3,
            type:'hospital',
            edit:false,
            children:
              [
                {
                  name:1
                },
                {
                  name:2
                },
                {
                  name:3
                }
              ]
          },
          {
            name:'官微预约',
            num:4,
            type:'wechat',
            edit:false,
            children:
              [
                {
                  name:78
                },
                {
                  name:79
                },
                {
                  name:60
                },
                {
                  name:81
                }
              ]
          },
          {
            name:'挂号网预约',
            num:2,
            type:'web',
            edit:false,
            children:
              [
                {
                  name:18
                },
                {
                  name:19
                }
              ]
          },
          {
            name:'官网预约',
            num:1,
            type:'official',
            edit:false,
            children:
              [
                {
                  name:1
                }
              ]
          }
        ],
        ball:false,
        ballList:[],
        styleArr:[
          {border:'1px solid #c0e5ff',background: '#e9f6ff',color: '#20a0ff'},
          {border: '1px solid #bcf1d4',background: '#bcf1d4',color: '#0caf4e'},
          {border: '1px solid #feebc3',background: '#fff8ea',color: '#e8a623'},
          {border: '1px solid #ffcccc',background: '#ffeded',color: '#ff4949'}
        ]
      }
    },
    created(){
        this.$nextTick(()=> {
            this.init();
        })
    },
    methods:{
      init(){
        this.getDicData();//获取字典数据
        this.getChannalList();
      },
      //获取各种字典数据
      getDicData(){
        this.formOptions.serviceType.list = this.$store.state.scheduling.serviceTypeList;
        this.formOptions.department.list = this.$store.state.scheduling.departmentList;
        this.formOptions.doctor.list = this.$store.state.scheduling.doctorList;
        this.formOptions.disease.list = this.$store.state.scheduling.specDiseaseList;
        this.formOptions.slotTime.list = this.timeSlot = this.$store.state.scheduling.timeSlotList;
      },
      getChannalList(){
        this.$wnhttp("PAT.WEB.APPOINTMENT.BASEINFO.Q08", {}).then(data => {
          data.map((item, index) => {
            item.edit = false;
            item.num = 1;
            item.style = this.styleArr[index]
          });
          this.$store.commit('scheduling/SET_CHANNALLIST',data);
          this.channalList = data;
        }).catch(err => {
          console.log(err);
        });
      },
      //配置号序Dom切换
      channelChange(value) {
        if (value == '1') {
          this.formOptions.Channel = true;
          this.formOptions.UnChannel = false;
        } else if (value == '2') {
          this.formOptions.Channel = false;
          this.formOptions.UnChannel = true;
        }
      },
      getSortList(){
        this.ball=true;
        let newArr = [];
        var mynum = 0;
        for(var x = 0;x < this.channalList.length;x++){
          for(var y=0;y<this.channalList[x].num;y++){
            newArr.push({hx:y+mynum+1,qddm:this.channalList[x].qddm,je:50,edit:false,style:this.channalList[x].style});
          }
          mynum+=y;
        }
        this.ballList = newArr;
        console.log(this.ballList);
      },
      datadragEnd (evt){

      },
      //保存
      save(){
          console.log('保存 %o',this.form);
      }
    },
    directives: {
      focus: {
        inserted: function (el) {
          // 聚焦元素
          el.select()
        }
      }
    },
    components: {
      draggable
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

  /******************************号序配置*******************************/
  .Channel-Warrper{
    margin: 20px 0 20px 0;
  }
  .channel-box{
    min-width: 130px;
    width: 17.5%;
    height: 84px;
    display: inline-block;
    border: 1px solid #e0e0e0;
    border-radius: 2px;
    margin-right: 2%;
    cursor: move;
    box-sizing: border-box;
  }
  .channel-box>.top{
    border-bottom: 1px solid #e0e0e0;
    font-size: 32px;
  }
  .channel-box>.footer{
    font-size: 12px;
  }
  .channel-box.default,.default>p>input[type=text]{
    color: #666;
  }
  .channel-box.hospital,.hospital>p>input[type=text]{
    color: #20a0ff;
  }
  .channel-box.wechat,.wechat>p>input[type=text]{
    color: #0caf4e;
  }
  .channel-box.web,.web>p>input[type=text]{
    color: #e8a623;
  }
  .channel-box.official,.official>p>input[type=text]{
    color: #ff4949;
  }
  .channel-box>p{
    height: 42px;
    line-height: 42px;
    text-align: center;
  }

  .ball-row{
    width: 100%;
    display: inline-block;
    border-bottom: 1px dashed #e0e0e0;
  }
  .ball-row:last-child{
    border-bottom: 1px transparent;
  }
  .ball-row>span:last-child{
    border-right: 1px transparent;
  }
  .ball-row>div>div>span
  {
    display: inline-block;
    width: 10%;
    height: 80px;
    text-align: center;
    box-sizing: border-box;
    float: left;
    padding: 10px;
  }

  .ball-row>div>div>span>i{
    cursor: pointer;
    display: inline-block;
    font-style: normal;
    width: 60px;
    height: 60px;
    line-height: 60px;
    border-radius: 50%;
    border: 1px solid #e0e0e0;
    font-size: 18px;
  }
  .ball-row>div>div>span>i>p.num{
    height:35px;
    line-height: 35px
  }
  .ball-row>div>div>span>i>p.price{
    height:14px;
    line-height: 14px;
    font-size: 14px;
  }
  .ball-row>span
  {
    display: inline-block;
    width: 10%;
    height: 80px;
    text-align: center;
    box-sizing: border-box;
    float: left;
    padding: 10px;
  }
  .ball-row>span>i{
    cursor: pointer;
    display: inline-block;
    font-style: normal;
    width: 60px;
    height: 60px;
    line-height: 60px;
    border-radius: 50%;
    border: 1px solid #e0e0e0;
    font-size: 18px;

  }

  .ball-row>div>div>span>i.hospital{
    border: 1px solid #c0e5ff;
    background: #e9f6ff;
    color: #20a0ff;
  }
  .ball-row>div>div>span>i.wechat{
    border: 1px solid #bcf1d4;
    background: #e7faf0;
    color: #0caf4e;
  }
  .ball-row>div>div>span>i.web{
    border: 1px solid #feebc3;
    background: #fff8ea;
    color: #e8a623;
  }
  .ball-row>div>div>span>i.official{
    border: 1px solid #ffcccc;
    background: #ffeded;
    color: #ff4949;
  }
  .ball-row>span>i.plus{
    color: #e0e0e0;
  }
  .flip-list-move {
    transition: transform 0.5s;
  }

  .no-move {
    transition: transform 0s;
  }
  .production {
    width: 100%;
    display: inline-block;
    margin-bottom: 20px;
  }
  .num-edit{
    border: none;
    border-bottom: 1px solid #e0e0e0;
    text-align: center;
    height: 35px;
    line-height: 35px;
    font-size: 32px;
    width: 100%;
    display: inline-block;
    float: left;
    margin-top: 3px;
  }
  .ball-price {
    width: 30px;
    margin: 0 0 0 9px;
  }
  .ball-row > div > div > span > i > p.num {
    height: 33px;
    line-height: 38px;
    font-weight: bold;
  }
  .ball-edit {
    border: none;
    text-align: center;
    height: 13px;
    line-height: 13px;
    font-size: 14px;
    width: 30px;
    display: inline-block;
    float: left;
    margin: 0 0 0 9px;
  }
  .default .ball-edit{
    background: #fff;
  }
  .hospital .ball-edit{
    background: #e9f6ff;
  }
  .wechat .ball-edit{
    background: #e7faf0;
  }
  .web .ball-edit{
    background: #fff8ea;
  }
  .official .ball-edit{
    background: #ffeded;
  }
  /******************************号序配置*******************************/
</style>
