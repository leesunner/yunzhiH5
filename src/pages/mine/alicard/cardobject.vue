<template>
  <div class="invented">
    <div class="invented-head" v-if="passController==2">
      <div class="invented-head-title">
        <p>{{data.name}}</p>
        <span>待领取</span>
      </div>
      <div class="invented-head-con">
        <img class="invented-head-con-img" :src="data.pic"/>
        <div class="invented-head-con-text">
          <div class="invented-head-con-text-item">
            <span>商品期数：</span>
            <span class="color1">{{data.times_num}}</span>
          </div>
          <div class="invented-head-con-text-item">
            <label>幸运号码：</label>
            <span class="color3">{{data.winner_code}}</span>
          </div>
          <div class="invented-head-con-text-item">
            <label>本期参与：</label>
            <span class="color3">{{data.buy_count}}</span>
            <span>次</span>
          </div>
          <div class="invented-head-con-text-item">
            <label>揭晓时间：</label>
            <span>{{data.etime}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="invented-content" v-if="passController==2">
      <p class="invented-content-title">奖品跟踪</p>
      <div class="invented-content-con">
        <!--进度条最大值100%; 19,45,74,100-->
        <div class="invented-content-con-box">
          <div class="invented-content-con-box-box">
            <div class="invented-content-con-box-line" :style="'height:'+ percent +'%;'"></div>
            <div class="invented-content-con-box-lineGray"></div>
          </div>
        </div>
        <!--进度条结束-->
        <div class="invented-content-con-item">
          <div class="invented-content-con-item-gress">
          </div>
          <div class="invented-content-con-item-text">
            <div class="invented-content-con-item-text-title">
              <span>恭喜中奖</span>
              <span>{{data.etime}}</span>
            </div>
          </div>
        </div>
        <div class="invented-content-con-item">
          <div :class="{'ytop':true,'invented-content-con-item-gress':percent>19,'quan':percent==19}">
          </div>
          <div class="invented-content-con-item-text">
            <div class="invented-content-con-item-text-title cert" style="margin-bottom: 0;">
              <!-- <span class="color3">已绑定</span> -->
              <span class="color3">填写支付宝账号</span>
              <p>绑定后如需解绑或填写错误请加QQ群联系客服</p>
            </div>
            <div class="invented-content-con-item-text-con">
              <img src="../../../assets/img/jjcert.png"/>
              <!-- <ul class="invented-content-con-item-text-con-alipay">
                <li>
                  <span>支付宝</span>
                  <span>123456789@qq.com</span>
                </li>
                <li>
                  <span>姓名</span>
                  <span>张三</span>
                </li>
              </ul> -->
              <ul class="invented-content-con-item-text-con-alipay">
                <li>
                  <span>支付宝</span>
                  <span>
                    <input type="text" placeholder="输入手机号码或邮箱" ref="account" @blur="test()"/>
                  </span>
                  <div v-if="error">
                    <span>支付宝错误，请填写正确账号</span>
                  </div>
                </li>
                <li>
                  <span>姓名</span>
                  <span>
                    <input type="text" placeholder="输入真实姓名"/>
                  </span>
                </li>
                <p>
                  <span>确认</span>
                </p>
              </ul>
            </div>
          </div>
        </div>
        <div class="invented-content-con-item">
          <div :class="{'ytop':true,'invented-content-con-item-gress':percent>74,'quan':percent==74}">
          </div>
          <div class="invented-content-con-item-text">
            <div class="invented-content-con-item-text-title cert">
              <span :class="percent==74?'color3':''">奖品审核</span>
            </div>
            <div class="invented-content-con-item-text-con">
              <img src="../../../assets/img/jjcert.png"/>
              <span>{{cardData.length>0?'奖品已审核通过,请尽快领取':'淘宝卡发放时间在10点，14点，21点三个时间段'}}</span>
            </div>
          </div>
        </div>
        <div class="invented-content-con-item">
          <div :class="{'ytop':true,'invented-content-con-item-gress':percent==101,'quan':percent==101}">
          </div>
          <div class="invented-content-con-item-text">
            <div class="invented-content-con-item-text-title cert">
              <span :class="percent==101?'color3':''">{{data.user_address_id?'奖品已发放':'发放奖品'}}</span>
            </div>
            <div class="invented-content-con-item-text-con">
              <img src="../../../assets/img/jjcert.png"/>
              <span>审核通过即可获得奖品</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <receing-dailog v-if="receingBoxControl" :type="receType" :num="receNum" @receingBox="receingBox"></receing-dailog>
  </div>
</template>

<script>
  import clip from '@/assets/clipboard'
  import receingDailog from '@/components/popupView/receingDailog'
  export default {
    components: {receingDailog},
    name: "invented-object",
    data(){
      return{
        percent:19,//进度条控制器19,45,74,100
        receingBoxControl:false,//领取提示弹框
        receType:'',//领取类型
        receNum:0,//积分数量
        receingTypeControl:'',//已领取奖品类型
        data:[],
        cardData:[],
        orderId:'',
        cardTotails:'',//面值总金额
        passController:0,//密码控制
        error: false
      }
    },
    created(){
      this.orderId = this.$route.query.id
      this.getMsg()
    },
    methods:{
      receingBox(val){
        if(val==200){
          //回调获取接口数据
          this.getMsg()
        }
        this.receingBoxControl = false
      },
      getMsg(){
        let that =this
        this.$axios.post('/user/prizeView?version=v2',{id:that.orderId}).then((res)=>{
          if(res.data.code===1){
            this.data = res.data.data
            this.receNum = res.data.data.coins
            this.cardData = res.data.data.cards
            if(res.data.data.status_order===3&&this.cardData.length>0){
              this.passController = 1//弹出输入密码
            }else{
              this.passController = 2
            }
            //领取方式显示控制
            this.receingTypeControl = this.data.user_address_id
            if(this.cardData.length>0){
              this.cardData.forEach(function (itme) {//计算总金额
                that.cardTotails +=itme.price
              })
            }
            //认证
            switch (that.data.status_order){
              case 2:
                if(that.data.user_address_id){
                  that.percent=75//待发货
                }else{
                  that.percent=83//奖品审核
                }
                break;
              case 3:
                that.percent=101//待收货
                break;
              case 4:
                that.percent=117//领取完成
                break;
            }
          }else{
            this.$vux.toast.text(res.data.msg)
          }
        })
      },
      test() {
        let myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
        let phone = /^1[3|4|5|7|8][0-9]{9}$/
        let accountValue = this.$refs.account.value
        if (!myreg.test(accountValue) && !phone.test(accountValue)) {
          this.error = true
        } else {
          this.error = false
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/reset.scss";
  .invented{
    @include ios-Scroll;
    @include appcontent;
    padding-bottom: 40*$r;
    color: #898989;
    &-head{
      width: 92%;
      height: 269*$r;
      padding: 26*$r 26*$r 16*$r 30*$r;
      background-color: #ffffff;
      border-radius: 10*$r;
      margin: 0 auto;
      margin-top: 20*$r;
      overflow: hidden;
      &-title{
        font-size: 30*$r;
        color: #4a4a4a;
        p{
          @include t-overflow(1);
          width: 6.9rem;
          display: inline-block;
          vertical-align: middle;
        }
        span{
          vertical-align: middle;
          color: #fb762a;
          letter-spacing: 2px;
        }
      }
      &-con{
        @include flex-space;
        justify-content: flex-start;
        margin-top: 10*$r;
        &-img{
          width: 176*$r;
          height: 176*$r;
          margin-right: 24*$r;
        }
        &-text{
          height: 176*$r;
          &-item{
            color: #898989;
            line-height: 45*$r;
          }
        }
      }
    }
    &-content{
      width: 92%;
      margin: 0 auto;
      padding-top: 37*$r;
      background-color: #f5f5f5;
      &-title{
        color: #4a4a4a;
        font-size: 26*$r;
        margin-bottom: 22*$r;
      }
      &-con{
        padding-left: 26*$r;
        position: relative;
        &-box{
          position: absolute;
          width: 1px;
          height: 780*$r;
          left: 36*$r;
          top: 30*$r;
          &-box{
            position: relative;
            height: inherit;
          }
          &-line{
            position: absolute;
            width: 1px;
            transition: all 0.2s ease-in-out;
            background-color: #fb762a;
            z-index: 10;
          }
          &-lineGray{
            position: absolute;
            width: 1px;
            height: 117%;
            background-color: #e2e2e2;
            z-index: 8;
          }
        }
        &-item{
          @include flex-space;
          justify-content: flex-start;
          position: relative;
          .ytop{
            position: absolute;
            top:132*$r;
            width: 23*$r;
            height: 23*$r;
            background-color: #ffffff;
            border: solid 1px #e2e2e2;
            border-radius: 50%;
            z-index: 100;
          }
          &-gress{
            width: 23*$r;
            height: 23*$r;
            background-color: #fb762a!important;
            border: solid 1px #fb762a!important;
            border-radius: 50%;
            position: absolute;
            z-index: 100;
            &-gray{
              width: 23*$r;
              height: 23*$r;
              border-radius: 50%;
              position: absolute;
              z-index: 100;
              border: solid 1px #e2e2e2;
              background-color: #f5f5f5;
            }
            &-color{
              border: solid 1px #fb762a;
              background-color: #f5f5f5;
            }
          }
          .quan{
            width: 23*$r;
            height: 23*$r;
            background-color: #ffffff;
            border: solid 1px #fb762a;
            border-radius: 50%;
            position: absolute;
            z-index: 100;
          }
          &-text{
            margin-left: 49*$r;
            width: 100%;
            &-title{
              padding-left: 13*$r;
            }
            .cert{
              margin-top: 36*$r;
              margin-bottom: 21*$r;
            }
            &-con{
              background-color: #ffffff;
              border-radius: 4*$r;
              border: solid 1px #e2e2e2;
              position: relative;
              padding: 33*$r 28*$r 33*$r 28*$r;
              img{
                width: 10*$r;
                height: 17*$r;
                position: absolute;
                top: 35*$r;
                left: -10*$r;
              }
              .certBtn{
                position: absolute;
                right: 35*$r;
                top: 18*$r;
                padding: 0 18*$r;
                background-color: #bdbdbd;
                border-radius: 10*$r;
                color: #FFFFFF;
                text-align: center;
                line-height: 60*$r;
                &-ready{
                  background-color: #bdbdbd;
                }
              }
              .certBtnDefault{
                background-color: #fb762a!important;
              }
              &-center{
                text-align: center;
                .fenline{
                  display: inline-block;
                  vertical-align: middle;
                  width: 2px;
                  height: 60*$r;
                  background-color: #bdbdbd;
                  margin: 0 37*$r;
                }
                .btnWay{
                  width: 184*$r;
                  height: 60*$r;
                  display: inline-block;
                  vertical-align: middle;
                  background-color: #fb762a;
                  border-radius: 10*$r;
                  color: #FFFFFF;
                  text-align: center;
                  line-height: 60*$r;
                  position: relative;
                  .gg{
                    position: absolute;
                    top: unset;
                    left: unset;
                    bottom: -8*$r;
                    right: -11*$r;
                    z-index: 6;
                    width: 22*$r;
                    height: 22*$r;
                  }
                  &-gray{
                    background-color: #bdbdbd;
                  }
                }
              }
              &-alipay{
                li:first-of-type{
                  padding-bottom: 33*$r;
                  border-bottom: 1px solid #e2e2e2;
                  position: relative;
                  div{
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    color: #fb482a;
                    font-style: normal;
                    font-size: 0.3rem;
                    background: url('../../../assets/img/error.png') no-repeat;
                    background-size: 0.3rem 0.3rem;
                    background-position: 0 center;
                    padding-left: 0.4rem;
                  }
                }
                li:last-of-type{
                   padding-top: 33*$r;
                }
                li {
                  span:last-of-type{
                    float: right;
                    input{
                      border: none;
                      outline: none;
                      text-align: right;
                      -webkit-tap-highlight-color: rgba(0,0,0,0);
                    }
                  }
                }
                p{
                  padding-top: 33*$r;
                  margin-top: 33*$r;
                  text-align: center;
                  border-top: 1px solid #e2e2e2;
                  span{
                    background: #fb762a;
                    height: 0.8rem;
                    line-height: 0.8rem;
                    display: inline-block;
                    border-radius: 0.13rem;
                    color: #ffffff;
                    letter-spacing: 1px;
                    width: 1.5rem;
                  }
                }
              }
            }
            &-card{
              &-title{
                color: #4a4a4a;
                padding-left: 10*$r;
                position: relative;
                .ctrlc{
                  position: absolute;
                  top:0;
                  right: 0;
                }
              }
              &-con{
                background-color: #ffffff;
                border-radius: 4*$r;
                position: relative;
                border: solid 1px #e2e2e2;
                img{
                  width: 10*$r;
                  height: 17*$r;
                  position: absolute;
                  top: 35*$r;
                  left: -10*$r;
                }
                ul{
                  height: auto;
                  li{
                    width: 92%;
                    height: 156*$r;
                    background-color: #f5f5f5;
                    border-radius: 10*$r;
                    line-height: 108*$r;
                    margin: 21*$r auto;
                    .card-title{
                      height: 42*$r;
                      line-height: 44*$r;
                      background-color: #eeeeee;
                      font-size: 18*$r;
                      label{
                        padding: 6*$r 6*$r;
                        background-color: #ffffff;
                        border-radius: 6*$r;
                        margin-right: 40*$r;
                        margin-left: 30*$r;
                      }
                      span:nth-child(2){
                        margin-right: 80*$r;
                      }
                    }
                    .card-content{
                      height: 112*$r;
                      div{
                        height: 28*$r;
                        line-height: normal;
                        padding-left: 28*$r;
                      }
                      div:nth-child(1){
                        margin-top: 20*$r;
                        margin-bottom: 20*$r;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    .color1{
      color: #4a4a4a;
    }
    .color3{
      color: #fb762a;
    }
    .passInput{
      @include appcontent;
      background-color: #ffffff;
      p{
        margin-top: 420*$r;
        color: #000000;
        font-size: 26*$r;
        font-weight: 400;
        text-align: center;
        margin-bottom: 35*$r;
        letter-spacing: 1.5px;
      }
      &-input{
        height: 85*$r;
        width: 510*$r;
        margin: 0 auto;
        background-color: #fef9ee;
        line-height: 85*$r;
        font-size: 26*$r;
        padding-left: 25*$r;
        padding-right: 12*$r;
      }
      &-btn{
        background-color: #fb762a;
        margin: 0 auto;
        color: #ffffff;
        width: 510*$r;
        height: 79*$r;
        border-radius: 6*$r;
        line-height: 79*$r;
        text-align: center;
        font-size: 30*$r;
        margin-top: 40*$r;
      }
    }
  }
</style>
