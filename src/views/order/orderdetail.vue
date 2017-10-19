<template>
  <div class="setting-wraaper">
    <div class="setting-header">
        <span class="pull-right">
          <i class="el-icon-close"></i>
        </span>
      <span>预约凭证打印</span>
    </div>
    <div class="set-body">
      <div class="box-title">
        <span>预约信息</span>
      </div>
      <el-form :model="orderForm" :inline="true" label-width="100px" class="demo-form-inline">
        <el-row>
          <el-col :span="8">
            <el-form-item label="预约医生：">
              {{orderForm.ysmc}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="服务类型：">
              {{orderForm.fuWuLeiXingEntity.fwlxmc}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="预约科室：">
              {{orderForm.ksmc}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="预约时间：">
             {{orderForm.cbrq}} {{orderForm.shiJianDuanEntity.sjdmc}}{{orderForm.shiJianDuanEntity.kssj}}-{{orderForm.shiJianDuanEntity.jssj}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="服务费用：">
              {{orderForm.fuWuLeiXingEntity.zlfdj}}元
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="就诊地址：">
              {{orderForm.czdz}}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
        <div class="fixed-line"></div>
        <div class="box-title">
          <span>患者基本信息 </span><p>就诊卡号：238288666528</p>
        </div>
        <el-form :model="patientForm" :inline="true" label-width="100px" class="demo-form-inline">
          <el-row>
            <el-col :span="8">
              <el-form-item label="姓名：">
                <span>{{patientForm.hzxm}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="性别：">
                {{patientForm.hzxb}}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证号：">
                {{patientForm.hzsfzh}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="联系电话：">
                {{patientForm.lxdh}}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系地址：">
                {{patientForm.lxdz}}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      <div class="fixed-line"></div>
      <div class="box-title">
        <span>患者凭证信息 </span>
      </div>
      <el-form :inline="true" label-width="100px" class="demo-form-inline">
        <el-row>
          <el-col :span="8">
            <el-form-item label="凭证号：">
              <el-input value="hp2013004"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="医院名称：">
              <el-input  value="黄埔院区"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="科室名称：">
              <el-input value="泌尿外科"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="服务类型：">
              <el-input  value="普通门诊"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系地址：">
              <el-input  placeholder="请输入民族" value="上海徐汇区浦北路323号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
       <span class="pull-right">
            <el-button type="defalut">取消</el-button>
            <el-button @click="orderPost" type="primary">预约并打印</el-button>
         </span>
    </div>

  </div>
</template>
<script>

  export default{
   data(){
   return{
     orderForm:{
       fuWuLeiXingEntity:{},
       shiJianDuanEntity:{}
     },//预约信息
     patientForm:{},//患者基本信息
     voucherForm:{}//凭证信息
   }
   },
    created(){
      this.$nextTick(() => {
        this.init();
      });
    },
    methods:{
      init(){
        this.detailGet();
      },
      detailGet(){
        this.orderForm=this.$store.state.order.detailInfo;
        this.patientForm=this.$store.state.order.patientInfo;
        console.log('this.patientForm',this.patientForm);
      },
      orderPost(){
       this.hxLock();
       this.orderRegister();
      },
     //号序状态修改-锁定
     hxLock(){
       let param={
         czry:'20000000.zjj1',
         xh:this.orderForm.nowXh,
       };
       console.log('param1',param);return
       this.$wnhttp("PAT.WEB.APPOINTMENT.REGISTRATION.Y12", param).then(data => {
         console.log(data);return;
         if(data==''){

         }else {

         }
       }).catch(err => {
         console.log(err);
       });
     },
     //预约登记
     orderRegister(){
       let param={
         czry:'20000000.zjj1',
         fscj:'',
         hx:this.orderForm.nowHx,
         hzdm:this.patientForm.hzdm,
         mxxh:this.orderForm.mxxh
       };
       console.log('param2',param);return
       this.$wnhttp("PAT.WEB.APPOINTMENT.REGISTRATION.Y01", param).then(data => {
         console.log(data);return;
         if(data==''){

         }else {

         }
     })
    },
     //预约记录状态修改-出凭据
     orderProof(){
        let param={
          czry:'20000000.zjj1',
          yyxh:'',
        };
        this.$wnhttp("PAT.WEB.APPOINTMENT.REGISTRATION.Y02", param).then(data => {
          console.log(data);return;
          if(data==''){

          }else {

          }
        })
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
  .box-title{
    width: 100%;
    height: 20px;
    line-height: 20px;

    display: inline-block;
    padding-left: 10px;
    margin-left: 12px;
    border-left: 6px solid #3f51b5;
    margin-bottom: 15px;
  }
  .box-title>span{
    font-size: 16px;
    font-weight: bold;
    float: left;
  }
  .box-title>p{
    color: #999;
    font-size: 14px;
    float: left;
    margin-left: 20px;

  }
.padding-left-15{
  padding-left: 15px;
}
  .fixed-line{
    width: 100%;
    display: inline-block;
    border-bottom: 1px dashed #e0e0e0;
    float: left;
    margin: 0px 0 20px;
  }
</style>

