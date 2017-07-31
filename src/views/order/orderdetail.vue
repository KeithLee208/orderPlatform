<template>
  <div class="setting-wraaper">
    <div class="setting-header">
      <router-link to="/order" class="pull-right">
        <i class="el-icon-close"></i>
      </router-link>
      <span>预约凭证打印</span>
    </div>
    <div class="set-body">
      <div class="box-title">
        <span>预约信息</span>
      </div>
      <el-form :inline="true" label-width="100px" class="demo-form-inline">
        <el-row class="padding-left-30">
          <el-form-item>
            <el-radio-group class="width-230" >
              <el-radio label="普通门诊"></el-radio>
              <el-radio label="特需 上午8:00-12:00"></el-radio>
              <el-radio label="专病 下午14:00-16:00"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="预约医生：">
              普通门诊医生
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="服务类型：">
              普通门诊
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="预约医院：">
              黄埔院区
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="预约科室：">
              胸外科1
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="预约时间：">
              2017/05/01 上午8:00-12:00
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="服务费用：">
              20元
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="就诊地址：">
              3号楼9楼胸外科1
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
        <div class="fixed-line"></div>
        <div class="box-title">
          <span>患者基本信息 </span><p>就诊卡号：238288666528</p>
        </div>
        <el-form :inline="true" label-width="100px" class="demo-form-inline">
          <el-row>
            <el-col :span="8">
              <el-form-item label="姓名：">
                <el-input placeholder="请输入姓名" value="张小凡"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证号：">
                <el-input placeholder="请输入身份证号" value="342220199008282323"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系电话：">
                <el-input  placeholder="请输入联系电话" value="18088669966"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="性别：">
                <el-radio-group value="男" class="width-230" >
                  <el-radio label="男" value="男"></el-radio>
                  <el-radio label="女"></el-radio>
                  <el-radio label="不详"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="婚姻状况：">
                <el-radio-group value="已婚" class="width-230" >
                  <el-radio label="已婚" value="已婚"></el-radio>
                  <el-radio label="未婚"></el-radio>
                  <el-radio label="不详"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="初复诊：">
                <el-input  placeholder="请输入初复诊" value="初诊"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="联系地址：">
                <el-input  placeholder="请输入民族" value="上海徐汇区浦北路323号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="费用类别：">
                <el-input  placeholder="请输入联系地址" value="自费"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="患者职业：">
                <el-input  placeholder="请输入患者职业" value="工人"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="民族：">
                <el-input  placeholder="请输入婚姻状况" value="汉"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="户口地|省：">
                <el-input  placeholder="请输入户口所在地" value="上海徐汇区"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="详细地址：">
                <el-input class="width-469" placeholder="请输入详细地址" value="上海徐汇区浦北路323号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="居住地|省：">
                <el-input  placeholder="请输入居住地址" value="上海徐汇区"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="详细地址：">
                <el-input  class="width-469"  placeholder="请输入详细地址" value="上海徐汇区浦北路323号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
       <span class="pull-right">
         <router-link tag="span" to="/order">
            <el-button type="defalut">
            取消
            </el-button>
           </router-link>
            <el-button type="primary">预约并打印</el-button>
         </span>
    </div>

  </div>
</template>
<script>

  export default{

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
  .fixed-line{
    width: 100%;
    display: inline-block;
    border-bottom: 1px dashed #e0e0e0;
    float: left;
    margin: 0px 0 20px;
  }
</style>

