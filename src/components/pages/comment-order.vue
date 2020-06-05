<template>
    <div id="comment-order">
        <div class="show-img" @click="toOrder">
            <img src="../../../static/image/show-img.png" alt="">
        </div>
    </div>
</template>
<script>
    export default{
        name:'commentOrder',
        data(){
            return{}
        },
        created:function(){
            document.title='中奖靠快，好运靠晒';
            // this.JsBridge.callHandler("shareRight", {type:3, id:0}, function (responseData) {});
        },
        methods:{
            toOrder:function(){
                // this.JsBridge.callHandler("commentOrder", function (responseData) {});
              this.navigateTo('showOrder')
            }
        }
    }
</script>
<style>
    #comment-order{height:100%;}
    #comment-order .show-img img{width:100%;vertical-align:middle;height:100%;}
    #comment-order .show-img {height:100%;}
</style>
