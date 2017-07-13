<template>
  <div>
    <div class="page-head">
      <span class="creat-btn">
      <el-button class="btn-blue" @click="CreatVisible = true" type="primary">创建模板</el-button>
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
                <el-button type="primary" @click="MsgSuccess">创 建</el-button>
              </span>
    </el-dialog>
    <div class="page-main">
        <tpcard v-for="num in TpCard" :card="num">
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
        }
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
          this.TpCard = data.Response.Body;
        console.log( this.TpCard);
      })
      },
      MsgSuccess(){
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
