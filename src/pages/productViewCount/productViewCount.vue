<template>
  <div class="lucky">
    <h2 v-title="'幸运计算公式'"></h2>
    <div class="top">
      <p>幸运计算公式</p>
      <p>(数值A÷总需人数)取余数+100001</p>
    </div>
    <ul class="sion">
      <li class="sionl1">
        <p class="sionTop">数值A</p>
        <p>=	截止该商品开奖时间点前最后100条全站参与记录</p>
        <p>=	<span class="yellow">{{detail.time_total}}</span>
          <img src="../../assets/img/xyarrows.png" alt="">
          <span class="span"  @click="go(falg)">展开</span>
        </p>
      </li>
      <ul class="zkTop" v-if="falg">
        <li class="zkyh">用户</li>
        <li class="zkyh">参与时间</li>
        <div v-for="(item,index) in list" :key="index">
          <li>{{item.nickname}}</li>
          <li>{{item.ptime_date}}<span style="color: #fb762a;">{{item.ptime_time}}</span></li>
        </div>
      </ul>
    </ul>
    <div class="result">
      <p class="result-title">计算结果</p>
      <div>
        <span class="yellow">幸运号码：</span>
        <span class="span">{{winner_code}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        falg:false,
        detail:{
          publish_code:"",
          publish_expect:"",
        },//B值信息集合
        winner_code:'',
        list:'',
      }
    },
    created () {
      this.id=this.$route.params.id;
      this.gocode(this.id);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    mounted(){

    },
    watch:{
      lastTime:function(newVal,oldVal){
        if(newVal != "" && (new Date() < new Date(newVal)) && this.lastTime != ""){
          // this.winner_code="正在等待开奖";
          // this.detail.publish_code ="正在等待开奖";
        }
      }
    },
    methods:{
      gocode(id){
        var that=this;
        this.$axios.post("/goods/calculation?version=v2",{id:id}).then(function(res){
          if(res.data.code == 1){
            that.list=res.data.data.list;
            that.detail=res.data.data.detail;
            that.winner_code=res.data.data.detail.winner_code;
          }else if(res.data.code == -3){
            window.history.go(-1)
          }
          else{
            that.$vux.toast.text(res.data.msg)
          }
        })
      },
      go(flag){
        this.falg=!flag
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/reset";
  .lucky{
    width: 100%;
    background-color: #f7f7f7;
    height: 100%;
    -webkit-overflow-scrolling: touch;
    font-family: 'PingFang-SC-Regular';
    // padding-top: 88*$r;
    .result{
      width: 92%;
      padding: 18*$r 16*$r;
      margin: 0 auto;
      margin-top: 29*$r;
      background-color: #ffffff;
      &-title{
        color: #3a3a3a;
      }
      span{
        vertical-align: middle;
      }
      .yellow{
        color: #fb762a;
      }
      .span{
        color: #1795e9;
      }
    }
    .top{
      width: 92%;
      margin: 0 auto;
      background-color: #fb762b;
      border-radius: 10*$r;
      font-size: getREM(25);
      overflow: hidden;;
      padding: 21*$r 30*$r 21*$r 30*$r;
      margin-top: 20*$r;
      margin-bottom: 17*$r;
      p{
        color: #ffffff;
        font-size: 24*$r;
      }
      p:nth-child(1){
        font-size: 26*$r!important;
      }
    }
    .sion{
      width: 92%;background-color: #fff;
      font-size: getREM(23);
      color: #666666;
      margin: 0 auto;
      li{
        width: 100%;
        // height: getREM(35);
        line-height: getREM(38);
        padding-left:getREM(19);
        .span{
          float: right;
          color: #1795e9;
          font-weight: 700;
          line-height: getREM(50)
        }
        img{
          vertical-align: middle;float: right;margin-right: getREM(50);
          width:getREM(14);height:getREM(24);margin-top:getREM(12);
        }
      }
      .yellow{
        color: #ff6633;font-weight: 700;
      }
      .sionTop{
        padding-top:8*$r;
      }
      .sionl1{
        border-bottom: 2px solid #f7f7f7;padding-top: getREM(5);padding-bottom: getREM(20);
      }
      .sionl2{
        .bquery{
          color:#1895e9;
        }
      }
      .zkTop{
        width: 100%;overflow: hidden;
        div{
          li:nth-child(1){
            @include t-overflow(1);
          }
        }
        li{
          float: left;line-height: getREM(60);
        }
        .zkyh{
          border-bottom: 2px solid #f7f7f7;
          font-weight: 600;
          color: #1795e9 !important;
          font-size: getREM(26);
        }
        li:nth-child(1){
          // color: #919191;
          color: #acacac;
          width: 35% !important;

        }
        li:nth-child(2){
          width: 65% !important;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
      }
    }
  }

</style>

