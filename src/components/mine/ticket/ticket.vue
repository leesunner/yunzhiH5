<template>
  <div :class="{'ticketItem':true,'ticketItem-gray':type===1}">
    <div class="ticketItem-top">
      <div class="ticketItem-top-lItem">
        <p><span>{{ticketData.coin}}</span><span>积分</span></p>
        <p>{{ticketData.use_limit!=0?'满'+ticketData.use_limit+'元可以使用':'全额抵扣'}}</p>
      </div>
      <div class="ticketItem-top-cItem">
        <p>{{ticketData.name}}</p>
        <p>{{ticketData.etime}}到期</p>
      </div>
      <div class="ticketItem-top-rItem">
        <img v-if="type===0&&time<ticketData.stime_int" src="../../../assets/img/t1.png"/>
        <img v-if="type===0&&time>=ticketData.stime_int" src="../../../assets/img/t3.png"/>
        <img v-if="type==1&&ticketData.status==0&&time<=ticketData.etime_int" src="../../../assets/img/t2.png"/>
        <img v-if="type==1&&ticketData.status==0&&time>ticketData.etime_int" src="../../../assets/img/t4.png"/>
        <img v-if="type==1&&ticketData.status==1" src="../../../assets/img/t5.png"/>
      </div>
    </div>
    <div class="ticketItem-center">
    </div>
    <div class="ticketItem-bottom">
      <p>{{ticketData.use_type==1?'虚拟商品不支持使用':ticketData.use_type==2?'实物商品不支持使用':'全部商品'}}</p>
      <div class="btn" @click="goType">去使用</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ticket",
    // props:{
    //   type:{//区分是未使用的券还是已过期/已使用的
    //     default:1,//未使用
    //     type:Number,
    //   },
    //   time:Number,
    //   ticketData:{
    //     default:{},
    //     type:Object
    //   }
    // },
    props:['type','time','ticketData'],
    methods:{
      goType(){
        if(this.type!=1){
          this.navigateTo('type')
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/reset.scss";
  .ticketItem{
    border-bottom:solid 5px #f5f5f5;
    width: 712*$r;
    margin: 0 auto;
    background-color: #ffffff;
    &-gray{//灰色主题
      -webkit-filter: grayscale(100%);
      filter:progid:DXImageTransform.Microsoft.BasicImage(graysale=1);
    }
    &-top{
      height: 150*$r;
      @include flex-space;
      &-lItem{
        width: 29.33333333333333%;
        margin-left: 40*$r;
        height: inherit;
        margin-top: 30*$r;
        p{
          color: #4a4a4a;
          span{
            font-size: 35*$r;
          }
          span:nth-child(1){
            font-size: 46*$r;
          }
        }
        P:nth-child(1){
          font-weight: bolder;
          color: #fb762a;
          margin-bottom: 22*$r;
        }
      }
      &-cItem{
        color: #999999;
        height: inherit;
        width: 52.33333333333333%;
        margin-top: 52*$r;
        text-align: center;
        p:nth-child(1){
          font-size: 35*$r;
          font-weight: 600;
          margin-bottom: 30*$r;
        }
      }
      &-rItem{
        width: 30.33333333333333%;
        height: inherit;
        margin-top: 33*$r;
        text-align: left;
        img{
          width: 112*$r;
          height: 112*$r;
          margin-left: 18%;
        }
      }
    }
    &-center{
      display: block;
      height: 25*$r;
      width: 100%;
      background: url("../../../assets/img/quangx.png") no-repeat;
      background-size: 100% 100%;
      background-color: #f5f5f5;
    }
    &-bottom{
      height: 48*$r;
      padding-left: 40*$r;
      color: #898989;
      @include flex-space;
      .btn{
        width: 115*$r;
        height: 40*$r;
        background-color: #fb762a;
        text-align: center;
        line-height: 40*$r;
        border-radius: 20*$r;
        color: #ffffff;
        margin-right: 20*$r;
      }
    }
  }
</style>
