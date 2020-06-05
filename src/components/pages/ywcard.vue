<template>
    <div class="phoneCard">
      <img src="../../assets/images/10000phonebtn.png" alt="" class="btn" @click="goshopp()">
      <ul class="content">
        <li>
          <span>1</span>&nbsp;中奖后请到<label>【我的幸运记录】</label>中进行领取.
        </li>
        <li>
          <span>2</span>&nbsp;领奖方式：
          <p>1.直接兑换积分	</p>
          <p>2.领取卡密</p>
          <p>3.联系客服折现（不领取奖品）</p>
        </li>
        <li>
          <span>3</span>&nbsp;活动商品仅1期，开完即止，听说先到的运气更好哦
        </li>
      </ul>
    </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  created() {
    document.title="掏出10000话费卡搞事情"
  },
  methods: {
    goshopp(){//跳充值商品详情509 id
        const id="27766";
     this.$router.push({
        name:'productView',
        params:{
          id:id,
          guid:"2"
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/css/reset";
.phoneCard{
  width: 100%;
  height:1600*$r;
  background:url("../../assets/images/10000phone.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
  .btn{
    width: 362*$r;
    position: absolute;
    top:580*$r;
    right: 0;
    left: 194*$r;
    bottom: 0;

  }
  .content{
    position: absolute;
    top:850*$r;
    left: 52*$r;
    li{
      line-height: 47*$r;
      color:#3a3a3a;
      font-size: 24*$r;
      span{
        display: block;
        width: 31*$r;
        height: 31*$r;
        float: left;
        border-radius: 17*$r;
        background-color: #f79f95;
        text-align: center;
        line-height: 31*$r;
        margin-top:9*$r;
        color: #fff;
      }
      p{
        padding-left:92*$r;
      }
      label{
        color: #f66353;
      }
    }
  }
}
</style>

