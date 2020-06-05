<template>
  <div class="show">
    <p style="text-align: center;padding: 2px 0 5px;">只显示30天内的数据</p>
    <div class="show-con">
      <loadMore :bottomDistance='20' :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
        <div>
          <div class="show-item" v-for="item in data" @click="goWrite(item)">
            <img class="show-item-proImg" :src="item.pic"/>
            <div class="show-item-content">
              <p class="show-item-content-title">{{item.name}}</p>
              <!--<p class="show-item-content-indoc">{{item.content}}</p>-->
              <p class="show-item-content-status">
                <!--<span v-if="item.status>0">{{item.upTime}}</span>-->
                <span class="color">晒单获得2积分</span>
              </p>
            </div>
          </div>
        </div>
      </loadMore>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        data:[],
        page:1,
        allLoaded:false,//上拉加载更多
      }
    },
    created(){
      this.getMsg()
    },
    methods:{
      goWrite(val){//去评论晒单
        this.navigateTo('showContent',{data:JSON.stringify(val)})
      },
      loadBottom: function(){//上拉加载更多
        this.page++;
        this.getMsg();
        this.allLoaded=true; // 若数据已全部获取完毕
        this.$refs.loadmore.onBottomLoaded();
      },
      getMsg(){
        let that = this
        this.$axios.post('/show/lists?version=v2',{
          qtype:0,
          page:that.page
        }).then(res=>{
          if(res.data.code===1){
            if(res.data.data.list.length>0){
              this.data = this.data.concat(res.data.data.list)
              this.allLoaded=false;
            }else{
              if(that.page>1){
                this.$vux.toast.text("加载完啦～");
                this.allLoaded=false;
              }
            }
          }
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/reset.scss";
  .show{
    @include appcontent;
    position: relative;
    padding-top: 0;
    &-con{
      @include ios-Scroll;
      background-color: #ffffff;
    }
    &-item{
      height: 240*$r;
      border-bottom: solid 1px #e2e2e2;
      padding-left: 26*$r;
      @include flex-space;
      justify-content: flex-start;
      &-proImg{
        width: 210*$r;
        height: 210*$r;
        margin-right: 35*$r;
      }
      &-content{
        height: 210*$r;
        padding-top: 26*$r;
        color: #898989;
        &-title{
          color: #4a4a4a;
          font-size: 30*$r;
          margin-bottom: 10*$r;
        }
        &-status{
          margin-top: 43*$r;
          .color{
            color: #fb762a;
          }
        }
      }
    }
  }
</style>
