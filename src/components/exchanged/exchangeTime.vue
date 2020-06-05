<template>
  <div class="exChanged-item-con-right">
    <div>
      <img class="exChanged-item-con-right-icon" src="../../assets/img/tm.png">
      <span class="exChanged-item-con-right-statuTitle">即将揭晓:</span>
    </div>
    <p :class="{'exChanged-item-con-right-statu':true,'change':changControl}">{{newTime}}</p>
  </div>
</template>

<script>
  export default {
    name: "exchange-time",
    props:['itemData','itemTime'],
    data(){
      return{
        data:'',
        nowTime:'',
        etimeint:'',
        newTime:'',
        changControl:false,
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
            if(this.etimeint-timeData<=10){
              this.changControl = true
            }
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
  .exChanged-item-con-right{
    &-icon{
      width: 24*$r;
      height: 24*$r;
      vertical-align: middle;
    }
    &-statuTitle{
      font-size: 26*$r;
      vertical-align: middle;
    }
    &-statu{
      padding-left: 27*$r;
      font-size: 48*$r;
      height: 76*$r;
      color:#fb762a !important;
    }
    .change{
      animation: animat 0.65s ease-in-out infinite;
    }
    @keyframes animat {
      0%{
        transform: scale3d(1,1,1);
      }
      50%{
        transform: scale3d(1.35,1.35,1.35);
      }
      100%{
        transform: scale3d(1,1,1);
      }
    }
  }
</style>
