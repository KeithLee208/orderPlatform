<template>
  <div>
    <div class="page-head">
      <span class="creat-btn">
      <el-button :plain="true" type="info">创建模板</el-button>
      </span>
    </div>
    <div class="page-main">
      <tpcard v-for="num in TpCard" :card="num"></tpcard>
    </div>
  </div>
</template>

<script>
  import api from '../../../../api'
  import tpcard from '../../../components/base/card/tp-card'
  export default {
    data() {
      return {
        TpCard: []
      }
    },
    created() {
      this.$nextTick(() => {
        this.CardlistInit();
    })
    },
    components: {
      tpcard
    },
    methods: {
      CardlistInit() {
        api.get(api.url.Scheduling.Template).then(data => {
          this.TpCard = data;
      })
      }
    }
  }
</script>

<style scoped>
  .page-head,
  .page-main {
    display: inline-block;
    width: 100%;
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
</style>
