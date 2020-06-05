import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import axios from 'axios';
import store from '@/vuexStore/store'
import App from './App.vue'
import JsBridge from '../static/js/JsBridge'
import roters from './router/index'
import qs from 'qs'
// import request from '@/api/api'
/*全局引入*/
import 'swiper/dist/css/swiper.css'//这里注意具体看使用的版本是否需要引入样式，以及具体位置。
import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.use(VueAwesomeSwiper, /* { default global options } */)
//import 'lib-flexible'
// import Icon from 'vue-svg-icon/Icon.vue' //引入
Vue.prototype.JsBridge = JsBridge//app交互js
// Vue.prototype.$request = request

import 'mint-ui/lib/style.css'
import { InfiniteScroll, Progress, Picker, Popup, Lazyload, Loadmore, Swipe, SwipeItem } from 'mint-ui';
Vue.use(InfiniteScroll);//上拉加载
Vue.component('mt-popup', Popup);
Vue.component('mt-progress', Progress);
Vue.component(Popup.name, Popup);
Vue.component('loadMore', Loadmore);
Vue.component('mt-picker', Picker);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.use(Lazyload);

require('es6-promise').polyfill();

//公用方法
import util from './assets/util';
import VueClipboard from 'vue-clipboard2'  //一键复制
Vue.use(util);
Vue.use(VueClipboard)

//Toast
import { ToastPlugin, DatetimeView,LoadingPlugin,XInput} from 'vux'
//时间选择器
Vue.component('datetime-view', DatetimeView)
Vue.component('x-input', XInput)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)


//加载公共头组件
import headNav from '@/components/headTitle/head'
Vue.component({'headNav':headNav})

// Vue.use(axios);
Vue.prototype.navigateTo = function (name,data={},data1={}) {
  if(name.indexOf('http')>-1){
    window.location.href = name
  }else{
    this.$router.push({
      name: name,
      query:data,
      params:data1,
    })
  }
}
//使用以前的商品详情页
Vue.prototype.goParas = function (name,data={}) {
  if(name.indexOf('http')>-1){
    window.location.href = name
  }else{
    this.$router.push({
      name: name,
      params:data
    })
  }
}

var base = window.location.host;//根据不同的域名 设置 不同的baseUrl
if ("localhost:8080" == base){
  /**
   * 测试正式域名
   */
  base = ''
}else{
  //测试环境是http 正式是https
  if (base.indexOf('test.') > -1) {
    base = 'http://' + base;
  } else {
    base = 'https://' + base;
  }
}
Vue.prototype.$httpUrl =base
// console.log(base)
Vue.prototype.$axios = axios.create({
  // baseURL:'http://192.168.1.13:8081/api',
  // baseURL: 'https://test.1yyg.store/api',
  // baseURL: 'https://app.1yyg.store/api',
  // baseURL: 'https://app.1yyg.store/api',
  baseURL:base+'/api',
  // baseURL:'https://app.r0hbu.cn/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
//    ,"version":"v2"
  transformRequest: [function (data) {
    data = qs.stringify(data);
    return data
  }],
  withCredentials:true,
  data:{},
});
//Vue.prototype.$axios.defaults.headers.common['app'] ="";
/**
 * 打包为H5类型的有：yyyg | lqdb(2) | kdlg
 */
/**
 * 打包为APP类型的有：lqlg | yytj(乐购商城) | yytg|lqpg 打lqdb的马甲
 *
 */
/**
 * 短信渠道：sms | 零钱兑宝渠道标识：daili01 | 无要求时：h5
 */
const apptype = 'App'
const appId = 'lqlg'// 区分请求数据
Vue.prototype.$logoType = 2//同马甲请求,不同包的logo文字控制显示,比如'1'显示lqdb的logo,'2'显示lqpg的logo
Vue.prototype.$channel = 'h5'//渠道
Vue.prototype.$appid = appId // 打假页面区分
Vue.prototype.appType = apptype//打包类型（H5或APP）
//添加一个请求拦截器
Vue.prototype.$axios.interceptors.request.use(function(config){
  // var appid = sessionStorage.getItem('app');
  // alert(config.headers.channel + '&&' + config.headers.device + '&&' + config.headers.app)
  if (appId!="undefined"){
    config.url += '&app=' + appId;
  }
  if(config.url.indexOf('/user/index')==(-1)&&config.url.indexOf('/notice/confirmWinMsg')==(-1)&&config.url.indexOf('/recharge/confirmPay')==(-1)
    && config.url.indexOf('/site/area') == (-1))
  {
    Vue.$vux.loading.show({
      text: '请稍候...'
    });
  }
  return config;
},function(err){
  Vue.prototype.constructor.$vux.toast.text("请求失败，请重试")
  Vue.prototype.constructor.$vux.loading.hide();
  return Promise.reject(err);
});
//添加一个响应拦截器
Vue.prototype.$axios.interceptors.response.use(function(res){
  // console.log(document.cookie)
  if(res.config.url.indexOf('/recharge/confirmPay')==(-1)){//支付接口
    Vue.prototype.constructor.$vux.loading.hide();
  }
  return res;
},function(err){
  let i=true
  Vue.prototype.constructor.$vux.toast.text('请求超时');
  Vue.prototype.constructor.$vux.loading.hide();
  return Promise.reject(err);
});

//点击延迟
FastClick.attach(document.body);

Vue.use(VueRouter);
//创建一个路由器实例
const router = new VueRouter({
  // mode: 'history',       //路由history 模式
  // base:'/web/lqlgH5',
  // scrollBehavior(to, from, savedPosition) {
  //   console.log(savedPosition)
  //   if(savedPosition) {
  //     return savedPosition
  //   } else {
  //     return {
  //       x: 0,
  //       y: 0
  //     }
  //   }
  // },
  linkActiveClass:'active',
  routes: roters,
});
router.beforeEach((to, from, next) => {
  let local = window.location
  if(/(\/\?)[a-zA-Z\d]+=[a-zA-Z\d]+(#\/)/.test(local.href)){
    local.replace(local.host+local.pathname+local.hash);
    // local.reload()
  }else {
    if (to.meta.title) {
      document.title = to.meta.title
    }
    var appId = to.query.app;
    if (appId) {
      sessionStorage.setItem('app', appId);
    }
    if (from.name == 'userLogin' && to.name == 'zerobuyweek') {
      if (store.state.userInfo.idx) {
        next()
      } else {
        router.push({
          name: 'home'
        })
      }
    } else {
      next()
    }
  }
});
//设置为 false 以阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = true;
/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box');

//解决IOS title不改变的问题
function setMetaTitle(title) {///定义setMetaTitle()函数
  document.title = title
  let mobile = navigator.userAgent.toLowerCase()
  if (/iphone|ipad|ipod/.test(mobile)) {
    let iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    // 替换成站标favicon路径或者任意存在的较小的图片即可
    iframe.setAttribute('src', '')
    let iframeCallback = function () {
      setTimeout(function () {
        iframe.removeEventListener('load', iframeCallback)
        document.body.removeChild(iframe)
      }, 0)
    }
    iframe.addEventListener('load', iframeCallback)
    document.body.appendChild(iframe)
  }
}

Vue.directive('title', {//应用入口main.js中调用setMetaTitle()函数  自定义全局的指令
  inserted: function (el, binding) {
    setMetaTitle(binding.value)
  }
})
