<template>
  <div id="agreement">
    <div class="content">
      <p v-html="data.title" class="title"></p>
      <div v-html="data.content"></div>
    </div>
  </div>
</template>
<script>
  export default{
    name:"agreement",
    data(){
      return{
        data:""
      }
    },
    beforeRouteEnter(to,from,next){
      let id = sessionStorage.getItem('paraRid')
      if(id==2){
        to.meta.title='服务协议';
      } else if(id==3){
        to.meta.title='隐私协议';
      }else if(id==4){
        to.meta.title='关于我们';
      }
      next()
    },
    created:function(){
      this.getData();
    },
    methods:{
      getData:function(){
        var that = this;
        this.$axios.post('/site/setcontent?version=v2',{id:this.$route.query.id}).then(function (response) {
          if(response.data.code==1){
            that.data = response.data.data;
          }else{
            that.$vux.toast.text(response.data.msg);
          }
        })
      }
    }
  }
</script>
<style>
  #agreement{background:#fff;min-height:100%;}
  #agreement .content{padding:15px;background:#fff;}
  #agreement .content .title{text-align:center;font-size:18px;}
</style>
