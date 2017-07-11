<template>
  <div>
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
        <draggable  @start="drag=true" @end="drag=false">
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
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  export default{
    components:{
      draggable
    }
  }
</script>

<style scoped>
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
  .ball-row>div>span
  {
    display: inline-block;
    width: 10%;
    height: 80px;
    text-align: center;
    box-sizing: border-box;
    float: left;
    padding: 10px;
  }
  .ball-row>div>span>i{
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
  .ball-row>div>span>i.hospital{
    border: 1px solid #c0e5ff;
    background: #e9f6ff;
    color: #20a0ff;
  }
  .ball-row>div>span>i.weChat{
    border: 1px solid #bcf1d4;
    background: #e7faf0;
    color: #0caf4e;
  }
  .ball-row>div>span>i.web{
    border: 1px solid #feebc3;
    background: #fff8ea;
    color: #e8a623;
  }
  .ball-row>div>span>i.official{
    border: 1px solid #ffcccc;
    background: #ffeded;
    color: #ff4949;
  }
  .ball-row>div>span>i.plus{
    color: #e0e0e0;
  }
</style>
