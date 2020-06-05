<template>
  <div class="lucky-pull">
    <div class="lucky-pull-item">
      <p class="lucky-pull-item-title">{{item.name}}</p>
      <div class="lucky-pull-item-con" @click="goDetail(item)">
        <img class="lucky-pull-item-con-img" :src="item.pic"/>
        <div class="lucky-pull-item-con-text">
          <div class="lucky-pull-item-con-text-item">
            <span>商品期数：</span>
            <span class="color1">{{item.times_num}}</span>
          </div>
          <div class="lucky-pull-item-con-text-item">
            <label>幸运号码：</label>
            <span class="color3">{{item.winner_code}}</span>
          </div>
          <div class="lucky-pull-item-con-text-item">
            <label>本期参与：</label>
            <span class="color3">{{item.buy_count}}</span>
            <span>次</span>
          </div>
          <div class="lucky-pull-item-con-text-item">
            <label>揭晓时间：</label>
            <span>{{item.etime}}</span>
          </div>
        </div>
        <!--表明显示状态-->
        <div class="lucky-pull-item-con-status">{{fillterInfo(item.user_address_id,item.type,item.status_order,item.is_comment)}}</div>
      </div>
      <!--按钮状态-->
      <div :class="{'lucky-pull-item-btn':true,'gray':item.is_comment==1&&item.type==1}" @click.stop="goDetail(item)">{{fillterBtn(item.user_address_id,item.type,item.status_order,item.is_comment)}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      item:{
        default:{},
        type:Object,
      },
      has_auth:Number,
    },
    data(){
      return{
        orderId:'',
      }
    },
    methods:{
      fillterBtn(val,type,status,isOrder){//过滤按钮的显示文字
        if(type===1){
          switch (status){
            case 2:
              if(!this.has_auth){
                return '去认证'
              }else{
                if(val===0){
                  return '确认收货地址'
                }else{
                  return '确认收货'
                }
              }
              break;
            case 3:
              return '待收货'
              break;
            case 4:
              if(isOrder===0){
                return '待晒单'
              }else{
                return '已完成'
              }
              break;
          }
        }else{
          switch (status){
            case 2:
              if(!this.has_auth){
                return '待认证'
              }else{
                if(val===0){
                  return '领取'
                }else{
                  return '待发货'
                }
              }
              break;
            case 3:
              return '已发货'
              break;
            case 4:
              return '已完成'
              break;
          }
        }
      },
      fillterInfo(val,type,status,isOrder){//过滤显示状态
        if(type===1){
          switch (status){
            case 2:
              if(!this.has_auth){
                return '待认证'
              }else {
                if (val === 0) {
                  return '待领取'
                } else {
                  return '待发货'
                }
              }
              break;
            case 3:
              return '待收货'
              break;
            case 4:
              if(isOrder===0){
                return '待晒单'
              }else{
                return '已完成'
              }
              break;
          }
        }else{
          switch (status){
            case 2:
              if(!this.has_auth){
                return '待认证'
              }else{
                if(val===0){
                  return '待领取'
                }else{
                  return '待发货'
                }
              }
              break;
            case 3:
              return '已发货'
              break;
            case 4:
              return '已完成'
              break;
          }
        }

      },
      goDetail(item){//根据物品类型判断去的商品详情
        let that  =this
        this.orderId = item.order_id
        if(!this.has_auth){//去认证
          this.navigateTo('certification')
        }else{
          if(item.type==1){//去实物
            this.navigateTo('realObject',{id:that.orderId})
          }else{//去虚拟
            this.getPass()
          }
        }
      },
      getPass(){
        let that  =this
        this.navigateTo('cardObject',{id:that.orderId})
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/reset.scss";
  .lucky-pull{
    background-color: #ffffff;
    &-item{
      padding-top: 32*$r;
      color: #898989;
      overflow: hidden;
      padding-bottom: 20*$r;
      border-bottom: solid 4px #ececec;
      &-title{
        color: #4a4a4a;
        font-size: 28*$r;
        padding-left: 29*$r;
        margin-bottom: 26*$r;
      }
      &-con{
        height: 179*$r;
        background-color: #f5f5f5;
        @include flex-space;
        justify-content: flex-start;
        position: relative;
        &-img{
          margin-left: 29*$r;
          margin-right: 21*$r;
          width: 100*$r;
          height: 100*$r;
        }
        &-text{
          height: inherit;
          padding-top: 21*$r;
          &-item{
            color: #898989;
            line-height: 34.5*$r;
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
        }
        &-status{
          position: absolute;
          right: 30*$r;
          top:22*$r;
          color: #fb762a;
        }
      }
      &-btn{
        padding: 10*$r 6*$r;
        background-color: #fb762a;
        width: 100*$r;
        text-align: center;
        letter-spacing: 2px;
        color: #ffffff;
        border-radius: 10*$r;
        font-size: 24*$r;
        margin-top: 20*$r;
        margin-left: 83.5%;
      }
      .gray{
        background-color: #bdbdbd;
        color: #ffffff;
      }
    }
    .LuckyInputPass{

    }
  }
</style>
