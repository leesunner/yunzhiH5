<template>
  <div id="guide">
    <h2 v-title="'新手红包60元'"></h2>
    <div class="topBanner">
      <img src="../../../static/img/guideBanner1.png"/>
    </div>
    <div class="downloadBtn">
      <!-- <button type="button" @click="toDownloadAnZ">
        <img src="../../static/image/anZ.png"/>
        <span>安卓下载</span>
      </button> -->
      <img class="button" src="../../../static/img/anZ1.png" @click="toDownloadAnZ"/>
      <!-- <button type="button" @click="toDownloadIos"><img src="../../static/image/ios.png"/><span>IOS下载</span></button> -->
      <img class="button" src="../../../static/img/ios1.png" @click="toDownloadIos"/>
    </div>
    <!-- <h1 class="guideTit">苹果如何安装应用</h1> -->
    <div class="guideCon">
      <img src="../../../static/image/guideCon1.png"/>
      <!-- <img src="../../static/image/ggbj.jpg" alt=""> -->
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
        document.title='新手红包60元';
      }else{
        document.title='新手红包60元';
      }
    },
    mounted () {
       this.isVxQQ();
    },
    methods:{
      toDownloadAnZ:function(){
         window.location = 'http://app1yyg.oss-cn-huhehaote.aliyuncs.com/download/yyyg-release_legu_yexiaodi01_signed_zipalign.apk'


      },
      toDownloadIos:function(){
        window.location='itms-services:///?action=download-manifest&url=https://app1yyg.oss-cn-huhehaote.aliyuncs.com/download/yyyg_yxd.plist';
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
        background:rgba($color: #000000, $alpha: 0.6);
        z-index: 500;
        .shareTop{
          width: 100%;
          position: absolute;
          top:0;
          left:0;
          img{
            width: getREM(250);
            float: right;
            margin: getREM(24) getREM(51) 0 0;
          }
          p:nth-of-type(1){
            padding-top:getREM(300);

          }
          p{
            font-size: getREM(35);
            color:#fff;
            text-align: center;
            font-weight: 600;
            line-height: 60*$r;
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
    position: absolute;
    z-index: 9;
    margin-top:20px;
    width:100%;
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    // margin-top:40px;
    // font-size:16px;
    .button{
      // display: none;//改动
      width:40%;
      height:50px;
      // font-size:18px;
      // color: #fff;
      // -webkit-border-radius:36px;
      // -moz-border-radius:36px;
      // border-radius:36px;
      // display: inline-block;
      // line-height:50px;
      // vertical-align:middle;
      // outline:none;
    // &:nth-of-type(1){
    //     background:#ff7f5c ;
    //   }
    // &:nth-of-type(2){
    //    background:#fdc85a ;
    //  }
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
    position: relative;
    width:100%;
    // padding:10%;
    // box-sizing:border-box;
    img{
      width:100%;
    }
  }
</style>
