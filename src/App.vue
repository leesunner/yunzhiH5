<template>
  <div style="height: 100%">
    <head-nav :headBack="navTabContro" :title="title"></head-nav>
    <div class="app-head-con"></div>
    <transition :name="transitionName">
      <keep-alive v-if="$route.meta.keep">
        <router-view class="child-view"></router-view>
      </keep-alive>
      <router-view class="child-view" v-else></router-view>
      <!-- <router-view class="child-view"></router-view> -->
    </transition>
    <!--中奖弹框-->
    <winner-dailog></winner-dailog>
    <div class="app-bottom" v-show="navTabContro"></div>
    <nav-tab v-show="navTabContro" :class="getRedmControl?'zindex':''"></nav-tab>
    <!-- <div class="audio">
      <audio ref="audioControl" preload="preload">
       <source :src="'http://test.light163.cn/web/music/winner.mp3'"/>
      </audio>
      <div class="chufa" @click="chufa()"></div>
    </div> -->
  </div>
</template>

<script>
  import navTab from '@/components/bottomNav/bottomTab'
  import headNav from '@/components/headTitle/head'
  import winnerDailog from '@/components/popupView/winnerDailog'
  import {mapGetters,mapActions} from 'vuex'
  export default {
    components:{
      headNav,
      navTab,
      winnerDailog,//中奖弹框
    },
    data() {
      return {
        transitionName: 'slide-right',
        scrHeight:"",
        navTabContro:true,
        title:'',
        startX:'',
        moveX:'',
      }
    },
    created:function(){
      this.getDescription();
      this.handsController();
    },
    mounted(){
      // 翻页手势控制(使用动态路由的情况下可以使用)
      // let that = this
      // let router = this.$router;
      // let ele = document.querySelector('body')
      // ele.addEventListener('touchstart', (e) => {
      //   that.startX =  e.touches[0].pageX;
      // })
      // ele.addEventListener('touchmove', (e) => {
      //   var moveEndX = e.changedTouches[0].pageX;
      //   that.moveX= moveEndX - that.startX;
      //   ele.style.position='relative';
      //   if ( that.moveX < -50 ) {//左滑
      //     ele.style.left=that.moveX+'px';
      //   }if(that.moveX>50){//右滑
      //     ele.style.left=that.moveX-50+'px';
      //   }
      // })
      // ele.addEventListener('touchend', (e) => {
      //   if(that.$route.matched.name){
      //     if (that.moveX < -50) {
      //       router.go(-1)
      //       ele.style.left=0+'px';
      //     }
      //     if(that.moveX > 50){
      //       router.go(1)
      //       ele.style.left=0+'px';
      //     }
      //   }else{
      //     ele.style.left=0+'px';
      //   }
      // })
    },
    computed:{
      ...mapGetters([
        'getRedmControl',
        'getWinner'
      ])
    },
    methods: {
      ...mapActions([
        'login'
      ]),
      getDescription: function (){
        this.JsBridge.registerHandler("getDescription", function (data, responseCallback) {
          responseCallback(document.getElementsByTagName('meta')['description'].getAttribute("content"));
        });
      },
      chufa() {
        let ele = this.$refs.audioControl
        // ele.play()
      },
      loadTop() {
        this.$router.go(0)
      },
      handsController(){//原生交互手势控制
        let that  =this
        this.JsBridge.registerHandler('routerController',function (data,resCallback) {
          if(data=='BACK'){
            that.$router.back()
          }
          if(that.$route.name === 'homeIndex'){
            resCallback('1')
          }
        })
      }
    },
    watch: {
      getWinner(newVal,oldVal){
        let that = this
        if(newVal.order_id){
          let ele = this.$refs.audioControl
          // ele.play()
        }
      },
      '$route' (to, from) {
        this.startX = ''
        this.moveX = ''
        this.title = to.meta.title
        this.navTabContro = to.meta.keepAlive
        if (from.name == to.name) {
          sessionStorage.setItem('productView', 'productView')
        }
        if (from.query.time) {
          if (to.query.time > from.query.time) {
            this.transitionName = 'slide-left'
          } else {
            this.transitionName = 'slide-right'
          }
        } else {
          this.transitionName = 'slide-left'
        }
      },
    }
  }
</script>

<style lang="less">
  @import "~vux/src/styles/reset.less";
  @import "assets/main.css";
  .home-banner-point{
    bottom: 20/75rem!important;
    .vux-icon-dot{
      background-color: rgba(0,0,0,0.2)!important;
    }
    .active{
      background-color: #fe5889!important;
    }
  }
  .audio{
    width: 100%;
    height: 1px;
    overflow: hidden;
  }
  .chufa{
    position: fixed;
    top: 4rem;
    right: 0;
    z-index: 100;
    width: 2px;
    height: 2px;
  }
  .app-head-con{
    width: 100%;
    height: 88/75rem;
  }
  .app-bottom{
    width: 100%;
    height: 98/75rem;
  }
  .mt-progress-progress{
    background-color: #ec661e!important;
    border-radius: 8px !important;
  }
  .weui-cell{
    width: 100%!important;
    font-size: 28/75rem;
  }
  .showOrderInfo{
    p:nth-child(1){
      margin-top: 10px;
    }
    img{
      width: 100%;
    }
  }
  .weui-input{
    height: inherit!important;
    line-height: 0.8rem!important;
    background-color: transparent!important;
  }
  .zindex{
    z-index: -10!important;
  }
  .hisgooditem-content-percent{
    .mt-progress{
      height: 20/75rem;
    }
  }
  /* tab组件切换的过场动画 */
  .component-fade-leave-active{
    transition: all 0.1s ease-in-out;
    transform: translate(calc(100vw / 2), 0);
    opacity: 0;
  }
  .component-fade-enter-active {
    animation: tranX 0.25s ease-in-out;
  }
  @keyframes tranX {
    0%{
      transform: translate(calc(-100vw / 2), 0);
      opacity: 0;
    }
    100%{
      transform: translate(0, 0);
      opacity: 1;
    }
  }
</style>
