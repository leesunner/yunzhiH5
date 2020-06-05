<template>
  <div class="rechargItem">
    <loadMore :bottomDistance='20' :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
    <ul>
      <li v-for="item in data">
        <div class="rechargItem-proImg" :style="'background-image:url('+item.pic+')'" @click="getGoodType(item)"></div>
        <div class="rechargItem-context">
          <p class="rechargItem-context-title">{{item.name}}</p>
          <p class="rechargItem-context-name">{{item.desc}}</p>
          <div class="rechargItem-context-text">
            <span>￥{{item.price}}</span>
            <span>库存:{{item.storage}}件</span>
          </div>
          <div class="rechargItem-context-btn" @click.stop="buyProduct(item)">立即购买</div>
        </div>
      </li>
    </ul>
    </loadMore>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    data(){
      return{
        page:1,
        data:[],
        allLoaded:false,
      }
    },
    computed:{
      ...mapGetters([
        'getUserInfo'
      ]),
    },
    created(){
      this.getMsg();
    },
    methods:{
      getGoodType(item){//跳转规则是 购买详情还是兑换详情
        if(item.recharge_goods_id){
          this.navigateTo('rechargeGoodDetail',{'id':item.recharge_goods_id})
        }else{
          this.goParas('productView',{'id':item.goods_id,'guid':2})
        }
      },
      buyProduct(data){//购买商品
        if(this.getUserInfo.idx){
          //条状购买链接
          this.navigateTo('buyPay',{datas:JSON.stringify(data)})
        }else{
          this.navigateTo('userLogin')
        }
      },
      loadBottom: function(){//上拉加载更多
        this.page++;
        this.getMsg();
        this.allLoaded=true; // 若数据已全部获取完毕
        this.$refs.loadmore.onBottomLoaded();
      },
      getMsg(){
        let that = this
        let platform = 'h5'
        if(this.appType !='H5'){
          if(this.getPhoneType()=='ios'){
            platform = 'iOS'
          }else{
            platform = 'Android'
          }
        }
        this.$axios.post('/recharge/lists?version=v2',{type:1,page:this.page,'fromin':this.$channel,'platform':platform}).then((res)=>{
          if(res.data.code===1){
            this.$emit('getCoin',res.data.data.coin_lucky)
            if(res.data.data.list.length>0){
              this.data = this.data.concat(res.data.data.list)
              that.loading=false;
              this.allLoaded=false;
            }else{
              this.$vux.toast.text("商品加载完啦～");
              this.allLoaded=false;
            }
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/reset.scss";
  .rechargItem{
    li{
      padding: 26*$r 25*$r 32*$r 25*$r;
      @include flex-space;
      justify-content: flex-start;
      border-bottom: solid 1px #e2e2e2;
    }
    &-proImg{
      width: 154*$r;
      height: 154*$r;
      border-radius: 16*$r;
      margin-right: 27*$r;
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    &-context{
      font-size: 28*$r;
      position: relative;
      width: 74.5%;
      &-title{
        color: #4a4a4a;
      }
      &-name{
        color: #fb762a;
      }
      &-text{
        @include flex-space;
        margin-top: 30*$r;
        width: 52%;
        span:nth-child(1){
          color: #fb762a;
        }
        span:nth-child(2){
          color: #898989;
        }
      }
      &-btn{
        width: 150*$r;
        height: 58*$r;
        line-height: 58*$r;
        text-align: center;
        color: #ffffff;
        position: absolute;
        background-color: #fb762a;
        border-radius: 10*$r;
        top: 56%;
        right: 0;
      }
    }
  }
</style>
