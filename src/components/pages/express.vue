<template>
    <div id="express">
        <div class="title">
            <img src="../../../static/image/express-img.png" alt="">
            <div class="express-info" :style="infoWidth">
                <p>物流公司：{{$route.params.name}}</p>
                <p>物流单号：{{$route.params.code}}</p>
            </div>
            <div class="clear"></div>
        </div>
        <div>
            <p style="line-height:35px;border-bottom:1px solid #e8e8e8;padding: 0 15px; background: #fff;
    margin-top: 5px;">订单跟踪</p>
            <timeline>
                <timeline-item v-for="(list,index) in data" :key="index">
                    <h4 class="recent">{{list.context}}</h4>
                    <p class="recent">{{list.time}}</p>
                </timeline-item>
            </timeline>
        </div>
    </div>
</template>
<script>
    import { Timeline,TimelineItem } from 'vux'
    export default{
        components: {Timeline,TimelineItem},
        data(){
            return{
                data:{},
                infoWidth:""
            }
        },
        created:function(){
            this.getData(this.$route.params.name,this.$route.params.code);
        },
        mounted: function () {
            this.infoWidth = 'width:' + (document.body.clientWidth*1-85) + 'px;';
        },
        methods:{
            getData:function(name,code){
                var that = this;
                this.$axios.post('/site/expressApi?version=v2',{express_name:name,express_code:code}).then(function (response) {
                    if (response.data.code == 1) {
                        if(response.data.data.data!=null){
                            that.data = response.data.data.data.reverse() ;
                        }
                    }else{
                        that.$vux.toast.text(response.data.msg);
                    }
                    that.$vux.toast.text(response.data.data.msg);
                })
            }
        }
    }
</script>
<style>
    #express{}
    #express .title{background:#fff; padding:15px;font-size:14px;}
    #express .title img{float:left;width:40px;height:40px;margin-right:15px;}
    #express .recent{ color:#898989;}
    #express h4{ color:#3a3a3a!important;}
    #express .express-info{float:right;}
</style>
