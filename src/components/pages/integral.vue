<template>
  <div id="integral">
    <img src="static/image/integral.png"/>
    <button type="button" @click="ahref">立即赚现金</button>
    <div class="content">
      <p>1.活动时间：4月24日-5月31日</p>
      <p>2.邀请好友成为平台新用户，好友注册且充值（充值金额100以上），您可获得5积分奖励；</p>
      <p>3.邀请成功后，提供好友ID联系在线客服领取5元积分奖励<span style="color: #fb762a;">(客服QQ:3073810793)；</span></p>
      <p>4.每人每日邀请好友上限为10人；</p>
      <p>5.如发现任何违规套取奖励行为将视情节严重程度进行判罚：不予发放奖励、封停推荐有奖功能、冻结所有通过推荐有奖渠道获得的奖励，依法追究其法律责任；</p>
      <p>6.活动最终解释权归运营团队所有。</p>
    </div>
    <share-view :data="shareData"></share-view>
  </div>
</template>
<script>
  import shareView from '../public/shareView'
  export default {
    components:{shareView},
    name:'',
    data(){
      return{
        result:false,
        list:[],
        data:"",
        shareData:'',
      }
    },
    created:function(){
      document.title='积分奖励';
    },
    methods:{
      ahref:function(){
        var that = this;
        this.$axios.post('/site/sharecon?version=v2', {type: 5}).then(function (response) {
          if(response.data.code==1){
            that.shareData = response.data.data
            // that.$vux.loading.show({text: '请稍候'});
            // // console.log(response)
            // that.JsBridge.callHandler("share", response.data.data, function (responseData) {
            //   if (responseData == 'success') {
            //     that.$vux.loading.hide();
            //   }
            // });

          }
        });
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../../assets/css/reset";
#integral{
  width:100%;
  position: relative;
}
#integral img{
  width:100%;
}
#integral button{
  position: absolute;
  top:getREM(910);
  width:getREM(562);
  height:getREM(100);
  transform: translateX(-50%);
  left:50%;
  font:0/0 a;
  background: none;
  border:none;
}
  .content{
    position: absolute;
    width: 600*$r;
    height: 420*$r;
    bottom: 76*$r;
    left: 0;
    right: 0;
    margin: 0 auto;
    p{
      line-height: 42*$r;
      color: #333333;
    }
  }
</style>
