<template>
  <div class="headr">
    <div class="back">
      <div v-show="showHead" class="backLeft" @click="goBack()">
        <img src="../../assets/images/block.png" alt="">
      </div>
      <!--<span class="backLeft" @click="goBack()">返回</span>-->
      <span :class="{'title':true,'litterTitle':contro}">{{title}}</span>
      <!--<img class="mive" src="../../assets/img/qd.png" alt="" @click="goMvie()">-->
      <!--首页签到-->
      <!--<img class="headr-home" v-show="$route.name ==='home'" src="../../assets/img/qd.png">-->
      <!--我的消息显示-->
      <div class="headr-notice" v-show="$route.name ==='mine'&&getUserInfo.user_id" @click="navigateTo('myNotice')">
        <div class="headr-notice-con">
          <div class="headr-notice-con-point" v-show="getUserInfo.newMessage>0">{{getUserInfo.newMessage}}</div>
          <img class="headr-notice-con-img" src="../../assets/img/notz.png"/>
        </div>
      </div>
      <!--商品分享-->
      <img class="headr-mine" v-show="$route.name ==='productView'" @click="getyq" src="../../assets/img/proSharessss.png">
      <!--我的设置-->
      <img class="headr-mine" v-show="$route.name ==='mine'&&getUserInfo.user_id" @click="navigateTo('setting')" src="../../assets/img/settingm.png">
      <!--淘宝卡领取-->
      <img class="headr-mine" v-show="$route.name ==='cardObject'&&getUserInfo.user_id" src="../../assets/img/kefu.png"
        style="width: 0.8rem;height:0.8rem;top: 0.2rem;" @click="contentKf()">
      <!--登录注册-->
      <div class="headr-register" @click="navigateTo('userRegister')"  v-show="$route.name ==='userLogin'" >注 册</div>
      <!--已兑商品-->
      <div class="headr-register" style="width: 2rem;" @click="navigateTo('myBuyRecord')"  v-show="$route.name ==='exChanged'" >我的参与</div>
      <!--收货地址添加-->
      <div class="headr-register" @click="orderAddress"  v-show="$route.name ==='address'&&$route.query.type!=1" >完成</div>
    </div>
    <!--分享弹框-->
    <share-view :data="shareInfo"></share-view>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import shareView from '../../components/public/shareView'
export default {
  components:{shareView},
  props:{
   title:String,
    headBack:Boolean
  },
  watch:{
    title(newv,oldv){
      if(newv!=undefined){
        this.title = newv
        if(newv.length>8){
          this.contro = true
        }
      }
    },
    headBack(newv,oldv){
      if(newv==true){
        this.showHead = false
      }else{
        this.showHead = true
      }
    }
  },
  data() {
    return{
      contro:false,
      showHead:false,
      shareInfo:{},
      dataQQ:{//加qq群
        qqCode:'',
        key:1
      },
    }
  },
  computed:{
    ...mapGetters([//获取用户信息
      'getUserInfo'
    ])
  },
  methods: {
    getyq(){//分享好友
      var that = this;
     let val =  sessionStorage.getItem('goods_base_id')
      this.$axios.post('/site/sharecon?version=v2', {type: 1,id:val}).then(res=>{
        if(res.data.code==1){
          // that.$vux.loading.show({text: '请稍候'});
          that.shareInfo = res.data.data
        }
      });
    },
    orderAddress(){//对应中奖记录商品添加指定地址
      if (this.$route.query.type == '3') {
        this.$axios.post('order/confirmAddress?version=v2',{
          'address_id':this.$route.query.addressId,
          'order_id':this.$route.query.orderId
        }).then(res=>{
          if(res.data.code!=1){
            this.$vux.toast.text(res.data.msg)
          }else{
            this.$router.go(-1)
          }
        })
      } else {
        this.$axios.post('/recharge/confirmAddress?version=v2',{
          'address_id':this.$route.query.addressId,
          'recharge_order_id': this.$route.query.orderId
        }).then(res=>{
          if(res.data.code!=1){
            this.$vux.toast.text(res.data.msg)
          }else{
            this.$router.go(-1)
          }
        })
      }
    },
    goBack(){
      if(this.$route.name=='exchangSuccess'){
        this.$router.go(-2);
      }else if(this.$route.name=='showSuccess'){
        this.$router.go(-2);
      }else if(this.$route.name=='registerSuccess'){
        this.$router.go(-2);
      }else if(this.$route.query.control==1&&this.$route.name=='ticket'){
        this.$router.go(-3);
      }else{
        this.$router.go(-1);
      }
      // else if (this.$route.name=='productView'){this.navigateTo('home')}
    },
    closeGame(){
        if(this.client()=="android"){//返回app
            try {
              android.closeGame();
            }catch($e){
                alert($e.name + ": " + $e.message);
            }
        }else{
            window.location.href = 'miaobowpa:/CloseGame';
        }

    },
    client() {//判断设备
        var phone="";
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //androidึีถห
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //iosึีถห
        if (isiOS) {
            phone = "ios";
        } else {
            phone = "android";
        }
        return phone;
    },
    goMvie(){
      this.closeGame();
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
        }
      }
    },
    contentKf() {
      let that = this
      if(this.appType=='H5'){
        this.getQQ()
      }else{
        this.dataQQ.qqCode = sessionStorage.getItem('QQ')
        this.JsBridge.callHandler("qqHandler", JSON.stringify(that.dataQQ), res=>{});
      }
    }
  },
}
</script>
<style lang="scss" scoped>
@import "../../assets/css/reset.scss";
.headr{
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  &-home{
    width: 82*$r;
    height: 34*$r;
    position: absolute;
    top:25*$r;
    right:20*$r;
  }
  &-notice{
    width: 40*$r;
    height: 40*$r;
    position: absolute;
    top:25*$r;
    right:100*$r;
    &-con{
      position: relative;
      &-point{
        position: absolute;
        right: -12*$r;
        top: -8*$r;
        width: 28*$r;
        height: 28*$r;
        background-color: #ff2a2a;
        border-radius: 50%;
        text-align: center;
        line-height: 28*$r;
        font-size: 18*$r!important;
      }
      &-img{
        width: 40*$r;
        height: 40*$r;
      }
    }
  }
  &-mine{
    width: 40*$r;
    height: 40*$r;
    position: absolute;
    top:25*$r;
    right:40*$r;
  }
  &-register{
    width: 80*$r;
    height: 40*$r;
    position: absolute;
    top:23*$r;
    right:30*$r;
    line-height: 40*$r;
    text-align: center;
    font-size: 30*$r;
  }
}
.back{
  width: 100%;
  height: 88*$r;
  background-color: #f36c12;
  display: flex;
  align-items: center;
  font-size: 33*$r;
  color: #fff;
  position: relative;
  top: 0;
  left: 0;
  z-index: 999;
  .backLeft{
    display: flex;
    align-items: center;
    height: 100%;
  img{
    width: 17*$r;
    height: 30*$r;
    margin: 0 22*$r;
  }
}

  .title{
    font-size: 36*$r;
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 32*$r;
    transform: translate(-50%,-50%)
  }
  .litterTitle{
    font-size: 28*$r !important;
  }
  .mive{
    width: 30*$r;
    height: 30*$r;
    position: absolute;
    top:25*$r;
    right:20*$r;
 }
}
</style>

