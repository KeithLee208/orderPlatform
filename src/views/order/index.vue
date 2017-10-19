<template id="order">
  <div class="order-warrper">
    <div class="filter-warrper">
      <div class="order-search-box">
        <span class="pull-right">
            <el-button class="btn-blue" @click="AddVisible = true" type="primary">新增患者信息</el-button>
            <el-button class="btn-blue" type="primary">
               <router-link tag="span" to="/order/orderlist">
                 预约列表
              </router-link>
            </el-button>
         </span>
        <span class="order-search ">
             <el-input
               autofocus
               placeholder="刷卡或输入，磁卡／保障卡／IC卡／病历号／身份证／姓名／电话"
               icon="search"
               @click="infoSearch"
               @keyup.enter.native="infoSearch"
               v-model="searchValue"
             >
            </el-input>
        </span>
      </div>
      <el-form :model="inquiryForm" :inline="true" class="demo-form-inline" label-width="90px" label-position="left">
        <div class="form-row">
          <el-form-item label="姓名：">
            <el-input disabled v-model="inquiryForm.hzxm" class="width-200" size="small" placeholder="查询后获取"></el-input>
          </el-form-item>
          <el-form-item label="身份证号：">
            <el-input disabled v-model="inquiryForm.hzsfzh" class="width-200" size="small" placeholder="查询后获取"></el-input>
          </el-form-item>
          <el-form-item label="联系电话:">
            <el-input disabled v-model="inquiryForm.lxdh" class="width-200" size="small" placeholder="查询后获取"></el-input>
          </el-form-item>
        </div>
        <el-collapse-transition>
          <div v-if="detailShow">
            <div class="form-row">
              <el-form-item label="性别：">
                <el-radio-group disabled v-model="inquiryForm.hzxb" class="width-200">
                  <el-radio label="男" value="男"></el-radio>
                  <el-radio label="女" value="女"></el-radio>
                  <el-radio label="不详" value="不详"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="联系地址：">
                <el-input disabled v-model="inquiryForm.lxdz" class="width-525" size="small" placeholder="查询后获取"></el-input>
              </el-form-item>
            </div>
          </div>
        </el-collapse-transition>
        <div class="line"></div>
        <span @click="collapse" class="detail-collapse">{{btntext}}<i class="icon iconfont icon-xiangzuo"></i></span>
      </el-form>
      <div>
        <el-form :inline="true">
          <el-form-item label="预约科室">
            <el-select @change="departmentSelect" filterable size="small" v-model="filterForm.departmentValue" placeholder="">
              <el-option v-for="item in departmentList" :key="item.kstybm" :label="item.ksmc" :value="item.kstybm">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择医生">
            <el-select @change="doctorSelect" filterable :disabled='filterForm.doctorDisable' size="small" v-model="filterForm.doctorValue" placeholder="">
              <el-option v-for="item in doctorList" :key="item.zgtybm" :label="item.zgxm" :value="item.zgtybm">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="门诊类型">
            <el-select @change="typeSelect" :disabled='filterForm.typeDisable' size="small" v-model="filterForm.typeValue" placeholder="">
              <el-option v-for="item in serviceTypeList" :key="item.fwlxdm" :label="item.fwlxmc" :value="item.fwlxdm">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div v-if="filterForm.departmentValue!==''" class="pagebody">
      <div class="type-filter">
        <span>服务类型</span>
        <span><i class="el-icon-menu all"></i>全部</span>
        <span class="allcan"><i></i>全部可约</span>
        <span class="somecan"><i></i>部分可约</span>
        <span class="cant"><i></i>预约已满</span>
      </div>
      <div class="table-time">
        <div class="btn-left" @click="pageleft">
          <i class="icon iconfont icon-xiangzuo"></i>
        </div>
        <div class="btn-right" @click="pageright">
          <i class="icon iconfont icon-xiangzuo"></i>
        </div>
        <span></span>
        <span v-for="item in moduleTimeList">
            <p class="day">{{item.week}}</p>
            <p class="date">{{item.date}}</p>
          </span>
      </div>
      <div v-for="item in filterListFormatTable" class="AdTable">
        <div class="AdTableLeft">
          <div>
            <i></i>
            <p>
              <span class="name">{{item.ysmc}}</span>
              <span v-if="item.ysmc!=='普通门诊'" class="position">主治医师</span>
            </p>
          </div>
        </div>
        <div class="AdTableRight">
          <div class="table-body">
            <div v-for="(slot,index) in item.slot" :class="[index ===0 ? 'border-top-1':'']">
              <span>{{slot.sjdmc}}</span>
              <span v-for="week in slot.weekday">
                    <div @click="detailDialog(week)" v-if="week.fwlxdm" slot="reference" class="ordered" :class="{
                                  cant:week.syhxs==0,
                                  somecan:week.syhxs<week.hxzs&&week.syhxs!=0,
                                  allcan:week.syhxs==week.hxzs
                                }">
                        <p>{{week.kssj}}-{{week.jssj}}</p>
                        <p>{{week.ksmc}}</p>
                    </div>
                    </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="filterForm.departmentValue==''" class="no-data">请选择科室查看出班明细</div>
    <el-dialog title="患者信息登记" :visible.sync="AddVisible" size="tiny">
      <el-form label-width="100px" style="width: 95%">
        <el-form-item label="姓名：">
          <el-input v-model="addForm.hzxm" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="身份证号：">
          <el-input v-model="addForm.hzsfzh" placeholder="请输入身份证号"></el-input>
        </el-form-item>
        <el-form-item label="联系电话：">
          <el-input v-model="addForm.lxdh" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-radio-group v-model="addForm.hzxb" class="width-200">
            <el-radio label="男" value="男"></el-radio>
            <el-radio label="女" value="女"></el-radio>
            <el-radio label="不详" value="不详"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="联系地址：">
          <el-input v-model="addForm.lxdz" placeholder="联系地址"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="AddVisible = false">取 消</el-button>
                <el-button type="primary" @click="addInfo">保存</el-button>
              </span>
    </el-dialog>
    <el-dialog @open="addAndOrder.channelList = ''" @close="plusshow=false" title="出班信息" :visible.sync="dialogVisible" size="tiny">
      <div class="fixed-info">
        <p>
          <span class="fixed-label">就诊科室：</span>
          <span>{{selectWeek.ksmc}}</span>
        </p>
        <p>
          <span class="fixed-label">服务类型：</span>
          <span>{{selectWeek.fuWuLeiXingEntity.fwlxmc}}</span>
        </p>
        <p>
          <span class="fixed-label">出诊日期：</span>
          <span>{{selectWeek.cbrq}}（{{selectWeek.cbrqlx}}）</span>
        </p>
        <p>
          <span class="fixed-label">出诊时间：</span>
          <span>{{selectWeek.shiJianDuanEntity.sjdmc}} {{selectWeek.kssj}}-{{selectWeek.jssj}}</span>
        </p>
        <p>
          <span class="fixed-label">就诊地址：</span>
          <span>{{selectWeek.czdz}}</span>
        </p>
        <p>
          <span class="fixed-label">号源数量：</span>
          <span>{{selectWeek.hxzs - selectWeek.syhxs}}/{{selectWeek.hxzs}}</span>
        </p>
        <p>
          <span class="fixed-label">当前号序：</span>
          <span>{{selectWeek.nowHx}}</span>
        </p>
        <div class="ball-row">
          <span @click="changeNowHx(item)" v-for="item in selectWeek.microRegistrationChuBanMingXiHaoXuEntityList">
            <i>
              <p class="num">{{item.hx}}</p>
              <p class="price">¥{{item.dj}}</p>
            </i>
          </span>
        </div>
        <p>
          <span @click=" plusshow = true" class="order-plus-text">预约加号</span>
        </p>
        <el-collapse-transition>
          <div v-if="plusshow">
            <div class="fixed-line"></div>
            <div class="plus-cost">服务费用：{{selectWeek.feiYongMingXiEntityList[1].dj}}元</div>
            <div class="order-plus-row">
              <span class="plus-lable fixed-label">选择渠道：</span>
              <span>
                  <el-select size="small" value-key="qddm" v-model="addAndOrder.channelList" placeholder="">
                    <el-option v-for="item in reservationChannelList" :key="item.qddm" :label="item.qdmc" :value="item"></el-option>
                  </el-select>
              </span>
            </div>
            <div class="order-plus-row">
              <span class="plus-lable fixed-label">添加号序：</span>
              <span>
                 <el-input-number size="small" :min="1" v-model="addAndOrder.addNum"></el-input-number>
              </span>
            </div>
            <div class="order-plus-label">
              <el-button @click="plusshow=false" size="small">取消</el-button>
              <el-button @click="orderPlus(selectWeek)" size="small">添加</el-button>
              <el-button size="small">
                <span @click="detailPost(selectWeek)">添加并预约</span>
              </el-button>
            </div>
          </div>
        </el-collapse-transition>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import * as arr from 'filters/array.js'
  import * as time from 'filters/time.js'
  export default {
    data() {
      return {
        dialogVisible: false,
        detailShow: false,
        plusshow: false,
        btntext: '展开',
        infoLoading: false,
        moduleTimeList: [],
        selectWeek: {
          fuWuLeiXingEntity: {},
          shiJianDuanEntity: {},
          microRegistrationChuBanMingXiHaoXuEntityList:[],
        }, //明细弹框中被点击的明细
        list: [], //出班列表
        ListFormatTable: [], //筛选前的表格
        ListDoctorTable: [], //选择医生后的表格
        filterListFormatTable: [], //过滤出班列表表格形式
        departmentList: [], //科室列表
        doctorList: [], //科室列表
        serviceTypeList: [], //服务类型列表
        reservationChannelList: [], //预约渠道列表
        searchValue: '', //模糊搜索值
        filterForm: {
          departmentValue: '',
          doctorValue: '',
          doctorDisable: true,
          typeValue: '',
          typeDisable: true
        },
        inquiryForm: {}, //查询患者信息表单
        addForm: {
          hzdm: "",
          hzxm: "毛瑞",
          hzsfzh: "341282198912250311",
          hzxb: "男",
          hzcsrq: "1989-12-25",
          lxdh: "13275609899",
          jhrsfzh: "622226198608252025",
          lxdz: "蜀山区",
          yydm: this.$store.state.login.userInfo.yydm,
          yxzt: "YX",
          py: "hhh",
          wb: "hhh",
          fscj: ""
        }, //新增患者信息表单
        addAndOrder: {
          addNum: '',
          channelList: ''
        }, //添加预约
        AddVisible: false,
        ListVisible: false,
        PrintVisible: false,
      }
    },
    computed: {
      moduleTimeListSelect() {
        return this.moduleTimeList.slice(7 * this.moduleTimeListPage, 7 * (this.moduleTimeListPage + 1));
      },
      filterList() {
        if (!this.fwlxdm) return this.list;
        return this.list.filter(item => item.fwlxdm == this.fwlxdm)
      }
    },
    watch: {
      moduleTimeListPage: {
        handler(curVal) {
          let _list = arr.classifyArr(this.filterList, 'ysdm');
          let _timeSlot = this.formatTimeSlot(this.timeSlot, this.moduleTimeListSelect);
          this.filterListFormatTable = this.formatData(_list, _timeSlot);
        }
      }
    },
    created() {
      this.$nextTick(() => {
        this.init();
      });
    },
    methods: {
      init() {
        this.getTimeSlot(); //获取时间段
        this.getDepartmentList(); //获取科室列表
        this.getDateNow(); //当前时间
        this.getmModuleTime(); //获取当前表格表头时间
        this.getTableList(); //获取出班表数据
        this.reservationChannel(); //获取预约渠道
      },
      detailDialog(week) {
        console.log('week',week);
        this.selectWeek = week;
        this.$set(this.selectWeek,'nowHx',week.microRegistrationChuBanMingXiHaoXuEntityList[0].hx);
        this.$set(this.selectWeek,'nowXh',week.microRegistrationChuBanMingXiHaoXuEntityList[0].xh);
//        this.selectWeek.nowHx=week.microRegistrationChuBanMingXiHaoXuEntityList[0].hx;//当前号序
//        this.selectWeek.nowXh=week.microRegistrationChuBanMingXiHaoXuEntityList[0].xh;//当前号序的序号
        console.log(this.selectWeek);
        this.dialogVisible = true;
        this.plusshow = false;
      },
      infoSearch() {
        if (this.searchValue == '') {
          this.$message({
            message: '请输入搜索条件',
            type: 'warning'
          });
          return
        } else {
          this.$wnhttp('PAT.WEB.APPOINTMENT.REGISTRATION.Q01', {
            condition: this.searchValue
          }).then(data => {
            this.$message({
              message: '检索到' + data.length + '条记录'
            });
            this.inquiryForm = data[0];
            console.log('data', data);
            return
          })
        }
      },
      //获取预约渠道
      reservationChannel() {
        this.$wnhttp("PAT.WEB.APPOINTMENT.BASEINFO.Q08", {
          yydm: this.$store.state.login.userInfo.yydm
        }).then(data => {
          this.reservationChannelList = data;
          console.log('this.reservationChannel', this.reservationChannelList)
        }).catch(err => {
          console.log(err);
        });
      },
      //获取服务类型
      getServiceList() {
        this.serviceTypeList = this.$store.state.scheduling.serviceTypeList;
        console.log('this.serviceTypeList', this.serviceTypeList);
      },
      //科室下拉值改变触发
      departmentSelect(value) {
        this.$store.commit('order/SET_DEPARTMENTVALUE', value);
        this.getTableList();
        this.getDoctorList(value).then(data => {
          if (data == '') {
            this.doctorList = [];
            this.filterForm.doctorValue = '';
          }
          let ordinary = {
            zgxm: '普通门诊',
            zgtybm: '',
            label: '普通门诊',
          };
          data.push(ordinary);
          this.doctorList = data;
          this.filterForm.doctorValue = '';
          this.filterForm.typeValue = '';
          this.filterForm.typeDisable = true;
          this.filterForm.doctorDisable = false;
        });
        this.getServiceList();
      },
      //医生下拉值改变触发
      doctorSelect(value) {
        let listArr = arr.clone(this.ListFormatTable);
        let newArr = [];
        listArr.map(item => {
          if (item.name == value) {
            newArr.push(item);
          }
        })
        if (newArr == '') {
          this.$message('当前时间段无此医生出班信息')
          this.filterForm.typeDisable = true;
          return
        } else {
          this.filterListFormatTable = newArr;
          this.ListDoctorTable = newArr;
          this.filterForm.typeDisable = false;
        }
      },
      //门诊类型下拉值改变触发
      typeSelect(value) {
        let listArr = arr.clone(this.ListDoctorTable);
        listArr.map(item => {
          item.slot.map(item2 => {
            item2.weekday.map(item3 => {
              console.log(item3.fwlxdm, value);
              if (item3.fwlxdm !== value) {
                item3.fwlxdm = '';
              }
            })
          })
        })
        this.filterListFormatTable = listArr;
      },
      //获取时间段列表
      getTimeSlot() {
        this.$wnhttp("PAT.WEB.APPOINTMENT.BASEINFO.Q06", {
          yydm:this.$store.state.login.userInfo.yydm
        }).then(data => {
          this.timeSlot =data;
        }).catch(err => {
          console.log(err);
          //这里错误有2种错误
          //1. 服务端业务错误，错误码邮件中有
          //2. 网络错误，本地网络断开、超时等
        });

      },
      //获取科室列表
      getDepartmentList() {
        this.$wnhttp("PAT.WEB.APPOINTMENT.BASEINFO.Q02", {
          yydm:this.$store.state.login.userInfo.yydm
        }).then(data => {
          this.departmentList =data;
        }).catch(err => {
          console.log(err);
          //这里错误有2种错误
          //1. 服务端业务错误，错误码邮件中有
          //2. 网络错误，本地网络断开、超时等
        });
      },
      //科室获取医生列表
      getDoctorList(value) {
        return new Promise((resolve, reject) => {
          this.$wnhttp("PAT.WEB.APPOINTMENT.BASEINFO.Q04", {
            kstybm: value,
            yydm: this.$store.state.login.userInfo.yydm
          }).then(data => {
            resolve(data);
          }).catch(err => {
            console.log(err);
          });
        })
      },
      //获取当前日期
      getDateNow() {
        let datenow = new Date(Date.now()).getTime();
        let daynow = new Date(datenow).getDay();
        let startTime = '';
        let endTime = '';
        let day = 1000 * 60 * 60 * 24;
        switch (daynow) {
          case 1:
            startTime = datenow;
            endTime = datenow + day * 6;
            break;
          case 2:
            startTime = datenow - day * 1;
            endTime = datenow + day * 5;
            break;
          case 3:
            startTime = datenow - day * 2;
            endTime = datenow + day * 4;
            break;
          case 4:
            startTime = datenow - day * 3;
            endTime = datenow + day * 3;
            break;
          case 5:
            startTime = datenow - day * 4;
            endTime = datenow + day * 2;
            break;
          case 6:
            startTime = datenow - day * 5;
            endTime = datenow + day * 1;
            break;
          case 0:
            startTime = datenow - day * 6;
            endTime = datenow;
            break;
        }
        this.$store.commit('order/SET_ORDERTABLETIME', {
          startTime: startTime,
          endTime: endTime
        });
      },
      //时间转换
      dateFormat(date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
      },
      //获取出班时间
      getmModuleTime() {
        let startTime = this.$store.state.order.orderTable.startTime;
        let endTime = this.$store.state.order.orderTable.endTime;
        let weekArr = [];
        for (let i = 0; i <= 6; i++) weekArr.push(new Date(startTime + 1000 * 60 * 60 * 24 * i).getDay());
        weekArr = weekArr.map((item, index) => ({
          date: time.timeFormat(new Date(startTime + 1000 * 60 * 60 * 24 * index)),
          week: "星期" + "日一二三四五六".charAt(item)
        }));
        this.moduleTimeList = weekArr;
      },
      pageleft() {
        this.$store.commit('order/SET_ORDERTABLETIME', {
          startTime: this.$store.state.order.orderTable.startTime - 1000 * 60 * 60 * 24 * 7,
          endTime: this.$store.state.order.orderTable.endTime - 1000 * 60 * 60 * 24 * 7
        });
        this.serviceTypeIndex = -1; //还原服务类型筛选
        this.getmModuleTime(); //设置新的开始结束时间
        this.getTableList(); //请求出班表数据
      },
      pageright() {
        this.$store.commit('order/SET_ORDERTABLETIME', {
          startTime: this.$store.state.order.orderTable.startTime + 1000 * 60 * 60 * 24 * 7,
          endTime: this.$store.state.order.orderTable.endTime + 1000 * 60 * 60 * 24 * 7
        });
        this.serviceTypeIndex = -1; //还原服务类型筛选
        this.getmModuleTime(); //设置新的开始结束时间
        this.getTableList(); //请求出班表数据
      },
      //获取出报表数据
      getTableList() {
        //        this.$wnhttp("PAT.WEB.APPOINTMENT.SCHEDULE.Q09", {
        this.$wnhttp("PAT.WEB.APPOINTMENT.REGISTRATION.Q03", {
          ksrq: this.dateFormat(new Date(this.$store.state.order.orderTable.startTime)),
          jsrq: this.dateFormat(new Date(this.$store.state.order.orderTable.endTime)),
          ksdm: this.$store.state.order.departmentValue,
          fwlxdm: '',
          needHxList: 1,
          ysdm: '',
          yydm: this.$store.state.login.userInfo.yydm
        }).then(data => {
          this.list = data;
          console.log('data', data);
          let _list = arr.classifyArr(this.list, 'ysdm');
          let _timeSlot = this.formatTimeSlot(this.timeSlot, this.moduleTimeList);
          this.ListFormatTable = this.formatData(_list, _timeSlot);
          this.filterListFormatTable = this.formatData(_list, _timeSlot);
          console.log(' this.filterListFormatTable', this.filterListFormatTable);
          this.allTypeList = arr.clone(this.filterListFormatTable);
          this.loading = false;
        }).catch(err => {
          console.log(err);
        });
      },
      formatTimeSlot(timeSlot, moduleTimeListSelect) {
        let _timeSlot = arr.clone(timeSlot);
        let _moduleTimeListSelect = arr.clone(moduleTimeListSelect);
        _timeSlot.map(slot => {
          slot.weekday = [
            {
              cbrqlx: _moduleTimeListSelect[0].week,
              sjddm: slot.sjddm,
              cbrq: _moduleTimeListSelect[0].date
            },
            {
              cbrqlx: _moduleTimeListSelect[1].week,
              sjddm: slot.sjddm,
              cbrq: _moduleTimeListSelect[1].date
            },
            {
              cbrqlx: _moduleTimeListSelect[2].week,
              sjddm: slot.sjddm,
              cbrq: _moduleTimeListSelect[2].date
            },
            {
              cbrqlx: _moduleTimeListSelect[3].week,
              sjddm: slot.sjddm,
              cbrq: _moduleTimeListSelect[3].date
            },
            {
              cbrqlx: _moduleTimeListSelect[4].week,
              sjddm: slot.sjddm,
              cbrq: _moduleTimeListSelect[4].date
            },
            {
              cbrqlx: _moduleTimeListSelect[5].week,
              sjddm: slot.sjddm,
              cbrq: _moduleTimeListSelect[5].date
            },
            {
              cbrqlx: _moduleTimeListSelect[6].week,
              sjddm: slot.sjddm,
              cbrq: _moduleTimeListSelect[6].date
            }
          ];
        });
        return _timeSlot;
      },
      //数据处理
      formatData(list, timeSlot) {
        //医生→时间段→日期
        let newArr = list;
        let normalTypeData = [{
          ysmc: "普通门诊",
          name: "",
          slot: arr.clone(timeSlot)
        }];
        let flag = true;
        if (!newArr.length) {
          return normalTypeData;
        }
        newArr.map(item => {
          if (!item.name) flag = false;
          item.slot = arr.clone(timeSlot);
          item.slot.map(slot => {
            let weekTemp = item.children.filter(child => child.sjddm == slot.sjddm && child.ysdm == item.name);
            weekTemp.map(week => {
              item.ysmc = week.ysmc;
              if (week.sjddm != slot.sjddm) return;
              let _day = slot.weekday.filter(weekday => weekday.cbrq == week.cbrq).length ?
                slot.weekday.filter(weekday => weekday.cbrq == week.cbrq)[0] : {};
              Object.assign(_day, week);
            })
          })
        });
        if (flag) {
          newArr = normalTypeData.concat(newArr);
        }
        return newArr;
      },
      addInfo() {
        let param = {
          hzdm: this.addForm.hzdm,
          hzxm: this.addForm.hzxm,
          hzsfzh: this.addForm.hzsfzh,
          hzxb: this.addForm.hzxb,
          hzcsrq: this.addForm.hzcsrq,
          lxdh: this.addForm.lxdh,
          jhrsfzh: this.addForm.jhrsfzh,
          lxdz: this.addForm.lxdz,
          yydm: this.addForm.yydm,
          yxzt: this.addForm.yxzt,
          py: this.addForm.py,
          wb: this.addForm.wb,
          fscj: this.addForm.fscj,
          czry: '20000000.zjj1' //操作人员
        }
        this.$wnhttp("PAT.WEB.APPOINTMENT.REGISTRATION.Y07", param).then(data => {
          this.$message({
            message: '添加患者成功！',
            type: 'success'
          });
          this.AddVisible = false;
        }).catch(err => {

        });
      },
      //预约添加
      orderPlus(week) {
        this.infoLoading = true;
        let param = {
          count: this.addAndOrder.addNum,
          czry: '00 ',
          fscj: week.fscj,
          hxly: 'YJ', //正常排班ZC，医生加号YJ，护士加号HJ，门办加号MJ
          mxxh: week.mxxh,
          needHxList: 1,
          qddm: this.addAndOrder.channelList.qddm,
          zydm: ''
        };
        this.$wnhttp("PAT.WEB.APPOINTMENT.REGISTRATION.Y10", param).then(data => {
          if (data == '') {

          } else {
            this.$message('已成功加号！');
            this.getTableList();
            this.infoLoading = false;
          }
        }).catch(err => {
          console.log(err);
        });
      },
      //添加并预约
      detailPost(week) {
        if (JSON.stringify(this.inquiryForm) == '{}') {
          this.$message({
            message: '无患者信息！',
            type: 'warning'
          });
        } else {
          this.$store.commit('order/SET_DETAILINFO', week);
          this.$store.commit('order/SET_PATIENTINFO', this.inquiryForm);
          this.$router.push('/order/orderdetail');
        }
      },
      //更改当前号序
      changeNowHx(item){
        this.selectWeek.nowHx=item.hx;
        this.selectWeek.nowXh=item.xh;
      },
      collapse() {
        if (this.btntext == '展开') {
          this.detailShow = true;
          this.btntext = '收起';
        } else {
          this.detailShow = false;
          this.btntext = '展开';
        }
      }
    }
  }
</script>
<style scoped>
  .filter-warrper > div {
    margin-bottom: 10px;
  }

  .order-search {
    width: 550px;
    display: inline-block;
  }

  .form-input {
    display: inline-block;
    width: 250px;
  }

  .bottom-border {
    border-bottom: 1px dashed #e0e0e0;
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

  .el-input {
    height: 36px !important;
    line-height: 36px !important;
  }

  .order-warrper {
    padding: 20px;
    background: #fff;
  }

  .line {
    width: 100%;
    display: inline-block;
    height: 1px;
    border-bottom: 1px dashed #e0e0e0;
    position: relative;
    bottom: 5px;
  }

  .el-form-item {
    margin-bottom: 10px;
  }

  .detail-collapse {
    float: right;
    color: #20a0ff;
    cursor: pointer;
    width: 100%;
    display: inline-block;
    text-align: right;
  }

  .order-search-box {
    margin-bottom: 20px !important;
  }

  .width-200 {
    width: 200px;
    margin-right: 20px;
  }

  .width-469 {
    width: 469px;
  }

  .width-525 {
    width: 525px;
  }

  .form-row {
    display: inline-block;
    width: 100%;
  }

  .table-time {
    display: inline-block;
    width: 100%;
    padding-left: 170px;
    box-sizing: border-box;
    position: relative;
  }

  .table-time > .btn-left,
  .table-time > .btn-right {
    position: absolute;
    width: 25px;
    height: 25px;
    top: 25px;
    cursor: pointer;
  }

  .table-time > .btn-left {
    left: 160px;
  }

  .table-time > .btn-right {
    right: -10px;
  }

  .table-time > span {
    width: 12.5%;
    height: 45px;
    line-height: 45px;
    float: left;
    font-size: 14px;
    text-align: center;
    box-sizing: border-box;
  }

  .table-time > span > p {
    height: 23px;
    line-height: 23px;
  }

  .table-time > span > p.day {
    font-weight: bold;
  }

  .table-time > span > p.today {
    color: rgb(32, 160, 255);
  }

  .AdTable > .AdTableLeft,
  .AdTable > .AdTableRight {
    box-sizing: border-box;
    float: left;
  }

  .AdTable > .AdTableLeft {
    width: 160px;
    height: 166px;
    position: absolute;
    left: 0;
  }

  .AdTable > .AdTableRight {
    width: 100%;
    padding-left: 160px;
    box-sizing: border-box;
  }

  .table-body {
    width: 100%;
    display: inline-block;
    border-right: 1px solid #e0e0e0;
  }

  .AdTable {
    position: relative;
    margin: 0 0 10px 0;
    display: inline-block;
    width: 100%;
  }

  .AdTableLeft > div {
    height: 166px;
    line-height: 166px;
  }

  .AdTableLeft > div > i {
    width: 60px;
    height: 60px;
    float: left;
    margin: 60px 0px;
    background: url('../../../static/img/man.png') center center no-repeat;
  }

  .AdTableLeft > div > p {
    float: left;
    width: 100px;
    height: 166px;
    text-align: center;
    margin: 45px 0px;
    padding: 70px 0;
    box-sizing: border-box;
  }

  .AdTableLeft > div > p > span {
    height: 20px;
    line-height: 20px;
    width: 100px;
    display: inline-block;
    float: left;
  }

  .AdTableLeft > div > p > .name {
    font-size: 15px;
    font-weight: bold;
    color: #333;
  }

  .AdTableLeft > div > p > .position {
    color: #999;
  }

  .table-body > div {
    width: 100%;
    display: inline-block;
    float: left;
  }

  .table-body > .border-top-1 {
    border-top: 1px solid #D4DEED;
  }

  .table-body > div > span {
    width: 12.5%;
    height: 60px;
    line-height: 60px;
    float: left;
    text-align: center;
    box-sizing: border-box;
    border-left: 1px solid #D4DEED;
    border-bottom: 1px solid #D4DEED;
  }

  .AdTableLeft > div > p {
    float: left;
    width: 100px;
    text-align: center;
    box-sizing: border-box;
    height: 80px;
    padding: 20px 0;
  }

  .AdTableLeft > div > p > .name {
    font-size: 15px;
    font-weight: bold;
    color: #333;
  }

  .AdTableLeft > div > p > .position {
    color: #999;
  }

  .ordered {
    width: 100%;
    height: 100%;
    display: inline-block;
    font-size: 14px;
    box-sizing: border-box;
    padding: 10px 0;
  }

  .ordered > p {
    height: 20px;
    line-height: 20px;
  }
  /*default,expert,disease,union,VIP*/

  .ordered.allcan,
  .ordered.somecan,
  .ordered.cant {
    cursor: pointer;
  }

  .ordered.somecan {
    color: rgb(32, 160, 255);
    background: rgb(192, 229, 255);
  }

  .ordered.allcan {
    color: rgb(12, 175, 148);
    background: rgb(231, 250, 240);
  }

  .ordered.cant {
    color: rgb(255, 73, 73);
    background: rgb(255, 237, 237);
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

  .type-filter > .somecan {
    color: rgb(32, 160, 255);
  }

  .type-filter > .allcan {
    color: rgb(12, 175, 148);
  }

  .type-filter > .cant {
    color: rgb(255, 73, 73);
  }

  .type-filter > .somecan > i {
    border: 1px solid rgb(192, 229, 255);
    background: rgb(233, 246, 255);
  }

  .type-filter > .allcan > i {
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

  .fixed-info {
    padding: 5px;
    color: #999;
  }

  .fixed-body {
    padding-bottom: 10px;
  }

  .fixed-body > p {
    width: 100%;
    display: inline-block;
  }

  .fixed-body > p > span,
  .order-plus-row > span {
    display: inline-block;
    float: left;
    width: 130px;
  }

  .fixed-body > p > span.fixed-label {
    width: 60px;
  }

  .fixed-title {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #333;
    font-weight: bold;
  }

  .fixed-footer {
    margin-top: 15px;
  }

  .service-cost {
    float: left;
    width: 35px !important;
    display: inline-block;
    padding: 0 3px;
    border-right: 1px dashed #D4DEED;
    text-align: center;
  }

  .service-cost:nth-last-child(1) {
    border-right: 1px dashed transparent;
  }

  .order-plus-text {
    margin: 5px 0;
    color: rgb(43, 145, 255);
    cursor: pointer;
  }

  .order-plus-text:hover {
    color: rgb(6, 187, 255);
  }

  .fixed-line {
    width: 100%;
    display: inline-block;
    border-bottom: 1px dashed #e0e0e0;
    float: left;
    margin: 10px 0;
  }

  .width-190 {
    width: 190px;
  }

  .plus-lable {
    margin: 5px 0;
  }

  .order-plus-row {
    width: 100%;
    display: inline-block;
    float: left;
    margin-bottom: 10px;
  }

  .plus-cost {
    color: rgb(255, 199, 71);
    width: 100%;
    display: inline-block;
    height: 25px;
    line-height: 25px;
    margin-bottom: 5px;
  }

  .no-data {
    width: 100%;
    height: 500px;
    line-height: 500px;
    font-size: 24px;
    color: #999;
    text-align: center;
    vertical-align: middle;
  }
  .ball-row{
    width: 100%;
    display: inline-block;
  }
  .ball-row>span{
    display: inline-block;
    width: 62px;
    height: 62px;
    text-align: center;
    box-sizing: border-box;
    float: left;
    margin: 5px;
  }
  .ball-row>span>i{
    cursor: pointer;
    display: inline-block;
    font-style: normal;
    width: 60px;
    height: 60px;
    line-height: 60px;
    border-radius: 50%;
    border: 1px solid #e0e0e0;
    font-size: 18px;
  }
  .ball-row>span>i:hover{
    border: 1px solid #20a0ff;
  }
  .ball-row>span>i>p.num{
    height: 35px;
    line-height: 35px;
  }
  .ball-row>span>i>p.price{
    height: 14px;
    line-height: 14px;
    font-size: 14px;
  }
</style>
