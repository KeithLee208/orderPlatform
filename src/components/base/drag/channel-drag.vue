<template>
  <div>
    <div class="Channel-Warrper">
<<<<<<< HEAD
      <draggable v-model="channal" @update="datadragEnd"  @start="drag=true" @end="drag=false">
           <div v-for="(item,index) in channal" :key="item.num" class="channel-box" :class="item.type">
=======
      <draggable v-model="channal" @update="datadragEnd" @start="drag=true" @end="drag=false">
        <transition-group :name="'flip-list'">
          <div v-for="(item,index) in channal" :key="item.num" class="channel-box" :class="item.type">
>>>>>>> 1926557a993cd502ef8d4bf55d9354eedbf04139
            <p v-if="item.edit==false" @click="numedit(index)" class="top">{{item.num}}</p>
            <p v-if="item.edit==true" class="top">
              <input v-model="item.num" v-focus class="num-edit" type="text">
            </p>
            <p class="footer">{{item.name}}</p>
          </div>
      </draggable>
    </div>
    <div class="production">
      <el-button @click="production()" class="pull-right" type="success">生成号序</el-button>
    </div>
    <div v-if="ball">
      <div class="ball-row">
        <draggable v-model="ballList" @update="datadragEnd" @start="drag=true" @end="drag=false">
          <transition-group tag="div" :name="'flip-list'">
             <span v-for="(item1,index) in ballList" :key="item1.index">
               <i :class="item1.type">
                 <p class="num">{{item1.index}}</p>
                 <p class="price">
                   <span class="ball-price pull-left" v-if="item1.editcan==false" @click="balledit(index)">{{item1.price}}</span>
<<<<<<< HEAD
                    <input v-if="item1.editcan==true" v-model="item1.price" v-focus class="ball-edit" type="text">
=======
                    <input maxlength="3" v-if="item1.editcan==true" v-model="ballnum" v-focus class="ball-edit" type="text"
                           v-on:keyup.enter="changeball(index)">
>>>>>>> 1926557a993cd502ef8d4bf55d9354eedbf04139
                   <span class="pull-left">¥</span>
                 </p>
                </i>
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
    props: ['orderType'],
    data(){
      return {
        channal: [
          {
            name: '非预约',
            num: 5,
            type: 'default',
            edit: false,
            children: [
              {
                name: 88,
              },
              {
                name: 89
              },
              {
                name: 90
              },
              {
                name: 91
              },
              {
                name: 92
              },
            ]
          },
          {
            name: '院内预约',
            num: 3,
            type: 'hospital',
            edit: false,
            children: [
              {
                name: 1
              },
              {
                name: 2
              },
              {
                name: 3
              }
            ]
          },
          {
            name: '官微预约',
            num: 4,
            type: 'wechat',
            edit: false,
            children: [
              {
                name: 78
              },
              {
                name: 79
              },
              {
                name: 60
              },
              {
                name: 81
              }
            ]
          },
          {
            name: '挂号网预约',
            num: 2,
            type: 'web',
            edit: false,
            children: [
              {
                name: 18
              },
              {
                name: 19
              }
            ]
          },
          {
            name: '官网预约',
            num: 1,
            type: 'official',
            edit: false,
            children: [
              {
                name: 1
              }
            ]
          }
        ],
        editnum: '',
        ballnum: '',
        ball: false,
        ballList: [],
      }
    },
    computed: {
      listString(){
        return JSON.stringify(this.channal, null, 2);
      }
    },
    created(){
      this.$nextTick(()=> {

      })
    },
    methods:{
      production(){
        this.ball = true;
        let newArr = [];
        var mynum = 0;
        for (var x = 0; x < this.channal.length; x++) {
          for (var y = 0; y < this.channal[x].num; y++) {
            newArr.push({index: y + mynum + 1, type: this.channal[x].type, price: 120, editcan: false});
          }
          mynum += y;
        }
        this.ballList = newArr;
      },
      numedit(index){
        this.channal[index].edit = true;
        document.getElementById(inputid).focus();
      },
      balledit(index){
        this.ballList[index].editcan = true;
      },
      changenum(index){
        this.channal[index].num = this.editnum;
        this.channal[index].edit = false;
        this.editnum = '';
      },
      changeball(index){
        console.log(this.ballnum);
        this.ballList[index].price = this.ballnum;
        this.ballList[index].editcan = false;
        this.ballnum = '';
      },
      datadragEnd (evt) {

      }
    },
    directives: {
      focus: {
        inserted: function (el) {
          // 聚焦元素
          el.focus()
        }
      }
    },
    components: {
      draggable
    },
  }
</script>

<style scoped>
  .Channel-Warrper {
    margin: 20px 0 20px 0;
  }

  .channel-box {
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

  .channel-box > .top {
    border-bottom: 1px solid #e0e0e0;
    font-size: 32px;
  }

  .channel-box > .footer {
    font-size: 12px;
  }

  .channel-box.default, .default > p > input[type=text] {
    color: #666;
  }

  .channel-box.hospital, .hospital > p > input[type=text] {
    color: #20a0ff;
  }

  .channel-box.wechat, .wechat > p > input[type=text] {
    color: #0caf4e;
  }

  .channel-box.web, .web > p > input[type=text] {
    color: #e8a623;
  }

  .channel-box.official, .official > p > input[type=text] {
    color: #ff4949;
  }

  .channel-box > p {
    height: 42px;
    line-height: 42px;
    text-align: center;
  }

  .ball-row {
    width: 100%;
    display: inline-block;
    border-bottom: 1px dashed #e0e0e0;
  }

  .ball-row:last-child {
    border-bottom: 1px transparent;
  }

  .ball-row > span:last-child {
    border-right: 1px transparent;
  }

  .ball-row > div > div > span {
    display: inline-block;
    width: 10%;
    height: 80px;
    text-align: center;
    box-sizing: border-box;
    float: left;
    padding: 10px;
    margin-bottom: 20px;
  }

  .ball-row > div > div > span > i {
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

  .ball-row > div > div > span > i > p.num {
    height: 33px;
    line-height: 38px;
    font-weight: bold;
    font-size: 21px;
  }

  .ball-row > div > div > span > i > p.price {
    height: 14px;
    line-height: 14px;
    font-size: 14px;
  }

  .ball-row > span {
    display: inline-block;
    width: 10%;
    height: 80px;
    text-align: center;
    box-sizing: border-box;
    float: left;
    padding: 10px;
  }

  .ball-row > span > i {
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

  .ball-row > div > div > span > i.hospital {
    border: 1px solid #c0e5ff;
    background: #e9f6ff;
    color: #20a0ff;
  }

  .ball-row > div > div > span > i.wechat {
    border: 1px solid #bcf1d4;
    background: #e7faf0;
    color: #0caf4e;
  }

  .ball-row > div > div > span > i.web {
    border: 1px solid #feebc3;
    background: #fff8ea;
    color: #e8a623;
  }

  .ball-row > div > div > span > i.official {
    border: 1px solid #ffcccc;
    background: #ffeded;
    color: #ff4949;
  }

  .ball-row > span > i.plus {
    color: #e0e0e0;
  }

  .flip-list-move {
    transition: transform 0.5s;
  }

  .no-move {
    transition: transform 0s;
  }

  .production {
    width: 100%;
    display: inline-block;
    margin-bottom: 20px;
  }

  .num-edit {
    border: none;
    text-align: center;
    height: 35px;
    line-height: 35px;
    font-size: 32px;
    width: 100%;
    display: inline-block;
    float: left;
    margin-top: 3px;
  }

  .ball-price {
    width: 30px;
    margin: 0 0 0 9px;
  }

  .ball-edit {
    border: none;
    text-align: center;
    height: 13px;
    line-height: 13px;
    font-size: 14px;
    width: 30px;
    display: inline-block;
    float: left;
    margin: 0 0 0 9px;
  }

  .default .ball-edit {
    background: #fff;
  }

  .hospital .ball-edit {
    background: #e9f6ff;
  }

  .wechat .ball-edit {
    background: #e7faf0;
  }

  .web .ball-edit {
    background: #fff8ea;
  }

  .official .ball-edit {
    background: #ffeded;
  }
</style>
