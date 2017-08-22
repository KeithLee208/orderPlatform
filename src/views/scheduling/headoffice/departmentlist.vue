<template>
  <div class="setting-wraaper">
    <div class="setting-header">
      <div class="pull-right">
        <div class="top-search pull-left">
          <input class="top-searchinput pull-left" placeholder="搜索院区／科室／医生">
          <i class="iconfont icon-sousuo"></i>
        </div>
        <router-link
          :to="'/scheduling/headoffice/templatelist'" >
          <i class="el-icon-close"></i>
        </router-link>
      </div>
      <router-link tag="span" to="/scheduling/headoffice/templatelist">
        <i class="el-icon-arrow-left"></i>
        <span v-for="(item,index) in crumbs">{{item}}<span v-if="index != crumbs.length-1"> / </span></span>
      </router-link>
      <span class="used-time"> <i class="el-icon-time"></i>使用时间：2017/03/02-2017/05/02</span>
    </div>
    <div class="setting-body">
      <div class="setting-main" v-loading="loading" element-loading-text="拼命加载中">
        <div class="page-head">
          <div class="type-filter">
            <!--<span><i class="el-icon-menu all"></i>全部</span>-->
            <!--<span class="submit"><i></i>已提交（10）</span>-->
            <!--<span class="unsubmit"><i></i>待提交（2）</span>-->
            <span class="pull-right">
              <router-link tag="span" to="/scheduling/headoffice/sortcostset">
                <el-button class="btn-blue"  type="primary">设置费用及号序</el-button>
                </router-link>
              </span>
          </div>
        </div>
        <div class="Att-list-body">
          <div class="Att-row" v-for="(item,index) in attList">
            <div class="Att-row-lable">
              <el-checkbox :indeterminate="item.isIndeterminate" v-model="item.allChecked"  @change="event=>AllChange(event,index)">{{item.name}}</el-checkbox>
            </div>
            <div class="Att-row-data">
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group @change="ListChange(index)" v-model="checkedAttlist" >
                <span class="radiobox" v-for="(att,index) in item.children">
                  <el-popover :open-delay="500"  placement="bottom" width="200" trigger="hover">
                  <el-checkbox  slot="reference" style="color: rgb(32, 178, 255);" :label="att" :key="att">{{att.ksmc}}</el-checkbox>
                  <div class="fixed-info">
                  <p class="fixed-info-title">门诊号源信息</p>
                  <p><i class="default"></i>普通（10）</p>
                  <p><i class="expert"></i>专家（2）</p>
                  <p><i class="disease"></i>专病（3）</p>
                  <p><i class="union"></i>联合（4）</p>
                  <p><i class="VIP"></i>特需（5）</p>
                 </div>
                </el-popover>
                </span>
              </el-checkbox-group>
            </div>
          </div>
        </div>
        <div style="position: fixed;bottom: 0;left:0;width: 100%;box-sizing: border-box;padding: 0px 50px;height: 72px;background:#fff;z-index:9;line-height: 72px;border-top: 1px solid #ddd;
        box-shadow:0 -1px 5px 0 rgba(221,221,221,.5) ">
        <span class="pull-right">
          <el-button class="btn-blue"  type="primary">导出</el-button>
          <router-link tag="span" to='/scheduling/headoffice/tptable'>
             <el-button @click="postCheckList" class="btn-blue"  type="primary">设置出班</el-button>
          </router-link>
        </span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import api from '../../../../api'
  import * as listArray from '../../../filters/array'

  export default {
    data() {
      return {
        crumbs:[],//面包屑数据
        loading:true,
        attList: [],
        checkList:[],//用于全选的科室列表
        checkedAttlist:[],//已选中的科室value数组
      }
    },
    created() {
      this.$nextTick(() => {
        this.getCrumbs();//获取面包屑数据
        this.TpListInit(); //科室列表
    })
    },
    methods: {
      //全选改变时
     AllChange(event,index) {
        this.checkedAttlist =  event.target.checked ? this.attList[index].children: [];
        this.attList[index].isIndeterminate = false;
      },
      //单选改变时
      ListChange(index) {
        let checkedCount = this.checkedAttlist.length;
        this.attList[index].allChecked = checkedCount === this.attList[index].children.length;
        this.attList[index].isIndeterminate = checkedCount > 0 && checkedCount < this.attList[index].children.length;
      },
      //获取面包屑数据
      getCrumbs(){
        this.crumbs = this.$store.state.scheduling.crumbs.tplist;
      },
      diseaseInit() {
        this.$wnhttp("PAT.WEB.APPOINTMENT.BASEINFO.Q07", {
          kstybm: '20000000.1.1.0320',
          yydm:this.$store.state.login.userInfo.yydm
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
          kstybm: '20000000.1.1.0320',
          yydm:this.$store.state.login.userInfo.yydm
        }).then(data => {
        let newArr = listArray.classifyCheckArr(data, 'sjksbm');
        let selcetArr = [];
        this.attList = newArr;
        this.loading=false;
        for (var i = 0; i < data.length; i++) {
          selcetArr.push({
            ksbm: data[i].ksbm,
            ksmc: data[i].ksmc
          });
          this.checkList.push({ksmc:data[i].ksmc,ksbm:data[i].ksmc});
        }

      }).catch(err => {
          console.log(err);
        //这里错误有2种错误
        //1. 服务端业务错误，错误码邮件中有
        //2. 网络错误，本地网络断开、超时等
      });
      }, //科室列表
      postCheckList(){
          console.log('绑定的数组 %o',this.checkedAttlist);
        this.$store.commit('scheduling/SET_CURSELDEPARTLIST', this.checkedAttlist)
      }//已选科室传值
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
    padding: 20px 20px 80px;
    box-sizing: border-box;
    display: inline-block;
  }

  .setting-main {
    width: 100%;
    min-height: 790px;
    display: inline-block;
    background: #fff;
    box-sizing: border-box;
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


  .setting-wraaper {
    position: absolute;
    display: inline-block;
    top: 0;
    left: 0;
    width: 100%;
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
    border-bottom: 1px dashed #E7ECF4;
    padding-bottom: 15px;
  }

  .Att-row-data .radiobox {
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
