<template>
  <div class="accDetails">
    <div class="accDetails-num">
      <span>{{num}}</span>
      <span>积分</span>
    </div>
    <p class="accDetails-del">积分明细 ( 只显示30天内的数据 )</p>
    <loadMore :bottomDistance='20' :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
      <ul>
        <li v-for="(item,index) in data" :key="index">
          <div class="accDetails-right">
            <p>{{item.bak}}</p>
            <p>{{item.ctime}}</p>
          </div>
          <span :class="item.type===0?'':'accDetails-left'">{{item.type===0?'-'+item.coupon:'+'+item.coupon}}</span>
        </li>
      </ul>
    </loadMore>
  </div>
</template>

<script>
  export default {
    name: "account-details",
    data(){
      return{
        data:[],
        num:'',
        allLoaded:false,
        pages:1
      }
    },
    created(){
      this.getMsg()
    },
    methods:{
      getMsg(){
        this.$axios.post('/user/account?version=v2',{page:this.pages}).then(res=>{
          if (res.data.data.list.length>0) {
            this.num = res.data.data.coin_lucky
            this.data = this.data.concat(res.data.data.list)
          } else {
            this.$vux.toast.text('内容加载完啦～');
            this.allLoaded=true;
          }
        })
      },
      loadBottom: function(){//上拉加载更多
        if(!this.allLoaded){
          this.pages++;
          this.getMsg();
          this.allLoaded=true; // 若数据已全部获取完毕
          this.$refs.loadmore.onBottomLoaded();
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/reset.scss";
  .accDetails{
    @include appcontent;
    padding-bottom: 0;
    color: #898989;
    &-num {
      padding: 67*$r 0 54*$r 30*$r;
      background-color: #ffffff;
      color: #4a4a4a;
      font-size: 30*$r;
      span:nth-child(1){
        font-size: 60*$r;
        color: #fb762a;
      }
    }
    &-del{
      padding: 31*$r 0 29*$r 30*$r;
    }
    li{
      height: 100*$r;
      padding: 21*$r 30*$r;
      background-color: #ffffff;
      border-bottom: solid 1px #e5e5e5;
      @include flex-space;
    }
    &-right{
      p:nth-child(1){
        color: #4a4a4a;
      }
    }
    &-left{
      color: #fb762a;
    }
  }
</style>
