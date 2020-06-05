<template>
    <div class="newUser">
      <h2 v-title="'新手红包'"></h2>
      <div class="newUser-one" @click="open">
      </div>
      <div class="newUser-two">
      </div>
    </div>
</template>

<script>
    export default {
        name: "new-user2019",
        methods:{
          open(){
            let that = this
            that.JsBridge.callHandler("payList", 'itms-services:///?action=download-manifest&url=https://app1yyg.oss-cn-huhehaote.aliyuncs.com/download/lqlg_release.plist', function (responseData) {});
            // payList(that.josnStr(that.payList[0].url));//IOS调用函数
            // console.log(that.josnStr(that.payList[0].url))
          }
        }
    }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/reset";
  .newUser{
    width: 100%;
    &-one{
      height: 782*$r;
      background: url("../../assets/img/p1_01.png") no-repeat;
      background-size: 100% 100%;
      position: relative;
     img{
        width: 290*$r;
        height: 89*$r;
       -webkit-touch-callout:default;
       position: absolute;
       margin: 0 auto;
       top:600*$r;
       right: 0;
       left: 0;
     }
    }
    &-two{
      height: 1244*$r;
      background: url("../../assets/img/p2.png") no-repeat;
      background-size: 100% 100%;
    }
  }

</style>
