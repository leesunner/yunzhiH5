<template>
  <div class="certifi">
    <div class="certifi-title">*为了您的账号安全性，请完成实名认证</div>
    <div class="certifi-name">
      <label>真实姓名</label>
      <div class="input">
        <x-input placeholder="请输入真是姓名" v-model="username"></x-input>
      </div>
    </div>
    <div class="certifi-card">
      <label>身份证号</label>
      <div class="input">
        <x-input placeholder="请输入身份证号" v-model="card"></x-input>
      </div>
    </div>
    <div class="certifi-btn" @click="submit">立即认证</div>
  </div>
</template>

<script>
  export default {
    name: "certification",
    data(){
      return{
        username:'',
        card:''
      }
    },
    methods:{
      submit(){
        if(!this.username){
          this.$vux.toast.text('请输入真实姓名')
          return
        }
        if(!this.card){
          this.$vux.toast.text('请输入证件号')
          return
        }
        this.$axios.post('/user/authApply?version=v2',{'Apply[realname]':this.username,'Apply[idcard]':this.card}).then(res=>{
          if(res.data.code===1){
            this.$emit('changeName','certSubmit')
          }else{
            this.$vux.toast.text(res.data.msg)
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/reset.scss";
  .certifi{
    &-title{
      height: 58*$r;
      line-height: 58*$r;
      background-color: #ffebeb;
      color: #f73320;
      padding-left: 30*$r;
    }
    &-name{
      @include flex-space;
      justify-content: flex-start;
      height: 96*$r;
      background-color: #ffffff;
      border-bottom: solid 1px #eeeeee;
    }
    &-card{
      @include flex-space;
      justify-content: flex-start;
      height: 96*$r;
      background-color: #ffffff;
    }
    .input{
      font-size: 28*$r;
      height: inherit;
      line-height: 96*$r;
      width: 65%;
    }
    label{
      color: #333333;
      font-size: 28*$r;
      margin-left: 30*$r;
      margin-right: 76*$r;
    }
    &-btn{
      width: 690*$r;
      height: 88*$r;
      background-image: linear-gradient(166deg,
        #fe7e50 0%,
        #f73320 100%),
      linear-gradient(
          #f8654b,
          #f8654b);
      background-blend-mode: normal,normal;
      border-radius: 10*$r;
      margin: 0 auto;
      color: #ffffff;
      text-align: center;
      line-height: 88*$r;

      margin-top: 60*$r;
      font-family: 'PingFang-SC-Regular';
      font-size: 32*$r;
    }
  }
</style>
