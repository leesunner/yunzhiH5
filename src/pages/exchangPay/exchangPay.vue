<template>
  <div class="exchangpay">
    <div class="exchangpay-con">提交成功,只差一步就兑换成功啦！</div>
    <div class="exchangpay-form">
      <img :src="data.pic"/>
      <div class="exchangpay-form-ind">
        <p class="exchangpay-form-ind-title">{{data.name}}</p>
        <div class="exchangpay-form-ind-text">
          <p><span class="color">{{data.buyNum}}</span>次</p>
          <span class="color">{{dataPay.totalPrice}}积分</span>
        </div>
      </div>
    </div>
    <div class="exchangpay-bullet">
      <div class="exchangpay-bullet-item">
        <p>积分券</p>
        <div class="exchangpay-bullet-item-right" @click="goUrlTo">
          <span v-if="!getTicket">{{coupons.length>0?coupons.length+'个可用':'暂无可用积分券'}}</span>
          <span v-else>-{{getTicket.coin}}</span>
          <img class="bullet-item-con-link" src="../../assets/img/yjtz.png"/>
        </div>
      </div>
      <div class="exchangpay-bullet-item">
        <p>应付金额</p>
        <div class="exchangpay-bullet-item-right">
          <span class="color">{{dataPay.totalPrice-(getTicket.coin?getTicket.coin:0)}}积分</span>
        </div>
      </div>
    </div>
    <div class="exchangpay-account">
      <div>
        积分支付(账户余额：<span>{{dataPay.coin_lucky}}</span>积分)
      </div>
      <img :src="choosen?require('@/assets/img/ads-choosed.png'):require('@/assets/img/ads-choose.png')" @click="choosen=!choosen"/>
    </div>
    <div class="exchangpay-btn" @click="submit">确认兑换</div>
    <!-- 积分不足提示窗 -->
    <div class="unenthog" v-if="isUNenthoug">
      <div class="unenthog-box">
        <p>兑宝资格不足，请购买<span>茶叶</span>或者<span>游戏礼包</span>免费送兑宝资格</p>
        <div>
          <p @click="isUNenthoug = false">取消</p>
          <p @click="$router.push({name: 'rechargList'})">确定</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters,mapMutations} from 'vuex'
  export default {
    name: "exchang-pay",
    data(){
      return{
        choosen:true,
        data:{},
        dataPay:{},//兑换页面数据对象
        coupons:[],
        isUNenthoug: false,
      }
    },
    computed:{
      ...mapGetters([
        'getTicket'
      ])
    },
    created(){
      this.data = JSON.parse(this.$route.query.data)
      this.getMsg()
    },
    methods:{
      ...mapMutations([
        'setTicket'
      ]),
      goUrlTo(){
        let para=[{"count":this.data.buyNum,"goods_id":this.data.goods_id}]
        if(this.coupons.length>0){
          this.navigateTo('tickets',{data:JSON.stringify(para)})
        }
      },
      submit(){
        let that = this
        let para=[{"count":this.data.buyNum,"goods_id":this.data.goods_id}]
        this.$axios.post('/order/submit?version=v2',{data:JSON.stringify(para),coupon:that.getTicket.user_coupon_id}).then((res)=>{
          if(res.data.code===1){
            this.navigateTo('exchangSuccess',{data:this.$route.query.data})
          }else if (res.data.code == '-9'){
            this.isUNenthoug = true
          } else {
            this.$vux.toast.text(res.data.msg)
          }
        })
      },
      getMsg(){
        let para=[{"count":this.data.buyNum,"goods_id":this.data.goods_id}]
        this.$axios.post('/order/cart?version=v2',{data:JSON.stringify(para)}).then((res)=>{
          if(res.data.code===1){
            this.dataPay = res.data.data
            this.coupons = res.data.data.coupons
          }else{
            this.$vux.toast.text(res.data.msg)
          }
        })
      }
    },
    destroyed(){
      this.setTicket('')
    },
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/reset.scss";
  .exchangpay{
    &-con{
      padding: 19*$r 30*$r 20*$r 30*$r;
      font-family: 'PingFang-SC-Regular';
      font-size: 22*$r;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 1.7px;
      color: #999999;
    }
    &-form{
      height: 160*$r;
      @include flex-space;
      justify-content: flex-start;
      width: 100%;
      font-size: 24*$r;
      background-color: #ffffff;
      color: #4a4a4a;
      margin-bottom: 10*$r;
      img{
        width: 165*$r;
        height: 99*$r;
        margin-left: 30*$r;
        margin-right: 22*$r;
      }
      &-ind{
        width: 100%;
        height: 160*$r;
        padding-top: 26*$r;
        padding-right: 30*$r;
        &-title{
          color: #4a4a4a;
        }
        &-text{
          color: #999999;
          margin-top: 34*$r;
          @include flex-space;
        }
      }
    }
    &-bullet{
      margin-bottom: 10*$r;
      &-item{
        height: 87*$r;
        background-color: #ffffff;
        @include flex-space;
        padding: 0 30*$r;
        p{
          color: #4a4a4a;
        }
        &-right{
          color: #898989;
          @include flex-space;
          img{
            width: 12*$r;
            height: 22*$r;
            margin-left: 17*$r;
          }
        }
      }
      &-item:nth-child(1){
        border-bottom: solid 1px #ececec;
      }
    }
    &-account{
      height: 90*$r;
      @include flex-space;
      background-color: #ffffff;
      padding-left: 15*$r;
      padding-right: 30*$r;
      margin-bottom: 40*$r;
      div{
        border-left: solid 2px #fb6815;
        padding-left: 13*$r;
        color: #4a4a4a;
        span{
          color: #fb762a;
        }
      }
      img{
        width: 37*$r;
        height: 37*$r;
      }
    }
    &-btn{
      width: 92%;
      height: 86*$r;
      border-radius: 10*$r;
      background-color: #fb762a;
      color: #ffffff;
      line-height: 86*$r;
      text-align: center;
      margin: 0 auto;
      font-size: 0.37333rem;
    }
    .color{
      color:#fb762a;
    }
    .unenthog{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      &-box{
        background: #ffffff;
        width: 65%;
        height: 3rem;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        border-radius: 8px;
        p{
          height: 2rem;
          border-bottom: 1px solid #f4f4f4;
          padding: 0.5rem 0.2rem 0;
          box-sizing: border-box;
          font-size: 0.35rem;
          text-align: center;
          span{
            color: #fb762a;
          }
        }
        div{
          display: flex;
          align-items: center;
          p{
            width: 50%;
            text-align: center;
            font-size: 0.4rem;
            border: 0;
            height: 1rem;
            padding: 0;
            line-height: 1rem;
          }
          p:first-of-type{
            border-right: 1px solid #f4f4f4;
            color: #666666;
          }
          p:last-of-type{
            color: #fb762a;
          }
        }
      }
    }
  }
</style>
