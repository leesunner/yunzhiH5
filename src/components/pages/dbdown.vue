<template>
    <div class="box">
        <div class="box-top">
          <img src="../../assets/img/newlqdbtt1.png"/>
          <div class="box-top-btm">
            <div @click="download" style="background: #ff8b5b">
              <img src="../../assets/img/anZ.png"/>
              <span>安卓下载</span>
            </div>
            <div @click="download" style="background: #3764ff">
              <img src="../../assets/img/app3.png"/>
              <span>IOS下载</span>
            </div>
          </div>
          <div class="copy">
            <span>下载如遇到问题，联系客服</span>
            <img src="../../assets/images/qq.png" />
            <!-- <span class="qqcode">
              2955901785
            </span> -->
            <span class="qqcode1">
              <span id="text" style="width: auto;">3073810793</span>
              <span >2179002446</span>
            </span>
            <span class="btn" style="background: #3764ff"
              v-clipboard:copy="3073810793" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</span>
          </div>
        </div>
      <img src="../../assets/img/newlqdbttwww.png"/>
      <div class="newShare" id="share" @click="hide()">
          <div class="shareTop">
            <img src="../../assets/img/dbdownarrow.png" alt="" style="width:3.33333rem;" />
            <p>点击右上角按钮，在浏览器中打开，</p>
            <p>即可安装哦~</p>
          </div>
      </div>
    </div>
</template>
<script>
export default {
 data () {
   return {

   }
 },
 created() {
   document.title="兑宝下载中心";
   this.isAndroid_ios();
   this.getStatistics('access');
 },
 mounted() {
   this.$nextTick(() => {
     this.isVxQQ();
   })
 },
 methods: {
    isAndroid_ios() {
        var u = navigator.userAgent, app = navigator.appVersion;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        return isAndroid == true ? true : false;
    },
    download() {
        if (this.isAndroid_ios()) {
           this.getStatistics('click', 'andriod');
           window.location.href = 'http://app1yyg.oss-cn-huhehaote.aliyuncs.com/download/lqdb-release-sms.apk'
            // return false
        } else {
          // alert("11")
            let that = this
            //that.JsBridge.callHandler("payList", 'itms-services:///?action=download-manifest&url=https://app1yyg.oss-cn-huhehaote.aliyuncs.com/download/lqdb_sms_212.plist', function (responseData) {});
            // payList(that.josnStr(that.payList[0].url));//IOS调用函数
            // console.log(that.josnStr(that.payList[0].url))
            this.getStatistics('click', 'ios');
            window.location.href='itms-services:///?action=download-manifest&url=https://app1yyg.oss-cn-huhehaote.aliyuncs.com/download/lqdb_sms_212.plist'
        }
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
    },
    onCopy: function (e) {
        this.$vux.toast.text("复制成功");
    },
    onError: function (e) {
        this.$vux.toast.text("复制失败");
    },
    getStatistics(type,plant) {
      let that = this;
      let params = {'data[app_from]': 'lqdb', 'data[action]': type, 'data[click_to]': plant,'data[type]': 2}
      this.$axios.post('/site/appPromotionStatistics',params).then(function (response) {
      })
    }
 }
}
</script>
<style lang="scss" scoped>
@import "../../assets/css/reset";
    .box{
      width: 100%;background-color: #fff;
      position: relative;
        &-top{
          width: 100%;
          height: 782*$r;
          // background: url("../../assets/img/newlqdbtt1.png") no-repeat;
          background-size: 100% 100%;
          position: relative;
          &-btm{
            // position: absolute;
            // bottom: 30*$r;
            // left: 0;
            width: 100%;
            height: 90*$r;
            display: flex;
            justify-content: space-around;
            // @include flex-space;
            div{
              width: 40%;
              height: 90*$r;
              text-align: center;
              line-height: 90*$r;
              border-radius: .2rem;
              color: #ffffff;
              img{
                width: .6rem;
                display: inline-block;
                vertical-align: middle;
              }
              span{
                display: inline-block;
                vertical-align: middle;
              }
            }
          }
        }
      img{
        display: block;
        width: 100%;
        // height: 1224*$r;
      }
      .copy{
          margin: .3rem auto;
          height: .7rem;
          line-height: .7rem;
          text-align: center;
      }
      .copy span{
          display: inline-block;
          vertical-align: middle;
      }
      .copy img{
          height: .5rem;
          width: auto;
          display: inline-block;
          vertical-align: middle;
      }
      .copy input{
          border: 0;
      }
      .copy .btn{
          color: #ffffff;
          background: #209fde;
          padding: 0 8px;
          box-sizing: border-box;
          margin-left: 10px;
          border-radius: 3px;
          position: unset;
      }
      .copy .qqcode{
          position: relative;
          width: 2.4rem;
      }
      .copy .qqcode input{
          width: 100%;
      }
      .copy .qqcode span{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
      }
      .newShare{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background:rgba(0, 0, 0, 0.5);
        z-index: 500;
        display: none
      }
      .shareTop{
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
      .shareTop p:nth-of-type(1) {
          padding-top: 4rem;
        }
      .shareTop p {
            font-size: 0.46667rem;
            color: #fff;
            text-align: center;
            font-weight: 600
        }
      .shareTop p:nth-of-type(2) {
          padding-top: 0.5rem;
        }
      .shareTop img{
        width: 3.33333rem;
        float: right;
        margin: 0.32rem 0.68rem 0 0;
      }
    }
    .qqcode1{
      display: inline-block;
      width: 1.5rem;
      vertical-align: middle;
      margin-right: 20px;
    }
</style>


