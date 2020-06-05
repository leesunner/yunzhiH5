<template>
  <div class="nickName">
    <div  class="nickName-input">
      <x-input placeholder="请输入昵称" v-model="nickName"></x-input>
    </div>
    <p>*昵称的长度为2-20个字符，由汉字、字母、数字组成</p>
    <div class="nickName-btn" @click="submit">保存</div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    name: "my-nick-name",
    data(){
      return{
        nickName:''
      }
    },
    methods:{
      ...mapActions([
        'login'
      ]),
      submit(){
        let test = /^[\u4e00-\u9fa5a-zA-Z\d]{2,20}$/
        if(!test.test(this.nickName)){
          this.$vux.toast.text('请输入正确的昵称')
          return
        }
        this.$axios.post('/user/infoSave?version=v2',{'User[nickname]':this.nickName}).then(res=>{
            if(res.data.code==1){
              this.login()
              this.$router.go(-1)
            }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/reset.scss";
  .nickName{
    &-input{
      margin-top: 29*$r;
      height: 72*$r;
      background-color: #ffffff;
      margin-bottom: 20*$r;
      line-height: 72*$r;
      padding-left: 30*$r;
      padding-right: 35*$r;
    }
    p{
      color: #898989;
      padding-left: 29*$r;
      margin-bottom: 65*$r;
    }
    &-btn{
      width: 690*$r;
      height: 86*$r;
      background-color: #fb762a;
      border-radius: 10*$r;
      font-size: 30*$r;
      color: #ffffff;
      margin: 0 auto;
      text-align: center;
      line-height: 86*$r;
    }
  }
</style>
