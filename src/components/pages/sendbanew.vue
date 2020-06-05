<template>
  <div style="height: 100vh;" id="iframe-box">
    <iframe src="https://www.baidu.com/" width="100%" height="100%" id="ifram"></iframe>
  </div>
</template>
<script>
export default {
  data() {
    return {
      src: ''
    }
  },
  created() {
    this.src = this.$route.params.href;
    alert(this.src)
  }
}
</script>
<style>
</style>
