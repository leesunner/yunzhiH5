<template>
  <div class="timing">
    <p style="text-align: center;padding: 2px 0 5px;">只显示30天内的数据</p>
    <div class="timing-con">
      <loadMore :bottomDistance='20' :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
        <ul>
          <li v-for="item in data">
            <img class="timing-pro" :src="item.pic" @click.stop="getGoodType(item)">
            <div class="timing-content">
              <p>{{item.name}}</p>
              <div class="timing-content-item">
                <span>商品期数：</span>
                <span class="color1">{{item.times_num}}</span>
              </div>
              <div class="timing-content-item">
                <label>获奖者：</label>
                <span class="color2">{{item.winner_name}}</span>
              </div>
              <div class="timing-content-item">
                <label>幸运号码：</label>
                <span class="color3">{{item.winner_code}}</span>
              </div>
              <div class="timing-content-item">
                <label>TA本期参与：</label>
                <span class="color3" @click.stop="goLookCode(3,item)">{{item.winner_buycount}}</span>
                <span>次</span>
              </div>
              <div class="timing-content-item">
                <label>揭晓时间：</label>
                <span>{{item.etime}}</span>
              </div>
              <div class="timing-content-item">
                <label class="color1">本期参与：</label>
                <span class="color3" @click.stop="goLookCode(1,item)">{{item.buy_count}}</span>
                <span class="color1">次</span>
              </div>
            </div>
          </li>
        </ul>
      </loadMore>
     </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        data:[],
        allLoaded:false,
        page:1,
      }
    },
    created(){
      this.getMsg()
    },
    methods:{
      loadBottom: function(){//上拉加载更多
        this.page++;
        this.getMsg();
        this.allLoaded=true; // 若数据已全部获取完毕
        this.$refs.loadmore.onBottomLoaded();
      },
      goLookCode(val,item){
        let data = JSON.stringify(item)
        this.navigateTo('numbersList',{type:val,'data':data})
      },
      getGoodType(item){//跳转规则是 购买详情还是兑换详情
        if(item.recharge_goods_id){
          this.navigateTo('rechargeGoodDetail',{'id':item.recharge_goods_id})
        }else{
          this.goParas('productView',{'id':item.goods_id,'guid':2})
        }
      },
      getMsg(){
        let that = this
        this.$axios.post('/order/lists?version=v2',{
          qtype:'past',//已完成
          page:this.page,
        }).then(res=>{
          if(res.data.data.list.length>0){
              this.data = this.data.concat(res.data.data.list)
              this.allLoaded=false;
            }else{
              this.$vux.toast.text("内容加载完啦～");
              this.allLoaded=false;
            }
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/reset.scss";
  .timing{
    @include appcontent;
    position: relative;
    padding-top: 0;
    &-con{
      background-color: #ffffff;
      @include ios-Scroll;
      overflow:hidden;
    }
    li{
      height: 260*$r;
      margin: 0 30*$r;
      border-bottom: solid 1px #f2f2f2;
      @include flex-space;
      justify-content: flex-start;
    }
    &-pro{
      width: 162*$r;
      height: 162*$r;
      margin-right: 23*$r;
    }
    &-content{
      width: 60%;
      height: 216*$r;
      line-height: 32*$r;
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
    }
  }
</style>
