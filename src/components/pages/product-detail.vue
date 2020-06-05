<template>
    <div id="product-detail">
        <div v-html="data" style="background:#fff;"></div>
    </div>
</template>
<script>
    export default{
        name:"productDetail",
        data(){
            return{
                 data:""
            }
        },
        activated() {
            this.getData();
        },
        // created:function(){
        //     document.title = '图文详情';
        //     this.getData();
        // },
        methods:{
            getData:function(){
                var that = this;
                this.$axios.post('/newgoods/view?version=v2',{id:this.$route.params.id}).then(function (response) {
                    if(response.data.code==1){
                        that.data = response.data.data.detail.content;
                    }else{
                        that.$vux.toast.text(response.data.msg);
                    }
                })
            }
        }
    }
</script>
<style>
    #product-detail{ padding:15px;line-height:180%; -moz-box-sizing:border-box; -ms-box-sizing:border-box; box-sizing:border-box;background:#fff;min-height:100%;}
    #product-detail img{max-width:100%;}
</style>
