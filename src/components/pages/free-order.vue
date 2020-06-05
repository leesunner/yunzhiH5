<template>
    <div id="free-order">
        <div class="container">
            <div class="banner"><img src="../../../static/image/free-banner.png" alt=""></div>
            <div class="free-box">
                <div class="free-title">
                  <div class="free-title-img">
                    <p class="free-title-img-text"><span>活动时间:</span> 4月23日到-5月31日</p>
                  </div>
                </div>
                <div class="free-btn" @click="freeOrder">我的免单</div>
                <p>活动时间内: 参与50和100面值话费卡兑换，中奖后，中奖号码尾号逢8返还中奖者当期参与积分的直减积分券，最高返还当期总需50%的积分券。
                    <br>积分券请在【我的免单】中手动领取，积分券有效期3天，请尽快使用。<br>请在活动时间内领取积分券，活动结束未领取的积分券视为放弃领取。
                    <br>本活动最终解释权归本平台所有</p>
            </div>
            <div class="free-block">
                <img src="../../../static/image/free-block.png" alt="">
            </div>
        </div>
        <div class="dc" v-show="show">
          <div class="dc-box">
            <div class="dc-box-title">
              <span>免单记录</span>
              <img src="../../assets/img/gamsecloses.png" @click="show=false"/>
            </div>
            <div class="dc-box-over">
              <ul>
                <li v-for="item in list" >
                  <div class="dc-box-top">
                    <img :src="item.pic">
                    <div class="dc-box-top-text">
                      <p  class="time">开奖时间: {{item.etime}}</p>
                      <p>期号: {{item.times_num}}</p>
                      <p>总需: {{item.join_re}}</p>
                      <p class="color">获奖号码: {{item.winner_code}}</p>
                      <p class="big">本期参与: {{item.buy_count}}</p>
                    </div>
                  </div>
                  <div class="dc-box-btn">
                    <span>{{item.name}}</span>
                    <div :class="!item.status?'yesuse':'nouse'" @click="getOrder(item.order_eight_id)">领取</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
    export default{
        name:'freeOrder',
        data(){
            return{
              list:[],
              show:false,
            }
        },
        created:function(){
            document.title='逢8免单';
            document.getElementsByTagName('meta')['description'].setAttribute('content','活动时间内，活动商品、中奖号码尾号逢8返还中奖者当期参与积分的直减积分券，最高返还当期总需50%的积分券，积分券请在【我的免单】中手动领取，积分券有效期3天，请尽快使用。');
            this.JsBridge.callHandler("shareRight", {type:3, id:0}, function (responseData) {});
        },
        methods:{
            freeOrder (){//获取免单数据
                // this.JsBridge.callHandler("freeOrder", function (responseData) {});
              this.$axios.post('order/eightOrderList?version=v2',{page:1}).then(res=>{
                if(res.data.code==1){
                  this.list = res.data.data.list
                  if(this.list.length<=0){
                    this.$vux.toast.text('还没有记录哦')
                  }else{
                    this.show = true
                  }
                }else{
                  this.$vux.toast.text(res.data.msg)
                }
              })
            },
            getOrder(id){//领取免单
              this.$axios.post('order/getEightOrder?version=v2',{id:id}).then(res=>{
                if(res.data.code==1){
                  this.$vux.toast.text('领取成功!')
                    this.freeOrder()
                }else{
                  this.$vux.toast.text(res.data.msg)
                }
              })
            }
        }
    }
</script>
<style lang="scss" scoped>
  $r: 1rem/75;
  @mixin t-overflow($line:1) {
    //单行文本溢出和多行文本溢出
    @if $line==1 {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    @else {
      display: -webkit-box;
      -webkit-line-clamp: $line;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  @mixin flex-space {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
  }
    #free-order {background:#c82e3a;padding-bottom:10px;}
    #free-order .banner img,#free-order .free-block img{width:100%;}
    #free-order .free-box p{padding:15px; color:#e8e8e8;line-height:2;}
    .free-title{
      overflow: hidden;
    }
    #free-order .free-box {background:url("../../../static/image/free-box.png")no-repeat;background-size:100% 100%; padding:10px 15px;margin-bottom:10px;}
    .free-title-img{width:100%;margin:25px 0 10px;background: url("../../../static/image/free-text.png") no-repeat;background-size: 100% 100%;}
    .free-title-img-text{text-align: center;font-size: 14px;line-height: 1!important;}
    .free-title-img-text span{font-weight: bold;}
    #free-order .free-btn{color:#c82e3a;display:block;background:#f3aa42; padding:5px 25px;border-radius:25px;font-size:14px;margin:0 auto;width: 75px;
        text-align: center;box-shadow:1px 2px 5px #6d6d6d;font-weight:bold;}
  .dc{
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    top: 0;
    left: 0;
    &-box{
      width: 87%;
      height: 773*$r;
      background-color: #feffff;
      border-radius: 10*$r;
      margin: 0 auto;
      margin-top: 46%;
      overflow: hidden;
      z-index: 10;
      &-title{
        letter-spacing: 1.5px;
        color: #3a3a3a;
        font-size: 30*$r;
        @include flex-space;
        margin: 0 28*$r;
        padding: 29*$r 0;
        border-bottom: solid 1px #e5e5e5;
        img{
          width: 24*$r;
          height: 24*$r;
        }
      }
      &-over{
        overflow-x: hidden;
        overflow-y: auto;
        height: 664*$r;
      }
      ul{
        li{
          border-bottom: solid 1px #e5e5e5;
        }
      }
      &-top{
        @include flex-space;
        justify-content: flex-start;
        margin: 29*$r 28*$r;
        img{
          width: 163*$r;
          height: 163*$r;
        }
        &-text{
          color: #898989;
          margin-left: 28*$r;
          p{
            font-size: 20*$r;
          }
          .time{
            font-size: 26*$r;
            font-weight: normal;
            letter-spacing: 0px;
            color: #3a3a3a;
          }
          .color{
            color: #fb762a;
            font-size: 24*$r;
          }
          .big{
            font-size: 24*$r;
          }
        }
      }
      &-btn{
        @include flex-space;
        height: 81*$r;
        background-color: #f5f5f5;
        margin-bottom: 29*$r;
        span{
          color: #3a3a3a;
          font-size: 26*$r;
          margin-left: 30*$r;
          width: 60%;
          @include t-overflow(1);
        }
        div{
          background-color: #fb762a;
          text-align: center;
          width: 131*$r;
          height: 53*$r;
          line-height: 53*$r;
          border-radius: 10*$r;
          color: #ffffff;
          margin-right: 28*$r;
        }
        .nouse{
          background-color: #999999;
        }
      }
    }
  }
</style>
