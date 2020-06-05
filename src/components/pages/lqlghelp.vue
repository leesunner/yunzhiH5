<template>
  <div id="help">
    <img src="../../assets/img/lqlghelp.png" alt="">
    <div style="height:15px;"></div>
    <div class="btn" @click="toHome">立即兑换</div>
  </div>
</template>
<style>
  #help img{width:100%;vertical-align:middle;}
  #help .btn{text-align:center;position:fixed; left:0;bottom:0;line-height:45px;background:#fff7e3;width:100%; color:#472015;font-size:14px;}
</style>
<script>
  export default{
    name:'help',
    data(){
      return{}
    },
    created:function(){
      document.title='新手上路';
      // this.JsBridge.callHandler("shareRight", {type:3, id:0}, function (responseData) {});
    },
    methods:{
      toHome:function(){
        // this.JsBridge.callHandler("toHome", function (responseData) {});
        this.navigateTo('type')
      }
    }
  }
</script>
