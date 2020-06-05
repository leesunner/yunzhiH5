<template>
    <div id="invitationLog">
        <div class="box logTitle">
            <div class="box-flex" style="border-right:1px solid #f5f5f5;">
                <p class="num">{{data.prom_num}}</p>
                <p>已邀请好友（人）</p>
            </div>
            <div class="box-flex">
                <p class="num">{{data.score}}</p>
                <p>累计获得积分（个）</p>
            </div>
        </div>
        <div class="box" style="margin-top:5px;">
            <div class="box-flex">我的好友</div>
            <div class="box-flex">注册时间</div>
            <div class="box-flex">获得积分奖励</div>
        </div>
        <ul style="background:#fff;margin-top:5px;padding: 0 15px;">
            <li class="box" v-for="log in data.list">
                <span class="box-flex">{{log.nickname}}</span>
                <span class="box-flex">{{log.ctime}}</span>
                <span class="box-flex">{{log.score}}</span>
            </li>
            <div style="height:15px;" v-if="data.list.length>0"></div>
        </ul>
    </div>
</template>
<script>
    export default{
        name:"invitationLog",
        data(){
            return{
                data:{
                    list:[]
                }
            }
        },
        created:function(){
            document.title = '邀请记录';
            this.getData();
        },
        methods:{
            getData:function(){
                var that = this;
                this.$axios.post('/prom/promlist?version=v2').then(function (response) {
                    if(response.data.code == 1){
                        that.data = response.data.data;
                        if(response.data.data.list==''){
                            that.$vux.toast.text('暂无记录');
                        }
                    }else{
                        that.$vux.toast.text(response.data.msg);
                    }
                })
            }
        }
    }
</script>
<style>
    #invitationLog .box{display:flex;background:#fff;text-align:center; padding:0 15px;}
    #invitationLog .box .box-flex{ flex:1; color:#898989; padding:10px 0;}
    #invitationLog .box .box-flex .num{font-size:16px;color:#3a3a3a;}
    #invitationLog .box .box-flex p{line-height:25px;}
    #invitationLog ul li:nth-child(2n){background:#F6F7F9;}
</style>