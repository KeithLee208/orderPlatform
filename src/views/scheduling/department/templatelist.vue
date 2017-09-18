<template>
    <div v-loading="loading" element-loading-text="拼命加载中" class="page-main">
      <tpcard @click.native="handleLinkTo(num)" v-for="num in TpCard" :card="num">
      </tpcard>
    </div>
</template>

<script>
  import api from '../../../../api'
  import tpcard from 'components/base/card/tp-card'
  export default {
    data() {
      return {
        TpCard: [],
        creatVisible:false,
        loading:true,
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
        this.textInit();
      },
      textInit(){
        this.$wnhttp("PAT.WEB.APPOINTMENT.BASEINFO.Q01", {yydm:this.$store.state.login.userInfo.yydm}).then(data => {
          console.log('嘟嘟',data)
        }).catch(err => {
          this.$message('获取科室失败');
        });
      },
      cardlistInit() {
        this.$wnhttp("PAT.WEB.APPOINTMENT.SCHEDULE.Q00", { kstybm: this.$store.state.login.userInfo.ksdm,yydm:this.$store.state.login.userInfo.yydm }).then(data => {
          console.log(data)
          this.TpCard = data;
          this.loading=false;
        }).catch(err => {
          this.$message('暂无模板列表数据');
        });
      },
      handleLinkTo(card){
        //面包屑交互
        this.$store.commit('scheduling/SET_CRUMBS',{
          key:'tptable',
          val:[card.mbmc]
        });
        this.$store.commit('scheduling/SET_CURRENTSELECTTEMPLATE',card);
        console.log('当前所选模板信息 %o',this.$store.state.scheduling.currentsSelectTemplate);
      },
    }
  }
</script>
<style scoped>
  .page-head,
  .page-main {
    display: inline-block;
    width: 100%;
    padding-top: 10px;
  }
  .page-main{
    min-height: calc(100vh - 250px);
  }
</style>
