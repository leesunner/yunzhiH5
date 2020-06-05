<template>
    <div id="download">
        <div class="month-bg">
            <div style="" class="download-logo">
                <img src="../../../static/image/download-logo.png" alt="">
            </div>
            <div class="month-num"><i>{{month}}月梦想购</i></div>
            <img src="../../../static/image/download-text2.png" alt="" style="margin-top:-10px;">
        </div>
        <div class="btn-group">
            <p>大兄dei，60元优惠券大礼包已发至您的账户</p>
            <p>打开乐购App立即使用吧！</p>
            <div class="btn" @click="toDownload">立即前往</div>
        </div>
    </div>
</template>
<script>
    export default{
        name:'download',
        data(){
            return{
                month:"",
            }
        },
        created:function(){
            document.title='应用下载';
            document.getElementsByTagName('meta')['description'].setAttribute('content','乐购新用户可领取60元优惠券大礼包，快快下载乐购商城领取吧！');
            var date = new Date();
            this.month=date.getMonth()+1;
        },
        methods:{
            toDownload:function(){
                var u = navigator.userAgent;
                var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
                if(isIOS){
                    //this.$vux.toast.text("敬请期待");
                  this.$vux.loading.show({text:"请稍后"});
                  window.location.href= 'itms-services:///?action=download-manifest&url=https://app1yyg.oss-cn-huhehaote.aliyuncs.com/download/test.plist';
                  var that = this;
                  setTimeout(function() {
                    that.$vux.loading.hide()
                  }, 1500)
                }else{
                    this.$vux.loading.show({text:"请稍后"});
                    window.location.href= 'https://app1yyg.oss-cn-huhehaote.aliyuncs.com/download/1yyg.apk';
                    var that = this;
                    setTimeout(function() {
                        that.$vux.loading.hide()
                    }, 1500)
                }
            }
        },

    }
</script>
<style>
    #download .month-bg{background:url("../../../static/image/download-img.png")no-repeat;background-size:100% 100%;padding-bottom:180px;}
    #download .month-num{font-size:38px;font-weight:bold;color:#f98623;text-align:center;text-shadow:10px 5px 5px #d5d5d5;transform:rotate(-3deg)}
    #download .download-logo{width:60%;margin:0 auto;}
    #download .download-logo img{width:100%;margin:15px 0 0 0;}
    #download {background:#ef5239;min-height:100%;}
    #download img{width:100%;}
    #download .btn-group{text-align:center;margin-top:20px;}
    #download .btn-group p{ color:#e8e8e8;line-height:30px;font-size:14px;}
    #download .btn{border-radius:25px;background:#fad778; color:#e04e30;display:inline-block; padding:10px 50px;margin-top:20px;font-size:15px;}
</style>
