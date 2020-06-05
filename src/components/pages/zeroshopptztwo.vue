<template>
    <div class="lqzero">
        <div class="btn" @click="download()"></div>
    </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  created() {
    document.title="零钱商城";
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
           window.location.href = 'http://app1yyg.oss-cn-huhehaote.aliyuncs.com/download/lqdb-release-sms.apk'
            // return false

        } else {
          // alert("11")
            window.location.href = 'https://itunes.apple.com/cn/app/id1420453886?mt=8';
        }
    }
  },

}
</script>
<style lang="scss" scoped>
@import "../../assets/css/reset";
.lqzero{
  width: 100%;
  height: 100%;
  background:url("../../assets/images/lqzerotz2.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
  .btn{
    width: 250*$r;
    height: 180*$r;
    position:absolute;
    left: 0;
    right: 0;
    top: 63%;
    margin: auto;
  }
}
</style>
