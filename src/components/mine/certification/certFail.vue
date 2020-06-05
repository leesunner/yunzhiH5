<template>
  <div class="cert" >
    <img src="../../../assets/img/cert1.png"/>
    <p>抱歉，您的实名认证审核未通过</p>
    <p>请修改后重新申请</p>
    <div></div>
    <div class="cert-btn" @click="submit">重新填写</div>
  </div>
</template>

<script>
  export default {
    methods:{
      submit(){
        this.$emit('changeName','certInput')
      }
    }
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
      height: 199*$r;
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
    &-btn{
      width: 690*$r;
      height: 88*$r;
      background-image: linear-gradient(166deg,
        #fe7e50 0%,
        #f73320 100%),
      linear-gradient(
          #f8654b,
          #f8654b);
      background-blend-mode: normal,normal;
      border-radius: 10*$r;
      margin: 0 auto;
      color: #ffffff;
      text-align: center;
      line-height: 88*$r;

      margin-top: 60*$r;
      font-family: 'PingFang-SC-Regular';
      font-size: 32*$r;
    }
  }
</style>
