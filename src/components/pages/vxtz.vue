<template>
  <div class="vxtz">
    <h2 v-title="'微信支付'"></h2>
    <img src="../../assets/images/vxlogo.png" alt="">
  </div>
</template>
<script>
  export default {
    data () {
      return {
        type:false
      }
    },
    created() {
      this.go();
    },
    mounted() {

    },
    methods:{
      go(){
        var url =window.location.href;
        const strs=url.split("?")
        var theRequest=[];
        if(this.type){
          return ""
        }
        for ( var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
        window.location.href=decodeURI(theRequest.wxpayurl);
        this.type=true;



      }

    },
    beforeDestroy () {
      this.go();
    }
  }
</script>
<style lang="scss" scoped>
  img{
    width: 100%;
    vertical-align: middle;
  }
</style>


