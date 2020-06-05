<template>
    <div class="helpContent">
      <div v-html="content" class="content"></div>
    </div>
</template>

<script>
    export default {
        name: "help-content",
      data(){
          return{
            content:'',
          }
      },
      created(){
        this.getMsg(this.$route.query.help_id)
      },
      methods:{
          getMsg(val){
            //根据传递的type显示响应的解释内容
            this.$axios.post('/site/help?version=v2',{id:val}).then(res=>{
              this.content = res.data.data.content
            })
          }
      }
    }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/reset.scss";
.helpContent{
 @include flex-space;
  padding-bottom: 0;
  .content{
    padding: 20*$r 30*$r;
  }
}
</style>
