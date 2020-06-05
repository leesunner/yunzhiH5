<template>
  <div class="rechargList">
    <div class="rechargList-item">
      <div :class="itemIndex===index?'active':''" v-for="(item,index) in data" @click="getActive(index)" :key="index">{{item}}</div>
    </div>
    <div class="rechargList-my">
      <span>我的积分:</span>
      <span style="color: #fb762a">{{coin}}</span>
    </div>
    <div class="rechargList-con">
      <transition name="component-fade" mode="out-in">
         <component :is="val" @getCoin="getCoin"></component>
      </transition>
    </div>
  </div>
</template>

<script>
  import gamePeck from '@/components/mine/rechargList/gamePeck'
  import teaPeck from '@/components/mine/rechargList/teaPeck'
  export default {
    name: "recharg-list",
    components:{
      gamePeck,
      teaPeck
    },
    data(){
      return{
        val:'gamePeck',
        itemIndex:0,
        data:['游戏礼包','购买茶叶'],
        coin:0,
      }
    },
    created(){
      if(this.$route.query.typeName){
        if(this.$route.query.typeName=='gamePeck'){
          this.getActive(0)
        }else{
          this.getActive(1)
        }
      }
    },
    methods:{
      getCoin(val){
        this.coin = val
      },
      getActive(index){
        this.itemIndex = index
        index===0?this.val ='gamePeck':this.val='teaPeck';
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/reset.scss";
.rechargList{
  @include appcontent;
  padding-bottom: 0;
  &-item{
    width: 360*$r;
    height: 64*$r;
    background-color: #ffffff;
    border-radius: 10*$r;
    border: solid 2px #fb762a;
    @include flex-space;
    font-size: 28*$r;
    margin: 0 auto;
    margin-top: 28*$r;
    margin-bottom: 21*$r;
    overflow: hidden;
    div{
      width: 50%;
      color: #fb762a;
      height: inherit;
      line-height: 64*$r;
      text-align: center;
    }
  }
  &-my{
    padding-left: 30*$r;
    margin-bottom: 15*$r;
  }
  .active{
    background-color: #fb762a;
    color: #ffffff;
  }
  &-con{
    background-color: #ffffff;
  }
}
</style>
