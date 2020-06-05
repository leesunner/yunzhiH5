<template>
  <div id="guide">
    <h2 v-title="'乐购，五年乐购老字号'"></h2>
    <div class="topBanner">
      <img src="../../../static/image/guideBanner.png"/>
    </div>
    <div class="downloadBtn">
      <button type="button" @click="toDownloadAnZ"><img src="../../../static/image/anZ.png"/>
        <span>安卓下载</span></button>
      <button type="button" @click="toDownloadIos"><img src="../../../static/image/ios.png"/><span>IOS下载</span></button>
    </div>
    <!-- <h1 class="guideTit">苹果如何安装应用</h1> -->
    <div class="guideCon">
      <img src="../../../static/image/guideCona.jpg" alt="">
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
    data(){
      return{
      }
    },
    created:function(){
      var appid = sessionStorage.getItem('app');
      if(appid=="lqdb"){
        document.title='零钱乐购商城互助购物协议';
      }else{
        document.title='零钱乐购商城互助购物协议';
      }
    },
    mounted() {
      this.isVxQQ()
    },
    methods:{
      toDownloadAnZ:function(){
        window.location = 'http://app1yyg.oss-cn-huhehaote.aliyuncs.com/download/yyyg-release-sms.apk'
      },
      toDownloadIos:function(){
        window.location = 'itms-services:///?action=download-manifest&url=https://app1yyg.oss-cn-huhehaote.aliyuncs.com/download/yyyg_sms_827.plist'
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


    },
   hide(){//隐藏遮罩层
      var share=document.getElementById("share");
      share.style.display="none";
    },
    }
  }
</script>
<style lang="scss">
@import "../../assets/css/reset";
  #guide{
    background: #fff;
    position: relative;
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
            line-height: getREM(70);
          }
        }
      }
  }
  .topBanner{
    width:100%;
    img{
      width:100%;
      display: block;
    }
  }
  .guideTit{
    font-size:26px;
    color: #333;
    text-align: center;
    margin-top:20px;
  }
  .downloadBtn{
    width:100%;
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    margin-top:40px;
    font-size:16px;
    button{
      width:40%;
      height:50px;
      font-size:18px;
      color: #fff;
      -webkit-border-radius:10px;
      -moz-border-radius:10px;
      border-radius:10px;
      display: inline-block;
      line-height:50px;
      vertical-align:middle;
      outline:none;
    &:nth-of-type(1){
        background:#333 ;
      }
    &:nth-of-type(2){
       background:#35bf83 ;
     }
     img{
       width:12%;
       display: inline-block;
       vertical-align: -5px;
       margin-right:4%;
     }
     span{
       display: inline-block;
       vertical-align: middle;
     }
    }
  }
  .guideCon{
    width:100%;
    padding:10%;
    box-sizing:border-box;
    img{
      width:100%;
    }
  }
</style>
