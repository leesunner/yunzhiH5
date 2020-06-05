<template>
  <div class="all">
    <div class="all-con">
      <loadMore :bottomDistance='20' :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
        <card-item v-for="(item,index) in list" :item="item" :has_auth="data.has_auth" :key="index"></card-item>
      </loadMore>
    </div>
  </div>
</template>

<script>
  import cardItem from "./cardItem";
  export default {
    name: "all",
    components:{
      cardItem,
    },
    data(){
      return{
        data:{},
        list:[],
        page:1,
        allLoaded:false,//上拉加载更多
      }
    },
    created(){
      this.getMsg()
    },
    methods:{
      loadBottom: function(){//上拉加载更多
        this.page++;
        this.getMsg();
        this.allLoaded=true; // 若数据已全部获取完毕
        this.$refs.loadmore.onBottomLoaded();
      },
      getMsg(){//获取已完成 晒单的接口数据
        this.$axios.post('/user/prize?version=v2',{page:this.page}).then((res)=>{
            if(res.data.code===1){
              if(res.data.data.list.length>0){
                this.data = res.data.data
                this.list = this.list.concat(res.data.data.list)
                this.allLoaded=false;
              }else{
                this.$vux.toast.text("内容加载完啦～");
                this.allLoaded=false;
              }
            }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/reset.scss";
  .all{
    @include appcontent;
    position: relative;
    padding-top: 0;
    &-con{
      background-color: #ffffff;
      @include ios-Scroll;
      overflow:hidden;
    }
  }

</style>
