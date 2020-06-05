<template>
  <div class="cert" >
    <img src="../../../assets/img/cert2.png"/>
    <p>提交成功</p>
    <p>正在审核中,请耐心等待</p>
  </div>
</template>

<script>
  export default {
    name: "cert-submit"
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/reset.scss";
  .cert{
    @include flex-align;
    img{
      margin-top: 149*$r;
      display: block;
      width: 210*$r;
      height: 210*$r;
      margin-bottom: 28*$r;
    }
    p:nth-child(2){
      color: #333333;
      margin-bottom: 26*$r;
      font-size: 32*$r;
    }
    p:nth-child(3){
      color: #898989;
    }
  }
</style>
