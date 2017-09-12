<template>
  <div>
    <transition name="el-zoom-in-top">
      <router-link :to="{path:$store.state.login.userInfo.type === '科室'?
                '/scheduling/department/tptable':'/scheduling/headoffice/departmentlist'}"
                     exact tag="span">
      <div v-if="CardShow" class="tp-card">
        <div class="tp-card-head">
          <p>
            <span class="tp-card-title">{{card.mbmc}}</span>
            <span v-if="card.yxzt=='YX'" class="pull-right">
           <span class="start">启用</span>
         </span>
            <span v-if="card.yxzt!=='YX'" class="pull-right">
           <span class="unstart">停用</span>
         </span>
          </p>
        </div>
        <div class="tp-card-body">
          <!--<p v-if="$store.state.login.userInfo.type != '科室'" class="tp-card-ksnum">-->
            <!--<span>已提交科室数量：</span>-->
            <!--<span>{{card.DepartmentNum}}</span>-->
          <!--</p>-->
          <p v-for="template in card.fwlxtj">
            <span>{{template.fwlxmc}}：</span>
            <span class="tp-num pull-right">{{template.fwlxsl}}</span>
          </p>
          <p class="emt-card" v-if="card.fwlxtj==''">暂无服务明细</p>
          <!--<transition name="el-fade-in-linear">-->
            <!--<div v-if="$store.state.login.userInfo.type != '科室'" v-on:click.stop="deleteCard()" class="tp-card-close">-->
              <!--<i class="el-icon-close"></i>-->
            <!--</div>-->
          <!--</transition>-->
        </div>
        <div v-if="$store.state.login.userInfo.type === '门办'" v-on:click.stop="SubmitVisible = true" class="tp-card-footer">
          <span v-if="card.yxzt=='YX'">停用模板</span>
          <span v-if="card.yxzt!=='YX'">启用模板</span>

        </div>
        <el-dialog
          title="提示"
          :visible.sync="SubmitVisible"
          size="tiny"
          >
          <span>确定停用此模板？</span>
          <span slot="footer" class="dialog-footer">
    <el-button v-on:click.stop="SubmitVisible = false">取 消</el-button>
    <el-button type="primary" v-on:click.stop="SubMsg(card)">确 定</el-button>
  </span>
        </el-dialog>
      </div>
      </router-link>
    </transition>
  </div>
</template>

<script>
  export default{
    name: 'tp-card',
    props: ['card'],
    data(){
      return{
        CardShow:true,
        SubmitVisible:false
      }
    },
    methods:{
      deleteCard(){
        this.CardShow=false;
      },
      SubMsg(card) {
        this.SubmitVisible=false;
        console.log(card);
        this.$wnhttp("PAT.WEB.APPOINTMENT.SCHEDULE.S09",
          {
            mbdm:card.mbdm,
            yxzt:card.yxzt
          }).then(data => {
          console.log(data)
          this.loading=false;
        }).catch(err => {
          this.$message('暂无模板列表数据');
        });
        this.$message({
          message: '已停用！',
          type: 'success'
        });
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
    min-height: 315px;
    float: left;
    border:1px solid transparent;
    margin: 5px 1% 10px 0;
    box-sizing: border-box;
    bottom: 1px;
    transition:all .2s;
    cursor: default;
    background: #fff;
    border-radius:2px ;
    overflow: hidden;
    padding-bottom: 20px;
  }
  .tp-card:hover{
    bottom: 3px;
    border: 1px solid rgba(132, 166, 181,.6);
    box-shadow: 0 0 15px rgba(63,81,181, 0.3);
    min-height: 315px;
    height: 100%;
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
  @media screen and (min-width: 1921px) {
    .tp-card{
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

  .tp-card:hover .tp-card-footer{
    height: 45px;
  }
  .tp-card:hover .collapse{
    height:0;
  }
  .tp-card:hover .tp-card-close{
    display: block;

  }
  .tp-card-footer{
    color: #FFF;
    background: rgb(62,156,255);
    display: block;
    position: absolute;
    height: 0px;
    line-height: 45px;
    font-size: 16px;
    text-align: center;
    width: 100%;
    bottom: 0px;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    cursor: pointer;
    transition:all .2s;
    overflow: hidden;
    float: left;
  }
  .tp-card-footer:hover{
    background: rgb(67, 170, 255);
  }
  .tp-card p{
    height: 35px;
    line-height: 35px;
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
    transition:all .2s;
    overflow: hidden;
  }
  .tp-card-ksnum>span{
    font-size: 14px;
    color: #6FA6E1;
  }
  .tp-card-close{
    position: absolute;
    top: 6px;
    right: 10px;
    color: #cacaca;
    cursor: pointer;
    display: none;
    transition:all .2s;
   }
  .tp-card-close>i{
    font-size: 12px;
  }
  .tp-card-body>p>.tp-num{
    font-size: 13px;
    font-weight: bold;
    color: #333;
  }
  .infolist{
    padding: 0 80px 0 40px;
  }
  .infolist>p{
    height: 30px;
    line-height: 30px;
  }
  .infolist>p>.lable{
    float: left;
  }
  .infolist>p>.num{
    float: right;
  }
  .emt-card{
    text-align: center;
  }
</style>
