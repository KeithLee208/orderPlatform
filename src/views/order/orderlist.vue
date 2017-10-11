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
        <el-form :inline="true" class="demo-form-inline" label-width="70px" label-position="left">
          <div class="form-row">
            <el-form-item label="预约渠道">
              <el-input class="width-230" size="small" placeholder="请填写姓名"></el-input>
            </el-form-item>
            <el-form-item label="服务类型">
              <el-select class="width-230" size="small" v-model="value" placeholder="服务类型">
                <el-option label="1" value="1">
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
                  <el-select class="width-230" size="small" v-model="value" placeholder="预约医生">
                    <el-option label="1" value="1">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="form-row">
                <el-form-item label="挂号时间">
                  <el-select class="width-230" size="small" v-model="value" placeholder="挂号时间">
                    <el-option label="1" value="1">
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
        <table class="table textalign-c" style="width: 100%;">
          <thead>
          <tr class="even">
            <th>患者姓名</th>
            <th>卡号</th>
            <th>服务类型</th>
            <th>预约渠道</th>
            <th>预约医院</th>
            <th>预约科室</th>
            <th>预约医生</th>
            <th>预约时间</th>
            <th>预约状态</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in orderlist">
            <td>{{item.bingRenXinXiEntity.hzxm}}</td>
            <td>{{item.bingRenXinXiEntity.hzsfzh}}</td>
            <td>{{item.fuWuLeiXingEntity.fwlxmc}}</td>
            <td>{{item.microRegistrationChuBanMingXiHaoXuEntity.qddm}}</td>
            <td>{{item.bingRenXinXiEntity.yydm}}</td>
            <td>{{item.microChuBanMingXiEntity.ksdm}}</td>
            <td>{{item.microChuBanMingXiEntity.ysmc}}</td>
            <td>
              <p>{{item.microChuBanMingXiEntity.cbrq}}</p>
              <p>{{item.microChuBanMingXiEntity.shiJianDuanEntity.sjdmc}}{{item.microChuBanMingXiEntity.shiJianDuanEntity.kssj}}-{{item.microChuBanMingXiEntity.shiJianDuanEntity.jssj}}</p>
            </td>
            <td>
              <span v-if="item.yyjd=='DJ'" class="allcan">待挂号</span>
            </td>
            <td>
              <el-tooltip class="item" effect="dark" content="取消" placement="bottom">
                <i @click="orderCancel(item)" class="icon iconfont icon-shanchu"></i>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="查看" placement="bottom">
                <i class="icon iconfont icon-jiazai"></i>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="打印" placement="bottom">
                <i class="icon iconfont icon-dayin"></i>
              </el-tooltip>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!--取消预约弹框-->
    <el-dialog title="取消预约" :visible.sync="cancelShow" size="small">
      <div class="time-wrapper">
        <div class="user-info">
          <span>姓名：{{selectOrder.bingRenXinXiEntity.hzxm}}</span>
          <span>卡号：{{selectOrder.bingRenXinXiEntity.hzsfzh}}</span>
        </div>
        <div class="time-line">
          <div class="time-left">
            <span>2017/04/28</span>
            <i class="active"></i>
          </div>
          <div class="time-right">
            <div>
              <p class="title">操作人：张文文</p>
              <p>
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 3}"
                  resize="none"
                  placeholder="请输入预约取消原因"
                  class="width-230"
                 >
                </el-input>
              </p>

            </div>
          </div>
        </div>
        <div class="time-line">
          <div class="time-left">
            <span>2017/04/28</span>
            <i></i>
          </div>
          <div class="time-right">
            <div>
              <p class="title">操作人：张文文</p>
              <p>张文医生调整为：2017/05/03 上午停诊；</p>
              <p>取消原因：突发意外情况需要处理。</p>
            </div>
          </div>
        </div>
        <div class="time-line">
          <div class="time-left">
            <span>2017/04/28</span>
            <i></i>
          </div>
          <div class="time-right">
            <div>
              <p class="title">操作人：张文文</p>
              <p>张文医生调整为：2017/05/03 上午停诊；</p>
              <p>取消原因：突发意外情况需要处理。</p>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
                <el-button @click="cancelShow = false">取 消</el-button>
                <el-button type="primary" @click="cancelShow = false">确定</el-button>
              </span>
    </el-dialog>
  </div>
</template>
<script>

  export default{
    data() {
      return {
        detailShow:false,
        cancelShow:false,
        btntext:'展开',
        value:'',
        tableData: [
          {
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
        }
        ],
        orderlist:  [
          {
            bingRenXinXiEntity: {
              czry: "00",
              fscj: "",
              hzcsrq: "",
              hzdm: "00001",
              hzsfzh: "112365888",
              hzxb: "男",
              hzxm: "三毛",
              jhrsfzh: "88559966",
              lrsj: "2017080615:30:00",
              lxdh: "133",
              lxdz: "我让你二",
              py: "SS",
              wb: "SS",
              yxzt: "YX",
              yydm: "001"
            },
            czry: "00",
            fscj: "",
            fuWuLeiXingEntity: {
              czry: "00",
              fscj: "",
              fwlxdm: "002",
              fwlxmc: "专家1",
              ghfdm: "001",
              lrsj: "2017083011:16:00",
              mzlx: "003",
              yxzt: "YX",
              yydm: "001",
              zlfdm: "002"
            },
            lrrq: "2017083011:13:00",
            microChuBanMingXiEntity: {
              cbrq: "2017083011:16:00",
              cbzt: "ZC",
              czdz: "22楼E区",
              czry: "00",
              feiYongMingXiEntityList: [
                {
                  czry: "00",
                  dj: "21",
                  fscj: "",
                  fylb: "01",
                  lrsj: "2017083011:16:00",
                  mxmc: "挂号费",
                  mxxh: "001",
                  py: "YYT",
                  wb: "YYT",
                  yxzt: "YX",
                  yydm: "001"
                },
                {
                  czry: "00",
                  dj: "20",
                  fscj: "",
                  fylb: "01",
                  lrsj: "2017083011:16:00",
                  mxmc: "诊疗费",
                  mxxh: "001",
                  py: "YYT",
                  wb: "YYT",
                  yxzt: "YX",
                  yydm: "001"
                }
              ],
              fscj: "",
              fuWuLeiXingEntity: {
                czry: "00",
                fscj: "",
                fwlxdm: "002",
                fwlxmc: "专家1",
                ghfdm: "001",
                lrsj: "2017083011:16:00",
                mzlx: "003",
                yxzt: "YX",
                yydm: "001",
                zlfdm: "002"
              },
              ghfdm: "001",
              hxzs: "50",
              jssj: "23:00",
              ksdm: "001",
              ksmc: "随便科",
              kssj: "19:00",
              lrsj: "2017083011:16:00",
              mbdm: "01",
              microChuBanMingXiHaoXuEntityList: [
                {
                  czry: "00",
                  dj: "41",
                  fscj: "",
                  fwlxdm: "001",
                  ghfdm: "001",
                  hx: 1,
                  hxly: "01",
                  hxzt: "DJ",
                  lrsj: "2017083011:16:00",
                  mbdm: "001",
                  mxxh: "12306",
                  qddm: "01",
                  xh: 1,
                  yxzt: "YX",
                  zlfdm: "002",
                  zydm: "001"
                }
              ],
              mxxh: "12307",
              shiJianDuanEntity: {
                czry: "00",
                fscj: "",
                jssj: "23:00",
                kssj: "19:00",
                lrsj: "2017083011:16:00",
                sjddm: "003",
                sjdmc: "晚上",
                sysj: "20:00",
                yxzt: "YX",
                yydm: "001"
              },
              syhxs: "49",
              ysdm: "002",
              ysmc: "大医生",
              ysyhxs: "1",
              yxzt: "YX",
              yydm: "001",
              zbxh: "001",
              zhuanBingEntityList: [
                {
                  czry: "00",
                  fscj: "",
                  lrsj: "2017083011:16:00",
                  yxzt: "YX",
                  yydm: "001",
                  zydm: "002",
                  zymc: "呼呼"
                },
                {
                  czry: "00",
                  fscj: "",
                  lrsj: "2017083011:16:00",
                  yxzt: "YX",
                  yydm: "001",
                  zydm: "0005",
                  zymc: "哈哈哈"
                }
              ],
              zlfdm: "002"
            },
            microRegistrationChuBanMingXiHaoXuEntity: {
              czry: "00",
              dj: "41",
              fscj: "",
              fwlxdm: "001",
              ghfdm: "001",
              hx: "1",
              hxly: "01",
              hxzt: "DJ",
              lrsj: "2017083019:00:00",
              mbdm: "001",
              mxxh: "001",
              qddm: "01",
              xh: "1",
              yxzt: "YX",
              zlfdm: "002",
              zydm: "001"
            },
            qrrq: "",
            shiJianDuanEntity: {
              czry: "00",
              fscj: "",
              jssj: "23:00",
              kssj: "19:00",
              lrsj: "2017083011:16:00",
              sjddm: "003",
              sjdmc: "晚上",
              sysj: "20:00",
              yxzt: "YX",
              yydm: "001"
            },
            xh: "12306",
            yxzt: "YX",
            yydm: "001",
            yyjd: "DJ",
            yyxh: "1"
          }
        ],
        selectOrder:{bingRenXinXiEntity:{}}
      }
    },
    methods:{
      orderInquiry(){
        let param={
          fwlxdm:'',
          ghsj:'',
          hzdm:'',
          ksdm:'',
          qddm:'',
          ysdm:'',
          yydm:'',
          yyrq:''
        };
        this.$wnhttp("PAT.WEB.APPOINTMENT.REGISTRATION.Q07", param).then(data => {
          console.log(data);return;
          if(data==''){

          }else {

          }
        }).catch(err => {
          console.log(err);
        });
      },
      orderCancel(item){
        console.log(item);
        this.cancelShow=true;
        this.selectOrder=item;
      },
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
    margin-right: 10px;
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
  .type-filter > .somecan,.table>tbody>tr>td>.somecan{
    color: rgb(32, 160, 255);
  }
  .type-filter > .allcan,.table>tbody>tr>td>.allcan{
    color: rgb(12, 175, 148);
  }
  .type-filter > .cant,.table>tbody>tr>td>.cant{
    color: rgb(255, 73, 73);
  }
  .type-filter > .cancel,.table>tbody>tr>td>.cancel{
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
  .table{
    border-collapse: collapse;
    border: 1px solid #e0e0e0;
  }
  .table > thead {
    border-bottom: 1px solid #ddd;
  }
  .textalign-c {
    text-align: center;
  }
  .table thead tr th {
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    font-weight: 600;
    border-bottom: 0;
    vertical-align: middle;
    background:rgb(247,246,245);
  }
  .table>tbody>tr>td{
    padding: 4px;
    font-size: 12px;
    color: #999;
    background: #FFFFFF;
    height: 24px;
    line-height: 24px !important;
    vertical-align: middle !important;
    border-bottom: 1px solid #e0e0e0;
  }
  .table>tbody>tr>td>i{
    cursor: pointer;
  }
  /******************************调整记录*******************************/
  .time-wrapper{
    position: relative;
  }
  .time-wrapper>.user-info{
    position: absolute;
    top:-52px;
    left: 80px;
    color: rgb(232, 166, 35);
  }
  .time-wrapper>.user-info>span{
    margin-right: 15px;
  }
  .time-line{
    width: 100%;
    min-height: 100px;
    display: inline-block;
    position: relative;
    color: #999;

  }
  .time-line>.time-left{
    width: 150px;
    height: 100%;
    border-right: 1px solid #e0e0e0;
    line-height: 40px;
    text-align: center;
    position: absolute;
    left: 0;
    top: 0;
  }
  .time-line>.time-left>span{
    position: absolute;
    right: 20px;
    top: -15px;
  }
  .time-line>.time-right{
    box-sizing: border-box;
    padding-left: 170px;
    width: 100%;
    min-height: 100px;
    position: relative;
    top: -10px;
  }
  .time-right>div>p{
    line-height: 30px;
  }
  .time-right>div>.title,.time-left>span{
    color: #666;
  }
  .time-left>i{
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #e0e0e0;
    position: absolute;
    top: -2px;
    right: -8px;
  }
  .time-left>i.active{
    background: #20a0ff;
  }
  /******************************调整记录*******************************/
</style>

