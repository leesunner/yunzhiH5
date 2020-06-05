<template>
  <div class="login">
    <!--lqlg-->
    <img class="login-logo" src="../../assets/img/lqlgIcons.png" v-if="$appid == 'lqlg'"/>
    <!--yyyg-->
    <img class="login-logo" src="../../assets/img/loginImg.png" v-if="$appid == 'yyyg'"/>
    <!--yytj-->
    <img class="login-logo" src="../../assets/img/loginyytj.png" v-if="$appid == 'yytj'"/>
    <!-- lqdb -->
    <img class="login-logo" src="../../assets/img/loginlqdb.png" v-if="$appid == 'lqdb'&&$logoType==1"/>
    <!-- yytg -->
    <img class="login-logo" src="../../assets/img/yytg1.png" v-if="$appid == 'yytg'"/>
    <!-- kdlg -->
    <img class="login-logo" src="../../assets/img/kdlg.png" v-if="$appid == 'kdlg'"/>
    <!-- ymlg -->
    <img class="login-logo" src="../../assets/img/ymlglogo.png" v-if="$appid == 'ymlg'"/>
    <!-- lqpg -->
    <img class="login-logo" src="../../assets/img/lqpglogo.png" v-if="$appid == 'lqdb'&&$logoType==2"/>
    <div class="login-logo-input">
      <form>
        <div class="login-logo-input-con">
          <img class="login-logo-input-con-icon" src="../../assets/img/loginuser.png"/>
          <div class="login-logo-input-con-in">
            <x-input placeholder="请输入手机号" required v-model="phoneNumber" @on-blur="validatePhone"></x-input>
          </div>
        </div>
        <div class="login-logo-input-con">
          <img class="login-logo-input-con-icon" src="../../assets/img/loginpass.png"/>
          <div class="login-logo-input-con-in">
            <x-input placeholder="请输入密码" required :type="pasType" v-model="passWord" :show-clear=false></x-input>
            <div class="eyeButton" @click="changPasType">
              <img class="login-logo-input-con-in-eye" :src="pasTypeImg"/>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="login-backPassWord" @click="navigateTo('backPassword')">忘记密码?</div>
    <div class="login-submit" @click="loginPage">登录</div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    name: "login",
    data(){
      return{
        phoneNumber:'' ,
        passWord:'',
        pasType:'password',
        pasTypeImg:require('@/assets/img/eyey.png'),
        pasContro:false,
      }
    },
    methods:{
      ...mapActions([
        'login'
      ]),
      loginPage(){
        let that = this
        if(!this.phoneNumber){
          this.$vux.toast.text('请输入手机号码')
          return
        }
        if(!this.passWord){
          this.$vux.toast.text('请输入密码')
          return
        }
        let para = {
          'User[username]':this.phoneNumber,
          'User[password]':this.passWord
        }
        // if (this.appType !='H5') {
        //   if (this.getPhoneType()=='ios') {
        //     this.JsBridge.callHandler("h5_login", {}, function (responseData) {});
        //   }
        // }
        this.$axios.post('site/login?version=v2',para).then(res=>{
          let data = res.data
          if(data.code===1){
            that.login().then(res=>{
              if(res==1){
                that.$router.go(-1)
              }else{
                that.$vux.toast.text('获取用户信息失败')
              }
            })
          }else{
            this.$vux.toast.text(data.msg)
          }
        })
      },
      changPasType(){//密码显示类型控制
        this.pasContro = !this.pasContro
        if(this.pasContro){
          this.pasTypeImg=require('@/assets/img/eyex.png')
          this.pasType = 'text'
        }else{
          this.pasTypeImg=require('@/assets/img/eyey.png')
          this.pasType = 'password'
        }
      },
      // 手机号失去焦点时验证是否正确
      validatePhone(value) {
        if(!(/^1[34578]\d{9}$/.test(value))){
            this.$vux.toast.text('手机号码有误')
            return false;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/reset.scss";
  .login{
    @include appcontent;
    &-logo{
      display: block;
      width: 118*$r;
      height: 118*$r;
      margin: 33*$r auto;
      &-input{
        width: 100%;
        &-con{
          width: inherit;
          height: 72*$r;
          background-color: #ffffff;
          line-height: 72*$r;
          &-icon{
            width: 30*$r;
            height: 34*$r;
            margin-right: 22*$r;
            margin-left: 13*$r;
            vertical-align: middle;
          }
          &-in{
            display: inline-block;
            vertical-align: middle;
            width: 85%;
            position: relative;
            .eyeButton{
              position: absolute;
              right: 0;
              top: 0;
              width: 40*$r;
              height: 100%;
            }
            &-eye{
              margin-top: 24*$r;
              width: 34*$r;
              height: 19*$r;
            }
            .weui-cell_warn{
              width: 93%!important;
            }
          }
        }
        &-con:nth-child(1){
          margin-bottom: 17*$r;
        }
      }
    }
    &-backPassWord{
      text-align: right;
      color:#f36c12;
      margin-top: 30*$r;
      margin-bottom: 33*$r;
      padding-right: 35*$r;
    }
    &-submit{
      width: 90%;
      height: 86*$r;
      background-color: #f36c12;
      color: #ffffff;
      text-align: center;
      line-height: 86*$r;
      margin: 0 auto;
      border-radius: 5*$r;
      font-size: 30*$r;
      letter-spacing: 3px;
    }
  }
</style>
