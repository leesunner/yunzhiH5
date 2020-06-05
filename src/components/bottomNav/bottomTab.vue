<template>
  <div class="navTab">
    <ul>
      <li v-for="(item,index) in nav" @click="goPage(item.url,index)">
        <img :src="item.url==$route.name?item.activeIcon:item.icon" :class="{'dy':item.url==$route.name}"/>
        <p :class="{'color':item.url==$route.name}">{{item.name}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "bottom-tab",
        data(){
          return{
            nav:[
              {
                name:'首页',
                url:'homeIndex',
                index:0,
                icon:require('@/assets/img/home1.png'),
                activeIcon:require('@/assets/img/home2.png')
              },
              {
                name:'分类',
                url:'type',
                index:1,
                icon:require('@/assets/img/lei1.png'),
                activeIcon:require('@/assets/img/lei2.png')
              },
              {
                name:'已兑商品',
                url:'exChanged',
                index:2,
                icon:require('@/assets/img/dui1.png'),
                activeIcon:require('@/assets/img/dui2.png')
              },
              {
                name:'发现',
                url:'find',
                index:3,
                icon:require('@/assets/img/find1.png'),
                activeIcon:require('@/assets/img/find2.png')
              },
              {
                name:'我的',
                url:'mine',
                index:4,
                icon:require('@/assets/img/mine1.png'),
                activeIcon:require('@/assets/img/mine2.png')
              }
            ],
            choosen:0,
          }
        },
      methods:{
        goPage(url,index){//tab切换页面
          this.choosen = index
          this.$router.push({
            name:url
          })
        },
      }
    }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/reset.scss";
  .navTab{
    width: 100%;
    height: 98*$r;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 200;
    border-top: solid 1px #ececec;
    background-color: #ffffff;
    ul{
      @include flex-space;
      li{
        width: 25%;
        text-align: center;
        height: 98*$r;
        p{
          font-family: 'PingFang SC';
          color:#7b7b7b;
          line-height: 0;
          margin-top: 10*$r;
        }
        img{
          width: 44*$r;
          height: 44*$r;
          margin-top: 10*$r;
        }
        .dy{
          animation: big 0.15s ease-in-out;
        }
        @keyframes big {
          0%{
            transform: scale3d(1.3,1.3,1.3);
          }
          100%{
            transform: scale3d(1,1,1);
          }
        }
      }
    }
    .color{
      color: #ed6c26;
    }
  }
</style>
