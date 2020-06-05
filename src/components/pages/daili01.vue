<template>
  <div id="guide">
    <div class="topBanner">
      <img src="../../../static/image/guideBanner1.png"/>
    </div>
    <div class="downloadBtn">
      <!-- <button type="button" @click="toDownloadAnZ">
        <img src="../../static/image/anZ.png"/>
        <span>安卓下载</span>
      </button> -->
      <img class="button" src="../../../static/image/anZ1.png" @click="toDownloadAnZ"/>
      <!-- <button type="button" @click="toDownloadIos"><img src="../../static/image/ios.png"/><span>IOS下载</span></button> -->
      <img class="button" src="../../../static/image/ios1.png" @click="toDownloadIos"/>
    </div>
    <!-- <h1 class="guideTit">苹果如何安装应用</h1> -->
    <div class="guideCon">
      <img src="../../../static/image/guideCon1.png"/>
      <!-- <img src="../../static/image/ggbj.jpg" alt=""> -->
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
    methods:{
      toDownloadAnZ:function(){
        // window.location = 'https://app1yyg.oss-cn-huhehaote.aliyuncs.com/download/1yyg.apk'
         window.location = 'https://app1yyg.oss-cn-huhehaote.aliyuncs.com/download/dbb_sms.apk'


      },
      toDownloadIos:function(){
        // window.location = 'itms-services:///?action=download-manifest&url=https://app1yyg.oss-cn-huhehaote.aliyuncs.com/download/test.plist'
        window.location='itms-services:///?action=download-manifest&url=https://app1yyg.oss-cn-huhehaote.aliyuncs.com/download/dbb_sms.plist';
      }
    }
  }
</script>
<style lang="scss">
  #guide{
    background: #fff;
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
    z-index: 999;
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
