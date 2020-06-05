<template>
  <div class="pople">
      <img src="../../assets/images/grennnew.png" alt="" class="pople-top">
      <router-link v-for="(item,index) in linkList"  :to="item.name" :key="index" class="pople-item">
          <img :src="item.img" alt="" >
      </router-link>
  </div>
</template>
<script>
export default {
  data () {
    return {
      linkList:[
        {name:"lucky-click",img: require('../../assets/images/greenbg1.png')},
        {name:"sevensign",img: require('../../assets/images/greenbg2.png')},
        {name:"hongbao",img: require('../../assets/images/greenbg3.png')},
        {name:"luckyvip",img: require('../../assets/images/greenbg4.png')},
      ],
    }
  },
   created() {
    this.$router.push({name:'peoplezx'});
  },
  mounted() {
    //     this.pushHistory();
    //     window.onpopstate = () => {
    //   this.$router.push({
    //     name:"commis"
    //   })  //输入要返回的上一级路由地址
    // }
  },
  methods: {
//   pushHistory(){
//   let state = {
//     title: '',
//     url: ''
//   }
//   window.history.pushState(state, state.title, state.url)
// }
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/css/reset";

.pople{
  background-color: #e2efff !important;
  padding-top:38*$r;
  .pople-top{
     width: 438*$r;
     margin:auto;
     display: block;
  padding-bottom:38*$r;
  }
  .pople-item{
    img{
      width: 724*$r;
      height: 274*$r;
      margin: auto;
      display: block;
    }
  }
}

</style>
