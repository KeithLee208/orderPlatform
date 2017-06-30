<template>
  <div class="setting-wraaper">
    <div class="setting-header">
      <router-link to="/scheduling/template" class="pull-right">
        <i class="el-icon-close"></i>
      </router-link>
      <span>春季排班模板设置</span>
      <span class="used-time"> <i class="el-icon-time"></i>使用时间：2017/03/02-2017/05/02</span>
    </div>
    <div class="setting-body">
      <div class="setting-main">
        <div>
          <div class="page-head">
            <div class="type-filter">
              <span>服务类型</span>
              <span><i class="el-icon-menu all"></i>全部</span>
              <span><i class="default"></i>普通（10）</span>
              <span><i class="expert"></i>专家（2）</span>
              <span><i class="disease"></i>专病（3）</span>
              <span><i class="union"></i>联合（4）</span>
              <span><i class="VIP"></i>特需（5）</span>
               <span class="pull-right">
                <el-button @click="SettingVisible = true" icon="plus" type="primary" size="small">设置排班模板</el-button>
                <el-button @click="SubmitVisible = true" type="primary" size="small">提交</el-button>
                <el-button @click="ExportVisible = true" type="primary" size="small">导出</el-button>
                <el-button @click="PrintVisible = true" type="primary" size="small">打印</el-button>
                 <!--设置-->
              <el-dialog  title="排班模板设置" :visible.sync="SettingVisible" size="large" :show-close="false" top="5%">
             <div class="Adjustment" style="">
               <a>调整记录</a>
             </div>
            <div>
              <el-form  ref="form" :model="form" label-width="80px">
                  <el-form-item label="服务类型">
                       <div class="type-filter in-model">
                        <span ><i class="el-icon-menu all"></i>全部</span>
                        <span><i class="default"></i>普通（10）</span>
                        <span><i class="expert"></i>专家（2）</span>
                        <span><i class="disease"></i>专病（3）</span>
                        <span><i class="union"></i>联合（4）</span>
                        <span><i class="VIP"></i>特需（5）</span>
                        </div>
                  </el-form-item>
                 <el-form-item label="选择医生">
                      <el-col :span="14">
                        <el-select v-model="form.region" placeholder="请选择医生">
                          <el-option label="赵大宝" value="赵大宝"></el-option>
                          <el-option label="秦明" value="秦明"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="10">
                          <el-form-item label="选择病种">
                              <el-select v-model="form.region" placeholder="请选择病种">
                                  <el-option label="赵大宝" value="赵大宝"></el-option>
                                  <el-option label="秦明" value="秦明"></el-option>
                              </el-select>
                          </el-form-item>
                      </el-col>
                   </el-form-item>
                  <el-form-item label="选择院区">
                    <el-radio-group v-model="form.radio">
                      <el-radio :label="1">徐汇院区</el-radio>
                      <el-radio :label="2">黄埔院区</el-radio>
                    </el-radio-group>
                  </el-form-item>
                   <el-form-item label="就诊科室">
                    <el-radio-group v-model="form.radio2">
                      <el-radio :label="4">胸外科精品A</el-radio>
                      <el-radio :label="5">胸外科精品B</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="就诊时间">
                      <el-checkbox-group v-model="form.type">
                          <el-checkbox label="周一" name="type"></el-checkbox>
                          <el-checkbox label="周二" name="type"></el-checkbox>
                          <el-checkbox label="周三" name="type"></el-checkbox>
                          <el-checkbox label="周四" name="type"></el-checkbox>
                          <el-checkbox label="周五" name="type"></el-checkbox>
                          <el-checkbox label="周六" name="type"></el-checkbox>
                          <el-checkbox label="周七" name="type"></el-checkbox>
                      </el-checkbox-group>
                  </el-form-item>
                 <el-form-item label="出诊时间">
                  <el-col :span="14">
                      <el-radio-group v-model="form.resource">
                          <el-radio label="上午 8:00-12:00"></el-radio>
                          <el-radio label="下午 13:00-17:00"></el-radio>
                          <el-radio label="晚上 17:00-22:00"></el-radio>
                      </el-radio-group>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="时间段">
                     <el-time-picker
                       is-range
                       v-model="form.value3"
                       placeholder="选择时间范围">
                    </el-time-picker>
                      </el-form-item>
                  </el-col>
                    </el-form-item>
                  <el-form-item label="就诊地址">
                      <el-input type="input" v-model="form.desc"></el-input>
                  </el-form-item>
                <el-form-item label="备注信息">
                      <el-input type="input" v-model="form.desc"></el-input>
                  </el-form-item>
                <el-form-item >
                      <el-button @click="TemSuccess" class="pull-right"  type="success">保存并继续</el-button>
                  </el-form-item>
                   <div class="table-time">
            <span></span>
            <span>周一</span>
            <span>周二</span>
            <span>周三</span>
            <span>周四</span>
            <span>周五</span>
            <span>周六</span>
            <span>周日</span>
          </div>
                   <div class="AdTable">
            <div class="AdTableLeft">
              <div>
                <i></i>
                <p>
                  <span>主治医师</span>
                  <span>张文</span>
                </p>
              </div>
            </div>
            <div class="AdTableRight">
              <div class="table-body">
                <div class="border-top-1">
                  <span>上午</span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div>
                  <span>下午</span>
                  <span>
                  <div @click="dialogVisible = true" class="ordered disease">
                    <p>09:00-11:30</p>
                    <p>胸外科精品B</p>
                  </div>
                </span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span>
                  <div class="ordered union">
                    <p>09:00-11:30</p>
                    <p>胸外科精品B</p>
                  </div>
                </span>
                  <span></span>
                </div>
                <div>
                  <span>晚上</span>
                  <span></span>
                  <span>
                  <div class="ordered VIP">
                    <p>09:00-11:30</p>
                    <p>胸外科精品B</p>
                  </div>
                  </span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
              </el-form>
              </div>
             <div slot="footer" class="dialog-footer">
                <el-button  @click="SettingVisible = false" >取消</el-button>
                 <el-button @click="TemSuccess" type="primary">保存</el-button>
                  <el-button type="success" >保存并设置下一位</el-button>
              </div>
              </el-dialog>
                 <!--打印-->
              <el-dialog title="打印出班表" :visible.sync="PrintVisible" size="tiny">
              <span>
              <p>起始时间：
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  size="small"
                  :picker-options="pickerOptions0"
                  v-model="value1"
                >
              </el-date-picker>
              </p>
              <p>截止日期：
              <el-date-picker
                type="date"
                placeholder="选择日期"
                size="small"
              >
              </el-date-picker>
              </p>
            </span>
                <span slot="footer" class="dialog-footer">
                <el-button @click="PrintVisible = false">取 消</el-button>
                <el-button type="primary" @click="PrintVisible = false">打 印</el-button>
              </span>
            </el-dialog>
                 <!--导出-->
              <el-dialog title="导出为Excel" :visible.sync="ExportVisible" size="tiny" :show-close="false">
              <span>
              <p>起始时间：
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  size="small"
                >
              </el-date-picker>
              </p>
              <p>截止日期：
              <el-date-picker
                type="date"
                placeholder="选择日期"
                size="small"
              >
              </el-date-picker>
              </p>
            </span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="ExportVisible = false">取 消</el-button>
                <el-button type="primary" @click="TemSuccess">导 出</el-button>
              </span>
            </el-dialog>
              <el-dialog title="当前已设置" :visible.sync="SubmitVisible" size="tiny"  :show-close="false">
              <div class="setting-dialog-text">
                    <p>
                      普通门诊：10个
                    </p>
                    <p>
                      专家门诊：2个
                    </p>
                    <p>
                      专病门诊：3个
                    </p>
                    <p>
                      联合门诊：4个
                    </p>
                    <p>
                      特需门诊：3个
                    </p>
              </div>
              <span slot="footer" class="dialog-footer">
              <el-button @click="SubmitVisible = false">取 消</el-button>
              <el-button type="primary"  @click="MsgSuccess">提 交</el-button>
              </span>
              </el-dialog>
              </span>
            </div>
          </div>
          <div class="table-time">
            <span></span>
            <span>周一</span>
            <span>周二</span>
            <span>周三</span>
            <span>周四</span>
            <span>周五</span>
            <span>周六</span>
            <span>周日</span>
          </div>
          <div v-for="item in addtable" class="AdTable">
            <div class="AdTableLeft">
              <div>
                <i></i>
                <p>
                  <span>主治医师</span>
                  <span>张文</span>
                </p>
              </div>
            </div>
            <div class="AdTableRight">
              <div class="table-body">
                <div class="border-top-1">
                  <span>上午</span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div>
                  <span>下午</span>
                  <span>
                  <div @click="dialogVisible = true" class="ordered disease">
                    <p>09:00-11:30</p>
                    <p>胸外科精品B</p>
                  </div>
                </span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span>
                  <div class="ordered union">
                    <p>09:00-11:30</p>
                    <p>胸外科精品B</p>
                  </div>
                </span>
                  <span></span>
                </div>
                <div>
                  <span>晚上</span>
                  <span></span>
                  <span>
                  <div class="ordered VIP">
                    <p>09:00-11:30</p>
                    <p>胸外科精品B</p>
                  </div>
                  </span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        SettingVisible: false,
        PrintVisible: false,
        ExportVisible: false,
        SubmitVisible: false,
        value1: '',
        form: {
          name: '',
          region: '',
          radio: '1',
          radio2: '1',
          type: [],
          resource: '',
          value3: [new Date(2017, 1, 1, 0), new Date(2017, 1, 1, 23)],
          desc: ''
        },
        addtable:[1,2,3],
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        }
      };
    },
    methods: {
      MsgSuccess() {
        this.SubmitVisible=false;
        this.$message({
          message: '噢啦啦啦啦啦啦提交成功！',
          type: 'success'
        });
      },
      TemSuccess(){
        this.$message({
          message: '成功！',
          type: 'success'
        });
      }
    }
  };
</script>

<style scoped>
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

  .setting-header > a > i {
    color: #fff;
  }

  .setting-header > span {
    font-size: 16px;
  }

  .setting-header > .used-time {
    font-size: 14px;
    color: #bbb;
    margin-left: 15px;
  }

  .setting-body {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    display: inline-block;
  }

  .setting-main {
    width: 100%;
    height: 790px;
    display: inline-block;
    background: #fff;
    box-sizing: border-box;
  }
  .Adjustment{
    height: 25px; line-height:25px;position: absolute;right: 20px;top: 30px;
  }
  .Adjustment>a{
    text-decoration: none;
    color:rgb(32, 160, 255);
  }
  .setting-dialog-text{
    padding-left: 20%;
  }
  .setting-dialog-text>p{
    color: #999;
    height: 30px;
    line-height: 30px;
  }
/*-------------------------------*/
  .table-time {
    display: inline-block;
    width: 100%;
    padding-left: 170px;
    box-sizing: border-box;
  }

  .table-time > span {
    width: 12.5%;
    height: 55px;
    line-height: 55px;
    float: left;
    text-align: center;
    box-sizing: border-box;
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
    width: 40px;
    height: 40px;
    float: left;
    margin: 53px 0px;
    background: red;
  }

  .AdTableLeft > div > p {
    float: left;
    width: 120px;
    height: 166px;
    text-align: center;
    padding: 50px 0;
    box-sizing: border-box;
  }

  .AdTableLeft > div > p > span {
    height: 30px;
    line-height: 30px;
    width: 100px;
    display: inline-block;
    float: left;
  }

  .table-body > div {
    width: 100%;
    display: inline-block;
    float: left;
  }

  .table-body > .border-top-1 {
    border-top: 1px solid #e0e0e0;
  }

  .table-body > div > span {
    width: 12.5%;
    height: 60px;
    line-height: 60px;
    float: left;
    text-align: center;
    box-sizing: border-box;
    border-left: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    box-sizing: border-box;
  }

  .ordered {
    width: 100%;
    height: 100%;
    display: inline-block;
    font-size: 14px;
  }

  .ordered > p {
    height: 30px;
    line-height: 30px;
  }
  /*default,expert,disease,union,VIP*/

  .ordered.default,
  .ordered.expert,
  .ordered.disease,
  .ordered.union,
  .ordered.VIP {
    cursor: pointer;
  }

  .ordered.default {
    background: rgb(185, 185, 185);
    color: #fff;
  }

  .ordered.expert {
    color: rgb(32, 160, 255);
    background: rgb(192, 229, 255);
  }

  .ordered.disease {
    color: rgb(12, 175, 148);
    background: rgb(231, 250, 240);
  }

  .ordered.union {
    color: rgb(232, 166, 35);
    background: rgb(255, 248, 234);
  }

  .ordered.VIP {
    color: rgb(255, 73, 73);
    background: rgb(255, 237, 237);
  }

  .page-head > div {
    height: 50px;
    line-height: 50px;
  }

  .type-filter > span {
    display: inline-block;
    cursor: default;
  }

  .type-filter > span > .all {
    border: 1px solid transparent;
    margin-top: 15px;
    color: #e0e0e0;
    font-size: 16px;
  }

  .type-filter > span > .default {
    background: #fff;
  }

  .type-filter > span > .expert {
    border: 1px solid rgb(192, 229, 255);
    background: rgb(233, 246, 255);
  }

  .type-filter > span > .disease {
    border: 1px solid rgb(188, 241, 212);
    background: rgb(231, 250, 240);
  }

  .type-filter > span > .union {
    border: 1px solid rgb(254, 235, 195);
    background: rgb(255, 248, 234);
  }

  .type-filter > span > .VIP {
    border: 1px solid rgb(255, 204, 204);
    background: rgb(255, 237, 237);
  }

  .type-filter > span > i {
    width: 16px;
    height: 16px;
    float: left;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    margin: 15px 5px 0 10px;
    cursor: pointer;
  }
  .in-model > span > i, .in-model > span>.all{
    margin: 10px 5px 0 10px;
  }
  .setting-wraaper {
    position: absolute;
    display: inline-block;
    top: 0;
    left: 0;
    width: 100%;
    height: 880px;
    background: #fff;
  }
</style>
