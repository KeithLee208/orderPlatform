<template>
<div class="setting-wraaper">
  <div class="setting-header">
    <router-link
      to="/scheduling/headoffice/tptable" class="pull-right">
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
              <span v-if="currentDocSchedule.ysmc!==''" class="name">{{currentDocSchedule.ysmc}}</span>
              <span v-if="currentDocSchedule.ysmc!==''" class="position">主治医师</span>
              <span v-if="currentDocSchedule.ysmc ===''" class="name">普通门诊</span>
            </p>
          </div>
        </div>
        <div class="AdTableRight">
          <div class="table-body">
            <div v-for="(slot,indexI) in currentDocSchedule.slot"  :class="[indexI === 0 ? 'border-top-1':'']">
              <span>{{slot.sjdmc}}</span>
              <span v-for="(week,indexJ) in slot.weekday">
                    <span v-if="week.mxxh" class="ordered" :class="[week.mzlx,equalsArray(schedulingSelectIndex,[indexI,indexJ]) ? 'select':'']"  @click="getSingleSchedule(indexI,indexJ,week)">
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
              <span v-for="(item,index) in formOptions.serviceType.list">
                <!--,{active:active==index}-->
                <i @click="selection(index)"  :class="[item.mzlx,{active:formOptions.serviceType.activeIndex==index}]"></i>
                {{item.fwlxmc}}
              </span>
        </div>
      </el-form-item>
      <el-form-item label="当前科室">
        <el-select v-model="form.ksdm" disabled  filterable  placeholder="请选择">
          <el-option v-for="item in formOptions.department.list" :key="item.ksbm" :label="item.ksmc" :value="item.kstybm">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择医生">
        <el-select v-model="form.ysdm" filterable @change="handleDocChange">
          <el-option v-for="item in formOptions.doctor.list" :label="item.zgxm" :value="item.zgtybm"></el-option>
        </el-select>
      </el-form-item>
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
      <div class="box-title">
        <span>设置费用及号序</span>
      </div>
      <el-form-item label="配置号序">
        <span class="num-info">(当前服务费用: {{form.money}}元 当前号源数: {{ballList.length}})</span>
      </el-form-item>
      <div class="Channel">
        <el-radio-group v-model="formOptions.channel">
          <el-radio label="channel">区分渠道</el-radio>
          <el-radio label="unchannel">不区分渠道</el-radio>
        </el-radio-group>
        <div>
          <div class="Channel-Warrper" v-if="formOptions.channel == 'channel'">
            <draggable v-model="channalList"  @start="drag=true" @end="drag=false">
              <div v-for="(item,index) in channalList" :key="index" class="channel-box" :style="{color:item.style ? item.style.color: ''}">
                <p v-if="!item.edit" @click="channalList[index].edit = true" class="top">{{item.num}}</p>
                <p v-else="item.edit" class="top">
                  <input  @blur="channalList[index].edit = false" v-model="item.num" v-focus class="num-edit" :style="'color:'+item.style.color" type="text">
                </p>
                <p class="footer">{{item.qdmc}}</p>
              </div>
            </draggable>
            <div class="production">
              <el-button @click="getSortList" class="pull-right" type="success">生成号序</el-button>
            </div>
          </div>
          <div class="UnChannel" v-if="formOptions.channel == 'unchannel'">
            <el-form label-width="100px">
              <el-form-item label="设置总号源数">
                <el-input v-model="form.hxzs" style="width: 170px"></el-input>
              </el-form-item>
            </el-form>
          </div>

          <div v-if="ball && formOptions.channel == 'channel'">
            <div class="ball-row">
                     <span v-for="(item,index) in ballList">
                      <el-popover
                       placement="top"
                       width="260"
                       trigger="click"
                       :open-delay="500">
                        <div class="changeType">
                          <p class="title">配置服务费用</p>
                          <p>
                            <span class="price">服务费用：{{item.money}}元</span>
                          </p>
                          <p>
                            <span>更换服务类型</span>
                            <span class="typeselect">
                              <el-select  @change="ballChangeType(item)" v-model="item.fwlxdm" size="small"  placeholder="请选择">
                                <el-option
                                  v-for="(type,index) in formOptions.serviceType.list"
                                  :label="type.fwlxmc"
                                  :value="type.fwlxdm"></el-option>
                              </el-select>
                            </span>
                          </p>
                        </div>
                       <i slot="reference" :class="item.qddm" :style="item.style">
                         <p class="num">{{item.hx}}</p>
                         <p class="price">
                           <span class="pull-left">¥</span>
                           <span class="ball-price pull-left" v-if="!item.edit">{{item.money}}</span>
                            <input v-if="item.edit"  @blur="ballList[index].edit = false" v-model="item.money"  v-focus class="ball-edit" :style="{background:item.style.background,color:item.style.color}" type="text">
                         </p>
                        </i>
                       </el-popover>
                     </span>
              <!--<span>-->
                 <!--<i class="plus el-icon-plus"></i>-->
               <!--</span>-->
            </div>
          </div>
        </div>
      </div>
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
  import * as validator from '../../../filters/validator'
  import channeldrag from '../../../components/base/drag/channel-drag.vue'
  import draggable from 'vuedraggable'
  export default{
    data() {
      return {
        schedulingSelectIndex:[-1,-1],
        form:{
          cbrqlx: '',
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
          sjddm:'',
          ysdm:'',
          ysmc:'',
          yxzt:'',
          zlfdm:'',
          zbxh:'',
          hxmbList:'',
          money:0
        },
        formOptions:{
          serviceType:{
            isShow:true,
            list:[],
            activeIndex:0,
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
          slotTime:{
            isShow:true,
            isEdit:true,
            list:[]
          },
          address:'',
          note:'',
          channel: 'channel',
          CloseShow: false,
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
        loading:true,//数据读取状态
        ifCover:false,//是否覆盖
        dialogVisible: false,//确认覆盖弹窗显示
        channalList:[],
        channal:[],
        ball:true,
        ballList:[],
        styleArr:[
          {border:'1px solid #e0e0e0',background: '#fff',color: '#666'},
          {border:'1px solid #c0e5ff',background: '#e9f6ff',color: '#20a0ff'},
          {border: '1px solid #bcf1d4',background: '#bcf1d4',color: '#0caf4e'},
          {border: '1px solid #feebc3',background: '#fff8ea',color: '#e8a623'},
          {border: '1px solid #ffcccc',background: '#ffeded',color: '#ff4949'}
        ],
        changeType:[]
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
        this.getDoc();//根据科室选择医生
        this.getChannalList();//获取号序列表
      },
      //获取医生排班模板列表缺省信息
      getDocScheduleListDefault(){
        this.timeSlot.map((slot,index) => {
          this.currentDocSchedule.slot[index] = Object.assign({},arr.clone(slot))
        });
        this.currentDocSchedule.slot.map(slot => {
          slot.weekday = [];
          this.formOptions.visitTime.list.map((item,index) => {
            slot.weekday[index] = {cbrqlx:[item.val],sjddm:[slot.sjddm]};
          });
        });
        this.loading = false;

      },
      //获取各种字典数据
      getDicData(){
          this.formOptions.serviceType.list = this.$store.state.scheduling.serviceTypeList;
          this.formOptions.department.list = this.$store.state.scheduling.departmentList;
          this.formOptions.disease.list = this.$store.state.scheduling.specDiseaseList;
          this.formOptions.slotTime.list = this.timeSlot = this.$store.state.scheduling.timeSlotList;
      },
      //科室选择不同医生
      getDoc(){
        this.$wnhttp("PAT.WEB.APPOINTMENT.BASEINFO.Q04",
          {
            kstybm:this.$store.state.scheduling.currentSchedulingSet.ksdm,
            yydm:this.$store.state.login.userInfo.yydm
          }).then(data => {
          this.formOptions.doctor.list = data;
          let ordinary={
            zgxm:'普通门诊',
            zgtybm:''
          };
          this.formOptions.doctor.list.push(ordinary);
          this.getDocScheduleList();//获取医生出班模板列表
        }).catch(err => {
          console.log(err);
        });
      },
      //获取渠道列表
      getChannalList(){
        this.$wnhttp("PAT.WEB.APPOINTMENT.BASEINFO.Q08", {
          yydm: this.$store.state.login.userInfo.yydm
        }).then(data => {
          this.$store.commit('scheduling/SET_CHANNALLIST',data);
          this.channalList = this.channalListFormat(arr.clone(data));
        }).catch(err => {
          console.log(err);
        });
      },
      //渠道列表数据适配
      channalListFormat(data){
        data.map((item, index) => {
          item.edit = false;
          item.num = 0;
          item.style = this.styleArr[index]
        });
        return data;
      },
      //获取医生出班模板列表
      getDocScheduleList(){
        let params = {
          ksdm : this.$store.state.scheduling.currentSchedulingSet.ksdm,
          mbdm : this.$store.state.scheduling.currentSchedulingSet.mbdm,
          ysdm : this.$store.state.scheduling.currentSchedulingSet.ysdm,
        };
        this.form.ksdm=this.$store.state.scheduling.currentSchedulingSet.ksdm;
        this.$wnhttp("PAT.WEB.APPOINTMENT.SCHEDULE.Q04", params).then(data => {
          console.log('this.formOptions.doctor.list',this.formOptions.doctor.list);
          for(let i=0;i<this.formOptions.doctor.list.length;i++){
            if(this.formOptions.doctor.list[i].zgtybm==this.$store.state.scheduling.currentSchedulingSet.ysdm){
              this.currentDocSchedule.ysmc=this.formOptions.doctor.list[i].zgxm;
            }
          }
          if(data==''){
            this.getDocScheduleListDefault();
          }
          else {
            this.currentDocSchedule = this.formatData(arr.classifyArr(data, 'ysmc'))[0];
            console.log('排班表信息', this.currentDocSchedule);
            this.setDefaultInfo();
          }
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
            slot.weekday = [{},{},{},{},{},{},{}];
            this.formOptions.visitTime.list.map((item,index) => {
              slot.weekday[index] = {cbrqlx:[item.val],sjddm:[slot.sjddm]};
            });
            item.children.map(week => {
              newArr[index].ysmc = week.ysmc;
              if(week.sjddm != slot.sjddm)return;
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
            newArr[index].slot.push(slot);
            this.loading=false;
          });
        });
        return newArr;
      },
      ballChangeType(item){
        let changePrice=this.getServiceMoney(item.fwlxdm);
        item.money=changePrice;
      },
      //获取单次出班信息
      getSingleSchedule(i,j,item){
        this.schedulingSelectIndex = [i,j];//更新所选格子
        this.form = arr.clone(item);
        this.form.cbrqlx = [this.form.cbrqlx];//处理多选出班日期
        this.form.sjddm = [this.form.sjddm];//处理多选时间段
        this.form.money = this.getServiceMoney(this.form.fwlxdm);
        this.setForm(this.form);
        //根据明细获取号序列表
        this.$wnhttp("PAT.WEB.APPOINTMENT.SCHEDULE.Q08", {mxxh:item.mxxh}).then(data => {
          this.ballList= data;
          console.log('当前号序',this.ballList);
          this.ballList.sort((a,b) => a['hx']*1 > b['hx']*1)
                        .map(item => {
                          item.money = this.getServiceMoney(item.fwlxdm);
                          item.style = this.getBallStyle(item.qddm);
                        });//号源升序,整合金额,整合样式

          this.ballToChannal();//根据号序列表更新渠道信息
        }).catch(err => {
          console.log(err);
        });
      },
      //根据号序列表更新渠道信息
      ballToChannal (){
        this.channalList.map(channal => {
            channal.num = 0;
            channal.children = [];
            this.ballList.filter(ball => channal.qddm == ball.qddm).map(item => {
                channal.num ++;
                channal.children.push(item);
            })
        });
      },
      //表单填充策略
      setForm(data){
        Object.assign(this.form,data)
        console.log(this.form);
      },
      //设置新的排班信息
      setNewSchedule(i,j){
        this.schedulingSelectIndex = [i,j];
        this.$message('设置新的出班信息');

        let _data = {
          cbrqlx: this.currentDocSchedule.slot[i].weekday[j].cbrqlx,//必填:表单获取
          cbzt: 'ZC',//必填:默认值
          czdz: '',//必填:表单获取
          czry: this.$store.state.login.userInfo.userId,//必填:登录信息
          yxzt:'YX',//必填:默认值
          mbdm: this.$store.state.scheduling.currentSchedulingSet.mbdm,//必填
          fwlxdm:'',//必填:表单获取
          ghfdm:'',//必填:服务类型列表 数据转换
          zlfdm:'',//必填:服务类型列表 数据转换
          sjddm:this.currentDocSchedule.slot[i].weekday[j].sjddm,//必填:表单获取
          kssj:'',//必填:时间段列表 数据转换
          jssj:'',//必填:时间段列表 数据转换
          ysdm:this.$store.state.scheduling.currentSchedulingSet.ysdm,//必填:医生列表 数据转换
          ysmc:'',//必填:表单获取
          ksdm: this.$store.state.scheduling.currentSchedulingSet.ksdm,//必填:科室列表 数据转换
          ksmc:'',//必填:表单获取
          mxxh:'',
          hxzs:'',
          fscj:'',
          lrsj:'',
          zbxh:'',
          hxmbList:'',
          money:0
        };
        this.ballList=[];
        this.channalList =  this.channalListFormat(arr.clone( this.$store.state.scheduling.channalList));
        this.setForm(_data);
      },
      //数据转换
      formDataFormat(form){
        let newForm = arr.clone(form);
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
        newForm.hxmbList = this.ballList;
        newForm.zydmList = [];
        newForm.cbrqlxList = newForm.cbrqlx;
        delete newForm['cbrqlx'];
        delete newForm['sjddm'];
        delete newForm['kssj'];
        delete newForm['jssj'];
        delete newForm['ysmc'];
        delete newForm['ksmc'];
        return newForm;
      },
      //表单完整性验证
      formValid(){
        let _validator = new validator.Validator();
        _validator.add(this.form.czdz, [{
          strategy: 'isNonEmpty',
          errorMsg: '请填写就诊地址'
        },{
          strategy: 'isNonSpace',
          errorMsg: '就诊地址有空格'
        }]);
        _validator.add(this.form.fwlxdm, [{
          strategy: 'isNonEmpty',
          errorMsg: '请选择服务类型'
        }]);
        var errorMsg = _validator.start();
        return errorMsg;
      },
      //保存
      save(){
        let formValidErrMsg = this.formValid();
        if(formValidErrMsg){
          this.$message(formValidErrMsg);
          return false;
        }
        let insert = this.formDataFormat(this.form);
        console.log('保存的数据',insert)
        this.$wnhttp("PAT.WEB.APPOINTMENT.SCHEDULE.S02", { insert: insert,ifCover:this.ifCover}).then(data => {
          if(data){
            if(data.BizErrorCode=='HIS.APPOINTMENT.BE1006') {
              this.$message(data.BizErrorMessage);
              return
            }
            else if(data.BizErrorCode =='HIS.APPOINTMENT.BE10005') {
              this.$message(data.BizErrorMessage);
              this.dialogVisible = true;
              return
            }
          }
          else {
            this.$message('保存成功');
            this.isCover = false;
            this.getDocScheduleList(); //获取医生出班模板列表
          }
        }).catch(err => {
          console.log(err);
          //这里错误有2种错误
          //1. 服务端业务错误，错误码邮件中有
          //2. 网络错误，本地网络断开、超时等
        });
      },
      //删除
      delSchedule(item) {
        this.$wnhttp("PAT.WEB.APPOINTMENT.SCHEDULE.S02", {
          delete: [{
            mxxh: item.mxxh
          }],
          ifCover: true
        }).then(data => {
          console.log('data',data);
          if(data.BizErrorCode=='HIS.APPOINTMENT.BE1007'){
            this.$message(data.BizErrorMessage);
            return
          }
          else {
            this.$message('已删除');
            this.getDocScheduleList(); //获取医生出班模板列表
          }
        }).catch(err => {
          console.log(err);
          //这里错误有2种错误
          //1. 服务端业务错误，错误码邮件中有
          //2. 网络错误，本地网络断开、超时等
        });
      },
      //处理服务类型click事件
      selection(index) {
        this.form.fwlxdm = this.formOptions.serviceType.list[index].fwlxdm;
        if(this.formOptions.serviceType.list[index].mzlx=='ZB'){
          this.formOptions.disease.list = this.$store.state.scheduling.specDiseaseList;//获取专病列表
          this.formOptions.disease.isShow=true;
        }else{
          this.formOptions.disease.isShow=false;
          this.formOptions.disease.list=[];
        }
        let selectService = this.form.fwlxdm ? this.formOptions.serviceType.list.filter(item => item.fwlxdm == this.form.fwlxdm)[0]:{};
        console.log(selectService)
        this.form.ghfdm = selectService.sfxm.filter(item => item.lx == 'GHF')[0].mxxh;
        this.form.zlfdm = selectService.sfxm.filter(item => item.lx == 'ZLF')[0].mxxh;
        this.form.money = this.getServiceMoney(this.form.fwlxdm);
        this.formOptions.serviceType.activeIndex = index;
      },
      getServiceMoney(fwlxdm){
        let selectService = fwlxdm ? this.formOptions.serviceType.list.filter(item => item.fwlxdm == fwlxdm)[0]:{};
        let money = selectService.sfxm ? selectService.sfxm.filter(item => item.lx == 'GHF')[0].dj*1 + selectService.sfxm.filter(item => item.lx == 'ZLF')[0].dj*1 : 0;
        return money;
      },
      getBallStyle(qddm){
        let _style = qddm ? this.channalList.filter(item => item.qddm == qddm)[0].style : {};
        return _style;
      },
      //科室选择不同医生
      handlerDepartChange(val){
        this.$wnhttp("PAT.WEB.APPOINTMENT.BASEINFO.Q04", {kstybm:val}).then(data => {
          this.formOptions.doctor.list = data;
        }).catch(err => {
          console.log(err);
        });
      },
      //选择不同医生刷新当前排班模板信息
      handleDocChange(val){
        this.$store.commit('scheduling/SET_CURRENTSCHEDULING', {
            ysdm:val
        });
        this.getDocScheduleList();//获取医生出班模板列表
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
        this.ifCover = false;
      },
      handleConfirm(){
        this.dialogVisible = false;
        this.ifCover = true;
        this.save();
      },
      //配置号序Dom切换
      channelChange(value) {console.log(value);
        this.formOptions.channel = value;
      },
      getSortList(){
        let newArr = [];
        var mynum = 0;
        for(var x = 0;x < this.channalList.length;x++){
          for(var y=0;y<this.channalList[x].num;y++){
            newArr.push(
              {
                fwlxdm:this.form.fwlxdm,
                ghfdm: this.form.ghfdm,
                hx:y+mynum+1,
                qddm:this.channalList[x].qddm,
                zlfdm:this.form.zlfdm,
                zydm:'',
                money:this.form.money,
                style:this.channalList[x].style});
          }
          mynum+=y;
        }
        this.form.hxzs=newArr.length;
        this.ballList = newArr;
        console.log('号序',this.ballList)
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
      }
    },
    components: {
      draggable
    },
    directives: {
      focus: {
        inserted: function (el) {
          // 聚焦元素
          el.select()
        }
      }
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
  .ordered.ZB {
    color: #0caf4e;
    background: #e6faef;
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
  .select{
    border:1px solid #1e90ff !important;
  }
  /******************************号序配置*******************************/

  .num-info {
    color: rgb(63, 169, 255);
  }
  .Channel {
    margin-left: 80px;
  }
  .UnChannel {
    margin-top: 20px;
  }
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
    margin:0 2% 15px 0;
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

  .ball-row>span>span>i{
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
  .ball-row>span>span>i>p.num{
    height:35px;
    line-height: 35px
  }
  .ball-row>span>span>i>p.price{
    margin-left:10px;
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

  .ball-row>div>span>i.hospital{
    border: 1px solid #c0e5ff;
    background: #e9f6ff;
    color: #20a0ff;
  }
  .ball-row>div>span>i.wechat{
    border: 1px solid #bcf1d4;
    background: #e7faf0;
    color: #0caf4e;
  }
  .ball-row>div>span>i.web{
    border: 1px solid #feebc3;
    background: #fff8ea;
    color: #e8a623;
  }
  .ball-row>div>span>i.official{
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
  }
  .ball-row > div > span > i > p.num {
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
  .changeType{
    padding: 10px;
    box-sizing: border-box;
  }
  .changeType>p{
    display: inline-block;
    width: 100%;
    height: 30px;
  }
  .changeType>.title{
    font-size: 14px;
    font-weight: bold;
    color: #333;
  }
  .changeType>p>.typename{
    color:#ffbf33 ;
  }
  .changeType>p>.price{
    color: #999;
    margin-right: 10px;
  }
  .changeType>p>.typeselect{
    width: 146px;
    margin-left: 10px;
    display: inline-block;
  }
  /******************************号序配置*******************************/
</style>

