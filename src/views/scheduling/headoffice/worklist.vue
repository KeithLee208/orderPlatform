<template>
    <div class="setting-body">
            <div class="Att-list-title">
               <span class="setting-btn">
                 <el-button class="pull-right btn-blue" @click="SettingVisible=true" type="primary" >设置出班</el-button>
               </span>
              <el-dialog title="设置出班" :visible.sync="SettingVisible" size="tiny">
              <div>
                <el-form ref="form" :model="form" label-width="80px">
                  <el-form-item label="选择模板">
                    <el-select v-model="settingForm.mbdm"  placeholder="请选择模板">
                      <el-option v-for="item in temList" :label="item.mbmc" :value="item.mbdm"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="开始时间">
                    <el-date-picker v-model="settingForm.kssj" type="date" placeholder="选择日期" >
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="结束时间">
                    <el-date-picker v-model="settingForm.jssj" type="date" placeholder="选择日期" ></el-date-picker>
                  </el-form-item>
                </el-form>
            </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="SettingVisible = false">取 消</el-button>
                <el-button type="primary" @click="settingFormPost">确定</el-button>
              </span>
              </el-dialog>
            </div>
      <div class="Att-list-body">
        <div class="Att-row" v-for="item in departmentList">
          <div class="Att-row-lable">
            {{item.name}}
          </div>
          <div class="Att-row-data">
            <span v-for="(att,index) in item.children">
               <router-link to="/scheduling/headoffice/worktable" exact tag="span">
                  <el-button @click="postDepartment(att)" type="text">{{att.ksmc}}</el-button>
              </router-link>
            </span>
          </div>
        </div>
      </div>
      </div>
</template>
<script>
  import * as listArray from '../../../filters/array'
  export default {
    data() {
      return {
        attList:[],
        SettingVisible:false,
        form: {
          region: '',
          date1: '',
          date2: ''
        },
        settingForm:{
          mbdm:'',
          kssj:'',
          jssj:''
        },
        departmentList:[],
        temList:[]
      }
    },
    created(){
      this.$nextTick(() => {
        this.init();
    })
    },
    computed: {
    },
    methods: {
      init(){
        //获取科室列表
        this.getDepartmentList();
        //设置出班弹框中获取模板列表
        this.getTemList();
      },
      getDepartmentList(){
        this.departmentList = this.$store.state.scheduling.departmentList;
        console.log('this.departmentList',this.departmentList);
        let newArr = listArray.classifyCheckArr( this.departmentList, 'sjksmc');
        this.departmentList=newArr;
      },
      getTemList(){
        this.$wnhttp("PAT.WEB.APPOINTMENT.SCHEDULE.Q00", {yydm:this.$store.state.login.userInfo.yydm }).then(data => {
          this.temList = data;
          console.log( this.temList);
        }).catch(err => {
          this.$message('暂无模板列表数据');
        });
      },
      //设置出班表单提交
      settingFormPost(){
        this.SettingVisible = false;
        this.settingForm.kssj=this.dateFormat(this.settingForm.kssj);
        this.settingForm.jssj=this.dateFormat(this.settingForm.jssj);
        this.$wnhttp("PAT.WEB.APPOINTMENT.SCHEDULE.S03", this.settingForm).then(data => {
          this.$message('设置出班成功');
        }).catch(err => {
          console.log(err);
        });
      },
      postDepartment(value){
        this.$store.commit('scheduling/SET_HEADOFFICEPOSTLIST',value);
        console.log('value',value);
      },
      dateFormat(date){
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
      }
    },
  }
</script>


<style scoped>
  .setting-body {
    margin-top: 20px;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    display: inline-block;
    background: #fff;
  }
  .setting-main {
    width: 100%;
    height: 790px;
    display: inline-block;
    background: #fff;
    padding: 20px;
    box-sizing: border-box;
  }
  .Att-list-title{
    color: #999;
    margin-bottom: 10px;
    position: relative;
  }
  .Att-list-title>.name{
    color: #333;
    margin-right: 20px;
  }
  .Att-list-title>span>i{
    font-size: 14px;
    margin-right: 5px;
  }
  .Att-row{
    width: 100%;
    display: inline-block;
    position: relative;
    margin-bottom: 10px;
    cursor: default;
  }
  .Att-row>.Att-row-lable{
    font-weight: bold;
    font-size: 14px;
    width: 100%;
    height: 20px;
    line-height: 20px;

  }
  .Att-row>.Att-row-data{
    width: 100%;
    box-sizing: border-box;
    display: inline-block;
    border-bottom: 1px dashed #E7ECF4;
    padding-bottom: 15px;
  }
  .Att-row-data>span{
    float: left;
    width: 185px;
    height: 30px;
    line-height: 30px;
    color: rgb(32,178,255);
  }
  .fixed-info-title{
    font-size: 14px;
  }
  .fixed-info > p {
    display: inline-block;
    cursor: default;
    width: 100%;
    padding: 5px;
    height: 25px;
  }

  .fixed-info > .default >i {
    background: #fff;
  }
  .fixed-info > .expert{
    color: rgb(87, 179, 255);
  }
  .fixed-info > .expert > i {
    border: 1px solid rgb(192, 229, 255);
    background: rgb(233, 246, 255);
  }
  .fixed-info > .disease{
    color:rgb(48, 182, 88) ;
  }
  .fixed-info > .disease >i {
    border: 1px solid rgb(188, 241, 212);
    background: rgb(231, 250, 240);
  }
  .fixed-info >.union{
    color:rgb(240, 196, 99) ;
  }
  .fixed-info >.union >i{
    border: 1px solid rgb(254, 235, 195);
    background: rgb(255, 248, 234);
  }
  .fixed-info > .VIP{
    color: rgb(255, 93, 82)
  }
  .fixed-info > .VIP>i {
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
  .setting-btn{
    position: absolute;right: -20px;top: -70px;
  }
</style>
