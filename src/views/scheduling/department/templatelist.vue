<template>
  <div>
    <div v-if="TpCard" v-loading="loading" element-loading-text="拼命加载中" class="page-main">
      <router-link to="/scheduling/Department/tptable"
                   exact tag="span">
      <tpcard @click.native="handleLinkTo(card)" v-for="card in TpCard" :card="card">
      </tpcard>
      </router-link>
    </div>
    <div v-if="TpCard==''" class="no-data">
      暂无出班模板
    </div>
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
      },
      cardlistInit() {
        this.$wnhttp("PAT.WEB.APPOINTMENT.SCHEDULE.Q00", {
          kstybm: this.$store.state.login.userInfo.ksdm,
          yydm:this.$store.state.login.userInfo.yydm
        }).then(data => {
          if(data==''){
            this.TpCard='';
            this.$message('暂无模板列表数据');
            this.loading=false;
          }else {
            this.TpCard = data;
            this.loading=false;
          }
        }).catch(err => {

        });
      },
      //卡片点击事件
      handleLinkTo(card){
        //面包屑交互
        this.$store.commit('scheduling/SET_CRUMBS',{
          key:'tptable',
          val:[card.mbmc]
        });
        this.$store.commit('scheduling/SET_CURRENTSELECTTEMPLATE',card);
        /**
         - 定义事件通道，科室权限点击卡片
         - @param mbmc 模板名称
         - @param mbdm 模板编码
         - @param 通道命名：scheduling/department/tptable/getMBBM[模块名称/文件夹名称/文件名称/方法名称]
         - @author sven 2017/10/12
         */
        this.$root.eventHub.$emit('scheduling/department/tptable/getMBBM',{mbmc:card.mbmc,mbdm:card.mbdm});
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
  .no-data{
    width: 100%;
    height:500px;
    line-height: 500px;
    font-size: 24px;
    color: #999;
    text-align: center;
    vertical-align: middle;
  }
</style>
