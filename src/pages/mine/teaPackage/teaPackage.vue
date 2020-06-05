<template>
  <div class="teaPackage">
    <div class="teaPackage-tab" v-if="this.$appid !='yytj'">
      <div :class="componentValue==item.value?'teaPackage-tab-active':''" v-for="item in tab" @click="changeTab(item.value)">{{item.name}}</div>
    </div>
    <div class="tab-fixed"  v-if="this.$appid !='yytj'"></div>
    <transition name="component-fade" mode="out-in">
        <component :is="componentValue"></component>
    </transition>
  </div>
</template>

<script>
  import tea from '@/components/mine/teaPackage/tea'
  import game from '@/components/mine/teaPackage/game'
  export default {
    components:{
      tea,
      game
    },
    data(){
      return{
        tran:'slide-right',
        componentValue:'tea',
        tab:[
          {
            name:'茶叶记录',
            value:'tea',
          },
          {
            name:'游戏礼包',
            value:'game',
          }
        ],
      }
    },
    created(){
    },
    methods:{
      changeTab(val){//标签切换
        this.componentValue = val
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/reset.scss";
  .teaPackage{
    @include appcontent;
    padding-bottom: 0;
    .tab-fixed{
      width: 100%;
      height: 91*$r;
    }
    &-tab{
      @include tabFixed;
      height: 81*$r;
      background-color: #ffffff;
      margin-bottom: 10*$r;
      padding: 0 23*$r;
      @include flex-space;
      div{
        width: 48%;
        height: inherit;
        line-height: 81*$r;
        text-align: center;
        color: #4a4a4a;
      }
      &-active{
        border-bottom: solid 2px #fb762a;
        color: #fb762a!important;
      }
    }
  }
</style>
