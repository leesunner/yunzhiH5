<template>
  <div class="messageDetail">
    <div class="messageDetail">
      <div class="messageDetail-content">
        <div class="messageDetail-title">
          {{content.title}}
        </div>
        <p>{{content.ctime}}</p>
        <div class="messageDetail-context">
          {{content.content}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        data(){
          return{
            content:'',
            id:''
          }
        },
      methods:{
        getMsgDetail(){
          let that = this
          this.$axios.get('notice/view?version=v2&id='+that.id).then(res=>{
            if(res.data.code==1){
              that.content = res.data.data
            }
          })
        }
      },
      created(){
         this.id = this.$route.query.id
         this.getMsgDetail()
      }
    }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/reset.scss";
.messageDetail{
  @include appcontent;
  padding-bottom: 0;
  &-content{
    padding: 0 65*$r 0 65*$r;
    p{
      text-align: center;
      color: #898989;
      margin-bottom: 37*$r;
    }
  }
  &-title{
    padding: 60*$r 0 13*$r 0;
    color: #ff7041;
    font-size: 14px;
    text-align: center;
  }
  &-context{
    color: #333333;
  }
}
</style>
