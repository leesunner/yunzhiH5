<template>
  <div id="productView">
    <div v-show="showView">
      <h2 v-title="'商品详情'"></h2>
      <!-- <div class="home-notice1">
          <div class="home-notice-item">
            <swiper loop :auto="true" height="78px" :show-dots="false" :interval="3000">
              <swiper-item>
                <div class="notice-item winer-item">
                  <img class="feiji1" src="../../assets/img/feiji1.png"/>
                  <img class="feiji2" src="../../assets/img/feiji2.png"/>
                  <div>
                    <p>恭喜用户wwww获得京东E卡50元充值卡</p>
                  </div>
                </div>
              </swiper-item>
              <swiper-item>
                <div class="notice-item canyu-item">
                  <img class="feiji1" src="../../assets/img/feiji1.png"/>
                  <img class="feiji2" src="../../assets/img/feiji2.png"/>
                  <div>
                    <p>恭喜用户wwww获得京东E卡50元充值卡</p>
                  </div>
                </div>
              </swiper-item>
            </swiper>
          </div>
      </div> -->
      <div id="scrollBox">
        <vue-seamless-scroll :data="listData" :class-option="classOption" class="warp">
          <ul class="item" ref="scrollItem">
            <li v-for="(item,index) in listData" :key="index">
              <div class="notice-item" :class="item.type == '3'?'winer-item': 'canyu-item'">
                <img class="feiji1" src="../../assets/img/feiji1.png"/>
                <!-- <img class="feiji2" src="../../assets/img/feiji2.png"/> -->
                <div v-if="item.type == 3">
                  <p>恭喜{{item.nickname}}获得<span>{{item.name}}</span></p>
                </div>
                <div v-else>
                  <p>{{item.nickname}}购买了<span>{{item.name}}</span></p>
                </div>
              </div>
            </li>
          </ul>
        </vue-seamless-scroll>
      </div>
      <div v-if="haveProduct">
        <div style="position:relative;" v-if="data.detail">
          <swiper :list="data.detail.pics" :show-desc-mask='false' dots-position="center" loop auto :aspect-ratio="1"></swiper>
          <!-- 商品图 -->
          <img src="../../assets/img/stop.png" class="stop" v-if="stopId == '1'"/>
          <div class="detail" @click="toDetail(data.detail.goods_id)">图文<br>详情</div>
        </div>
        <div v-show="guid_detail">
          <div class="pro-info" v-cloak>
            <p class="title">
              <span v-if="winner!=null&&winner!=''&&!timeOut&&nowTime>etime" class="end-tit">已开奖</span>
              <span v-else-if="timeOut" class="ing-tit">倒计时</span>
              <span v-else class="ing-tit">进行中</span>
              {{data.detail.name}}
              <span class="dsc"></span>
            </p>
            <div v-if="winner!=null&&winner!=''&&!timeOut&&nowTime>etime" v-cloak>
              <p class="text"><span>期号：{{data.detail.times_num}}</span><span v-if="data.detail.publish_expect">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{"老时时彩期号：" +data.detail.publish_expect}}</span></p>
              <div class="winnerBox">
                <div class="winner-userImg"><img :src="winner.avatar" @click.stop="toUser(winner)"></div>
                <div class="winner-info" :style="winnerWidth">
                  <p>获奖者：<span>{{winner.nickname?winner.nickname:'**'}}<span v-if="winner.ip!=''">({{winner.ip}})</span></span></p>
                  <p>用户ID：<span>{{winner.user_id}}（唯一不变标识）</span></p>
                  <p>本期参与：<span>{{winner.buy_count}}人次</span> <b @click="winnerNum=true,xx()">查看Ta的号码</b></p>
                  <p>兑换时间：<span>{{winner.etime}}</span></p>
                </div>
                <div class="clear"></div>
                <div class="winnerNum">获奖号码：<span>{{winner.winner_code}}</span>
                  <div class="check-result" style="float: right;margin-top: 8px;" @click="checkResult(data.detail.goods_id)">查看计算详情</div>
                </div>
              </div>
            </div>
            <div v-else-if="timeOut&&nowTime<etime" v-cloak>
              <p class="text"><span>期号：{{data.detail.times_num}}</span><span v-if="data.detail.publish_expect">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{"老时时彩期号：" +data.detail.publish_expect}}</span></p>
              <div class="winnerNum">
                开奖倒计时：<span>{{newTime}}</span>
                <!--开奖倒计时 <span>{{dateFormat_f('mm:ss:S',time) =="00:00:0" ? "正在揭晓..." : dateFormat_f('mm:ss:S',time) }}</span>-->
                <div v-if="publish_type==2" class="check-result" style="float: right;margin-top: 8px;"
                     @click="checkResult(data.detail.goods_id)">查看计算详情</div>
              </div>
            </div>
            <div v-else-if="timeOut == false && winnerType == 1 && data.detail.join_re-data.detail.join_ed == 0&&nowTime>=etime" v-cloak>
              <p class="text"><span >期号：{{data.detail.times_num}}</span><span v-if="data.detail.publish_expect">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{"老时时彩期号：" +data.detail.publish_expect}}</span></p>
              <div class="winnerNum">
                开奖倒计时 <span class="winnerType">正在揭晓...</span>
                <div v-if="publish_type==2" class="check-result" style="float: right;margin-top: 8px;" @click="checkResult(data.detail.goods_id)">查看计算详情</div>
              </div>
            </div>
            <!-- 未开奖进度条 -->
            <div v-if="data.detail.join_re-data.detail.join_ed" v-cloak>
              <p class="text pirceMin"><span>期号：{{data.detail.times_num}}</span><span>{{data.detail.price_min}}积分<em>／人次</em></span></p>
              <div class="progress-bar">
                <p class="u-progress">
                         <span class="pgbar" :style="{width:data.detail.join_ed/data.detail.join_re *100+'%'}">
                              <!--:style="{width:coming.join_ed /coming.join_re *100 + '%'}"-->
                             <span class="pging"></span>
                         </span>
                </p>
              </div>
              <p class="text"><span>总需：{{data.detail.join_re}}人次</span><span class="fr">剩余：<i>{{data.detail.join_re-data.detail.join_ed}}人次</i></span>
              </p>
            </div>

            <div v-show="winnerNum" class="cont" @click="winnerNum=false"></div>
            <div v-show="winnerNum" class="num-box">
              <div class="title">
                <p>{{data.detail.name}}</p>
                <span style="float:right;"><i>{{winner.buy_count}}人次</i></span>
                <div class="clear"></div>
              </div>
              <div class="num-list">
                <p>以下是获奖者的所有兑换号码：</p>
                <ul>
                  <li v-for="code in userCode" :class="{'winnerCode':code.code==winner.winner_code}">{{code.code}}</li>
                </ul>
              </div>
            </div>


            <div class="buy-log">
            <span v-if="data.detail.user_jion==[]|| data.detail.user_jion==null">
                您没有参与本次兑换哦！
            </span>
              <ul v-else style="word-break:normal;position:relative;left: 0;">
                <li>我的号码 ：</li>
                <li v-for="log in data.detail.user_jion"><i>{{log.code}}</i><span>，</span></li>
              </ul>
            </div>
            <b style="text-align:center;line-height:30px;font-size:12px;display:block;">声明：所有商品抽奖活动与苹果公司(apple icn.)无关</b>
            <div class="chart-detail">
              <span>往期走势</span>
              <div @click="gotoChart(data)">
                <span>查看走势图</span>
                <img src="../../assets/img/chart_arrow.png"/>
              </div>
              <img src="../../assets/img/chart_new.png"/>
            </div>
          </div>  <!-- 商品信息 -->

          <div class="table-group">
            <div class="table-btn" @click="listType = 1,page=1,join_log = [],getProList(nowGoodsId)" :class="{borderColor:listType == 1}">本期参与</div>
            <div class="table-btn" @click="listType = 2,page=1,join_log = []" :class="{borderColor:listType == 2}">往期兑换</div>
            <div class="table-btn" @click="listType = 3,page=1" :class="{borderColor:listType == 3}">晒图分享</div>

          </div>
          <div class="list-group">
            <div v-if="listType == 1">
              <p style="line-height:30px;padding:0 15px;margin:20px 0;font-size:14px;" @click="toTopView">荣誉榜<span
                style="float:right;color: #898989;">上榜规则 ></span></p>
              <div style="display:flex;">
                <div class="rank-item">
                  <img v-if="data.detail.topbang.local_tyrant!=null&&data.detail.topbang.local_tyrant!=''" :src="data.detail.topbang.local_tyrant.avatar" @click.stop="toUser(data.detail.topbang.local_tyrant)">
                  <img v-else src="static/image/default-userImg.png">
                  <div class="tuhao"
                       :class="{kong:data.detail.topbang.local_tyrant==null||data.detail.topbang.local_tyrant==''}">
                    土豪
                  </div>
                  <p v-if="data.detail.topbang.local_tyrant!=null&&data.detail.topbang.local_tyrant!=''"
                     class="bangNickname">{{data.detail.topbang.local_tyrant.nickname}}</p>
                  <p v-else class="bangNickname">虚位以待</p>
                  <p>参与
                    <i v-if="data.detail.topbang.local_tyrant!=null&&data.detail.topbang.local_tyrant!=''">{{data.detail.topbang.local_tyrant.total}}</i>
                    <i v-else>?</i>
                    人次
                  </p>
                </div>
                <div class="rank-item">
                  <img v-if="data.detail.topbang.fisrt!=null&&data.detail.topbang.fisrt!=''" :src="data.detail.topbang.fisrt.avatar" @click.stop="toUser(data.detail.topbang.fisrt)">
                  <img v-else src="static/image/default-userImg.png">
                  <div class="tuhao"
                       :class="{kong:data.detail.topbang.fisrt==null||data.detail.topbang.fisrt==''}">沙发
                  </div>
                  <p v-if="data.detail.topbang.fisrt!=null&&data.detail.topbang.fisrt!=''" class="bangNickname">
                    {{data.detail.topbang.fisrt.nickname}}</p>
                  <p v-else class="bangNickname">虚位以待</p>
                  <p>第一个参与</p>
                </div>
                <div class="rank-item">
                  <img v-if="data.detail.topbang.last!=null&&data.detail.topbang.last!=''" :src="data.detail.topbang.last.avatar" @click.stop="toUser(data.detail.topbang.last)">
                  <img v-else src="static/image/default-userImg.png">
                  <div class="tuhao" :class="{kong:data.detail.topbang.last==null||data.detail.topbang.last==''}">
                    包尾
                  </div>
                  <p v-if="data.detail.topbang.last!=null&&data.detail.topbang.last!=''" class="bangNickname">
                    {{data.detail.topbang.last.nickname}}</p>
                  <p v-else class="bangNickname">虚位以待</p>
                  <p>最后一个参与</p>
                </div>
              </div>

              <p style="line-height:40px;border-bottom:1px solid #e8e8e8;padding:0 15px;font-size:12px;margin-top:10px;">
                所有参与记录</p>
              <div class="buy-log-list">
                <ul v-infinite-scroll="loadMoreJoin"
                    :infinite-scroll-disabled="loadingJoin"
                    :infinite-scroll-distance="{usernumJoin}">
                  <li v-for="log in join_log">
                    <div class="log-img">
                      <img :src="log.avatar" @click.stop="toUser(log)">
                    </div>
                    <div class="log-info" :style="logWidth">
                      <p>{{log.nickname}}<span v-if="winner.ip!=''">({{log.ip}})</span></p>
                      <p>参与了<i>{{log.buy_count}}</i>人次 &nbsp;{{log.ptime}}</p>
                    </div>
                    <div class="clear"></div>
                  </li>
                </ul>
                <p style="text-align:center;line-height:40px;color: #999;font-size:12px;" v-if="showMore">已经没有更多了</p>
              </div>
            </div>
            <!-- 往期兑换 -->
            <div v-if="listType == 2">
              <p style="text-align:center;color:#666666;padding-top: 15px;">只显示30天内的数据</p>
              <ul class="history-list"
                  v-infinite-scroll="loadMore"
                  :infinite-scroll-disabled="loading"
                  :infinite-scroll-distance="{usernum}">
                <li v-for="(list,index) in historyList" >
                  <p class="title">第{{list.times_num}}期（获奖时间：{{list.etime}}）</p>
                  <div class="histort-userImg">
                    <img :src="list.avatar" alt="" @click.stop="toUser(list)">
                    <p class="toLook" v-if="theChooseUser==index">点击查看</p>
                  </div>
                  <div :class="{'history-info':true,'history-infoIng':theChooseUser==index}" :style="infoWidth" @click="page=1,join_log = [],tz(list.goods_id,index)">
                    <p>获奖者：{{list.nickname?list.nickname:'**'}}</p>
                    <p>用户ID：{{list.winner_id}}（唯一不变的标识）</p>
                    <p>获奖号码：<i>{{list.winner_code}}</i></p>
                    <p>本期参与人次：<i>{{list.join}}</i>人次</p>
                    <div class="history-infoIng-btn" v-if="theChooseUser==index">
                      <span>回到顶部查看</span>
                      <img src="../../assets/img/proupto.gif">
                    </div>
                  </div>
                  <div class="clear"></div>
                </li>
              </ul>
            </div>
            <div v-if="listType == 3">
              <p style="text-align:center;color:#666666;padding-top: 15px;">只显示30天内的数据</p>
              <ul class="order-group">
                <li v-for="order in showOrderList">
                  <div class="order-img">
                    <img :src="order.avatar" @click.stop="toUser(order)">
                  </div>
                  <div class="order-info" :style="orderWidth">
                    <p class="name">{{order.nickname}}<span @click="toHistoryView(order.goods_id)">试试手气</span>
                    </p>
                    <p class="content">{{order.content}}</p>

                    <img v-for="img in order.pics" :src="img" alt="" class="img-group">
                    <p>{{order.etime}}</p>
                    <p class="orderTools">
                      <span class="orderLove" @click="showLove(order.show_id)">点赞 {{order.love}}</span>
                      <span class="orderShare" @click="share(order.show_id)">扩散</span>
                      <span class="orderComment" @click="comment(order.show_id)">评论 {{order.comment}}</span>
                    </p>

                  </div>
                  <div class="clear"></div>
                </li>
                <p style="text-align: center;line-height: 40px;color: rgb(153, 153, 153);font-size: 12px;">
                  已经没有更多了</p>
              </ul>
            </div>
          </div>

          <div style="height:50px;"></div>
          <!-- <div v-if="winner!=null&&winner!=''" class="historyBtn">
            <div style="flex:4;background:#3399fe;">新的一期正在火热进行中···</div>
            <div style="flex:2;background:#f76800;" @click="toLast(new_goods_id)">立即前往</div>
          </div>
          <div class="buyBtn" v-else>
            <div class="btn" @click="buy(data.detail)" v-if="isindex == '0'">立即兑换</div>
          </div> -->
          <div v-if="data.detail.join_re-data.detail.join_ed == 0" class="historyBtn">
            <div style="flex:4;background:#3399fe;">新的一期正在火热进行中···</div>
            <div style="flex:2;background:#f76800;" @click="join_log=[],toLast(new_goods_id)">立即前往</div>
          </div>
          <div class="buyBtn" v-else>
            <div class="btn" @click="buy(data.detail)" v-if="isindex == '0'">立即兑换</div>
          </div>
        </div>
        <div style="position: absolute; top: 0;" v-show="!guid_detail">
          <img v-show="guid_pic" src="static/image/goods_guid_2.png" @click="guidFun" width="100%" style="margin-bottom: -10px"/>
          <img v-show="!guid_pic" src="static/image/goods_guid_1.png" @click="guidFun" width="100%" style="margin-bottom: -10px"/>
        </div>
      </div>
      <div v-else class="productNone" v-cloak>
        <div class="con" v-show="loadingDown">
          <img src="static/image/haveProduct.png"/>
          <p>商品已经下架</p>
        </div>
      </div>
      <!--立即兑换-->
      <redeem-now :data="productData"></redeem-now>
      <!--分享-->
      <share-view :data="shareData"></share-view>
    </div>
  </div>
</template>
<script>
  // import { Swiper } from 'vux';
  import { Swiper,SwiperItem } from 'vux'
  import {mapGetters,mapMutations} from 'vuex';
  import { setInterval } from 'timers';
  import redeemNow from '@/components/popupView/redeemNow'
  import shareView from '../public/shareView'
  export default{
    name: "productView",
    components: {Swiper,SwiperItem,redeemNow,shareView,vueSeamlessScroll},
    data(){
      return {
        loading:false,//false为滚动
        loadingJoin:false,
        page:1 ,//页码
        limit:"10",//每页显示条数
        listType: 1,
        infoWidth: "",    //往期info宽度
        winnerWidth: "",   //获奖者info宽度
        logWidth: "",        //记录info宽度
        orderWidth: "",    //订单info宽度
        data: {                              //商品详情
          detail: {
            user_jion: [],
            price_min:'',     //多少积分每次
            topbang: {
              first: {},
              last: {},
              local_tyrant: {}
            }
          },
        },

        goods_base_id: "",       //往期商品id
        historyList: [],          //往期记录
        showOrderList: [],            // 晒单记录
        winner: "",
        new_goods_id: "",       // 最新期id
        join_log: [],         // 参与记录
        winnerNum:false,
        goods_id:"",
        userCode:"",
        timeOut:false,            //倒计时界面
        time:"",
        aCount:1,              //倒计时显示
        etime:"",          //揭晓时间
        guid_detail:false, //显示详情还是新手引导
        guid_pic:true,   //第1张还是第2张
        haveProduct:false,  //商品是否下架
        loadingDown:false,//请求响应是否获得c
        publish_type:"",//查看计算详情  开奖类型参数 1 速开 2 b值
        isindex:"",//判断立即兑换是否隐藏，用于0元购活动
        usernum:5,
        usernumJoin:5,
        publish_expect:"",
        winnerType:"",//时时彩开奖时间结束中奖者未开出情况判断参数
        productData:{},
        shareData:{},
        stopId: '',// winner_id为1时显示图片
        listData: [],
        nowTime: '',// 现在时间
        newTime: '',
        entime: '',
        theChooseUser:0,
        showView:false,
        showMore:false,
        pages:1,
        nowGoodsId:'',
      }
    },
    computed:{
      ...mapGetters([
        'getUserInfo',
        'getRedmControl',
      ]),
      classOption: function () {
        return {
          step: 1,
          limitMoveNum: 5,
          openTouch: false,
          waitTime: 1,
          direction: 2,
          singleWidth: 30
        }
      }
    },
    created() {
      let proView = sessionStorage.getItem('goods_base_id')
      this.nowGoodsId = this.$route.params.id
      if (!proView) {
        this.getData(this.nowGoodsId);
        this.getProList(this.nowGoodsId)
        this.guid_detail = this.$route.params.guid>0;
        this.setTime();
        this.scrollTop();
      }
    },
    activated(){
      let proView = sessionStorage.getItem('goods_base_id')
      this.nowGoodsId = this.$route.params.id
      this.page = 1
      this.join_log = []
      if (proView) {
        this.getData(this.nowGoodsId);
        this.getProList(this.nowGoodsId)
        this.guid_detail = this.$route.params.guid>0;
        // this.setTime();
        this.scrollTop();
      }
    },
    beforeRouteLeave(to, from ,next){
      this.listType = 1
      this.page = 1
      this.pages = 1
      this.showView = false
      this.join_log = []
      this.showOrderList = []
      this.historyList = []
      next()
    },
    deactivated() {
      this.setRedmControl(false)
    },
    mounted: function () {
      this.infoWidth = 'width:' + (document.body.clientWidth * 1 - 120) + 'px;';
      this.winnerWidth = 'width:' + (document.body.clientWidth * 1 - 130) + 'px;';
      this.logWidth = 'width:' + (document.body.clientWidth * 1 - 98) + 'px;';
      this.orderWidth = 'width:' + (document.body.clientWidth * 1 - 115) + 'px;';
      this.getFloatNotice()
    },
    methods: {
      ...mapMutations([
        'setRedmControl'
      ]),
      xx(){//查看ta的号码
        var that=this;
        if(this.winner.winner_code!=null){
          this.$axios.post('/newgoods/usercode?version=v2', {goods_id: this.goods_id,winner_id:this.winner.user_id}).then(function (response) {
            if (response.data.code == 1) {
              that.userCode = response.data.data;
            } else {
              that.$vux.toast.text(response.data.msg)
            }
          });
        }
      },
      loadMore(){
        this.loading=false;
        this.pages++;
          this.history()

      },
      loadMoreJoin(){
        this.loadingJoin=false;
        this.page++;
          this.getProList(this.nowGoodsId);
      },
      tz(goodis,index){//跳转往期详情
        // alert(goodis)
        // window.location.reload();
        this.nowGoodsId = goodis
        this.getData(goodis)
        this.getProList(goodis);
        // this.$router.push({
        //   name:"productView",
        //   params:{
        //     id:goodis,
        //     guid:2
        //   }
        //  document.documentElement.scrollTop =0;
        window.scrollTo(0,0);
        this.theChooseUser = index
        // })
      }
      ,
      scrollTop:function(){
        window.scrollTo(0,0);
      },
      getProList(id){//获取参与记录
        let that = this
        this.$axios.post('newgoods/getJoinLog?version=v2', {id: id,page:that.page,limit:that.usernumJoin}).then(function (res) {
          if(res.data.code==1){
            if( res.data.data.list.length <=0){
              that.loadingJoin=true;
              // that.usernum=res.data.data.list.length;
              if(that.page<=1){
                that.join_log=res.data.data.list
              }
              that.showMore = true
            }else{
              that.join_log =that.join_log.concat(res.data.data.list);//每次往数组里面加10条信息
            }
          }else{
            that.$vux.toast.text(res.data.msg);
          }
        })
      },
      getData: function (id) {           //获取商品详情
        var that = this;
        this.$axios.post('newgoods/view?version=v2', {id: id}).then(function (response) {
          // console.log(response.data.data);
          if (response.data.code == 1) {
            that.showView = true
            if(response.data.data==null){
              that.loadingDown=true;
              that.haveProduct=false;
            }else {
              that.haveProduct=true;
              that.loadingDown=false;
              that.data = response.data.data;
              that.winner = response.data.data.winner; //获奖者数组
              that.new_goods_id = response.data.data.detail.new_goods_id;           //最新id
              that.goods_base_id = response.data.data.detail.goods_base_id;        //往期id
              that.goods_id = response.data.data.detail.goods_id;        //当前期商品id
              that.etime = response.data.data.detail.etime;
              that.stopId = response.data.data.detail.winner_id;
              that.nowTime = response.data.time;
              // that.ptime =response.data.data.detail.ptime;
              that.isindex=response.data.data.detail.index_hide;
              that.publish_type=response.data.data.detail.publish_type;
              // console.log(that.isindex)
              //放到缓存中,分享商品信息
              sessionStorage.setItem('goods_base_id',that.goods_base_id)
              // console.log(response.data.data.detail.publish_type);
              that.historyList = []
              that.history();        // 往期兑换和晒单  中奖者号码
              if (that.etime != '0') {
                that.setTime1();
              }
              // that.JsBridge.callHandler("shareRight", {type: 1, id: that.goods_base_id}, function (responseData) {
              // });
            }

          }else {
            that.$vux.toast.text(response.data.msg);
          }
        })
      },
      guidFun:function () { //新手引导
        this.guid_pic = !this.guid_pic;
        this.guid_detail = this.guid_pic;
      },
      setTime:function(){
        let that = this;
        let date = that.nowTime;
        if(this.etime>date){
          that.timeOut = true;
          setTimeout(function() {
            that.time = (that.etime-date);//得到倒计时时间
            that.setTime()
          },1);

        }else{
          that.time = 0 ;
          that.timeOut = false;
          if(that.winner == ""){
            that.winnerType=1;
          }
        }
      },
      setTime1(){
        let that = this;
        let timeData=that.nowTime;//当前
        let timers=setTimeout(function () {
          if(that.etime>timeData){
            that.timeOut = true;
            that.nowTime+=0.05
            if(that.etime-timeData<=10){
              that.changControl = true
            }
            that.newTime=that.dateFormat_f('mm:ss:S',that.etime-timeData);
            that.setTime1()
          }else {
            clearInterval(timers)
            that.timeOut = false;
            // setTimeout(function () {
            //   setTime1.$emit('getWinMsg',1)
            // }.bind(this),250)
          }
        }.bind(this), 50);
      },
      history: function () {          //获取往期兑换列表
        let that = this;
        this.$axios.post('/newgoods/goodsrounds?version=v2', {goods_base_id: this.goods_base_id,limit:10,page:that.pages}).then(function (response) {
          if (response.data.code == 1) {
            if(response.data.data!=null){
              if(response.data.data.length <= 0){
                that.loading=true;
                // that.usernum=response.data.data.length;
                if(that.pages<=1){
                  that.historyList=response.data.data;//每次往数组里面加10条信息
                }
              }else {
                that.historyList = that.historyList.concat(response.data.data);//每次往数组里面加10条信息
              }
            }
          } else {
            that.$vux.toast.text(response.data.msg)
          }
        });
        this.$axios.post('/newgoods/goodsshow?version=v2', {goods_base_id: this.goods_base_id}).then(function (response) {
          if (response.data.code == 1) {
            that.showOrderList = response.data.data;
            // console.log(response.data.data)
          } else {
            that.$vux.toast.text(response.data.msg)
          }
        });
        // if(this.winner.winner_code!=null){
        //     this.$axios.post('/newgoods/usercode?version=v2', {goods_id: this.goods_id,winner_id:this.winner.user_id}).then(function (response) {
        //         if (response.data.code == 1) {
        //             that.userCode = response.data.data;
        //         } else {
        //             that.$vux.toast.text(response.data.msg)
        //         }
        //     });
        // }
      },
      toHistoryView: function (id) {    //查看往期获奖情况或跳到最新期
        this.nowGoodsId = id
        this.page = 1
        this.getData(id);
        this.getProList(id);
        this.$router.replace({
          name:"productView",
          params:{id:id},
          query: {time: new Date().valueOf()},
          replace: true
        })
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      },
      toLast:function(id){
        this.nowGoodsId = id
        let that =this
        if(this.getUserInfo.idx) {
          if (this.data.detail.times_num === this.data.detail.latest_times) {
            this.$vux.toast.text("商品已卖完")
          } else {
            this.page = 1
            this.getProList(id);
            this.getData(id);
            this.$router.replace({
              name: "productView",
              params: {id: id},
              query: {time: new Date().valueOf()},
              replace: true
            });
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
          }
        }else{
          this.navigateTo('userLogin')
        }
      },
      // 点赞
      showLove: function (id) {
        var that = this;
        this.$axios.post('/show/love?version=v2', {show_id: id}).then(function (response) {
          if (response.data.code == 1) {
            that.$vux.toast.text("点赞成功");
          } else {
            that.$vux.toast.text(response.data.msg)
          }
        })
      },
      //唤起移动端评论详情   参数是show_id
      comment: function (id) {
        //var that = this;
        // that.$vux.loading.show({text: '请稍候'});
        // that.JsBridge.callHandler("commentView", id, function (responseData) {
        //   if (responseData == 'success') {
        //     that.$vux.loading.hide();
        //   }
        // });
        this.navigateTo('showOrderInfo',{id:id})
      },
      //晒单扩散按钮，分享app下载页面
      share: function (id) {
        var that = this;
        this.$axios.post('/site/sharecon?version=v2', {type: 4,id:id}).then(function (response) {
          if(response.data.code==1){
            // that.$vux.loading.show({text: '请稍候'});
            // that.JsBridge.callHandler("share", response.data.data, function (responseData) {
            //   if (responseData == 'success') {
            //     that.$vux.loading.hide();
            //   }
            // });
            that.shareData = response.data.data
          }
        });
      },
      checkResult: function (id) {          // 查看计算详情唤起移动端  参数goods_id
        var that = this;
        if(that.publish_type == 1){//判断是否是B值开奖
          // that.$vux.loading.show({text: '请稍候'});
          // that.JsBridge.callHandler("checkResult", id, function (responseData) {
          //   if (responseData == 'success') {
          //     that.$vux.loading.hide();
          //   }
          // });
          that.$router.push({name:"productViewCount",params:{id:id}})
        }else if(that.publish_type == 2){
          that.$router.push({name:"xylucky",params:{id:id}})
        }



      },
      toUser: function (data) {//往期记录点击用户头像到移动端ta的参与记录
        var that = this;
        let id = data.user_id?data.user_id: data.winner_id
        that.$router.push({name:"hisBuyRecords",query:{id:id}})
        // that.$vux.loading.show({text: '请稍候'});
        // that.JsBridge.callHandler("toUser", data, function (responseData) {
        //   if (responseData == 'success') {
        //     that.$vux.loading.hide();
        //   }
        // });
      },
      setContro(){//兑换商品
        this.setRedmControl(!this.getRedmControl)
      },
      buy: function (data) {//积分参与夺宝 参数goods_id
        let that = this;
        if(this.getUserInfo.idx) {
          this.productData = data
          this.setContro()
          // that.JsBridge.callHandler("buy", data, function (responseData) {
          //   if (responseData == 'success') {
          //     that.$vux.loading.hide();
          //   }
          // });
          // data.buyNum =  1//购买数量
          // data.buyAllPrice = 1*data.price_min//需要总积分
          // this.navigateTo('exchangPay',{data:JSON.stringify(data)})
        }else{
          this.navigateTo('userLogin')
        }
      },
      toDetail: function (id) {
        this.$router.push({
          name: 'productDetail',
          params: {id: id},
          query: {time: new Date().valueOf()}
        })
      },
      toTopView: function () {
        this.$router.push({
          name: 'topView',
          query: {time: new Date().valueOf()}
        })
      },
      // 浮窗
      getFloatNotice() {
        let that = this;
        that.$axios.get("/site/getSiteNotice?version=v2",{
          params:{
            type: 2
          }
        }).then((res) => {
          that.listData = res.data.data
          let width = 0;
          that.$refs.scrollItem.style.width = that.listData.length * 10 + 'rem'
        })
      },
      gotoDetail(item) {
        if(item.type == 2){
          this.navigateTo('rechargeGoodDetail',{'id':item.goods_id})
        }else{
          this.goParas('productView',{'id':item.goods_id,'guid':2})
          this.$router.go(0)
        }
      },
      // 去往图表页
      gotoChart(data) {
        this.navigateTo('chartDetail',{baseId: data.detail.goods_base_id})
      }
    },
    //  watch:{
    //    time(newVal,oldVal){
    //       console.log(newVal)
    //       return this.time=newVal
    //    }
    //   }

  }
</script>
<style lang="scss" scoped>
  @import "../../assets/css/reset.scss";
  [v-cloak] {
    display: none !important;
  }
  .pirceMin{
    span{
      &:nth-of-type(2){
        float:right;
        color:#f76800;
        em{
          color:#999;
          font-style:normal;
        }
      }
    }
  }
  .winnerType{
    font-size: 15px !important;

  }
  .history-infoIng{
    border: dashed 1px #39c616;
    padding: 6*$r 6*$r;
    position: relative;
    &-btn{
      position: absolute;
      width: 180*$r;
      top: 8*$r;
      right: 8*$r;
      @include flex-space;
      span{
        font-size: 24*$r;
      }
      img{
        width: 28*$r;
        height: 28*$r;
      }
    }
  }
  .toLook{
    border-bottom: solid 1px #999999;
    font-size: 11px;line-height: 12px;position: absolute;bottom: -18px;left: 0;right: 0;margin: 0 auto;text-align: center;
  }
  .productNone {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    background: #fff;
    .con{
      width: 80%;
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%,-50%);
      img{
        width: 100%;
      }
      p{
        font-size: 14px;
        color: #999;
        text-align: center;
        width: 100%;
        margin-top: 20px;
      }

    }
  }
  .stop{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .home-notice1{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 75*$r;
    width: 95%;
    font-size: 24*$r;
    position: fixed;
    top: 2rem;
    left: 50%;
    transform: translateX(-50%);
    color: #000000;
    z-index: 100;
    .notice-item{
      height: 2rem;
      padding-top: 0.5rem;
      position: relative;
      .feiji1{
        position: absolute;
        top: -0.01rem;
        left: 0;
        width: 2.8rem;
        height: 2rem;
        z-index: 10;
      }
      .feiji2{
        position: absolute;
        top: -0.2rem;
        right: -0.1rem;
        width: 3.5rem;
        height: 2.5rem;
        z-index: 10;
      }
      div{
        display: flex;
        align-items: center;
        margin-left: 2rem;
        padding-left: 0.5rem;
        height: 1rem;
        width: 7.5rem;
        border-radius: 0.5rem;
        p{
          width: 70%;
          @include t-overflow(1);
        }
      }
    }
    .winer-item{
      div {
        background: #ff3d32;
        color: #ffffff;
        opacity: 0.8;
      }
    }
    .canyu-item{
      div {
        background: #f4dd2b;
        color: #703801;
        opacity: 0.8;
      }
    }
    div{
      height: 150*$r;
      width: 100%;
      line-height: 150*$r;
    }
  }
  #scrollBox{
    height: 150*$r;
    width: 95%;
    font-size: 24*$r;
    position: fixed;
    // top: 1rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    .notice-item{
      height: 2rem;
      padding-top: 0.5rem;
      position: relative;
      .feiji1{
        position: absolute;
        top: -0.01rem;
        left: 0;
        width: 2.8rem;
        height: 2rem;
        z-index: 10;
      }
      .feiji2{
        position: absolute;
        top: -0.2rem;
        right: -0.1rem;
        width: 3.5rem;
        height: 2.5rem;
        z-index: 10;
      }
      div{
        display: flex;
        align-items: center;
        margin-left: 2rem;
        padding: 0 0.5rem;
        height: 1rem;
        width: 7rem;
        border-radius: 0.5rem;
        p{
          // width: 70%;
          @include t-overflow(1);
        }
      }
    }
    .winer-item{
      div {
        background: #ff3d32;
        color: #ffffff;
        opacity: 0.8;
      }
    }
    .canyu-item{
      div {
        background: #f4dd2b;
        color: #703801;
        opacity: 0.8;
      }
    }
  }
  .warp {
    height: 2rem;
    overflow: hidden;
  }
  .warp ul {
    list-style: none;
    padding: 0;
    margin: 0 auto;
    width: auto;
    height: 2rem;
    li {
      display: inline-block;
      width: 10rem;
      div {
        width: 9rem;
      }
    }
  }
  .chart-detail{
    background:#f5f5f5;
    display: flex;
    align-items: center;
    padding: 0.2rem 0.5rem;
    position: relative;
    >span{
      width: 70%;
    }
    >img{
      position: absolute;
      top: 0;
      right: 0.5rem;
      width: 0.6rem;
    }
    div{
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 35%;
      span{
        color: #00a1de;
      }
      img{
        width: 0.4rem;
      }
    }
  }
</style>
