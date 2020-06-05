<template>
  <div class="home" id="home">
    <div class="home-notice1" v-if="isFixed">
      <!--公告轮播-->
      <div class="home-notice-item">
        <swiper loop :auto="swiperControl" height="35px" direction="vertical" :show-dots="false" :interval="2000">
          <swiper-item  v-for="(item, index) in fixedList" :key="index">
            <p @click="gotoDetail(item)" :class="item.type == 2?'canyu':item.type == 3?'winer':''">
              <img src="../../assets/img/re2.png" v-if="item.type == 3"/>
              <img src="../../assets/img/re1.png" v-else/>
              <span class="buyPro" v-if="item.type == 3">
                恭喜{{item.nickname}}获得<span>{{item.name}}</span>
              </span>
              <span class="buyPro" v-else>
                恭喜{{item.nickname}}购买了<span>{{item.name}}</span>
              </span>
            </p>
          </swiper-item>
        </swiper>
      </div>
    </div>

    <div class="content" id="content">
      <div class="content-con">
      <loadMore :top-method="loadTop" :bottomDistance='20' :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
      <!--轮播-->
      <div class="home-banner"><!--@click="navigateTo(item.url,item.goods_id)-->
        <swiper loop :auto="swiperControl" dots-position="center" dots-class="home-banner-point"  :interval="2500" :duration="700" height="4.8rem">
          <swiper-item  v-for="(item, index) in swiperList" :key="index"><img :src="item.pics" @click="goproDetail(item)"></swiper-item>
        </swiper>
        <!--<img src="../../assets/img/gbanner.png"/>-->
      </div>
      <!--工具-->
      <div class="home-tools">
        <ul>
          <!-- lqlg SMS -->
          <li @click="getToolsDown()" v-if="appType=='H5'&&$channel=='sms'&&$appid=='lqlg'">
            <img src="../../assets/img/appload.png">
            <p>APP下载</p>
          </li>
          <li v-for="(item,index) in tools" @click="getTools(item)" :key="index" v-if="!(item.title.indexOf('新手')>-1&&appType=='H5')">
            <img :src="item.pics">
            <p>{{item.title}}</p>
          </li>
        </ul>
      </div>
      <!--公告-->
      <div class="home-notice" ref="notice">
        <img src="../../assets/img/lb.png"/>
        <!--公告轮播-->
        <div class="home-notice-item">
          <swiper loop :auto="swiperControl" height="27px" direction="vertical" :show-dots="false" :interval="2000">
            <swiper-item  v-for="(item, index) in noticeList" :key="index">
              <p @click="getGoodType(item)">恭喜{{item.nickname}}购买了<span>{{item.name}}</span></p>
            </swiper-item>
          </swiper>
        </div>
      </div>
      <div class="home-buy">
        <div class="home-buy-title">
          <span class="home-buy-title-name">已买商品 / 已兑换商品</span>
          <div class="home-buy-title-more" @click="navigateTo('exChanged')">
            <span>更多</span>
            <img src="../../assets/img/yjtz.png"/>
          </div>
        </div>
        <div class="home-buy-item">
          <ul>
            <li v-for="(item,index) in buyedList" :key="index">
              <img :src="item.pic" @click="getGoodType(item)"/>
              <p>{{item.name}}</p>
              <div class="box-show" v-if="item.etime_int<timeNow">
                <span>获得者</span>
                <span>{{item.winner_id==0?"正在揭晓..." :item.nickname}}</span>
              </div>
              <!--倒计时-->
              <div v-else-if="item.etime_int>=timeNow">
                <time-format :itemData="item" :itemTime="timeNow" @getWinMsg="getWinMsg"></time-format>
              </div>
              <div class="box-show" v-else>
                <span>购买者</span>
                <span>{{item.nickname}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="home-product">
        <div class="home-product-chooseItem">
          <ul>
            <li v-for="(item,index) in tabTitle" :class="{'chooseItem':productChoosen==index}" @click="choosenProduct(index,item.val)" :key="index">{{item.name}}</li>
          </ul>
        </div>
        <div>
          <!--首页商品查询切换-->
          <goodsList @getProductData="getProductData" :list="lists"></goodsList>
        </div>
      </div>
      </loadMore>
      </div>
    </div>
    <!--新人红包领取-->
    <new-user-hb v-if="gift"></new-user-hb>
    <!--立即兑换-->
    <redeem-now :data="productData" v-if="!gift"></redeem-now>
  </div>
</template>

<script>
  import { Swiper,SwiperItem } from 'vux'
  import {mapActions,mapMutations,mapGetters} from 'vuex'
  import goodsList from '@/components/home/goodsList'
  import newUserHb from '@/components/popupView/newUserHb'
  import redeemNow from '@/components/popupView/redeemNow'
  import timeFormat from '@/components/home/timeFormat'
  export default {
    name: "home",
    components:{
      Swiper,
      SwiperItem,
      goodsList,
      newUserHb,
      redeemNow,
      timeFormat
    },
    data(){
      return{
        changSort:'quick',//商品列表筛选条件
        pageIndex:1,
        timeNow:'',
        gift:false,//新人弹窗
        close:false,//新人领奖遮罩
        productChoosen:0,//排序控制变量
        swiperControl:true,//自动播放轮播控制
        swiperList:[],//首页轮播
        noticeList:[],//通知列表
        productData:{},//购买商品信息
        tools:[],
        buyedList:[],//开奖列表
        tabTitle:[
          {name:'最快',val:'quick'},
          {name:'最热',val:'hot'},
          {name:'最新',val:'new'},
          {name:'高价',val:'priceHigh'},
          {name:'低价',val:'priceLow'},
          ],
        dataQQ:{//加qq群
          qqCode:'',
          key:1
        },
        control:'',
        allLoaded:false,//上拉加载更多
        lists:[],
        page: 1,
        priceBy:1,//默认从低到高
        isFixed: false,
        fixedList: []
      }
    },
    computed:{
      ...mapGetters([
        'getUserInfo',
        'getInterController',
      ])
    },
    created(){
      let that = this
      this.getMsg()
      this.getMsgList()
      let se = sessionStorage.getItem('newUserController')
      this.login().then(res=>{//获取登录信息
        if(!that.getUserInfo.user_id&&!se){//控制新手弹框
          this.JsBridge.callHandler("newUserController",true, function (res) {
            if(res!=0||res==true){
              that.gift = true
              sessionStorage.setItem('newUserController',1)
            }
          });
        }
      })
      // this.getDevice()
      this.getappVersion()
      this.getFloatNotice()
    },
    activated(){//使用了keepalive=true,防止页面切换时,出现不必要的意外情况
      this.swiperControl = true
      document.getElementById('content').scrollTop = sessionStorage.getItem('scrollTop')
    },
    deactivated(){//使用了keepalive=true,在页面离开时,手动停止自动轮播,防止卡顿
      this.swiperControl = false
    },
    mounted(){
      let that = this
      let noticeTop = this.$refs.notice.offsetTop
      this.$nextTick(function () {
        document.getElementById('content').addEventListener('scroll',function (e) {
          window.requestAnimationFrame(function () {//优化滚动性能
            sessionStorage.setItem('scrollTop', e.target.scrollTop)
            if (e.target.scrollTop > noticeTop) {
              that.isFixed = true
            } else {
              that.isFixed = false
            }
          })
        })

      })
    },
    filters:{
      formatPrent(val){
        let num = parseInt(val)
        if(num){
          return num
        }else{
          return 0
        }
      }
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
      josnStr(data){
        return JSON.stringify(data)
      },
      getProductData(val){//获取点击商品后返回的商品信息
        this.productData = val
      },
      scrollup(val){
        if(val<=0){
          this.pageIndex = 1
        }
      },
      getQQ(){
        let u = navigator.userAgent;
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if(isiOS){
          if(u.toLowerCase().match(/MicroMessenger/i) == "micromessenger"){
            window.open('http://wpa.qq.com/msgrd?v=3&uin=661546940&site=qq&menu=yes');
          }else{
            window.open('mqqapi://card/show_pslcard?src_type=internal&version=1&uin='+661546940+'&card_type=group&source=qrcode')
          }
        }else{
          if(u.toLowerCase().match(/MicroMessenger/i) == "micromessenger"){
            window.open('http://wpa.qq.com/msgrd?v=3&uin=661546940&site=qq&menu=yes');
          }else{
            window.open('mqqapi://card/show_pslcard?src_type=internal&version=1&uin='+661546940+'&card_type=group&source=qrcode')
          } }
      },
      getTools(i){//工具栏
        //4 qq群
        if (i.type == '4') {
          let that = this
          // that.dataQQ.qqCode = i.url
          if(this.appType=='H5'){
           this.getQQ()
          }else{
            //调取ios提供的方法
            that.dataQQ.qqCode = sessionStorage.getItem('QQ')
            this.JsBridge.callHandler("qqHandler", that.josnStr(that.dataQQ), res=>{});
          }
        } else if (i.type == '5' && this.appType !='H5') {
          this.JsBridge.callHandler("potatoHandler", i.url, res=>{});
        } else {
          if(this.appType=='H5'&&i.url=='greenweal'){//新手下载
            if(this.getPhoneType()=='ios'){
              window.location = 'itms-services:///?action=download-manifest&url=https://app1yyg.oss-cn-huhehaote.aliyuncs.com/download/yyyg_sms_827.plist'
              // window.location = 'itms-services:///?action=download-manifest&url=https://app1yyg.oss-cn-huhehaote.aliyuncs.com/download/lqdb_sms_212.plist'
            }else{
              window.location = 'http://app1yyg.oss-cn-huhehaote.aliyuncs.com/download/yyyg-release-sms.apk'
              // window.location = 'http://app1yyg.oss-cn-huhehaote.aliyuncs.com/download/lqdb-release-sms.apk'
            }
          }else{
            this.navigateTo(i.url)
          }
        }
        /**
         *
            if(i.title.indexOf('Q')==(-1)){
              if(this.appType=='H5'&&i.url=='greenweal'){//新手下载
                if(this.getPhoneType()=='ios'){
                  // window.location = 'itms-services:///?action=download-manifest&url=https://app1yyg.oss-cn-huhehaote.aliyuncs.com/download/yyyg_h5.plist'
                  window.location = 'itms-services:///?action=download-manifest&url=https://app1yyg.oss-cn-huhehaote.aliyuncs.com/download/lqdb_sms_212.plist'
                }else{
                  // window.location = 'http://app1yyg.oss-cn-huhehaote.aliyuncs.com/download/app-yyyg-h5-release.apk'
                  window.location = 'http://app1yyg.oss-cn-huhehaote.aliyuncs.com/download/lqdb-release-sms.apk'
                }
              }else{
                this.navigateTo(i.url)
              }
            } else{
              let that = this
              // that.dataQQ.qqCode = i.url
              if(this.appType=='H5'){//qq群
              this.getQQ()
              }else{
                //调取ios提供的方法
                that.dataQQ.qqCode = sessionStorage.getItem('QQ')
                this.JsBridge.callHandler("qqHandler", that.josnStr(that.dataQQ), res=>{});
              }
            }
        */
      },
      // <!-- lqlg SMS -->
      getToolsDown() {
        if(this.getPhoneType()=='ios'){
          // window.location = 'itms-services:///?action=download-manifest&url=https://app1yyg.oss-cn-huhehaote.aliyuncs.com/download/yyyg_h5.plist'
          window.location = ' https://itunes.apple.com/cn/app/id1448018943?mt=8'
        }else{
          // window.location = 'http://app1yyg.oss-cn-huhehaote.aliyuncs.com/download/app-yyyg-h5-release.apk'
          window.location = 'http://app1yyg.oss-cn-huhehaote.aliyuncs.com/download/app-lqlg-sms-release.apk'
        }
      },
      choosenProduct(index,val){//商品排序切换
        this.productChoosen = index
        if (val == 'priceLow') {
          this.priceBy = 0
          this.changSort = 'price'
        } else if (val == 'priceHigh') {
          this.changSort = 'price'
          this.priceBy = 1
        } else {
          this.changSort = val
          this.priceBy = 1
        }
        this.page = 1
        this.getMsgList(2)
      },
      getMsg(){
        let that =this;
        let platform = 'h5'
        if(this.appType !='H5'){
          if(this.getPhoneType()=='ios'){
            platform = 'iOS'
          }else{
            platform = 'Android'
          }
        }
        this.$axios.post('site/index?version=v2',{'fromin':this.$channel,'platform':platform}).then((res)=>{
          let that = this
          this.timeNow = res.data.time;
          this.tools = res.data.data.icons;
          this.swiperList = res.data.data.banners;
          this.noticeList = res.data.data.comments;
          this.buyedList = res.data.data.public;
          this.tools.forEach(function (item,index) {
            if(item.title.indexOf('Q')>-1){//QQ群号,放入缓存中
              if(that.getPhoneType()=='ios'){
                let qqCode = item.url.split(',')[0]
                sessionStorage.setItem('QQ',qqCode)
              }else{
                let qqKey = item.url
                sessionStorage.setItem('QQ',qqKey)
              }
            }
            if (item.type == '5') {
              sessionStorage.setItem('potato', item.url)
            }
          })
        })
      },
      formatUrl(item){//处理banner链接跳转
        return item.split('/#/')[1]
      },
      goproDetail(item) {
        if (parseInt(item.url) > 0) {
          if(item.recharge_goods_id){
            this.navigateTo('rechargeGoodDetail',{'id':item.recharge_goods_id})
          }else{
            this.goParas('productView',{'id':item.goods_id,'guid':2})
          }
        } else {
          this.navigateTo(item.url)
        }
      },
      getWinMsg(){
        this.login().then(res=>{
            this.getMsg()
        });
      },
      getDevice() {
        // this.JsBridge.registerHandler("getDevice", function (data, responseCallback) {
        //   let dataJson = JSON.parse(data);
        //   sessionStorage.setItem('app', dataJson.app)
        //   sessionStorage.setItem('channel', dataJson.channel)
        //   sessionStorage.setItem('device', dataJson.device)
        // });
      },
      loadTop() {
        this.page = 1
        this.getMsg()
        this.getMsgList()
        this.$refs.loadmore.onTopLoaded();
      },
      loadBottom: function(){//上拉加载更多
        this.page++;
        this.getMsgList(1);
        this.allLoaded=true; // 若数据已全部获取完毕
        this.$refs.loadmore.onBottomLoaded();
      },
      getMsgList(val){//获取商品首页详情
        let that =this;
        this.$axios.get("/goods/lists?version=v2",{
          params:{
            'sort_value':that.priceBy,
            sort:that.changSort,
            page:that.page
          }
        }).then((res)=>{
          if(res.data.code==1){
            if(res.data.data.list.length>0){
              if(val==1){
                that.lists=that.lists.concat(res.data.data.list)
              }else{
                that.lists=res.data.data.list;
              }
              that.winMsg=res.data.win_msg;
              that.loading=false;
              this.allLoaded=false;
            }else{
              this.$vux.toast.text("商品加载完啦～");
              this.allLoaded=false;
            }
          }
        })
      },
      // 寄售宝需要版本号
      getappVersion() {
        let that = this
        that.JsBridge.registerHandler("getappVersion", function (data, responseCallback) {
          sessionStorage.setItem('appVersion', data)
          responseCallback(data);
        })
      },
      // 首页公告滚动窗-浮窗
      getFloatNotice() {
        let that = this;
        that.$axios.get("/site/getSiteNotice?version=v2").then((res) => {
          that.fixedList = res.data.data
        })
      },
      gotoDetail(item) {
        if(item.type == 2){
          this.navigateTo('rechargeGoodDetail',{'id':item.goods_id})
        }else{
          this.goParas('productView',{'id':item.goods_id,'guid':2})
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/reset.scss";
  .home{
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    font-family: 'PingFang SC';
    position: absolute;
    //@include ios-Scroll;
    overflow: scroll;
    padding-top: 88*$r;
    // padding-bottom: 98*$r;
    .content{
      @include appcontent;
      position: relative;
      padding-top: 0;
      &-con{
        @include ios-Scroll;
        overflow: hidden;
      }
    }
    &-banner{
      width: 100%;
      height: 360*$r;
      img{
        width: 100%;
        height: 360*$r;
      }
    }
    &-tools{
      width: 100%;
      height: 160*$r;
      background-color: #ffffff;
      overflow:hidden;
      ul{
        height: inherit;
        @include flex-space;
        overflow-y:auto;
        li{
          width: 20%;
          text-align: center;
          img{
            width: 82*$r;
            height: 82*$r;
          }
          p{
            color:#4a4a4a
          }
        }
        li:nth-child(1){
          margin-left: 15*$r;
        }
        li:nth-last-child(1){
          margin-right: 15*$r;
        }
      }
    }
    &-notice{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 55*$r;
      margin: 10*$r 0;
      background-color: #ffffff;
      font-size: 24*$r;
      img{
        width: 43*$r;
        height: 43*$r;
        margin: 0 20*$r 0 30*$r;
      }
      div{
        height: 55*$r;
        width: 95%;
        line-height: 55*$r;
        @include t-overflow(1);
        p{
          color: #323233;
          @include t-overflow(1);
          span{
            color: #fb762a;
          }
        }
      }
    }
    &-notice1{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 75*$r;
      width: 90%;
      border-radius: 38*$r;
      font-size: 24*$r;
      position: fixed;
      top: 1.5rem;
      left: 50%;
      transform: translateX(-50%);
      z-index: 100;
      img{
        width: 43*$r;
        height: 43*$r;
        margin: 0 20*$r 0 30*$r;
      }
      div{
        height: 75*$r;
        width: 100%;
        line-height: 75*$r;
        border-radius: 38*$r;
        @include t-overflow(1);
        p{
          color: #323233;
          display: flex;
          align-items: center;
          .buyPro{
            color: #323233;
            display: inline-block;
            @include t-overflow(1);
          }
          span{
            color: #fb762a;
          }
        }
        .winer{
          background: #ff3d32;
          opacity:0.8;
          .buyPro{
            color: #ffffff;
          }
          span{
            color: #ffffff;
          }
        }
        .canyu{
          background: #07bf37;
          opacity:0.8;
          .buyPro{
            color: #ffffff;
          }
          span{
            color: #ffffff;
          }
        }
      }
    }
    &-buy{
      background-color: #ffffff;
      margin-bottom: 10*$r;
      &-title{
        height: 86*$r;
        @include flex-space;
        font-size: 26*$r;
        color: #4a4a4a;
        border-bottom: solid 1px #ececec;
        &-name{
          margin-left: 24*$r;
        }
        &-more{
          margin-right: 24*$r;
          span{
            margin-right: 12*$r;
          }
          img{
            width: 12*$r;
            height: 24*$r;
          }
        }
      }
      &-item{
        height: 282*$r;
        font-size: 24*$r;
        ul{
          @include flex-space;
          height: inherit;
          li{
            height: inherit;
            width: 33.333333333333%;
            text-align: center;
            img{
              width: 140*$r;
              height: 140*$r;
              margin-top: 40*$r;
            }
            p{
              color:#4a4a4a;
              padding: 0 8*$r;
              @include t-overflow(1);
            }
            div{
              font-family: "PingFang-SC-Regular";
            }
            .box-show {
              margin-left: 18 * $r;
              margin-top: 4*$r;
              height: 32 * $r;
              @include flex-space;
              justify-content: flex-start;
              font-size: 24*$r;
              span {
                display: block;
                float: left;
                line-height: 32 * $r;
                text-align: center;
                letter-spacing: 1px;
                color: #fff1dd;
                @include t-overflow(1);
              }
              span:nth-child(1) {
                width: 75 * $r;
                height: 32 * $r;
                font-size: 18*$r;
                background-color: #fb762a;
                border-radius: 9*$r;
              }
              span:nth-child(2) {
                width: 137 * $r;
                text-align: left;
                padding-left: 10 * $r;
                color: #fb762a;
              }
            }
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
          }
          li:nth-child(2){
            border-left: solid 1px #ececec;
            border-right: solid 1px #ececec;
          }
        }
      }
    }
    &-product{
      background-color: #ffffff;
      &-chooseItem{
        height: 91*$r;
        border-bottom: solid 1px #ececec;
        ul{
          height: inherit;
          @include flex-space;
          li{
            width: 20%;
            text-align: center;
            line-height: 91*$r;
            font-family: 'PingFang-SC-Medium'!important;
          }
          .chooseItem{
            color: #ec661e;
            border-bottom: solid 1px #ec661e;
          }
        }
      }
    }
  }
</style>
