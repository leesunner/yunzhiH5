<template>
  <div class="autumn">
    <div>
      <img class="autumnBj" src="../../assets/img/autumnbj1.png" alt="">
      <img class="btn" src="../../assets/img/autbtna.png" alt="" v-if="flag== 1" v-on:click="getdata()">
      <img class="btn" src="../../assets/img/autbtn.png" alt="" v-if="flag== 2" v-on:click="getdata()">
      <img class="btn" src="../../assets/img/autbtnb.png" alt="" v-if="flag== 3" v-on:click="getdata()">
      <div class="banner" v-if="islb">
        <swiper height="80px" auto direction="vertical" :show-dots="false" loop>
          <swiper-item v-for="(log,index) in list" :key="index">
            <p class="log-p">
              {{log.nickname}}抢到
              <span>{{log.coin}}积分券</span>
            </p>
          </swiper-item>
        </swiper>
      </div>
      <div class="box"  ref="hb">
        <img class="pkhb" :src="pkhb[pkflag].img" alt="" @click="skip()">
        <div class="dw" @click="skindex"></div>
      </div>
    </div>
    <ul class="side">
      <li>1. 活动期间每天充值可领取一次 ,积分券在本页面领取</li>
      <li>　每人每天领取一次哦~</li>
      <li>2. 积分券金额为1元-50元之间, 随机发放</li>
      <li>     　点击领取积分券后, 即刻派发</li>
      <li>3. 积分券自生效起, 有效期3天</li>
      <li>4. 若发现用户通过作弊行为参与本活动, 将取消所得积分券</li>
    </ul>
  </div>
</template>
<script>
import { Swiper, SwiperItem } from 'vux';
export default {
  name: 'autumn',
  components: { Swiper, SwiperItem },
  data() {
    return {
      islb:"",//判断轮播
      flag: '',
      pkflag: '1',
      list: [
      ],
      pkhb: [
        {
          img: require('../../../static/image/autumnpk1.png')
        },
        {
          img: require('../../../static/image/autumnpk2.png')
        },
        {
          img: require('../../../static/image/autumnpk3.png')
        },
        {
          img: require('../../../static/image/autumnpk4.png')
        },
        {
          img: require('../../../static/image/autumnpk5.png')
        }
      ]
    };
  },
  created() {
    document.title = '中秋抢券';
    this.getjl();
    this.getDaycount();
    this. Whether()
          },
  methods: {
    getdata() {
      var that=this;
      // alert(this.flag);
      // this.$refs.hb.style.display='block';
      this.$axios.post("/active/zhongQiuRobberyCoupon?version=v2").then(function (res) {
        console.log(res.data)
        if(res.data.code == 200){
             if(res.data.data==1){
               that.pkflag=0;
             }else if(res.data.data == 5){
                that.pkflag=1;
             }else if(res.data.data  == 10){
               that.pkflag=2;
             }else if(res.data.data  == 20){
                 that.pkflag=3;
             }else if(res.data.data  == 50){
                 that.pkflag=4;
             }
         that.$refs.hb.style.display='block';
         that.flag="3";
        }else{
          if(res.data.code == 1){
            const g="活动未开始"
           that.$vux.toast.text(g);
          }else{
            that.$vux.toast.text(res.data.msg);
          }

        }
      })

    },
    skip() {
       this.$refs.hb.style.display='none';
    },
    skindex() {
      this.$vux.loading.show({text: '请稍候'});
      // this.JsBridge.callHandler("toHome", function (responseData) {});
      this.navigateTo('type')
    },
    getDaycount(){//中奖名单
      var that=this;
      this.$axios.get("/active/receiveZhongQiuRobberyCoupon?version=v2").then(function (res) {
        // console.log(res.data.data.list);
        that.list=res.data.data.list;
      })
    },
    Whether(){//是否领取验证
      var that=this;
      this.$axios.get("/active/isReceiveZhongQiuRobberyCoupon?version=v2").then(function (res) {
          console.log(res.data);
          if(res.data.code == 200){
             that.islb=true;
              if(res.data.data == 1){
                that.flag="3";
              }else if(res.data.data == 2){
                that.flag="2"
              }
          }

            const newdata=new Date();
            const olddata=new Date(2018,8,22);
            if(olddata>newdata){
                that.flag="1";
                that.islb=false;
            }


      })
    }
    ,
     getjl:function () {
                this.$axios.post("/active/zhongQiuLog?version=v2",{type:2}).then(function (res) {
                  // console.log(res);
                })
            }

  },

};
</script>
<style lang="scss" scoped>
@import '../../assets/css/reset';
.autumn {
  width: 100%;
  height: getREM(1443);
  position: relative;
  .autumnBj {
    width: 100%;
    height: getREM(1443);
    vertical-align: middle;
  }
  .btn {
    position: absolute;
    top: 11%;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: getREM(236);
    height: getREM(99);
  }
  .banner {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0%;
    top: 30%;
    width: getREM(420);
    height: getREM(46);
    line-height: getREM(46);
    text-align: center;
    background-color: #a42429;
    margin: auto;
    -webkit-border-radius: getREM(22);
    -moz-border-radius: getREM(22);
    -ms-border-radius: getREM(22);
    -o-border-radius: getREM(22);
    border-radius: getREM(22);
    overflow: hidden;
    color: #fff;
    .log-p {
      span {
        color: #ffe71b;
      }
    }
  }
  .box {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    height: getREM(1443);
    z-index: 55;
    background:rgba($color: #130505, $alpha: 0.3);
    display: none;
      .pkhb {
      position: absolute;
      width: getREM(750);
      height: getREM(1005);
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      margin: auto;
      z-index: 999;
    }
    .dw {
      width: getREM(246);
      height: getREM(65);
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 39%;
      margin: auto;
      z-index: 1000;
    }
  }
  .side{
    position: absolute;left:0;right: 0;bottom: getREM(43);font-size: getREM(24);color:#fff;margin-left:getREM(48);;margin-right:getREM(30);
    li{
      line-height: getREM(48);
    }
  }
}
</style>


