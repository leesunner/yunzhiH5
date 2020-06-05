<template>
    <div id="register" style="background: #f9c80d;">
        <div class="top-b">
            <img src="../../../static/image/register-banner.png" class="width_100" alt=""/>
        </div>
        <div class="z-regist">
            <input class="z-phoneI" type="number" placeholder="请输入您的手机号" v-model="phone"/>
            <div class="z-registW clearfix">
                <input class="z-codeI fl" type="text" placeholder="请输入手机验证码" v-model="code"/>
                <div class="z-codeBtn fr" @click="sendCode" v-if="codeType">获取验证码</div>
                <div class="z-codeBtn fr" v-else style="background:#e8e8e8;">{{wait}}秒后重发</div>
            </div>
            <div class="z-bigBtn" @click="toRegister">立即注册</div>
        </div>
        <div class="foot">
            <img src="static/image/register-bottom.png" class="width_100" alt=""/>
        </div>
      <!--判断微信里面打开弹窗-->
        <!--<div class="weixinBroswer" v-if="weixinBroswerPop">-->
        <!--<div class="popCon">-->
          <!--<p>如果不能下载 </p>-->
          <!--<p>请点击右上角，在浏览器中打开进行下载</p>-->
        <!--</div>-->
      <!--</div>-->
    </div>
</template>
<script>
    export default{
        name:"register",
        data(){
            return {
                codeType:true,
                phone:"",
                code:'',
                wait:60,
                weixinBroswerPop:false
            }
        },
        created: function () {
            document.title = '注册送60元大礼包';
            document.getElementsByTagName('meta')['description'].setAttribute('content','邀请好友得奖励啦，全新师徒系统上线，徒弟注册成功下单实物商品即可获得奖励！');
//          let is_weixin = (function(){return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1})();
//          if(is_weixin){
//            this.weixinBroswerPop=true;
//          }else{
//            return false;
//          }
        },
        methods: {
            sendCode: function () {
                if (this.phone == null || this.phone.length < 11) {
                    this.$vux.toast.text("请填写正确的手机号");
                } else {
                    var that = this;
                    this.$axios.post('/site/code?version=v2', {"Code[phone]": this.phone,"Code[type]":'reg'}).then(function (response) {
                        if (response.data.code == 1) {
                            that.codeType = false;
                            that.wait = 60;
                            that.setTime();
                            that.$vux.toast.text("发送成功");
                        } else {
                            that.$vux.toast.text(response.data.msg);
                        }
                    })
                }
            },
            toRegister:function(){
                if(this.phone == null || this.phone == '' || this.phone.length < 11){
                    this.$vux.toast.text("请填写正确的手机号码");
                }else if(this.code==null || this.code==''){
                    this.$vux.toast.text("请填写验证码");
                }else{
                    var that = this;
                        this.$axios.post('/site/friendsreg?version=v2', {"User[share_id]": this.$route.params.user,"User[username]":this.phone,"User[code]":this.code}).then(function (response) {
                        if (response.data.code == 1) {
                            that.$vux.toast.text("注册成功，请下载APP领取");
//                            that.$router.push({
//                                name: 'download-guide',
//                                query: {time: new Date().valueOf()}
//                            });
                          let ua = navigator.userAgent.toLowerCase();
                          //android终端
                          let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
                          //ios终端
                          let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
                          if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                            //ios
                            window.location = 'itms-services:///?action=download-manifest&url=https://app1yyg.oss-cn-huhehaote.aliyuncs.com/download/test.plist'
                          } else if(/(Android)/i.test(navigator.userAgent)) {
                            //android
                            window.location = 'https://app1yyg.oss-cn-huhehaote.aliyuncs.com/download/1yyg.apk'
                          }
                        }else{
                            that.$vux.toast.text(response.data.msg);
                        }
                    });
                }
            },
            setTime: function () {
                if(this.wait == 0){
                    this.codeType = true;
                }else{
                    this.wait--;
                    var that = this;
                    setTimeout(function() {
                        that.setTime()
                    }, 1000)
                }
            },
        }
    }
</script>
<style>
  body{
    background: #fac80b;
  }
    #register img { width:100%; vertical-align:middle; }
    .z-regist { padding:0 12%; margin-top:-140px; position:relative; }
    .z-phoneI { width:100%; height:35px; line-height:35px; padding-left:10px; border:1px solid #460d08; border-radius:3px; margin-bottom:10px; }
    .z-codeI { width:55%; height:35px; line-height:35px; padding-left:10px; border:1px solid #460d08; border-radius:3px; }
    .z-codeBtn { width:87px; height:36px; line-height:36px; border-bottom:2px solid #f2951d; background-color:#ffd503; border-radius:3px; text-align:center; color:#600101; float:right; }
    .z-registW { padding-bottom:25px; }
    .z-bigBtn { width:100%; height:36px; line-height:36px; text-align:center; color:#fff; background-color:#f75d57; border-radius:3px; border-bottom:2px solid #c42f2a; }
  .weixinBroswer{
    width:100%;
    height:100%;
    position: fixed;
    top:0;
    left:0;
    background: rgba(0,0,0,0.5);
  }
  .weixinBroswer .popCon{
    padding:20px;
    background: #fff;
    border-radius:6px;
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    -o-transform: translate(-50%,-50%);
    -moz-transform: translate(-50%,-50%);
    -webkit-transform: translate(-50%,-50%);
  }
    .weixinBroswer .popCon p{
      font-size:16px;
      text-align: center;
    }
</style>
