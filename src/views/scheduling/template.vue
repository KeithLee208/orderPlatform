<template>
  <div>
    <div class="page-head">
       <el-button class="pull-right" type="primary" size="small">创建模板</el-button>
    </div>
    <div class="page-main">
      <tpcard v-for="num in TpCard" :card="num"></tpcard>
    </div>
  </div>
</template>

<script>
  import api from '../../../api'
  import tpcard from 'components/base/card/tp-card.vue'
  export default{
    data(){
      return {
        TpCard:[]
      }
    },
    created(){
      this.$nextTick(()=>{
        this.CardlistInit();
      })
    },
    components: {tpcard},
    methods:{
      CardlistInit(){
        api.get(api.url.Scheduling.Template).then(data => {
          this.TpCard=data;
        console.log(this.TpCard);
      })
      }
    }
  }
</script>

<style scoped>
.pull-right{
  float: right;
}
.page-head,.page-main{
  display: inline-block;
  width: 100%;
}

</style>
