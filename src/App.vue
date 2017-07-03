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
  import WHeader from 'components/base/header/index'
  import WFooter from 'components/base/footer/index'
  export default {
      name: 'app',
      components: {
        WHeader, WFooter
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
</style>
