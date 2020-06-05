<template>
  <div>
    <p style="background: #f2f2f2;text-align: center;padding: 5px 0;">只显示30天内的数据</p>
    <his-show-item v-for="(item,index) in list" :key="index" :data="item" :timeNow="timeNow" :index="index" :userid="userid"></his-show-item>
  </div>
</template>

<script>
  import hisShowItem from '../../components/public/hisUserInfo/hisShowItem'
  export default {
    name: "show-record",
    components:{hisShowItem},
    props:['list','timeNow','index', 'userid']
  }
</script>

<style scoped>

</style>
