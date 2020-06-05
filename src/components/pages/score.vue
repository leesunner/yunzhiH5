<template>
    <div id="score" style="background:#3c0c70;padding-bottom:10px;">
        <div class="header-img">
            <img src="../../../static/image/score-header.png" alt="">
        </div>
        <div class="content">
            <div class="product-group score-box">
                <p class="tip">活动期间，只要您是新用户，即可通过本页面购买茶叶送128积分券！可用金额秒变3.76倍！</p>
                <div class="product-box" @click="toProductView(data.recharge_goods_id)">
                    <div class="product-img">
                        <img :src="data.pic" alt="" :style="imgHeight">
                    </div>
                    <div class="product-info">
                        <p class="pro-name">{{data.name}}</p>
                        <p class="price">￥{{data.price}}</p>
                        <p :style="summaryHeight">
                            <span style="font-size:14px;color:#fa8c78;font-weight:bold;">送128积分券</span>
                            <span style="color: #ffb422;border:1px dashed #ffb422;padding: 0 2px;float:right;">新用户专享</span>
                        </p>
                        <div class="buy-btn">火速抢购</div>
                    </div>
                    <div class="clear"></div>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="score-box">
                <div class="user-share">
                    <img src="../../../static/image/user-share.png" alt="">
                </div>
                <ul>
                    <li class="score-list">
                        <div class="num" style="color: #f5d044;">时间</div>
                        <div class="num middle" style="color: #f5d044;">返还金额</div>
                        <div class="num" style="color: #f5d044;">总金额</div>
                        <div class="clear"></div>
                    </li>
                    <li class="score-list">
                        <div class="num">当天购买</div>
                        <div class="num middle">50积分+满20减10</div>
                        <div class="num">60</div>
                        <div class="clear"></div>
                    </li>
                    <li class="score-list">
                        <div class="num">第二天</div>
                        <div class="num middle">3积分券直减+满20减5</div>
                        <div class="num">8</div>
                        <div class="clear"></div>
                    </li>
                    <li class="score-list">
                        <div class="num">第三天</div>
                        <div class="num middle">3积分券直减+满20减5</div>
                        <div class="num">8</div>
                        <div class="clear"></div>
                    </li>
                    <li class="score-list">
                        <div class="num">第四天</div>
                        <div class="num middle">3积分券直减+满20减2</div>
                        <div class="num">5</div>
                        <div class="clear"></div>
                    </li>
                    <li class="score-list">
                        <div class="num">第五天</div>
                        <div class="num middle">2积分券直减+满20减5</div>
                        <div class="num">7</div>
                        <div class="clear"></div>
                    </li>
                    <li class="score-list">
                        <div class="num">第六天</div>
                        <div class="num middle">2积分券直减+满20减5</div>
                        <div class="num">7</div>
                        <div class="clear"></div>
                    </li>
                    <li class="score-list">
                        <div class="num">第七天</div>
                        <div class="num middle">2积分券直减+满20减5</div>
                        <div class="num">7</div>
                        <div class="clear"></div>
                    </li>
                    <li class="score-list">
                        <div class="num">第八天</div>
                        <div class="num middle">1积分券直减+满20减2</div>
                        <div class="num">3</div>
                        <div class="clear"></div>
                    </li>
                    <li class="score-list">
                        <div class="num">第九天</div>
                        <div class="num middle">1积分券直减+满20减2</div>
                        <div class="num">3</div>
                        <div class="clear"></div>
                    </li>
                    <li class="score-list">
                        <div class="num">第十天</div>
                        <div class="num middle">1积分券直减+满20减2</div>
                        <div class="num">3</div>
                        <div class="clear"></div>
                    </li>
                    <li class="score-list">
                        <div class="num">第十一天</div>
                        <div class="num middle">1积分券直减+满20减2</div>
                        <div class="num">3</div>
                        <div class="clear"></div>
                    </li>
                    <li class="score-list">
                        <div class="num">第十二天</div>
                        <div class="num middle">1积分券直减+满10减1</div>
                        <div class="num">2</div>
                        <div class="clear"></div>
                    </li>
                    <li class="score-list">
                        <div class="num">第十三天</div>
                        <div class="num middle">1积分券直减+满10减1</div>
                        <div class="num">2</div>
                        <div class="clear"></div>
                    </li>
                    <li class="score-list">
                        <div class="num">第十四天</div>
                        <div class="num middle">满20减5</div>
                        <div class="num">5</div>
                        <div class="clear"></div>
                    </li>
                    <li class="score-list">
                        <div class="num">第十五天</div>
                        <div class="num middle">满20减5</div>
                        <div class="num">5</div>
                        <div class="clear"></div>
                    </li>
                </ul>
            </div>
            <div class="score-box step">
                <p class="title" style="border:0;">教您玩转零钱乐购</p>
                <div class="step-block">
                    <img src="../../../static/image/step1.png" alt="">
                    <p>用1积分参与5元苹果手机一次</p>
                </div>
                <div class="step-block">
                    <img src="../../../static/image/step3.png" alt="">
                    <p>我出1元得购率1/5</p>
                </div>
                <div class="step-block">
                    <img src="../../../static/image/step2.png" alt="">
                    <p>好开心1元就买到了</p>
                </div>
                <div class="clear"></div>
            </div>
            <!--活动规则-->
            <div class="score-box rule">
                <div class="title">活动说明</div>
                <p><img src="../../../static/image/1.png" alt="">本活动仅限通过本页面按钮充值参与，每个ID仅限参与一次，积分券可在【我的积分券】中查看</p>
                <p><img src="../../../static/image/2.png" alt="">积分券按返还时间逐次发放，使用有效期均为3天；（ps：本活动所得积分券仅支持购买实物商品）</p>
                <p><img src="../../../static/image/3.png" alt="">本活动仅限零钱乐购新用户参与，每位用户限参与1次，零钱乐购将会对您的手机号、使用设备进行验证，保证活动公平；</p>
                <p><img src="../../../static/image/4.png" alt=""><span style="color: #f5d044;font-weight:bold;">温馨提示</span><br> 若发现用户在活动过程中使用不正当手段参与，活动主办方有权取消其参与活动的资格与商品。零钱乐购有权在必要时发出公告等合理方式修改本次活动规则</p>
            </div>
        </div>
    </div>
</template>
<script>
    import jQuery from 'jquery';
    export default{
        name:'score',
        data(){
            return{
                imgHeight:"",
                summaryHeight:"",
                data:{}
            }
        },
        created:function(){
            document.title='购茶叶送积分券';
            document.getElementsByTagName('meta')['description'].setAttribute('content','买茶叶送积分券啦！活动期间，只要您是新用户，即可通过本页面购买茶叶送128积分券！可用金额秒变3.76倍！快快来参与！');
            this.getData();
            // this.JsBridge.callHandler("shareRight", {type:3, id:0}, function (responseData) {});
        },
        mounted: function () {
            this.imgHeight = 'height:' + (document.body.clientWidth * 0.28) + 'px;';
            this.summaryHeight = 'margin-bottom:' + (document.body.clientWidth * 0.28-97) + 'px;';
        },
        methods:{
            getData:function(){
                var that = this;
                this.$axios.post('/recharge/viewNewbie?version=v2').then(function (response) {
                    if(response.data.code==1){
                        that.data = response.data.data;
                        console.log("here?");
                    }
                });
            },
            toProductView:function(id){
                // this.JsBridge.callHandler("toProductView",id, function (responseData) {});
              this.navigateTo('productView',{id:id,guid:2})
            }
        }
    }
</script>
<style>
    #score .header-img img{width:100%;vertical-align:middle;}
    #score .content{ padding:0 15px;}
    #score .score-box{border:1px solid #a320e5;border-radius:5px;box-shadow:0 1px 5px 1px #8443b2; margin-bottom:10px;background:#3b0a5b;}
    #score .score-box .title{color: #f5d044;font-weight:bold;font-size:16px;padding: 5px 15px;border-bottom: 1px solid #999;}
    #score .rule p{margin:15px 0; padding:0 10px; color:#e8e8e8;line-height:20px;}
        #score .rule p img{width:15px;vertical-align:top;margin-right:5px;}
    #score .score-box .score-list{line-height:35px;border-radius: 5px;}
    #score .score-box .score-list:first-child{font-size:14px;background:#501095!important;}
    #score .score-box .score-list:nth-child(2n){background:#3b0a5b;}
    #score .score-box .score-list:nth-child(2n+1){background:#431364;}
    #score .score-box .score-list .num{float:left;width:25%;text-align:center; color:#e8e8e8;}
    #score .score-box .score-list .middle{width:50%; color:#b99e65;}
    #score .user-share img{width:100%;}
    #score .step img{vertical-align:middle;width:100%;}
    #score .product-group .pro-name{font-size:14px;}
    #score .product-group .tip{background:#000;opacity:.8;border-radius:5px; padding:5px;margin:0; color:#c6b411;}
    #score .product-group .product-box{background:#fff;border-radius:5px;margin:15px 10px; padding:15px 10px;}
    #score .product-group .product-img img{width:100%;vertical-align:middle;border-radius:5px;}
    #score .product-group .product-img{float:left;margin-right:4%;width:35%}
    #score .product-group .product-info{float:right; color:#3a3a3a;width:61%;}
    #score .product-group .product-info .price{ color:#000;font-size:14px;font-weight:bold;}
    #score .product-group .product-info .buy-btn{background:#f8654b; color:#fff;text-align:center;padding:4px 20px;display:inline-block;}
    #score .step .step-block{float:left;width:33.3%;text-align:center;margin:15px 0;}
    #score .step .step-block img{width:70%;}
    #score .step .step-block p{ color:#dcc76e;margin-top:15px; padding:0 10px;}
</style>
