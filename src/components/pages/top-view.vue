<template>
    <div id="top-view">
        <ul class="ranking-rule">
            <li>
                <img src="../../../static/image/tuhao.jpg" alt="">
                <div class="ranking-rule-text">
                    <h4><b>1</b>土豪君</h4>
                    <p>在开奖倒计人次为0时，结束土豪君特权的竞选，最后出现在土豪位置的用户将获得上榜特权。</p>
                </div>
            </li>
            <li>
                <img src="../../../static/image/shafa.jpg" alt="">
                <div class="ranking-rule-text">
                    <h4><b>2</b>沙发君</h4>
                    <p>为了感谢勇于争先的您，第一位参与本期兑换的用户将出现在沙发君位置并获得上榜特权。</p>
                </div>
            </li>
            <li>
                <img src="../../../static/image/baowei.jpg" alt="">
                <div class="ranking-rule-text">
                    <h4><b>3</b>包尾君</h4>
                    <p>您的包尾结束了我们的等待，让宝贝第一时间找到它的获奖者，最后一位参与本期兑换的用户将出现在包尾君位置并获得上榜特权。</p>
                </div>
            </li>
        </ul>
        <div class="comingSoon">上榜者特权，敬请期待！</div>
    </div>
</template>
<script>
    export default{
        name:"topView",
        data(){
            return{
            }
        },
        created:function(){
            document.title = '上榜规则';
        },
        methods:{

        }
    }
</script>
<style>
    #top-view{background:#fff;min-height:100%;}
    #top-view .ranking-rule{background:#fff;}
    #top-view .ranking-rule li {border-bottom: 1px solid #ccc;padding: 15px; min-height: 90px;}
    #top-view .ranking-rule li img {float: left; width: 90px;}
    #top-view .ranking-rule-text {padding-left: 100px; }
    #top-view .ranking-rule-text h4 { font-size: 16px; color: #333; }
    #top-view .ranking-rule-text p {line-height: 22px; padding-top: 2px;font-size:14px; color:#666;}
    #top-view .ranking-rule-text h4 b { color: #db3752; padding-right: 5px; }
    #top-view .comingSoon {font-size: 18px; color: #db3752; text-align: center; border: 2px dashed #db3752; -webkit-border-radius: 8px; -moz-border-radius: 8px; border-radius: 8px; width: 70%; padding: 10px 0; margin: 35px auto 0 auto;}
</style>
