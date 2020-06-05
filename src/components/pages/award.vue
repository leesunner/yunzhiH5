<template>
  <div class="award" id="award">
    <div class="top">
      <div class="banner" id="banner" v-if="lblist.length>0">
        <swiper height="80px" auto direction="vertical" :show-dots="false" loop>
          <swiper-item v-for="(item,index) in lblist" :key="index">
            <p class="log-p"><img src="../../assets/img/laba.png" alt=""> <span>{{item.nickname}}</span> 领取<span style="color:yellow">{{item.coin}}元</span>积分券</p>
          </swiper-item>
          <swiper-item v-for="(item,index) in lblist " :key="index+'1'">
            <p class="log-p"><img src="../../assets/img/laba.png" alt=""> <span>{{item.nickname}}</span> 领取<span style="color:yellow">{{item.coin}}元</span>积分券</p>
          </swiper-item>
        </swiper>
      </div>
      <div class="awardLj" @click="isxx && xx()" id="ardlj">
        <h3 :class="{ardljH3: um == false  }">立即充值</h3>
        <p class="ljmoney" v-if="um">已累计充值: {{cont}}元</p>
      </div>
      <div class="awardrt" id="receive"  :class="{'bor':clss == true}" @click="flag && check()" >
        立即领取
      </div>
      <ul class="topContent">
        <li>活动期间, 只要累计充值达到一定额度, 即可领取一次返利积分券</li>
        <!-- <li>每个用户限领一次。</li> -->
      </ul>
    </div>
    <!-- <ul class="content">
      <li class="contentli" v-for="(item,index) in list" :key="index">
        <div class="kaTop">
          <img class="contentL" src="../assets/img/ljczbtn.png" alt="">
          <div class="contentR">
            100%概率 可得
            <span>{{item.dete}}元</span>
          </div>
        </div>
        <div class="kaBottom">
          <div class="kaBottom-left">
            <span>{{item.price}}</span>元
          </div>
          <div class="kaBottom-right" ref="aaa" @click="flag && check(item.price)":id="item.dete">
            立即领取
          </div>
        </div>
      </li>
    </ul> -->
    <img class="content" src="../../assets/img/awartContent.png" alt="">
    <ul class="gcBottom">
      <p style="color:#fded55;font-weight:700;">活动说明</p>
      <p>1、次活动时间内, 只要累计充值金额到达活动要求, 即可参与活动；</p>
      <p>2、累积充值统计3月18日到22号之间充值总和，达到相应金额即可领取累积充值返利，该活动页面仅可领取一次，请在22日24点之前领取对应奖励。</p>
      <p>&nbsp;&nbsp;举例说明：当你在22号时累积充值达到1600，可领取1588档位对应的返利，不能领取其他档位的奖励。</p>
      <!-- <p>1 本次活动时间内, 只要累计充值金额到达活动要求, 即可参与活动；</p>
      <p>2 累积充值统计10月1号到7号之间充值总和，达到相应金额即可领取累积充值返利，该活动页面仅可领取一次，请在7日24点之前领取对应奖励。</p>
      <p>&nbsp;&nbsp;举例说明：当你在7号时累积充值达到1600，可领取1588档位对应的返利，不会领取其他档位的奖励。</p> -->
      <!-- <p>3 本活动最终解释权归乐购运营团队所有。</p> -->
    </ul>
    <div id="mask" ref="mask">

      <div class="maskimg" >
        <ul>
          <li>{{sum}}</li>
          <li>元</li>
        </ul>
        <div @click="ale()">
          <span></span>
        </div>
        <img class="cha" src="../../assets/img/cha.png" alt="" @click="cols">
      </div>


    </div>
  </div>
</template>
<script>
  import { Swiper, SwiperItem } from "vux";
  export default {
    name: "award",
    components: { Swiper, SwiperItem },
    data() {
      return {
        list: [
          {
            price: 388,
            dete: 18,
            id: 61
          },
          {
            price: 888,
            dete: 38,
            id: 53
          },
          {
            price: 1588,
            dete: 68,
            id: 63
          },
          {
            price: 3888,
            dete: 188,
            id: 62
          },
          {
            price: 5888,
            dete: 288,
            id: 64
          }
        ],
        lblist: "",
        isbtn: "",
        num: "",
        flag:true,
        isxx:true,
        sum:"",
        clss:"false",
        lq:"",
        ljtotal:"",
        cont:"",
        um:true //判断累计充值状态
      };

    },
    created() {

      this.getCode();
      document.title = "充值加奖60%";
      this.getjl();
      //  this.check(35);测试ID
      this.getReceive();
    },
    mounted(){
      this.isljbtn();
      this.$refs.mask.style.height =
        document.getElementById('award').clientHeight + 'px';
    },
    methods: {
      cols(){//关闭函数
        document.getElementById("mask").style.display="none";
      },
      ale(){
        // this.$vux.loading.show({text: '请稍候'});
        // this.JsBridge.callHandler("toHome", function (responseData) {});
        this.navigateTo('type')
      },
      getCode() {
        //banner 参数
        var that = this;
        this.$axios
          .get("active/winningRechargeCoupon", {
            params: {
              version: "v2"
            }
          })
          .then(res => {
            that.lblist = res.data.data.list;
            // console.log(res);
          });
      },
      getjump(index) {
        console.log(index);
      },
      xx(){
        const id="58";
        // that.JsBridge.callHandler("toProductView",id, function (responseData) {});//跳转到游戏礼包详情
        // this.navigateTo('rechargeGoodDetail',{id:id})//H5跳转的方式
        this.navigateTo('rechargList')//H5跳转的方式
      },
      check() {
        //获取商品信息 //调用跳转支付
        var that = this;
        // this.$axios
        //   .post("/recharge/view?version=v2", { id: id })
        //   .then(function(response) {
        //     console.log(response);
        //     if (response.data.code == 1) {
        //       that.$vux.loading.show({ text: "请稍候" });
        //       console.log(response.data.data);
        //       that.JsBridge.callHandler("toRechargePay", response.data.data, function(
        //         responseData
        //       ) {
        //         if (responseData == "success") {
        //           that.$vux.loading.hide();
        //         }
        //       });
        //     }
        //   });
        this.$axios.post("/active/zhongQiuRechargeCoupon?version=v2").then(
          function(res){
            console.log(res.data);

            if(res.data.code == 200){
              that.sum=res.data.data;
              document.getElementById("mask").style.display="block";
              //  that.$vux.toast.text(res.data.msg);
              //       for(let i =0 ;i<5;i++){
              //  that.$refs.aaa[i].style.background ="url('../../static/image/awardhui.png')";
              //     that.$refs.aaa[i].style.backgroundSize="100% 100%";
              //  }
              that.clss=true;
              // document.getElementById(that.num).style.backgroundSize="100% 100%";
              document.getElementById("receive").innerHTML="已领取";
              //  that.flag=false;
              if(that.lq == 1){
                const title="已领取";
                that.$vux.toast.text(title);
              }

            }else{
              if(res.data.code == 1){
                //  document.getElementById("receive").innerHTML="即将开始";
                // this.isxx=false;
                // that.um=false;
                // console.log(that.um);
                that.$vux.toast.text(res.data.msg);
              }else{
                console.log(res.data.msg);
                that.$vux.toast.text(res.data.msg);
              }




            }
          }
        )
      },
      getjl: function() {
        this.$axios
          .post("/active/zhongQiuLog?version=v2", { type: 5 })
          .then(function(res) {
            // console.log(res);
          });
      },
      isljbtn(){//判断活动是否开始

        const newdata=new Date();
        const olddata=new Date(2018,9,1);
        if(olddata>newdata){
          document.getElementById("banner").style.display="none";
          document.getElementById("receive").innerHTML="即将开始";
          // this.isxx=false;
          this.um=false;
          // console.log(this.um)
        }
      }
      ,
      getReceive: function() {
        //获取是否领取奖券
        var that = this;
        this.$axios
          .get("/active/isReceiveRechargeCoupon", {
            params: {
              version: "v2"
            }
          })
          .then(function(res) {
            console.log(res.data);
            if (res.data.code == 200) {
              that.cont=res.data.data.recharge_total;
              if(res.data.data.isReceive ==1){
                // that.num = res.data.data.coin;


                that.clss=true;

                // document.getElementById(that.num).style.backgroundSize="100% 100%";
                document.getElementById("receive").innerHTML="已领取";
                // that.flag=false;
                that.lq=1;
              }

            } else {
              that.$vux.toast.text(res.data.msg);



              //  that.flag=false;
            }
          });
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import "../../assets/css/reset";
  .award {
    width: 100%;position: relative;
    background-color: #ff5452;
    .top {
      width: 100%;
      height: getREM(814);
      background: url("../../assets/img/topBan1.png") no-repeat;
      background-size: 100% 100%;
      position: relative;
      .banner {
        width: getREM(506);
        height: getREM(51);
        border-radius: getREM(25);
        background: rgba($color: #cd534c, $alpha: 1);
        position: absolute;
        left: 0;
        top: getREM(94);
        right: 0;
        margin: auto;
        overflow: hidden;
        .log-p {
          text-align: center;
          line-height: getREM(48);
          img {
            width: getREM(35);
            height: getREM(35);
            display: inline;
            vertical-align: middle;
          }
        }
      }
      .awardLj {
        width: getREM(322);
        height: getREM(107);
        color: #fff;
        text-align: center;
        background: url("../../assets/img/awarwR.png") no-repeat;
        background-size: getREM(322) getREM(107);
        position: absolute;
        bottom: getREM(61);
        right: getREM(53);
        margin: auto;
        .ardljH3{
          margin-top:getREM(26) !important;
        }
        h3{
          font-size: getREM(26);
          font-weight: 600;

          margin-top:getREM(20);
          width: 100%;
          height: getREM(30);

        }
        .ljmoney{
          font-size: getREM(13);
          margin-bottom: getREM(7);
          color:#ffd2bf;
        }
      }
      .awardrt{
        width: getREM(322);
        height: getREM(107);
        line-height: getREM(98);
        font-weight: 600;
        font-size: getREM(26);
        color: #fff;
        text-align: center;
        background: url("../../assets/img/awarwtop.png") no-repeat;
        background-size: getREM(322) getREM(107);
        position: absolute;
        bottom: getREM(61);
        left: getREM(53);
        margin: auto;

      }
      .bor{
        background: url("../../../static/image/awardhuia.png") no-repeat !important;
        background-size: getREM(322) getREM(107) !important;
      }
      .topContent {
        position: absolute;
        bottom: getREM(6);
        left: getREM(39);
        color: #fff;
        font-size: getREM(22);
        li {
          height: getREM(30);
          line-height: getREM(30);
        }
      }
      //  .bor{
      //      background: url("../../static/image/awardhui.png") no-repeat !important;
      //       background-size: 100% 100% !important;
      //   }
    }
    .content {
      width: getREM(700);
      height: getREM(603);
      margin: auto;
      background-color: #ff5452;
      display: block;
      margin-top:getREM(35)

      // .contentli {
      //   background: url("../assets/img/topbj.png") no-repeat;
      //   background-size: 100% 100%;
      //   height: getREM(227);
      //   position: relative;
      //   overflow: hidden;
      //   margin-top: getREM(29);
      //   .kaTop {
      //     width: 100%;
      //     overflow: hidden;
      //     .contentL {
      //       float: left;
      //       height: getREM(68);
      //       margin-top: getREM(28);
      //       line-height: getREM(68);
      //       width: getREM(158);
      //       color: #fff;
      //       font-weight: 800;
      //       padding-right: getREM(45);
      //       position: absolute;
      //     }
      //     .contentR {
      //       float: right;
      //       height: getREM(68);
      //       margin-top: getREM(28);
      //       padding-right: getREM(28);
      //       line-height: getREM(68);
      //       color: #ec5c2b;
      //       font-size: getREM(26);
      //       font-weight: 600;
      //       span {
      //         color: red !important;
      //       }
      //     }
      //   }
      //   .kaBottom {
      //     width: 100%;overflow: hidden;
      //     margin-top: getREM(20);
      //     div:nth-child(1) {
      //       float: left;
      //       padding: getREM(8) 0 0 getREM(29);
      //       font-size: getREM(38);
      //       color: #fa6446;
      //       span {
      //         font-size: getREM(50) !important;
      //       }
      //     }
      //     //
      //    div:nth-child(2)  {
      //       float: right;
      //       width: getREM(221);
      //       height: getREM(65);
      //       margin-top: getREM(8);
      //       color: #fff;
      //       font-weight: 800;
      //       background: url("../assets/img/topbtna.png") no-repeat;
      //       background-size: 100% 100%;
      //       text-align: center;
      //       line-height: getREM(65);
      //       margin-right: getREM(37);
      //     }
      //     .bor{
      //        background: url("../../static/image/awardhui.png") no-repeat !important;
      //         background-size: 100% 100% !important;
      //     }
      //   }
      // }
    }
    .gcBottom {
      font-size: getREM(24);
      color: #fff;
      padding: getREM(29) getREM(40) getREM(48) getREM(48);
      p:nth-child(1){
        font-size: getREM(26);
      }
      p {

        line-height: getREM(48);
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
        background: url('../../assets/img/awhongb.png') no-repeat;
        background-size: 100% 100%;
        width: getREM(696);
        height: getREM(542);
        z-index: 9999;
        position: fixed;
        right: 0px;
        top: 0;
        left: 0;
        bottom: 0;
        margin: auto;
        ul {
          color: #f0db40;
          width: 30%;
          margin: auto;
          overflow: hidden;
          padding-top: 15%;
          li {
            float: left;color: red;
          }
          li:nth-child(1) {
            font-size: getREM(75);
            height: getREM(80);
            line-height: getREM(80);
            margin-left: getREM(18);
          }
          li:nth-child(2) {
            font-size: getREM(58);
            height: getREM(80);
            line-height: getREM(90);
          }
        }
        div {
          width:getREM(320);
          height: getREM(60);
          text-align: center;
          right: 0px;

          left: 0;
          bottom: getREM(90);
          margin: auto;
          position: absolute;

        }
        .cha{
          width:getREM(60);
          height: getREM(60);


          top:getREM(0);
          right: getREM(35);


          // bottom: getREM(90);
          margin: auto;
          position: absolute;

        }
      }
    }
  }
</style>
