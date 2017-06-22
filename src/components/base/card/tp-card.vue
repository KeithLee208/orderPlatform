<template>
  <div class="tp-card">
    <p>{{card.TemplateName}} {{card.UseState}}</p>
    <p>使用时间：{{card.StartTime}}-{{card.EndTime}}</p>
    <p>科室数量：{{card.DepartmentNum}}个</p>
    <p>普通门诊：{{card.DefaultClinic}}个</p>
    <p>专家门诊：{{card.SpecialistClinic}}个</p>
    <p>联合门诊：{{card.CombinedClinic}}个</p>
    <p>特需门诊：{{card.VIPClinic}}个</p>
  </div>
</template>

<script>
  export default{
    name: 'tp-card',
    props: ['card'],
  }
</script>

<style scoped>
  .tp-card{
    width: 265px;
    height: 244px;
    float: left;
    border: 1px solid #e0e0e0;
    margin: 5px 19px 5px 19px;
    box-sizing: border-box;
    padding: 10px;
  }
  .tp-card>p{
    height: 30px;
    line-height: 30px;
  }
</style>
