<template>
  <div class="chirstmass">
    <h2 v-title="'充值排行榜'"></h2>
    <div class="chirstmass-head">
      <div class="chirstmass-head-con">
        <div class="chirstmass-head-con-time">
          <span class="span">{{times.hour}}</span>
          <span class="span1">{{times.hour1}}</span>
          <span class="ss">:</span>
          <span class="span2">{{times.m}}</span>
          <span class="span1">{{times.m1}}</span>
          <span class="ss">:</span>
          <span class="span2">{{times.s}}</span>
          <span class="span1">{{times.s1}}</span>
        </div>
      </div>
    </div>
    <div class="recharge">
      <div class="recharge-head"></div>
      <div class="recharge-ranking">
        <div class="recharge-ranking-item recharge-ranking-two">
          <div class="recharge-ranking-item-img" :style="{backgroundImage: 'url('+two.avatar+')'}"></div>
          <div class="recharge-ranking-context">
            <div class="recharge-ranking-item-name">{{two.nickname}}</div>
            <div class="recharge-ranking-item-rmb">{{'已充值'+two.recharge_total+'元'}}</div>
          </div>
        </div>
        <div class="recharge-ranking-item recharge-ranking-one">
          <div class="recharge-ranking-item-img" :style="{backgroundImage: 'url('+one.avatar+')'}"></div>
          <div class="recharge-ranking-context">
            <div class="recharge-ranking-item-name">{{one.nickname}}</div>
            <div class="recharge-ranking-item-rmb">{{'已充值'+one.recharge_total+'元'}}</div>
          </div>
        </div>
        <div class="recharge-ranking-item recharge-ranking-three">
          <div class="recharge-ranking-item-img" :style="{backgroundImage: 'url('+three.avatar+')'}"></div>
          <div class="recharge-ranking-context">
            <div class="recharge-ranking-item-name">{{three.nickname}}</div>
            <div class="recharge-ranking-item-rmb">{{'已充值'+three.recharge_total+'元'}}</div>
          </div>
        </div>
      </div>
      <div class="recharge-ranking-center" v-if="data.length>3">
        <ul>
          <li v-for="(item,index) in data" v-if="index<=6">
            <img class="headImg" :src="item.avatar">
            <div class="context">
              <p class="name">{{item.nickname}}</p>
              <p class="yuan">{{'( 已充值'+item.recharge_total+'元 )'}}</p>
              <img src="../../assets/img/100down.png">
            </div>
            <div class="num">{{index+4}}</div>
          </li>
        </ul>
      </div>
      <div class="recharge-rule">
        <img class="title" src="../../assets/img/resRule.png">
        <div class="rule">
          <ul>
            <li>
              <div class="rule-item">
                <div class="rule-item-num">1</div>
                <span>2019年1月14日至2019年1月18日,</span>
              </div>
              <p>活动期间用户与代充的金额都会被统计下来</p>
              <p>结算充值金额最多的前10名可获得充值排行榜的奖励</p>
            </li>
            <li>
              <div class="rule-item">
                <div class="rule-item-num">2</div>
                <span>2019年1月18日23时59分，</span>
              </div>
              <p>榜单将停止实时刷新充值金额，并根据排名发放奖品；</p>
            </li>
            <li>
              <div class="rule-item">
                <div class="rule-item-num">3</div>
                <span>2019年1月14日至2019年1月18日</span>
              </div>
              <p>领取时需提供用户ID号、个人详情页截图以及支付宝号。</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="recharge-button">
        <div class="shadom"></div>
        <div class="button" @click="goShopp">
          <img src="../../assets/img/reButton.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "week-recharge",
    data(){
      return{
        setInt:'',
        one:{},
        two:{},
        three:{},
        data:[],
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
    methods:{
      getMsg(){//获取充值排行
        let that = this
        that.$axios.get('active/getJanuaryRechargeRank?version=v2').then(res=>{
          let data = res.data
          if(data.code===200){
            if(data.data.list[0]!=undefined){
              that.one = data.data.list[0]
            }
            if(data.data.list[1]!=undefined){
              that.two = data.data.list[1]
            }
            if(data.data.list[2]!=undefined){
              that.three = data.data.list[2]
            }
            if(data.data.list.length>3){
              that.data = data.data.list.slice(3,data.data.list.length)
            }
            let timex = (data.data.stime-data.data.time)*1000//时间毫秒差(根据后台返回的时间计算)
            let day = parseInt(timex/(24*3600*1000))//天
            let hours = Math.floor(timex%(24*3600*1000)/(3600*1000))//小时
            let minutes= Math.floor(timex%(24*3600*1000)%(3600*1000)/(60*1000))//分钟
            let seconds = Math.floor(timex%(24*3600*1000)%(3600*1000)%(60*1000)/1000)//秒
            let _hours = hours+24*day,_minutes = minutes,_seconds = seconds;
            if(timex<=0){
              that.changTime(0,0,0)
            }else {
              that.setInt = setInterval(function () {//倒计时算法
                if(_seconds>0){
                  _seconds-=1
                }else{
                  if(_minutes>0){
                    _seconds = 60
                    _minutes-=1
                  }else{
                    if(_hours>0){
                      _minutes=59
                      _hours-=1
                    }else{
                      _minutes=0
                      _seconds=0
                      clearInterval(that.setInt)
                    }
                  }
                }
                that.changTime(_hours, _minutes, _seconds)//读取时间
              }, 1000)
            }
          }else{
            that.$vux.toast.text(res.data.msg);
          }
        })
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
      },
      goShopp(){
        this.JsBridge.callHandler("rechargeCount", {}, function (responseData) {//跳转到充值
        });
      },
    },
    created(){
      this.getMsg()
    },
    beforeDestroy(){
      let that = this
      clearInterval(that.setInt)
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/reset";
  .chirstmass{
    width: 100%;
    &-head{
      height: 55*$r;
      background-color: #42007e;
      padding-top: 11*$r;
      &-con{
        height: 33*$r;
        background: url("../../assets/img/regsk.png") no-repeat;
        background-size: contain;
        background-position: center center;
        &-time{
          color: #ffffff;
          font-weight: bold;
          width: 565*$r;
          height: 33*$r;
          line-height: 33*$r;
          margin: 0 auto;
          .span{
            margin-left: 55.5%;
          }
          .span1{
            margin-left: 1.5%;
          }
          .span2{
            margin-left: 0;
          }
          .ss{
            margin: 0 2.5%;
            font-size: 14px;
          }
        }
      }
    }
    .recharge{
      width: $c;
      height: $c;
      background-color: #57059e;
      &-head{
        width: initial;
        height: 498*$r;
        background: url("../../assets/img/rechHead.png") no-repeat;
        background-size: $c $c;
      }
      &-ranking{
        height: 348*$r;
        background: url("../../assets/img/re123.png");
        background-size: $c $c;
        margin: 23*$r 20*$r 0 20*$r;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        &-context{
          position: absolute;
          top: 48px;
          left: 0;
          width: 100%;
        }
        &-item{
          position: relative;
          width: 33.3333333%;
          margin-top: 82*$r;
          &-img{
            width: 106*$r;
            height: 106*$r;
            display: block;
            border: solid 2px #217cef;
            border-radius: 50%;
            background-repeat: no-repeat;
            background-size: cover;
            margin: 0 auto;
          }
          &-name{
            margin: 0 auto;
            @include t-overflow(1);
            background-color: #217cef;
            color: #ffffff;
            font-size: 22*$r;
            width: 185*$r;
            padding: 0 10*$r;
            border-radius: 10px;
            text-align: center;
            margin-bottom: 10*$r;
          }
          &-rmb{
            text-align: center;
            color: #ff0c98;
            font-size: 22*$r;
          }
        }
        &-one{
          margin-top: 0;
        }
        &-two{
          margin-left: 34*$r;
        }
        &-three{
          margin-right: 46*$r;
        }
        &-center{
          margin-left: 20*$r;
          margin-right: 20*$r;
          padding: 5*$r 35*$r 0 26*$r;
          background-color: #42007e;
          border-radius: 5px;
          li{
            padding-top: 22*$r;
            padding-bottom: 17*$r;
            border-bottom: solid 1px #57059e;
            .headImg{
              display: inline-block;
              width: 74*$r;
              height: 74*$r;
              border-radius: 50%;
            }
            .context{
              display: inline-block;
              height: 74*$r;
              margin-left: 16*$r;
              position: relative;
              width: 266*$r;
              img{
                position: absolute;
                width: 112*$r;
                height: 35*$r;
                right: -130*$r;
                top:6px;
              }
              .yuan{
                color: #ba75fb;
                font-size: 24*$r;
                margin-block-start: 0;
                margin-block-end: 0;
              }
              .name{
                margin-block-start: 0;
                margin-block-end: 0;
                @include t-overflow(1);
                color: #e3c6ff;
                font-size: 30*$r;
              }
            }
            .num{
              float: right;
              margin-top: 9*$r;
              margin-right: 15*$r;
              width: 56*$r;
              height: 56*$r;
              border: solid 2px #ff0c98;
              color: #ff0c98;
              line-height: 56*$r;
              text-align: center;
              border-radius: 50%;
            }
          }
        }
      }
      &-rule{
        margin-left: 20*$r;
        margin-right: 20*$r;
        padding: 16*$r 30*$r 12*$r 26*$r;
        background-color: #42007e;
        border-radius: 5px;
        margin-top: 10*$r;
        margin-bottom: 154*$r;
        .title{
          display: block;
          margin: 0 auto;
          width: 470*$r;
          height: 117*$r;
        }
        .rule{
          margin-top: 22*$r;
          &-item{
            color: #ffffff;
            margin-bottom: 18*$r;
            span{
              font-size: 24*$r;
            }
            &-num{
              display: inline-block;
              color: #64167a;
              width: 26*$r;
              height: 26*$r;
              border-radius: 50%;
              background-color: #fffa00;
              font-size: 20*$r;
              line-height: 26*$r;
              text-align: center;
              margin-right: 8*$r;
            }
          }
        }
        p{
          color: #b1a3c5;
          padding-left: 38*$r;
          margin-bottom: 18*$r;
        }
      }
      &-button{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        /*box-shadow: 0 3px 25px 20px;*/
        .shadom{
          height: 20*$r;
          background-image: url("../../assets/img/shadomR.png");
          background-repeat: repeat-x;
          background-size: contain;
          /*background-color: #5b0d9e;*/
        }
        .button{
          background-color: #5b0d9e;
          height: 128*$r;
          padding-top: 24*$r;
          img{
            display: block;
            width: 328*$r;
            height: 80*$r;
            margin: 0 auto;
          }
        }
      }
    }
  }
</style>
