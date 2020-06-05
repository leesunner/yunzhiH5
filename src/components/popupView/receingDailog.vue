<template>
  <div class="receingTips" @touchmove.prevent>
    <div class="receingTips-zc" @click="close">
      <div class="receingTips-tips">
        <p class="receingTips-tips-title">提示</p>
        <div class="receingTips-tips-con">
          <p>确认领取{{type==1?'卡密':num+'积分'}}</p>
          <p>确认后无法更改</p>
        </div>
        <div class="receingTips-tips-btn" @click.stop="submit">确认</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "receing-dailog",
    props:{
      type:Number,
      num:Number,//积分数量
    },
    data(){
      return{
      }
    },
    methods:{
      close(){
        this.$emit('receingBox',404)
      },
      submit(){
        this.confirmGoods()
      },
      confirmGoods(){//确认领取
        let that = this
        this.$axios.post('/order/confirmAddress?version=v2',{
          'address_id':this.type,
          'order_id':this.$route.query.id
        }).then(res=>{
          if(res.data.code!=1){
            this.$vux.toast.text(res.data.msg)
          }else{
            if(this.type==1){
              this.$vux.toast.text('领取成功')
            }else{
              this.$vux.toast.text('兑换成功')
            }
            this.$emit('receingBox',200)
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/reset.scss";
  .receingTips{
    @include posit-top;
    &-zc{
      position: relative;
      width: inherit;
      height: inherit;
      background-color: rgba(0,0,0,0.6);
    }
    &-tips{
      position: absolute;
      width: 490*$r;
      height: 390*$r;
      top: 0;
      left: 0;
      right: 0;
      bottom:0;
      margin: 55% auto;
      background-color: #ffffff;
      border-radius: 20*$r;
      font-size: 28*$r;
      color: #4a4a4a;
      &-title{
        height: 87*$r;
        text-align: center;
        line-height: 87*$r;
        border-radius: 20*$r;
      }
      &-con{
        text-align: center;
        border-top: solid 1px #ececec;
        p:nth-child(1){
          margin-top: 58*$r;
          margin-bottom: 5*$r;
        }
      }
      &-btn{
        width: 200*$r;
        height: 60*$r;
        background-color: #ff6633;
        border-radius: 30*$r;
        color: #ffffff;
        text-align: center;
        line-height: 65*$r;
        margin: 0 auto;
        margin-top: 43*$r;
      }
    }
  }
</style>
