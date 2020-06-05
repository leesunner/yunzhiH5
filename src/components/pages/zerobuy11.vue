<template>
  <div class="zero">
    <h2 v-title="'0元购'"></h2>
    <ul class="zero-top">
      <li @click="tomyLucky()">&nbsp;</li>
      <li v-if="hasbtn == 0" @click="getSattus()">&nbsp;</li>
      <li class="getlqzg" v-if="hasbtn==1" @click="getSattus()">&nbsp;</li>
    </ul>
    <p class="zerosm">领取活动资格，才能参与活动。</p>
    <div class="container">
        <ul class="content">
          <li v-for="(item,index) in list" :key="index">
            <div  @click="goshopp(idList[index])" class="contentTop">
              <h3>{{lbList[index]}}</h3>
              <!-- <img src="../assets/img/zerosj.png" alt=""> -->
              <p class="p1">
                <img src="../../assets/img/zerosj.png" alt="">送{{item[0].name}}</p>
              <p>抽奖机会
                <span style="color:#ff6666">{{item[0].num}}次</span>
              </p>
              <p class="p1">
                <img src="../../assets/img/zeroplus.png" alt="">送{{item[1].name}}</p>
              <p>抽奖机会
                <span style="color:#ff6666">{{item[1].num}}次</span>
              </p>
              <div class="boxbtn">立即购买</div>
           </div>
            <div class="contentbox content-left">
              <img class="bigimg" :src="item[0].img" alt="" @click="go(item[0].goods_id)">
              <!-- <img class="ld" src="../../static/img/christmasld.png" alt=""> -->
              <div class="barbg" :class="'two'+index"></div>
              <div class="barbox">
                <div class="bar" :id="'one'+index" :style="{width:item[0].join_ed/item[0].join_re *100+'%'}"></div>
              </div>

              <div class="contentbtn" @click="go(item[0].goods_id)">点击查看</div>
              <div class="content-num">
                <div class="content-num-left">
                      总需
                <span>{{item[0].join_re}}</span>
                </div>
                <div class="content-num-right">
                  剩余
                <span class="numspan">{{item[0].join_le}}</span>
                </div>

              </div>
            </div>
            <div class="contentbox content-left" >
              <img class="bigimg" :src="item[1].img" alt="" @click="go(item[1].goods_id)">
              <!--//新年角标-->
              <!--<img class="ld" src="../../assets/img/christmasld.png" alt="">-->
               <!-- <img class="bigimg" src="../assets/img/zerobuyQd.png" alt="" >敬请期待 -->
              <div class="barbg" :class="'two'+index"></div>
              <div class="barbox">
                <div class="bar" :id="'one'+index" :style="{width:item[1].join_ed/item[1].join_re *100+'%'}"></div>
              </div>

              <div class="contentbtn" @click="go(item[1].goods_id)">点击查看</div>
              <div class="content-num">
                <div class="content-num-left">
                    总需
                <span>{{item[1].join_re}}</span>
                </div>
                <div class="content-num-right">
                  剩余
                <span class="numspan">{{item[1].join_le}}</span>
                </div>

              </div>
            </div>

          </li>
        </ul>
    </div>
    <div class="container container-footer">
      <footer>
      <div>
        <h3>活动规则</h3>
        <p>领取活动资格，才能参加活动。</p>
        <p>购买茶叶和游戏礼包额外赠送指定商品抽奖机会，对购多送，无上限</p>
      </div>
    </footer>
    </div>
  </div>
</template>
        <!--// <div  @click="goshopp(idList[index])">-->
        <!--//   <h3>{{lbList[index]}}</h3>-->
        <!--//   &lt;!&ndash; <img src="../assets/img/zerosj.png" alt=""> &ndash;&gt;-->
        <!--//   <p class="p1">-->
        <!--//     <img src="../../assets/img/zerosj.png" alt="">送{{item.name}}</p>-->
        <!--//   <p>抽奖机会-->
        <!--//     <span>{{item.num}}次</span>-->
        <!--//   </p>-->
        <!--//   <div class="boxbtn">立即购买</div>-->
        <!--// </div>-->
<script>
import $ from 'jquery';
export default {
  data() {
    return {
      hasbtn: '', //领取资格判断
      list: '', //商品信息集合
      lbList: ['购买任意游戏礼包', '购买任意茶叶礼包'], //礼包类型
      // idList: ['73', '61']
      idList:["37","33"],
    };
  },
  created() {

  },
  mounted() {
    this.getcode();
  },
  methods: {
    go(id) {
      this.$router.push({
        name: 'productView',
        params: {
          id: id,
          guid: '2'
        }
      });
    },
    goshopp(id) {
      //跳商品充值详情
      // JsBridge.callHandler('toProductView', id, function(responseData) {});
       //跳转到充值
      this.navigateTo('rechargList')
     // this.JsBridge.callHandler("rechargeCount", {}, function (responseData) {});
      // JsBridge.callHandler("toHome", function (responseData) {});
    },
    tomyLucky: function() {
      //跳转到我的幸运记录
      // this.JsBridge.callHandler('tomyLucky', function(responseData) {});
      this.navigateTo('luckyRecord')
    },
    getcode() {
      //获取进入商品参数
      var that = this;
      this.$axios
        .get('/active/getZeroBuyGoodsList?version=v2')
        .then(function(res) {
          if (res.data.code == 200) {
            // console.log(res.data.data);
            that.hasbtn = res.data.data.has_quota;
            that.list = res.data.data.list;
            that.list = [[res.data.data.list[0],res.data.data.list[2]],[res.data.data.list[1],res.data.data.list[3]]]
            // console.log(that.list)
          } else if (res.data.code == -14) {
            // that.$vux.toast.text(res.data.msg);
            // that.JsBridge.callHandler('toLogin', null, function(res) {
            //   if (responseData == 'success') {
            //   }
            // });
            this.navigateTo('userLogin')
          } else {
            that.$vux.toast.text(res.data.msg);
          }
        });
    },
    getSattus() {
      //疯抢资格
      const that = this;
      this.$axios.post('/active/zeroBuyQuota?version=v2').then(function(res) {
        if (res.data.code == 200) {
          that.$vux.toast.text(res.data.msg);
          that.hasbtn = 1;
        } else {
          that.$vux.toast.text(res.data.msg);
        }
      });
    },
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/css/reset';
.zero {
  width: 100%;
  background-color: #037afc;
  background: url('../../assets/img/zerogbuybg.png') no-repeat;
  background-size: 100% getREM(2080);
  min-height:100% ;
  .container{
    width:100%;
    background-color:#037afc;
    }
  .container-footer{
    padding-bottom: 31*$r;
  }
  .zero-top {
    overflow: hidden;
    li {
      float: left;
      width: 50%;
      text-align: center;
      line-height: getREM(86);
      margin-top: getREM(408);
      margin-bottom: getREM(20);
    }
    li:nth-child(1) {
      background: url('../../assets/img/zerobuybtna.png') no-repeat center;
      background-size: getREM(274) 100%;
    }
    li:nth-child(2) {
      background: url('../../assets/img/zerobuybtnb.png') no-repeat center;
      background-size: getREM(274) 100%;
    }
    .getlqzg {
      background: url('../../assets/img/zerobuybtnh.png') !important;
      background-repeat: no-repeat !important;
      background-position: center !important;
      background-size: getREM(274) 100% !important;
    }
  }
  .zerosm {
    text-align: center;
    color: #f45c4e;
    font-size: getREM(21);
  }
  .content {
    width: getREM(700);
    margin: auto;
    overflow: hidden;
    margin-top: getREM(110);
    li {
      width: getREM(700);
      height: getREM(564);
      border-radius: getREM(23);
      background: #f5a0a0;
      margin-bottom: getREM(24);
      padding-top: getREM(12);
      .contentTop{
        position: relative;
        height: getREM(230);
        overflow: hidden;
        margin: 0 12*$r 10*$r 12*$r;
        background-color: #fff;
        border-radius: 14*$r;
        h3{
          font-size: 25*$r;
          font-weight: 600;
          text-align: center;
          line-height: 61*$r;
          padding-top:8*$r;
        }
        p{
          float: left;
          font-size: 21*$r;
          color: #666666;
          line-height: 38*$r;
        }
        .p1{
          padding-left: 31*$r;
          width: 70%;
          @include t-overflow(1);
          img{
            width: 16*$r;
            height: 16*$r;
            margin-right: 10*$r;
          }
        }
        .boxbtn{
          width: 220*$r;
          height: 48*$r;
          background-color: #f45c4e;
          color: #fff;
          font-size: 25*$r;
          position: absolute;
          left: 0;
          right: 0;

          bottom: 20*$r;
          margin: auto;
          text-align: center;
          line-height: 48*$r;
          border-radius: getREM(14);
        }
      }
      .contentbox {
        width: getREM(330);
        height: getREM(298);
        background-color: #fff;
        border-radius: getREM(15);
        position: relative;
        float: left;
        .bigimg {
          width: getREM(330);
          height: getREM(298);
        }
        .ld{
          position: absolute;
          width: 78*$r;
          left: -20*$r;
          top: -5*$r;
          z-index: 9999;
        }
        .contentbtn {
          position: absolute;
          bottom: getREM(19);
          left: getREM(80);
          width: getREM(160);
          height: getREM(48);
          color: #ff6666;
          background-color: #fff;
          font-size: getREM(23);
          border: getREM(3) solid #ff6666;
          border-radius: getREM(13);
          text-align: center;
          line-height: getREM(48);
        }
      }
      .content-left {
        margin: 0 getREM(0) 0 getREM(12);
        .barbg {
          position: absolute;
          overflow: hidden;
          bottom: getREM(110);
          left: getREM(65);
          width: getREM(192);
          background-color: #b7b7b7;
          height: getREM(7);
          border: getREM(1) solid #ebebeb;
          border-radius: getREM(5);
        }
        .bar {
          width: getREM(20);
          background-color: #fa773b;
          height: getREM(7);
          border-radius: getREM(5);
        }
        .barbox {
          width: getREM(192);
          position: absolute;
          overflow: hidden;
          bottom: getREM(110);
          left: getREM(65);
          height: getREM(7);

        }
        .content-num {
          position: absolute;
          bottom: getREM(81);
          width: getREM(192);
          text-align: center;
          font-size: getREM(14);
          color: #999999;
          left: getREM(65);
          .content-num-left{
            float: left;
          }
          .content-num-right{
            float: right;
          }
          .numspan {
            color: #fcac8f;
          }
          span:nth-child(1) {

          }
          span:nth-child(2) {
          }
        }
      }
      .content-right {
        h3 {
          font-size: getREM(29);
          color: #000;
          font-weight: 600;
          text-align: center;
          line-height: getREM(110);
        }

      }
    }
  }
  footer {
    position: relative;
    width: getREM(697);
    height: getREM(170);
    margin: auto;
    background-color: #fff;
    border-radius: getREM(14);
    color:#666;
    div {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: getREM(670);
      height: getREM(146);
      border: getREM(2) dashed #ff7060;
      border-radius: getREM(13);
      padding: getREM(8) 0 0 getREM(15);
      line-height: getREM(30);
      font-size: getREM(20);
      h3 {
        color: #ff7060;
        font-size: getREM(23);
      }
    }
  }
}
</style>
