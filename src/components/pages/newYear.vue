<template>
  <div class="chirstmass">
    <h2 v-title="'新春狂欢'"></h2>
    <div class="chirstmass-head">
    <div :class="{'chirstmass-head-con':true,'chirstmass-head-con-ending':ending,'chirstmass-head-con-end':end}">
      <div class="chirstmass-head-con-time" v-if="!end">
        <span class="span">{{times.day}}</span>
        <span class="ss">天</span>
        <span class="span2">{{times.hour}}</span>
        <span class="ss">时</span>
        <span class="span2">{{times.m}}</span>
        <span class="ss">分</span>
        <span class="span2">{{times.s}}</span>
        <span class="ss">秒</span>
      </div>
    </div>
  </div>
    <div class="newYear">
      <div class="content">
        <div class="empty"></div>
        <swiper class="carousel" :options="swiperOption" v-if="data.awardList">
          <swiper-slide class="li" v-for="(item,index) in data.awardList" :key="index" v-if="data.awardList">恭喜{{item.nickname}}成功领取新春狂欢大礼包！</swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <div class="content-middle">
          <div class="content-middle-right">
            <img class="content-text" src="../../assets/img/new11.png" alt="">
          </div>
          <div class="content-middle-left">
            <img class="gift" src="../../assets/img/new22.png" alt="">
            <div class="content-middle-left-text">
              <div>累计金额 : &nbsp;<div class="num">{{data.recharge_total || 0}}</div></div>
              <div>领取机会 : &nbsp;<div class="num">{{data.total-data.alreadyNum || 0}}/{{data.total|| 0}}</div></div>
            </div>
            <img class="pulldown" src="../../../static/img/christmasljBtn.png" alt="" @click="submit()">
          </div>
        </div>
        <div class="content-bottom">
          <p><span class="h3">活动规则: &nbsp;</span>春节活动期间，累计充值满<span class="orange">588</span>元即可领取价值<span class="orange">188</span>元【新春大礼包】，多充多送上不封顶。</p>
          <p><span class="h3">活动说明: &nbsp;</span></p>
          <ul class="content-bottom-text">
            <li>1、活动期间，所有登陆用户均可参与本活动；</li>
            <li>2、礼包获取的积分劵即刻生效，有效期为<span class="orange">7</span>天，可在个人中心<span class="orange">“我的积分劵”</span>中查看；</li>
            <li>3.领取次数上不封顶，充值每满<span class="orange">588</span>元即可领取<span class="orange">1</span>次；</li>
            <li>4.活动最终解释权归乐购运营团队所有。</li>
          </ul>
        </div>
        <img class="share" src="../../../static/img/christmasShare.png" alt="" @click="getyq()">
      </div>

      <footer>
        <img src="../../../static/img/christmascjBtn.png" alt="" @click="goShopp()">
      </footer>
    </div>
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
        shareData:'',
        setInt:'',
        ending:false,//距离活动结束控制变量
        end:false,//活动已结束控制变量
        times:{
          hour:0,
          hour1:0,
          m:0,
          m1:0,
          s:0,
          s1:0
        },
        swiperOption:{
          pagination: '.swiper-pagination',
          speed:800,
          loop:true,
          direction : 'vertical',
          autoplay: {
            delay: 1000,//1秒切换一次
          }
        }
      }
    },
    created() {
      this.getCode();
    },
    beforeDestroy(){
      let that = this
      clearInterval(that.setInt)
    },
    mounted() {

    },
    methods: {
      getCode(){//获取次数和金额
        let that = this
        this.$axios.post("active/getChristmasInfo?version=v2",{}).then(res=>{
          if(res.data.code == 200){
            this.data=res.data.data;
            let timex = 0;
            if(res.data.data.time<res.data.data.stime){
              timex = (res.data.data.stime-res.data.data.time)*1000//时间毫秒差(距离活动开始)
            }else{
              if(res.data.data.time<res.data.data.etime){
                this.ending = true
                timex = (res.data.data.etime-res.data.data.time)*1000//时间毫秒差(距离活动结束)
              } else {
                this.end = true
              }
            }
            let day = parseInt(timex/(24*3600*1000))//天
            let hours = Math.floor(timex%(24*3600*1000)/(3600*1000))//小时
            let minutes= Math.floor(timex%(24*3600*1000)%(3600*1000)/(60*1000))//分钟
            let seconds = Math.floor(timex%(24*3600*1000)%(3600*1000)%(60*1000)/1000)//秒
            let _day = day,_hours = hours,_minutes = minutes,_seconds = seconds;
            if(timex<=0){
              that.changTime(0,0,0,0)
            }else{
              that.setInt = setInterval(function () {//倒计时算法
                if(_seconds>0){
                  _seconds-=1
                }else{
                  if(_minutes>0){
                    _seconds = 59
                    _minutes-=1
                  }else{
                    if(_hours>0){
                      _minutes=59
                      _hours-=1
                    }else {
                      if(_day>0){
                        _day-=1
                        _hours=23
                        _minutes=59
                      }else{
                        clearInterval(that.setInt)
                        _hours=0
                        _minutes=0
                        _seconds=0
                      }
                    }
                  }
                }
                that.changTime(_day,_hours,_minutes,_seconds)//读取时间
              },1000)
            }
          }else{
            this.$vux.toast.text(res.data.msg)
          }
        })
      },
      changTime(day,hours,minutes,seconds){
        let that = this
        if(day<10){
          that.times.day = '0'+day
        }else{
          that.times.day = day
        }
        if(hours<10){
          that.times.hour = '0'+hours
        }else{
          that.times.hour = hours
        }
        if(minutes<10){
          that.times.m = '0'+minutes
        }else{
          that.times.m = minutes
        }
        if(seconds<10){
          that.times.s = '0'+seconds
        }else{
          that.times.s = seconds
        }
      },
      submit(){//领取礼包
        this.$axios.post("active/receiveChristmasCoupon?version=v2",{}).then(res=>{
          console.log(res.data)
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
  .chirstmass{
    width: 100%;
    min-height: 1640*$r;
    /*overflow-y: auto;*/
    /*-webkit-overflow-scrolling:touch;*/
    &-head{
      height: 55*$r;
      background-color: #520a0d;
      padding-top: 11*$r;
      &-con{
        height: 33*$r;
        background: url("../../assets/img/regsk.png") no-repeat;
        background-size: contain;
        background-position: center center;
        &-time{
          color: #ffffff;
          width: 600*$r;
          height: 33*$r;
          line-height: 33*$r;
          margin: 0 auto;
          .span{
            margin-left: 49%;
          }
          .span1{
            margin-left: 1%;
          }
          .span2{
            margin-left: 0;
          }
          .ss{
            color:#ffd942;
            margin: 0 0.5%;
            font-size: 14px;
          }
        }
        &-ending{
          background: url("../../assets/img/ending.png") no-repeat;
          background-size: contain;
          background-position: center center;
        }
        &-end{
          background: url("../../assets/img/ends.png") no-repeat;
          background-size: contain;
          background-position: center center;
        }
      }
    }
    .newYear{
      position: absolute;
      width: 100%;
      min-height: 1640*$r;
      background: url("../../assets/img/xinchunbg.png") no-repeat;
      background-size: 100% 100%;
      margin-bottom: 89*$r;
      .content{
        // overflow: hidden;
        width: 702*$r;
        height:1134*$r;
        margin: auto;
        margin-top: 430*$r;
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
          margin: 30*$r 35*$r 0 35*$r;
          @include flex-center;
          justify-content: flex-start;
          .content-middle-left{
            @include flex-align;
            .gift{
              width: 263*$r;
              height: 273*$r;
            }
            .content-middle-left-text{
              line-height: 40*$r;
              color: #fff;
              font-size: 20*$r;
              letter-spacing: 1*$r;
              padding: 8*$r 0;
              .num{
                display: inline-block;
                width: 87*$r;
                height: 30*$r;
                line-height: 30*$r;
                border-radius: 10px;
                background: #3a3a3a;
                text-align: center;
                opacity: 0.55;
              }
            }
            .pulldown{
              width: 108*$r;
              height: 117*$r;
            }
          }
          .content-middle-right{
            margin-right: 10*$r;
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

  }
</style>
