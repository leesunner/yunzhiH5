<template>
  <div class="countdown-container">
    <div class="hr-left">
      <img src="../../assets/images/xian.png" alt>
    </div>
    <div class="hr-right">
      <img src="../../assets/images/xian.png" alt>
    </div>
    <div class="countdown-title">
      <div class="time">
        <p>距离活动结束：</p>
        <span>{{time.ddl}}</span>
        <span>天</span>
        <span>{{time.ddh}}</span>
        <span>时</span>
        <span>{{time.ddm}}</span>
        <span>分</span>
        <span>{{time.dds}}</span>
        <span>秒</span>
      </div>
    </div>

    <!-- 中心位置 -->
    <div class="picture-box">
      <div class="picture">
        <img src="../../assets/images/_p1.png">
        <h1>恭喜您获得</h1>
        <div class="back">
          <img src="../../assets/images/fenxiang.png" alt>
        </div>
        <!-- 立即领取 -->
        <div class="hongbao">
          <img src="../../assets/images/hongbao.png" alt>
        </div>
        <!-- 拆红包 -->
        <div class="collect-immediately">
          <div class="collect-immediately-left">
            <div class="top">
              <div class="top-active">活动参与消费</div>
              <span>{{use_amount}}元</span>
            </div>
            <div class="bottom">
              <div class="bottom-active">可领取/已领取</div>
              <span>{{can_number}}/{{already_number}}</span>
            </div>
          </div>
          <div class="collect-immediately-right">
            <div class="circular" @click="receiveHB">
              <span>立即</span>
              <span>领取</span>
            </div>
          </div>
        </div>
        <!-- 活动规则 -->
        <div class="activity-rules">
          <img src="../../assets/images/xuxian.png" alt>
          <div class="text">
            <div class="text-top">
              <span class="text-active">活动规则:&nbsp;</span>
              <span>双12活动期间,实物消费满588送88元,仅计算积分参与部分。</span>
            </div>
            <div class="text-bottom">
              <span>活动说明:&nbsp;</span>
              <p>1.活动期间登录用户均可免费参加;</p>
              <p>2.赠送积分领取后立即到账,请在当前活动页面领取;</p>
              <p>3.从活动页面下单消费才可以被统计</p>
              <p>4.领取次数暂不封顶,消费每满588即可领取.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 商品内 -->
    <div class="product-container">
      <div
        class="product-item"
        v-for="item in goodsList"
        :key="item.goods_id"
        @click="toProductDetail(item.goods_id)"
      >
        <img :src="item.pic" alt>
        <p>{{item.name}}</p>
        <div class="all-container">
          <div class="progress">
            <div class="show"></div>
            <!-- <img src="../assets/images/Button.png" alt> -->
            <div class="orange-progress" :style="'width:'+ (item.join_ed/item.join_re*100)+'%'"></div>
          </div>
          <div class="num">
            <span>总需:{{item.join_re}}</span>
            <span>剩余:{{item.join_le}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="footer" @click="get">—— 活动最终解释权归乐购运营团队所有 ——</div>
  </div>
</template>

<script>

import { Toast } from "mint-ui";
let time = new Date("2018/12/14 23:59:59");
let timestamp1 = Date.parse(new Date()); // 这个是你的时间的时间戳
// let time = new Date("2018/12-13 00:00:00");
export default {
  data() {
    return {
      time: {},
      goodsList: [],
      already_number: "", //已领取数
      can_number: "", //可领取数
      use_amount: "", //活动参与消费
      timeId: this.timeId
    };
  },
  created() {
    document.title = '满588送88元'
    this.getGoodsList();
  },
  mounted() {
    this.getTime();
  },
  methods: {
    getTime() {
      let timer = setTimeout(() => {
        var now = new Date();
        var endDate = time;
        var leftTime = endDate.getTime() - now.getTime();
        var dd = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
        var hh = parseInt((leftTime / 1000 / 60 / 60) % 24, 10); //计算剩余的小时数
        var mm = parseInt((leftTime / 1000 / 60) % 60, 10); //计算剩余的分钟数
        var ss = parseInt((leftTime / 1000) % 60, 10); //计算剩余的秒数
        let ddl = this.checkTime(dd);
        let ddh = this.checkTime(hh);
        let ddm = this.checkTime(mm);
        let dds = this.checkTime(ss); //小于10的话加0
        this.time = {
          ddl,
          ddh,
          ddm,
          dds
        };
        var timestamp = Date.parse(new Date());
        if (
          parseInt(ddl) <= 0 &&
          parseInt(ddh) <= 0 &&
          parseInt(ddm) <= 0 &&
          parseInt(dds) <= 0
        ) {
          console.log(11);
          // clearInterval(timer);
          ss = 0;
          timer = null;
          this.time = {
            ddl: "00",
            ddh: "00",
            ddm: "00",
            dds: "00"
          };
          return;
        }
        this.getTime();
      }, 1000);
    },
    receiveHB() {
      this.$axios
        .get("/active/receiveDoubleTwelveFullOffCoin?version=v2")
        .then(res => {
          // console.log(res);
          if (res.data.data.status == 1) {
            Toast(res.data.data.message);
            this.can_number = "0";
          } else if (res.data.data.status == 2 || res.data.data.status == 3) {
            Toast(res.data.data.message);
          }
        });
    },
    getGoodsList() {
      this.$axios
        .get("/active/getDoubleTwelveFullOffInfo?version=v2")
        .then(res => {
          // console.log(res);
          if (res.data.code == 200) {
            this.goodsList = res.data.data.list;
            this.can_number = res.data.data.can_number;
            this.already_number = res.data.data.already_number;
            this.use_amount = res.data.data.use_amount;
            // console.log(this.goodsList)
          }
        });
    },
    toProductDetail(id) {
      this.$router.push({ name: "productView", params: { id: id, guid: 2 } });
    },
    get() {
      console.log(this.timer);
    },
    checkTime(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/reset";
body{
  background-color: #FB6451;
  .countdown-container {
    //  background-color: #FB6451;
  width: 100%;
  background: url(../../assets/images/_p.png) no-repeat #FB6451;
  //  background-attachment: fixed;
  // height: 10000px;
  background-size: 100%;
  //头部样式
  .countdown-title {
    width: 100%;
    height: getREM(79);
    background-color: #fff;
    .time {
      margin: 0 auto;

      letter-spacing: getREM(2);
      width: 80%;
      font-size: getREM(28);
      color: #dc6963;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      span {
        white-space: nowrap;
      }
      p {
        white-space: nowrap;
      }
      span:nth-of-type(odd) {
        height: getREM(52);

        background-color: #fb6451;
        border-radius: 3px;
        color: #fff;
        letter-spacing: getREM(0);
        margin: 0 3px;
        padding: 2px;
        font-weight: bold;
      }
      span:nth-of-type(even) {
        width: getREM(40);
        text-align: center;
      }
    }
  }
  //恭喜您获得盒子样式
  .picture-box {
    .picture {
      position: relative;
      margin: 0 auto;
      margin-top: getREM(405);
      width: getREM(694);
      img {
        width: getREM(694);
      }
      h1 {
        color: #fb6451;
        position: absolute;
        top: getREM(65);
        left: 50%;
        font-size: getREM(35);
        font-weight: bold;
        transform: translateX(-50%);
        letter-spacing: getREM(3);
      }
      h1::before,
      h1::after {
        content: "";
        position: absolute;
        width: getREM(80);
        height: getREM(2);
        background-color: #fb6451;
      }
      h1::before {
        left: getREM(-105);
        top: getREM(28);
      }
      h1::after {
        left: getREM(215);
        top: getREM(28);
      }
      .back {
        position: absolute;
        left: getREM(580);
        top: getREM(74);
        img {
          width: getREM(35);
          width: getREM(35);
        }
      }
      .hongbao {
        position: absolute;
        left: 50%;
        top: getREM(135);
        transform: translateX(-50%);
        img {
          width: getREM(615);
        }
      }
      .collect-immediately {
        position: absolute;
        width: getREM(356);
        height: getREM(183);
        left: getREM(150 * 2);
        top: getREM(68 * 2);
        display: flex;
        .collect-immediately-left {
          display: flex;
          flex-wrap: wrap;
          width: getREM(188);
          height: getREM(186);
          letter-spacing: getREM(2);
          .top {
            text-align: center;
            width: 100%;
            padding: getREM(10) 0 0;
            box-sizing: border-box;
            .top-active {
              color: #fff;
              font-size: getREM(26);
            }
            span {
              font-size: getREM(26);
            }
          }
          .bottom {
            width: 100%;
            text-align: center;
            padding: getREM(10) 0 0;
            .bottom-active {
              color: #fff;
              font-size: getREM(26);
            }
            span {
              font-size: getREM(26);
            }
          }
        }
        .collect-immediately-right {
          width: getREM(168);
          height: getREM(183);
          .circular {
            font-weight: bold;
            position: relative;
            color: #ff6766;
            font-size: getREM(33);
            position: absolute;
            left: getREM(99 * 2);
            top: getREM(15 * 2);
            text-align: center;
            line-height: getREM(132);
            height: getREM(132);
            width: getREM(132);
            background-color: #fff;
            border-radius: 50%;
            span:first-of-type {
              position: absolute;
              left: getREM(16 * 2);
              top: getREM(-11 * 2);
            }
            span:last-of-type {
              position: absolute;
              left: getREM(16 * 2);
              top: getREM(12 * 2);
            }
          }
        }
      }
      .activity-rules {
        position: absolute;
        left: 50%;
        top: getREM(345);
        transform: translateX(-50%);
        img {
          width: getREM(615);
          height: getREM(360);
        }
      }
      .text {
        position: absolute;
        left: 7px;
        top: 13px;
        letter-spacing: getREM(2);
        .text-top {
          .text-active {
            color: #666;
            font-size: getREM(26);
          }
          span {
            font-size: getREM(26);
            color: #999;
          }
        }
        .text-bottom {
          span {
            color: #666;
            font-size: getREM(26);
          }
          p {
            font-size: getREM(26);
            color: #999;
          }
        }
      }
    }
  }
  .product-container {
    width: getREM(670);
    margin: 0 auto;
    margin-top: getREM(35);
    background-color: #fff;
    border-radius: getREM(6);
    padding: getREM(60) getREM(40) 0;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    .product-item:nth-of-type(odd){
        border-right: 1px solid #ececec;
    }
    .product-item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 50%;
      border-top: 1px solid #ececec;

      img {
        width: 100%;
      }
      p {
        letter-spacing: getREM(1);
        padding-left: 1px;
        padding-left: getREM(4);
      }

      .all-container {
        padding-left: getREM(4);
        .progress {
          position: relative;
          margin-top: getREM(22);
          width: 98%;
          height: getREM(12);
          background-color: #f1e6e9;
          border-radius: getREM(12);
          margin: getREM(35) 0;
          img {
            position: absolute;
            left: getREM(216);
            top: 0;
            width: getREM(36);
          }
          .orange-progress {
            width: 70%;
            height: getREM(10);
            background-color: #fb762a;
            border-radius: getREM(10);
          }
        }
        .num {
          display: flex;
          justify-content: space-between;
          padding-bottom: getREM(35);
          padding-right: getREM(10);
        }
      }
    }
  }
  .footer {
    padding: getREM(40) 0;
    text-align: center;
    color: #ffd1cb;
    font-size: getREM(25);
  }
  .hr-left,
  .hr-right {
    position: absolute;
    z-index: 12;
    img {
      height: getREM(85);
    }
  }
  .hr-left {
    left: getREM(86);
    top: getREM(608 * 2);
  }
  .hr-right {
    left: 20px;
    top: 20px;
    left: getREM(324 * 2);
    top: getREM(608 * 2);
  }
}
}
// .countdown-container {
//   width: 100%;
//   background: url(../assets/images/_p.png) no-repeat;
//   //  background-attachment: fixed;
//   height: 10000px;
//   background-size: 100%;
//   //头部样式
//   .countdown-title {
//     width: 100%;
//     height: getREM(79);
//     background-color: #fff;
//     .time {
//       margin: 0 auto;

//       letter-spacing: getREM(2);
//       width: 80%;
//       font-size: getREM(28);
//       color: #dc6963;
//       display: flex;
//       flex-direction: row;
//       justify-content: space-between;
//       align-items: center;
//       height: 100%;
//       span {
//         white-space: nowrap;
//       }
//       p {
//         white-space: nowrap;
//       }
//       span:nth-of-type(odd) {
//         height: getREM(52);

//         background-color: #fb6451;
//         border-radius: 3px;
//         color: #fff;
//         letter-spacing: getREM(0);
//         margin: 0 3px;
//         padding: 2px;
//         font-weight: bold;
//       }
//       span:nth-of-type(even) {
//         width: getREM(40);
//         text-align: center;
//       }
//     }
//   }
//   //恭喜您获得盒子样式
//   .picture-box {
//     .picture {
//       position: relative;
//       margin: 0 auto;
//       margin-top: getREM(405);
//       width: getREM(694);
//       img {
//         width: getREM(694);
//       }
//       h1 {
//         color: #fb6451;
//         position: absolute;
//         top: getREM(65);
//         left: 50%;
//         font-size: getREM(35);
//         font-weight: bold;
//         transform: translateX(-50%);
//         letter-spacing: getREM(3);
//       }
//       h1::before,
//       h1::after {
//         content: "";
//         position: absolute;
//         width: getREM(80);
//         height: getREM(2);
//         background-color: #fb6451;
//       }
//       h1::before {
//         left: getREM(-105);
//         top: getREM(28);
//       }
//       h1::after {
//         left: getREM(215);
//         top: getREM(28);
//       }
//       .back {
//         position: absolute;
//         left: getREM(580);
//         top: getREM(74);
//         img {
//           width: getREM(35);
//           width: getREM(35);
//         }
//       }
//       .hongbao {
//         position: absolute;
//         left: 50%;
//         top: getREM(135);
//         transform: translateX(-50%);
//         img {
//           width: getREM(615);
//         }
//       }
//       .collect-immediately {
//         position: absolute;
//         width: getREM(356);
//         height: getREM(183);
//         left: getREM(150 * 2);
//         top: getREM(68 * 2);
//         display: flex;
//         .collect-immediately-left {
//           display: flex;
//           flex-wrap: wrap;
//           width: getREM(188);
//           height: getREM(186);
//           letter-spacing: getREM(2);
//           .top {
//             text-align: center;
//             width: 100%;
//             padding: getREM(10) 0 0;
//             box-sizing: border-box;
//             .top-active {
//               color: #fff;
//               font-size: getREM(26);
//             }
//             span {
//               font-size: getREM(26);
//             }
//           }
//           .bottom {
//             width: 100%;
//             text-align: center;
//             padding: getREM(10) 0 0;
//             .bottom-active {
//               color: #fff;
//               font-size: getREM(26);
//             }
//             span {
//               font-size: getREM(26);
//             }
//           }
//         }
//         .collect-immediately-right {
//           width: getREM(168);
//           height: getREM(183);
//           .circular {
//             font-weight: bold;
//             position: relative;
//             color: #ff6766;
//             font-size: getREM(33);
//             position: absolute;
//             left: getREM(99 * 2);
//             top: getREM(15 * 2);
//             text-align: center;
//             line-height: getREM(132);
//             height: getREM(132);
//             width: getREM(132);
//             background-color: #fff;
//             border-radius: 50%;
//             span:first-of-type {
//               position: absolute;
//               left: getREM(16 * 2);
//               top: getREM(-11 * 2);
//             }
//             span:last-of-type {
//               position: absolute;
//               left: getREM(16 * 2);
//               top: getREM(12 * 2);
//             }
//           }
//         }
//       }
//       .activity-rules {
//         position: absolute;
//         left: 50%;
//         top: getREM(345);
//         transform: translateX(-50%);
//         img {
//           width: getREM(615);
//           height: getREM(360);
//         }
//       }
//       .text {
//         position: absolute;
//         left: 7px;
//         top: 13px;
//         letter-spacing: getREM(2);
//         .text-top {
//           .text-active {
//             color: #666;
//             font-size: getREM(26);
//           }
//           span {
//             font-size: getREM(26);
//             color: #999;
//           }
//         }
//         .text-bottom {
//           span {
//             color: #666;
//             font-size: getREM(26);
//           }
//           p {
//             font-size: getREM(26);
//             color: #999;
//           }
//         }
//       }
//     }
//   }
//   .product-container {
//     width: getREM(670);
//     margin: 0 auto;
//     margin-top: getREM(35);
//     background-color: #fff;
//     border-radius: getREM(6);
//     padding: getREM(60) getREM(40) 0;
//     box-sizing: border-box;
//     display: flex;
//     flex-wrap: wrap;
//     .product-item:nth-of-type(odd){
//         border-right: 1px solid #ececec;
//     }
//     .product-item {
//       display: flex;
//       flex-direction: column;
//       justify-content: space-between;
//       width: 50%;
//       border-top: 1px solid #ececec;

//       img {
//         width: 100%;
//       }
//       p {
//         letter-spacing: getREM(1);
//         padding-left: 1px;
//         padding-left: getREM(4);
//       }

//       .all-container {
//         padding-left: getREM(4);
//         .progress {
//           position: relative;
//           margin-top: getREM(22);
//           width: 98%;
//           height: getREM(12);
//           background-color: #f1e6e9;
//           border-radius: getREM(12);
//           margin: getREM(35) 0;
//           img {
//             position: absolute;
//             left: getREM(216);
//             top: 0;
//             width: getREM(36);
//           }
//           .orange-progress {
//             width: 70%;
//             height: getREM(10);
//             background-color: #fb762a;
//             border-radius: getREM(10);
//           }
//         }
//         .num {
//           display: flex;
//           justify-content: space-between;
//           padding-bottom: getREM(35);
//           padding-right: getREM(40);
//         }
//       }
//     }
//   }
//   .footer {
//     padding: getREM(40) 0;
//     text-align: center;
//     color: #ffd1cb;
//     font-size: getREM(25);
//   }
//   .hr-left,
//   .hr-right {
//     position: absolute;
//     z-index: 12;
//     img {
//       height: getREM(85);
//     }
//   }
//   .hr-left {
//     left: getREM(86);
//     top: getREM(608 * 2);
//   }
//   .hr-right {
//     left: 20px;
//     top: 20px;
//     left: getREM(324 * 2);
//     top: getREM(608 * 2);
//   }
// }
</style>

