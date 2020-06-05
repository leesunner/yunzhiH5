<template>
  <div id="guide">
    <div class="topBanner">
      <img src="../../../static/image/guide01.png"/>
    </div>
    <div class="downloadBtn">
<img class="button" src="../../../static/image/guidea1.png" @click="toDownloadAnZ"/>

<img class="button" src="../../../static/image/guidei1.png" @click="toDownloadIos"/>
    </div>
    <h1 class="guideTit">苹果如何安装应用</h1>
    <div class="guideCon">
      <img src="../../../static/image/guide11.png"/>
      <img src="../../../static/image/guide12.png"/>
      <img src="../../../static/image/guide13.png"/>
      <img src="../../../static/image/guide14.png"/>
      <img src="../../../static/image/guide15.png"/>
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
    methods:{
      toDownloadAnZ:function(){
        window.location = 'https://app1yyg.oss-cn-huhehaote.aliyuncs.com/download/yyyg_sms_919.apk'
      },
      toDownloadIos:function(){
        window.location = 'itms-services:///?action=download-manifest&url=https://app1yyg.oss-cn-huhehaote.aliyuncs.com/download/yyyg_sms_827.plist'

      }
    }
  }
</script>
<style lang="scss">
  #guide{
    background: #fff;
    background-color: #f9d74a;
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
    color: #a95613;
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
    .button{
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
    }
  }
  .guideCon{
    width:100%;
    padding:10%;
    box-sizing:border-box;

    img{
      width:100%;margin-bottom: 15px;
    }
  }
</style>
