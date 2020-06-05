<template>
  <div class="myBuyRecord">
    <div class="myBuyRecord-tab">
      <div :class="componentValue==item.value?'myBuyRecord-tab-active':''" v-for="item in tab" @click="changeTab(item.value)">{{item.name}}</div>
    </div>
    <div class="tab-fixed"></div>
    <transition name="component-fade" mode="out-in">
      <component :is="componentValue"></component>
    </transition>
  </div>
</template>

<script>
  import All from '@/components/mine/luckyRecord/all'
  import WaiteReceiving from '@/components/mine/luckyRecord/waiteReceiving'//待收货
  import WaitePull from '@/components/mine/luckyRecord/waitePull'//待领取
  export default {
    components:{
      All,
      WaiteReceiving,
      WaitePull
    },
    data(){
      return{
        componentValue:'All',
        tab:[
          {
            name:'全部',
            value:'All'
          },
          {
            name:'待收货',
            value:'WaiteReceiving'
          },
          {
            name:'待领取',
            value:'WaitePull'
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
  .myBuyRecord{
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
