<template>
    <div class="festival">
      <h2 v-title="'新手专享'"></h2>
      <!-- <div class="festival-head">
        <div :class="{'festival-head-con':true,'festival-head-con-ending':ending,'festival-head-con-end':end}">
          <div class="festival-head-con-time" v-if="!end">
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
      </div> -->
      <div class="festival-content">
        <div class="festival-content-top">
          <div class="festival-content-top-swiper">
            <swiper class="carousel" :options="swiperOption" v-if="list">
              <swiper-slide class="li" v-for="(item,index) in list" :key="index">
                <p>恭喜{{item.nickname}}购买了活动礼包！</p>
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
          </div>
          <div :class="{'festival-content-top-btn':true,'gay':data.is_join||!(this.data.stime<=this.data.time&&this.data.etime>this.data.time)}" @click="buyThis">火速抢购</div>
        </div>
        <img src="../../assets/images/yxj1_02.png"/>
        <img src="../../assets/images/yxj1_03.png"/>
      </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        data:{
          // awardList:[],
        },
        setInt:'',
        ending:false,//距离活动结束控制变量
        end:false,//活动已结束控制变量
        times:{
          day:0,
          hour:0,
          hour1:0,
          m:0,
          m1:0,
          s:0,
          s1:0
        },
        list:[],
        goods:{},
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
    methods: {
      getCode(){//获取次数和金额
        let that = this
        this.$axios.post("active/getLanternFestivalInfo?version=v2",{}).then(res=>{
          if(res.data.code == 200){
            this.data=res.data.data;
            this.list = res.data.data.notice_list
            this.goods=res.data.data.recharge_goods
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
      buyThis(){//购买礼包
        if(!this.data.is_join){
          if(this.data.stime<=this.data.time&&this.data.etime>this.data.time){
            this.goShopp()
          }else{
            this.$vux.toast.text('不在活动时间内')
          }
        }else{
          this.$vux.toast.text('您已购买礼包')
        }
      },
      goShopp(){
        let that = this.goods
        this.navigateTo('rechargeGoodDetail',{'id':that.recharge_goods_id})
        // if(this.getPhoneType()=='Android'){
        //   this.JsBridge.callHandler("toRechargeView", that.recharge_goods_id, function (responseData) {//跳转到充值
        //   });
        // }else{
        //   this.JsBridge.callHandler("toProductView", that.recharge_goods_id, function (responseData) {//跳转到充值
        //   });
        // }
      },
      getPhoneType(){//判断系统类型
          let  u = navigator.userAgent
          let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
          let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
          if (isAndroid) {
            //这个是安卓操作系统
            return 'Android'
          }
          if (isIOS) {
            //这个是ios操作系统
            return 'ios'
          }
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/reset";
  .festival{
    width: 100%;
    min-height: 1640*$r;
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
    &-content {
      position: absolute;
      width: 100%;
      min-height: 1640*$r;
      &-top{
        width: 100%;
        height: 835*$r;
        background: url("../../assets/images/yxj1_002.png") no-repeat;
        background-size:cover;
        position: relative;
        &-swiper{
          position: absolute;
          top: 458*$r;
          width: 100%;
          height: 35*$r;
          left: 0;
          text-align: center;
          overflow: hidden;
          p{
            color: #fff102;
          }
        }
        &-btn{
          position: absolute;
          bottom:86*$r;
          right: 234*$r;
          background-color: #ff3c00;
          text-align: center;
          width: 160*$r;
          height: 40*$r;
          border-radius: 8*$r;
          line-height: 40*$r;
          color: #ffffff;
        }
        .gay{
          background-color: #999999;
        }
      }
      img{
        display: block;
        width: 100%;
      }
    }
  }

</style>
