<template>
  <div class="register">
    <register-view :viewType="type"></register-view>
  </div>
</template>

<script>
  import registerView from '@/components/register/registerAndCode'
  export default {
    components:{
      registerView
    },
    data(){
      return{
        type:2//控制页面协议显示1为显示
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
