<template>
    <div class="seven">
      <h2 v-title="'七天签到'"></h2>
      <div class="seven-head">
        <div class="seven-head-con">
          <div class="seven-head-con-time">
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
      <div class="qtcontent">
        <div class="qtcontent-day">
         <span>一</span>
        </div>
        <div class="qtcontent-fen">
          <span>{{data.coupon}}</span>
        </div>
        <div class="qtcontent-btn">
          <img @click="getCoupon" src="../../assets/img/dij.png" v-if="data.isSignin===0"/>
          <img src="../../assets/img/yied.png" v-else />
        </div>
        <img class="guiz" src="../../assets/img/fang.png"/>
      </div>
    </div>
</template>

<script>
    export default {
        name: "sevensign2019",
      data(){
          return{
            setInt:'',
            data:{},
            times:{
              day:0,
              hour:0,
              m:0,
              s:0
            },
            contro:true
          }
      },
      created(){
          this.getMsg()
      },
      beforeDestroy(){
        let that = this
        clearInterval(that.setInt)
      },
      methods:{
          getCoupon(){//领取积分
            let that  =this
            if(this.contro){
              this.contro = false
              this.$axios.post("active/newYeaCouponReceive?version=v2",{}).then(res=>{
                if(res.data.code == 200){
                  if(res.data.data.status==1){//领取成功
                      this.$vux.toast.text(res.data.data.message)
                      that.getMsg()
                  }else{
                    this.contro = true
                    this.$vux.toast.text(res.data.data.message)
                  }
                }else{
                  this.contro = true
                  this.$vux.toast.text(res.data.msg)
                }
              })
            }
          },
          getMsg(){
            let that = this
            this.$axios.post("active/getNewYeaCouponReceiveInfo?version=v2",{}).then(res=>{
              if(res.data.code == 200){
                that.contro = true
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
      }
    }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/reset";
  .seven {
    width: 100%;
    min-height: 1620*$r;
    &-head {
      height: 55*$r;
      background-color: #520a0d;
      padding-top: 11*$r;
      &-con {
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
    .qtcontent{
      background: url("../../assets/img/qbj.jpg") no-repeat;
      background-size: 100% 100%;
      width: 100%;
      min-height: 1620*$r;
      padding-top: 590*$r;
      &-day{
        width: 373*$r;
        height: 124*$r;
        background: url("../../assets/img/days1.png") no-repeat;
        background-size: 100% 100%;
        font-size: 22px;
        font-weight: bold;
        color: #ffffff;
        line-height: 124*$r;
        margin: 0 auto;
        span{
          display: block;
          width: 42*$r;
          height: 124*$r;
          text-align: center;
          line-height: 113*$r;
          margin-left: 167*$r;
        }
      }
      &-fen{
        width: 338*$r;
        height: 169*$r;
        background: url("../../assets/img/kkkk.png") no-repeat;
        background-size: 100% 100%;
        text-align: left;
        line-height: 100*$r;
        margin: 0 auto;
        margin-top: 50*$r;
        span{
          display: block;
          color: #ed1f39;
          width: 100*$r;
          height: 100*$r;
          text-align: center;
          line-height: 100*$r;
          font-size: 35px;
          margin-left: 82*$r;
        }
      }
      &-btn{
        margin-top: 40*$r;
       text-align: center;
        margin-bottom: 38*$r;
        img{
          width: 397*$r;
          height: 95*$r;
        }
      }
      .guiz{
        display: block;
        width: 100%;
        height: 398*$r;
        margin: 0 auto;
      }
    }
  }

</style>
