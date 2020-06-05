<template>
  <div class="timing-head" :style="'backgroundColor:'+backgroundColor">
    <div class="timing-head-con" :style="'backgroundImage: url('+imgUrl+')'">
      <div class="timing-head-con-time">
        <span class="span">{{times.hour}}</span>
        <span class="span1">{{times.hour1}}</span>
        <span class="span2">{{times.m}}</span>
        <span class="span1">{{times.m1}}</span>
        <span class="span2">{{times.s}}</span>
        <span class="span1">{{times.s1}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "timimg",
    props:{
      backgroundColor:String,//背景色
      imgUrl:String,//图片的RUL
      timex:Number,//毫秒时间差
    },
    data(){
      return{
        times:{
          hour:0,
          hour1:0,
          m:0,
          m1:0,
          s:0,
          s1:0
        },
      }
    },
    created(){
      this.getCode()
    },
    methods:{
      getCode(){//获取次数和金额
        let that = this
        let timex = that.timex//时间毫秒差
        let hours = Math.floor(timex%(24*3600*1000)/(3600*1000))//小时
        let minutes= Math.floor(timex%(24*3600*1000)%(3600*1000)/(60*1000))//分钟
        let seconds = Math.floor(timex%(24*3600*1000)%(3600*1000)%(60*1000)/1000)//秒
        let _hours = hours,_minutes = minutes,_seconds = seconds;
        let intTime = setInterval(function () {//倒计时算法
          if(_seconds>0){
            _seconds-=1
          }else if(_seconds==0){
            if(_minutes>0){
              _seconds = 60
              _minutes-=1
            }else if(_minutes==0&&_hours>0){
              _minutes=60
              if(_hours>0){
                _hours-=1
              }else{
                _hours=0
              }
            }else{
              _minutes=0
              _seconds=0
            }
          }else{
            clearInterval(intTime)
          }
          that.changTime(_hours,_minutes,_seconds)//读取时间
        },1000)
      },
      changTime(hours,minutes,seconds){
        let that = this
        if(hours<10){
          that.times.hour = 0
          that.times.hour1 = hours
        }else{
          that.times.hour = hours.toString().substring(0,1)
          that.times.hour1 = hours.toString().substring(1)
        }
        if(minutes<10){
          that.times.m = 0
          that.times.m1 = minutes
        }else{
          that.times.m = minutes.toString().substring(0,1)
          that.times.m1 = minutes.toString().substring(1)
        }
        if(seconds<10){
          that.times.s = 0
          that.times.s1 = seconds
        }else{
          that.times.s = seconds.toString().substring(0,1)
          that.times.s1 = seconds.toString().substring(1)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/reset.scss";
  .timing{
    &-head {
      height: 55*$r;
      background-color: #520a0d;
      padding-top: 11*$r;
      &-con {
        height: 33*$r;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center center;
        &-time {
          color: #ffffff;
          width: 565*$r;
          height: 33*$r;
          line-height: 33*$r;
          margin: 0 auto;
          .span {
            margin-left: 50.5%;
          }
          .span1 {
            margin-left: 15*$r;
          }
          .span2 {
            margin-left: 52*$r;
          }
        }
      }
    }
  }
</style>
