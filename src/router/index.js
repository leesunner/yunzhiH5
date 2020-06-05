import { resolve } from "path";


const score = resolve => require(['../components/pages/score.vue'], resolve); // 卖茶叶送积分
const lqscore = resolve => require(['../components/pages/lqscore.vue'], resolve); // 卖茶叶送积分
const download = resolve => require(['../components/pages/download.vue'], resolve); // 应用下载
const freeOrder = resolve => require(['../components/pages/free-order.vue'], resolve); //逢8免单
const help = resolve => require(['../components/pages/help.vue'], resolve); //新手引导
const lqhelp = resolve => require(['../components/pages/lqhelp.vue'], resolve); //新手引导
const lqlghelp = resolve => require(['../components/pages/lqlghelp.vue'], resolve); //新手引导
const luckyClick = resolve => require(['../components/pages/lucky-click.vue'], resolve); //不中包赔

const lqluckyClick = resolve => require(['../components/pages/lqlucky-click.vue'], resolve); //不中包赔
const commentOrder = resolve => require(['../components/pages/comment-order.vue'], resolve); //晒单送积分
const hongbao = resolve => require(['../components/pages/hongbao.vue'], resolve); // 抢红包
const lqhongbao = resolve => require(['../components/pages/lqhongbao.vue'], resolve); // 抢红包
const accept = resolve => require(['../components/pages/accept.vue'], resolve); //服务协议
const guide = resolve => require(['../components/pages/guide.vue'], resolve); //新手引导



const downloadGuide = resolve => require(['../components/pages/download-guide.vue'], resolve); //下载指南
const rule = resolve => require(['../components/pages/rule.vue'], resolve); //公平，宣传海报
const lqrule = resolve => require(['../components/pages/lqrule.vue'], resolve); //公平，宣传海报
const rotary = resolve => require(['../components/pages/rotary.vue'], resolve); //转盘
const register = resolve => require(['../components/pages/register.vue'], resolve); //邀请分享后的注册页面
// const invitation = resolve => require(['../components/invitation.vue'], resolve); //邀请
const shoutu = resolve => require(['../components/pages/shoutu.vue'], resolve); //邀请
const invitationLog = resolve => require(['../components/pages/invitationLog.vue'], resolve); //邀请
const testPay = resolve => require(['../components/pages/testPay.vue'], resolve); //ios 审核页面
const productView = resolve => require(['../components/pages/product-view.vue'], resolve); //商品详情
const productDetail = resolve => require(['../components/pages/product-detail.vue'], resolve); // 商品图文详情
const topView = resolve => require(['../components/pages/top-view.vue'], resolve); //上榜规则
const express = resolve => require(['../components/pages/express.vue'], resolve); //物流查询
const share = resolve => require(['../components/pages/share.vue'], resolve); //分享的积分奖励
const lqjoy = resolve => require(['../components/pages/lqjoy.vue'], resolve); //分享的积分奖励
const agreement = resolve => require(['../components/pages/agreement.vue'], resolve); //协议
const feedback = resolve => require(['../components/pages/feedback.vue'], resolve); //反馈
const recharge = resolve => require(['../components/pages/recharge.vue'], resolve); //充值
const newHand = resolve => require(['../components/pages/newHand.vue'], resolve); //60元新手积分券
const lqcommentOrder = resolve => require(['../components/pages/lqcomment-order.vue'], resolve);//天天抢券
const integral = resolve => require(['../components/pages/integral.vue'], resolve); //5元积分奖励
const rebate = resolve => require(['../components/pages/rebate.vue'], resolve); //充值返利活动
const seven = resolve => require(['../components/pages/seven.vue'], resolve); //七夕活动
const daili01 = resolve => require(['../components/pages/daili01.vue'], resolve); //新手活动 sevenday
const sevenday = resolve => require(['../components/pages/sevenday.vue'], resolve); //中秋活动
const eightsix = resolve => require(["../components/pages/eightsix.vue"], resolve); //逢6进8
const award = resolve => require(["../components/pages/award.vue"],resolve);//充值加奖60%
const midinvite = resolve => require(["../components/pages/midinvite.vue"], resolve);//邀请充值30元
const autumn= resolve =>require(['../components/pages/autumn.vue'],resolve)//中秋抢券
const guide01 = resolve => require(['../components/pages/guide01.vue'], resolve); //新手引导
const dbbhelp =resolve =>require(['../components/pages/dbbhelp.vue'],resolve);//新手秘籍
const gqfh =resolve =>require(["../components/pages/guoqingfahuo.vue"],resolve);//国庆发货
const yexiaodi01 =resolve => require(['../components/pages/detailtwo.vue'],resolve);//一元新手红包60元

const invitation = resolve => require(["../components/pages/commis.vue"],resolve);//佣金提现首页
const yqrecord =resolve =>require(["../components/pages/yjrecord.vue"],resolve);//邀请记录
const yqdetail =resolve => require(["../components/pages/yjdetail.vue"],resolve);//佣金明细
const yjshift =resolve => require(["../components/pages/yjshift.vue"],resolve);//转入积分明细
const yjrule = resolve => require(["../components/pages/yjrule.vue"],resolve);//佣金活动规则
const yjdeposit= resolve =>require(["../components/pages/yjdeposit.vue"],resolve);//佣金提现明细
const yjinteg =resolve => require(["../components/pages/yjinteg.vue"],resolve);//转入积分
const yjout = resolve => require(["../components/pages/yjout.vue"],resolve);//佣金提现
const yjmaster = resolve => require(["../components/pages/yjmaster.vue"], resolve);//佣金师父ID
const yjusable = resolve => require(["../components/pages/yjusable.vue"], resolve);//佣金明细

const xylucky= resolve => require(["../components/pages/xylucky.vue"],resolve);//B值开奖幸运计算公式
const luckyquery = resolve => require(["../components/pages/luckyquery.vue"], resolve);//B值开奖幸运计算公式
const ygletter= resolve => require(["../components/pages/ygletter.vue"],resolve);//献给乐购会员的一封信
// const ygletterdb = resolve => require(["../components/pages/ygletter1.vue"], resolve);//献给乐购会员的一封信
const ygletterdb = resolve => require(["../components/pages/ygletterdb.vue"], resolve);//献给乐购会员的一封信


const sevensign = resolve => require(["../components/pages/sevensign.vue"],resolve);//10月七天签到
const sevensign2019 = resolve => require(["../components/pages/sevensign2019.vue"],resolve);//2019年初七天签到
const luckyvip = resolve => require(["../components/pages/luckyvip.vue"], resolve);//幸运188买会员打卡

const dbdown = resolve => require(["../components/pages/dbdown.vue"], resolve);//乐购下载down
const yydown = resolve => require(["../components/pages/yydown.vue"], resolve);//零钱乐购下载down

const yexiaodi02 = resolve => require(["../components/pages/yexiaodi02.vue"],resolve);//一元新手红包

const teaturn = resolve => require(["../components/pages/teaturntable.vue"],resolve);//茶叶回收大作战

const zerobuy = resolve => require(["../components/pages/zerobuy.vue"], resolve);//   0元换购//
const zerbuytwo =resolve => require(["../components/pages/zerobuy11.vue"],resolve);// 0元购双(正在使用的页面)
const zerobuyweek =resolve => require(["../components/pages/zerobuyweek.vue"],resolve);// 每周0元购

const  sendba= resolve => require(["../components/pages/sendba.vue"], resolve);//寄售宝正式入驻
const sendbanew = resolve => require(["../components/pages/sendbanew.vue"], resolve);//寄售宝正式入驻

const greenweal= resolve => require(['../components/pages/greenweal.vue'],resolve);//新人活动集合...
const peoplezx =resolve =>require(['../components/pages/peoplezx.vue'],resolve);//新人专享组件
const xsinvteli = resolve => require(['../components/pages/xsinvteli.vue'],resolve);//邀请有礼组件

const ywcard =resolve => require(['../components/pages/ywcard.vue'],resolve);//1000话费卡搞事情
const zeroshopp= resolve => require(["../components/pages/zeroshopptz.vue"],resolve);//零钱商城跳转
const zeroshopptz = resolve => require(["../components/pages/zeroshopptztwo.vue"], resolve);//零钱商城跳转

const quest =resolve => require(["../components/pages/questuit.vue"],resolve);//问卷小调查
const vxtz = resolve => require(["../components/pages/vxtz.vue"], resolve);//VX h5临时跳转页

const limitShopp = resolve => require(["../components/pages/limitShopp.vue"], resolve);//限购专区

const countDown = resolve => require(["../components/pages/countdown.vue"], resolve);//倒计时满588送88元
const christmas =resolve => require(["../components/pages/christmas.vue"],resolve);//圣诞节活动 满588送188元...
const threeDays = resolve => require(["../components/pages/threeDays.vue"], resolve);//三天三夜满588送88元

const newYearActivity =resolve => require(["../components/pages/newYearActivity.vue"],resolve);//2019元旦通知

const weekRecharge =resolve => require(["../components/pages/weekRecharge.vue"],resolve);//2019.1.3充值排行
const newYear = resolve => require(["../components/pages/newYear.vue"],resolve);//春节活动 满588送188元...
const newUser2019 = resolve => require(["../components/pages/newUser2019.vue"],resolve);//零钱乐购下载
const sendNotice = resolve => require(["../components/pages/newSendNotice.vue"],resolve);//春节发货通知
const festival = resolve => require(["../components/pages/festival.vue"],resolve);//元宵节活动
const awPresentation =resolve => require(["../components/pages/awPresentation.vue"],resolve);//实物领奖说明

const errorPage = resolve => require(["@/pages/404.vue"],resolve);//404页面
const home = resolve => require(["@/pages/home/home.vue"],resolve);//app首页
const type = resolve => require(["@/pages/type/type.vue"],resolve);//分类
const exChanged = resolve => require(["@/pages/exChanged/exChanged.vue"],resolve);//已兑换
const exchangPay = resolve => require(["@/pages/exchangPay/exchangPay.vue"],resolve);//兑换支付页
const exchangSuccess = resolve => require(["@/pages/exchangPay/exchangSuccess.vue"],resolve);//兑换成功
const buyPay = resolve => require(["@/pages/buyPay/buyPay.vue"],resolve);//立即购买
const payGoodsMoney = resolve => require(["@/pages/buyPay/payGoodsMoney.vue"],resolve);//扫码支付
const rechargeGoodDetail = resolve => require(["@/pages/rechargeGoods/rechargeGoodDetail.vue"],resolve);//充值商品详情
const tickets = resolve => require(["@/pages/exchangPay/tickets.vue"],resolve);//兑换选中积分页
const find = resolve => require(["@/pages/find/find.vue"],resolve);//发现
const mine = resolve => require(["@/pages/mine/mine.vue"],resolve);//我的
const rechargList = resolve => require(["@/pages/mine/rechargList/rechargList.vue"],resolve);//充值商品列表
const userLogin = resolve => require(["@/pages/login/login.vue"],resolve);//登录页
const userRegister = resolve => require(["@/pages/register/register.vue"],resolve);//注册页
const registerSuccess = resolve => require(["@/pages/register/registerSuccess.vue"],resolve);//注册成功
const backPassword = resolve => require(["@/pages/backPassword/backPassword.vue"],resolve);//忘记密码
const setting = resolve => require(["@/pages/mine/setting.vue"],resolve);//个人中心设置
const myNotice = resolve => require(["@/pages/mine/myNotice/message.vue"],resolve);//个人中心消息
const messageDetail = resolve => require(["@/pages/mine/myNotice/messageDetail.vue"],resolve);//消息详情
const mineInfo = resolve => require(["@/pages/mine/mineInfo/mineInfo.vue"],resolve);//头像-个人资料
const myNickName = resolve => require(["@/pages/mine/mineInfo/myNickName/myNickName.vue"],resolve);//昵称修改-个人资料
const myGrade = resolve => require(["@/pages/mine/mineInfo/myGrade/myGrade.vue"],resolve);//个人资料-我的等级
const moreGrade = resolve => require(["@/pages/mine/mineInfo/myGrade/moreGrade.vue"],resolve);//我的等级-更多特权
const helpCenter = resolve => require(["@/pages/mine/help/help.vue"],resolve);//帮助中心
const helpContent = resolve => require(["@/pages/mine/help/helpContent.vue"],resolve);//帮助中心详细内容
const certification = resolve => require(["@/pages/mine/certification/certification.vue"],resolve);//实名认证
const address = resolve => require(["@/pages/mine/address/address.vue"],resolve);//收货地址
const addAddress = resolve => require(["@/pages/mine/address/addAddress.vue"],resolve);//添加收货地址
const teaPackage = resolve => require(["@/pages/mine/teaPackage/teaPackage.vue"],resolve);//茶叶和游戏礼包
const ticket = resolve => require(["@/pages/mine/ticket/ticket.vue"],resolve);//我的积分券
const showOrderList = resolve => require(["@/pages/showOrderList/showOrderList.vue"],resolve);//商品晒单列表
const showOrderInfo = resolve => require(["@/pages/showOrderList/showOrderInfo.vue"],resolve);//晒单详情
const showOrder = resolve => require(["@/pages/mine/showOrder/showOrder.vue"],resolve);//我的晒单
const showContent =  resolve => require(["@/pages/mine/showOrder/showContent.vue"],resolve);//晒单内容
const showSuccess = resolve => require(["@/pages/mine/showOrder/showSuccess.vue"],resolve);//晒单成功
const accountDetails = resolve => require(["@/pages/mine/accountDetails/accountDetails.vue"],resolve);//我的账户明细
const myBuyRecord = resolve => require(["@/pages/mine/myBuyRecord/myBuyRecord.vue"],resolve);//乐购记录
const numbersList = resolve => require(["@/pages/mine/myBuyRecord/numberLists/numberLists.vue"],resolve);//参与号码
const luckyRecord = resolve => require(["@/pages/mine/luckyRecord/luckyRecord.vue"],resolve);//幸运记录
const realObject = resolve => require(["@/pages/mine/luckyRecord/realObject.vue"],resolve);//幸运记录-实物详情
const inventedObject = resolve => require(["@/pages/mine/luckyRecord/inventedObject.vue"],resolve);//幸运记录-虚拟物品详情
const productViewCount = resolve => require(["@/pages/productViewCount/productViewCount.vue"],resolve);//非B值幸运计算公式
const hisBuyRecords = resolve => require(["@/pages/hisPersonCenter/hisPersonCenter.vue"],resolve);//TA的参与记录

const downloadApp = resolve => require(["@/pages/downloadAPP.vue"], resolve);//TA的参与记录
const crackdown = resolve => require(["@/components/pages/crackdown.vue"], resolve);//打假
const potato = resolve => require(["@/components/pages/potato.vue"], resolve);//官方客服
const plant = resolve => require(["@/components/pages/plant.vue"], resolve);//平台升级
const identify = resolve => require(["@/components/pages/identify.vue"], resolve);//真假平台鉴别
const alicard = resolve => require(["@/pages/mine/alicard/alicard.vue"], resolve);//幸运记录
const shake = resolve => require(["@/components/pages/shake.vue"], resolve);//摇骰子
const cardObject = resolve => require(["@/pages/mine/alicard/cardObject.vue"], resolve);//淘宝卡
const chartDetail = resolve => require(["@/components/pages/chartDetail.vue"], resolve);// 走势图
const chartView = resolve => require(["@/components/pages/chartView.vue"], resolve);// 走势图引导
const lqdbDown = resolve => require(["@/components/pages/lqdbDown.vue"], resolve);// db下载页
const lqdbDownx = resolve => require(["@/components/pages/lqdbDownx.vue"], resolve);// db下载页
const PKking = resolve => require(["@/components/pages/PKking.vue"], resolve);//pk活动
const sixShake = resolve =>require(['@/components/pages/sixShake.vue'],resolve);//6.1摇骰子活动

const routers = [ //路由规则
  // {
  //   path:'*',
  //   name:'home',
  //   meta:{
  //     title:'404',
  //     keepAlive:false
  //   },
  //   component: errorPage,
  //
  // },
  {
    path:'/',
    name:'home',
    meta:{
      title:'首页',
      keepAlive:true,
      keep: true
    },
    // component: home,
    redirect:{//开发跳转
      name:'homeIndex'
    }
  },
  {
    path:'/home',
    name:'homeIndex',
    meta:{
      title:'首页',
      keepAlive:true,
      keep: true
    },
    component: home,
    // redirect:{//开发跳转
    //   name:'home'
    // }
  },
  {
    path:'/type',
    name:'type',
    meta:{
      title:'所有商品',
      keepAlive:true,
      keep: true
    },
    component: type
  },
  {
    path:'/exChanged',
    name:'exChanged',
    meta:{
      title:'已兑商品',
      keepAlive:true
    },
    component: exChanged
  },
  {
    path:'/find',
    name:'find',
    meta:{
      title:'发 现',
      keepAlive:true,
      keep: true
    },
    component: find
  },
  {
    path:'/mine',
    name:'mine',
    meta:{
      title:'我的零钱',
      keepAlive:true,
      keep: true
    },
    component: mine,
  },
  {
    path:'/rechargList',
    name:'rechargList',
    meta:{
      title:'充值列表',
      keepAlive:false
    },
    component: rechargList,
  },
  {
    path:'/exchangPay',
    name:'exchangPay',
    meta:{
      title:'兑换页面',
      keepAlive:false
    },
    component: exchangPay,
  },
  {
    path:'/exchangSuccess',
    name:'exchangSuccess',
    meta:{
      title:'兑换成功',
      keepAlive:false
    },
    component: exchangSuccess,
  },
  {
    path:'/buyPay',
    name:'buyPay',
    meta:{
      title:'立即购买',
      keepAlive:false
    },
    component: buyPay
  },
  {
    path:'/payGoodsMoney',
    name:'payGoodsMoney',
    meta:{
      title:'扫码支付',
      keepAlive:false
    },
    component: payGoodsMoney,
    beforeEnter:function (to,from,next) {
      if(from.name=='buyPay'&&to.query.url){
        next()
      }
    }
  },
  {
    path:'/exchangPay/tickets',
    name:'tickets',
    meta:{
      title:'选择积分券',
      keepAlive:false
    },
    component: tickets,
  },
  {
    path:'/rechargeGoodDetail',
    name:'rechargeGoodDetail',
    meta:{
      title:'商品详情',
      keepAlive:false,
      keep: true
    },
    component: rechargeGoodDetail,
  },
  {
    path:'/productViewCount/:id',
    name:'productViewCount',
    meta:{
      title:'幸运计算公式',
      keepAlive:false
    },
    component: productViewCount,
  },
  {
    path:'/hisBuyRecords',
    name:'hisBuyRecords',
    meta:{
      title:'TA的参与记录',
      keepAlive:false
    },
    component: hisBuyRecords,
  },
  {
    path:'/userLogin',
    name:'userLogin',
    meta:{
      title:'登录',
      keepAlive:false
    },
    component: userLogin
  },
  {
    path:'/userRegister',
    name:'userRegister',
    meta:{
      title:'注册',
      keepAlive:false
    },
    component: userRegister
  },
  {
    path:'/registerSuccess',
    name:'registerSuccess',
    meta:{
      title:'注册成功',
      keepAlive:false
    },
    component: registerSuccess
  },
  {
    path:'/backPassword',
    name:'backPassword',
    meta:{
      title:'重置密码',
      keepAlive:false
    },
    component: backPassword
  },
  {
    path:'/setting',
    name:'setting',
    meta:{
      title:'设置',
      keepAlive:false
    },
    component: setting
  },
  {
    path:'/myNotice',
    name:'myNotice',
    meta:{
      title:'消息',
      keepAlive:false
    },
    component: myNotice
  },
  {
    path:'/messageDetail',
    name:'messageDetail',
    meta:{
      title:'消息详情',
      keepAlive:false
    },
    component: messageDetail
  },
  {
    path:'/mineInfo',
    name:'mineInfo',
    meta:{
      title:'个人资料',
      keepAlive:false
    },
    component: mineInfo
  },
  {
    path:'/myNickName',
    name:'myNickName',
    meta:{
      title:'修改昵称',
      keepAlive:false
    },
    component: myNickName
  },
  {
    path:'/myGrade',
    name:'myGrade',
    meta:{
      title:'我的等级',
      keepAlive:false
    },
    component: myGrade
  },
  {
    path:'/moreGrade',
    name:'moreGrade',
    meta:{
      title:'等级特权',
      keepAlive:false
    },
    component: moreGrade
  },
  {
    path:'/helpCenter',
    name:'helpCenter',
    meta:{
      title:'帮助中心',
      keepAlive:false
    },
    component: helpCenter
  },
  {
    path:'/helpContent',
    name:'helpContent',
    meta:{
      title:'详细内容',
      keepAlive:false
    },
    component: helpContent
  },
  {
    path:'/certification',
    name:'certification',
    meta:{
      title:'实名认证',
      keepAlive:false
    },
    component: certification
  },
  {
    path:'/address',
    name:'address',
    meta:{
      title:'收货地址',
      keepAlive:false
    },
    component: address
  },
  {
    path:'/address/addAddress',
    name:'addAddress',
    meta:{
      title:'收货地址',
      keepAlive:false
    },
    component: addAddress
  },
  {
    path:'/teaPackage',
    name:'teaPackage',
    meta:{
      // 我的礼包
      title:'茶叶和游戏礼包',
      keepAlive:false
    },
    component: teaPackage
  },
  {
    path:'/ticket',
    name:'ticket',
    meta:{
      title:'我的积分券',
      keepAlive:false
    },
    component: ticket
  },
  {
    path:'/showOrder',
    name:'showOrder',
    meta:{
      title:'我的晒单',
      keepAlive:false
    },
    component: showOrder
  },
  {
    path:'/showOrder/showContent',
    name:'showContent',
    meta:{
      title:'发布晒单',
      keepAlive:false
    },
    component: showContent
  },
  {
    path:'/showOrder/showSuccess',
    name:'showSuccess',
    meta:{
      title:'我的晒单',
      keepAlive:false
    },
    component: showSuccess
  },
  {
    path:'/showOrderList',
    name:'showOrderList',
    meta:{
      title:'晒单',
      keepAlive:false
    },
    component: showOrderList
  },
  {
    path:'/showOrderInfo',
    name:'showOrderInfo',
    meta:{
      title:'晒单详情',
      keepAlive:false
    },
    component: showOrderInfo
  },
  {
    path:'/accountDetails',
    name:'accountDetails',
    meta:{
      title:'账户明细',
      keepAlive:false
    },
    component: accountDetails
  },
  {
    path:'/myBuyRecord',
    name:'myBuyRecord',
    meta:{
      title:'购买记录',
      keepAlive:false
    },
    component: myBuyRecord
  },
  {
    path:'/myBuyRecord/numbersList',
    name:'numbersList',
    meta:{
      title:'参与号码',
      keepAlive:false
    },
    component: numbersList
  },
  {
    path:'/luckyRecord',
    name:'luckyRecord',
    meta:{
      title:'幸运记录',
      keepAlive:false
    },
    component: luckyRecord
  },
  {
    path:'/luckyRecord/realObject',
    name:'realObject',
    meta:{
      title:'中奖详情',
      keepAlive:false
    },
    component: realObject
  },
  {
    path:'/luckyRecord/inventedObject',
    name:'inventedObject',
    meta:{
      title:'中奖详情',
      keepAlive:false
    },
    component: inventedObject
  },
  {
    path: '/alicard',
    name: 'alicard',
    meta: {
      title: '幸运记录',
      keepAlive: false
    },
    component: alicard
  },
  {
    path: '/cardObject',
    name: 'cardObject',
    meta: {
      title: '幸运详情',
      keepAlive: false
    },
    component: cardObject
  },
  {
    path:'/sevensign2019',
    name:'sevensign2019',
    meta:{
      title:'2019七天签到',
      keepAlive:false
    },
    component: sevensign2019
  },
  {
    path:'/sendNotice',
    name:'sendNotice',
    meta:{
      title:'通知',
      keepAlive:false
    },
    component: sendNotice
  },
  {
    path:'/newUser2019',
    name:'newUser2019',
    meta:{
      title:'新手下载红包',
      keepAlive:false
    },
    component: newUser2019
  },
  {
    path:'/newYear',
    name:'newYear',
    meta:{
      title:'新春狂欢',
      keepAlive:false
    },
    component: newYear
  },
  {
    path:'/weekRecharge',
    name:'weekRecharge',
    meta:{
      title:'充值排行榜',
      keepAlive:false
    },
    component: weekRecharge
  },
  {
    path:'/christmas',
    name:'christmas',
    meta:{
      title:'圣诞狂欢节',
      keepAlive:false
    },
    component: christmas
  },
  {
    path:'/threeDays',
    name:'threeDays',
    meta:{
      title:'充588送188元',
      keepAlive:false
    },
    component: threeDays
  },
  {
    path: '/countDown',
    name: 'countDown',
    meta:{
      title:'满588送88元',
      keepAlive:false
    },
    component: countDown
  },
  {
    path: '/score',
    name: 'score',
    meta:{
      title:'卖茶叶送积分',
      keepAlive:false
    },
    component: score
  },
  {
    path: '/seven',
    name: 'seven',
    meta:{
      title:'七夕活动',
      keepAlive:false
    },
    component: seven
  },
  {
    path: '/rebate',
    name: 'rebate',
    meta:{
      title:'充值返利活动',
      keepAlive:false
    },
    component: rebate
  },
  {
    path: '/lqscore',
    name: 'lqscore',
    meta:{
      title:'卖茶叶送积分',
      keepAlive:false
    },
    component: lqscore
  },
  {
    path: '/integral',
    name: 'integral',
    meta:{
      title:'5元积分奖励',
      keepAlive:false
    },
    component: integral
  },
  {
    path: '/lqcommentOrder',
    name: 'lqcommentOrder',
    meta:{
      title:'天天抢券',
      keepAlive:false
    },
    component: lqcommentOrder
  },
  {
    path: '/newHand/:id/:user',
    name: 'newHand',
    meta:{
      title:'60元新手积分券',
      keepAlive:false
    },
    component: newHand
  },
  {
    path: '/download',
    name: 'download',
    meta:{
      title:'应用下载',
      keepAlive:false
    },
    component: download
  },
  {
    path: '/free-order',
    name: 'freeOrder',
    meta:{
      title:'逢8免单',
      keepAlive:false
    },
    component: freeOrder
  },
  {
    path: '/help',
    name: 'help',
    meta:{
      title:'新手引导',
      keepAlive:false
    },
    component: help
  },
  {
    path: '/lqhelp',
    name: 'lqhelp',
    meta:{
      title:'新手引导',
      keepAlive:false
    },
    component: lqhelp
  },
  {
    path: '/lqlghelp',
    name: 'lqlghelp',
    meta: {
      title: '新手引导',
      keepAlive: false
    },
    component: lqlghelp
  },
  {
    path: '/lucky-click',
    name: 'luckyClick',
    meta:{
      title:'不中包赔',
      keepAlive:false
    },
    component: luckyClick
  },
  {
    path: '/lqlucky-click',
    name: 'lqluckyClick',
    meta:{
      title:'不中包赔',
      keepAlive:false
    },
    component: lqluckyClick
  },
  {
    path: '/comment-order',
    name: 'commentOrder',
    meta:{
      title:'晒单送积分',
      keepAlive:false
    },
    component: commentOrder
  },
  {
    path: '/hongbao/:log?',
    name: 'hongbao',
    meta:{
      title:'抢红包',
      keepAlive:false
    },
    component: hongbao
  },
  {
    path: '/lqhongbao/:log?',
    name: 'lqhongbao',
    meta:{
      title:'抢红包',
      keepAlive:false
    },
    component: lqhongbao
  },
  {
    path: '/accept',
    name: 'accept',
    meta:{
      title:'服务协议',
      keepAlive:false
    },
    component: accept
  },
  {
    path: '/guide',
    name: 'guide',
    meta:{
      title:'新手引导',
      keepAlive:false
    },
    component: guide
  },
  {
    path: '/testPay/:id',
    name: 'testPay',
    meta:{
      title:'审核页面',
      keepAlive:false
    },
    component: testPay
  },
  {
    path: '/download-guide',
    name: 'downloadGuide',
    meta:{
      title:'下载指南',
      keepAlive:false
    },
    component: downloadGuide
  },
  {
    path: '/rule',
    name: 'rule',
    meta:{
      title:'公平，宣传海报',
      keepAlive:false
    },
    component: rule
  },
  {
    path: '/lqrule',
    name: 'lqrule',
    meta:{
      title:'公平，宣传海报',
      keepAlive:false
    },
    component: lqrule
  },
  {
    path: '/rotary',
    name: 'rotary',
    meta:{
      title:'幸运大转盘',
      keepAlive:false
    },
    component: rotary
  },
  {
    path: '/register/:user',
    name: 'register',
    meta:{
      title:'注册页面',
      keepAlive:false
    },
    component: register
  },
  // {
  //   path: '/invitation/:app?',
  //   name: 'invitation',
  //   component: invitation
  // },
  {
    path: '/shoutu/:app?',
    name: 'shoutu',
    meta:{
      title:'邀请',
      keepAlive:false
    },
    component: shoutu
  },
  {
    path: '/invitationLog',
    name: 'invitationLog',
    meta:{
      title:'邀请',
      keepAlive:false
    },
    component: invitationLog
  },
  {
    path: '/product-view/:id/:guid',
    name: 'productView',
    meta:{
      title:'商品详情',
      keepAlive:false,
      keep: true
    },
    component: productView
  },
  {
    path: '/product-detail/:id',
    name: 'productDetail',
    meta:{
      title:'商品图文详情',
      keepAlive:false,
      keep: true
    },
    component: productDetail
  },
  {
    path: '/chart-detail',
    name: 'chartDetail',
    meta: {
      title: '往期走势',
      keepAlive: false,
      // keep: true
    },
    component: chartDetail
  },
  {
    path: '/chart-view',
    name: 'chartView',
    meta: {
      title: '引导详情',
      keepAlive: false,
      // keep: true
    },
    component: chartView
  },
  {
    path: '/lqdbDown',
    name: 'lqdbDown',
    meta: {
      title: '兑宝下载中心',
      keepAlive: false,
      // keep: true
    },
    component: lqdbDown
  },
  {
    path: '/lqdbDownx',
    name: 'lqdbDownx',
    meta: {
      title: '兑宝下载中心',
      keepAlive: false,
      // keep: true
    },
    component: lqdbDownx
  },
  {
    path: '/PKking',
    name: 'PKking',
    meta: {
      title: 'PKking',
      keepAlive: false,
      // keep: true
    },
    component: PKking
  },
  {
    path: '/top-view',
    name: 'topView',
    meta:{
      title:'上榜规则',
      keepAlive:false
    },
    component: topView
  },
  {
    path: '/express/:name/:code',
    name: 'express',
    meta:{
      title:'物流查询',
      keepAlive:false
    },
    component: express
  },
  {
    path: '/share',
    name: 'share',
    meta:{
      title:'分享的积分奖励',
      keepAlive:false
    },
    component: share
  },
  {
    path: '/lqjoy',
    name: 'lqjoy',
    meta:{
      title:'分享的积分奖励',
      keepAlive:false
    },
    component: lqjoy
  },
  {
    path: '/agreement',
    name: 'agreement',
    meta:{
      title:'',
      keepAlive:false
    },
    component: agreement
  },
  {
    path: '/feedback',
    name: 'feedback',
    meta:{
      title:'反馈',
      keepAlive:false
    },
    component: feedback
  },
  {
    path: '/recharge',
    name: 'recharge',
    meta:{
      title:'充值',
      keepAlive:false
    },
    component: recharge
  },
  {
    path: '/daili01',
    name: 'daili01',
    meta:{
      title:'新手活动',
      keepAlive:false
    },
    component: daili01
  },
  {
    path: '/sevenday',
    name: 'sevenday',
    meta:{
      title:'中秋活动',
      keepAlive:false
    },
    component: sevenday
  },
  {
    path: '/eightsix',
    name: 'eightsix',
    meta:{
      title:'逢6进8',
      keepAlive:false
    },
    component: eightsix
  },
  {
    path: '/award',
    name: 'award',
    meta:{
      title:'充值加奖60%',
      keepAlive:false
    },
    component: award
  },
  {
    path:'/midinvite',
    name:'midinvite',
    meta:{
      title:'邀请充值30元',
      keepAlive:false
    },
    component:midinvite,
  },
  {
    path:'/autumn',
    name:'autumn',
    meta:{
      title:'中秋抢券',
      keepAlive:false
    },
    component:autumn
  },
  {
    path: '/guide01',
    name: 'guide01',
    meta:{
      title:'新手引导',
      keepAlive:false
    },
    component: guide01
  },
  {
    path: '/dbbhelp',
    name: 'dbbhelp',
    meta:{
      title:'新手秘籍',
      keepAlive:false
    },
    component:dbbhelp
  },
  {
    path:'/guoqingfahuo',
    name:'gqfh',
    meta:{
      title:'国庆发货',
      keepAlive:false
    },
    component: gqfh
  },
  {
    path:'/invitation',
    name:'friends',
    meta:{
      title:'邀请好友',
      keepAlive:false
    },
    component: invitation
  },
  {
    path:'/yqrecord',
    name:"yqrecord",
    meta:{
      title:'邀请记录',
      keepAlive:false
    },
    component:yqrecord

  },
  {
    path:'/yqdetail',
    name:"yqdetail",
    meta:{
      title:'佣金明细',
      keepAlive:false
    },
    component:yqdetail,
  },
  {
    path:'/yjshift',
    name:'yjshift',
    meta:{
      title:'转入积分明细',
      keepAlive:false
    },
    component:yjshift,
  },
  {
    path: '/yjrule',
    name: 'yjrule',
    meta:{
      title:'佣金活动规则',
      keepAlive:false
    },
    component: yjrule,
  },
  {
    path:'/yjdeposit',
    name:'yjdeposit',
    meta:{
      title:'佣金提现明细',
      keepAlive:false
    },
    component: yjdeposit
  },
  {
    path:'/yjinteg',
    name:'yjinteg',
    meta:{
      title:'转入积分',
      keepAlive:false
    },
    component: yjinteg
  },
  {
    path:'/yjout',
    name:'yjout',
    meta:{
      title:'佣金提现',
      keepAlive:false
    },
    component:yjout
  },
  {
    path:'/yjmaster',
    name: 'yjmaster',
    meta:{
      title:'佣金师父ID',
      keepAlive:false
    },
    component: yjmaster
  },
  {
    path:'/xylucky',
    name:'xylucky',
    meta:{
      title:'幸运计算公式',
      keepAlive:false
    },
    component: xylucky
  },
  {
    path: '/luckyquery',
    name: 'luckyquery',
    meta: {
      title: '开奖查询',
      keepAlive: false
    },
    component: luckyquery
  },
  {
    path:'/yjusable',
    name:'yjusable',
    meta:{
      title:'佣金明细',
      keepAlive:false
    },
    component: yjusable
  },
  {
    path:'/ygletter',
    name:'ygletter',
    meta:{
      title:'乐购会员的一封信',
      keepAlive:false
    },
    component: ygletter
  },
  {
    path: '/ygletterdb',
    name: 'ygletterdb',
    meta:{
      title:'乐购会员的一封信',
      keepAlive:false
    },
    component: ygletterdb
  },
  {
    path:'/sevensign',
    name:'sevensign',
    meta:{
      title:'七天登陆免费领',
      keepAlive:false
    },
    component: sevensign
  },
  {
    path: '/luckyvip',
    name: 'luckyvip',
    meta:{
      title:'幸运188买会员打卡',
      keepAlive:false
    },
    component: luckyvip
  },
  {
    path: '/dbdown',
    name: 'dbdown',
    meta:{
      title:'乐购下载down',
      keepAlive:false
    },
    component: dbdown
  },
  {
    path: '/teaturn',
    name:'teaturn',
    meta:{
      title:'茶叶回收大作战',
      keepAlive:false
    },
    component: teaturn
  },
  {
    path: '/zerobuy',
    name: 'zerobuy',
    meta:{
      title:'0元换购',
      keepAlive:false
    },
    component: zerobuy
  },
  {
    path: '/sendba',
    name: 'sendba',
    meta:{
      title:'寄售宝',
      keepAlive:false
    },
    component: sendba
  },
  {
    path: '/sendbanew',
    name: 'sendbanew',
    meta: {
      title: '寄售宝',
      keepAlive: false
    },
    component: sendbanew
  },
  {
    path:'/yydown',
    name:'yydown',
    meta:{
      title:'零钱乐购下载down',
      keepAlive:false
    },
    component: yydown
  },
  {
    path: '/greenweal',
    name: 'greenweal',
    component: greenweal,
    redirect:'/peoplezx',
    children:[
       {
        path:'/peoplezx',
        name:'peoplezx',
         meta:{
           title:'新人专享',
           keepAlive:false
         },
        component: peoplezx
      },
      {
        path: '/xsinvteli',
        name: 'xsinvteli',
        meta:{
          title:'邀请有礼',
          keepAlive:false
        },
        component: xsinvteli
      }
    ]
  },
  {
    path:'/ywcard',
    name:'ywcard',
    meta:{
      title:'1000话费卡搞事情',
      keepAlive:false
    },
    component: ywcard
  },
  {
    path:'/zeroshopp',
    name:'zeroshopp',
    meta:{
      title:'零钱商城',
      keepAlive:false
    },
    component: zeroshopp
  },
  {
    path:'/zeroshopptz',
    name:"zeroshopptz",
    meta:{
      title:'零钱商城',
      keepAlive:false
    },
    component: zeroshopptz,
  },
  {
    path:'/quest',
    name:"quest",
    meta:{
      title:'有奖调查',
      keepAlive:false
    },
    component: quest
  },
  {
    path:"/yexiaodi01",
    name:"yexiaodi01",
    meta:{
      title:'一元新手红包60元',
      keepAlive:false
    },
    component: yexiaodi01
  },
  {
    path:'/yexiaodi02',
    name:"yexiaodi02",
    meta:{
      title:'一元新手红包60元',
      keepAlive:false
    },
    component: yexiaodi02
  },
  {
    path:'/vxtz',
    name:'vxtz',
    meta:{
      title:'VX h5跳转',
      keepAlive:false
    },
    component: vxtz
  },
  {
    path:'/zerobuy11',
    name:'zerobuy11',
    meta:{
      title:'0元购双11专享活动',
      keepAlive:false
    },
    component: zerbuytwo
  },
  {
    path:'/zerobuyweek',
    name:'zerobuyweek',
    meta:{
      title:'每周0元购',
      keepAlive:false
    },
    component: zerobuyweek
  },
  {
    path:'/limitShopp',
    name:'limitShopp',
    meta:{
      title:'限购专区',
      keepAlive:false
    },
    component: limitShopp
  },
  {
    path:'/newYearActivity',
    name:'newYearActivity',
    meta:{
      title:'2019元旦通知',
      keepAlive:false
    },
    component: newYearActivity
  },
  {
    path:'/festival/:app?',
    name:'festival',
    component: festival,
    meta:{
      title: '新手专享',
      keepAlive: false
    }
  },
  {
    path:'/awPresentation/:app?',
    name:'awPresentation',
    component: awPresentation,
    meta:{
      title: '领奖说明',
      keepAlive: false
    }
  },
  {
    path: '/downloadApp',
    name: 'downloadApp',
    component: downloadApp,
    meta: {
      title: 'APP下载',
      keepAlive: false
    },
  },
  {
    path: '/crackdown',
    name: 'crackdown',
    component: crackdown,
    meta: {
      title: '打假声明',
      keepAlive: false
    },
  },
  {
    path: '/identify',
    name: 'identify',
    component: identify,
    meta: {
      title: '新手指南',
      keepAlive: false
    },
  },
  {
    path: '/potato',
    name: 'potato',
    component: potato,
    meta: {
      title: '官方客服',
      keepAlive: false
    },
  },
  {
    path: '/plant',
    name: 'plant',
    component: plant,
    meta: {
      title: '全面升级',
      keepAlive: false
    },
  },
  {
    path: '/shake',
    name: 'shake',
    component: shake,
    meta: {
      title: '充值加送110',
      keepAlive: false
    },
  },
  {
    path: '/sixShake',
    name: 'sixShake',
    component: sixShake,
    meta: {
      title: '六一大放送',
      keepAlive: false
    },
  },

];

export default routers
