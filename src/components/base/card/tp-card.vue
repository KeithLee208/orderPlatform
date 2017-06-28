<template>
  <router-link to="/scheduling/templatesetting">
  <div class="tp-card" @mouseenter="handleTpCardMouseOver()" @mouseleave="handleTpCardMouseLeave()">
    <div class="tp-card-head">
      <p>
         <span class="tp-card-title">{{card.TemplateName}}</span>
         <span v-if="card.UseState==='正在使用'" class="pull-right">
           <span class="start">{{card.UseState}}</span>
         </span>
        <span v-if="card.UseState==='未启用'" class="pull-right">
           <span class="unstart">{{card.UseState}}</span>
         </span>
      </p>

      <p v-if="TimeShow==='true'">使用时间：{{card.StartTime}}-{{card.EndTime}}</p>

    </div>
    <p class="tp-card-ksnum">
      <span class="font-color-333">科室数量：</span>
      <span class="pull-right">{{card.DepartmentNum}}个</span>
    </p>
    <p>
      <span>普通门诊：</span>
      <span class="pull-right">{{card.DefaultClinic}}个</span>
    </p>
    <p>
      <span>专家门诊：</span>
      <span class="pull-right">{{card.SpecialistClinic}}个</span>
    </p>
    <p>
      <span>联合门诊：</span>
      <span class="pull-right">{{card.CombinedClinic}}个</span>
    </p>
    <p>
      <span>特需门诊：</span>
      <span class="pull-right">{{card.VIPClinic}}个</span>
    </p>

    <div v-if="TimeShow==='false'" class="tp-card-footer">
      <el-button type="success">提交模板</el-button>
    </div>

  </div>
  </router-link>
</template>

<script>
  export default{
    name: 'tp-card',
    props: ['card'],
    data(){
      return{
      TimeShow:'true'
      }
    },
    methods:{
      handleTpCardMouseOver(){
        this.TimeShow='false';
      },
      handleTpCardMouseLeave(){
        this.TimeShow='true';
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
    min-width: 310px;
    width: 24%;
    height: 300px;
    float: left;
    border: 1px solid #e0e0e0;
    margin: 5px 1% 10px 0;
    box-sizing: border-box;
    padding: 10px;
    bottom: 0px;
    transition:all .1s;
    cursor: default;
    background: #fff;


  }
  .tp-card:hover{
    bottom: 3px;
    box-shadow: 0px 0px 5px 0px rgba(128, 128, 128, 0.5);
  }
  .tp-card p{
    height: 40px;
    line-height: 40px;
  }
.tp-card-head{
  border-bottom: 1px solid #e0e0e0;
}
  .start,.unstart{
    padding: 0 10px 0 10px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    display: inline-block;
    border-radius: 6px;
    color: #fff;
  }
  .start{
    background: rgb(19,188,87);
  }
  .unstart{
    background: rgb(204,204,204);
  }
  .tp-card-title{
    font-size: 16px;
  }
  .tp-card-ksnum{
    font-size: 14px;
    color: #333;
  }
  /*@media screen and (max-width:1025px){*/
    /*.tp-card {*/
/*display: none;*/
    /*}*/
  /*}*/

</style>
