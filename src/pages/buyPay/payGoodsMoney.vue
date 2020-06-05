<template>
  <div class="buyGoods">
    <div class="iframe" :style="{'height': cruheight+'px'}">
      <div class="title">注:支付完成后,请点击左上角返回上一页。</div>
      <iframe :src="url"  scrolling="auto" frameborder="0"></iframe>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        cruheight:0,
        url:'',
        regID:''
      }
    },
    beforeRouteLeave (to, from, next) {
      if(to.name=='buyPay'){
        let data = {
          url:this.url,
          regID:this.regID
        }
        sessionStorage.setItem('payResultPage',JSON.stringify(data))
        next()
      }
    },
    created(){
      this.url = this.$route.query.url
      this.regID = this.$route.query.regID
      let h = document.documentElement.clientHeight || document.body.clientHeight;
      this.cruheight =h;
    },
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/reset.scss";
  .buyGoods{
    width: 100%;
    background-color: #f4f4f4;
    min-height: 100%;
    position: relative;
    .iframe{
      position: fixed;
      right: 0;
      bottom: 0;
      left: 0;
      top: 80*$r;
      width: 100%;
      overflow: auto;
      -webkit-overflow-scrolling:touch;
      .title{
        font-size: 28*$r;
        color: red;
        padding: 25*$r 0 25*$r 30*$r;
      }
      iframe{
        width: 100%;
        height: 100%;
        border: none;
        margin-bottom: 60*$r;
      }
    }
  }
</style>
