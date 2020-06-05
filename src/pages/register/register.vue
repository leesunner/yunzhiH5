<template>
  <div class="register">
    <register-view :viewType="type"></register-view>
  </div>
</template>

<script>
  import registerView from '@/components/register/registerAndCode'
    export default {
        name: "register",
      components:{
        registerView
      },
      data(){
          return{
            type:1//控制页面协议显示2为隐藏
          }
      }
    }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/reset.scss";
  .register {
  @include appcontent;
  }
</style>
