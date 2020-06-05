<template>
  <div class="waitePull">
    <p style="text-align: center;padding: 2px 0 5px;">只显示30天内的数据</p>
    <div class="waitePull-con">
      <loadMore :bottomDistance='20' :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
        <lucky-item v-for="(item,index) in list" :item="item" :has_auth="data.has_auth" :key="index"></lucky-item>
      </loadMore>
    </div>
  </div>
</template>
<script>
  import LuckyItem from "./luckyItem";
  export default {
    components: {LuckyItem},
    name: "waite-pull",
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
        this.$axios.post('/user/prize?version=v2',{page:this.page,type:2}).then((res)=>{
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
  .waitePull{
    @include appcontent;
    position: relative;
    padding-top: 0;
    // -webkit-overflow-scrolling:  touch;//ios滚动硬件加速属性
    &-con{
      background-color: #ffffff;
      @include ios-Scroll;
      overflow:hidden;
    }
  }
</style>
