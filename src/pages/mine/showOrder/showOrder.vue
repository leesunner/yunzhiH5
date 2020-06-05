<template>
  <div class="showTalk">
    <div class="showTalk-tab">
      <div :class="componentValue==item.value?'showTalk-tab-active':''" v-for="item in tab" @click="changeTab(item.value)">{{item.name}}</div>
    </div>
    <div class="tab-fixed"></div>
    <transition name="component-fade" mode="out-in">
        <component :is="componentValue"></component>
    </transition>
  </div>
</template>

<script>
  import showed from '@/components/mine/showOrder/showed'
  import show from '@/components/mine/showOrder/show'
  export default {
    components:{
      showed,
      show
    },
    data(){
      return{
        componentValue:'showed',
        tab:[
          {
            name:'已晒单',
            value:'showed'
          },
          {
            name:'未晒单',
            value:'show'
          }
        ],
      }
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
  .showTalk{
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
