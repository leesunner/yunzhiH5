<template>
  <div class="timing-content-time">
    <div>倒计时</div>
    <span>{{newTime}}</span>
  </div>
</template>

<script>
  export default {
    name: "buy-record-time",
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
  @import "@/assets/css/reset.scss";
  .timing-content-time{
    @include flex-space;
    justify-content: flex-start;
    height: 55*$r;
    margin-top: 68*$r;
    div{
      width: 130*$r;
      height: 40*$r;
      background-color: #fb7428;
      border-radius: 8*$r;
      color: #ffffff;
      text-align: center;
      line-height: 40*$r;
      margin-right: 10*$r;
    }
    span{
      font-size: 34*$r;
      color: #fb7428;
    }
  }
</style>
