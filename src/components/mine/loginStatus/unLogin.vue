<template>
    <div class="mines" >
      <div class="mines-login">
        <p class="mines-login-indc" v-if="$appid == 'lqlg'">欢迎来到零钱乐购</p>
        <p class="mines-login-indc" v-if="$appid == 'yyyg'">欢迎来到一元云购</p>
        <p class="mines-login-indc" v-if="$appid == 'kdlg'">欢迎来到口袋乐购</p>
        <p class="mines-login-indc" v-if="$appid == 'yytj'">欢迎来到乐购商城</p>
        <p class="mines-login-indc" v-if="$appid == 'yytg'">欢迎来到一元听歌</p>
        <p class="mines-login-indc" v-if="$appid == 'lqdb'&&this.$logoType==1">欢迎来到零钱兑宝</p>
        <p class="mines-login-indc" v-if="$appid == 'lqdb'&&this.$logoType==2">欢迎来到零钱拼购</p>
        <p class="mines-login-indc" v-if="$appid == 'ymlg'">欢迎来到羊毛乐购</p>
        <div class="mines-login-btn">
          <div class="mines-login-btn-item" @click="navigateTo('userLogin')">登录</div>
          <div class="mines-login-btn-item" @click="navigateTo('userRegister')">注册</div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "un-login"
    }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/reset.scss";
  .mines{
    &-login{
      width: 100%;
      height: 292*$r;
      background-color: #f36c12;
      //border-top: solid 1px #F37A1F;
      &-indc{
        font-size: 28*$r;
        text-align: center;
        color: #ffffff;
        padding-top: 45*$r;
        margin-bottom: 41*$r;
      }
      &-btn{
        width: 411*$r;
        margin: 0 auto;
        height: 65*$r;
        @include flex-space;
        &-item{
          width: 190*$r;
          height: 65*$r;
          background-color: #ffffff;
          border-radius: 16px;
          color: #f36c12;
          text-align: center;
          line-height: 65*$r;
          font-size: 34*$r;
        }
      }
    }
  }
</style>
