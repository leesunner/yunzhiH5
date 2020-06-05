<template>
  <div class="hisgooditem" v-if="data.winner_id&&data.etime_int&&data.etime_int<timeNow">
    <img :src="data.pic" class="hisgooditem-headImg" @click="goMybuy"/>
    <div class="hisgooditem-content">
      <p class="title">{{data.name}}</p>
      <p class="gay">商品期数：{{data.times_num}}</p>
      <div v-if="(data.join_re-data.join_ed)<=0">
        <p class="gay" v-if="data.winner_name">获得者：{{data.winner_name}}</p>
        <p class="gay">获得者本期参与：{{data.buy_count}}</p>
        <p class="gay">幸运号码：{{data.winner_code}}</p>
        <p class="gay">揭晓时间：{{data.etime}}</p>
      </div>
      <div class="hisgooditem-content-percent" v-else >
        <mt-progress :value="getPercent(data)" :bar-height="5"></mt-progress>
        <div class="hisgooditem-content-gress">
          <span class="gay">总需人数：{{data.join_re}}人次</span>
          <span class="gay">剩余：{{data.join_re-data.join_ed}}人次</span>
        </div>
      </div>
      <div class="btn" @click.stop="goLookCode">查看TA的参与号码</div>
    </div>
    <div class="hisgooditem-btn" @click="getGoodType">{{data.etime?'购买':'跟买'}}</div>
  </div>
  <div v-else class="timing">
    <img class="timing-pro" :src="data.pic" @click="goMybuy">
    <div class="timing-content" v-if="data.etime_int>timeNow&&data.etime_int">
      <p>{{data.name}}</p>
      <time-format :itemData="data" :itemTime="timeNow" :key="index" @getWinMsg="getWinMsg"></time-format>
      <div class="btn" @click.stop="goLookCode">查看TA的参与号码</div>
    </div>
    <div class="allProgress-content" v-else>
      <p>{{data.name}}</p>
      <div class="allProgress-content-progress">
        <mt-progress id="faster-progress-color" :value="(data.join_ed/data.join_re)|formatPrent" :bar-height="4"></mt-progress>
      </div>
      <div class="allProgress-content-text">
        <div class="allProgress-content-text-item">
          <span>总需：</span>
          <span>{{data.join_re}}</span>
        </div>
        <div class="allProgress-content-text-item">
          <span>剩余：</span>
          <span>{{data.join_re-data.join_ed}}</span>
        </div>
      </div>
      <div class="btn" @click.stop="goLookCode">查看TA的参与号码</div>
    </div>
  </div>
</template>

<script>
  import timeFormat from '../../mine/myBuyRecord/buyRecordTime'
  import {mapActions} from 'vuex'
  export default {
    name: "his-good-item",
    props:['data','timeNow', 'index', 'userid'],
    components:{
      timeFormat
    },
    filters:{
      formatPrent(val){
        if(val){
          return Math.round(val*100)
        }else{
          return 0
        }
      },
    },
    methods:{
      ...mapActions([
        'login'
      ]),
      goLookCode(){
        let data = JSON.stringify(this.data)
        this.navigateTo('numbersList',{type:2,'data':data, 'userid': this.userid})
      },
      getGoodType(){//跳转规则是 购买详情还是兑换详情
        let item = this.data
        if(item.recharge_goods_id){
          this.navigateTo('rechargeGoodDetail',{'id':item.recharge_goods_id})
        }else{
          this.goParas('productView',{'id':item.latest_goods_id,'guid':2})
        }
      },
      getPercent(item){
        let num = (item.join_re-item.join_ed)/item.join_re
        return num*100
      },
      getWinMsg(){
        this.login().then(res=>{
          this.page = 1
          this.data=[]
          this.$emit('pullData')
        });
      },
      goMybuy() {
        let item = this.data;
        if(item.recharge_goods_id){
          this.navigateTo('rechargeGoodDetail',{'id':item.recharge_goods_id})
        }else{
          this.goParas('productView',{'id':item.goods_id,'guid':2})
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/reset.scss";
  .hisgooditem{
    height: 321*$r;
    padding: 32*$r 30*$r 0 29*$r ;
    border-bottom: solid 1px #f2f2f2;
    font-family: PingFang-SC-Medium;
    position: relative;
    @include flex-space;
    justify-content: flex-start;
    align-items: inherit;
    background-color: #ffffff;
    &-headImg{
      width: 180*$r;
      height: 180*$r;
      margin-right: 8*$r;
    }
    &-content{
      width: 75%;
      .title{
        color:#3a3a3a;
        font-size:26*$r;
        @include t-overflow(1);
      }
      .gay{
        color: #898989;
        font-size:24*$r;
      }
      &-percent{
        width: 80%;
        margin-top: 66*$r;
        margin-bottom: 26*$r;
      }
    }
    &-btn{
      position: absolute;
      right: 30*$r;
      top:140*$r;
      width: 90*$r;
      height: 48*$r;
      line-height: 48*$r;
      text-align: center;
      background-color: #fb762a;
      border-radius: 10*$r;
      color: #ffffff;
    }
  }
  .timing{
      height: 321*$r;
      padding: 32*$r 30*$r 0 29*$r ;
      border-bottom: solid 1px #f2f2f2;
      font-family: PingFang-SC-Medium;
      position: relative;
      @include flex-space;
      justify-content: flex-start;
      align-items: inherit;
      background-color: #ffffff;
      &-pro{
        width: 180*$r;
        height: 180*$r;
        margin-right: 8*$r;
      }
      &-content{
        width: 75%;
        p{
          font-size: 28*$r;
          color: #4a4a4a;
          @include t-overflow(1);
        }
        &-item{
          @include t-overflow(1);
          color: #898989;
          .color1{
            color: #4a4a4a;
          }
          .color2{
            color: #1d6b8f;
          }
          .color3{
            color: #fb762a;
          }
        }
        &-time{
          @include flex-space;
          justify-content: flex-start;
          height: 55*$r;
          margin-top: 68*$r;
          div{
            width: 130*$r;
            height: 40*$r;
            background-color: #fb7428;
            border-radius: 8*$r;
            color: #ffffff;
            text-align: center;
            line-height: 40*$r;
            margin-right: 10*$r;
          }
          span{
            font-size: 34*$r;
            color: #fb7428;
          }
        }
      }
  }
  .allProgress-content{
    width: 60%;
    #faster-progress-color{
      width: 115%;
      height: 20*$r;
    }
    p{
      font-size: 28*$r;
      color: #4a4a4a;
    }
    &-progress{
      padding: 18*$r 0 14*$r 0;
    }
    &-text{
      @include flex-space;
      &-item{
        color: #898989;
      }
    }
  }
  .btn{
    // width: 170*$r;
    font-family: PingFang-SC-Regular;
    text-decoration: underline;
    font-size: 24*$r;
    letter-spacing: 1.8px;
    color: #7ab1f6;
    margin-top: 16*$r;
    margin-bottom: 23*$r;
  }
</style>
