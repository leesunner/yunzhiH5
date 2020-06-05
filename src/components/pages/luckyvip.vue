<template>
  <div class="luckyvip">
    <img src="../../assets/img/lkviptop.png" alt="" class="topimg">
    <ul class="content">
      <li>
        <div class="commonvip-top">
          <div>
            VIP月卡<span>50</span>元
          </div>
          <img :src="phoneType?require('../../assets/img/lkgmb.png'):require('../../assets/img/lkgma.png')" alt="" v-if="vipid =='' && !islogin" @click="goshop()">
          <!-- 可以购买 -->
          <img :src="phoneType?require('../../assets/img/lkgmb.png'):require('../../assets/img/lkgma.png')" alt="" v-if="recharge_goods_id == null && isBuy == 1" @click="goshop(vipid)">
          <!-- 不可以购买 -->
          <img src="../../assets/img/lkgmb.png" alt="" v-if="(recharge_goods_id == null || recharge_goods_id != vipid) && isBuy == 0" @click="gebkgm()">
          <!-- 可以打卡 -->
          <img src="../../assets/img/lkdka.png" alt="" v-if="recharge_goods_id == vipid && isSignin == 0 && vipid !=''" @click="getdk()">
          <img src="../../assets/img/lkdkb.png" alt="" v-if="recharge_goods_id == vipid && isSignin == 1" @click="getdk()">
        </div>
        <p v-if="list">{{list[0].desc}}</p>
      </li>
      <li>
        <div class="commonvip-top">
          <div>
            超级VIP月卡<span>88</span>元

          </div>
          <img :src="phoneType?require('../../assets/img/lkgmb.png'):require('../../assets/img/lkgma.png')" alt="" v-if="supperid == '' && !islogin " @click="goshop()">
          <!-- 可以购买 -->
          <img :src="phoneType?require('../../assets/img/lkgmb.png'):require('../../assets/img/lkgma.png')" alt="" v-if="recharge_goods_id == null && isBuy == 1 " @click="goshop(supperid)">
          <!-- 不可以购买 -->
          <img src="../../assets/img/lkgmb.png" alt="" v-if="(recharge_goods_id == null || recharge_goods_id != supperid) && isBuy == 0" @click="gebkgm()">
          <!-- 可以打卡 -->
          <img src="../../assets/img/lkdka.png" alt="" v-if="recharge_goods_id == supperid && isSignin == 0 && supperid != ''" @click="getdk()">
          <!-- 不可以打卡 -->
          <img src="../../assets/img/lkdkb.png" alt="" v-if="recharge_goods_id == supperid && isSignin == 1" @click="getdk(),getcoed()">
        </div>
        <p v-if="list">
          {{list[1].desc}}
          <!-- 明天打卡可领取10积分+满20减5积分劵+满10减3积分劵+满5减1积分劵哦~ -->

        </p>
      </li>
      <img src="../../assets/img/lkcrown.png" alt="" class="lkcrown">
    </ul>
    <ul class="gz">
      <h3>活动规则</h3>
      <li><span class="span">1</span> <span class="h4">vip月卡：</span></li>
      <p>
        用户50元购买月卡。每天打卡领取积分与积分券，返还7天，不打卡不返积分和积分券，有效期7天，到期自动失效。
      </p>
      <li><span class="span">2</span> <span class="h4">超级vip月卡：</span></li>
      <p>
        用户88元购买VIP月卡。每天打卡领取积分与积分券，返还7天，不打卡不返积分和积分券，有效期7天，到期自动失效。

      </p>
      <li><span class="span">3</span> 1个帐号仅可购买1个种类的月卡，不能重复购买。</li>
      <li><span class="span">4</span> 月卡有效期7天，每30天可参与一次，结束后下个月可重新参与。</li>
    </ul>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        isWeekCardUser:"",//判断是否是月卡用户
        recharge_goods_id:"",//判断买了哪种月卡;
        isSignin:"",//是否打卡
        list:"",//月卡商品详情
        vipid:"",//vip卡id
        supperid:"",//超级卡id
        isBuy: "",
        lastTime: '',
        islogin: false,
        phoneType:false,
      }
    },
    created () {
      document.title="幸运188";
      this.getcoed();
      if(this.getPhoneType()=='Android'){//限制安卓用户无法购买
        this.phoneType = true
      }
    },
    methods: {
      // getshopping(){
      //       this.JsBridge.callHandler("getshopping",id,function (responseData) {
      //                           });
      // },
      goshop(id){//通过ID跳转对应商品详情
        // let msg="活动已下架，谢谢您的参与"
        // this.$vux.toast.text(msg)
        // this.$vux.loading.show({text: '请稍候'});
        // this.JsBridge.callHandler("toRechargeView",id, function (responseData) {});//跳转到游戏礼包详情
        if(!this.phoneType){
          if(id){
            this.navigateTo('rechargeGoodDetail',{id:id})
          } else {
            this.navigateTo('userLogin')
          }
        }
      },
      getcoed(){//获取会员卡状态
        const that = this ;
        this.$axios.get('/active/weekCardInfo?version=v2').then(function (res) {
          if(res.data.code == 200){
            that.isWeekCardUser=res.data.data.isWeekCardUser;
            that.recharge_goods_id=res.data.data.recharge_goods_id;
            that.isSignin=res.data.data.isSignin;
            that.list=res.data.data.goodsList;
            that.vipid=that.list[0].recharge_goods_id;
            that.supperid=that.list[1].recharge_goods_id;
            that.isBuy = res.data.data.has_buy;
            that.lastTime = res.data.data.last_buy_time;
            that.islogin = true
          }else if(res.data.code==-14){
            that.$vux.toast.text(res.data.msg);
            that.islogin = false
            // that.JsBridge.callHandler("toLogin",null,function (res) {
            // })
            // that.navigateTo('userLogin')
          }
          else{
            that.$vux.toast.text(res.data.msg)
          }
        })
        window.scrollTo(0,0);
      },
      getdk(){//是会员就打开
        const that =this ;
        this.$axios.post('/active/weekCardSignin?version=v2').then(function (res) {
          console.log(res.data)
          if(res.data.code == 200){
            that.isSignin=1;
            that.$vux.toast.text(res.data.msg);
          }else{
            that.$vux.toast.text(res.data.msg);
          }
        })
      },
      gebkgm() {
        let that = this;
        if (this.isBuy == '0' && this.isWeekCardUser == '0') {
          this.$vux.toast.text('本月已参与啦,请于' + that.lastTime + '之后进行购买~');
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/css/reset";
  .luckyvip{
    width: 100%;
    background-color: #e84039;
    .topimg{
      width: 100%;
    }
    .content{
      width: getREM(668);
      margin: auto;
      position: relative;
      .commonvip{

      }
      li{
        // width: 100%;
        height: getREM(223);
        margin-bottom:getREM(45);
        -moz-border-radius: getREM(20) !important;
        -ms-border-radius: getREM(20) !important;
        -o-border-radius: getREM(20) !important;
        border-radius: getREM(20) !important;
        overflow: hidden;
        .commonvip-top{
          width: 100%;
          height: getREM(157);
          background-color: #85120e;
          padding: getREM(47) 0 getREM(40) 0;
          div{
            float: left;
            height: getREM(70);
            font-size: getREM(48);
            line-height: getREM(70);
            color: #fff;
            margin-left: getREM(17);
            span{
              color: #fbee25;
            }
          }
          img{
            float: right;
            width: getREM(176);
            height: getREM(70);
            margin-right: getREM(17);
          }
        }
        p{
          background-color: #fff;
          height: getREM(66);
          line-height: getREM(66);
          color: #ec423c;
          font-size: getREM(19);
          text-align: center;
        }
      }
      .lkcrown{
        position: absolute;
        top:57%;
        left:-2%;
        width:getREM(66);
        height: getREM(59);
      }
    }
    .gz{
      width: getREM(702);
      height: getREM(556);
      margin: auto;
      margin-bottom: getREM(40);
      background: url("../../assets/img/lkgzbj.png") no-repeat;
      background-size: 100% 100%;
      h3{
        width: 100%;
        text-align: center;
        line-height: getREM(100);
        color:#f9dc17;
        font-size: getREM(33);
      }
      li{
        color: #fff;
        font-size: getREM(22);
        padding-left: getREM(16);
        line-height: getREM(60);
        .span{
          background-color: #fb8942;
          width: getREM(30);
          height: getREM(30);
          line-height:  getREM(30);
          text-align: center;
          border-radius: 60%;
          display: inline-block;
        }
        .h4{
          font-weight: 600;
        }
      }
      p{
        color: #fff;
        font-size: getREM(22);
        padding-left:getREM(55) ;
        padding-right:getREM(7) ;
        line-height: getREM(36);
      }
    }
  }
</style>


