<template>
    <div class="showSuccess">
      <img class="showSuccess-icon" src="../../../assets/img/order-suss.png"/>
      <p class="showSuccess-title">晒单成功</p>
      <p class="showSuccess-con">据说坚持晒单，运气会更好哦，加油！</p>
      <div class="showSuccess-btn" @click="$router.go(-2)">完成</div>
    </div>
</template>

<script>
    export default {
        name: "show-success"
    }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/reset.scss";
  .showSuccess{
    @include appcontent;
    @include flex-align;
    justify-content: flex-start;
    padding-bottom: 0;
    background-color: #ffffff;
    &-icon{
      display: block;
      width:153*$r;
      height:153*$r;
      margin-top: 122*$r;
      margin-bottom: 62*$r;
    }
    &-title{
      color: #4a4a4a;
      font-size: 30*$r;
      font-family: 'PingFang-SC-Bold';
      margin-bottom: 31*$r;
    }
    &-con{
      color: #898989;
      margin-bottom: 98*$r;
    }
    &-btn{
      width: 91%;
      height: 88*$r;
      background-color: #fb762a;
      border-radius: 10*$r;
      line-height: 88*$r;
      font-size: 30*$r;
      color: #ffffff;
      text-align: center;
    }
  }
</style>
