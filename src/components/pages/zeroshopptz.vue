<template>
    <div class="zeroShopp">
        <div class="btn" @click="download()"></div>
    </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  created() {
    document.title="零钱商城";
  },
  mounted () {

  },
 methods: {
    download() {
      this.$router.push({
        name:"zeroshopptz"
      })
    }

 }
}
</script>
<style lang="scss" scoped>
@import "../../assets/css/reset";
.zeroShopp{
  width: 100%;
  height: 100%;
  background: url("../../assets/images/zeroshopptz.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
  .btn{
    position: absolute;
    width:300*$r;
    height: 83*$r;
    left: 0;
    right: 0;
    top:67.5%;
    margin: auto;

  }
}
</style>



