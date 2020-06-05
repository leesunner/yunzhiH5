<template>
  <div class="ticketNum">
    <div class="ticketNum-con">
      <loadMore :bottomDistance='20' :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
        <ul>
          <li v-for="(item,index) in data" :key="index">
            <ticket :key="index" :ticketData="item" :type="0" :time="time">
            </ticket>
          </li>
        </ul>
      </loadMore>
    </div>
  </div>
</template>

<script>
  import ticket from '@/components/mine/ticket/ticket'
  export default {
    name: "ticket-num",
    components:{
      ticket
    },
    data(){
      return{
        data:[],
        time:0,
        allLoaded:false,
        page:1
      }
    },
    created(){
      this.getMsg()
    },
    methods:{
      getMsg(){
        this.$axios.post('/user/coupons?version=v2',{
          type:0,//未使用的
          page:this.page
        }).then(res=>{
            if(res.data.code===1){
              if(res.data.data.list.length>0){
                this.data = this.data.concat(res.data.data.list)
                this.time = res.data.time
                this.allLoaded=false;
              } else {
                this.$vux.toast.text('内容加载完啦～');
                this.allLoaded=true;
              }
            }else{
              this.$vux.toast.text(res.data.msg);
              this.allLoaded=true;
            }
        })
      },
      loadBottom: function(){//上拉加载更多
        if(!this.allLoaded){
        this.page++;
        this.getMsg();
        this.allLoaded=true; // 若数据已全部获取完毕
        this.$refs.loadmore1.onBottomLoaded();
      }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/reset.scss";
  .ticketNum{
    @include appcontent;
    position: relative;
    padding-top: 0;
    // @include ios-Scroll;
    // overflow: hidden;
    background-color: #f2f2f2;
    &-con{
      @include ios-Scroll;
      overflow: hidden;
    }
  }
</style>
