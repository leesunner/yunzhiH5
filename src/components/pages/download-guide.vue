<template>
    <div id="download-guide">  <!--//下载指南-->
        <div class="gudie">
            <img src="../../../static/image/guide-title.png" alt="">
            <div class="btn-group">
                <div class="btn" @click="toDownload(1)">安卓下载</div>
                <div class="btn" @click="toDownload(2)">IOS下载</div>
            </div>
            <img src="../../../static/image/guide-step.png" alt="">
        </div>
    </div>
</template>
<script>
    export default{
      name:'download—guide',
        data(){
            return{

            }
        },
        created:function(){
            document.title = '下载指南';
        },
        methods:{
            toDownload:function(e){
                if(e == 1){
                    this.$vux.loading.show({text:"请稍后"});
                    window.location.href= 'https://app1yyg.oss-cn-huhehaote.aliyuncs.com/download/1yyg.apk';
                    var that = this;
                    setTimeout(function() {
                        that.$vux.loading.hide()
                    }, 1500)
                }else{
                    this.$vux.toast.text("敬请期待");
                }
            }
        }
    }
</script>
<style>
    #download-guide .gudie img{width:100%;vertical-align:middle;}
    #download-guide .btn-group{background:#faf2ea; padding:30px 5px;text-align:center;}
        #download-guide .btn-group .btn{ display:inline-block; text-align:center;background:#f4a52b;width:30%;border-radius:20px;line-height:35px;margin:0 25px; color:#fff;}
</style>
