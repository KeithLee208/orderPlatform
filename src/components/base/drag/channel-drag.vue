<template>
  <div>
    <div class="Channel-Warrper">
      <draggable @update="datadragEnd"  @start="drag=true" @end="drag=false">
        <div v-for="item in channal" :key="channal.index" class="channel-box" :class="item.type">
          <p class="top">{{item.num}}</p>
          <p class="footer">{{item.name}}</p>
        </div>
      </draggable>
    </div>
    <div class="production">
      <el-button @click="production()" class="pull-right" type="success">生成号序</el-button>
    </div>
    <div v-if="ball">
      <div class="ball-row">
        <draggable  @update="datadragEnd" @start="drag=true" @end="drag=false">
             <span v-for="item1 in num1">
               <i>{{item1}}</i>
             </span>
              <span v-for="item2 in num2">
               <i class="hospital">{{item2+num1}}</i>
             </span>
              <span v-for="item3 in num3">
               <i class="wechat">{{item3+num1+num2}}</i>
             </span>
              <span v-for="item4 in num4">
               <i class="web">{{item4+num1+num2+num3}}</i>
             </span>
              <span v-for="item5 in num5">
               <i class="official">{{item5+num1+num2+num3+num4}}</i>
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
    data(){
      return{
       channal:[
         {
         name:'非预约',
         num:'5',
         type:'default',
         index:0
         },
         {
           name:'院内预约',
           num:'3',
           type:'hospital',
           index:1
         },
         {
           name:'官微预约',
           num:'10',
           type:'wechat',
           index:2
         },
         {
           name:'挂号网预约',
           num:'8',
           type:'web',
           index:3
         },
         {
           name:'官网预约',
           num:'4',
           type:'official',
           index:4
         }
       ],
        ball:false,
        num1:5,
        num2:3,
        num3:10,
        num4:8,
        num5:4
      }
    },
    methods:{
      production(){
        this.ball=true;
      },
      datadragEnd (evt) {
        console.log(this.channal)

//        console.log(this.draggedContext.element.name)
      }
    },
    components:{
      draggable
    }
  }
</script>

<style scoped>

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
  .channel-box.wechat{
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
  .ball-row>div>span>i.wechat{
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
