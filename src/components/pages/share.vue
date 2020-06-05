<template>
  <div id="share">
    <div class="banner">
      <img src="../../../static/image/share-banner.jpg" alt="">
    </div>
    <div class="ruler">
      <p>邀请成功后，截图被邀请的【我的乐购】找客服领取积分</p>
    </div>
    <div class="num-block">已邀请好友人数 {{data.share_num}} 人
      <!--<div class="score-btn" style="background:#fa6822;" v-if="data.share_num>1" @click="getCode()">领取积分</div>-->
      <!--<div class="score-btn" v-else>{{+data.get_prize==1?'已领取':'领取积分'}}</div>-->

    </div>
    <div class="btn-img" @click="share()">
      <img src="../../../static/image/share-btn.png" alt="">
    </div>
    <share-view :data="shareData"></share-view>
  </div>
</template>
<script>
  import shareView from '../public/shareView'
  export default {
    components:{shareView},
    name:"share",
    data(){
      return{
        data: {
          share_num:0,
          shareData:'',
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
            that.shareData = response.data.data
            // that.$vux.loading.show({text: '请稍候'});
            // that.JsBridge.callHandler("share", response.data.data, function (responseData) {
            //     if (responseData == 'success') {
            //         that.$vux.loading.hide();
            //     }
            // });
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
<style>
  #share .banner img{width:100%;vertical-align:middle;}
  #share .btn-img{text-align:center;margin-top:30px;}
  #share .btn-img img{width:80%;}
  #share .num-block{line-height:40px;width:80%;margin:0 auto;background:#fdd25f; padding:0 15px; -moz-box-sizing:border-box; -ms-box-sizing:border-box; box-sizing:border-box;position:relative;}
  #share .num-block .score-btn{background:#a0a0a0;border-radius:20px 0 0 20px;position:absolute; right:0; top:0; color:#f5f5f5; padding:0 15px;text-align:center;}
  .ruler{
    font-size:14px;
    color: #3d3d3d;
    margin-bottom:20px;
  }
  .ruler p{
    width:80%;
    margin:0 auto;
    text-align: center;
    line-height: 26px;
  }
</style>
