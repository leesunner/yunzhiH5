<template>
  <div class="sign">
    <!-- <img src="../assets/img/sevenbg.png" alt="" class="img"> -->
    <div class="content">
      <ul class="contentDay">
        <li v-for="(item,index) in day" :key="index" :class="{gl:item.flag== 1}">
          {{item.day}}
          <img src="../../assets/img/sevenlog.png" alt="" v-show="item.day=='周日'">
        </li>

      </ul>
      <div class="side">

        <p>{{title}}</p>
      </div>
      <div class="msg" ref="one">
        <img src="../../assets/img/sevenm.png" alt="">
        <p>{{money}}</p>
        <!-- <p>今日签到成功,获得满10减1积分卷</p> -->
      </div>
      <img src="../../assets/img/sevenbtna.png" alt="" class="btn" v-if="isbtn==false" @click="getlq()">
      <img src="../../assets/img/sevenbtnb.png" alt="" class="btn" v-if="isbtn==true" @click="getlq()">
      <p class="gocz" @click="gocz()">充值</p>
    </div>

    <img src="../../assets/img/sevent.png" alt="" class="gztop" >
    <ul class="sevenBtoom">
      <h3>活动规则：</h3>
      <div class="sevenBtoom-right">
        <li>1、当月充值过且等级4级及以上可签到;</li>
        <!-- <li>2、每周连续签到5、6、7天有额外积分奖</li>
        <li>励哦;</li> -->
        <li>2、此活动解释权归乐购运营团队所有。</li>
        <li></li>
      </div>
    </ul>
  </div>

</template>
<script>
  export default {
    data () {
      return {
        type:"0",
        isbtn:false,
        day:[
          {day:'周一',flag:""},
          {day:'周二',flag:""},
          {day:'周三',flag:""},
          {day:'周四',flag:""},
          {day:'周五',flag:""},
          {day:'周六',flag:""},
          {day:'周日',flag:""},
        ],
        title:"",//说明
        money:"",
      }
    },
    created() {
      document.title="七天登陆免费领" ;
    },
    mounted() {
      this.getcode();

    },
    methods: {
      getcode(){//获取签到信息
        const that=this;
        this.$axios.get('/active/activeWeekSigninRecord?version=v2').then(function (res) {

          if(res.data.code == 200){
            that.title=res.data.data.prizeStr;
            // flag:""//判断签到还是没签到
            const arr=res.data.data.signinList;
            if(arr){
              for (let index = 0; index < arr.length; index++) {
                that.day[index].flag = arr[index];//循环取到每天是否签到判断签到状态放入数组中
              }
            }
            if(res.data.data.isSignin == 1){
              that.isbtn=true;
            }
          }else{
            that.$vux.toast.text(res.data.msg)
          }
        })
      },
      getlq(){//签到
        const that =this;
        this.$axios.get('/active/activeDailySignin?version=v2').then(function (res) {
          console.log(res.data)
          if(res.data.code == 200){
            that.isbtn=true;
            that.money=res.data.msg;
            that.getcode();
            that.$refs.one.style.display="block";
            setTimeout(() => {
              that.$refs.one.style.display="none";
            }, 2000);

          }else{
            that.$vux.toast.text(res.data.msg)
          }
        })

      },
      gocz(){//跳转商品
        const id=73;
        // this.JsBridge.callHandler("toProductView",id, function (responseData) {});//跳转到游戏礼包详情
        this.navigateTo('rechargList')//充值 列表
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/css/reset";
  .sign{
    width: 100%; height:100%;
    position: relative;
    background:url("../../assets/img/sevenbg.png") no-repeat;background-size: 100% 100%;
    // .img{
    //   width: 100%;height: getREM(1337);

    //   vertical-align: middle;
    // }
    .content{
      width: getREM(566);
      height: getREM(268);
      background-color: #fff;
      color: #b1b1b1;
      position: absolute;
      left: 0;
      right: getREM(7);
      top:43%;
      margin: auto;
      border-radius: getREM(20);
      .contentDay{
        position: relative;
        padding-left: getREM(50);
        // overflow: hidden;
        height: getREM(70);
        margin: auto;
        margin-top:getREM(22);
        img{
          width: getREM(28);
          height: getREM(28);
          position: absolute;
          right: getREM(-9);
          top:getREM(-13);
        }
        .hg{
          right: getREM(30);
        }
        li{
          position: relative;
          float: left;
          width: getREM(53) !important;
          height: getREM(53);
          border-radius:50%;
          text-align: center;
          line-height: getREM(49);
          border:getREM(2) solid #b1b1b1;
          font-size: getREM(17) !important;
          margin-right: getREM(10);


        }
        .gl{
          width: getREM(62) !important;
          height: getREM(62);
          line-height: getREM(54);
          border:getREM(4) solid #ffad30;
          color: #ffad30;
          margin-top:getREM(-4)
        }


      }
      .side{
        width:90%;
        margin: auto;
        height: getREM(130);
        margin-top:getREM(20);
        padding-top:getREM(40);
        border: getREM(3) dashed #b1b1b1;
        border-radius: getREM(10);
        font-size: getREM(25);
        p{
          line-height:  getREM(30);
          width: 80%;
          margin:auto;

        }
      }
      .msg{
        display: none;
        position: absolute;
        left:0;
        right: 0;
        bottom: 0;
        top: 0;
        margin: auto;
        width: getREM(382);
        height: getREM(175);
        background: rgba($color: #131111, $alpha: 0.6);
        border-radius: getREM(15);
        img{
          width: getREM(47);
          height: getREM(52);
          margin: getREM(20) auto;
          display: block;
        }
        p{
          text-align: center;
          color: #fff;
          font-size:  getREM(26)
        }
      }
      .gocz{
        position: absolute;
        bottom: getREM(-50);
        right: getREM(30);
        width: getREM(61);
        font-weight: 600;
        font-size: getREM(26);
        text-align: center;
        color:#fee101;
        border-bottom: getREM(2) solid #fee101;
      }
    }
    .btn{
      width: getREM(240);
      height: getREM(60);
      position: absolute;
      left: 0;
      right: getREM(7);
      bottom: getREM(-70);
      margin: auto;

    }
    .gztop{
      width: getREM(388);
      height: getREM(74);
      position: absolute;
      left: 0;
      right: getREM(80);
      top:76.5%;
      margin: auto;
    }
    .sevenBtoom{
      color:#287553;
      position: absolute;
      bottom: getREM(65);
      left: getREM(70);
      h3{
        font-weight: 550;
        float: left;
        font-size: getREM(24)

      }
      .sevenBtoom-right{
        float: left;
        font-size: getREM(22);
        li{
          line-height: getREM(37);
        }
      }
    }
  }
</style>

