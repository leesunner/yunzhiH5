<template>
  <div class="find">
    <div class="find-item" v-for="item in data" @click="goTo(item.url)">
      <img class="find-item-icon" :src="item.pics"/>
      <div class="find-item-con">
        <div class="find-item-con-text">
          <p>{{item.title}}</p>
          <p class="find-item-con-text-duc">{{item.summary}}</p>
        </div>
        <img class="find-item-con-link" src="../../assets/img/yjtz.png"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "find",
    data(){
      return{
        data:[]
      }
    },
    created(){
      this.getMsg();
    },
    methods:{
      goTo(url){
        this.navigateTo(url,{})
      },
      formatUrl(item){//处理banner链接跳转
        return item.split('/#/')[1]
      },
      getMsg(){
        let platform = 'h5'
        if(this.appType !='H5'){
          if(this.getPhoneType()=='ios'){
            platform = 'iOS'
          }else{
            platform = 'Android'
          }
        }
        this.$axios.post("/site/find?version=v2",{'fromin':this.$channel,'platform':platform}).then(res=>{
          let list = res.data.data.list
          this.data = list
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/reset.scss";
  .find{
    width: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    font-family: 'PingFang SC';
    position: absolute;
    @include ios-Scroll;
    overflow: auto;
    padding-top: 88*$r;
    padding-bottom: 98*$r;
    &-item{
      height: 123*$r;
      width: 100%;
      background-color: #ffffff;
      border-bottom: solid 1px #ececec;
      @include flex-space;
      justify-content: flex-start;
      &-icon{
        width: 64*$r;
        height: 64*$r;
        margin-left: 34*$r;
        margin-right: 30*$r;
      }
      &-con{
        width: 85%;
        padding-right: 30*$r;
        @include flex-space;
        &-text{
          font-size: 28*$r;
          color: #3a3a3a;
          &-duc{
            color: #898989;
            font-size: 24*$r;
          }
        }
        &-link{
          width: 12*$r;
          height: 22*$r;
        }
      }
    }
    &-item:nth-child(1){
      margin-bottom: 10*$r;
      border-bottom: none;
    }
  }
</style>
