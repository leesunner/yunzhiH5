<template>
    <div id="accept">
        <div v-html="accept" class="content"></div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                accept:""
            }
        },
        created:function(){
            document.title='服务协议';
            this.getAccept();
        },
        methods:{
            getAccept:function(){
                var that = this;
                this.$axios.post('/site/agreement?version=v2').then(function (response) {
                    if(response.data.code==1){
                        that.accept = response.data.data.content;
                    }
                })
            }
        }
    }
</script>
<style>
    #accept .content{ padding:15px;}
</style>