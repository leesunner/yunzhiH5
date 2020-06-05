<template>
  <div class="mine" >
    <component :is="activeItem" :levels="level"></component>
    <bullet class="mine-cl"  v-for="(item,index) in data" :key="index" v-if="item.init" :para="item.para" :num="item.num" :url="item.link" :icon="item.icon" :title="item.title"></bullet>
  </div>
</template>

<script>
  import bullet from '@/components/public/bullet'
  import logining from '@/components/mine/loginStatus/logining'
  import unLogin from '@/components/mine/loginStatus/unLogin'
  import {mapGetters,mapActions,mapMutations} from 'vuex'
    export default {
      name: "mine",
      components:{
        bullet,
        logining,
        unLogin
      },
      data(){
          return{
            activeItem:'',//登录控制器
            headImg:'',
            level:'',//特权等级
            data:[
              {//未登录默认显示
                icon:require('@/assets/img/Blacktag7.png'),
                title:this.$appid=='lqlg'?'乐购记录':this.$appid=='yyyg'?'云购记录':this.$appid=='lqdb'&&this.$logoType==1?'兑宝记录':this.$appid=='lqdb'&&this.$logoType==2?'拼购记录':this.$appid=='yytj'?'乐购记录':this.$appid=='yytg'?'听歌记录':'购买记录',
                link:'myBuyRecord',
                para:{},
                init:true
              },
              {//未登录默认显示
                icon:require('@/assets/img/Blacktag4.png'),
                title:'幸运记录',
                link:'luckyRecord',
                para:{},
                init:true
              },
              {//未登录默认显示
                icon:require('@/assets/img/Blacktag6.png'),
                title:'账户明细',
                link:'accountDetails',
                para:{},
                init:true
              },
              // {//未登录默认显示
              //   icon:require('@/assets/img/Blacktag8.png'),
              //   title:'淘宝卡领取',
              //   link:'alicard',
              //   para:{},
              //   init:true
              // },
              {
                icon:require('@/assets/img/Blacktag5.png'),
                title:'我的晒单',
                link:'showOrder',
                para:{},
                init:false
              },
              {
                icon:require('@/assets/img/Blacktag.png'),
                title:'我的积分券',
                link:'ticket',
                para:{},
                init:false,
                num:''
              },
              {
                icon:require('@/assets/img/Blacktag1.png'),
                title:this.$appid=='yytj'?'我的礼包':'我的茶叶和礼包',
                link:'teaPackage',
                para:{},
                init:false
              },
              {
                icon:require('@/assets/img/Blacktag2.png'),
                title:'收货地址',
                link:'address',
                para:{type:1},
                init:false
              },
              {//未登录默认显示 true
                icon:require('@/assets/img/Blacktag3.png'),
                title:'帮助中心',
                link:'helpCenter',
                para:{},
                init:true
              },
              {//未登录默认显示 true
                icon:require('@/assets/img/rzsm.png'),
                title:'实名认证',
                link:'certification',
                para:{},
                init:false
              },
            ]
          }
      },
      computed:{
        ...mapGetters([//获取用户信息
          'getUserInfo'
        ])
      },
      created(){
        this.getMsg()
      },
      methods:{
        ...mapActions([
          'login'
        ]),
        ...mapMutations([
          'setUserInfo'
        ]),
        getMsg(){
          //登录后获取用户信息
          this.login().then(res=>{
            let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
            if(userInfo==null){userInfo={}}//控制null报错,防止堵塞
            if(userInfo.user_id){
              this.setUserInfo(userInfo)
              this.activeItem = 'logining'
              this.level = require('@/assets/img/Lv.'+userInfo.ulevel+'@2x.png')
              this.data.forEach(item=>{
                if(!item.init){
                  item.num = userInfo.coupon_num+'张'
                  item.init = true
                }
              })
            }else{
              this.activeItem = 'unLogin'
            }
          })
        }
      }
    }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/reset.scss";
  .mine{
    width: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    font-family: 'PingFang SC';
    position: absolute;
    @include ios-Scroll;
    overflow: auto;
    padding-top: 88*$r;
    padding-bottom: 98*$r;
    &-cl:nth-child(5){
      margin-bottom: 10*$r;
      border-bottom: none;
    }
    &-cl:nth-child(7){
      margin-bottom: 10*$r;
      border-bottom: none;
    }
    &-cl:nth-child(11){
      margin-bottom: 10*$r;
      border-bottom: none;
    }
  }
</style>
