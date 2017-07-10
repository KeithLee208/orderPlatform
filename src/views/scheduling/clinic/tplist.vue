<template>
  <div class="setting-wraaper">
    <div class="setting-header">
      <router-link tag="span" to="/scheduling/clinic/tpcard">
        <i class="el-icon-arrow-left"></i>
        <span>XX出班模板</span>
      </router-link>

      <span class="used-time"> <i class="el-icon-time"></i>使用时间：2017/03/02-2017/05/02</span>
    </div>
    <div class="setting-body">
      <div class="setting-main">
          <div class="page-head">
            <div class="type-filter">
              <span><i class="el-icon-menu all"></i>全部</span>
              <span class="submit"><i></i>已提交（10）</span>
              <span class="unsubmit"><i></i>待提交（2）</span>
               <span class="pull-right">
                <el-button class="btn-blue" @click="SettingVisible=true" type="primary">设置费用及号序 </el-button>
              </span>
            </div>
          </div>
          <div class="Att-list-body">
            <div class="Att-row" v-for="item in attList">
              <div class="Att-row-lable">
                {{item.name}}
              </div>
              <div class="Att-row-data">
            <span v-for="(att,index) in item.children">
              <router-link to="/scheduling/clinic/tptable">
                  <el-popover  placement="bottom" width="200" trigger="hover">
                 <div class="fixed-info">
                  <p class="fixed-info-title">门诊号源信息</p>
                  <p><i class="default"></i>普通（10）</p>
                  <p><i class="expert"></i>专家（2）</p>
                  <p><i class="disease"></i>专病（3）</p>
                  <p><i class="union"></i>联合（4）</p>
                  <p><i class="VIP"></i>特需（5）</p>
                 </div>
                  <el-button type="text" slot="reference">{{att.name}}</el-button>
            </el-popover>
                </router-link>
            </span>
              </div>
            </div>
          </div>
        </div>
    </div>
    <el-dialog  title="设置费用及号序" :visible.sync="SettingVisible" size="large"  top="5%">
      <!--<div class="Adjustment" style="">-->
        <!--<a>调整记录</a>-->
      <!--</div>-->
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
          <el-form-item label="选择科室">
            <el-select style="width: 30%" v-model="form.value5" multiple filterable placeholder="请选择">
              <el-option
                v-for="item in form.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
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
          <el-form-item label="服务费用">
            <el-radio-group v-model="form.cost" @change="CostChange">
              <el-radio label="1" >按号序设置费用</el-radio>
              <el-radio label="2" >不按号序设置费用</el-radio>
            </el-radio-group>
            <span class="cost">服务总费用</span>
            <el-input class="cost-input" ></el-input>元
          </el-form-item>
          <div class="source" v-if="form.Source">
            <div class="source-card" @mouseenter="SourceMouseOver()" @mouseleave="SourceMouseLeave()">
              <el-form  label-width="45px" >
                <el-form-item label="号段">
                  <el-col :span="10">
                    <el-input></el-input>
                  </el-col>
                  <el-col class="line" style="text-align: center" :span="4">-</el-col>
                  <el-col :span="10">
                    <el-input></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item label="费用">
                  <el-input placeholder="元"></el-input>
                </el-form-item>
              </el-form>
              <i v-if="form.CloseShow" @click="DelCard()" class="card-close el-icon-close"></i>
            </div>
            <div @click="AddCard()"  class="source-plus">
             <i class="el-icon-plus"></i>
            </div>
          </div>
          <div class="unsource" v-if="form.UnSource">
            <el-form  label-width="100px" >
              <el-form-item label="设置总号源数">
                <el-input style="width: 170px"></el-input>
              </el-form-item>
            </el-form>
          </div>

          <div class="form-line"></div>
          <el-form-item label="配置号序">
            <span class="num-info">(当前号源数18)</span>
          </el-form-item>
          <div class="Channel">
            <el-radio-group v-model="form.channel" @change="ChannelChange">
            <el-radio label="1" >区分渠道</el-radio>
            <el-radio label="2" >不区分渠道</el-radio>
          </el-radio-group>
            <div v-if="form.Channel">
              <div class="Channel-Warrper">
                <draggable  @start="drag=true" @end="drag=false">
                 <div class="channel-box default">
                <p class="top">5</p>
                <p class="footer">非预约</p>
              </div>
                 <div class="channel-box hospital">
                <p class="top">3</p>
                <p class="footer">院内预约</p>
              </div>
                 <div class="channel-box weChat">
                <p class="top">10</p>
                <p class="footer">官微预约</p>
              </div>
                 <div class="channel-box web">
                <p class="top">8</p>
                <p class="footer">挂号网预约</p>
              </div>
                  <div class="channel-box official">
                <p class="top">4</p>
                <p class="footer">官网预约</p>
              </div>
                </draggable>
            </div>
              <div class="production">
                 <el-button class="pull-right" type="success">生成号序</el-button>
              </div>
              <div>
                 <div class="ball-row">
                   <span>
                     <i>1</i>
                   </span>
                    <span>
                     <i>2</i>
                   </span>
                    <span>
                     <i>3</i>
                   </span>
                    <span>
                     <i class="hospital">4</i>
                   </span>
                    <span>
                     <i class="hospital">5</i>
                   </span>
                    <span>
                     <i class="hospital">6</i>
                   </span>
                    <span>
                     <i class="weChat">7</i>
                   </span>
                    <span>
                     <i class="weChat">8</i>
                   </span>
                    <span>
                     <i class="weChat">9</i>
                   </span>
                    <span>
                     <i class="weChat">10</i>
                   </span>

                 </div>
                 <div class="ball-row">
                   <span>
                     <i class="weChat">11</i>
                   </span>
                    <span>
                     <i class="web">12</i>
                   </span>
                    <span>
                     <i class="web">13</i>
                   </span>
                    <span>
                     <i class="web">14</i>
                   </span>
                    <span>
                     <i class="web">15</i>
                   </span>
                    <span>
                     <i class="official">16</i>
                   </span>
                    <span>
                     <i class="official">17</i>
                   </span>
                    <span>
                     <i class="official">18</i>
                   </span>
                    <span>
                     <i class="official">19</i>
                   </span>
                    <span>
                     <i class="plus el-icon-plus"></i>
                   </span>
                </div>
              </div>
          </div>
            <div class="UnChannel" v-if="form.UnChannel">
              <el-form label-width="100px" >
                <el-form-item label="设置总号源数">
                  <el-input style="width: 170px"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button  @click="SettingVisible = false" >取消</el-button>
        <el-button @click="MsgSuccess" type="primary">保存</el-button>
        <el-button type="success" >保存并设置下一位</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  export default {
    data() {
      return {
        SettingVisible:false,
        attList:[
          {
            name:"外科",
            children:[
              { name:"胃肠科（东院）" },{ name:"烧伤科" },{ name:"胸心外科" },{ name:"脑外科（西园）" },
              { name:"胃肠科（西院）" },{ name:"心血管科" },{ name:"泌尿外科" },{ name:"烧伤科" },
              { name:"口腔科门诊（东院）" },{ name:"胸心外科" },{ name:"胃肠科（东院）" }
            ]
          },
          {
            name:"外科",
            children:[
              { name:"胃肠科（东院）" },{ name:"烧伤科" },{ name:"胸心外科" },{ name:"脑外科（西园）" },
              { name:"胃肠科（西院）" },{ name:"心血管科" },{ name:"泌尿外科" },{ name:"烧伤科" },
              { name:"口腔科门诊（东院）" },{ name:"胸心外科" },{ name:"胃肠科（东院）" }
            ]
          },
          {
            name:"外科",
            children:[
              { name:"胃肠科（东院）" },{ name:"烧伤科" },{ name:"胸心外科" },{ name:"脑外科（西园）" },
              { name:"胃肠科（西院）" },{ name:"心血管科" },{ name:"泌尿外科" },{ name:"烧伤科" },
              { name:"口腔科门诊（东院）" },{ name:"胸心外科" },{ name:"胃肠科（东院）" }
            ]
          },
          {
            name:"外科",
            children:[
              { name:"胃肠科（东院）" },{ name:"烧伤科" },{ name:"胸心外科" },{ name:"脑外科（西园）" },
              { name:"胃肠科（西院）" },{ name:"心血管科" },{ name:"泌尿外科" },{ name:"烧伤科" },
              { name:"口腔科门诊（东院）" },{ name:"胸心外科" },{ name:"胃肠科（东院）" }
            ]
          }
        ],
        form: {
          name: '',
          region: '',
          radio: '1',
          radio2: '1',
          type: [],
          resource: '',
          value3: [new Date(2017, 1, 1, 0), new Date(2017, 1, 1, 23)],
          desc: '',
          cost:'',
          options: [
            {
            value: '1',
            label: '脑外科'
          }, {
            value: '2',
            label: '胸外科精品A'
          }, {
            value: '3',
            label: '呼吸内科'
          }, {
            value: '4',
            label: '胸外科精品B'
          }, {
            value: '5',
            label: '骨科'
          }],
          value5:'',
          channel:'',
          Source:false,
          UnSource:false,
          CloseShow:false,
          Channel:false,
          UnChannel:false
        }
        }
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
      },
      CostChange(value){
        if (value == '1')
        {
          this.form.Source=true;
          this.form.UnSource=false;
        }
        else if(value == '2')
        {
          this.form.Source=false;
          this.form.UnSource=true;

        }
      },
      ChannelChange(value){
        if (value == '1')
        {
          this.form.Channel=true;
          this.form.UnChannel=false;
        }
        else if(value == '2')
        {
          this.form.Channel=false;
          this.form.UnChannel=true;

        }
      },
      SourceMouseOver(){
        this.form.CloseShow=true;
      },
      SourceMouseLeave(){
        this.form.CloseShow=false;
      },
      DelCard(){
        alert('卡片删除事件.');
      },
      AddCard(){
        alert('增加卡片事件.');
      }
    },
    components:{
      draggable
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
    background:rgb(63,81,181);
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
    cursor: pointer;
  }

  .setting-header > .used-time {
    font-size: 14px;
    color: #bbb;
    margin-left: 15px;
    color: rgba(255,255,255,.5);
  }
  .setting-header > .used-time>i{
    margin-right: 5px;
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
    height: 25px; line-height:25px;position: absolute;right: 40px;top: 45px;
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

    border-radius: 4px;
    margin: 15px 5px 0 10px;
    cursor: pointer;
  }
  .type-filter>.submit{
    color:#3f51b5;
  }
  .type-filter>.unsubmit{
    color:#e0e0e0;
  }
  .type-filter>.submit>i{
    background: #3f51b5;
  }
  .type-filter>.unsubmit>i{
    background: #e0e0e0;
  }
  .type-filter > span > i {
    width: 16px;
    height: 16px;
    float: left;
    border-radius: 4px;
    margin: 16px 5px 0 10px;
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
  .Att-row{
    width: 100%;
    display: inline-block;
    position: relative;
    margin-bottom: 10px;
    cursor: default;
  }
  .Att-row>.Att-row-lable{
    font-weight: bold;
    font-size: 14px;
    width: 100%;
    height: 20px;
    line-height: 20px;

  }
  .Att-row>.Att-row-data{
    width: 100%;
    box-sizing: border-box;
    display: inline-block;
    border-bottom: 1px solid #E7ECF4;
    padding-bottom: 15px;
  }
  .Att-row-data>span{
    float: left;
    width: 185px;
    height: 30px;
    line-height: 30px;
    color: rgb(32,178,255);
  }
  .Att-list-body{
    padding:10px ;
  }
  .fixed-info-title{
    font-size: 14px;
  }
  .fixed-info > p {
    display: inline-block;
    cursor: default;
    width: 100%;
    padding: 5px;

  }

  .fixed-info > p > .default {
    background: #fff;
  }

  .fixed-info > p > .expert {
    border: 1px solid rgb(192, 229, 255);
    background: rgb(233, 246, 255);
  }

  .fixed-info > p > .disease {
    border: 1px solid rgb(188, 241, 212);
    background: rgb(231, 250, 240);
  }

  .fixed-info > p > .union {
    border: 1px solid rgb(254, 235, 195);
    background: rgb(255, 248, 234);
  }

  .fixed-info > p > .VIP {
    border: 1px solid rgb(255, 204, 204);
    background: rgb(255, 237, 237);
  }

  .fixed-info > p > i {
    width: 16px;
    height: 16px;
    float: left;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    margin: 0px 20px 0 0px;
    cursor: pointer;
  }


  .page-head > div {
    height: 50px;
    line-height: 50px;
  }

  .cost{
    width: 100px;
    margin: 0 10px 0 40px;
  }
  .cost-input{
    width: 100px;
    margin: 0 10px 0 0px;
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
  .el-button--text{
    color: #1d90e6;
  }
  .source,.unsource{
    margin-left: 80px;
    width: 100%;
    display: inline-block;
  }
.source-card{
  width: 300px;
  height: 155px;
  border: 1px solid #E7ECF4;
  border-radius: 2px;
  box-sizing: border-box;
  padding: 25px 25px 25px 10px;
  transition: all .2s;
  display: inline-block;
  margin-right: 20px;
  float: left;
  position: relative;
}
  .source-plus{
    width: 155px;
    height: 155px;
    border: 1px dashed #E7ECF4;
    border-radius: 2px;
    box-sizing: border-box;
    padding: 65px 25px 25px 60px;
    transition: all .2s;
    display: inline-block;
    margin-right: 20px;
    float: left;
    cursor: pointer;
  }
  .source-plus>i{
    color: #e0e0e0;
    font-size: 25px;
  }
  .source-card:hover{
    border: 1px solid rgba(132, 166, 181,.6);
    box-shadow: 0 0 15px rgba(63,81,181, 0.3);
  }
  .source-plus:hover{
    border: 1px dashed rgba(132, 166, 181,.6);
    box-shadow: 0 0 15px rgba(63,81,181, 0.3);
  }
  .card-close{
    position: absolute;
    top:8px;
    right: 8px;
    font-size: 12px;
    color:#e0e0e0 ;
    cursor: pointer;
  }
  .card-close:hover{
    color: #C5C5C5;
  }
  .form-line{
    width: 100%;
    float: left;
    margin: 22px 0 22px 0;
    display: inline-block;
    border-bottom: 1px dashed #e0e0e0;
  }
  .num-info{
    color: rgb(63,169,255);
  }
  .Channel{
    margin-left: 80px;
  }
  .Channel-Warrper{
    margin: 20px 0 20px 0;
  }
  .channel-box{
    min-width: 130px;
    width: 17.5%;
    height: 84px;
    display: inline-block;
    border: 1px solid #e0e0e0;
    border-radius: 2px;
    margin-right: 2%;
    cursor: move;
    box-sizing: border-box;
  }
  .channel-box>.top{
    border-bottom: 1px solid #e0e0e0;
    font-size: 32px;
  }
  .channel-box>.footer{
    font-size: 12px;
  }
  .channel-box.default{
    color: #666;
  }
  .channel-box.hospital{
    color: #20a0ff;
  }
  .channel-box.weChat{
    color: #0caf4e;
  }
  .channel-box.web{
    color: #e8a623;
  }
  .channel-box.official{
color: #ff4949;
  }
  .channel-box>p{
    height: 42px;
    line-height: 42px;
    text-align: center;
  }
  .production{
    width: 100%;
    display: inline-block;
    margin-bottom: 20px;
  }
  .ball-row{
    width: 100%;
    display: inline-block;
    border-bottom: 1px dashed #e0e0e0;
}
  .ball-row:last-child{
    border-bottom: 1px transparent;
  }
  .ball-row>span:last-child{
    border-right: 1px transparent;
  }
  .ball-row>span
  {
    display: inline-block;
    width: 10%;
    height: 80px;
    text-align: center;
    box-sizing: border-box;
    float: left;
    border-right: 1px dashed #e0e0e0;
    padding: 10px;
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
  .ball-row>span>i.hospital{
    border: 1px solid #c0e5ff;
    background: #e9f6ff;
    color: #20a0ff;
  }
  .ball-row>span>i.weChat{
    border: 1px solid #bcf1d4;
    background: #e7faf0;
    color: #0caf4e;
  }
  .ball-row>span>i.web{
    border: 1px solid #feebc3;
    background: #fff8ea;
    color: #e8a623;
  }
  .ball-row>span>i.official{
       border: 1px solid #ffcccc;
       background: #ffeded;
       color: #ff4949;
     }
  .ball-row>span>i.plus{
    color: #e0e0e0;
  }
  .UnChannel{
    margin-top: 20px;
  }
</style>
