<template>
  <div>
    <p style="background: #f2f2f2;text-align: center;padding: 5px 0;">只显示30天内的数据</p>
    <his-good-item v-for="(item,index) in list" :key="index" :data="item" :userid="userid"
    :timeNow="timeNow" :index="index" @pullData="pullData"></his-good-item>
  </div>
</template>

<script>
  import hisGoodItem from '../../components/public/hisUserInfo/hisGoodItem'
  export default {
    name: "join-record",
    components:{hisGoodItem},
    props:['list','timeNow', 'index','userid'],
    methods: {
      pullData() {
        this.$emit('getIoin')
      }
    }
  }
</script>

<style scoped>

</style>
