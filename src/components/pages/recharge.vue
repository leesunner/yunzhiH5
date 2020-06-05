<template>
    <div id="recharge">
        <div class="banner">
            <img src="../../../static/image/rechage-banner.png" alt="">
        </div>

        <div class="content">
            <p class="title"><span>1</span>点击复制您的唯一ID，<i>填写在支付宝转账备注</i></p>
            <div class="id-group">
                <div class="item" style="flex:3;background:#FDEADC;border-radius:5px 0 0 5px;">唯一ID：{{user_id}}</div>
                <div class="item" style="flex:2;background:#F17D3A;color: #fff;border-radius:0 5px 5px 0;"
                     v-clipboard:copy="user_id" v-clipboard:success="onCopy" v-clipboard:error="onError">点击复制
                </div>
            </div>
            <p class="title"><span>2</span>前往支付宝转账页面，在转账备注处填写您要充值的唯一ID号</p>
            <div class="text">
                <p>1、备注只填写乐购商城<i>唯一ID号</i></p>
                <p>2、填写错误将导致无法转账，请联系客服</p>
                <p>3、实名验提示</p>
                <p>4、<i>请勿1分钟内多次转账相同金额</i>，已免系统出错</p>
                <p>5、<i>充值仅取整数部分</i>，请勿转账小数以免给您造成损失。</p>
                <p> 6、请填写购买订单的对应金额，若金额不符，将可能导致无法正常到账</p>
            </div>
            <div class="img">
                <img src="../../../static/image/recharge-phone.png" alt="">
            </div>
            <div class="Alipay" @click="goAlipay">前往支付宝</div>
        </div>
    </div>
</template>
<script>
    export default{
        name: "feedback",
        data(){
            return {
                user_id: ""
            }
        },
        created: function () {
            document.title = '充值';
            this.getData();
        },
        methods: {
            getData: function () {
                var that = this;
                this.$axios.post('/user/index?version=v2').then(function (response) {
                    if (response.data.code == 1) {
                        that.user_id = response.data.data.user_id
                    } else {
                        that.$vux.toast.text(response.data.msg)
                    }
                });
            },
            onCopy: function (e) {
                this.$vux.toast.text("复制成功");
            },
            onError: function (e) {
                this.$vux.toast.text("复制失败");
            },
            goAlipay:function(){
                window.location.href = 'https://qr.alipay.com/tsx07763qg7fwld7zhb2w0b';
            }
        }
    }
</script>
<style>
    #recharge i { font-style:normal; color:#F76800; }
    #recharge .banner img { width:100%; vertical-align:middle; }
    #recharge .content { background:#fff; padding:15px; margin-top:5px; }
    #recharge .content .title { font-size:14px; }
    #recharge .content .title span { background:#F76800; border-radius:50%; width:18px; height:18px; display:inline-block; text-align:center; color:#fff; font-size:12px; margin-right:5px; }
    #recharge .content .id-group { display:flex; width:70%; margin:10px 30px; line-height:40px; text-align:center; color:#F17D3A; }
    #recharge .content .text { color:#898989; font-size:13px; line-height:22px; padding:0 15px 0 35px; text-indent:-20px; }
    #recharge .content .img { width:70%; margin:0 auto; }
    #recharge .content .img img { width:100%; padding:15px 0; }
    #recharge .Alipay{text-align:center;line-height:40px; color:#fff;background:#FB762A;border-radius:5px;}
</style>
