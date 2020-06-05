<template>
  <div class="exChanged">
    <div class="exChanged-con">
      <div class="exChanged-con-content">
        <loadMore :bottomDistance='20' :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
          <div>
            <!--进度条商品-->
            <div class="exChanged-item" v-for="(item,index) in progressData" :key="index+'a'">
              <div class="exChanged-item-con">
                <div style="position: absolute;top: 0;left: 0;width: 50%;height: 100%;" @click="getGoodType(item)"></div>
                <img class="exChanged-item-con-left" :src="item.pic"/>
                <div class="exChanged-item-con-right1">
                  <div class="allProgress-content"  @click="goLookCode(1,item)">
                    <p>{{item.name}}</p>
                    <p style="padding-top:0.2rem;">开奖进度：<span style="color:#ec661e;">{{(item.join_ed/item.join_re)|formatPrent}}%</span></p>
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
                  <div class="allProgress-btn">
                    <img src="../../assets/img/duis.png" @click="gotoChange(item)"/>
                  </div>
                </div>
              </div>
            </div>
            <!--即将揭晓-->
            <div class="exChanged-item" v-for="(item,index) in data" :key="index">
              <div class="exChanged-item-con">
                <div style="position: absolute;top: 0;left: 0;width: 50%;height: 100%;" @click="getGoodType(item)"></div>
                <img class="exChanged-item-con-left" :src="item.pic"/>
                <div class="exChanged-item-con-right1" style="width: 60%;">
                  <img class="right1-img" v-if="time>item.etime_int&&item.is_winner==2&&item.winner_id!=0" src="../../assets/img/lose.png"/>
                  <div class="right1-img2" v-if="time>item.etime_int&&item.is_winner==1">
                    <img src="../../assets/img/winer.png"/>
                    <span @click="gotoluckyRecord()">领取奖励</span>
                  </div>
                  <!-- 倒计时阶段 -->
                  <div v-if="time<item.etime_int" style="width:100%;">
                    <p class="exChanged-item-con-right1-title">{{item.name}}</p>
                    <p>商品期数: {{item.times_num}}</p>
                    <exchang-time :itemData="item" :itemTime="time" @getWinMsg="getWinMsg"></exchang-time>
                  </div>
                  <!-- 倒计时结束并未及时返回结果 -->
                  <div class="time-content" v-else-if="time>item.etime_int&&item.winner_id == '0' ">
                    <div>
                      <img class="time-content-icon" src="../../assets/img/tm.png">
                      <span class="time-content-statuTitle">即将揭晓:</span>
                    </div>
                    <p class="time-content-statu">正在揭晓...</p>
                  </div>
                  <!-- 已经开奖并有返回结果 -->
                  <div v-else style="width:100%;" class="p-group">
                    <div  v-if="item.avatar" style="position:absolute;height:0.7rem;width:0.7rem;top:1rem;right:1.6rem;border-radius:50%;overflow: hidden;">
                      <img :src="item.avatar" style="width: 100%;height:100%"/>
                    </div>
                    <img v-else src="../../assets/img/default.png" style="position:absolute;height:0.7rem;width:0.7rem;top:1rem;right:1.6rem;border-radius:50%;border:1px solid #ffffff;"/>
                    <p class="exChanged-item-con-right1-title">{{item.name}}</p>
                    <p v-if="item.recharge_goods_id">商品价值: ￥{{item.price}}</p>
                    <p v-else>商品期数: {{item.times_num}}</p>
                    <p style="width: 59%" v-if="item.ptime">购买用户: <span class="fontColor">{{item.nickname}}</span></p>
                    <p style="width: 59%" v-if="item.etime">获奖用户: <span class="fontColor">{{item.nickname}}</span></p>
                    <p v-if="item.coin">赠送积分: <span class="fontColor">{{item.coin}}</span>人次</p>
                    <p v-if="item.join_ed">参与人次: <span class="fontColor">{{item.buy_count}}</span>人次</p>
                    <p v-if="item.winner_code" style="height: 0.8rem;line-height: 0.8rem;">获奖号码:
                      <span class="fontColor">
                        <i v-for="(num,index) in String(item.winner_code).split('')" :key="index">{{num}}</i>
                      </span>
                    </p>
                    <p v-if="item.etime">揭晓时间: {{item.etime}}</p>
                    <p v-if="item.ptime">购买时间: {{item.ptime}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </loadMore>
      </div>
    </div>
  </div>
</template>

<script>
  import exchangTime from '../../components/exchanged/exchangeTime'
  import {mapActions,mapMutations} from 'vuex'
  export default {
    name: "ex-changed",
    components:{exchangTime},
    data(){
      return{
        timeConto:'',
        page:1,
        time:'',
        allLoaded:false,//上拉加载更多
        data:[],//揭晓列表
        setArr:[],
        progressData: []
      }
    },
    computed:{
      ...mapActions([
        'getInterController'
      ])
    },
    created(){
      this.getMsg(1)
      this.getSoonPublish()
    },
    methods:{
      ...mapActions([
        'login'
      ]),
      ...mapMutations([
        'setInterController'
      ]),
      getGoodType(item){//跳转规则是 购买详情还是兑换详情
        if(item.recharge_goods_id){
          this.navigateTo('rechargeGoodDetail',{'id':item.recharge_goods_id})
        }else{
          this.goParas('productView',{'id':item.goods_id,'guid':2})
        }
      },
      loadBottom: function(){//上拉加载更多
        this.page++;
        this.getMsg(1);
        this.allLoaded=true; // 若数据已全部获取完毕
        this.$refs.loadmore.onBottomLoaded();
      },
      loadTop(){
        this.page=1
        this.data = []
        this.getMsg(1)
        this.progressData = []
        this.getSoonPublish()
        this.allLoaded=true; // 若数据已全部获取完毕
        this.$refs.loadmore.onTopLoaded();
      },
      getMsg(val){//获取商品首页详情
        let that =this;
        this.$axios.get("/goods/publish?version=v2",{
          params:{
            page:that.page
          }
        }).then((res)=>{
          if(res.data.code==1){
            let time = res.data.time;
            this.time = res.data.time;
            if(res.data.data.list.length>0){
              let list = res.data.data.list
              if(val=1){
                that.data=that.data.concat(list)
              }else{
                that.data = list
              }
              this.allLoaded=false;
            }else{
              this.$vux.toast.text("加载完啦～");
              this.allLoaded=true;
            }
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
      // 获取即将开奖商品
      getSoonPublish() {
        let that = this;
        that.$axios.get('/newgoods/getSoonPublish?version=v2').then((res) => {
          that.progressData = res.data.data
        })
      },
      gotoChange(item) {
        this.goParas('productView',{'id':item.goods_id,'guid':2})
      },
      gotoluckyRecord() {
        this.navigateTo('luckyRecord')
      }
    },
    filters:{
      formatPrent(val){
        if(val){
          return Math.round(val*100)
        }else{
          return 0
        }
      },
      codeArr(val) {
        if (val) {
          return val.split()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/reset.scss";
  .exChanged{
    @include appcontent;
    overflow: hidden;
    &-con{
      @include appcontent;
      position: relative;
      padding-top: 0;
      padding-bottom: 0;
      &-content{
        position: relative;
        padding-top: 0;
        padding-bottom: 0;
        overflow: hidden;
      }
    }
    &-item{
      height: 260*$r;
      padding-left: 30*$r;
      background-color: #ffffff;
      &-con{
        border-bottom: solid 1px #ececec;position: relative;
        @include flex-space;
        justify-content: flex-start;
        height: inherit;
        &-left{
          width: 180*$r;
          height: 180*$r;
        }
        &-right1{
          margin-left: 27*$r;
          color: #898989;
          font-size: 24*$r;
          display: flex;
          align-items: center;
          position: relative;
          width: 60%;
          &-title{
            display: block;
            width: 70%;
            color: #4a4a4a;
            @include t-overflow(1);
            font-size: 26*$r;
          }
          .right1-img{
            position: absolute;
            top: 50%;
            right: 0;
            width:0.8rem;
            transform: translateY(-50%);
          }
          .right1-img2{
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            text-align: right;
            img{
              width:0.8rem;
            }
            span{
              color: #ec661e;
              text-decoration: underline;
              display: block;
            }
          }
          .fontColor{
            i{
              border: 1px dashed #cccccc;
              padding: 1px 3px;
              font-style: normal;
              color: #000000;
            }
          }
        }
      }
    }
  }
  .time-content{
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
      font-size: 36*$r;
      height: 76*$r;
      color:#fb762a !important;
    }
  }
  .allProgress-content{
    width: 70%;
    #faster-progress-color{
      width: 115%;
      height: 20*$r;
    }
    p{
      font-size: 28*$r;
      color: #4a4a4a;
      @include t-overflow(1);
    }
    &-progress{
      padding: 18*$r 0 14*$r 0;
    }
    &-text{
      @include flex-space;
      &-item{
        color: #898989;
        span:last-of-type{
          color: #ec661e;
        }
      }
    }
  }
  .allProgress-btn{
    margin-left: 1.1rem;
    img{
      width: 0.8rem;
    }
  }
  .p-group{
    p{
      width: 85%;
      @include t-overflow(1);
    }
  }
</style>
