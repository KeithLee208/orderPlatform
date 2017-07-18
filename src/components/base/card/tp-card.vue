<template>
  <router-link :to="$store.state.login.userInfo.type === '科室'?'/scheduling/clinic/tptable':'/scheduling/clinic/tplist'"
               exact tag="span">
    <transition name="el-zoom-in-top">
  <div v-if="CardShow" class="tp-card" @mouseenter="handleTpCardMouseOver()" @mouseleave="handleTpCardMouseLeave()">
    <div class="tp-card-head">
      <p v-if="$store.state.login.userInfo.type === '医务科'">
         <span class="tp-card-title">{{card.mbmc}}</span>
         <span v-if="card.shzt==='TG'" class="pull-right">
           <span class="start">审核通过</span>
         </span>
        <span v-if="card.shzt==='BG'" class="pull-right">
           <span class="unstart">不通过</span>
         </span>
        <span v-if="card.shzt==='WS'" class="pull-right">
           <span class="unstart">未审核</span>
         </span>
        <span v-if="card.shzt==='SZ'" class="pull-right">
           <span class="unstart">审核中</span>
         </span>
      </p>
      <p v-if="$store.state.login.userInfo.type === '科室'">
        <span class="tp-card-title">{{card.mbmc}}</span>
        <span v-if="card.shzt==='TG'" class="pull-right">
           <span class="start">已提交</span>
         </span>
        <span v-if="card.shzt==='BG'" class="pull-right">
           <span class="unstart">待提交</span>
         </span>
        <span v-if="card.shzt==='WS'" class="pull-right">
           <span class="unstart">数据有更新，待提交</span>
         </span>
      </p>
      <p v-if="$store.state.login.userInfo.type === '门办'">
        <span class="tp-card-title">{{card.mbmc}}</span>
      </p>
      <p class="used-time">使用时间：{{card.StartTime}}-{{card.EndTime}}</p>

    </div>
    <div class="tp-card-body">
    <p v-if="$store.state.login.userInfo.type != '科室'" class="tp-card-ksnum">
      <span >科室数量：</span>
      <span>{{card.DepartmentNum}}</span>
    </p>
    <p>
      <span>普通门诊：</span>
      <span class="tp-num pull-right">{{card.DefaultClinic}}</span>
    </p>
    <p>
      <span>专家门诊：</span>
      <span class="tp-num pull-right">{{card.SpecialistClinic}}</span>
    </p>
    <p>
      <span>联合门诊：</span>
      <span class="tp-num pull-right">{{card.CombinedClinic}}</span>
    </p>
    <p>
      <span>特需门诊：</span>
      <span class="tp-num pull-right">{{card.VIPClinic}}</span>
    </p>
    <p class="submit" >
       <span v-if="$store.state.login.userInfo.type === '科室'">提交至医务科</span>
       <span v-else-if="$store.state.login.userInfo.type === '医务科'">提交至门办</span>
    </p>
    <transition name="el-fade-in-linear">
      <div v-if="TimeShow==false" v-on:click.stop="DeleteCard()" class="tp-card-close">
        <i class="el-icon-close"></i>
      </div>
    </transition>
    </div>
  </div>
      </transition>
  </router-link>
</template>

<script>
  export default{
    name: 'tp-card',
    props: ['card'],
    data(){
      return{
      TimeShow:true,
      CardShow:true
      }
    },
    methods:{
      DeleteCard(){
        this.CardShow=false;
      },
      handleTpCardMouseOver(){
        this.TimeShow=false;
      },
      handleTpCardMouseLeave(){
        this.TimeShow=true;
      }
    }
    }
</script>

<style scoped>
  .page-main>a,.page-main>a:hover,.page-main>a:active{
    color: #666;
  }
  .tp-card{
    position: relative;
    height: 315px;
    float: left;
    border:1px solid transparent;
    margin: 5px 1% 10px 0;
    box-sizing: border-box;
    bottom: 1px;
    transition:all .2s;
    cursor: default;
    background: #fff;
    border-radius:2px ;
  }
  @media screen and (max-width: 1440px) {
    .tp-card{
      min-width: 250px;
      width: 19%;
    }
  }
  @media screen and (max-width: 1920px) {
    .tp-card{
      min-width: 260px;
      width: 19%;
    }
  }
  @media screen and (max-width: 1366px) {
    .tp-card{
      min-width: 310px;
      width: 24%;
    }
  }
  @media screen and (max-width: 1024px) {
    .tp-card{
      min-width: 300px;
      width: 32%;
    }
  }
  .tp-card:hover{
    bottom: 3px;
    border: 1px solid rgba(132, 166, 181,.6);
    box-shadow: 0 0 15px rgba(63,81,181, 0.3);
  }
  .tp-card:hover .submit{
    display: block;
  }
  .tp-card p{
    height: 35px;
    line-height: 35px;
  }
  .submit {
    color: #3F51B5 !important;
    display: none;
    position: absolute;
    right: 25px;
    bottom: 5px;
  }
.tp-card-head{
  padding: 25px 25px 10px 25px;
  border-bottom: 1px dashed #e0e0e0;
}
.tp-card-body{
  padding: 10px 25px;
}
  .start,.unstart{
    height: 30px;
    line-height: 30px;
    text-align: center;
    display: inline-block;
    border-radius: 4px;
    color: #fff;
  }
  .start{
    color: rgb(19,188,87);
  }
  .unstart{
    color: rgb(204,204,204);
  }
  .tp-card-title{
    color: #333333;
    font-size: 16px;
    font-weight: bold;
  }
  .tp-card-body>p,.used-time{
  color: #999;
  }
  .tp-card-ksnum>span{
    font-size: 14px;
    color: #6FA6E1;
  }
  .tp-card-close{
   position: absolute;
    top: 6px;
    right: 10px;
    color:#999;
    cursor: pointer;

   }
  .tp-card-close>i{
    font-size: 12px;
  }
  .tp-card-body>p>.tp-num{
    font-size: 13px;
    font-weight: bold;
    color: #333;
  }
</style>
