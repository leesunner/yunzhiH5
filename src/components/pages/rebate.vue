<template>
  <div id="rebate">
    <div class="banner">
      <img src="static/image/rebateBg.png"/>
    </div>
    <button class="share" @click="share"></button>
    <button type="button" class="btnType01" @click="joinClick" v-text="activeText"></button>
    <div class="rebateCon">
      <p>参与活动首次充值，可享<span>100%</span>返利，只能参与一次哦！</p>
      <div class="rechageBox" v-for="(item ,index) in list">
        <img :src="item.pic" @click="toProdetail(index)"/>
        <button type="button" class="btnType02" @click="getReturn(index)" :class="active">{{item.btnText+item.price}}元</button>
      </div>
    </div>
    <div class="explain">
      <h2></h2>
      <p>1、活动时间: 2018年8月9日-2018年8月31日。</p>
      <p>2、用户需领取资格才能参与此活动。</p>
      <p>3、每个用户只能参与1次活动,领取活动资格后,单次购买达到对应额度即参与成功。</p>
      <p>4、购买金额即时到账,返利积分券将从购买当日开始每天返10% ,第10天全部返还。</p>
      <p>5、返利积分券将直接放入您的账号,请在<span>【我的积分券】</span>中查看,积分券有有效期限,请及时使用。</p>
      <p>6、此活动乐购运营团队拥有最终解释权。</p>
    </div>
    <share-view :data="shareData"></share-view>
  </div>
</template>
<script>
  import shareView from '../public/shareView'
  export default {
    components:{shareView},
    name:'rebate',
    data(){
      return{
        result:false,
        list:[],
        activeText:'领取活动资格',
        btnText:[],
        active:'isActive',
        shareData:''
      }
    },
    created:function(){
      document.title='充值返利';
      this.check();
      this.getList();
      // this.join();

    },
    methods:{
      check:function(){
        let ua = navigator.userAgent.toLowerCase();
        //android终端
        let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
        //ios终端
        let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          //ios
          window.location = 'itms-services:///?action=download-manifest&url=https://app1yyg.oss-cn-huhehaote.aliyuncs.com/download/test_day.plist'
        } else if(/(Android)/i.test(navigator.userAgent)) {
          //android
          window.location = 'https://app1yyg.oss-cn-huhehaote.aliyuncs.com/download/1yyg_sjb.apk'
      }},
      getList:function(){
        var that=this;
        this.$axios.post('/active/getReturnGoods?version=v2').then(function(response){
          if(response.data.code==1){
            that.list=response.data.data;
            that.join()
            for(var i=0;i<that.list.length;i++){
              if(that.list.joined=='1'){
                that.active='notActive';
                that.list[i].btnText='已充值';
              }else{
                that.active='isActive';
                that.list[i].btnText='充值';
              }
            }
          }else if(response.data.code==-14){
            that.$vux.toast.text(response.data.msg);
            // that.JsBridge.callHandler("toLogin",null,function (responseData) {
            // })
            this.navigateTo('userLogin')
          }
          else{
            that.$vux.toast.text(response.data.msg);
          }
        })
      },
      getReturn:function(index){
        var that = this;
        this.$axios.post('/active/getReturnGoods?version=v2').then(function (response) {
          if(response.data.code==1){
            that.navigateTo('buyPay',{datas:JSON.stringify(response.data.data[index])})
            // that.$vux.loading.show({text: '请稍候'});
            // that.JsBridge.callHandler("toRechargePay", response.data.data[index], function (responseData) {
            //   if (responseData == 'success') {
            //     that.$vux.loading.hide();
            //   }
            // })
          }
        });
      },
      toProdetail:function(index){
        var that=this;
        this.$axios.post('/active/getReturnGoods?version=v2').then(function(response){
          if(response.data.code==1){
            that.navigateTo('rechargeGoodDetail',{id:response.data.data[index].recharge_goods_id})
            // that.$vux.loading.show({text: '请稍候'});
            // that.JsBridge.callHandler("toRechargeView", response.data.data[index].recharge_goods_id, function (responseData) {
            //   if (responseData == 'success') {
            //     that.$vux.loading.hide();
            //   }
            // });
          }
        })
      },
      join:function(){
        var that=this;
        this.$axios.post('/active/joinReturnPrize?version=v2').then(function(response){
          if(response.data.code==0){
            that.activeText='已参加活动'
          }
          else{
            that.activeText='领取活动资格'
          }
        })
      },
      joinClick:function(){
        var that=this;
        this.$axios.post('/active/joinReturnPrize?version=v2').then(function(response){
          if(response.data.code==0){
            that.$vux.toast.text(response.data.msg);
          }
          else{
            alert('领取成功')
            that.activeText='领取活动资格'
          }
        })
      },
      share:function(){
        var that = this;
        this.$axios.post('/site/sharecon?version=v2', {type:5}).then(function (response){
          if(response.data.code==1){
            that.shareData = response.data.data
            // that.$vux.loading.show({text: '请稍候'});
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
<style lang="scss" scoped>
  @import "../../assets/css/reset";
  #rebate{
    background: #ff2d4b;
  }
  .banner{
    width:getREM(750);
    margin: auto;
    img{
      width:100%;
    }
  }
  .btnType01{
    width:getREM(265);
    height:getREM(78);
    display: block;
    background: url("../../../static/image/btn01.png") no-repeat;
    background-size:100%;
    border:none;
  @include font-dpr(16px);
    color: #b05c1b;
    margin:0 auto getREM(37) auto;
  }
  .notActive{
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    filter: grayscale(100%);
    filter: gray;
  }
  .rebateCon{
    font-size:0;
    width:getREM(712);
    height:getREM(900);
    margin:0 auto;
    background:#fff09b;
    padding-top:getREM(32);
    color: #6a3906;
    p{
      @include font-dpr(13px);
      color: #6a3906;
      text-align:center;
      margin-bottom:getREM(36);
      span{
        color: #e60012;
      }
    }
  .rechageBox{
     width:getREM(310);
     margin:0 getREM(30);
     display:inline-block;

     &:nth-of-type(2n){
        margin-right: getREM(30);
        margin-left:0;
      }
     img{
       width:getREM(310);
       height:getREM(270);
     }
     button{
       margin: getREM(26) auto;
       width:getREM(265);
       height:getREM(78);
       display: block;
       border:none;
      @include font-dpr(16px);
       color: #b05c1b;
     }
    .btnType02{
      background: url("../../../static/image/btn02.png") no-repeat;
      background-size:100%;
    }
    .btnType03{
      background: url("../../../static/image/btn03.png") no-repeat;
      background-size:100%;
    }
    .btnType04{
      background: url("../../../static/image/btn04.png") no-repeat;
      background-size:100%;
    }
    .btnType05{
      background: url("../../../static/image/btn05.png") no-repeat;
      background-size:100%;
    }
  }
  }
  .explain{
    width:getREM(712);
    margin: 0 auto getREM(100) auto;
    h2{
      width:getREM(463);
      height:getREM(76);
      display: block;
      background: url("../../../static/image/explainTIt.png") no-repeat;
      background-size: 100%;
      margin:getREM(55) auto getREM(20) auto;
    }
    p{
      color:#fff;
      @include font-dpr(14px);
      span{
        color:#fff100;
      }
    }
  }
  .share{
    width:getREM(90);
    height:getREM(117);
    background: url("../../../static/image/shareBtn.png") no-repeat;
    background-size: 100%;
    border:none;
    position: fixed;
    right:0;
    top:getREM(400);
  }
</style>
