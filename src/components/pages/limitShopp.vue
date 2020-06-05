<template>
    <div class="limit-shopp">
        <h2 v-title="'限购专区'">
          <div class="limit-shopp-top">
            <img src="../../assets/images/limitbanner.png"/>
          </div>
          <ul class="limit-shopp-content">
            <li v-for=" (item,index) in limitList" :key="index" @click="getbtn(item.is_buy,item.goods_id)">
                <img class="bgimg" :src="item.pic" alt="" >
                <img class="limitQuoat" src="../../assets/images/limitQuaoat.png" alt="">
                <button v-if="item.is_buy == 0" class="limit-btn" type="button" >立即抢购</button>
                <button v-if="item.is_buy == 1" class="limit-btn" type="button" >已抢购</button>
            </li>
          </ul>
        </h2>
        <div class="limit-bottom" @click="navigateTo('rechargList')">立即充值</div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      limitList:[],//进入商品列表  以及状态
    }
  },
  methods: {
    getCode(){//获取进如商品图
    const that =this;
    this.$axios.get("/active/getPurchaseLimitList?version=v2").then(res=>{
        console.log(res.data);
        if(res.data.code == 200){
          that.limitList=res.data.data.list;
        }else{
          that.$vux.toast.text(res.data.msg)
        }
    })

    },
    getbtn(is_buy,goods_id){//发送请求提交抢购

        this.$router.push({
          name:'productView',
          params:{
            id:goods_id,
            guid:2
          }
        })


    }
  },
  created () {
    this.getCode();
  },
  mounted () {

  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/css/reset";
.limit-shopp{
  width: 100%;
  min-height: 2309*$r;
  background: #ffe7a3;
  .limit-shopp-top{
    // width: 100%;
    // height: 511*$r;
    img{
      width: 100%;
    }
  }
  .limit-shopp-content{
    width: 100%;
    padding: 0 27*$r 1.3rem;
    overflow: hidden;
    margin-bottom: 15*$r;
    li{
      width: 340*$r;
      height: 430*$r;
      float: left;
      margin-bottom: 20*$r;
      background: url("../../assets/images/limitchunk.png") no-repeat;
      background-size: 340*$r 430*$r;
      position: relative;
    .bgimg{
      width: 240*$r;
      height: 240*$r;
      vertical-align: middle;
      display: block;
      margin:  0 auto;
      margin-top:78*$r;
    }
    .limitQuoat{
      width: 84*$r;
      height: 86*$r;
      position: absolute;
      top:56*$r;
      right: 30*$r;
      zoom: 1;
    }
    .limit-btn{
      width:242*$r;
      height: 70*$r;
      background: url("../../assets/images/limitconfirm.png") no-repeat;
      background-size: 242*$r 70*$r;
      display: block;
      margin:0 auto;
      outline: none;
      border: 0;
      font-size: 30*$r;
      color:#fff;
      text-align: center;
      line-height:  70*$r;
    }
    .limit-btn-confirm{
      background: url("../../assets/images/limitcancel.png") no-repeat;
       background-size: 242*$r 70*$r;
    }
    }
    li:nth-child(2n){
      margin-left: 14*$r;
    }

  }
  .limit-bottom{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 1.3rem;
    background: #f68400;
    color: #ffffff;
    text-align: center;
    letter-spacing: 2px;
    line-height: 1.3rem;
    font-size: 0.35rem;
  }
}
</style>
