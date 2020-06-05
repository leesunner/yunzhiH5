<template>
  <div>
    <p style="background: #f2f2f2;text-align: center;padding: 5px 0;">只显示30天内的数据</p>
    <his-good-item v-for="(item,index) in list" :key="index" :data="item" :timeNow="timeNow" :index="index" :userid="userid"></his-good-item>
  </div>
</template>

<script>
  import hisGoodItem from '../../components/public/hisUserInfo/hisGoodItem'
  export default {
    name: "gift-record",
    components:{hisGoodItem},
    props:['list','timeNow','index','userid']
  }
</script>

<style scoped>

</style>
