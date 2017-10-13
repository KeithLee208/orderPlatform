<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
  export default {
      name: 'app',
      created(){
        this.$nextTick(() => {
//          this.$router.push('login')
        })
      }
    }
</script>

<style>
  @import './../static/css/reset.css';
  @import './../static/font/iconfont.css';
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
    background: #F3F6FA;
  }
  .filter-warrper{
    width: 100%;
    box-sizing: border-box;
  }
  .pagebody{
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
 .pull-width{
   width: 100%;
 }
  .color-333{
    color: #333;
  }
  @media screen and (max-width: 1225px){
    .header > .logo>span{
      display: none !important;
    }
    .nav-1st{
      margin-left: 0px !important;
    }
  }
  ::-webkit-scrollbar
  {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track-piece
  {
    background-color: #CCCCCC;
    -webkit-border-radius: 6px;
  }
  ::-webkit-scrollbar-thumb:vertical
  {
    height: 5px;
    background-color: #999;
    -webkit-border-radius: 6px;
  }
  ::-webkit-scrollbar-thumb:horizontal
  {
    width: 5px;
    background-color: #CCCCCC;
    -webkit-border-radius: 6px;
  }
</style>
