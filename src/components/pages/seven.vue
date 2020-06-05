<template>
  <div id="seven">
    <img src="static/image/sevenBg.png" class="sevenBg"/>
    <div class="introduce">
      活动期间成功抢购推荐页商品任意款“脱单”的用户，额外奖励10元积分券，联系在线客服领取哦!
    </div>
    <div class="sevenPro">
      <ul>
        <li v-for="(item, index) in proList" v-if="index<6" @click="proDetail(index)">
          <img :src="item.pic"/>
          <button type="button" class="buy" >立即抢购</button>
        </li>

      </ul>
    </div>
    <div class="sevenFooter">
      <button type="button"></button>
      <p>时间：2018年8月13日-2018年8月17日</p>
      <p>10元积分券奖励，联系在线客服进行领取哦。</p>
    </div>
  </div>
</template>
<script>
  export default{
    name:'seven',
    data(){
      return{
        proList:'',
        goodId:''
      }
    },
    created:function(){
      document.title='七元兑老婆';
      this.getData();
    },
    methods:{
      getData:function(){
        var that=this;
        this.$axios.post('/active/qixi?version=v2').then(function (response) {
          if(response.data.code==1){
            var data=response.data.data;
            that.proList=data.list;
          }else{
            that.$vux.toast.text(response.data.msg);
          }
        })
      },
      proDetail:function(index){
        var that=this;
        this.$router.push({name:'productView',params:{id:that.proList[index].goods_id,guid:'2'}})
      }
    }
  }

</script>
<style lang="scss" scoped>
@import "../../assets/css/reset";
  .sevenBg{
    width:getREM(750);
    position:relative;
    img{
      width:100%;
    }
  }
.introduce{
  width: getREM(485);
  height: getREM(106);
  font-family: PingFang-SC-Medium;
  @include font-dpr(13px);
  font-weight: normal;
  font-stretch: normal;
  color: #9b0345;
  position: absolute;
  top:getREM(664);
  left:50%;
  transform: translateX(-50%);
  -o-transform: translateX(-50%);
  -webit-transform: translateX(-50%);
  -moz-transform: translateX(-50%);
}
.sevenPro{
  position:absolute;
  top:getREM(831);
  width:100%;
  padding:0 getREM(41);
  font-size:0;
  ul{
    li{
      display: inline-block;
      width: getREM(320);
      height: getREM(460);
      border-radius: getREM(10);
      background: #fff;
      text-align:center;
      background-size:100%;
      margin-bottom:getREM(23);
      &:nth-of-type(2n){
         margin-left:getREM(26);
       }
      img{
        width:getREM(300);
        height:getREM(300);
        margin-top:getREM(55);
        margin-bottom:getREM(4);
      }
      button{
        width: getREM(240);
        height: getREM(68);
        background-color: #d84385;
        border-radius: getREM(34);
        font-family: PingFang-SC-Regular;
        @include font-dpr(18px);
        font-weight: normal;
        font-stretch: normal;
        color: #ffffff;
      }
    }
  }
}
.sevenFooter{
  position: absolute;
  top:getREM(2529);
  text-align: center;
  width:100%;
  button{
    width: getREM(260);
    height: getREM(77);
    background: url(../../../static/image/hdsm.png) no-repeat;
    background-size: 100%;
    border:none;
    display: block;
    margin: 0 auto getREM(42) auto;
  }
  p{
    width: getREM(507);
    height: getREM(66);
    font-family: PingFang-SC-Medium;
    @include font-dpr(13px);
    line-height:initial !important;
    font-weight: normal;
    font-stretch: normal;
    color: #ff79ab;
    margin: 0 auto;
    text-align: left;
  }
}

</style>
