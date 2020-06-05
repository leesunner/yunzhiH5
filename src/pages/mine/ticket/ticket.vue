<template>
  <div class="ticket">
    <div class="ticket-tab">
      <div :class="componentValue==item.value?'ticket-tab-active':''" v-for="(item,index) in tab" @click="changeTab(item.value)" :key="index">{{item.name}}
        <span v-if="num>0&&item.value=='ticketNum'">{{num}}个</span>
      </div>
    </div>
    <div class="tab-fixed"></div>
    <transition name="component-fade" mode="out-in">
      <component :is="componentValue"></component>
    </transition>
  </div>
</template>

<script>
  import ticketNum from '@/components/mine/ticket/ticketNum'
  import ticketUseless from '@/components/mine/ticket/ticketUseless'
  export default {
    name: "ticket",
    components:{
      ticketNum,
      ticketUseless
    },
    data(){
      return{
        componentValue:'ticketNum',
        num:'',
        tab:[
          {
            name:'积分券',
            value:'ticketNum'
          },
          {
            name:'已使用/已过期',
            value:'ticketUseless'
          }
        ],
      }
    },
    created(){
      this.num = this.$route.query.nums
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
  .ticket{
    @include appcontent;
    padding-bottom: 0;
    overflow: hidden;
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
      justify-content: center;
      div{
        height: inherit;
        line-height: 81*$r;
        text-align: center;
        color: #4a4a4a;
      }
      div:nth-child(1){
        margin-right: 204*$r;
      }
      &-active{
        border-bottom: solid 2px #fb762a;
        color: #fb762a!important;
      }
    }
    }
</style>
