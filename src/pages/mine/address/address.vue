<template>
  <div class="address">
    <component :is="adsContol" :data="data"></component>
    <div class="address-add" @click="navigateTo('addAddress')">添加新地址</div>
  </div>
</template>

<script>
  import noAddress from '@/components/mine/address/noAddress'
  import addAddress from '@/components/mine/address/addAddress'
  export default {
    components:{
      noAddress,
      addAddress
    },
    data(){
      return {
        adsContol: 'addAddress',
        data:[],//用户地址信息列表
      }
    },
    created(){
      this.getMsg()
    },
    methods:{
      getMsg(){
        this.$axios.post('/user/address?version=v2').then(res=>{
          if(res.data.code===1){
            this.data = res.data.data.list
            if(this.data.length>0){
              this.adsContol = 'addAddress'
            }else{
              this.adsContol = 'noAddress'
            }
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/reset.scss";
  .address{
    @include appcontent;
    color: #898989;
    padding-bottom: 0;
    &-add{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100*$r;
      background-color: #fb762a;
      color: #ffffff;
      text-align: center;
      line-height: 100*$r;
      font-size: 30*$r;
    }
  }
</style>
