<template>
    <div id="testPay">

        <p class="pay-text" style="line-height:30px;background:#f5f5f5;">提交成功，只差最后一步就购买成功啦！</p>
        <div class="product">
            <div class="pro-img"><img :src="data.pics" alt="" :style="imgHeight"></div>
            <div class="pro-info">
                <p :style="titleStyle">{{data.name}}</p>
                <p style="color:#FB6815;">赠送{{data.coin}}积分</p>
            </div>
            <div class="clear"></div>
        </div>
        <group style="margin-top:-5px;">
            <cell title="应付金额" :value="data.price+'元'"></cell>
        </group>
        <cell title="选择支付方式" :value="'需支付'+data.price+'元'" style="color: #898989;"></cell>
        <checklist :options="payTypeOptions" label-position="left" v-model="payType" disabled></checklist>
        <div class="pay-button" @click="pay">确认购买</div>
    </div>
</template>
<script>
    import { Cell,Checklist,Group } from 'vux';
    export default{
        components:{Cell,Checklist,Group},
        data(){
            return {
                data:{},
                payTypeOptions:[{key:'1',value:'支付宝'}],
                payType:'1',
                imgHeight:"",
                summaryHeight:"",
                id:""
            }
        },
        created: function () {
            /*for (var i = 0;i<1;i++){
                window.location.reload();
            }*/
            if(localStorage.newData == null ){
                window.location.reload();               // 解决ios携带参数修改url不刷新页面
                localStorage.newData = '1';
            }
            /*history.go(0);*/
            this.getData(this.$route.params.id);
            this.id = this.$route.params.id;
        },
        mounted: function () {
            this.imgHeight = 'height:' + (document.body.clientWidth * 0.15) + 'px;';
            this.titleStyle = 'margin-bottom:' + (document.body.clientWidth * 0.15-45) + 'px;';
        },
        methods: {
            getData: function (id) {
                var that = this;
                this.$axios.post('/recharge/view?version=v2',{id:id}).then(function (response) {
                    if(response.data.code==1){
                        that.data = response.data.data;
                        localStorage.removeItem("newData");
                    }
                })
            },
            pay:function(){
                var that = this;
                this.$axios.post('/site/appstorePay',{"Order[recharge_goods_id]":this.id,"Order[pay_type]":1}).then(function (response) {
                    if(response.data.code==1){
                        window.location.href = response.data.data.url;
                        localStorage.removeItem("newData");
                    }
                })
            }
        }
    }
</script>
<style>
    #testPay{font-size:14px;}
    #testPay .pay-text { line-height:40px; color:#898989; padding:0 15px;}
    #testPay .product{ padding:15px;background:#fff;}
    #testPay .weui-cell__ft{ color:#EF6336 !important;}
    #testPay .weui-cell:before{border:0;}
    #testPay .pro-img{width:25%;float:left;}
    #testPay .pro-img img{width:100%;vertical-align:middle;border-radius:5px;}
    #testPay .pro-info{width:75%;float:left;padding-left:15px; -moz-box-sizing:border-box; -ms-box-sizing:border-box; box-sizing:border-box;}
    #testPay .weui-cells_checkbox .weui-check:checked + .vux-checklist-icon-checked:before{ color:#FB6815;opacity: 1;font-size:20px;}
    #testPay .pay-button{line-height:45px;border-radius:5px;text-align:center;background:#FB6815;margin:25px 15px 15px; color:#fff;}
</style>