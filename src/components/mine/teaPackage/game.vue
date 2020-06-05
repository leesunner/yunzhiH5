<template>
  <div class="game">
    <p style="padding: 5px 0;text-align: center;background:#f5f5f5;">只显示45天内的数据</p>
    <ul>
      <li v-for="item in data">
          <img class="game-img" :src="item.pic"/>
          <div class="game-text">
            <p class="game-text-title">{{item.name}}</p>
            <p>时间：{{item.ctime}}</p>
            <p class="game-text-statu">礼包码：{{item.express_code}}</p>
          </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "game",
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
          type:2,//游戏礼盒
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
  .game{
    @include ios-Scroll;
    li{
      background-color: #ffffff;
      border-bottom: solid 5px #f5f5f5;
      @include flex-space;
      position: relative;
      justify-content: flex-start;
      padding: 30*$r 25*$r;
      border-bottom: solid 1px #f5f5f5;
    }

    &-img{
      width: 150*$r;
      height: 150*$r;
      margin-right: 24*$r;
    }
    &-text{
      height: 150*$r;
      color: #898989;
      &-title{
        color: #4a4a4a;
      }
      &-statu{
        margin-top: 40*$r;
        color: #fb762a;
      }
    }
  }
</style>
