<template>
    <div class="box">
        <div class="box-top">
          <img src="../../assets/img/w1.png"/>
          <div class="box-top-btm">
            <div @click="download">
              <img src="../../assets/img/anzhuo1.png"/>
              <!-- <span>安卓下载</span> -->
            </div>
            <div @click="download">
              <img src="../../assets/img/ping1.png"/>
              <!-- <span>IOS下载</span> -->
            </div>
          </div>
          <p class="lqlg-copy">
            <span>联系客服</span>
            <img src="../../assets/images/qq.png" />：
            <span id="textqq">3073810793</span>
            <span>&nbsp;&nbsp;&nbsp;2179002446</span>
          </p>
    		<p class="copy-btn" id="button"  v-clipboard:copy="3073810793" v-clipboard:success="onCopy" v-clipboard:error="onError">点击复制</p>
        </div>
        <div class="lqlg-bot">
    		  <img src="../../assets/img/w5.png" style="margin-top:1rem;"/>
    	  </div>
        <div >
          <img src="" style="margin-top: 1rem"/>
        </div>
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
          if (this.appType == 'H5') {
            window.location.href = 'http://app1yyg.oss-cn-huhehaote.aliyuncs.com/download/lqdb-release-sms.apk'
          } else {
            // 调用APP外部浏览器
            this.JsBridge.callHandler("payList", 'http://app1yyg.oss-cn-huhehaote.aliyuncs.com/download/lqdb-release-sms.apk', function (responseData) {});
          }
           this.getStatistics('click', 'andriod')
            // return false
        } else {
          // alert("11")
            let that = this
            //that.JsBridge.callHandler("payList", 'itms-services:///?action=download-manifest&url=https://app1yyg.oss-cn-huhehaote.aliyuncs.com/download/lqdb_sms_212.plist', function (responseData) {});
            // payList(that.josnStr(that.payList[0].url));//IOS调用函数
            // console.log(that.josnStr(that.payList[0].url))
            window.location.href='itms-services:///?action=download-manifest&url=https://app1yyg.oss-cn-huhehaote.aliyuncs.com/download/lqdb_sms_212.plist'
            this.getStatistics('click', 'ios')
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
    },
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/css/reset";
    .box{
      width: 100%;
      height: 100%;
      background-color: #4865ff;
        &-top{
          width: 100%;
          height: 782*$r;
          // background: url("../../assets/img/newlqdbtt1.png") no-repeat;
          background-size: 100% 100%;
          position: relative;
          &-btm{
            width: 100%;
            height: 90*$r;
            display: flex;
            justify-content: space-around;
            background: #4865ff;
            position: relative;
            margin-top: -1rem;
            div{
              width: 40%;
              height: 90*$r;
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
      .lqlg-copy{
        margin-top: 10px;
        display:flex;
        justify-content: center;
        color: #ffffff;
      }
      .lqlg-copy img{
        width: .4rem;
        height: .4rem;
      }
      .copy-btn{
        width: 1.5rem;
        margin: 5px auto;
        background: #ffffff;
        border-radius: 3px;
        color: #317fff;
        text-align: center;
        padding: 5px 0;
        font-size: .3rem;
      }
    }
    .lqlg-bot{
      position: relative;
    }
    .lqlg-bot .lqlg-fixed{
      position: absolute;
            background: rgba(0,0,0,0.7);
            border: 1px solid #4865ff;
            width: 2.5rem;
            bottom: 7.9rem;
            right: 1rem;
            height: 4.8rem;
            text-align: center;
        }
        .lqlg-bot .lqlg-fixed img{
            display: block;
            margin: 0 auto;
        }
        .lqlg-bot .lqlg-fixed p,.lqlg-bot .lqlg-fixed span{
            height: 0.3rem;
            line-height: 0.3rem;
            font-size: 0.1rem;
            color: #ffffff;
            display: block;
            margin: 0;
            padding: 0;
        }
        .lqlg-bot .lqlg-fixed p{
            color: #e6c928;
        }
        .lqlg-bot .lqlg-fixed p:last-of-type:before{
            content: '*';
            color: red;
        }
</style>
