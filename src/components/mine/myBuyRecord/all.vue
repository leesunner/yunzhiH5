<template>
  <div class="allpro">
    <p style="text-align: center;padding: 2px 0 5px;">只显示30天内的数据</p>
    <div class="allpro-con">
      <loadMore :bottomDistance='20' :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
        <ul class="timing">
          <li v-for="(item,index) in data" :key="index">
            <!-- 已揭晓 -->
            <div style="width:100%;height:100%;" v-if="item.winner_name&&item.etime_int&&item.etime_int<timeNow" class="section">
              <img class="timing-pro" :src="item.pic" @click.stop="getGoodType(item)">
              <div class="timing-content">
                <p>{{item.name}}</p>
                  <div class="timing-content-item">
                    <span>商品期数：</span>
                    <span class="color1">{{item.times_num}}</span>
                  </div>
                  <div class="timing-content-item">
                    <label>获奖者：</label>
                    <span class="color2">{{item.winner_name}}</span>
                  </div>
                  <div class="timing-content-item">
                    <label>幸运号码：</label>
                    <span class="color3">{{item.winner_code}}</span>
                  </div>
                  <div class="timing-content-item">
                    <label>TA本期参与：</label>
                    <span class="color3" @click.stop="goLookCode(3,item)">{{item.winner_buycount}}</span>
                    <span>次</span>
                  </div>
                  <div class="timing-content-item">
                    <label>揭晓时间：</label>
                    <span>{{item.etime}}</span>
                  </div>
                  <div class="timing-content-item">
                  <label class="color1">本期参与：</label>
                  <span class="color3" @click.stop="goLookCode(1,item)">{{item.buy_count}}</span>
                  <span class="color1">次</span>
                </div>
              </div>
            </div>
            <!-- 进行中 -->
            <div style="width:100%;height:100%;" class="section" v-else>
              <img class="timing-pro" :src="item.pic" @click="getGoodType(item)">
              <div class="timing-content" v-if="item.etime_int>timeNow&&item.etime_int"  @click="goLookCode(1,item)">
                <p>{{item.name}}</p>
                <time-format :itemData="item" :itemTime="timeNow" :key="index" @getWinMsg="getWinMsg"></time-format>
              </div>
              <div class="time-content" v-else-if="item.etime_int<timeNow&&!item.winner_name">
                <p>{{item.name}}</p>
                <div>倒计时</div>
                <span>正在揭晓...</span>
              </div>
              <div class="allProgress-content" v-else  @click="goLookCode(1,item)">
                <p>{{item.name}}</p>
                <div class="allProgress-content-progress">
                  <mt-progress id="faster-progress-color" :value="(item.join_ed/item.join_re)|formatPrent" :bar-height="4"></mt-progress>
                </div>
                <div class="allProgress-content-text">
                  <div class="allProgress-content-text-item">
                    <span>总需：</span>
                    <span>{{item.join_re}}</span>
                  </div>
                  <div class="allProgress-content-text-item">
                    <span>剩余：</span>
                    <span>{{item.join_re-item.join_ed}}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </loadMore>
    </div>
  </div>
</template>
<script>
  import timeFormat from './buyRecordTime'
  import {mapActions,mapMutations} from 'vuex'
  export default {
    components: {
      timeFormat
    },
    data(){
      return{
        data:[],
        timeNow:'',
        timeConto:'',
        allLoaded:false,
        page:1,
      }
    },
    created(){
      this.getMsg(1)
    },
    methods:{
      ...mapActions([
        'login'
      ]),
      ...mapMutations([
        'setInterController'
      ]),
      loadBottom: function(){//上拉加载更多
        this.page++;
        this.getMsg(1);
        this.allLoaded=true; // 若数据已全部获取完毕
        this.$refs.loadmore.onBottomLoaded();
      },
      goLookCode(val,item){
        let data = JSON.stringify(item)
        this.navigateTo('numbersList',{type:val,'data':data})
      },
      getGoodType(item){//跳转规则是 购买详情还是兑换详情
        if(item.recharge_goods_id){
          this.navigateTo('rechargeGoodDetail',{'id':item.recharge_goods_id})
        }else{
          this.goParas('productView',{'id':item.goods_id,'guid':2})
        }
      },
      getMsg(val){
        this.$axios.post('/order/lists?version=v2',{
          qtype:'all',//全部
          page:this.page,
        }).then(res=>{
          if(res.data.data.list.length>0){
            if(val=1){
              this.data = this.data.concat(res.data.data.list)
            }else{
              this.data = res.data.data.list
            }
            this.allLoaded=false;
            this.timeNow = res.data.time;
          }else{
            this.$vux.toast.text("内容加载完啦～");
            this.allLoaded=false;
          }
        })
      },
      getWinMsg(){
        this.login().then(res=>{
          this.page = 1
          this.data=[]
          this.getMsg(2)
        });
      },
    },
    filters:{
      formatPrent(val){
        if(val){
          return Math.round(val*100)
        }else{
          return 0
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/reset.scss";
  .allpro{
    @include appcontent;
    position: relative;
    padding-top: 0;
    &-con{
      @include ios-Scroll;
      overflow: hidden;
    }
  }
  .timing{
    background-color: #ffffff;
    li{
      height: 260*$r;
      margin: 0 30*$r;
      border-bottom: solid 1px #f2f2f2;
      @include flex-space;
      justify-content: flex-start;
      .section{
        @include flex-space;
        justify-content: flex-start;
      }
    }
    &-pro{
      width: 162*$r;
      height: 162*$r;
      margin-right: 23*$r;
    }
    &-content{
      width: 60%;
      height: 216*$r;
      line-height: 32*$r;
      p{
        font-size: 28*$r;
        color: #4a4a4a;
        @include t-overflow(1);
      }
      &-item{
        @include t-overflow(1);
        color: #898989;
        .color1{
          color: #4a4a4a;
        }
        .color2{
          color: #1d6b8f;
        }
        .color3{
          color: #fb762a;
        }
      }
      &-time{
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
    }
  }
  .allProgress-content{
    width: 60%;
    #faster-progress-color{
      width: 115%;
      height: 20*$r;
    }
    p{
      font-size: 28*$r;
      color: #4a4a4a;
    }
    &-progress{
      padding: 18*$r 0 14*$r 0;
    }
    &-text{
      @include flex-space;
      &-item{
        color: #898989;
      }
    }
  }
  .time-content{
    p{
      margin-bottom: 68*$r;
    }
    div{
      width: 130*$r;
      height: 40*$r;
      display: inline-block;
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

