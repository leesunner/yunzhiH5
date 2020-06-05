<template>
  <div class="goodList" id="goodList">
    <loadMore :top-method="loadTop" :bottomDistance='20' :bottom-method="loadBottom" :bottom-all-loaded="controlBottom" :auto-fill="false" ref="loadmore">
      <ul v-if="goodList.length>0">
        <li v-for="item in goodList">
          <img class="goodList-goodImg" :src="item.pic" @click="getGoodType(item)">
          <div class="goodList-goodContent">
            <p class="goodList-goodContent-name">{{item.name}}</p>
            <div class="goodList-goodContent-intro">
              <div class="goodList-goodContent-intro-text1" v-if="!item.join_re">
                <p>￥{{item.price}}</p>
                <p>赠送积分: {{item.coin}}</p>
              </div>
              <div class="goodList-goodContent-intro-text2" v-else>
                <p>开奖进度条: {{getPercent(item)|formatPrent}}%</p>
                <mt-progress id="progress" :value="getPercent(item)" :bar-height="6"></mt-progress>
              </div>
              <img class="progress-button" :src="item.recharge_goods_id?require('@/assets/img/buys.png'):require('@/assets/img/duis.png')" @click.stop="setProductData(item)"/>
            </div>
          </div>
        </li>
      </ul>
      <div class="nothing" v-else>
        <img src="../../assets/img/ads-none.png">
        <p>暂无商品</p>
      </div>
    </loadMore>
  </div>
</template>

<script>
  import {mapMutations,mapGetters} from 'vuex'
  export default {
    name: "product-list",
    props:{
      dataList:{
        default:[],
        type:Array
      },
      controlBottom:Boolean,
    },
    data(){
      return{
        goodList:this.dataList,
        allLoaded:false,//上拉加载更多
        userInfo:{}//用户信息
      }
    },
    computed:{
      ...mapGetters([
        'getRedmControl',
      ]),
    },
    created(){
      if(JSON.parse(sessionStorage.getItem('userInfo'))!=null){
        this.userInfo =JSON.parse(sessionStorage.getItem('userInfo'))
      }
    },
    activated() {
      document.getElementById('goodList').scrollTop = sessionStorage.getItem('scrollTopType')
    },
    mounted(){
      let that = this
      this.$nextTick(function () {
        document.getElementById('goodList').addEventListener('scroll',function (e) {
          window.requestAnimationFrame(function () {//优化滚动性能
            sessionStorage.setItem('scrollTopType', e.target.scrollTop)
          })
        })
      })
    },
    methods:{
      getPercent(item){
        let num = item.join_ed/item.join_re
        return num*100
      },
      setProductData(data){//兑换弹框
        if(this.userInfo.idx){
          if(data.recharge_goods_id){//识别充值购买商品
            //购买页面
            this.navigateTo('buyPay',{datas:JSON.stringify(data)})
          }else{//兑换弹框
            this.setRedmControl(!this.getRedmControl)
            this.$emit('getProductData',data)
          }
        }else{
          this.navigateTo('userLogin')
        }
      },
      getGoodType(item){//跳转规则是 购买详情还是兑换详情
        if(item.recharge_goods_id){
          this.navigateTo('rechargeGoodDetail',{'id':item.recharge_goods_id})
        }else{
          this.goParas('productView',{'id':item.goods_id,'guid':2})
        }
      },
      loadBottom: function(){//上拉加载更多
        if(!this.controlBottom){
          this.$emit('getMore',true)
        }
        this.$refs.loadmore.onBottomLoaded();
      },
      loadTop() {
        this.$emit('getOnePage')
        this.$refs.loadmore.onTopLoaded();
      },
      ...mapMutations([
        'setRedmControl'
      ])
    },
    watch:{
      dataList:{
        handler(newVal,oldVal){
          this.goodList = newVal
        },
        deep:true,
      },
      controlBottom(){
        console.log('#####3')
      }
    },
    filters:{
      formatPrent(val){
        let num = val.toFixed(0)
        if(num){
          return num
        }else{
          return 0
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/reset.scss";
  .goodList{
    height: 100%;
    overflow: auto;
    @include ios-Scroll;
    li{
      height: 210*$r;
      border-bottom: solid 1px #ececec;
      @include flex-space;
      justify-content: flex-start;
    }
    &-goodImg{
      width: 132*$r;
      height: 132*$r;
      margin: 20*$r 31*$r;
    }
    &-goodContent{
      height: inherit;
      padding-top: 34*$r;
      font-size: 26*$r;
      width: 60%;
      &-name{
        color: #4a4a4a;
        @include t-overflow(1);
      }
      &-intro{
        @include flex-space;
        margin-top: 40*$r;
        font-size: 24*$r;
        &-text1{
          width: 266*$r;
          p{
            color: #898989;
          }
          p:nth-child(1){
            color: #fb762a;
          }
        }
        &-text2{
          width: 266*$r;
          color: #898989;
          #progress{
            margin-top: 10*$r;
            height: 12*$r;
            border-radius: 5px;
          }
        }
        .progress-button{
          width: 56*$r;
          height: 56*$r;
        }
      }
    }
    .nothing{
      img{
        margin-top: 180*$r;
        width: 100%;
      }
      p{
        color: #898989;
        margin-top: 20*$r;
        text-align: center;
      }
    }
  }
</style>
