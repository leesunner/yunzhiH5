<template>
    <div class="download">
      <img class="download-header" src="../assets/img/d1.png"/>
      <div class="download-content">
          <div class="download-content-div download-content-div2">
              <img class="download-content-div-img" src="../assets/img/d2.png"/>
              <p class="download-content-div-text" style="color: #0f83fb;">IOS下载</p>
              <img class="download-content-div-img2" src="../assets/img/d4.png"  @click="isShow = true"/>
              <p class="download-content-div-text2" style="margin-top: 0.3rem;">保存截图，微信识别二维码</p>
              <p class="download-content-div-text2">前往AppStore进行下载注册</p>
          </div>
          <div class="download-content-div">
              <img  class="download-content-div-img" src="../assets/img/d3.png"/>
              <p class="download-content-div-text" style="color: #fd8715;">安卓下载</p>
              <p class="download-content-div-btn"
                v-clipboard:copy="downloadurl" v-clipboard:success="onCopy" v-clipboard:error="onError">点击复制</p>
                <p class="download-content-div-text2" style="margin-top: 0.3rem;">去浏览器打开下载</p>
          </div>
      </div>
      <div class="alpha" v-show="isShow" @click="isShow = false">
          <img src="../assets/img/d4.png"/>
      </div>
    </div>
</template>

<script>
    export default {
        name: "download",
        data() {
            return {
                isShow: false,
                downloadurl: 'http://app1yyg.oss-cn-huhehaote.aliyuncs.com/download/app-lqlg-sms-release.apk'
            }
        },
        methods:{
            onCopy: function (e) {
                this.$vux.toast.text("复制成功");
            },
            onError: function (e) {
                this.$vux.toast.text("复制失败");
            }
        }
    }
</script>

<style scoped lang="scss">
@import "../assets/css/reset.scss";
.download{
    height: 100%;
    position: relative;
    margin-top: -1.17333rem;
    padding-top: 1.17333rem;
    background: #ffffff;
    &-header{
        width: 100%;
    }
    &-content{
        @include flex-center;
        margin-top: 2rem;
        &-div{
            width: 50%;
            text-align: center;
            min-height: 7rem;
            &-img{
                width: 1rem;
            }
            &-img2{
                width: 2.5rem;
            }
            &-text{
                font-size: 0.4rem;
                margin-top: 0.1rem;
                margin-bottom: 0.3rem;
                font-weight: 600;
                letter-spacing: 1px;
            }
            &-btn{
                width: 3rem;
                margin: 0 auto;
                background: #ffca93;
                font-size: 0.4rem;
                border-radius: 5px;
                padding: 0.2rem;
                margin-top: 2rem;
            }
            &-text2{
                padding: 0 0.1rem;
            }
        }
        &-div2{
            position: relative;
        }
        &-div2:after{
            content: '';
            position: absolute;
            top: 0.5rem;
            height:5rem;
            width: 1px;
            background: #eeeeee;
            right: 0;
        }
    }
    .alpha{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.4);
        img{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            width: 6rem;
        }
    }
}
</style>
