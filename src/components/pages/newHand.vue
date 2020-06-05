<template>
  <div class="newHand">
    <div class="newHandBanner">
      <p>您的好友{{$route.params.user}}邀您领取</p>
      <img src="static/image/newHandBanner.png"/>
    </div>
    <div class="telNum">
       <label>
         <span>手机号</span>
         <input type="text" placeholder="请输入手机号码" v-model="tel"/>
       </label>
      <!--<label v-show="checkFirst">-->
        <!--<span>验证码</span>-->
        <!--<input type="text" placeholder="请输入验证码" class="checkFirstInput" v-model="checkNum"/>-->
        <!--<i class="checkFirst">{{code}}</i></label>-->
       <button class="lastStep" @click="submit">送60元积分券</button>
    </div>
    <!--<div class="doRegister">-->
      <!--<label><span>验证码</span><input type="text" placeholder="请输入短信验证码" class="identify"/><button class="resend">重新发送（42)</button></label>-->
      <!--<label><span>密码</span><input type="text" placeholder="请输入8-16位数字"/></label>-->
      <!--<button class="lastStep">完成注册</button>-->
    <!--</div>-->
    <div class="downloadPop" v-show="dlPop" @click="closePop">
      <div class="downloadPopCon">
        <img src="static/image/logo.png"/>
        <p>{{dlPopText}}</p>
        <button @click.stop="downloadEvent">{{buttonText}}</button>
      </div>
    </div>
    <div class="advertBoxF">
      <img src="static/image/zhuanX.png"/>
    </div>
    <div class="advertBoxS">
      <div class="listBox">
        <img src="static/image/newHand01.png"/>
        <div class="Info">
          <h2>5年乐购老字号</h2>
          <p>2013年成立，打破但还是同行业用户记录，注册用户突破百万</p>
        </div>
      </div>
      <div class="listBox">
        <img src="static/image/newHand02.png"/>
        <div class="Info">
          <h2>公平公正公开</h2>
          <p>计算公式完全公开，每个参与人次次数、时间一目了然</p>
        </div>
      </div>
      <div class="listBox">
        <img src="static/image/newHand03.png"/>
        <div class="Info">
          <h2>行业第一</h2>
          <p>国内乐购平台，综合评分位列第一</p>
        </div>
      </div>
    </div>
    <div class="userNum">
      <div class="serverNum">
        <p>累计服务用户数量</p>
        <p><span>1</span><span>9</span><span>8</span>万</p>
      </div>
      <div class="lotteryNum">
        <p>累计开奖次数</p>
        <p><span>1</span><span>9</span><span>8</span>万</p>
      </div>
    </div>
    <div class="newHandFooter">
      <p>@2018乐购商场运营团队</p>
      <p>兑换有风险，参与需谨慎</p>
    </div>
      <div class="share" @click="hide()" id="share">
          <div class="shareTop">
              <img src="../../assets/images/dbdownarrow.png" alt="">
              <p>点击右上角按钮，在浏览器中打开，</p>
              <p>即可安装哦~</p>
          </div>
      </div>
  </div>
</template>
<script>
  export default{
    name:'newHand',
    data(){
      return{
        tel:'',
        checkFirst:false,
        code:'',
        checkNum:'',
        dlPop:false,
        dlPopText:'',
        buttonText:''
      }
    },
    created:function(){
      document.title = '60元新手积分券';
      this.code=this.getCode();
      // this.JsBridge.callHandler("shareRight", {type:5, id:0}, function (responseData) {});
    },
    mounted () {
      this.isVxQQ();
    },
    watch:{
      tel:function(){
        if(!(/^1[34578]\d{9}$/.test(this.tel))){
          return false
        }
        this.checkFirst=true
      }
    },
    methods:{
      getCode:function(){
        var that=this;
        var all='0123456789';
        var b='';
        for(var i=0;i<4;i++){
          var index=Math.floor(Math.random()*10);
          b+=all.charAt(index)
        }
        return b
      },
      submit:function(){
        var that=this;
        if(!(that.checkFirst)){
          this.$vux.toast.text("请填写正确的手机号");
        }else{
          this.$axios.post('/site/friendsreg?version=v2', {"User[share_id]":that.$route.params.id,"User[username]":this.tel,"User[code]":''}).then(function (response) {
            if (response.data.code == 1) {
              that.dlPop=true;
              that.dlPopText='领取成功  前往app查看';
              that.buttonText='下载零钱乐购APP';
            }else if(response.data.code==-1){
              that.dlPop=true;
                that.dlPopText='此号码已被注册，请前往APP查看';
               that.buttonText='登录零钱乐购APP';
            }else{
              that.dlPop=false;
              that.$vux.toast.text(response.data.msg);
              alert(111)
            }
          });
        }
      },
      downloadEvent:function(){
        let ua = navigator.userAgent.toLowerCase();
        //android终端
        let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
        //ios终端
        let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          //ios
          window.location = 'itms-services:///?action=download-manifest&url=https://app1yyg.oss-cn-huhehaote.aliyuncs.com/download/test_day.plist'
        } else if(/(Android)/i.test(navigator.userAgent)) {
          //android
          window.location = 'https://app1yyg.oss-cn-huhehaote.aliyuncs.com/download/1yyg_sjb.apk'
        }
      },
      closePop:function(){
        this.dlPop=false;
      },
     hide(){//隐藏遮罩层
      var share=document.getElementById("share");
      share.style.display="none";
    },
    isVxQQ(){
       var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
            var share=document.getElementById("share");
            share.style.display="block";
        } else if (ua.match(/QQ/i) == "qq") {
             var share=document.getElementById("share");
              share.style.display="block";
        }
             return false;   


    }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/css/reset";
  .newHand{
    width:getREM(750);
    background:#da332b;
    position: relative;
    .newHandBanner{
      width:100%;
      position:relative;
      img{
        width:100%;
      }
      p{
        @include font-dpr(16px);
        color:#ffd08b;
        position: absolute;
        top:getREM(90);
        text-align: center;
        display: block;
        width:100%;
      }
    }
    .share{
        display: none;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background:rgba($color: #000000, $alpha: 0.5);
        z-index: 500;
        .shareTop{
          width: 100%;
          position: absolute;
          top:0;
          left:0;
          img{
            width: getREM(250);
            float: right;
            padding: getREM(24) getREM(51) 0 0;
          }
          p:nth-of-type(1){
            padding-top:getREM(300);

          }
          p{
            font-size: getREM(35);
            color:#fff;
            text-align: center;
          }
        }
      }
  }
  .telNum,.doRegister{
    width:getREM(690);
    background: #fff;
    padding:getREM(50) getREM(30);
    border-radius:getREM(10);
    margin:0 auto;
    label{
      display: inline-block;
      -webkit-border-radius:getREM(10);
      -moz-border-radius:getREM(10);
      border-radius:getREM(10);
      width:100%;
      border:getREM(2) solid #e5e5e5;
      height:getREM(103);
      margin-bottom:getREM(28);
      padding:0  0 0 getREM(30);
     .resend{
       width:getREM(217);
       border:none;
       height:getREM(80);
       margin:getREM(11) 0;
       border-left:getREM(1) solid #e5e5e5;
       background: transparent;
       color: #3a3a3a;
       font-size:getREM(29);
     }
     span{
       font-size:getREM(29);
       color: #3a3a3a;
       line-height: getREM(103);
     }
      input{
        height:getREM(103);
        outline:none;
        margin-left:getREM(30);
        width:getREM(400);
        display: inline-block;
        vertical-align: top;
        background: transparent;
        border:none;
        line-height: getREM(103);
        font-size:getREM(29);
        color: #3a3a3a;
        &::-webkit-input-placeholder{
        color:#898989
         }
      }
    .identify{
      width:getREM(260) !important;
      display: inline-block;
    }
    .checkFirstInput{
      width:getREM(350);
    }
    .checkFirst{
      font-style: normal;
      display: inline-block;
      width:getREM(100);
      color: #3a3a3a;
      @include font-dpr(15px);
      height:getREM(80);
      margin:getREM(11) 0;
      border-left:getREM(1) solid #e5e5e5;
      vertical-align: top;
      text-align: center;
      line-height:getREM(80);
    }
    }
  .lastStep{
      width:100%;
      height:getREM(103);
      -webkit-border-radius:getREM(10);
      -moz-border-radius:getREM(10);
      border-radius:getREM(10);
      background: #da332b;
      color:#fff;
  @include font-dpr(15px);
      font-weight:600;
      border:none;
      outline: none;
    }
  }
  .toast{
    padding:getREM(20);
  @include font-dpr(15px);
    color: #fff;
    background: rgba(0,0,0,0.6);
    -webkit-border-radius:getREM(10);
    -moz-border-radius:getREM(10);
    border-radius:getREM(10);
    display:inline-block;
    position: fixed;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    white-space: nowrap;
  }
  .downloadPop{
    width:100%;
    height:100%;
    position: fixed;
    top:0;
    left:0;
    background: rgba(0,0,0,0.6);
    .downloadPopCon{
      width:getREM(526);
      height:getREM(487);
      -webkit-border-radius:getREM(10);
      -moz-border-radius:getREM(10);
      border-radius:getREM(10);
      background: #fff;
      position: absolute;
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);
      img{
        width:getREM(119);
        height:getREM(119);
        -webkit-border-radius:getREM(20);
        -moz-border-radius:getREM(20);
        border-radius:getREM(20);
        overflow: hidden;
        margin-top: getREM(80);
        margin-left:50%;
        transform: translateX(-50%);
        -webkit-transform: translateX(-50%);
        -moz-transform: translateX(-50%);
      }
      p{
        margin-top:getREM(40);
        text-align: center;
      @include font-dpr(12px);
        color: #3a3a3a;
      }
      button{
        width: getREM(421);
        height:getREM(93);
        background: #da332b;
        -webkit-border-radius:getREM(10);
        -moz-border-radius:getREM(10);
        border-radius:getREM(10);
        @include font-dpr(15px);
        color: #fff;
        margin-top:getREM(60);
        margin-left:50%;
        transform: translateX(-50%);
        -webkit-transform: translateX(-50%);
        -moz-transform: translateX(-50%);
        outline:none;
      }
    }

  }
  .advertBoxS{
    width: getREM(690);
    -webkit-border-radius:getREM(10);
    -moz-border-radius:getREM(10);
    border-radius:getREM(10);
    padding:0 getREM(33);
    background: #fff;
    margin:getREM(29) auto 0 auto;
    .listBox{
      height:getREM(215);
      border-bottom:getREM(1) solid #e5e5e5;
      &:last-child{
      border-bottom: none;
       }
      img{
        width:getREM(101);
        height:getREM(101);
        display: inline-block;
        margin:getREM(65) 0;
      }
      .Info{
        display: inline-block;
        vertical-align: top;
        margin-top:getREM(65);
        width:getREM(465);
        margin-left:getREM(42);
        h2{
        @include font-dpr(16px);
          color: #3a3a3a;
        }
        p{
          @include font-dpr(12px);
          color:#898989;
          margin-top:getREM(20);
          line-height:getREM(36);
        }
      }
    }
  }
  .advertBoxF{
    width: getREM(690);
    margin:getREM(29) auto 0 auto;
    img{
      width:100%;
    }
  }
  .userNum{
    width:getREM(690);
    margin:0 auto getREM(100) auto;
    padding-top:getREM(30);
  .lotteryNum, .serverNum{
  display:inline-block;
  p{
  @include font-dpr(13px);
    color: #ffd086;
  span{
    width:getREM(61);
    height:getREM(75);
    display: inline-block;
  @include font-dpr(30px);
    color: #e6433c;
    background: url("../../../static/image/spanBg.png");
    background-size:100% ;
    margin-right:getREM(20);
    margin-top:getREM(20);
    text-align: center;
    line-height: getREM(75);
  }
  }
  }
  .lotteryNum{
    float: right;
  }
  }

  .newHandFooter{
    border-top:1px solid #ef8d62;
    width:getREM(690);
    margin:0 auto;
    height:getREM(145);
    padding-top:getREM(20);
    p{
      @include font-dpr(9px);
      color:#ef8d62;
      text-align: center;
      margin-bottom:getREM(12);
    }

  }



</style>
