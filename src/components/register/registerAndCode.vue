<template>
  <div class="regCode">
    <!--lqlg-->
    <img class="regCode-logo" src="../../assets/img/lqlgIcons.png" v-if="$appid == 'lqlg'"/>
    <!--yyyg-->
    <img class="regCode-logo" src="../../assets/img/loginImg.png"  v-if="$appid == 'yyyg'"/>
    <!--yytj-->
    <img class="regCode-logo" src="../../assets/img/loginyytj.png" v-if="$appid == 'yytj'"/>
    <!-- lqdb -->
    <img class="regCode-logo" src="../../assets/img/loginlqdb.png" v-if="$appid == 'lqdb'&&$logoType==1"/>
    <!-- yytg -->
    <img class="regCode-logo" src="../../assets/img/yytg1.png" v-if="$appid == 'yytg'"/>
    <!-- kdlg -->
    <img class="regCode-logo" src="../../assets/img/kdlg.png" v-if="$appid == 'kdlg'"/>
    <!-- ymlg -->
    <img class="regCode-logo" src="../../assets/img/ymlglogo.png" v-if="$appid == 'ymlg'"/>
    <!-- lqpg -->
    <img class="regCode-logo" src="../../assets/img/lqpglogo.png" v-if="$appid == 'lqdb'&&$logoType==2"/>
    <form>
      <div class="regCode-logo-input">
        <div class="regCode-logo-input-con">
          <img class="regCode-logo-input-con-icon" src="../../assets/img/rephone.png"/>
          <div class="regCode-logo-input-con-in">
            <x-input placeholder="请输入手机号" required v-model="phoneNum" @on-blur="validatePhone"></x-input>
          </div>
        </div>
        <div class="regCode-logo-input-con">
          <img class="regCode-logo-input-con-icon" src="../../assets/img/123pass.png"/>
          <div class="regCode-logo-input-con-in" style="width: 60%">
            <x-input placeholder="请输入验证码" required v-model="code"></x-input>
          </div>
          <div :class="{'regCode-logo-input-con-code':true,'regCode-logo-input-con-code-gay':codeNum>0}" @click="getPhoneCode">{{codeNum<=0?'获取验证码':codeNum+'s后重试'}}</div>
        </div>
        <div class="regCode-logo-input-con">
          <img class="regCode-logo-input-con-icon" src="../../assets/img/loginpass.png"/>
          <div class="regCode-logo-input-con-in">
            <x-input placeholder="请输入密码" required :type="pasType" v-model="passWord" :show-clear=false></x-input>
            <div class="eyeButton" @click="changPasType">
              <img class="regCode-logo-input-con-in-eye" :src="pasTypeImg"/>
            </div>
          </div>
        </div>
      </div>
    </form>
    <div class="regCode-read" v-if="viewType===1">
      <div @click="chooseRead=!chooseRead" :class="{'regCode-read-choose':true,'regCode-read-noChoose':chooseRead}">
        <img src="../../assets/img/goux.png"/>
      </div>
      <span v-if="$appid == 'lqlg'">我已阅读并同意<span class="regCode-read-xy" @click="navigateTo('accept')">《零钱乐购互助购物协议》</span></span>
      <span v-if="$appid == 'yyyg'">我已阅读并同意<span class="regCode-read-xy" @click="navigateTo('accept')">《一元云购互助购物协议》</span></span>
      <span v-if="$appid == 'kdlg'">我已阅读并同意<span class="regCode-read-xy" @click="navigateTo('accept')">《口袋乐购互助购物协议》</span></span>
      <span v-if="$appid == 'yytj'">我已阅读并同意<span class="regCode-read-xy" @click="navigateTo('accept')">《乐购商城互助购物协议》</span></span>
      <span v-if="$appid == 'yytg'">我已阅读并同意<span class="regCode-read-xy" @click="navigateTo('accept')">《一元听歌互助购物协议》</span></span>
      <span v-if="$appid == 'lqdb'">我已阅读并同意<span class="regCode-read-xy" @click="navigateTo('accept')">《零钱互助购物协议》</span></span>
    </div>
    <div @click="submit" class="regCode-submit">{{viewType===1?'注册':'重置密码'}}</div>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  export default {
    props:{
      viewType:Number
    },
    data(){
      return{
        phoneNum:'' ,
        passWord:'',
        code:'',
        codeNum:0,//验证码读秒
        pasType:'password',
        pasTypeImg:require('@/assets/img/eyey.png'),
        pasContro:false,//密码显示类型
        chooseRead:false,//是否阅读协议
      }
    },
    methods:{
      ...mapMutations([
        'setUserInfo'
      ]),
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
      getPhoneCode(){//获取手机验证码
        const test = /^1\d{10}/
        if(!test.test(this.phoneNum)){
          this.$vux.toast.text('请输入正确的手机号码',)
          return
        }
        let type=''
        if(this.viewType==1){
          type='reg'//注册
        }else{
          type='find'//找回
        }
        if(this.codeNum>0){
          this.$vux.toast.text('请在'+this.codeNum+'s后重试','top')
        }else{
          this.codeNum = 59
          let time = setInterval(function () {
            this.codeNum -=1
            if(this.codeNum===0){
              clearInterval(time)
            }
          }.bind(this),1000)
          this.$axios.post("/site/code?version=v2",{
            'Code[phone]':this.phoneNum,
            'Code[type]':type,
          }).then((res)=>{
            if(res.data.code===1){
              this.$vux.toast.text('验证码发送成功')
            }else{
              clearInterval(time)
              this.codeNum=0
              this.$vux.toast.text(res.data.msg)
            }
          })
        }
      },
      submit(){//提交数据
        if(!this.phoneNum){
          this.$vux.toast.text('请输入手机号码')
          return
        }
        if(!this.passWord){
          this.$vux.toast.text('请输入密码')
          return
        }
        if(!this.code){
          this.$vux.toast.text('请输入验证码')
          return
        }
        if(this.chooseRead){
          this.$vux.toast.text('请同意服务协议')
          return
        }
        if(this.viewType===1){//注册信息
          this.registerInfo()
        }else{//重置密码
          this.resetPassWord()
        }
      },
      registerInfo(){
        let from = this.$channel,platform='H5';
        if(this.appType !='H5'){
          if(this.getPhoneType()=='ios'){
            platform = 'iOS'
          }else{
            platform = 'Android'
          }
        }
        this.$axios.post("/site/register?version=v2",{
          'User[username]':this.phoneNum,
          'User[password]':this.passWord,
          'User[code]':this.code,
          'User[from]':from,
          'User[platform]':platform,
        }).then((res)=>{
          if(res.data.code===1){
            // this.$vux.toast.text('注册成功')
            // this.$router.go(-1)
            this.navigateTo('registerSuccess')
          }else{
            this.$vux.toast.text(res.data.msg)
          }
        })
      },
      resetPassWord(){
        this.$axios.post("/site/findPass?version=v2",{
          'User[username]':this.phoneNum,
          'User[newpass]':this.passWord,
          'User[code]':this.code,
        }).then((res)=>{
          if(res.data.code===1){
            this.loginOut()
          }else{
            this.$vux.toast.text(res.data.msg)
          }
        })
      },
      loginOut(){//退出清除当前用户信息
        this.$axios.post('/site/logout?version=v2').then(res=>{
          let data = res.data
          if(data.code===1){
            //提交用户信息到状态里面
            this.setUserInfo({})
            sessionStorage.clear();
            this.$vux.toast.text('重置密码成功')
            this.$router.go(-1)
          }else{
            this.$vux.toast.text(data.msg)
          }
        })
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
  .regCode{
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
          position: relative;
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
          &-code{
            width: 150*$r;
            height: 58*$r;
            position: absolute;
            right: 15*$r;
            top: 6*$r;
            background-color: #f36c12;
            color: #ffffff;
            border-radius: 4px;
            text-align: center;
            line-height: 58*$r;
            &-gay{
              background-color: #8f8f8f;
            }
          }
        }
        &-con:nth-child(1){
          margin-bottom: 17*$r;
        }
        &-con:nth-child(2){
          margin-bottom: 17*$r;
        }
      }
    }
    &-read{
      height: 34*$r;
      font-size: 28*$r;
      line-height: 34*$r;
      margin-top: 26*$r;
      &-choose{
        display: inline-block;
        width: 37*$r;
        height: 37*$r;
        border-radius: 50%;
        background-color: #f36c12;
        vertical-align: middle;
        text-align: center;
        line-height: 37*$r;
        margin-right: 17*$r;
        margin-left: 11*$r;
        img{
          width: 20*$r;
          height: 14*$r;
        }
      }
      span{
        color: #cccccc;
        vertical-align: middle;
      }
      &-xy{
        color: #f36c12 !important;
      }
      &-noChoose{
        background-color: #b2b2b2;
      }
    }
    &-submit{
      width: 90%;
      height: 86*$r;
      background-color: #f36c12;
      color: #ffffff;
      text-align: center;
      line-height: 86*$r;
      margin: 0 auto;
      margin-top: 51*$r;
      border-radius: 5*$r;
      font-size: 30*$r;
      letter-spacing: 3px;
    }
  }
</style>
