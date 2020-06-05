<template>
  <div class="content">
    <div class="pkking">
      <div class="pkking-top">
        <div class="pkking-top-username">
          <div class="pkking-top-username-con1">
            <img v-if="first" src="../../assets/img/p_02king154.png">
            <div class="text" v-else>{{kingList[0].nickname}}</div>
          </div>
          <div class="pkking-top-username-con2">
            <img v-if="second" src="../../assets/img/p_02king154.png">
            <div class="text" v-else>{{kingList[1].nickname}}</div>
          </div>
          <div class="pkking-top-username-con3">
            <img v-if="three" src="../../assets/img/p_02king154.png">
            <div class="text" v-else>{{kingList[2].nickname}}</div>
          </div>
        </div>
        <span class="pkking-top-copy" v-clipboard:copy="3073810793" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</span>
        <div class="pkking-top-info">
          <div class="pkking-top-info-content">
            <ul>
              <li>
                <div class="one"></div>
                <div class="two">昵称</div>
                <div class="three">连胜次数</div>
                <div class="four">参与次数</div>
                <div class="five">胜利次数</div>
                <div class="six">胜率</div>
              </li>
              <li v-for="(item,index) in data">
                <div class="one">{{index+1}}</div>
                <div class="two">{{item.nickname}}</div>
                <div class="three">{{item.continue_record}}</div>
                <div class="four">{{item.join_num}}</div>
                <div class="five">{{item.win_num}}</div>
                <div class="six">{{Math.ceil(item.win_percent*100)}}%</div>
              </li>
            </ul>
            <p v-if="activeTime.start_time>timeNow">{{Dtime}}</p>
          </div>
        </div>
      </div>
      <div class="pkking-center-induc" v-if="timej">
        <p><span>*</span> 排行榜每<span>{{timej}}分钟</span>更新一次</p >
      </div>
      <div class="pkking-center">
        <div class="pkking-center-content">
          <div :class="{'pkking-center-content-top':true,'pkking-center-content-topCon':dataOver}">
            <img src="../../assets/img/kingGOLDs.png">
            <div class="pkking-center-content-top-num">
              <div class="pkking-center-content-top-num-item" v-for="item in fomratPrice(totalPrice)">{{item}}</div>
              <div class="pkking-center-content-top-num-text">元</div>
            </div>
          </div>
          <div class="pkking-center-content-userlist" v-if="dataOver">
            <span>获奖者: </span>
            <div class="box">
              <ul>
                <li>
                  <span>{{data[7].nickname}}</span>
                  <span class="yy">{{price}}元</span>
                </li>
                <li>
                  <span>{{data[8].nickname}}</span>
                  <span class="yy">{{price}}元</span>
                </li>
                <li>
                  <span>{{data[9].nickname}}</span>
                  <span class="yy">{{price}}元</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="pkking-bottom">
        <div class="pkking-bottom-content">
          <div v-for="item in dataProduct" class="pkking-bottom-content-item" @click="buyGood(item.goods_id)">
            <img :src="item.pics" class="proD">
            <p>{{item.name}}</p>
            <div class="pkking-bottom-content-item-progress">
              <div class="pkking-bottom-content-item-progress-text">
                <p>开奖进度条: {{parseInt(item.join_percent*100)}}%</p>
                <mt-progress class="faster-progress-color" :value="parseInt(item.join_percent*100)" :bar-height="4"></mt-progress>
              </div>
              <div class="pkking-bottom-content-item-progress-btn">兑换</div>
            </div>
          </div>
        </div>
        <p class="bt">--本活动最终解释权归云购团队所有--</p>
      </div>
    </div>
    <div class="pkking-btn" @click="goRecharge">立即充值</div>
  </div>
</template>

<script>
  import timeFormat from '../../../static/js/timeFormat'
  export default {
    name: "p-kking",
    data(){
      return{
        data:[],//排行榜数据源
        kingList:[],
        dataProduct:[],
        totalPrice:0,
        dataOver:false,//活动结束后控制获取奖池的数据显示
        first:true,
        second:true,
        three:true,
        price:0,
        timej: '',
        activeTime:'',
        Dtime:'',
        timeNow:'',
      }
    },
    created(){
      this.getMsg()
    },
    methods:{
      getMsg(){
        //接口信息
        this.$axios.get("site/activepkking?version=v2").then((res) => {
          this.data = res.data.data.rank_list
          this.kingList = res.data.data.king_list
          this.timej = res.data.data.$refrush_time
          this.kingList.forEach((item,index)=>{
            if(item.win_num){
              console.log(index)
              if(index==0){
                this.first = false
              }
              if(index==1){
                this.second = false
              }
              if(index==2){
                this.three = false
              }
            }
          })
          this.dataProduct = res.data.data.goods_list
          this.totalPrice = res.data.data.funds
          this.price = parseInt(this.totalPrice/3)
          this.activeTime = res.data.data.active_time
          this.timeNow = res.data.time
          if(res.data.time>res.data.data.active_time.end_time&&res.data.data.active_time.end_time){
            this.dataOver = true
          }
          // if(res.data.time<this.activeTime.start_time){
          //   this.getDaoTime(this.activeTime.start_time-res.data.time)
          // }
        })
      },
      getDaoTime(t){
        console.log(t)
        let ts = new timeFormat(t*1000)
        // debugger
        let set = setTimeout(function () {
          t-=0.06
          if(t>0){
            this.Dtime = ts.getFormatTime()
            this.getDaoTime(t)
          }else{
            clearTimeout(set)
          }
        }.bind(this),60)
      },
      goRecharge(){//充值按钮
        this.navigateTo('rechargList')
      },
      buyGood(val){//点击商品区详情购买
        this.$router.push({
          name:'productView',
          params:{
            id:val,
            guid:2
          }
        })
      },
      fomratPrice(val){
        let str = val.toString()
        let arr = []
        for(let i=0;i<str.length;i++){
          arr.push(str.charAt(i))
        }
        return arr
      },
      onCopy: function (e) {
        this.$vux.toast.text("复制成功");
      },
      onError: function (e) {
        this.$vux.toast.text("复制失败");
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/reset.scss";
  .content{
    position: relative;
    height: 100%;
    background-color: #040000;
  }
  .pkking{
    @include appcontent;
    padding-bottom: 88*$r;
    padding-top: 0;
    background-color: #040000;
    &-top{
      background: url("../../assets/img/p_01king.png") no-repeat center;
      background-size: 100% 100%;
      min-height: 1088*$r;
      position: relative;
      &-username{
        position: absolute;
        top: 49.3%;
        left: 0;
        right: 0;
        @include flex-space;
        justify-content: flex-start;
        width: 91%;
        height: 80*$r;
        margin: 0 auto;
        div{
          width: 33.3333333333%;
        }
        &-con1{
          img{
            margin-left: 17%;
          }
          .text{
            width: 50%;
            text-align: center;
            color: #ffffff;
            @include t-overflow(1);
          }
        }
        &-con2{
          img{
            margin-left: 11%;
          }
          .text{
            width: 50%;
            text-align: center;
            color: #ffffff;
            @include t-overflow(1);
          }
        }
        &-con3{
          img{
            margin-left: 7%;
          }
          .text{
            width: 50%;
            text-align: center;
            color: #ffffff;
            @include t-overflow(1);
          }
        }
        img{
          width: 46*$r;
          height: 56*$r;
        }
      }
      &-info{
        background: url("../../assets/img/paihangking.png") no-repeat center;
        background-size: 100% 100%;
        width: 94%;
        height: 314*$r;
        overflow-y: hidden;
        position: absolute;
        z-index: 5;
        left: 0;
        right: 0;
        margin: 0 auto;
        bottom: -24*$r;
        padding-top: 16*$r;
        &-content{
          overflow-y: auto;
          overflow-x: hidden;
          width: 94.5%;
          height: 314*$r;
          margin: 0 auto;
          padding-bottom: 20*$r;
          background-color: #ffffff;
          ul{
            // padding-top: 56*$r;
            li{
              @include flex-space;
              height: 46*$r;
              div{
                text-align: center;
                color: #4a4a4a;
              }
              .one{width: 6%;color: #ff6600;}
              .two{width: 14%;@include t-overflow(1);}
              .three{width: 20.4%;color: #ff4800;}
              .four{width: 20.4%}
              .five{width: 19.2%}
              .six{width: 20%}
            }
            /*li:nth-child(1){
              height: 56*$r;
              position: absolute;
              top: 16*$r;
              width: 94.5%;
              left: 0;
              right: 0;
              margin: 0 auto;
              background-color: #ffffff;
            }*/
            li:nth-child(2n){
              background-color: #ebebeb;
              height: 46*$r;
            }
          }
        }
      }
      &-copy{
        position: absolute;
        color: #ffffff;
        background: #ff9001;
        padding: 0 0.1rem;
        border-radius: 0.1rem;
        top: 9.55rem;
        right: 1rem;
        font-size: 0.3rem;
      }
    }
    &-center{
      background: url("../../assets/img/p_02king.png") no-repeat center;
      background-size: 100% 100%;
      min-height: 558*$r;
      position: relative;
      &-induc{
        padding-top: 32*$r;
        padding-left: 5%;
        p{
          color: #ffffff;
          span{
            color:#ff9001;
            margin-right: 4*$r;
          }
          span:nth-child(2){
            margin-right: 0;
          }
        }
      }
      &-content{
        position: absolute;
        width: 57%;
        top: 21%;
        left: 0;
        right: 0;
        margin: 0 auto;
        &-top{
          @include flex-space;
          height: 56*$r;
          margin-top: 7%;
          img{
            width: 183*$r;
            height: 30*$r;
          }
          &-num{
            width: 54%;
            @include flex-space;
            justify-content: flex-end;
            &-item{
              background: url("../../assets/img/kuaiking.png") no-repeat center;
              background-size: 100% 100%;
              width: 46*$r;
              height: 56*$r;
              margin-left: 8*$r;
              color: #000000;
              font-size: 39*$r;
              text-align: center;
              line-height: 56*$r;
            }
            &-item:nth-child(1){
              margin-left: 0;
            }
            &-text{
              width: 46*$r;
              height: 56*$r;
              color: #ffffff;
              padding-left: 10*$r;
              padding-top: 22*$r;
            }
          }
        }
        &-topCon{
          margin-top: 0%;
        }
        &-userlist{
          color: #ffffff;
          @include flex-space;
          justify-content: flex-start;
          align-items: flex-start;
          .box{
            width: 80%;
            height: 74*$r;
            padding-left: 12*$r;
            ul{
              @include flex-space;
              flex-wrap: wrap;
              li{
                width: 48%;
                @include flex-space;
                span:nth-child(1){
                  width: 67%;
                  @include t-overflow(1);
                }
              }
              li:nth-child(2){
                margin-left: 2%;
              }
            }
            .yy{
              color: #ffcc00;
            }
          }
        }
      }
    }
    &-bottom{
      background: url("../../assets/img/p_03king.png") no-repeat center;
      background-size: 100% 100%;
      min-height: 976*$r;
      overflow: hidden;
      margin-bottom: 0.8rem;
      .bt{
        color: #ffffff;
        text-align: center;
        margin-top: 12*$r;
      }
      &-content{
        width: 84%;
        min-height: 752*$r;
        margin: 0 auto;
        margin-top: 12.4%;
        @include flex-space;
        flex-wrap: wrap;
        &-item{
          width: 49%;
          //height: 376*$r;
          margin-bottom: 10*$r;
          position: relative;
          background-color: #ffffff;
          p{
            font-size: 22*$r;
            padding: 0 20*$r;
          }
          .proD{
            display: block;
            width: 73%;
            margin: 0 auto;
            margin-top: 4%;
          }
          &-progress{
            @include flex-space;
            height: 80*$r;
            width: 100%;
            &-text{
              padding: 16*$r 20*$r 16*$r 20*$r;
              p{
                font-size: 20*$r;
                color: #898989;
                padding: 0 0;
              }
              .faster-progress-color{
                width: 120%;
                /*height: ;*/
                height: 20*$r;
              }
            }
            &-btn{
              width: 81*$r;
              height: 36*$r;
              background-image: linear-gradient(90deg,
                #ff9090 0%,
                #ff3333 100%),
              linear-gradient(
                  #ff574e,
                  #ff574e);
              background-blend-mode: normal,
              normal;
              border-radius: 23*$r;
              text-align: center;
              line-height: 36*$r;
              color: #ffffff;
              font-size: 20*$r;
              letter-spacing: 3px;
              margin-right: 18*$r;
              animation: mc 0.8s ease-in infinite;
            }
            @keyframes mc {
              0%{
                transform: scale3d(1,1,1);
              }
              25%{
                transform: scale3d(1.15,1.15,1.15);
              }
              75%{
                transform: scale3d(0.85,0.85,0.85);
              }
              100%{
                transform: scale3d(1,1,1);
              }
            }
          }
          .clickImg{
            width: 56*$r;
            height: 56*$r;
            margin-right: 50*$r;
          }
        }
        &-item:nth-child(2n){
          margin-left: 2%;
        }
      }
    }
    &-btn{
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: 100%;
      height: 88*$r;
      z-index: 100;
      background-color: #ffe6c2;
      color: #333333;
      font-size: 34*$r;
      text-align: center;
      line-height: 88*$r;
    }
  }
</style>
