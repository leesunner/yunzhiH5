<template>
  <div class="redeemNow"  v-show="getRedmControl" @touchmove.prevent>
    <div class="redeemNow-zc" @click="setContro" @touchmove.prevent></div>
    <div :class="{'redeemNow-form':true,'redeemNow-transiton':contro,'redeemNow-transiton-false':controBlur}" @touchmove.prevent>
      <div class="redeemNow-form-up">
        <img :src="data.pic"/>
        <div class="redeemNow-form-up-ind">
          <p>{{data.name}}</p>
          <div class="redeemNow-form-up-ind-text">
            <span>总需: {{data.join_re}}</span>
            <span>剩余: {{getJoinNum}}</span>
          </div>
        </div>
      </div>
      <div class="redeemNow-form-down">
        <p class="redeemNow-form-down-title">参与人次: <span>{{data.price_min}}积分/次</span></p>
        <div class="redeemNow-form-down-input">
          <div class="redeemNow-form-down-input-zj">
            <div @click="subtract">-</div>
            <input v-model="buyNum" @change="getItemNum($event)" @focus="setViewEvent" @blur="setViewEvent"/>
            <div @click="add">+</div>
          </div>
          <div class="redeemNow-form-down-input-bw" @click="getAll">包尾</div>
        </div>
        <div class="redeemNow-form-down-choice">
          <div v-for="item in buyData" @click="getItemNum(item)">{{item}}</div>
        </div>
        <div style="height: auto;display:flex;">
          <p class="redeemNow-form-down-jfnum" style="text-align: left;">总共：<span>{{buyNum*data.price_min}}</span>积分</p>
          <p class="redeemNow-form-down-jfnum" style="text-align: right;">中奖几率：<span>{{Number((buyNum/data.join_re)*100).toFixed(2)}}</span>%</p>
        </div>
        <span class="device"><i>*</i>建议购买人次达到<i>50%</i>以上，中奖几率更高！</span>
        <div class="redeemNow-form-down-submit" @click="submit">提交</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapMutations,mapGetters} from 'vuex'
import { setInterval, clearInterval, clearTimeout } from 'timers';
  export default {
    name: "redeem-now",
    props:{
      data:Object
    },
    data(){
      return{
        contro:false,
        controBlur:false,
        buyNum:1,
        buyData:[5,10,50,100],
        precent: 0,
        oldprecent: 0
      }
    },
    computed:{
      ...mapGetters([
        'getRedmControl',
      ]),
      getJoinNum(){
        return this.data.join_re-this.data.join_ed
      },
    },
    watch:{
      getRedmControl(newV){
        if(newV==true){
          setTimeout(function(){//通过延时保证动画的弹出效果
            this.contro = true
          }.bind(this),50)
        }else{
          this.buyNum = 1
        }
      }
    },
    methods:{
      setViewEvent(){
        if(this.getPhoneType()!='ios'){
          this.controBlur = !this.controBlur
        }
      },
      setContro(){
        this.contro = false
        this.setRedmControl(!this.getRedmControl)
      },
      submit(){
        let that = this
        this.setContro()
        this.data.buyNum =  this.buyNum//购买数量
        this.data.buyAllPrice = this.buyNum*this.data.price_min//需要总积分
        this.navigateTo('exchangPay',{data:JSON.stringify(that.data)})
      },
      subtract(){
        if(this.buyNum>0){
          this.buyNum-=1
        }
      },
      getItemNum(val){//选中固定数量
        if(val.target){//input事件
          let test = /[^0-9]/g
          let v = val.target.value.replace(test,'')
          if(v){
            this.buyNum=parseInt(v)
          }else{
            this.buyNum = 1
          }
        }else{
          this.buyNum=val
        }
        if(this.data.is_purchase_limit===0){//不限购次数
          if(this.buyNum>=this.getJoinNum){
            this.buyNum = this.getJoinNum
            this.$vux.toast.text('该商品只剩余'+this.getJoinNum+'次','bottom')
          }
        }else {
          if(this.buyNum>=this.data.is_purchase_limit){
            this.buyNum = this.getJoinNum
            this.$vux.toast.text('该商品限购'+this.data.is_purchase_limit+'次','bottom')
          }else{
            if(this.buyNum>=this.getJoinNum){
              this.buyNum = this.getJoinNum
              this.$vux.toast.text('该商品只剩余'+this.getJoinNum+'次','bottom')
            }
          }
        }
      },
      getAll(){//包尾
        if(this.getJoinNum>this.data.is_purchase_limit&&this.data.is_purchase_limit!=0){
          this.$vux.toast.text('该商品限购'+this.data.is_purchase_limit+'次','bottom')
        }else{
          this.buyNum = this.getJoinNum
        }
      },
      add(){//增加数量
        if(this.data.is_purchase_limit===0){//不限购次数
          if(this.buyNum>=this.getJoinNum){
            this.$vux.toast.text('该商品剩余'+this.getJoinNum+'次','bottom')
          }else{
            this.buyNum++
          }
        }else {
          if(this.buyNum>=this.data.is_purchase_limit){
            this.$vux.toast.text('该商品限购'+this.data.is_purchase_limit+'次','bottom')
          }else{
            if(this.buyNum>=this.getJoinNum){
              this.$vux.toast.text('该商品剩余'+this.getJoinNum+'次','bottom')
            }else{
              this.buyNum++
            }
          }
        }
      },
      ...mapMutations([
        'setRedmControl'
      ]),
    },
	  destroyed(){
      this.setRedmControl(false)
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/reset.scss";
  .redeemNow{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 999;
    &-zc{
      width: 100%;
      height: 100%;
      background-color: #000000;
      opacity: 0.6;
    }
    &-form{
      width: 100%;
      height: 740*$r;
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: 995;
      background-color: #ffffff;
      transform-origin: bottom;
      transform: translateY(740*$r);
      transition: all .15s ease-in-out;
      letter-spacing: 1.2px;
      opacity: 0;
      &-up{
        height: 222*$r;
        @include flex-space;
        justify-content: flex-start;
        font-size: 24*$r;
        color: #151515;
        border: solid 1px #e5e5e5;
        img{
          width: 199*$r;
          height: 199*$r;
          margin-left: 29*$r;
          margin-right: 30*$r;
        }
        &-ind{
          width: 62%;
          height: 222*$r;
          padding-top: 51*$r;
          p{
            color: #4a4a4a;
          }
          &-text{
            color: #999999;
            margin-top: 50*$r;
            @include flex-space;
          }
        }
      }
      &-down{
        height: 517*$r;
        padding: 49*$r 30*$r 25*$r 30*$r;
        div{
          height: 73*$r;
          line-height: 73*$r;
          text-align: center;
          font-size: 28*$r;
          color: #898989
        }
        p{
          color: #898989;
        }
        &-title{
          font-size: 24*$r;
          font-weight: normal;
          margin-bottom: 29*$r;
          span{
            color: #fb762a;
          }
        }
        &-input{
          height: 73*$r;
          @include flex-space;
          justify-content: flex-start;
          &-zj{
            height: inherit;
            width: 78%;
            border: solid 1px #e5e5e5;
            @include flex-space;
            border-radius: 5px;
            div:nth-child(1){
              width: 100*$r;
            }
            input{
              border: none;
              height:68*$r;
              width: 65%;
              text-align: center;
              border-right: solid 1px #e5e5e5;
              border-left: solid 1px #e5e5e5;
            }
            div:nth-child(3){
              width: 100*$r;
              color: #fb762a;
            }
          }
          &-bw{
            margin-left: 30*$r;
            width: 151*$r;
            border-radius: 5px;
            font-size: 30*$r;
            border: solid 1px #e5e5e5;
          }
        }
        &-choice{
          @include flex-space;
          margin-top: 28*$r;
          div{
            width: 151*$r;
            border-radius: 5px;
            border: solid 1px #e5e5e5;
          }
        }
        &-jfnum{
          color: #333333 !important;
          height: 75*$r;
          text-align: center;
          line-height: 75*$r;
          width: 50%;
          font-size: 0.35rem;
          span{
            color: #fb762a;
          }
        }
        &-submit{
          width: 98%;
          height: 100*$r;
          margin: 0.2rem auto 0;
          text-align: center;
          line-height: 100*$r;
          background-color: #fb762a;
          border-radius: 5px;
          color: #ffffff !important;
        }
        .device{
          i{
            font-style: normal;
            color: #fb762a;
          }
        }
      }
    }
    &-transiton{
      transform: translateY(0);
      opacity: 1;
      &-false{
        transform: translateY(-180*$r);
      }
    }
  }
</style>
