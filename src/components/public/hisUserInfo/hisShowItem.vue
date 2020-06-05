<template>
  <div class="hisshowitem">
    <div class="hisshowitem-good">
      <p class="hisshowitem-good-name">{{data.name}}</p>
      <p class="hisshowitem-good-gay">商品期数：{{data.times_num}}</p>
      <div class="hisshowitem-good-bottom">
        <span class="hisshowitem-good-gay">{{data.ctime}}</span>
        <div @click.stop="getGoodType" class="hisshowitem-good-bottom-btn">
          <img src="../../../assets/img/tadeshows.png"/>
          <span>试试手气</span>
        </div>
      </div>
    </div>
    <div class="hisshowitem-good-show" @click="navigateTo('showOrderInfo',{id:data.show_id})">
      <div v-text="data.content" class="hisshowitem-good-gay text"></div>
      <img v-for="item in getArr(data.pics)"  :src="item"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "his-show-item",
    props:['data'],
    methods:{
      getGoodType(){//跳转规则是 购买详情还是兑换详情
        let item = this.data
        if(item.recharge_goods_id){
          this.navigateTo('rechargeGoodDetail',{'id':item.recharge_goods_id})
        }else{
          this.goParas('productView',{'id':item.goods_id,'guid':2})
        }
      },
      getArr(val){
        let arr = val.split(',')
        return arr
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/reset.scss";
  .hisshowitem{
    background-color: #ffffff;
    border-bottom: solid 3px #f2f2f2;
    &-good{
      border-bottom: solid 1px #f2f2f2;
      padding: 26*$r 32*$r 20*$r 32*$r;
      &-name{
        color: #3a3a3a;
        font-size: 26*$r;
      }
      &-gay{
        color: #898989;
        font-size: 24*$r;
      }
      &-bottom {
        @include flex-space;
        margin-top: 36*$r;
        &-btn{
          color: #fb762a;
          line-height: 24*$r;
          @include flex-space;
          img{
            width: 24*$r;
            height: 24*$r;
            margin-right: 12*$r;
          }
        }
      }
      &-show{
        padding: 26*$r 32*$r 20*$r 32*$r;
        .text{
          margin-bottom: 29*$r;
        }
        img{
          width: 100%;
        }
      }
    }
  }

</style>
