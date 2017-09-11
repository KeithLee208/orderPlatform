<template>
  <div>
    <div class="page-head">
      <span class="creat-btn">
      <el-button class="btn-blue" @click="creatVisible = true" type="primary">创建模板</el-button>
      </span>
    </div>
    <el-dialog title="模板名称" :visible.sync="creatVisible" size="tiny">
              <div>
                <el-form ref="form" :model="form" label-width="80px">
                    <el-input placeholder="请输入模板名称" v-model="form.name"></el-input>
                </el-form>
            </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="creatVisible = false">取 消</el-button>
                <el-button type="primary" @click="newTemplate">创 建</el-button>
              </span>
    </el-dialog>
    <div v-loading="loading" element-loading-text="拼命加载中" class="page-main">
        <div class="type-filter">
        <span @click="allTemList"><i class="el-icon-menu all"></i>全部</span>
        <span :class="['used',{active:UsedActive}]" @click="UsedTemList"><i></i>启用</span>
        <span :class="['stop',{active:StopActive}]" @click="StopTemList"><i></i>停用</span>
      </div>
        <tpcard @click.native="handleLinkTo(num)" v-for="num in TpCard" :card="num">
        </tpcard>
    </div>
  </div>
</template>

<script>
  import api from '../../../../api'
  import tpcard from '../../../components/base/card/tp-card'
  import * as arr from 'filters/array.js'
  export default {
    data() {
      return {
        TpCard: [],
        creatVisible:false,
        loading:true,
        StopActive:false,
        UsedActive:false,
        allList:[],
        filterList:[],
        form:{
          name:''
        },
        userType:this.$store.state.login.userInfo.type
      }
    },
    created() {
      this.$nextTick(() => {
          this.init();
      })
    },
    components: {
      tpcard
    },
    methods: {
      init(){
        this.cardlistInit();
      },
      cardlistInit() {
        this.$wnhttp("PAT.WEB.APPOINTMENT.SCHEDULE.Q00", { kstybm: '',yydm:this.$store.state.login.userInfo.yydm }).then(data => {
          this.TpCard = data;
          this.allList=arr.clone(this.TpCard);
          this.loading=false;
        }).catch(err => {
          console.log(err);
          //这里错误有2种错误
          //1. 服务端业务错误，错误码邮件中有
          //2. 网络错误，本地网络断开、超时等
        });
      },
      handleLinkTo(card){
        this.$store.commit('scheduling/SET_CRUMBS',{
          key:'tplist',
          val:[card.mbmc]
        })
        this.$store.commit('scheduling/SET_CURRENTSELECTTEMPLATE',card);
        console.log('当前所选模板信息 %o',this.$store.state.scheduling.currentsSelectTemplate);
      },
      newTemplate(){
        let params = {
          czry:this.$store.state.login.userInfo.userName,
          yydm:this.$store.state.login.userInfo.yydm,
          mbmc:this.form.name
        };
        this.$wnhttp("PAT.WEB.APPOINTMENT.SCHEDULE.S00", params).then(data => {
          this.creatVisible = false;
          this.$message({
            message: '创建成功！',
            type: 'success'
          });
        }).catch(err => {
          console.log(err);
          //这里错误有2种错误
          //1. 服务端业务错误，错误码邮件中有
          //2. 网络错误，本地网络断开、超时等
        });
        this.cardlistInit();
      },
      allTemList(){
        this.StopActive=false;
        this.UsedActive=false;
        this.TpCard=this.allList;
      },
      UsedTemList(){
        let newArr=[];
        let newArr2=[];
        newArr=arr.clone(this.allList);
        for(let i=0;i<newArr.length;i++){
          if(newArr[i].yxzt=='YX')  newArr2.push(newArr[i]);
        }
        this.TpCard=newArr2;
        this.StopActive=false;
        this.UsedActive=true;
      },
      StopTemList(){
        let newArr=[];
        let newArr2=[];
        newArr=arr.clone(this.allList);
        for(let i=0;i<newArr.length;i++){
         if(newArr[i].yxzt!=='YX')
         {
           newArr2.push(newArr[i]);
         }
        }
        this.TpCard=newArr2;
        this.UsedActive=false;
        this.StopActive=true;
      }
    },
  }
</script>

<style scoped>
  .page-head,
  .page-main {
    display: inline-block;
    width: 100%;
  }
  .page-main{
    min-height: calc(100vh - 250px);
  }
  .page-head {
    box-sizing: border-box;
    position: relative;
  }

  .pagebody {
    background: none;

  }
  .creat-btn{
    position: absolute;right: 20px;top: -45px;

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
  .type-filter{
    height: 30px;line-height: 30px;
  }
  .type-filter > span {
    display: inline-block;
    cursor: default;
    margin-right: 10px;
  }
  .type-filter > span>i{
    margin-top: 7px;
  }
  .type-filter > span > i{
    width: 16px;
    height: 16px;
    float: left;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    margin-right:5px;
    cursor: pointer;
  }
  .type-filter > span > .all {
    border: 1px solid transparent;
    color: #e0e0e0;
    font-size: 16px;
  }
  .type-filter > .stop > i{
    border: 1px solid rgb(255, 204, 204);
    background: rgb(255, 237, 237);
  }
  .type-filter > .stop.active > i{
    background: rgb(255, 204, 204);
  }
  .type-filter > .used > i{
    border: 1px solid rgb(188, 241, 212);
    background: rgb(231, 250, 240);
  }
  .type-filter > .used.active > i{
    background: rgb(188, 241, 212);
  }
</style>
