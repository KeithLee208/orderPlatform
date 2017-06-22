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
    position: relative;
    width: 265px;
    height: 244px;
    float: left;
    border: 1px solid #e0e0e0;
    margin: 5px 19px 10px 19px;
    box-sizing: border-box;
    padding: 10px;
    bottom: 0px;
    transition:all .4s;
    cursor: default;
    box-shadow: 0px 0px 5px 0px rgba(128, 128, 128, 0.5);

  }
  .tp-card:hover{
    bottom: 3px;
    box-shadow: 0px 0px 10px 0px rgba(0, 125, 251, 0.5);
  }
  .tp-card>p{
    height: 30px;
    line-height: 30px;
  }

</style>
