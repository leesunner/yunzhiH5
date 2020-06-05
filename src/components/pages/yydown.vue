<template>
    <div class="box">
        <img src="../../assets/img/yydownp1.png" alt="" class="top">
        <ul class="down">
          <li>
            <p @click="download()">
              安卓下载
              <img src="../../assets/img/dbdownx.png" alt="" class="img">
            </p>
          </li>
          <li>
            <p @click="download()">
              IOS下载
              <img src="../../assets/img/dbdownx.png" alt="" class="img">
            </p>
          </li>
          <li class="libottom">
            <span>4.9评分</span>
            <span>183万次下载</span>
            <span>14.15MB</span>
          </li>
        </ul>
        <h3 class="iponeNew">苹果手机打开APP教程</h3>

      <swiper :options="swiperOption">
          <swiper-slide v-for="(img,index) in list" :key="index"><img :src="img"></swiper-slide>
      </swiper>
        <ul class="content">
            <li>
              <p>
                零钱乐购手机客户端，让购物更简单！
              </p>
              <p>百万商品，低价抢购，一种全新的娱乐购物模式，我们回来了，快来跟我一起玩儿！</p>
            </li>
            <li class="libottom">
              <p>版本：2.1.3</p>
              <p>更新时间：2018年9月27日</p>
            </li>
        </ul>
        <img src="../../assets/img/dbdownbtm.png" alt="" class="footer">
    </div>
</template>
<script>
export default {
 data () {
   return {
     list:[
         require("../../assets/img/yydowni1.png"),
        require("../../assets/img/yydowni2.png"),
        require("../../assets/img/yydowni3.png"),
        require("../../assets/img/yydowni4.png"),
        require("../../assets/img/yydowni5.png"),

     ],
     swiperOption: {
          pagination: {
            el: '.swiper-pagination',

          }
        },
   }
 },
 created() {
   document.title="零钱乐购下载中心";
   this.isAndroid_ios();
 },
 mounted () {

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
           window.location.href = 'http://app1yyg.oss-cn-huhehaote.aliyuncs.com/download/lqdb-release_legu_sms_signed_zipalign-181016-2-1-5.apk'
            // return false

        } else {
          // alert("11")
            window.location.href = 'https://itunes.apple.com/cn/app/id1420453886?mt=8';
        }
    }

 }
}
</script>
<style lang="scss" scoped>
@import "../../assets/css/reset";
    .box{
      width: 100%;background-color: #fff;
      img{
        vertical-align: middle;
      }
      .top{
        width: 100%;
      }
      .down{
        width: 100%;
        height: getREM(300);
        background-color: #fff;
         overflow: hidden;
         border-bottom: getREM(7) solid #e6e6e6;
        li{
          width: 70%;
          height: getREM(64);
          margin:auto;
          margin-top:getREM(25);
          background-color: #fa6815;
          color: #fff;
          text-align: center;
          p{
            line-height: getREM(64);
            font-size: getREM(30)
          } .img{
              width: getREM(28);
              margin-bottom: getREM(5);
            }
          span{
            line-height: getREM(50);
            width: 33%;
            text-align: center;
            display: block;
            float: left;
            color: #ababab;
          }
        }
        .libottom{
          background-color: #fff;
        }
      }
      .iponeNew{
        font-size: getREM(28);

        line-height: getREM(96);
        text-align: center;
      }



        .swiper-container{
          height: getREM(650) !important;
               .swiper-slide{
          width: 49%;
          img{
            width: getREM(366);
            height: getREM(650);
          }
        }
        }




      .content{
         overflow: hidden;
        width: 100%;
        li{
          font-size: getREM(24);
          width: 96%;
          margin:getREM(30) auto;
          color:#333;
        }
        .libottom{
          color: #929292;
        }
      }
      .footer{
        width: 100%;
      }
      }
</style>


