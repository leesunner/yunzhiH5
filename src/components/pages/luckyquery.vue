<template>
  <div style="height: 100vh;">
    <iframe src="https://sports.sina.com.cn/l/kaijiang/detail.shtml?game=301" width="100%" height="100%"></iframe>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: ''
    }
  },
  created() {
    this.id = this.$route.params.id;
    sessionStorage.setItem('xyluckyId', this.id)
  }
}
</script>
<style>
</style>
