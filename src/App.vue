<template>
  <div id="app">
    <WHeader></WHeader>
    <div class="content-warrper">
    <router-view></router-view>
    </div>
    <WFooter></WFooter>
  </div>
</template>

<script>
  import WHeader from './components/header/Index'
  import WFooter from './components/footer/index'
  export default {
    name: 'app',
    components: {
      WHeader, WFooter
    },
    mounted(){
      this.Autoheight();

    },
    methods:{

     Autoheight(){
//        var b=document.documentElement.clientHeight-111;
//        var bodyheight=document.getElementsByClassName('content-warrper')[0];
//         bodyheight.style.height=b+'px';
     }
    }
    }
</script>

<style>
  @import './../static/css/reset.css';
  body {
    overflow-x: hidden;
    background-color: #f9f9f9;
    height: 100%;
  }
  .content-warrper{
    box-sizing: border-box;
    width: 100%;
    min-height: 833px;
    padding:20px;
    background: rgb(238,238,238);
  }
  .filter-warrper{
    background: #fff;
    width: 100%;
    min-height: 60px;
    margin-bottom: 20px;
    padding: 10px;
    box-sizing: border-box;
  }
  .pagebody{
    background: #fff;
    padding: 20px;
    box-sizing: border-box;
    display: inline-block;
    width: 100%;
  }
  .pull-left{
    float: left;
  }
  .pull-right{
    float: right;
  }
</style>
