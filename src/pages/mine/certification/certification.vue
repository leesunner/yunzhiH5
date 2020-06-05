<template>
  <div>
    <transition name="component-fade" mode="out-in">
      <component @changeName="getResult" :is="isComponent" :data="data"></component>
    </transition>
  </div>
</template>

<script>
  import certInput from '@/components/mine/certification/certification'//提交界面
  import certSubmit from '@/components/mine/certification/certSubmit'//提交成功界面
  import certInfo from '@/components/mine/certification/certInfo'//实名信息界面
  import certFail from '@/components/mine/certification/certFail'//审核失败界面
  export default {
    name: "certification",
    components:{
      certInput,
      certSubmit,
      certInfo,
      certFail
    },
    data(){
      return{
        isComponent:'',
        data:{},
      }
    },
    created(){
      this.getMsg()
    },
    methods:{
      getMsg(){//获取是否实名接口
        this.$axios.post('user/getAuthInfo?version=v2',{}).then(res=>{
          if(res.data.code===1){
            if(res.data.data){
              this.data = res.data.data
              this.isComponent='certInfo'
            }else{
              this.isComponent = 'certInput'
            }
          }else{
            this.$vux.toast.text(res.data.msg)
          }
        })
      },
      getResult(val){
        this.isComponent = val
      }
    }
  }
</script>

<style scoped>
</style>
