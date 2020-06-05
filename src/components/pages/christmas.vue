<template>
  <div class="chirstmas">
    <h2 v-title="'圣诞狂欢圣诞'"></h2>
    <div class="content">
      <div class="empty"></div>
      <swiper class="carousel" :options="swiperOption" v-if="data.awardList">
        <swiper-slide class="li" v-for="(item,index) in data.awardList" :key="index" v-if="data.awardList">恭喜{{item.nickname}}成功领取圣诞狂欢大礼包！</swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <div class="content-middle">
        <div class="content-middle-left">
          <img class="gift" src="../../../static/img/christmasBag.png" alt="">
          <div class="content-middle-left-text">
            <p>累计金额 : &nbsp;{{data.recharge_total || 0}}</p>
            <p>领取机会 : &nbsp;{{data.total-data.alreadyNum || 0}}/{{data.total|| 0}}</p>
          </div>
          <img class="pulldown" src="../../../static/img/christmasljBtn.png" alt="" @click="submit()">
        </div>
        <div class="content-middle-right">
          <img class="content-text" src="../../../static/img/christmasView.png" alt="">
        </div>
      </div>
      <div class="content-bottom">
        <p><span class="h3">活动规则: &nbsp;</span>圣诞节活动期间，累计充值满<span class="orange">588</span>元即可领取价值<span class="orange">188</span>元【圣诞狂欢大礼包】，多充多送上不封顶。</p>
        <p><span class="h3">活动说明: &nbsp;</span></p>
        <ul class="content-bottom-text">
          <li>1、活动期间，所有登陆用户均可参与本活动；</li>
          <li>2、礼包获取的积分劵即刻生效，有效期为<span class="orange">1</span>天，可在个人中心<span class="orange">“我的积分劵”</span>中查看；</li>
          <li>3.领取次数上不封顶，充值每满<span class="orange">588</span>元即可领取<span class="orange">1</span>次；</li>
          <li>4.活动最终解释权归人人商城运营团队所有。</li>
        </ul>
      </div>
      <img class="share" src="../../../static/img/christmasShare.png" alt="" @click="getyq()">
    </div>

    <footer>
      <img src="../../../static/img/christmascjBtn.png" alt="" @click="goShopp()">
    </footer>
    <share-view :data="shareData"></share-view>
  </div>
</template>
<script>
  import shareView from '../public/shareView'
  export default {
    components:{shareView},
    data() {
      return {
        data:{
          // awardList:[],
        },
        swiperOption:{
          pagination: '.swiper-pagination',
          speed:800,
          loop:true,
          direction : 'vertical',
          autoplay: {
            delay: 1000,//1秒切换一次
          },
        },
        shareData:{}
      }
    },
    created() {
      this.getCode();
    },
    mounted() {

    },
    methods: {
      getCode(){//获取次数和金额
        this.$axios.post("active/getChristmasInfo?version=v2",{}).then(res=>{
          if(res.data.code == 200){
            this.data=res.data.data;
          }else{
            this.$vux.toast.text(res.data.msg)
          }
        })
      },
      submit(){//领取礼包
        this.$axios.post("active/receiveChristmasCoupon?version=v2",{}).then(res=>{
          if(res.data.code == 200){
            this.getCode();
            this.$vux.toast.text(res.data.data.message);
          }else{
            this.$vux.toast.text(res.data.msg)
          }
        })
      },
      goShopp(){
        // this.JsBridge.callHandler("rechargeCount", {}, function (responseData) {//跳转到充值
        // });
        this.navigateTo('rechargList')
      },
      getyq(){//分享好友
        var that = this;
        this.$axios.post('/site/sharecon?version=v2', {type: 5}).then(function (response) {
          if(response.data.code==1){
            that.shareData = response.data.data
            // that.$vux.loading.show({text: '请稍候'});
            // // console.log(response.data)
            // that.JsBridge.callHandler("share", response.data.data, function (responseData) {
            //   if (responseData == 'success') {
            //     that.$vux.loading.hide();
            //   }
            // });
          }
        });
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/css/reset";
  .chirstmas{
    position: absolute;
    width: 100%;
    min-height: 1640*$r;
    background: url("../../../static/img/christmasbg.png") no-repeat;
    background-size: 100% 1640*$r;
    .content{
      // overflow: hidden;
      width: 702*$r;
      height:1134*$r;
      margin: auto;
      margin-top: 430*$r;
      background: url("../../../static/img/christmasred.png") no-repeat;
      background-size: 100% 100%;
      position: relative;
      z-index: 5;
      .share{
        position: absolute;
        top:115*$r;
        right: -20*$r;
        width: 74*$r;
      }
      .empty{
        height: 45*$r;
        width: 100%;
      }
      .carousel{
        width: 448*$r;
        background: rgba($color: #000, $alpha: 0.2);
        border-radius: 16*$r;
        margin: auto;
        margin-top: 25*$r;
        color: #fff;
        font-size: 20*$r;
        height: 30*$r;
        overflow: hidden;
        .li{
          height: 30*$r;
          line-height: 30*$r;
          text-align: center;
          @include t-overflow;
        }
      }
      .content-middle{
        margin: 6*$r 59*$r 0 71*$r;
        @include flex-center;
        .content-middle-left{
          @include flex-align;
          .gift{
            width: 190*$r;
            height: 238*$r;
          }
          .content-middle-left-text{
            line-height: 40*$r;
            color: #fff;
            font-size: 20*$r;
            letter-spacing: 1*$r;
            padding: 8*$r 0;
          }
          .pulldown{
            width: 108*$r;
            height: 117*$r;
          }
        }
        .content-middle-right{
          .content-text{
            width: 350*$r;
            height: 467*$r;
          }
        }
      }
      .content-bottom{
        margin: 44*$r 16*$r 0 18*$r;
        color: #fff;
        font-size: 22*$r;
        padding: 25*$r;
        line-height: 47*$r;
        border:4*$r dotted #fff;
        border-radius: 20*$r;
        .orange{
          color: #f8fb09;
        }
        .h3{
          font-weight: 600;
        }
      }
    }
    footer{
      width: 100%;
      position: fixed;
      height: 89*$r;
      bottom: 0;
      left: 0;
      @include flex-center;
      border-top: 2*$r solid #acacac;
      background-color: #f2f2f2;
      z-index: 10;
      img{
        height: 59*$r;
      }
    }
  }
</style>
