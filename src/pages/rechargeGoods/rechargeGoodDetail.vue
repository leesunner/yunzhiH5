<template>
  <div class="rechargeGoodDetail">
    <div class="rechargeGoodDetail-img">
      <img :src="data.pics"/>
    </div>
    <p class="rechargeGoodDetail-title">{{data.name}}</p>
    <div class="rechargeGoodDetail-con">
      <span class="color">￥{{data.price}}</span>
      <span>库存:{{data.storage}}件</span>
      <div class="color btn">赠送{{data.coin}}积分</div>
    </div>
    <div class="rechargeGoodDetail-detail" v-html="data.content"></div>
    <div class="rechargeGoodDetail-btn" @click="goBuy">立即购买</div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "recharge-good-detail",
    data(){
      return{
        goodID:'',
        data:{}
      }
    },
    // created(){
    //   this.goodID = this.$route.query.id
    //   this.getMsg()
    // },
    activated () {
      this.goodID = this.$route.query.id
      this.getMsg()
    },
    computed:{
      ...mapGetters([
        'getUserInfo'
      ]),
    },
    methods:{
      goBuy(){
        let that =this
        if(this.getUserInfo.idx){
          this.navigateTo('buyPay',{datas:JSON.stringify(that.data)})
        }else{
          this.navigateTo('userLogin')
        }
      },
      getMsg(){
        let that =this;
        this.$axios.get("/recharge/view?version=v2", {params:{
            id:that.goodID
          }}).then((res)=>{
            if(res.data.code==1){
              this.data = res.data.data
            }else{
              this.$vux.toast.text(res.data.msg)
            }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/reset.scss";
  .rechargeGoodDetail{
    @include appcontent;
    padding-bottom: 0;
    background-color: #ffffff;
    &-img{
      padding-top: 25*$r;
      padding-bottom: 55*$r;
      img{
        display: block;
        height: 278*$r;
        margin: 0 auto;
      }
    }
    &-title{
      color: #4a4a4a;
      font-size: 30*$r;
      padding-left: 30*$r;
      margin-bottom: 25*$r;
    }
    &-con{
      border-bottom: solid 1px #ececec;
      padding-left: 30*$r;
      padding-bottom: 30*$r;
      @include flex-space;
      justify-content: flex-start;
      span{
        color: #898989;
      }
      span:nth-child(2){
        margin-left: 37*$r;
        margin-right: 47*$r;
      }
      .color{
        color: #fb762a;
      }
      .btn{
        width: 146*$r;
        height: 42*$r;
        line-height: 42*$r;
        text-align: center;
        border-radius: 5*$r;
      }
    }
    &-detail{
      padding: 30*$r 30*$r;
    }
    &-btn{
      position: fixed;
      bottom: 0;
      left: 0;
      height: 96*$r;
      width: 100%;
      line-height: 96*$r;
      text-align: center;
      color: #ffffff;
      font-size: 26*$r;
      background-color: #fb762a;
    }
  }
</style>
