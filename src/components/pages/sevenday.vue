<template>
  <div class="sevenday" id="sevenday">
    <div class="top">
      距离活动开始:
      <span id="day">0</span>天
      <span id="shi">0</span>时
      <span id="fen">0</span>分
      <span id="miao" ref="one">0</span>秒
    </div>
    <div class="content">
      <div class="log">
        <img src="../../../static/image/sevenlog.png" alt="">
      </div>
      <div class="day">
        <div class="dayContent">
          <img src="../../../static/image/di.png" alt="">
          <div class="middle">
            <img src="../../../static/image/zqyuan.png" alt="">
            <span>{{num}}</span>
          </div>
          <img src="../../../static/image/tian.png" alt="">
        </div>
      </div>
      <div class="btn" ref="one" @click="flag && getDate()">
        {{lin}}
      </div>
      <div class="xzs">
        <div class="xzsTop">
          乐购小知识
        </div>
        <p ref="xzs">
          {{jtzs}}
        </p>
      </div>
      <div class="banner" id="banner">
        <swiper height="80px" auto direction="vertical" :show-dots="false" loop>
          <swiper-item v-for="(log,index) in lblist" :key="index">
            <p class="log-p">恭喜
              <span>{{log.nickname}}</span>抢到
              <span>{{log.coupon_name}}</span>
            </p>
          </swiper-item>
        </swiper>
      </div>
      <div class="gz">
        <div class="h3">
          <img src="../../../static/image/zqdian.png" alt="">规则详情<img src="../../../static/image/zqdian.png" alt="">
        </div>
        <div class="gzBottom">
          <ul class="left">
            <li>活动时间：</li>
            <li>活动规则：</li>
          </ul>
          <ul class="right">
            <div>活动时间：2018年10月1日- 10月7日</div>
            <li>10月1日零点前有过充值用户可参与</li>
            <li>每日登陆可领取2元直减券</li>
            <li>累积登录7天可领取10元直减券</li>
          </ul>
        </div>
      </div>
    </div>
    <div id="mask" ref="mask" @click="xx()">

      <div class="maskimg">
        <ul>
          <li>{{mony}}</li>
          <li>元</li>
        </ul>
        <div>好的
          <span>></span>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import { Swiper, SwiperItem } from 'vux';
  export default {
    name: 'sevenday',
    components: { Swiper, SwiperItem },
    data() {
      return {
        days: '',
        hour: '',
        min: '',
        sec: '',
        timer: '',
        lblist:"",
        list: [
          {
            nickname: '131****0010',
            coupon_name: '2积分直减劵'
          },
          {
            nickname: '135****0511',
            coupon_name: '2积分直减劵'
          },
          {
            nickname: '155****0220',
            coupon_name: '2积分直减劵'
          }
        ],
        num: '',
        numArr: ['一', '二', '三', '四', '五', '六', '七'],
        lin: '',
        flag: true,
        mony: '',
        jtzs: '',
        zs: [
          '首次参与商品≥2，未中奖会赠送2积分哦',
          '新用户充50送128，可用金额秒变3.76倍！！',
          '话费卡中奖后可兑换积分啦，100话费卡可兑换105积分呢',
          '晒单成功立即赠送2积分，一般人我不告诉TA~',
          '收徒成功可得3%返现，实时到账滴',
          '联系微信客服充值可以优惠5%，微信名yungou028',
          '等级LV3每天抽奖一次，等级越高福利越多喔～'
        ]
      };
    },
    created() {
      document.title = '7天登陆免费领';
      this.getjl();
    },
    mounted() {
      //  this.djxDate(this.DJX());
      // this.getDate();
      // this.gethj();
      this.getcode();
      this.newDate();
      this.DJX();
      this.$refs.mask.style.height =
        document.getElementById('sevenday').clientHeight + 'px';
      this.getdicode();
    },
    methods: {
      // this.$refs.mask.style.height = doc.getElementById('app').clientHeight + 'px';
      // zcc:function() {
      //  this.xx();
      // },
      xx: function() {
        this.$refs.mask.style.display = 'none';
      },
      DJX: function() {
        setInterval(() => {
          this.newDate();
        }, 1000);
      },
      newDate: function() {
        const date = new Date();
        const wy = new Date(2018, 9, 1);
        const time = wy - date;
        this.days = parseInt(time / 1000 / 60 / 60 / 24); //天
        this.hour = parseInt((time / 1000 / 60 / 60) % 24); //时
        this.min = parseInt((time / 1000 / 60) % 60); //分
        this.sec = parseInt((time / 1000) % 60); //秒
        if (this.days < 0) {
          document.getElementById('day').innerHTML = 0;
          document.getElementById('fen').innerHTML = 0;
          document.getElementById('shi').innerHTML = 0;
          document.getElementById('miao').innerHTML = 0;
        }
      },
      getDate: function() {
        var that = this;
        this.$axios
        // .post('/active/everyDayCoupon?version=v2')
          .post('/active/zhongQiuEveryDayCoupon?version=v2')
          .then(function(response) {
            console.log(response);
            if (response.data.code == 200) {
              that.$vux.toast.text(response.data.msg);
              that.$refs.one.style.background =
                'url(./static/image/zqbtn2.png) no-repeat';
              that.$refs.one.style.backgroundSize = '100% 100%';
              that.flag = false;
              that.lin = '已领取';
              that.mony = response.data.data;
              that.$refs.mask.style.display = 'block';
            } else {
              if (response.data.code == 1) {
                // that.flag = false;
                that.$vux.toast.text(response.data.msg);
              }else{
                // console.log(response.data.code);
                that.$vux.toast.text(response.data.msg);
                // that.$refs.one.style.background ="url(./static/image/zqbtn2.png) no-repeat";
                that.$refs.one.style.backgroundSize = '100% 100%';
                that.flag = true;
              }

            }
          });
      },

      getcode: function() {
        var that = this;
        //  const newdata=new Date();
        //       const olddata=new Date(2018,9,1);
        //       if(olddata>newdata){
        //         document.getElementById("banner").style.display="none";
        //       };
        this.$axios
        // .post('active/isWinningEveryDayCoupon?version=v2')
          .get('active/isReceiveZhongQiuEveryDayCoupon?version=v2')
          .then(function(response) {
            console.log(response.data);
            if (response.data.data == 1) {
              that.lin = '已领取';
              that.$refs.one.style.background =
                'url(./static/image/zqbtn2.png) no-repeat';
              that.$refs.one.style.backgroundSize = '100% 100%';
              that.flag = false;
            } else {


              // console.log(new Date(response.data.time*1000));
              // console.log(new Date(2018,8,28))
              if(new Date() <= new Date(2018,9,1)){//小于活动时间就是即将开始
                that.lin="即将开始";
              }else{
                that.lin = '免费领';
              }
              that.$refs.one.style.background =
                'url(./static/image/zqbtn.png) no-repeat';
              that.$refs.one.style.backgroundSize = '100% 100%';
              that.flag = true;
              // that.$refs.mask.style.display="block";
            }
          });
      },
      // gethj: function() {
      //   var that = this;
      //   this.$axios
      //     .get('active/winningEveryDayCoupon?version=v2')
      //     .then(function(response) {
      //       console.log(response);
      //     });
      // },
      getjl:function () {
        this.$axios.post("/active/zhongQiuLog?version=v2",{type:1}).then(function (res) {
          console.log(res);
        })
      },
      getdicode() {
        //banner 参数
        var that = this;
        this.$axios
          .get("active/receiveZhongQiuEveryDayCoupon", {
            params: {
              version: "v2"
            }
          })
          .then(res => {
            that.lblist = res.data.data.list;
          });
      },
    },
    watch: {
      // sj:function(newVal,oldVal){
      //   console.log(newVal,oldVal)
      // },
      days: function(newVal, oldVal) {
        if (newVal >= 0) {
          (this.jtzs = this.zs[0]), (this.num = this.numArr[0]);
        } else if (newVal < 0) {
          if (newVal > -8) {
            this.num = this.numArr[-newVal];
            this.jtzs = this.zs[-newVal];
            console.log(this.zs[-newVal]);
          } else {
            (this.num = this.numArr[6]), (this.jtzs = this.zs[6]);
          }
        }
        return (this.jtzs = this.zs[-newVal] || this.zs[0]);
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../assets/css/reset';
  .sevenday {
    width: 100%;
    position: relative;
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
      span {
        background-color: #480817;
        color: #fff;
        margin: 0 8px 0 8px;
        padding: 0 5px;
        line-height: getREM(87);
      }
    }
    .content {
      width: 100%;
      height: getREM(1334);
      background: url(../../../static/image/sevenbj.png) no-repeat;
      background-size: 100% 100%;
      .log {
        width: 100%;
        padding-top: getREM(34);
        img {
          width: getREM(530);
          height: getRem(418);
          display: block;
          margin: 0 auto;
        }
      }
      .day {
        width: 100%;
        overflow: hidden;
        padding: getREM(17) 0 getREM(37) 0;
        .dayContent {
          width: getREM(325);
          margin: 0 auto;
          overflow: hidden;
          img {
            float: left;
            width: getREM(74);
          }
          .middle {
            float: left;
            padding: 0 getREM(48);
            position: relative;
            height: getREM(74);
            width: getREM(170);
            span {
              display: block;
              width: getREM(74);
              height: getREM(74);
              line-height: getREM(74);
              font-size: getREM(48);
              position: absolute;
              left: 0;
              top: 0;
              right: 0;
              bottom: 0;
              margin: auto;
              color: #fff8c1;
              text-align: center;
              font-size: getREM(32);
              font-weight: 1000;
            }
          }
        }
      }
      .btn {
        width: getREM(358);
        height: getREM(58);
        margin: auto;
        line-height: getREM(58);
        text-align: center;
        font-weight: 800;
      }
      .xzs {
        background: url(../../../static/image/xzsbj.png);
        background-size: 100% 100%;
        width: getREM(648);
        height: getREM(142);
        margin: auto;
        margin-top: getREM(45);
        padding: 0 getREM(64);
        .xzsTop {
          background: url(../../../static/image/xzsk.png);
          background-size: 100% 100%;
          width: getREM(202);
          height: getREM(39);
          margin: auto;
          text-align: center;
          line-height: getREM(39);
          color: #f02f5c;
          font-size: getREM(24);
        }
        p {
          font-size: getREM(24);
          font-weight: 600;
          text-indent: getREM(48);
          margin-top: getREM(8);
        }
      }
      .banner {
        width: getREM(660);
        height: getREM(70);
        line-height: getREM(70);
        text-align: center;
        background-color: #ffdac7;
        margin: auto;
        margin-top: getREM(18);
        -webkit-border-radius: getREM(16);
        -moz-border-radius: getREM(16);
        -ms-border-radius: getREM(16);
        -o-border-radius: getREM(16);
        border-radius: getREM(12);
        overflow: hidden;
        .log-p {
          span {
            color: #f02f5c;
          }
        }
        .banBox {
          width: getREM(660);
          height: getREM(70);
          line-height: getREM(70);
          text-align: center;
        }
      }
      .gz {
        width: getREM(660);
        background-color: #ffdac7;
        margin: auto;
        height: getREM(272);
        margin-top: getREM(24);
        -webkit-border-radius: getREM(16);
        -moz-border-radius: getREM(16);
        -ms-border-radius: getREM(16);
        -o-border-radius: getREM(16);
        border-radius: getREM(12);
        .h3 {
          padding-top: getREM(18);
          font-size: getREM(28);
          font-weight: 900;
          color: #f02f5c;
          margin: auto;
          width: getREM(157);
          img {
            vertical-align: middle;
          }
          img:nth-of-type(1) {
            margin-right: getREM(7);
          }
          img:nth-of-type(2) {
            margin-left: getREM(7);
          }
        }
        .gzBottom {
          width: getREM(621);
          margin: auto;
          color: #480817;
          font-weight: 600;
          font-size: getREM(24);
          overflow: hidden;
          .left {
            width: getREM(140);
            float: left;
            font-size: getREM(24);
          }
          .right {
            float: left;
            li {
              width: getREM(480);
              font-size: getREM(24);
            }
          }
        }
      }
    }
    #mask {
      width: 100%;
      display: none;
      background: rgba(95, 93, 93, 0.5);
      bottom: 0;
      left: 0;
      position: fixed;
      z-index: 50;

      .maskimg {
        background: url('../../../static/image/zqhb.png') no-repeat;
        background-size: 100% 100%;
        width: getREM(519);
        height: getREM(610);
        z-index: 9999;
        position: fixed;
        right: 0px;
        top: 0;
        left: 0;
        bottom: 0;
        margin: auto;
        ul {
          color: #f0db40;
          width: 40%;
          margin: auto;
          overflow: hidden;
          padding-top: 65%;
          li {
            float: left;
          }
          li:nth-child(1) {
            font-size: getREM(90);
            height: getREM(80);
            line-height: getREM(80);
            margin-left: getREM(25);
          }
          li:nth-child(2) {
            font-size: getREM(60);
            height: getREM(80);
            line-height: getREM(90);
            // background: rgba($color: #000000, $alpha: 1.0)
          }
        }
        div {
          width: 100%;
          text-align: center;
          position: absolute;
          bottom: getREM(90);
        }
      }
    }
  }
</style>

