<template>
  <div class="pople-middle">
      <img src="../../assets/images/grennnew2.png" alt="" class="pople-middle-top">
      <p class="solid">
        返利无上限， 当您邀请好友成功后， 可根据
      </p>
      <p class="solid">
        好友充值和中奖， 获取对应的佣金
      </p>
      <div class="invit-content">
          <ul>
            <h3>
              <span>返利项</span>
              <span class="borderSpan"></span>
              <span>返利率</span>
            </h3>
            <div class="list">
              <li>
                <p>好友购买游戏/茶叶礼包</p>
                <p>好友获得活动抽奖商品人次 ×70%</p>
              </li>
              <li>
                <p>3%</p>
                <p class="list-p2">2%</p>
              </li>
            </div>
          </ul>
          <p class="list-p">注：获得商品兑换积分不返利。</p>
          <div class="xsNew">
            举个例子
          </div>
          <div class="xs-bttom">
            <p>小马邀请了<span>1</span>个好友，购买游戏/茶叶礼包<span>1000</span>元</p>
            <p>小马可获得<span>1000</span>（购买游戏/茶叶礼包金额）<span>*3%</span><br/>（返利率）<span>=30</span></p>
            <p>好友使用1000元参与兑换苹果手机，获得活动抽奖商品<br/>后，领取奖品</p>
            <p>小马可获得<span>8889</span>（商品总人次）<span>*70%*2%</span>(返利率)<br/><span>=124.45</span></p>
            <p>小马一共可以获得<span>30+124.45=154.45</span></p>
          </div>
           <div class="xs-bttom-btn" @click="share()">
                邀请好友
            </div>
      </div>

  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods:{
       share:function(){               // 进入页面分享后才能抽奖，调用移动端分享
                // var that = this;
                // this.$axios.post('/site/sharecon?version=v2', {type: 2}).then(function (response) {
                //     if(response.data.code==1){
                //         that.$vux.loading.show({text: '请稍候'});
                //         that.JsBridge.callHandler("share", response.data.data, function (responseData) {
                //             if (responseData == 'success') {
                //                 that.$vux.loading.hide();

                //             }
                //         });
                //     }
                // });

              this.$router.push({name:'commis'});
               window.scrollTo(0,0)
            },
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/css/reset";

.pople-middle{
  background-color: #e2efff !important;
  padding-top:38*$r;

  .pople-middle-top{
     width: 438*$r;
     margin:auto;
     display: block;
  padding-bottom:38*$r;
  }
  .solid{
    text-align: center;
    line-height: 35*$r;
    font-size: 24*$r;
    color: #898989;
  }
  .solid:nth-child(3){
    padding-bottom: 30*$r;
  }
  .invit-content{
    width: 692*$r;
    margin-top:30*$r;
    margin: auto;
    background-color: #fff;
    border-radius: 11*$r;
    overflow: hidden;
    .list-p{
       font-size: 22*$r;
         width: 609*$r;
         color: #a3a3a3;
          margin: auto;
          display: block;
          padding-left: 10*$r;
      }
    ul{
      overflow: hidden;
      h3{
        overflow: hidden;
        margin-top:17*$r;
        position: relative;
        span{
          float: left;
          width: 50%;
          text-align: center;
          color:#f7bf8b;
          height: 76*$r;
          line-height:  76*$r;
          font-size: 26*$r;
        }
        .borderSpan{
          position: absolute;
          width: 2*$r;
          height: 21*$r;
          background-color: #d6a56c;
          top:22.5*$r;
          margin-left: -5*$r;
        }
      }

      .list{
        width: 609*$r;
        height: 183*$r;
        border-radius: 21*$r;
        border: 2*$r solid #e1e1e1;
        margin: auto;
        overflow: hidden;
        li{

          float: left;
          width: 49.5%;
          height: 100%;
          p{
            text-align: center;
            line-height: 88*$r;
            height: 50%;
            color: #a3a3a3;
            font-size: 25*$r;
          }
          p:nth-child(1){
             border-bottom:1px solid  #e1e1e1;
          }
          p:nth-child(2){
            line-height: 44*$r;
            padding:0 14*$r;
          }
          .list-p2{
            line-height: 88*$r !important;
          }
        }
        li:nth-child(1){
          border-right:1px solid  #e1e1e1;
        }
      }

    }
    .xsNew{
        width: 296*$r;
        display: block;
        height: 63*$r;
        margin: 37*$r auto;
        background:url("../../assets/images/xsNew.png") no-repeat;
        background-size: 100% 100%;
        text-align: center;
        line-height: 63*$r;
        color: #fff;
        font-size: 23*$r;
      }
    .xs-bttom{
      font-size: 22*$r;
      color: #999999;
      line-height: 36*$r;
      padding-left: 80*$r;
      margin-bottom: 50*$r;
      p:nth-child(2){
        margin-bottom: 45*$r;
      }
      p:nth-child(5){
        margin-top: 45*$r;
      }
      span{
        color: #f4a654;
      }

    }
     .xs-bttom-btn{
        width: 243*$r;
        height: 66*$r;
        background-color: #e8993e;
        color: #fff;
        text-align: center;
        line-height: 66*$r;
        margin: 65*$r auto;
        border-radius: 40*$r;
      }
  }

}

</style>
