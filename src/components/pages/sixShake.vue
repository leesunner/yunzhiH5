<template>
  <div class="shake" id="shake">
    <div class="top">
      <div class="top-box">
        距离活动<i id="text">{{text}}</i>还剩:<span id="day"> <i class="ibox">{{times.day}}</i>天<i class="ibox">{{times.hour}}</i>:<i class="ibox">{{times.m}}</i>:<i class="ibox">{{times.s}}</i></span>
      </div>
    </div>
    <div class="shake-container">
      <div class="shake-container-titlef">
        活动时间：{{startTime|timeforamt}}－{{endTime|timeforamt}}
      </div>
      <div class="shake-container-box">
        <div class="shake-container-box-tab">
          <div :class="rechargeVal==1?'tab1':'tab2'" @click="rechargeVal=1"></div>
          <div :class="rechargeVal==2?'tab3':'tab4'" @click="rechargeVal=2"></div>
        </div>
        <div class="shake-container-box-numberBox">
          <div class="container">
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
            <div class="shake-container-btn">
              <p>剩余机会：<span>{{rechargeVal==1?hdValue.join_num:fdValue.join_num}}</span>次</p>
              <div class="shake-container-btn-btn">
                <div class="btn1" @click="toProductView()">
                  {{rechargeVal==1?'充值100元':'充值405元'}}
                </div>
                <div class="btn2" @click="getRollDiceReward()">
                  投掷1次
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="shake-container-content">
      <ul class="shake-container-rule">
        <p class="shake-container-title">
          <img src="../../assets/img/yylbc02title.png"/>
        </p>
        <li>
          <span>1.</span><p>购买100（勇者之星礼包）或405（神圣时代礼包）才可以参加该活动。</p>
        </li>
        <li>
          <span>2.</span>
          <p>3个骰子掷出的点数之和即为红包金额，如掷出（2.5.6）立得13元红包！如三个骰子点数相同（6,6,6豹子号）充值100立得100元，冲405立得405元！（附注：这样的情况不会再得到13元红包）。。
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
    <!-- 中奖弹窗 -->
    <div class="winer-box" v-if="isWiner" @click="close()">
      <img src="../../assets/img/yjcha.png" :class="(isCoin == 100||405)?'close1':'close'"/>
      <img src="../../assets/img/shake_win1.png" v-if="isCoin == 4" @click.stop="gotoType()"/>
      <img src="../../assets/img/shake_win2.png" v-if="isCoin == 5" @click.stop="gotoType()"/>
      <img src="../../assets/img/shake_win3.png" v-if="isCoin == 6" @click.stop="gotoType()"/>

      <img src="../../assets/img/shake_win10.png" v-if="isCoin == 10" @click.stop="gotoType()"/>
      <img src="../../assets/img/shake_win11.png" v-if="isCoin == 11" @click.stop="gotoType()"/>
      <img src="../../assets/img/shake_win12.png" v-if="isCoin == 12" @click.stop="gotoType()"/>
      <img src="../../assets/img/shake_win13.png" v-if="isCoin == 13" @click.stop="gotoType()"/>
      <img src="../../assets/img/shake_win14.png" v-if="isCoin == 14" @click.stop="gotoType()"/>
      <img src="../../assets/img/shake_win15.png" v-if="isCoin == 15" @click.stop="gotoType()"/>
      <img src="../../assets/img/shake_win16.png" v-if="isCoin == 16" @click.stop="gotoType()"/>
      <img src="../../assets/img/shake_win17.png" v-if="isCoin == 17" @click.stop="gotoType()"/>
      <img src="../../assets/img/shake_win405.png" v-if="isCoin == 405" @click.stop="gotoType()" style="width:8.5rem;margin-top:3.7rem;"/>

      <img src="../../assets/img/shake_win4.png" v-if="isCoin == 100" @click.stop="gotoType()" style="width:8.5rem;margin-top:3.7rem;"/>
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
        startTime:'',
        endTime:'',
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
        text: '开始',
        rechargeVal:1,
        hdValue:'',//100
        fdValue:'',//405
      }
    },
    filters:{
      timeforamt(val){
        let t = new Date(val*1000),
          h = t.getHours(),
          m = t.getMinutes();
        if(h<10){
          h='0'+h
        }
        if(m<10){
          m='0'+m
        }
        return t.getMonth()+1+'月'+t.getDate()+'日'+' '+h+'：'+m
      }
    },
    methods: {
      getCount() {
        var that = this;
        this.$axios.post('/active/getRollDice?version=v2').then(function (res) {
          if (res.data.code == -14) {
            this.$vux.toast.text(res.data.msg)
          } else {
            that.startTime = res.data.data.start_time;
            that.endTime = res.data.data.end_time;
            that.hdValue = res.data.data.active_list['100active'];
            that.fdValue = res.data.data.active_list['405active'];
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
      getRollDiceReward() {//点击开始摇摇乐
        var that = this;
        let type = this.rechargeVal==1?'100active':'405active';
        this.$axios.post('/active/getRollDiceReward?version=v2',{type:type}).then(function (response) {
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
        let id = this.rechargeVal==1?this.hdValue.goods_id:this.fdValue.goods_id
        this.navigateTo('rechargeGoodDetail',{'id':id})
      }
    },
    created() {
      let that = this;
      this.getCount();
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../assets/css/reset';
  .shake{
    background: #71d99d;
    padding-bottom: 56*$r;
    position: relative;
    >img{
      width: 100%;
    }
    &-container{
      background: url("../../assets/img/yylbc01.png") no-repeat;
      background-size: 100% 100%;
      height: 1134*$r;
      position: relative;
      &-titlef{
        position: absolute;
        top:376*$r;
        left: 0;
        width: 100%;
        text-align: center;
        color: #21491d;
        font-size: 26*$r;
        font-weight: bolder;
      }
      &-box{
        width: 100%;
        position: absolute;
        bottom: 4*$r;
        left: 0px;
        &-tab{
          @include flex-space;
          margin: 0 auto;
          width: 58.5%;
          div{
            width: 205*$r;
            height: 100*$r;
          }
          .tab1{
            background: url("../../assets/img/btn-100-2.png") no-repeat;
            background-size: 100% 100%;
          }
          .tab2{
            background: url("../../assets/img/btn-100-1.png") no-repeat;
            background-size: 100% 100%;
          }
          .tab3{
            background: url("../../assets/img/btn-405-2.png") no-repeat;
            background-size: 100% 100%;
          }
          .tab4{
            background: url("../../assets/img/btn-405-1.png") no-repeat;
            background-size: 100% 100%;
          }
        }
        &-numberBox{
          position: relative;
          height: 444*$r;
          .container{
            position: absolute;
            top: -12*$r;
            left: 0;
            right: 0;
            margin: 0 auto;
            background: url("../../assets/img/shake-ditu.png") no-repeat;
            background-size: 100% 100%;
            height: 444*$r;
          }
        }
      }
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
        padding: 20*$r 20*$r 0 20*$r;
        box-sizing: border-box;
        height: 186*$r;
        /*background: url('../../assets/img/shake_bg.png') no-repeat;*/
        /*background-size: 100% 100%;*/
        width: 90%;
        margin: 0 auto;
        margin-top: 28*$r;
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
        text-align: center;
        p{
          color: #f6d811;
        }
        &-btn{
          @include flex-space;
          width: 79%;
          margin: 0 auto;
          color: #ffffff;
          font-size: 36*$r;
          font-weight: bolder;
        }
        .btn1{
          width: 288*$r;
          height: 90*$r;
          line-height: 90*$r;
          background: url("../../assets/img/Btn-chongzhi.png") no-repeat;
          background-size: 100% 100%;
        }
        .btn2{
          width: 232*$r;
          height: 90*$r;
          line-height: 90*$r;
          background: url("../../assets/img/Btn-cishu.png") no-repeat;
          background-size: 100% 100%;
        }
      }
      &-title{
        text-align: center;
        img{
          width: 40%;
        }
      }
      &-content{
        background: url("../../assets/img/yylbc02.png") no-repeat;
        background-size: 100% 100%;
      }
      &-rule{
        margin: 0 40*$r;
        box-sizing: border-box;
        color: #1a8748;
        background-color: #ffffff;
        border-radius: 20*$r;
        padding: 34*$r 24*$r;
        span{
          display: inline-block;
          width: 20px;
          text-align: center;
          vertical-align: top;
          font-size: 0.35rem;
        }
        p{
          display: inline-block;
          vertical-align: top;
          color: #1a8748;
          font-size: 0.35rem;
          width: 90%;
          margin: 0 auto;
          i{
            display: inline-block;
            font-style: normal;
            padding: 2px 6px;
            color: #0d232e;
            border-radius: 3px;
            background: #1a8748;
            color: #ffffff;
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
    font-size: getREM(23);
    white-space: normal;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    z-index: 10;
    color: #fff;
    &-box{
      width: 498*$r;
      height: 70*$r;
      background: url("../../assets/img/djssxibc.png") no-repeat;
      background-size: 100% 100%;
      margin: 0 auto;
      color: #f0ce68;
      text-align: center;
    }
    span {
      color: #fff;
      margin: 0 12*$r 0 0;
      padding: 0 5px;
      line-height: 70*$r;
      color: #f0ce68;
    }
    i{
      font-style: normal;
    }
    .ibox{
      background-color: #336c56;
      padding: 4*$r 4*$r;
      margin: 6*$r;
      letter-spacing: 1px;
      border-radius: 6*$r;
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

