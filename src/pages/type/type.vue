<template>
  <div class="allProduct">
    <div class="allProduct-product">
      <div class="allProduct-product-chooseItem">
        <ul>
          <li v-for="(item,index) in tabTitle" :class="{'chooseItem':productChoosen==index}" @click="choosenProduct(index)">
            <span>{{item}}</span>
            <img src="../../assets/img/pricepaix.png" v-if="index==4"/>
          </li>
        </ul>
      </div>
    </div>
    <div class="allProduct-pro">
      <!--左边导航tab-->
      <div class="allProduct-pro-left">
        <ul>
          <li @click="getProType(item.sort,item.goods_category_id)" v-for="(item,index) in leftNav" :class="{'activeli':item.sort==proType}">{{item.name}}</li>
        </ul>
      </div>
      <!--右边内容商品区-->
      <div class="allProduct-pro-right">
        <product-list :dataList="data" :controlBottom="controMore" @getMore="getMore" @getOnePage="getOnePage" @getProductData="getProductData"></product-list>
      </div>
    </div>
    <!--立即兑换-->
    <redeem-now :data="productData"></redeem-now>
  </div>
</template>

<script>
  import productList from '@/components/type/productList'
  import redeemNow from '@/components/popupView/redeemNow'
  // import {mapActions} from 'vuex'
  export default {
    name: "find",
    components:{
      productList,
      redeemNow
    },
    data(){
      return{
        proType:0,
        typeId:'',//分类对应的id
        leftNav:[],
        productData:{},//购买商品信息
        productChoosen:0,
        priceBy:0,//默认从低到高
        term:'',
        page:1,
        tabTitle:['全部分类','最热','最快','最新','价值'],
        data:[],//商品集合
        controMore:false,//控制是否继续下拉
      }
    },
    created(){
      this.getMsg(1)
      // this.login()
    },
    activated() {
      // this.getMsg(2)
    },
    methods:{
      // ...mapActions([
      //   'login'
      // ]),
      getProductData(val){//获取点击商品后返回的商品信息
        this.productData = val
      },
      choosenProduct(index){//商品排序切换
        this.productChoosen = index
        switch(index){
          case 0:
            this.term = ''
            this.proType = 0
            this.typeId =''
            break;
          case 1:
            this.term = 'hot'
            break;
          case 2:
            this.term = 'quick'
            break;
          case 3:
            this.term = 'new'
            break;
          case 4:
            this.priceBy==0?this.priceBy=1:this.priceBy=0
            this.term = 'price'
            break;
        }
        this.page = 1
        this.getMsg(2)
      },
      getProType(type,id){//商品类型切换
        this.proType = type
        this.typeId = id
        this.page = 1
        this.getMsg(2)
      },
      getMore(){//加载更多
        this.page++
        this.getMsg(1)
      },
      getMsg(val){//获取商品首页详情
        let that =this;
        this.$axios.get("/goods/lists?version=v2",{
          params:{
            'sort_value':that.priceBy,
            sort:that.term,
            page:that.page,
            cid:that.typeId,
          }
        }).then((res)=>{
          if(res.data.code==1){
            this.leftNav = res.data.data.category//获取左侧类型列表
            if(val==1){
              if(res.data.data.list.length>0){
                that.data=that.data.concat(res.data.data.list)
              }else{
                this.controMore = true
                this.$vux.toast.text("商品加载完啦～");
              }
            }else{//保证 在切换商品类型时,list是空的情况下,controMore可上拉的控制器状态可用
              that.data=res.data.data.list;
              if(res.data.data.list.length>0){
                this.controMore = false
              }else{
                this.controMore = true
                this.$vux.toast.text("商品加载完啦～");
              }
            }
          }
        })
      },
      getOnePage() {
        this.page = 1
        this.data = []
        this.getMsg(1)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/reset.scss";
  .allProduct{
    @include ab-rr;
    background-color: #ffffff;
    &-product{
      background-color: #ffffff;
      position: fixed;
      left: 0;
      width: 100%;
      z-index: 888;
      &-chooseItem{
        height: 91*$r;
        border-bottom: solid 1px #ececec;
        ul{
          height: inherit;
          @include flex-space;
          li{
            width: 20%;
            font-size: 26*$r;
            color: #898989;
            font-family: 'PingFang-SC-Medium';
            text-align: center;
            line-height: 91*$r;
            @include flex-center;
            img{
              margin-left: 15*$r;
              width: 16*$r;
              heigt: 16*$r;
            }
          }
          .chooseItem{
            color: #ec661e;
            border-bottom: solid 1px #ec661e;
          }
        }
      }
    }
    &-pro{
      width: 100%;
      overflow: hidden;
      position: absolute;
      top: 91*$r;
      bottom: 0;
      left: 0;
      @include flex-space;
      &-left{
        width: 158*$r;
        height: 100%;
        overflow: auto;
        @include ios-Scroll;
        ul{
          overflow: auto;
          height: 100%;
          background-color: #f6f6f6;
          li{
            width: 100%;
            height: 93*$r;
            font-size: 26*$r;
            color:#3a3a3a;
            text-align: center;
            line-height: 93*$r;
          }
          .activeli{
            background-color: #ffffff;
            color: #ec661e;
          }
        }
      }
      &-right{
        height: 100%;
        width: 79%;
      }
    }
  }
</style>
