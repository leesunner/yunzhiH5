<template>
  <div class="tea">
    <p style="padding: 5px 0;text-align: center;background:#f5f5f5;">只显示45天内的数据</p>
    <ul>
      <li v-for="item in data">
        <div class="tea-li">
          <img class="tea-img" :src="item.pic"/>
          <div class="tea-text">
            <p class="tea-text-title">{{item.name}}</p>
            <p>时间：{{item.ctime}}</p>
            <p>状态：<span class="tea-text-statu">{{item.has_address===0?'请在7天内填写地址':item.order_status==2&&item.has_address==1?'未发货':item.order_status==3?'已发货':'已完成'}}</span><span class="tea-text-statu" v-text="item.express_name"></span></p>
          </div>
          <div class="tea-btn" @click="navigateTo('address',{orderId:item.recharge_order_id})" v-if="item.has_address===0?true:false">去填写</div>
        </div>
        <div class="tea-code" v-if="item.express_code">单号：{{item.express_code}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "tea",
    data(){
      return{
        data:[]
      }
    },
    created(){
      this.getMsg()
    },
    methods:{
      getMsg(){
        this.$axios.post('/recharge/orderList?version=v2',{
          type:1,//茶叶礼盒
          page:1
        }).then(res=>{
          this.data = res.data.data.list
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/reset.scss";
  .tea{
    @include ios-Scroll;
    li{
      background-color: #ffffff;
      border-bottom: solid 5px #f5f5f5;
    }
    &-li{
      @include flex-space;
      position: relative;
      justify-content: flex-start;
      padding: 30*$r 25*$r;
      border-bottom: solid 1px #f5f5f5;
    }
    &-img{
      width: 209*$r;
      height: 127*$r;
      margin-right: 40*$r;
    }
    &-text{
      height: 127*$r;
      color: #898989;
      &-title{
        color: #4a4a4a;
      }
      &-statu{
        color: #fb762a;
      }
      &-statu:nth-child(1){
        margin-right: 37*$r;
      }
    }
    &-btn{
      position: absolute;
      right: 29*$r;
      bottom: 30*$r;
      width: 92*$r;
      height: 40*$r;
      border-radius: 2px;
      background-color: #fb762a;
      border: none;
      color: #ffffff;
      text-align: center;
      line-height: 40*$r;
    }
    &-code{
      height: 64*$r;
      line-height: 64*$r;
      text-align: center;
      color: #898989;
    }
  }
</style>
