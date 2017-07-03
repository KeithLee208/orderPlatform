<template>
  <div  class="setting-body">
    <div class="page-head">
      <div class="Att-list-title">
        当前模版：<span class="name">春季模板</span>
        <span><i class="el-icon-time"></i>使用时间：2017/03/02-2017/05/02</span>
      </div>
      <div class="type-filter">
        <span>服务类型</span>
        <span><i class="el-icon-menu all"></i>全部</span>
        <span><i class="default"></i>普通（10）</span>
        <span><i class="expert"></i>专家（2）</span>
        <span><i class="disease"></i>专病（3）</span>
        <span><i class="union"></i>联合（4）</span>
        <span><i class="VIP"></i>特需（5）</span>
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
</template>

<script>
  export default{
    data(){
      return {
        addtable:[1,2,3]
      }
    }
  }
</script>

<style scoped>
  .margin-right-10 {
    margin-right: 10px;
  }
  .page-head > div {
    height: 50px;
    line-height: 50px;
  }
  .page-head > div > span {
    display: inline-block;
  }
  .setting-body {
    margin-top: 20px;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    display: inline-block;
    background: #fff;
  }

  .Att-list-title{
    color: #999;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 10px;
  }
  .Att-list-title>.name{
    color: #333;
    margin-right: 20px;
  }
  .Att-list-title>span>i{
    font-size: 14px;
    margin-right: 5px;
  }
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
</style>
