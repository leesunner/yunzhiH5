<template>
  <div id="hongbao">
    <div class="banner">
      <img src="../../../static/image/lqHbBanner.png" alt="">
    </div>
    <div class="hb" v-show="!result">
      <img src="../../../static/image/hb.png" alt="">
      <div class="open" @click="getCoupon">
        <img src="../../../static/image/hb-btn.png" alt="">
      </div>
    </div>
    <div class="hb" v-show="result">
      <img src="../../../static/image/hb.png" alt="">
      <!--<div class="open" v-if="this.$route.params.log>0&&this.$route.params!=null">       &lt;!&ndash; 移动端携带抢红包记录访问 &ndash;&gt;
          <p style="font-size:28px;">恭喜您</p>
          <p style="font-size:18px;">获得{{data}}积分券</p>
          <div class="check" @click="check">立即查看</div>
      </div>-->
      <div class="open">
        <p style="font-size:28px;">恭喜您</p>
        <p style="font-size:18px;">获得{{data}}积分券</p>
        <div class="check" @click="check">立即查看</div>
      </div>
    </div>
    <div class="text-block log-block" v-if="list!= null && list!= ''">
      <swiper auto height="25px" direction="vertical" :show-dots="false">
        <swiper-item v-for="(log,index) in list" :key="index">
          <p class="log-p"><span>{{log.nickname}}</span><span>{{'抢到'+log.log_coin+'积分券'}}</span><span>{{log.ctime}}</span></p>
        </swiper-item>
      </swiper>
    </div>
    <div class="text-block">
      <img src="../../../static/image/hb-text.png" alt="">
      <p><strong>1.</strong> 活动期间，每天登陆即可免费领取，每天有一次领取机会，积分券数量有限，先到先得哦。</p>
      <p><strong>2.</strong> 抢券成功后，请在个人中心 - 我的积分券中查看和使用</p>
      <p><strong>3.</strong> 本活动零钱乐购拥有最终解释权</p>
    </div>
  </div>
</template>
<script>
  import { Swiper,SwiperItem } from 'vux';
  export default{
    name:'hongbao',
    components:{Swiper,SwiperItem},
    data(){
      return{
        result:false,
        list:[],
        data:""
      }
    },
    created:function(){
      document.title='天天抢券';
      this.getList();
      // this.JsBridge.callHandler("shareRight", {type:3, id:0}, function (responseData) {});
    },
    methods:{
      getCoupon:function(){
        var that = this;
        // that.JsBridge.callHandler("getCoupon", "abc",function (responseData) {   //移动端接口抢红包回调
        //   if (responseData!='fail') {
        //     that.result = true;
        //     that.data = responseData;
        //   }else{
        //     that.$vux.toast.text("请求失败,请重试");
        //   }
        // });
        this.$axios.post('/active/getCoupon?version=v2').then(function (response) {     // h5接口抢红包
         if(response.data.code==1){
         that.result = true;
         that.data = response.data.data.coin;
         }else{
         that.$vux.toast.text(response.data.msg);
         }
         })
      },
      getList:function(){
        var that = this;

        this.$axios.post('/active/getCouponlist?version=v2',{user_id:this.$route.params.log}).then(function (response) {
          if(response.data.code==1){
            that.list = response.data.data.logs;
            if(response.data.data.log.log_coin!=null){          //传userId  h5请求接口查询记录
              that.data = response.data.data.log.log_coin;
              that.result = true;
            }
          }
        })

        /* this.$axios.post('/active/getCouponlist').then(function (response) {   //移动端携带抢红包记录访问h5
         if(response.data.code==1){
         that.list = response.data.data.logs;
         }
         if(that.$route.params.log!=null && that.$route.params.log>0){
         that.result = true;
         that.data = that.$route.params.log;
         }
         })*/
      },
      check:function(){
        this.JsBridge.callHandler("checkScore","adc",function (responseData) {});
      },
    }
  }
</script>
<style>
  #hongbao{background:url("../../../static/image/lqhbBg.png")no-repeat;background-size:100% 100%;}
  #hongbao .banner img{width:100%;}
  #hongbao .hb{ padding:20px 30px;position:relative;}
  #hongbao .hb img{width:100%;vertical-align: middle;}
  #hongbao .hb .open{position:absolute; left:0; right:0;margin:0 auto;top:40%; color:#fff;width:50%;text-align:center;}
  #hongbao .hb .open p{line-height:45px;}
  #hongbao .hb .open .check{margin:15px 0;font-size:14px;border-radius:25px;background:#fdc51c;line-height:35px;display:inline-block; padding:0 35px;}
  #hongbao .text-block{margin:15px; padding:15px;background:#9333a6;border-radius:4px; color:#e8e8e8;line-height:25px;opacity:.9;}
  #hongbao .text-block img{width:60%;margin:0 auto;display:block;}
  #hongbao .log-p{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;line-height:25px;text-align:center;}
  #hongbao .log-p span{margin-right:10px;}
  #hongbao .log-p span:last-child{margin-right:0; }
</style>
