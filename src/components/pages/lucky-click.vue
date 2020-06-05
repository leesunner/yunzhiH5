<template>
    <div id="lucky-click">
        <div class="container">
            <div class="lucky-img">
                <img src="../../../static/image/lucky-img.png" alt="">
            </div>
            <div class="lucky-bg">
                <div @click="luckyClick">
                    <img src="../../../static/image/lucky-btn.png" alt="">
                </div>
                <div class="text">
                    <p>活动规则：</p>
                    <p>1.同一账号用户仅可参与1次活动</p>
                    <p>2.补偿积分将在第二天凌晨发放，在“ 我的乐购-积分 ”查看</p>
                    <p>3.活动最终解释权归零钱乐购所有</p>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
    export  default{
        name:'luckyClick',
        data(){
            return{

            }
        },
        created:function(){
            document.title='不中包赔';
            // this.JsBridge.callHandler("shareRight", {type:3, id:0}, function (responseData) {});
            //   window.scrollTo(0,0);
        },
        methods:{
            luckyClick:function(){
                // this.JsBridge.callHandler("luckyClick", function (responseData) {});
              this.navigateTo('rechargList')
            }
        }
    }
</script>
<style>
    #lucky-click {background:#6f14ad;}
    #lucky-click .lucky-img img{width:100%;vertical-align:middle;border: 0;}
    #lucky-click .lucky-bg{background:url("../../../static/image/lucky-bgi.png")no-repeat;background-size:100% 100%; padding:10px 30px 20px;}
    #lucky-click .lucky-bg img{width:100%;vertical-align:middle;border: 0;}
    #lucky-click .text{ color:#e8e8e8; padding:15px 5px;line-height:2;}
</style>
