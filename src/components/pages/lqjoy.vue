<template>
  <div class=" lqjoy">
    <img src="static/image/lqjoy.jpg"/>
    <button type="button" @click="share">免费领取</button>
  </div>
</template>
<script>
  export default{
    name:"share",
    data(){
      return{
        data: {
          share_num:0
        }
      }
    },
    created:function(){
      document.title = '分享领积分';
      this.getData();
      // this.JsBridge.callHandler("shareRight", {type:5, id:0}, function (responseData) {});
    },
    methods:{
      getData:function(){
        var that = this;
        this.$axios.post('/active/getTodayShare?version=v2').then(function (response) {
          if(response.data.code==1){
            that.data = response.data.data;
          }else{
//                        that.$vux.toast.text(response.data.msg);
          }
        })
      },
      share:function(){
        var that = this;
        this.$axios.post('/site/sharecon?version=v2', {type: 5}).then(function (response) {

          if(response.data.code==1){
            that.$vux.loading.show({text: '请稍候'});
            that.JsBridge.callHandler("share", response.data.data, function (responseData) {
              if (responseData == 'success') {
                that.$vux.loading.hide();
              }
            });
          }
        });
      },
      getCode:function(){
        var that = this;
        this.$axios.post('/active/getTodaySharePrize?version=v2').then(function (response) {
          if(response.data.code==1){
            that.$vux.toast.text("领取成功，请在个人中心查看");
          }else{
            that.$vux.toast.text(response.data.msg);
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/css/reset";
  .lqjoy{
    width:100%;
    position: absolute;
    top:0;
    min-height:110%;
    background: #f4f4f4;
  img{
    width:100%;
    display: block;
  }
  button{
    width:getREM(400);
    height:getREM(120);
    position: absolute;
    top:getREM(1404);
    left:50%;
    transform: translateX(-50%);
    font:0/0 a;
    background: transparent;
    outline: none;
    border:none;
  }
  }
</style>
