<template>
    <div id="feedback">
        <div class="banner">
            <img src="../../../static/image/feedback-banner.png" alt="">
            <p class="text">请提供充值信息，客服核对后吗4小时内为您充值到帐
                自助反馈<i>单天上限5次</i>，超过请联系微信客服：<i>yungou027</i></p>
        </div>
        <div class="content">
            <p>用户ID：{{user_id}}</p>
            <x-input title="订单号："></x-input>
            <p>支付宝订单</p>
            <div class="img">
                <img src="../../../static/image/feedback-img.png" alt="">
            </div>
        </div>
        <div class="feedback-btn" @click="">提交反馈</div>
    </div>
</template>
<script>
    import { XInput,Group } from 'vux'
    export default{
        name:"feedback",
        components:{XInput,Group},
        data(){
            return{
                user_id:""
            }
        },
        created:function(){
            document.title = '反馈';
            this.getData();
        },
        methods:{
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
        }
    }
</script>
<style>
    #feedback i{ color:#FB762A;font-style:normal;}
    #feedback .banner{text-align:center;background:#fff; padding:20px 15px; color:#898989;}
    #feedback .banner .text{text-align:left;line-height:20px; padding:0 20px;margin:10px 0;font-size:13px;}
    #feedback .banner img{width:60%;}
    #feedback .content{background:#fff;margin-top:5px;font-size:14px;}
    #feedback .content p{ padding:10px 15px; border-top:1px solid #f5f5f5;}
    #feedback .content .img{width:80%;margin:0 auto;}
    #feedback .content .img img{width:100%;}
    #feedback .feedback-btn{text-align:center;line-height:40px; color:#fff;background:#FB762A;border-radius:5px; margin:15px;}
</style>
