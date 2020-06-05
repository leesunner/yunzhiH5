<template>
  <div class="threeDay">
    <div class="seven-head">
      <div :class="{'seven-head-con':true,'seven-head-con-ending':ending,'seven-head-con-end':end}">
        <div class="seven-head-con-time" v-if="!end">
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
    <div class="threeDay-top">
      <div class="threeDay-top-swiper">
        <swiper class="carousel" :options="swiperOption" v-if="numData.receive_list">
          <swiper-slide class="li" v-for="(item,index) in numData.receive_list" :key="index">恭喜{{item.nickname}}成功领取588元大礼包！</swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </div>
    <div class="threeDay-bottom">
      <div class="threeDay-bottom-btn" v-if="numData.recharge_goods_id">
        <p>领取机会 {{numData.has_num}}/{{numData.total_num}}</p>
        <img :src="numData.has_num?require('../../assets/img/t3t0btn.png'):require('../../assets/img/t3t0btn5.png')" @click="getBtn" v-if="numData.total_num">
      </div>
    </div>
    <div class="threeDay-btn" @click="goShopp()">
      <img src="../../assets/img/bt3t0btn.png"/>
    </div>
    <!--领取弹框-->
    <div class="threeDay-dailog"v-if="tkControl" @touchemove.prevent>
      <div class="threeDay-dailog-box">
        <p>在<span @click="navigateTo('ticket')">[我的积分券]</span>中查看</p>
        <div @click="tkControl=false"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "three-day",
    data(){
      return{
        numData:{},
        control:true,
        swiperOption:{
          pagination: '.swiper-pagination',
          speed:800,
          loop:true,
          direction : 'vertical',
          autoplay: {
            delay: 1000,//1秒切换一次
          },
        },
        ending:false,//距离活动结束控制变量
        end:false,//活动已结束控制变量
        times:{//时间控制器
          day:0,
          hour:0,
          m:0,
          s:0
        },
        setInt:'',
        tkControl:false,
      }
    },
    created(){
      this.getMsg()
    },
    methods:{
      getBtn(){
        if(this.numData.has_num){
          if(this.control){
            this.control = false
            this.$axios.post('active/receiveThreeDaysRecharge?version=v2',{}).then(res=>{
              if(res.data.code==1){
                // this.$vux.toast.text('领取成功')
                this.tkControl = true
                this.getMsg()
              }else{
                this.control = true
                this.$vux.toast.text(res.data.msg)
              }
            })
          }
        }else{
          this.$vux.toast.text('领取次数已用完')
        }
      },
      getMsg(){
        this.$axios.post('active/getThreeDaysRechargeInfo?version=v2',{}).then(res=>{
          if(res.data.code==1){
            this.control = true
            this.numData = res.data.data
            this.getTime(res.data.data.time.stime,res.data.data.time.etime,res.data.time)
          }else{
            this.$vux.toast.text(res.data.msg)
          }
        })
      },
      goShopp(){
        //this.numData.recharge_goods_id
        // this.JsBridge.callHandler("rechargeCount", {}, function (responseData) {//跳转到充值
        // });
        this.navigateTo('rechargeGoodDetail',{id:this.numData.recharge_goods_id})
      },
      getTime(st,et,t){
        let that = this
        let timex = 0;
        if(t<st){
          timex =  parseInt(st-t)//时间秒差(距离活动开始)
        }else{
          if(t<et){
            this.ending = true
            timex = et-t//时间秒差(距离活动结束)
          } else {
            this.end = true
          }
        }
        let day = parseInt(timex/(24*3600))//天
        let hours = Math.floor(timex%(24*3600)/(3600))//小时
        let minutes= Math.floor(timex%(24*3600)%3600/60)//分钟
        let seconds = Math.floor(timex%(24*3600)%3600%60)//秒
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
    },
    beforeDestroy(){
      let that = this
      clearInterval(that.setInt)
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/reset.scss";
  .threeDay{
    padding-bottom: 20*$r;
    &-dailog{
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background-color: rgba(0,0,0,0.5);
      z-index: 60;
      &-box{
        width: 614*$r;
        height: 644*$r;
        background: url("../../assets/img/threetk003.png") no-repeat;
        background-size: 100% 100%;
        margin: 0 auto;
        margin-top: 50%;
        overflow: hidden;
        position: relative;
        p{
          margin: 0 auto;
          margin-top: 340*$r;
          text-align: center;
          span{
            color: #e43f13;
            border-bottom: solid 1px #e43f13;
            padding: 0 12*$r;
          }
        }
        div{
          height: 200*$r;
          width: 100%;
          position: absolute;
          left: 0;
          bottom: 0;
        }
      }
    }
    .seven-head {
      height: 55*$r;
      background-color: #ffebad;
      padding-top: 11*$r;
      &-con {
        height: 33*$r;
        background: url("../../assets/img/regsktea.png") no-repeat;
        background-size: contain;
        background-position: center center;
        &-time{
          color: #ff706b;
          width: 95%;
          height: 33*$r;
          line-height: 33*$r;
          margin: 0 auto;
          .span{
            color:#000000;
            margin-left: 49%;
          }
          .span1{
            margin-left: 1%;
          }
          .span2{
            color:#000000;
            margin-left: 0;
          }
          .ss{
            margin: 0 0.5%;
            font-size: 14px;
          }
        }
        &-ending{
          background: url("../../assets/img/cending.png") no-repeat;
          background-size: contain;
          background-position: center center;
        }
        &-end{
          /*background: url("../../assets/img/cyend.png") no-repeat;*/
          /*background-size: contain;*/
          /*background-position: center center;*/
        }
      }
    }
    &-top{
      height: 765*$r;
      background: url("../../assets/img/three5445.png") no-repeat;
      background-size: 100% 100%;
      position: relative;
      &-swiper{
        position: absolute;
        width: 60%;
        height: 30*$r;
        top: 492*$r;
        left: 0;
        right: 0;
        margin: 0 auto;
        z-index: 10;
        .carousel{
          background-color: #19c7cd;
          border-radius: 16*$r;
          margin: auto;
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
      }
    }
    &-bottom{
      height: 832*$r;
      background: url("../../assets/img/three011.png") no-repeat;
      background-size: 100% 100%;
      position: relative;
      &-btn{
        position: absolute;
        top: 222*$r;
        left: 0;
        right: 0;
        margin: 0 auto;
        @include flex-center;
        p{
          color: #ff2d00;
          font-size:28*$r;
        }
        img{
          margin-left: 110*$r;
          width: 264*$r;
          height: 84*$r;
        }
      }
    }
    &-btn{
      position: fixed;
      width: 100%;
      bottom: 0;
      left: 0;
      padding: 12*$r 0;
      @include flex-center;
      background-color: #ffffff;
      img{
        width: 360*$r;
        height: 84*$r;
      }
    }
  }
</style>
