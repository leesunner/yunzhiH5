<template>
  <div class="newUser" @touchmove.prevent v-if="close">
    <img class="newUser-close" src="../../assets/img/yjcha.png" @click="closeView"/>
    <div class="newUser-zc"></div>
    <div class="newUser-hb" @click="navigateTo('userRegister')">
      <img class="newUser-hb-btn" src="../../assets/img/msl.png"/>
    </div>
  </div>
</template>

<script>
  import {mapMutations,mapGetters} from 'vuex'
    export default {
        name: "new-user-hb",
        data(){
          return{
            close:true,
          }
        },
      methods:{
        ...mapMutations([
          'setRedmControl'
        ]),
          closeView(){
            this.close=!this.close
            this.setRedmControl(false)
          },
      }
    }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/reset.scss";
  .newUser{
    @include posit-top;
    overflow: auto;
    &-close{
      width: 46*$r;
      height: 46*$r;
      position: absolute;
      top:150*$r;
      right: 80*$r;
      z-index: 100000;
    }
    &-zc{
      width: 100%;
      height: 100%;
      background-color: #3a3a3a;
      opacity: 0.60;
    }
    &-hb{
      position: absolute;
      top:300*$r;
      left: 0;
      right: 0;
      background: url("../../assets/img/hbr.png") no-repeat;
      background-size: 100% 100%;
      width: 536*$r;
      height: 654*$r;
      margin: 0 auto;
      &-btn{
        display: block;
        width: 300*$r;
        height: 60*$r;
        margin: 500*$r auto;
      }
    }
  }
</style>
