<template>
    <div>
      <div class="address-none">
        <img src="../../../assets/img/ads-none.png"/>
        <p>亲！快去添加收货地址哦～</p>
      </div>
    </div>
</template>

<script>
    export default {
        name: "no-address"
    }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/reset.scss";
  .address {
    &-none {
      font-family: PingFang-SC-Medium;
      font-size: 28*$r;
      padding-top: 313*$r;
      width: 100%;
      img {
        display: block;
        width: 624*$r;
        height: 428*$r;
        margin: 0 auto;
      }
      p {
        margin-top: 30*$r;
        text-align: center;
      }
    }
  }
</style>
