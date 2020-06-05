<template>
  <div class="box-hide">
    <img src="../../assets/images/timeMoney.png" alt="">
    <span>{{newTime}}</span>
  </div>
</template>

<script>
  export default {
    name: "time-format",
    props:['itemData','itemTime'],
    data(){
      return{
        data:'',
        nowTime:'',
        etimeint:'',
        newTime:'',
      }
    },
    created(){
      this.data=this.itemData
      this.nowTime=this.itemTime
      this.timeOut()
    },
    methods:{
      timeOut(){
        let timeData=this.nowTime;//当前
        this.etimeint=this.itemData.etime_int;//结束时间
        let timers=setTimeout(function () {
          if(this.etimeint>timeData){
            this.nowTime+=0.05
            this.newTime=this.dateFormat_f('mm:ss:S',this.etimeint-timeData);
            this.timeOut()
          }else {
            clearInterval(timers)
            this.newTime = '即将揭开...'
            setTimeout(function () {
            this.$emit('getWinMsg',1)
            }.bind(this),250)
          }
        }.bind(this), 50);
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/reset.scss";
  .box-hide {
    // margin-left: 18*$r;
    @include flex-space;
    margin-top: 4*$r;
    height: 32 * $r;
    overflow: hidden;
    color: #f36c12;
    font-size: 24*$r;
    @include flex-center;
    img {
      width: 24 * $r;
      height: 24 * $r;
      margin-top: 2*$r;
    }
    span {
      display: inline-block;
      @include t-overflow(1);
      margin-left: 7.5*$r;
      width: 120 * $r;
    }
  }
</style>
