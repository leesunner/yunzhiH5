<template>
  <div class="hisRecords">
    <div class="content">
      <div class="hisRecords-top">
        <div class="hisRecords-top-headImg" :style="'background-image: url('+userInfo.avatar+')'"></div>
        <div class="hisRecords-top-info">
          <p class="name">{{userInfo.nickname}}</p>
          <p class="id">ID：{{userInfo.user_id}}</p>
        </div>
      </div>
      <div class="hisRecords-tab">
        <div :class="componentValue==item.value?'hisRecords-tab-active':''" v-for="item in tab" @click="changeTab(item.value)">{{item.name}}</div>
      </div>
    </div>
    <transition name="component-fade" mode="out-in">
      <component :is="componentValue" :list="list" :timeNow="timeNow" class="contentInfo" :userid="userInfo.user_id"
      v-infinite-scroll="loadMores" :infinite-scroll-disabled="loading" infinite-scroll-distance="10" @getIoin="getJoin(1)"></component>
    </transition>
  </div>
</template>

<script>
  import joinRecord from './joinRecord';
  import giftRecord from './giftRecord';
  import showRecord from './showRecord';
  export default {
    name: "his-person-center",
    components:{joinRecord,giftRecord,showRecord},
    data(){
      return{
        userId:'',
        userInfo:'',
        componentValue:'joinRecord',
        loading:false,
        tab:[
          {
            name:'参与记录',
            value:'joinRecord'
          },
          {
            name:'获奖记录',
            value:'giftRecord'
          },
          {
            name:'晒单记录',
            value:'showRecord'
          }
        ],
        list:[],
        page:1,
        pageType:true,
        timeNow: ''
      }
    },
    created(){
      this.userId = this.$route.query.id
      this.getMsg()
      this.getJoin(1)
    },
    methods:{
      loadMores() {
        if(this.loading){
          if(this.pageType){
            this.page++;
          }else{
            return ""
          }
          if(this.componentValue=='joinRecord'){this.getJoin(2)}
          if(this.componentValue=='giftRecord'){this.getGift(2)}
          if(this.componentValue=='showRecord'){this.getShow(2)}
        }
      },
      changeTab(val){//标签切换
        this.componentValue = val
        this.page = 1
        this.loading = true
        if(val=='joinRecord'){this.getJoin(1)}
        if(val=='giftRecord'){this.getGift(1)}
        if(val=='showRecord'){this.getShow(1)}
      },
      getMsg(){
        this.$axios.post('tade/index?version=v2', {user_id:this.userId}).then(res=>{
          if(res.data.code===1){
            this.userInfo = res.data.data
          }else{
            this.$vux.toast.text(res.data.msg)
          }
        })
      },
      getJoin(val){
        this.loading = false
        this.$axios.post('tade/orderList?version=v2', {user_id:this.userId,page:this.page}).then(res=>{
          if(res.data.code===1){
            if(val==1){
              this.loading = true
              this.timeNow = res.data.time
              this.list = res.data.data.list
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;
            }else{
              if(res.data.data.list.length>0){
                this.loading = true
                this.timeNow = res.data.time
                this.list = this.list.concat(res.data.data.list)
              }else{
                this.loading = false
                this.$vux.toast.text('没有更多内容了','bottom')
              }
            }
          }else{
            this.pageType = false
            this.$vux.toast.text(res.data.msg)
          }
        })
      },
      getGift(val){
        this.$axios.post('tade/prize?version=v2', {user_id:this.userId,page:this.page}).then(res=>{
          if(res.data.code===1){
            if(val==1){
              this.loading = true
              this.timeNow = res.data.time
              this.list = res.data.data.list
            }else{
              if(res.data.data.list.length>0){
                this.loading = true
                this.timeNow = res.data.time
                this.list = this.list.concat(res.data.data.list)
              }else{
                this.loading = false
                this.$vux.toast.text('没有更多内容了','bottom')
              }
            }
          }else{
            this.pageType = false
            this.$vux.toast.text(res.data.msg)
          }
        })
      },
      getShow(val){
        this.$axios.post('tade/show?version=v2', {user_id:this.userId,page:this.page}).then(res=>{
          if(res.data.code===1){
            if(val==1){
              this.loading = true
              this.list = res.data.data.list
            }else{
              if(res.data.data.list.length>0){
                this.loading = true
                this.list = this.list.concat(res.data.data.list)
              }else{
                this.loading = false
                this.$vux.toast.text('没有更多内容了','bottom')
              }
            }
          }else{
            this.pageType = false
            this.$vux.toast.text(res.data.msg)
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/reset.scss";
  .hisRecords{
    .content{
      @include tabFixed;
      height: 291*$r;
    }
    &-top{
      background-color: #f36c12;
      padding: 39*$r 0 21*$r 26*$r;
      @include flex-space;
      justify-content: flex-start;
      &-headImg{
        width: 140*$r;
        height: 140*$r;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        border-radius: 50%;
        margin-right: 25*$r;
      }
      &-info{
        color: #ffffff;
        .name{
          font-size: 30*$r;
        }
        .id{
          font-size: 26*$r;
        }
      }
    }
    &-tab{
      width: 100%;
      height: 81*$r;
      background-color: #ffffff;
      margin-bottom: 10*$r;
      padding: 0 23*$r;
      @include flex-space;
      div{
        width: 48%;
        height: inherit;
        line-height: 81*$r;
        text-align: center;
        color: #4a4a4a;
        font-size: 26*$r;
      }
      &-active{
        border-bottom: solid 2px #fb762a;
        color: #fb762a!important;
      }
    }
    .contentInfo{
      margin-top: 289*$r;
    }
  }
</style>
