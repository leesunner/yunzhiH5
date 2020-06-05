<template>
    <div id="invitation">
        <div class="banner" style="position:relative;">
            <img src="../../../static/image/invitation-banner.png" alt="">
            <div class="box" style="margin-top:-120px;padding-bottom:0;">
                <group>
                    <cell title="我的等级" is-link :value="'LV'+data.ulevel" @click.native="toLevel(data.nickname)"></cell>
                    <cell :title="'邀请徒弟'+data.prom_num+'个'" is-link value="我的邀请记录" @click.native="invitationLog()"></cell>
                </group>
            </div>
            <div class="rule-btn" @click="rule = true">活动规则</div>
        </div>

        <div class="cont" v-show="rule"></div>   <!-- 遮罩-->
        <div class="rule-box" v-show="rule">
            <div class="chose-rule" @click="rule=false"><img src="../../../static/image/chose.png" alt=""></div>
            <div class="rule-text">
                <p style="text-align:center;font-size:16px;line-height:35px;border-bottom:1px solid #767676">活动规则</p>
                <div class="rule-scoller">
                    一、邀请人奖励 -实时3%返现，上不封顶
                    您邀请的新注册好友，注册成功将成为你的徒弟，徒弟参与实物兑换，您可获得3%返现，将实时奖励到您的乐购-积分中。
                    实时返现规则
                    <div style="text-align:center;" class="text-table">
                        <p>用户等级为1级时&nbsp;&nbsp;&nbsp;&nbsp;可获得徒弟实物兑换1%分成</p>
                        <p>用户等级为2级时&nbsp;&nbsp;&nbsp;&nbsp;可获得徒弟实物兑换1%分成</p>
                        <p>用户等级为3级时&nbsp;&nbsp;&nbsp;&nbsp;可获得徒弟实物兑换2%分成</p>
                        <p>用户等级为4级时&nbsp;&nbsp;&nbsp;&nbsp;可获得徒弟实物兑换2%分成</p>
                        <p>用户等级为5级时&nbsp;&nbsp;&nbsp;&nbsp;可获得徒弟实物兑换2%分成</p>
                        <p>用户等级为6级时&nbsp;&nbsp;&nbsp;&nbsp;可获得徒弟实物兑换2%分成</p>
                        <p>用户等级为7级时&nbsp;&nbsp;&nbsp;&nbsp;可获得徒弟实物兑换2%分成</p>
                        <p>用户等级为8级时&nbsp;&nbsp;&nbsp;&nbsp;可获得徒弟实物兑换3%分成</p>
                        <p>用户等级为9级时&nbsp;&nbsp;&nbsp;&nbsp;可获得徒弟实物兑换3%分成</p>
                        <p>用户等级为10级时&nbsp;&nbsp;&nbsp;&nbsp;可获得徒弟实物兑换3%分成</p>
                    </div>
                    <p>二、徒弟奖励：徒弟完成注册即可享60元新人积分券。</p>

                    <p>三、邀请流程：邀请人分享链接给好友或请好友扫描二维码，好友通过分享的链接完成注册即为邀请成功。
                        如有任何疑问，请咨询零钱乐购在线客服，</p>
                </div>
            </div>
        </div>
        <div class="box">
            <img src="../../../static/image/invitation-test.png" alt="">
        </div>
        <div class="box">
            <p class="rank-title">{{month}}月排行榜</p>
            <div class="rank-group-title">
                <span class="rank-phone" style="background:none;">邀请人</span>
                <span class="rank-num">累计邀请徒弟</span>
                <span class="rank-score">累计积分奖励</span>
                <div class="clear"></div>
            </div>
            <ul class="rank-group">
                <li v-for="(rank,index) in data.top">
                    <span class="rank-phone">{{rank.nickname}}</span>
                    <span class="rank-num">{{rank.prom_num}}</span>
                    <span class="rank-score">{{rank.score}}</span>
                    <div class="clear"></div>
                </li>
            </ul>
        </div>
        <div style="padding:0 15px;">
            <p class="rule-title">邀请小贴士</p>
            <p style="color: #e8e8e8;margin:5px 0;">点击“立即邀请”按钮，分享链接给好友，好友通过分享的链接完成注册，则邀请成功</p>
        </div>
        <div style="height:45px;"></div>
        <div class="inv-btn" @click="toInvitation">立即邀请徒弟</div>

    </div>
</template>
<script>
    import { Cell ,Group } from 'vux';
    export default{
        components: {Cell, Group},
        name: "invitation",
        data(){
            return {
                month: "",
                rule: false,
                data:{}
            }
        },
        created: function () {
            var date = new Date();
            this.month = date.getMonth() + 1;
            document.title = '收徒得3%返现';
            this.getData();
        },
        methods: {
            toInvitation: function () {               // 底部按钮唤起移动端分享事件
                var that = this;
                this.$axios.post('/site/sharecon?version=v2', {type: 5}).then(function (response) {
                    if(response.data.code==1){
                        that.$vux.loading.show({text: '请稍候'});
                        that.JsBridge.callHandler("share", response.data.data, function (responseData) {
                            if (responseData == 'success') {
                                that.$vux.loading.hide();
                            }
                        });
                    }
                });
            },
            toLevel:function(name){
                var that = this;
                that.$vux.loading.show({text: '请稍候'});
                that.JsBridge.callHandler("toLevel", name, function (responseData) {          //跳转移动端我的等级详情页
                    if (responseData == 'success') {
                        that.$vux.loading.hide();
                    }
                });
            },
            invitationLog: function () {         // 邀请记录
                this.$router.push({
                    name: 'invitationLog',
                    query: {time: new Date().valueOf()}
                });
            },
            getData: function () {
                var that = this;
                this.$axios.post('/prom/index?version=v2').then(function (response) {      //获取用户等级信息和邀请排行榜
                    if(response.data.code == 1){
                        that.data = response.data.data;
                    }else{
                        that.$vux.toast.text(response.data.msg);
                    }
                })
            }
        }
    }
</script>
<style>
    #invitation { background:#0e203e; min-height:100%; padding-bottom:5px; }
    #invitation img { width:100%; vertical-align:middle; }
    #invitation .rule-btn { position:absolute; right:0; top:50px; padding:5px 10px; background:#fff; opacity:.5; border-radius:15px 0 0 15px; color:#595959; }
    #invitation .box { padding:15px; }
    #invitation .box .rank-title { line-height:50px; text-align:center; color:#215E7A; background:#fff; border-radius:5px 5px 0 0; font-size:16px; font-weight:bold; }
    #invitation .rank-group-title { line-height:35px; background:#e5e5e5; color:#3a3a3a; text-align:center }
    #invitation .rank-group-title .rank-phone { width:40%; float:left; }
    #invitation .rank-group-title .rank-num, #invitation .rank-group-title .rank-score { width:30%; float:left; color:#3a3a3a; }
    #invitation .rank-group { background:#fff; border-radius:0 0 5px 5px; text-align:center; }
    #invitation .rank-group li:first-child .rank-phone { background:url("../../../static/image/invitation1.png") no-repeat left 5px center !important; background-size:20px 20px !important;float:left; width:40%; }
    #invitation .rank-group li:nth-child(2) .rank-phone{ width:40%; float:left; color:#3a3a3a; background:url("../../../static/image/invitation2.png") no-repeat left 5px center; background-size:20px 20px; }
    #invitation .rank-group li:nth-child(3) .rank-phone { background:url("../../../static/image/invitation3.png") no-repeat left 5px center !important; background-size:20px 20px !important;float:left; width:40%;}
    #invitation .rank-group .rank-num, #invitation .rank-group .rank-score { width:30%; float:left; color:#3a3a3a; }
    #invitation .rank-group li { line-height:35px; background:#e5e5e5; border-radius:5px; }
    #invitation .rank-group li:nth-child(2n+1) { background:#fff; }
    #invitation .weui-cells { border-radius:5px; color:#3a3a3a; font-size:14px;; }
    #invitation .cont { width:100%; height:100%; z-index:999; background:#000; opacity:.7; position:absolute; top:0; bottom:0; }
    #invitation .rule-box { position:fixed; background:#6a2b23; height:450px; width:290px; margin:auto; top:0; left:0; right:0; bottom:0; border-radius:10px; padding:15px; z-index:1000; opacity:1; }
    #invitation .rule-box .rule-scoller { overflow:scroll; height:410px; padding:5px 0 }
    #invitation .rule-box .chose-rule img { width:35px; height:35px; position:absolute; top:10px; right:10px }
    #invitation .rule-box .rule-text { color:#e3e3e3; line-height:25px; }
    #invitation .rule-box .rule-text .text-table { text-align:center; margin:5px 0; }
    #invitation .rule-box .rule-text .text-table p { border-bottom:1px solid #e3e3e3; border-right:1px solid #e3e3e3; border-left:1px solid #e3e3e3; }
    #invitation .rule-box .rule-text .text-table p:first-child { border-top:1px solid #e3e3e3; }
    #invitation .inv-btn { line-height:45px; text-align:center; color:#ED692C; position:fixed; bottom:0; width:100%; background:#FFCA4F; font-size:14px; }
    #invitation .rule-title { background:url("../../../static/image/invitation-ruleIcon.png") no-repeat left center; background-size:20px 19px; padding-left:25px; font-size:14px; color:#F9CB18; }
</style>
