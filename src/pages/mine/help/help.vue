<template>
  <div class="help">
    <bullet class="mine-cl"  v-for="(item,index) in data" :key="index" :para="item" :url="item.link" :title="item.title"></bullet>
  </div>
</template>

<script>
  import bullet from '@/components/public/bullet'
  export default {
    name: "help",
    components:{
      bullet
    },
    data(){
      return{
        data:[]
      }
    },
    created(){
      this.getList()
    },
    methods:{
      getList(){
        this.$axios.post('/site/help?version=v2').then(res=>{
            res.data.data.list.forEach(function (item) {
              item.link = 'helpContent'
            })
          this.data = res.data.data.list
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/reset.scss";
  .help{
      @include flex-align;
      padding-bottom: 0;

  }
</style>
