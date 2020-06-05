<template>
  <div class="faster">
    <!-- <loadMore :bottomDistance='20' :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore"> -->
      <ul>
        <li v-for="(item,index) in list" :class="{'liborder':index%2===0}">
          <img class="faster-pro" :src="item.pic" @click.stop="getGoodType(item)"/>
          <p class="faster-title">{{item.name}}</p>
          <div class="faster-ji" v-if="!item.join_re">
            <div class="faster-ji-num">
              <p class="faster-ji-num-price">{{item.price}}</p>
              <p>赠送积分: {{item.coin}}个</p>
            </div>
            <img class="clickImg" src="../../assets/img/buys.png" @click.stop="buyProduct(item)"/>
          </div>
          <div class="faster-progress" v-else>
            <div class="faster-progress-text">
              <p>开奖进度条: {{getPercent(item)|formatPrent}}%</p>
              <mt-progress id="faster-progress-color" :value="getPercent(item)" :bar-height="4"></mt-progress>
            </div>
            <img @click.stop="setContro(item)" class="clickImg" src="../../assets/img/duis.png"/>
          </div>
        </li>
      </ul>
    <!-- </loadMore> -->
  </div>
</template>

<script>
  import {mapMutations,mapGetters} from 'vuex'
  export default {
    name: "faster",
    props:{
      // sort:{
      //   default:'quick',//分页
      //   type:String,
      // },
      pageIndex:{
        default:1,//分页
        type:Number,
      },
      loading:{
        default:false,
        type:Boolean,
      },
      list: {
        default: [],
        type: Array
      }
    },
    data(){
      return{
        allLoaded:false,//上拉加载更多
        page:this.pageIndex,//防止子组件改变值报错
        priceBy:0,//默认从低到高
        term:'quick',
        datas:[]
      }
    },
    watch:{
      // pageIndex(newVal,o){//父组件下拉时刷新
      //   if(newVal<=1){
      //     this.page = newVal
      //     this.getMsg()
      //   }
      // }
      // sort(n,o){
      //   this.page = 1//初始化页码
      //   if(n=='priceHigh'){
      //     this.term = 'price'
      //     this.priceBy = 1
      //   }else if(n=='priceLow'){
      //     this.term = 'price'
      //     this.priceBy = 0
      //   }else{
      //     this.term = n
      //     this.priceBy = 1
      //   }
      //   this.getMsg(2);//初始化加载列面1:同意条件下分页加载更多,2:初始化加载
      // }
    },
    computed:{
      ...mapGetters([
        'getRedmControl',
        'getUserInfo'
      ]),
    },
    created(){
      // this.getMsg(1)
    },
    methods:{
      getPercent(item){
        let num = item.join_ed/item.join_re
        return num*100
      },
      getGoodType(item){//跳转规则是 购买详情还是兑换详情
        if(item.recharge_goods_id){
          this.navigateTo('rechargeGoodDetail',{'id':item.recharge_goods_id})
        }else{
          this.goParas('productView',{'id':item.goods_id,'guid':2})
        }
      },
      setContro(data){//兑换商品
        if(this.getUserInfo.idx){
          this.setRedmControl(!this.getRedmControl)
          this.$emit('getProductData',data)
        }else{
          this.navigateTo('userLogin')
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
        this.getMsg(1);
        this.allLoaded=true; // 若数据已全部获取完毕
        this.$refs.loadmore.onBottomLoaded();
      },
      // getMsg(val){//获取商品首页详情
      //   let that =this;
      //   this.$axios.get("/goods/lists?version=v2",{
      //     params:{
      //       'sort_value':that.priceBy,
      //       sort:that.term,
      //       page:that.page
      //     }
      //   }).then((res)=>{
      //     if(res.data.code==1){
      //       if(res.data.data.list.length>0){
      //         if(val==1){
      //           that.list=that.list.concat(res.data.data.list)
      //         }else{
      //           that.list=res.data.data.list;
      //         }
      //         that.winMsg=res.data.win_msg;
      //         that.loading=false;
      //         this.allLoaded=false;
      //       }else{
      //         this.$vux.toast.text("商品加载完啦～");
      //         this.allLoaded=false;
      //       }
      //     }
      //   })
      // },
      ...mapMutations([
        'setRedmControl'
      ])
    },
    filters:{
      formatPrent(val){
        let num = parseInt(val)
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
  .faster{
    background-color: #ffffff;
    font-family: 'PingFang SC';
    ul{
      @include flex-space;
      flex-wrap: wrap;
      li{
        width: 50%;
        border-bottom: solid 1px #ececec;
      }
      .liborder{
        border-right: solid 1px #ececec;
      }
    }
    &-pro{
      display: block;
      width: 280*$r;
      height: 280*$r;
      margin: 20*$r auto;
    }
    &-title{
      @include t-overflow(1);
      font-size: 26*$r;
      color: #4a4a4a;
      font-size: 26*$r;
      text-align: left;
      padding-left: 35*$r;
    }
    &-ji{
      @include flex-space;
      height: 106*$r;
      &-num{
        padding: 15*$r 35*$r;
        p{
          font-size: 24*$r;
          color: #898989;
        }
        &-price{
          font-size: 30*$r;
          color: #ec661e !important;
        }
      }
    }
    &-progress{
      @include flex-space;
      height: 106*$r;
      &-text{
        padding: 15*$r 0 15*$r 35*$r;
        p{
          font-size: 24*$r;
          color: #898989;
        }
        #faster-progress-color{
          width: 115%;
          /*height: ;*/
          height: 20*$r;
        }
      }
    }
    .clickImg{
      width: 56*$r;
      height: 56*$r;
      margin-right: 0.4rem;
    }
  }
</style>
