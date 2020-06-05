<template>
  <div class="shake" id="shake">
    <div class="top">
      距离活动<i id="text">{{text}}</i>还剩:<span id="day">{{times.day}}天{{times.hour}}时{{times.m}}分{{times.s}}秒</span>
    </div>
    <div class="shake-top">
      <p>4月27日 00:00 - 5月4日 24:00</p>
    </div>
    <div class="shake-container">
      <p>活动期间内充值N x110元。可得N次掷骰子机会，如充值770 ，可得7次机会！掷出骰子之和为红包金额，若出现豹子号（6,  6,  6）则立得110元红包！</p>
      <div class="shake-container-con">
       <div class="warp" v-for="(item,index) in winerList" :key="index">
          <img src="../../assets/img/shake1.png" v-if="item==1"/>
          <img src="../../assets/img/shake2.png" v-if="item==2"/>
          <img src="../../assets/img/shake3.png" v-if="item==3"/>
          <img src="../../assets/img/shake4.png" v-if="item==4"/>
          <img src="../../assets/img/shake5.png" v-if="item==5"/>
          <img src="../../assets/img/shake6.png" v-if="item==6"/>
          <img src="../../assets/img/shake_shaizi.gif" v-if="item == 0"/>
        </div>
      </div>
      <!-- <div class="shake-container-con" v-if="false">
        <div class="warp1">
          <div class="group">
            <div class="page page1">
              <img src="../../assets/img/shake01.png"/>
            </div>
            <div class="page page2">
              <img src="../../assets/img/shake02.png"/>
            </div>
            <div class="page page3">
              <img src="../../assets/img/shake03.png"/>
            </div>
            <div class="page page4">
              <img src="../../assets/img/shake04.png"/>
            </div>
            <div class="page page5">
              <img src="../../assets/img/shake05.png"/>
            </div>
            <div class="page page6">
              <img src="../../assets/img/shake06.png"/>
            </div>
          </div>
        </div>
        <div class="warp1">
          <div class="group">
            <div class="page page2">
              <img src="../../assets/img/shake06.png"/>
            </div>
            <div class="page page1">
              <img src="../../assets/img/shake02.png"/>
            </div>
            <div class="page page4">
              <img src="../../assets/img/shake05.png"/>
            </div>
            <div class="page page3">
              <img src="../../assets/img/shake01.png"/>
            </div>
            <div class="page page5">
              <img src="../../assets/img/shake04.png"/>
            </div>
            <div class="page page6">
              <img src="../../assets/img/shake03.png"/>
            </div>
          </div>
        </div>
        <div class="warp1">
          <div class="group">
            <div class="page page6">
              <img src="../../assets/img/shake01.png"/>
            </div>
            <div class="page page5">
              <img src="../../assets/img/shake03.png"/>
            </div>
            <div class="page page4">
              <img src="../../assets/img/shake02.png"/>
            </div>
            <div class="page page3">
              <img src="../../assets/img/shake05.png"/>
            </div>
            <div class="page page2">
              <img src="../../assets/img/shake04.png"/>
            </div>
            <div class="page page1">
              <img src="../../assets/img/shake06.png"/>
            </div>
          </div>
        </div>
      </div> -->
      <div class="shake-container-btn">
        <img src="../../assets/img/shake_btn.png" @click="getRollDiceReward()"/>
        <p>剩余机会：<span>{{lastCount}}</span>次</p>
      </div>
      <p class="shake-container-title">
        <img src="../../assets/img/shake_title.png"/>
      </p>
      <ul class="shake-container-rule">
        <li>
          <span>1.</span><p>购买110（谬仙记-高级礼包）才可以参加该活动。</p>
        </li>
        <li>
          <span>2.</span>
          <p>3个骰子掷出的点数之和即为红包金额，如掷出（2，5，6）立得13元红包！如3个骰子点数相同（豹子号）则立得110  元！<br/>
            例掷出（1，1，1）立得110元（附注：这样的情况不会再得到3元红包）。
          </p>
        </li>
        <li>
          <span>3.</span>
          <p>红包即时生效，自生效后有效期3天，请及时使用！</p>
        </li>
        <li>
          <span>4.</span>
          <p>充值不到账，联系QQ客服：3073810793<i v-clipboard:copy="3073810793" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</i></p>
        </li>
      </ul>
    </div>
    <p class="shake-container-bott" @click="toProductView()">立即充值</p>
    <!-- 中奖弹窗 -->
    <div class="winer-box" v-if="isWiner" @click="close()">
      <img src="../../assets/img/yjcha.png" :class="isCoin == 110?'close1':'close'"/>
      <img src="../../assets/img/shake_win1.png" v-if="isCoin == 4" @click.stop="gotoType()"/>
      <img src="../../assets/img/shake_win2.png" v-if="isCoin == 5" @click.stop="gotoType()"/>
      <img src="../../assets/img/shake_win3.png" v-if="isCoin == 6" @click.stop="gotoType()"/>
      <img src="../../assets/img/shake_win4.png" v-if="isCoin == 110" @click.stop="gotoType()" style="width:8.5rem;margin-top:3.7rem;"/>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      lastCount: 0,
      winerList: [1,3,6],
      isWiner: false,
      isCoin: 0,
      end: false,
      ending: false,
      times:{
        day:0,
        hour:0,
        hour1:0,
        m:0,
        m1:0,
        s:0,
        s1:0
      },
      text: '开始'
    }
  },
  methods: {
    getCount() {
      var that = this;
      this.$axios.post('/active/getRollDice?version=v2').then(function (res) {
        console.log(res)
        if (res.data.code == -14) {
          that.lastCount = 0;
        } else {
          that.lastCount = res.data.data.join_num;
          that.startTime = res.data.data.start_time;
          that.endTime = res.data.data.end_time;

          let timex = 0;
          if(res.data.time<res.data.data.start_time){
            timex = (res.data.data.start_time-res.data.time)*1000//时间毫秒差(距离活动开始)
            that.text = '开始'
          }else{
            if(res.data.time<res.data.data.end_time){
              that.ending = true
              timex = (res.data.data.end_time-res.data.time)*1000//时间毫秒差(距离活动结束)
              that.text = '结束'
            } else {
              that.end = true
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
        }
      })
    },
    getRollDiceReward() {
      var that = this;
      this.$axios.post('/active/getRollDiceReward?version=v2').then(function (response) {
        if (response.data.code == 1) {
          that.winerList = [0,0,0]
          setTimeout(function() {
            that.winerList = response.data.data.rand
            that.isWiner = true
            that.isCoin = response.data.data.coupon.coin
            that.getCount();
          }, 3000);
        } else if (response.data.code == -14) {
            that.navigateTo('userLogin')
          } else {
            that.$vux.toast.text(response.data.msg);
          }
      })
    },
    TimeDown(startDateStr,endDateStr) {
      let that = this;
      var startDate = new Date(startDateStr);
      var endDate = new Date(endDateStr);
      var nowDate = String(Number(new Date())).substring(0,10);
      var totalSeconds = ''
      if (parseInt((Number(startDate) - nowDate) > 0)){// 活动为开始
        totalSeconds = parseInt((Number(startDate) - nowDate));
        document.getElementById('text').innerHTML = '开始'
      } else { // 活动开始未结束
        totalSeconds = parseInt((Number(endDate) - nowDate));
        document.getElementById('text').innerHTML = '结束'
      }
      var days = Math.floor(totalSeconds / (60 * 60 * 24))>0? Math.floor(totalSeconds / (60 * 60 * 24)):0;
      var modulo = totalSeconds % (60 * 60 * 24);
      var hours = Math.floor(modulo / (60 * 60))>0?Math.floor(modulo / (60 * 60)):0;
      modulo = modulo % (60 * 60);
      var minutes = Math.floor(modulo / 60)>0?Math.floor(modulo / 60):0;
      var seconds = modulo % 60;
      document.getElementById('day').innerHTML = days + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒";
      // 延迟一秒执行自己
      setInterval(function () {
        that.TimeDown(startDateStr, endDateStr);
      }, 1000)
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
    close() {
      this.isWiner = false
    },
    gotoType() {
      this.navigateTo('type')
    },
    onCopy: function (e) {
        this.$vux.toast.text("复制成功");
    },
    onError: function (e) {
        this.$vux.toast.text("复制失败");
    },
    toProductView:function(){
      this.navigateTo('rechargeGoodDetail',{'id':66})
    }
  },
  created() {
    let that = this;
    document.title = '充值加送110%'
    this.getCount();
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/reset';
.shake{
  background: #4b4070;
  padding-bottom: 1.3rem;
  >img{
    width: 100%;
  }
  &-top{
    width: 100%;
    height: 493*$r;
    background: url("../../assets/img/shake_banner.png") no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
    p{
      margin-top: 204*$r;
      text-align: center;
      color: #ffffff;
      font-size: 24*$r;
    }
  }
  &-container{
    background: #04242f;
    position: relative;
    margin-top: -5px;
    p{
      color: #ffffff;
      font-size: 0.35rem;
      width: 90%;
      padding-bottom: 0.3rem;
      margin: 0 auto;
    }
    &-con{
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 10px;
      box-sizing: border-box;
      height: 3rem;
      background: url('../../assets/img/shake_bg.png') no-repeat;
      background-size: 100% 100%;
      width: 90%;
      margin: 0 auto;
      .warp{
        text-align: center;
        width: 33.333%;
        height: 3rem;
        line-height: 3rem;
        img{
          width: 70%;
          vertical-align: middle;
        }
      }
    }
    &-btn{
      padding-top: 30px;
      text-align: center;
      img{
        width: 40%;
      }
    }
    &-title{
      text-align: center;
      img{
        width: 40%;
      }
    }
    &-rule{
      padding: 0 20px;
      box-sizing: border-box;
      span{
        display: inline-block;
        width: 20px;
        text-align: center;
        vertical-align: top;
        color: #ffffff;
        font-size: 0.35rem;
      }
      p{
        display: inline-block;
        vertical-align: top;
        i{
          display: inline-block;
          font-style: normal;
          padding: 2px 6px;
          color: #0d232e;
          border-radius: 3px;
          background: #e7d38e;
          margin-left: 10px;
          font-size: 0.3rem;
          vertical-align: top;
        }
      }
    }
  }
}
.shake-container-bott{
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 1.3rem;
  background: #fd391f;
  color: #ffffff;
  font-weight: bold;
  text-align: center;
  line-height: 1.3rem;
  font-size: 0.4rem;
  letter-spacing: 1px;
}
.top {
  // @include font-dpr(23px);
  transform: translate(-50%, 0);
  line-height: getREM(87);
  height: getREM(87);
  font-size: getREM(23);
  white-space: normal;
  position: relative;
  left: 50%;
  display: inline-block;
  color: #fff;
  span {
    color: #fff;
    margin: 0 8px 0 8px;
    padding: 0 5px;
    line-height: getREM(87);
  }
  i{
    font-style: normal;
  }
}
.winer-box{
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.5);
  width: 100%;
  height: 100%;
  img{
    width: 6rem;
    display: block;
    margin: 4.5rem auto 0;
  }
  .close{
    position: fixed;
    left: 7.5rem;
    top: 3.5rem;
    width: 0.8rem;
    height: 0.8rem;
    margin: 0;
  }
  .close1{
    position: fixed;
    left: 7.5rem;
    top: 3.5rem;
    width: 0.8rem;
    height: 0.8rem;
    margin: 0;
  }
}
</style>

