<template>
  <div class="exchangSuccess">
    <div class="exchangSuccess-head">
      <img src="../../assets/img/exchangicon.png"/>
      <p class="exchangSuccess-head-suc">恭喜您已兑换成功</p>
      <p class="exchangSuccess-head-wait">请等待系统为您揭晓</p>
      <div class="exchangSuccess-head-btns">
        <div class="dhjl" @click="navigateTo('myBuyRecord')">兑换记录</div>
        <div @click="$router.go(-2)">继续兑换</div>
      </div>
    </div>
    <div class="exchangSuccess-pro">
      <div class="exchangSuccess-pro-con">您成功参与了1件商品，共{{data.buyNum}}次</div>
      <div class="exchangSuccess-pro-form">
        <img :src="data.pic"/>
        <div class="exchangSuccess-pro-form-ind">
          <p>{{data.name}}</p>
          <div class="exchangSuccess-pro-form-ind-text">
            参与人次：{{data.buyNum}}人次
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "exchang-success",
    data(){
      return{
        data:{}
      }
    },
    created(){
      this.data = JSON.parse(this.$route.query.data)
    },
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/reset.scss";
  .exchangSuccess{
    @include appcontent;
    padding-bottom: 0;
    background-color: #ffffff;
    &-head{
      @include flex-align;
      img{
        width: 82*$r;
        height: 82*$r;
        margin-top: 60*$r;
        margin-bottom: 41*$r;
      }
      &-suc{
        color: #4a4a4a;
        font-size: 30*$r;
        margin-bottom: 5*$r;
      }
      &-wait{
        color:#898989;
        margin-bottom: 37*$r;
      }
      &-btns{
        @include flex-space;
        width: 475*$r;
        margin-bottom: 60*$r;
        div{
          width: 200*$r;
          height: 72*$r;
          background-color: #fb6815;
          border-radius: 10*$r;
          border: solid 2px #fb762a;
          text-align: center;
          color: #ffffff;
          line-height: 72*$r;
          font-size: 30*$r;
        }
        .dhjl{
          background-color: transparent;
          color: #fb762a;
        }
      }
    }
    &-pro{
      border-top: solid 5px #ececec;
      &-con{
        padding: 39*$r 30*$r 0 30*$r;
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
        border-bottom: solid 1px #ececec;
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
          &-text{
            color: #999999;
            margin-top: 34*$r;
            @include flex-space;
          }
        }
      }
    }
  }

</style>
