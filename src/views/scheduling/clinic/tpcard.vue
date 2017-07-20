<template>
  <div>
    <div class="page-head">
      <span class="creat-btn">
      <el-button v-if="$store.state.login.userInfo.type === '门办'" class="btn-blue" @click="CreatVisible = true" type="primary">创建模板</el-button>
      </span>
    </div>
    <el-dialog title="模板名称" :visible.sync="CreatVisible" size="tiny">
              <div>
                <el-form ref="form" :model="form" label-width="80px">
                    <el-input placeholder="请输入模板名称" v-model="form.name"></el-input>
                </el-form>
            </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="CreatVisible = false">取 消</el-button>
                <el-button type="primary" @click="msgSuccess">创 建</el-button>
              </span>
    </el-dialog>
    <div class="page-main">
        <tpcard @click.native="handleLinkTo(num)" v-for="num in TpCard" :card="num">
        </tpcard>
    </div>
  </div>
</template>

<script>
  import api from '../../../../api'
  import tpcard from '../../../components/base/card/tp-card'
  export default {
    data() {
      return {
        TpCard: [],
        CreatVisible:false,
        form:{
          name:''
        },
        userType:this.$store.state.login.userInfo.type
      }
    },
    created() {
      this.$nextTick(() => {
        this.cardlistInit();
      })
    },
    components: {
      tpcard
    },
    methods: {
      handleLinkTo(card){
        if(this.$store.state.login.userInfo.type === '科室'){
          this.$store.commit('scheduling/SET_CRUMBS',{
            key:'tptable',
            val:[card.mbmc,'科室']
          })
        }else if(this.$store.state.login.userInfo.type === '门办'){
          this.$store.commit('scheduling/SET_CRUMBS',{
            key:'tplist',
            val:[card.mbmc]
          })
        }
      },
      cardlistInit() {
        this.$wnhttp("PAT.WEB.APPOINTMENT.SCHEDULE.Q00", { kstybm: '20000000.1.1.0320' }).then(data => {
          this.TpCard = data;
          console.log(data);
        }).catch(err => {
          console.log(err);
          //这里错误有2种错误
          //1. 服务端业务错误，错误码邮件中有
          //2. 网络错误，本地网络断开、超时等
        });
      },
      msgSuccess(){
        this.CreatVisible=false;
        this.$message({
          message: '创建成功！',
          type: 'success'
        });
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
</style>
