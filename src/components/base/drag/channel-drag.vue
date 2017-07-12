<template>
  <div>
    <div class="Channel-Warrper">
      <draggable v-model="channal" @update="datadragEnd"  @start="drag=true" @end="drag=false">
        <transition-group :name="'flip-list'">
           <div v-for="item in channal" :key="item.num" class="channel-box" :class="item.type">
            <p class="top">{{item.num}}</p>
            <p class="footer">{{item.name}}</p>
          </div>
        </transition-group>
      </draggable>
    </div>
    <div class="production">
      <el-button @click="production()" class="pull-right" type="success">生成号序</el-button>
    </div>
    <div v-if="ball">
      <div class="ball-row">
        <draggable  v-model="ballList" @update="datadragEnd" @start="drag=true" @end="drag=false">
          <transition-group tag="div" :name="'flip-list'">
             <span v-for="item1 in ballList" :key="item1.index">
               <i :class="item1.type">{{item1.index}}</i>
             </span>
          </transition-group>
        </draggable>
              <span>
               <i class="plus el-icon-plus"></i>
             </span>
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
         num:5,
         type:'default',
         children:
           [
             {
              name:88
             },
             {
               name:89
             },
             {
               name:90
             },
             {
               name:91
             },
             {
               name:92
             },
           ]
         },
         {
           name:'院内预约',
           num:3,
           type:'hospital',
           children:
             [
               {
                 name:1
               },
               {
                 name:2
               },
               {
                 name:3
               }
             ]
         },
         {
           name:'官微预约',
           num:4,
           type:'wechat',
           children:
             [
               {
                 name:78
               },
               {
                 name:79
               },
               {
                 name:60
               },
               {
                 name:81
               }
             ]
         },
         {
           name:'挂号网预约',
           num:2,
           type:'web',
           children:
             [
               {
                 name:18
               },
               {
                 name:19
               }
             ]
         },
         {
           name:'官网预约',
           num:1,
           type:'official',
           children:
             [
               {
                 name:1
               }
             ]
         }
       ],
        ball:false,
        ballList:[],
      }
    },
    computed:{
      listString(){
        return JSON.stringify(this.channal, null, 2);
      }
    },
    methods:{
      production(){
        this.ball=true;
        let newArr = [];
        var mynum=0;
        for(var x=0;x<this.channal.length;x++){

          for(var y=0;y<this.channal[x].num;y++){
            newArr.push({index:y+mynum+1,type:this.channal[x].type});
          }
          mynum+=y;
        }

//        console.log(newArr);
//        for(var i=0;i<this.channal.length;i++){
//          sum += this.channal[i].num;
//            newArr.push({name:i,type:''});
//          for(var x=0;x<sum;x++){
//            newArr[i].type.push(x);
//          }
//        }
//        console.log(newArr);
//        for(var x=0;)
//        this.channal.map( item => {
//            item.children.map( item1 => {
//                newArr.push({name:item1.name,type:item.type});
//            });
//        });
        this.ballList = newArr;
      },
      datadragEnd (evt) {

      }
    },
    components:{
      draggable
    },
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
  .ball-row>div>div>span
  {
    display: inline-block;
    width: 10%;
    height: 80px;
    text-align: center;
    box-sizing: border-box;
    float: left;
    padding: 10px;
  }

  .ball-row>div>div>span>i{
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
  .ball-row>span
  {
    display: inline-block;
    width: 10%;
    height: 80px;
    text-align: center;
    box-sizing: border-box;
    float: left;
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
  .ball-row>div>div>span>i.hospital{
    border: 1px solid #c0e5ff;
    background: #e9f6ff;
    color: #20a0ff;
  }
  .ball-row>div>div>span>i.wechat{
    border: 1px solid #bcf1d4;
    background: #e7faf0;
    color: #0caf4e;
  }
  .ball-row>div>div>span>i.web{
    border: 1px solid #feebc3;
    background: #fff8ea;
    color: #e8a623;
  }
  .ball-row>div>div>span>i.official{
    border: 1px solid #ffcccc;
    background: #ffeded;
    color: #ff4949;
  }
  .ball-row>span>i.plus{
    color: #e0e0e0;
  }
  .flip-list-move {
    transition: transform 0.5s;
  }

  .no-move {
    transition: transform 0s;
  }

</style>
