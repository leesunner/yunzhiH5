<template>
  <div class="registerSuccess">
    <img src="../../assets/img/suuusus.png" class="registerSuccess-img"/>
    <div class="registerSuccess-p">
      <img src="../../assets/img/glsusn.png"/>
      <span>恭喜你,注册成功,大礼包献上</span>
    </div>
    <div class="registerSuccess-btn" @click="navigateTo('ticket',{control:1})">查看我的积分券</div>
  </div>
</template>

<script>
  export default {
    name: "register-success"
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/reset.scss";
  .registerSuccess{
    @include appcontent;
    padding-bottom: 0;
    background-color: #ffffff;
    &-img{
      display: block;
      width: 216*$r;
      height: 216*$r;
      margin: 0 auto;
      margin-top: 102*$r;
      margin-bottom: 59*$r;
    }
    &-p{
      margin: 0 auto;
      text-align: center;
      margin-bottom: 93*$r;
      img{
        width: 30*$r;
        height: 30*$r;
        vertical-align: middle;
      }
      span{
        vertical-align: middle;
        font-size: 26*$r;
        color: #3a3a3a;
      }
    }
    &-btn{
      width: 301*$r;
      height: 74*$r;
      text-align: center;
      line-height: 74*$r;
      color: #ffffff;
      background-color: #fb762a;
      border-radius: 10*$r;
      margin: 0 auto;
    }
  }
</style>
