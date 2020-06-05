<template>
  <div>
    <bullte :title="title" :num="data.realname" url="certInfo"></bullte>
    <bullte :title="title1" :num="data.idcard" url="certInfo"></bullte>
  </div>
</template>

<script>
  import bullte from '@/components/public/bullet'
  export default {
    name: "cert-info",
    components:{
      bullte
    },
    props:['data'],
    data(){
      return{
        title:'真实姓名',
        title1:'身份证号',
      }
    }
  }
</script>

<style scoped>

</style>
