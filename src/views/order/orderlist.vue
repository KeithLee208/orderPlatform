<template>
  <div class="setting-wraaper">
    <div class="setting-header">
      <router-link to="/order" class="pull-right">
        <i class="el-icon-close"></i>
      </router-link>
      <span>预约列表</span>
    </div>
    <div class="set-body">
      <div class="order-search-box">
        <span class="order-search ">
             <el-input
               placeholder="刷卡或输入，磁卡／保障卡／IC卡／病历号／身份证／姓名／电话"
               icon="search"
             >
            </el-input>
        </span>
      </div>
      <div>
        <el-form :inline="true" class="demo-form-inline" label-width="80px" label-position="left">
          <div class="form-row">
            <el-form-item label="预约渠道">
              <el-input class="width-230" size="small" placeholder="请填写姓名"></el-input>
            </el-form-item>
            <el-form-item label="服务类型">
              <el-select class="width-230" size="small" v-model="value" placeholder="身份证号">
                <el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="预约时间">
              <el-input class="width-230" size="small" placeholder="请填写电话"></el-input>
            </el-form-item>
          </div>
          <el-collapse-transition>
            <div v-if="detailShow">
              <div class="form-row">
                <el-form-item label="预约医院">
                  <el-radio-group class="width-230" >
                    <el-input class="width-230" size="small" placeholder="请填写姓名"></el-input>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="预约科室">
                  <el-input class="width-230" size="small" placeholder="请填写姓名"></el-input>
                </el-form-item>
                <el-form-item label="预约医生">
                  <el-select class="width-230" size="small" v-model="value" placeholder="身份证号">
                    <el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="form-row">
                <el-form-item label="挂号时间">
                  <el-select class="width-230" size="small" v-model="value" placeholder="身份证号">
                    <el-option  v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
          </el-collapse-transition>
          <div class="line"></div>
          <span @click="collapse" class="detail-collapse">{{btntext}}<i class="icon iconfont icon-xiangzuo"></i></span>
        </el-form>
      </div>
      <div class="type-filter">
        <span>服务类型</span>
        <span><i class="el-icon-menu all"></i>全部</span>
        <span class="allcan"><i></i>已挂号</span>
        <span class="somecan"><i></i>待挂号</span>
        <span class="cant"><i></i>已爽约</span>
        <span class="cancel"><i></i>已取消</span>
      </div>
      <div class="order-table">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="name"
            label="患者姓名"
            class-name="width-90"
 >
          </el-table-column>
          <el-table-column
            prop="num"
            label="卡号"
            class-name="abe2"
          >
          </el-table-column>
          <el-table-column
            prop="type"

            label="服务类型">
          </el-table-column>
          <el-table-column
            prop="channel"

            label="预约渠道">
          </el-table-column>
          <el-table-column

            prop="hospital"
            label="预约医院">
          </el-table-column>
          <el-table-column
            prop="department"
            label="预约科室">
          </el-table-column>
          <el-table-column
            prop="doctor"

            label="预约医生">
          </el-table-column>
          <el-table-column
            prop="time1"

            label="预约时间">
          </el-table-column>
          <el-table-column
            prop="state"

            label="预约状态">
          </el-table-column>
          <el-table-column

            label="操作">
            <template scope="scope">
              <div>
                <i class="icon iconfont icon-shanchu"></i>
                <i class="icon iconfont icon-dayin"></i>
                <i class="icon iconfont icon-jiazai"></i>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

  </div>
</template>
<script>

  export default{
    data() {
      return {
        detailShow:false,
        btntext:'展开',
        tableData: [{
          date: '2016-05-02',
          name: '王小虎虎',
          num: '3343669984',
          type:'普通门诊',
          channel:'院内预约',
          hospital:'静中心东院区',
          department:"胸外科1",
          doctor:'李芸芸',
          time1:'2017/05/03',
          time2:'上午8:00-12:00',
          state:'待挂号'
        },
          {
            date: '2016-05-02',
            name: '王小虎',
            num: '3343669984',
            type:'普通门诊',
            channel:'院内预约',
            hospital:'静中心东院区',
            department:"胸外科1",
            doctor:'李芸芸',
            time:'2017/05/03 上午8:00-12:00',
            state:'待挂号'
        }, {
            date: '2016-05-02',
            name: '王小虎',
            num: '3343669984',
            type:'普通门诊',
            channel:'院内预约',
            hospital:'静中心东院区',
            department:"胸外科1",
            doctor:'李芸芸',
            time:'2017/05/03 上午8:00-12:00',
            state:'待挂号'
        }, {
            date: '2016-05-02',
            name: '王小虎',
            num: '3343669984',
            type:'普通门诊',
            channel:'院内预约',
            hospital:'静中心东院区',
            department:"胸外科1",
            doctor:'李芸芸',
            time:'2017/05/03 上午8:00-12:00',
            state:'待挂号'
        }]
      }
    },
    methods:{
      collapse(){
        if(this.btntext=='展开'){
          this.detailShow=true;
          this.btntext='收起';
        }
        else{
          this.detailShow=false;
          this.btntext='展开';
        }
      },
      orderplus(){
        this.plusshow=true;
      }
    }
  }
</script>

<style scoped>
  .setting-wraaper {
    position: absolute;
    display: inline-block;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 940px;
    background: #fff;
  }
  .setting-header {
    height: 60px;
    width: 100%;
    display: inline-block;
    line-height: 60px;
    padding: 0 30px 0 30px;
    background: #3f51b5;
    color: #fff;
    border-bottom: 1px solid #e0e0e0;
    cursor: default;
    box-sizing: border-box;
  }
  .set-body{
    padding: 20px;
  }
  .setting-header>span{
    font-size: 16px;
  }
  .setting-header > a > i{
    color: #fff;
  }
  .box-title{
    width: 100%;
    height: 20px;
    line-height: 20px;

    display: inline-block;
    padding-left: 10px;
    margin-left: 12px;
    border-left: 6px solid #3f51b5;
    margin-bottom: 15px;
  }
  .box-title>span{
    font-size: 16px;
    font-weight: bold;
    float: left;
  }
  .box-title>p{
    color: #999;
    font-size: 14px;
    float: left;
    margin-left: 20px;

  }
  .padding-left-30{
    padding-left: 30px;
  }
  .line{
    width: 100%;
    display: inline-block;
    height: 1px;
    border-bottom: 1px dashed #e0e0e0;
    position: relative;
    bottom: 5px;
  }
  .fixed-line{
    width: 100%;
    display: inline-block;
    border-bottom: 1px dashed #e0e0e0;
    float: left;
    margin: 0px 0 20px;
  }
  .order-search {
    width: 550px;
    display: inline-block;
  }

  .form-input {
    display: inline-block;
    width: 250px;
  }
  .form-row{
    display: inline-block;
    width: 100%;
  }
  .width-230{
    width: 230px;
    margin-right: 40px;
  }
  .order-search-box{
    margin-bottom: 20px !important;
  }
  .detail-collapse{
    float: right;
    color: #20a0ff;
    cursor: pointer;
    width: 100%;
    display: inline-block;
    text-align: right;
  }
  .type-filter > span {
    display: inline-block;
    cursor: default;
  }

  .type-filter > span > .all {
    border: 1px solid transparent;
    color: #e0e0e0;
    font-size: 16px;
  }
  .type-filter > .somecan{
    color: rgb(32, 160, 255);
  }
  .type-filter > .allcan{
    color: rgb(12, 175, 148);
  }
  .type-filter > .cant{
    color: rgb(255, 73, 73);
  }
  .type-filter > .cancel{
    color: #999;
  }
  .type-filter > .cancel>i{
    border: 1px solid #999;
    background: #fff;
  }
  .type-filter > .somecan>i {
    border: 1px solid rgb(192, 229, 255);
    background: rgb(233, 246, 255);
  }

  .type-filter > .allcan >i {
    border: 1px solid rgb(188, 241, 212);
    background: rgb(231, 250, 240);
  }
  .type-filter > .cant > i {
    border: 1px solid rgb(255, 204, 204);
    background: rgb(255, 237, 237);
  }
  .type-filter > span > i {
    width: 16px;
    height: 16px;
    float: left;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    margin: 0px 5px 0 10px;
    cursor: pointer;
  }
.order-table{
  margin: 15px 0;
}

</style>

