<template>
  <div class="setting">
    <bullet  v-for="(item,index) in data" :key="index" :url="item.url" :title="item.title" :para="item.para"></bullet>
    <!-- <p class="banben">版本号：1.0.1</p> -->
    <div class="setting-out" @click="loginOut">退出</div>
  </div>
</template>

<script>
  import bullet from '@/components/public/bullet'
  import {mapMutations} from 'vuex'
  export default {
    name: "setting",
    components:{
      bullet
    },
    data(){
      return{
        goIndex:'',
        data:[
          {
            url:'agreement',
            title:'服务协议',
            para:{id:2,title:'协议'}
          },
          {
            url:'agreement',
            title:'隐私协议',
            para:{id:3,title:'协议'}
          },
          {
            url:'agreement',
            title:'关于我们',
            para:{id:4,title:'协议'}
          }
        ]
      }
    },
    methods:{
      ...mapMutations([
        'setUserInfo'
      ]),
      loginOut(){
        this.$axios.post('/site/logout?version=v2').then(res=>{
          let data = res.data
          if(data.code===1){
            //提交用户信息到状态里面
            this.setUserInfo({})
            sessionStorage.clear();
            if (this.appType != 'H5') {
              this.JsBridge.callHandler("loginOut", {}, function (responseData) {});
            }
            setTimeout(function () {
              this.$vux.toast.text('退出成功')
              this.navigateTo('home')
            }.bind(this),800)

          }else{
            this.$vux.toast.text(data.msg)
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/reset.scss";
  .setting{
    // background-color: #ffffff;
    &-out{
      width: 90%;
      height: 88*$r;
      background-color: #fb762a;
      color:#ffffff;
      margin: 0 auto;
      border-radius: 5px;
      margin-top: 49*$r;
      text-align: center;
      line-height: 88*$r;
      font-size: 30*$r;
      letter-spacing: 2px;
    }
    .banben{
      height: 1.47rem;
      line-height: 1.47rem;
      border-bottom: solid 1px #ececec;
      padding-left: 4vw;
      background: #ffffff;
    }
  }
</style>
