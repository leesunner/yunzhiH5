<template>
  <div class="newUser" @touchmove.prevent @click="close=!close" v-show="close">
    <img class="newUser-close" src="../../assets/img/winerc.png"/>
    <div class="newUser-zc"></div>
    <div class="newUser-hb">
      <div style="width: 75vw;position:relative;height:75vw;">
        <img class="rote-img" src="../../assets/img/sunlight.png" />
        <img class="win-img" src="../../assets/img/winnerd1.gif" />
      </div>
      <div class="newUser-hb-con">
        <p>恭喜您获得</p>
        <p>{{getWinner.goods_times}}</p>
        <p>{{getWinner.goods_name}}</p>
        <div class="newUser-hb-con-btn" @click="navigateTo('luckyRecord')">马上领奖</div>
        <span class="newUser-hb-con-span">实物晒单+2积分</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "winner-dailog",
    data(){
      return{
        close:false,
      }
    },
    watch:{
      getWinner(newVal,oldVal){
        let that = this
        if(newVal.order_id){
          setTimeout(function(){
            this.close= true
            this.commitMsg()
          }.bind(this), 50);
        }
      }
    },
    methods:{
      commitMsg(){//弹出弹框像后台提交(提交后个人登录信息将不再有获奖信息)
        this.$axios.post("notice/confirmWinMsg?version=v2",{}).then(res =>{
          }
        )
      }
    },
    computed:{
      ...mapGetters([
        'getWinner',
        'getInterController'
      ]),
    },
    mounted() {
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/reset.scss";
  @keyframes rote1{
		0%{-webkit-transform:rotate(0deg);}
		25%{-webkit-transform:rotate(90deg);}
		50%{-webkit-transform:rotate(180deg);}
		75%{-webkit-transform:rotate(270deg);}
		100%{-webkit-transform:rotate(360deg);}
	}
  .newUser{
    @include posit-top;
    overflow: auto;
    &-close{
      width: 46*$r;
      height: 46*$r;
      position: absolute;
      top:130*$r;
      right: 80*$r;
      z-index: 100000;
    }
    &-zc{
      width: 100%;
      height: 100%;
      background-color: #000000;
      opacity: 0.7;
    }
    &-hb{
      position: absolute;
      top:2.5rem;
      left: 0;
      right: 0;
      width: 540*$r;
      margin: 0 auto;
      .rote-img{
        position: absolute;
        width: 100%;
        animation:rote1 2s linear infinite;
        left: 0;
        top:0;
      }
      .win-img{
        width: 50vw;
        position: absolute;
        z-index: 3;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
      }
      &-con{
        position: absolute;
        bottom:-360*$r;
        left: 0;
        right: 0;
        width: 100%;
        margin: 0 auto;
        font-family: 'PingFang-SC-Regular';
        font-size: 30*$r;
        text-align: center;
        p{
          text-align: center;
          color:#f2d648;
        }
        p:nth-child(1){
          color: #ffffff;
          margin-bottom: 26*$r;
          letter-spacing: 2px;
        }
        &-btn{
          display: block;
          width: 282*$r;
          height: 81*$r;
          margin: 0 auto;
          // background-color: #fb762a;
          background: url('../../assets/img/btn.png') no-repeat;
          background-size: cover;
          color: #ffffff;
          border-radius: 40.5*$r;
          margin-top: 53*$r;
          margin-bottom: 10*$r;
          text-align: center;
          line-height: 81*$r;
          color: #f2d648;
        }
        &-span{
          color: #f2d648;
        }
        &-span:before{
          content: '*';
          margin-right: 5*$r;
          color: #b4180b;
          font-weight: bold;
        }
      }
    }
    .audio{
      position: absolute;
      top: 0;
      left: 0;
    }
  }
</style>
