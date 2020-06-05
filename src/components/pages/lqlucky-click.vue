<template>
  <div class="lqlucky">
    <img src="static/image/lqlucky.png"/>
    <button type="button" @click="luckyClick">免费领取</button>
  </div>
</template>
<script>
  export  default{
    name:'lqluckyClick',
    data(){
      return{

      }
    },
    created:function(){
      document.title='不中包赔';
      // this.JsBridge.callHandler("shareRight", {type:3, id:0}, function (responseData) {});
    },
    methods:{
      luckyClick:function(){
        // this.JsBridge.callHandler("luckyClick", function (responseData) {});
        this.navigateTo('type')
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/css/reset";

  .lqlucky{
    width:100%;
  //max-width:getREM(750);
    position: absolute;
    top:0;
    min-height:100%;
    background: #f4f4f4;
  img{
    width:100%;
    display: block;
  }
  button{
    width:getREM(280);
    height:getREM(80);
    position: absolute;
    top:getREM(953);
    left:50%;
    transform: translateX(-50%);
    font:0/0 a;
    background: transparent;
    outline: none;
    border:none;
  }
  }
</style>
