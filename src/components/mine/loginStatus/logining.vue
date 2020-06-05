<template>
  <div class="mines">
    <div class="mines-userInfo">
      <div @click="navigateTo('mineInfo')" class="mines-userInfo-headImg" :style="'background-image: url('+getUserInfo.avatar+')'"></div>
      <div @click="navigateTo('mineInfo')" class="mines-userInfo-info">
        <div class="mines-userInfo-info-nickname">
          <span>{{getUserInfo.nickname}}</span>
          <img :src="levels"/>
        </div>
        <p>id: {{getUserInfo.idx}}</p>
        <div class="mines-userInfo-info-jifen">
          <span>积分 </span>
          <span class="mines-userInfo-info-jifen-color" @click.stop="navigateTo('accountDetails')">{{getUserInfo.coin_lucky}}</span>
          <div class="mines-userInfo-info-jifen-button" @click.stop="navigateTo('rechargList')">去充值</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "logining",
    props:{
      levels:String
    },
    computed:{
      ...mapGetters([//获取用户信息
        'getUserInfo'
      ])
    },
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/reset.scss";
  .mines{
    &-userInfo{
      width: 100%;
      height: 200*$r;
      background-color: #ffffff;
      font-size: 24*$r;
      @include flex-space;
      justify-content: flex-start;
      margin-bottom: 10*$r;
      &-headImg{
        width: 126*$r;
        height: 126*$r;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        margin-left: 30*$r;
        margin-right: 30*$r;
        border-radius: 50%;
      }
      &-info{
        p{
          color: #909090;
        }
        &-nickname{
          color: #323232!important;
          span{
            vertical-align: middle;
          }
          img{
            width: 60*$r;
            height: 22*$r;
            margin-left: 10*$r;
            vertical-align: middle;
          }
        }
        &-jifen{
          margin-top: 10*$r;
          color: #909090;
          span{
            vertical-align: middle;
          }
          &-color{
            color: #ec6822;
          }
          &-button{
            display: inline-block;
            vertical-align: middle;
            background-color: #ec6822;
            color: #ffffff;
            width: 140*$r;
            height: 56*$r;
            font-size: 26*$r;
            text-align: center;
            line-height: 56*$r;
            border-radius: 3px;
            margin-left: 240*$r;
          }
        }
      }
    }
  }
</style>
