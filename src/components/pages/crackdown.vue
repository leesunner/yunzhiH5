<template>
    <div class="letter">
      <!-- lqlg -->
      <swiper :auto="true" :show-dots="false" :interval="4000" :duration="700" height="100%" v-if="$appid == 'lqlg'">
        <swiper-item v-for="(item, index) in lqlg" :key="index">
          <img :src="item.img" v-if="index < 4">
          <div class="bg" v-else>
            <div class="bg-con" v-clipboard:copy="url" v-clipboard:success="onCopy" v-clipboard:error="onError">
            </div>
          </div>
        </swiper-item>
      </swiper>
      <!-- lqdb -->
      <swiper :auto="true" :show-dots="false" :interval="4000" :duration="700" height="100%"  v-if="$appid == 'lqdb'">
        <swiper-item v-for="(item, index) in lqdb" :key="index">
          <img :src="item.img"  v-if="index < 4"/>
          <div class="bg bg1" v-else>
            <div class="bg-con" v-clipboard:copy="url" v-clipboard:success="onCopy" v-clipboard:error="onError">
            </div>
          </div>
        </swiper-item>
      </swiper>
      <!-- yyyg -->
      <swiper :auto="true" :show-dots="false" :interval="5000" :duration="700" height="100%"  v-if="$appid == 'yyyg'">
        <swiper-item v-for="(item, index) in yyyg" :key="index">
          <img :src="item.img" v-if="index < 4"/>
          <div class="bg bg2" v-else>
            <div class="bg-con" v-clipboard:copy="url" v-clipboard:success="onCopy" v-clipboard:error="onError">
            </div>
          </div>
        </swiper-item>
      </swiper>
      <!-- kdlg -->
      <swiper :auto="true" :show-dots="false" :interval="5000" :duration="700" height="100%"  v-if="$appid == 'kdlg'">
        <swiper-item v-for="(item, index) in kdlg" :key="index">
          <img :src="item.img" v-if="index < 4"/>
          <div class="bg bg3" v-else>
            <div class="bg-con" v-clipboard:copy="url" v-clipboard:success="onCopy" v-clipboard:error="onError">
            </div>
          </div>
        </swiper-item>
      </swiper>
      <!-- yytj -->
      <swiper :auto="true" :show-dots="false" :interval="5000" :duration="700" height="100%"  v-if="$appid == 'yytj'">
        <swiper-item v-for="(item, index) in yytj" :key="index">
          <img :src="item.img" v-if="index < 4"/>
          <div class="bg yytj" v-else>
            <div class="bg-con" v-clipboard:copy="url" v-clipboard:success="onCopy" v-clipboard:error="onError">
            </div>
          </div>
        </swiper-item>
      </swiper>
      <!-- ymlg -->
      <swiper :auto="true" :show-dots="false" :interval="5000" :duration="700" height="100%"  v-if="$appid == 'ymlg'">
        <swiper-item v-for="(item, index) in ymlg" :key="index">
          <img :src="item.img" v-if="index < 4"/>
          <div class="bg ymlg" v-else>
            <div class="bg-con" v-clipboard:copy="url" v-clipboard:success="onCopy" v-clipboard:error="onError">
            </div>
          </div>
        </swiper-item>
      </swiper>
    </div>
</template>
<script>
import { Swiper,SwiperItem } from 'vux'
export default {
  components: {
    Swiper,
    SwiperItem
  },
  data () {
    return {
      lqlg: [
        {
          img: require('@/assets/img/lg1.png')
        },
        {
          img: require('@/assets/img/lg2.png')
        },
        {
          img: require('@/assets/img/lg3.png')
        },
        {
          img: require('@/assets/img/lg4.png')
        },
        {}
      ],
      lqdb: [
        {
          img: require('@/assets/img/db1.png')
        },
        {
          img: require('@/assets/img/db2.png')
        },
        {
          img: require('@/assets/img/db3.png')
        },
        {
          img: require('@/assets/img/db4.png')
        },
        {}
      ],
      yyyg: [
        {
          img: require('@/assets/img/yg1.png')
        },
        {
          img: require('@/assets/img/yg2.png')
        },
        {
          img: require('@/assets/img/yg3.png')
        },
        {
          img: require('@/assets/img/yg4.png')
        },
        {}
      ],
      kdlg: [
        {
          img: require('@/assets/img/kd1.png')
        },
        {
          img: require('@/assets/img/kd2.png')
        },
        {
          img: require('@/assets/img/kd3.png')
        },
        {
          img: require('@/assets/img/kd4.jpg')
        },
        {}
      ],
      yytj: [
        {
          img: require('@/assets/img/yytj1.png')
        },
        {
          img: require('@/assets/img/yytj2.png')
        },
        {
          img: require('@/assets/img/yytj3.png')
        },
        {
          img: require('@/assets/img/yytj4.png')
        },
        {}
      ],
      ymlg: [
        {
          img: require('@/assets/img/ym1.png')
        },
        {
          img: require('@/assets/img/ym2.png')
        },
        {
          img: require('@/assets/img/ym3.png')
        },
        {
          img: require('@/assets/img/ym4.png')
        },
        {}
      ],
      url: '3073810793'
    }
  },
  created() {
    document.title="打假声明"
  },
  methods: {
    onCopy: function (e) {
        this.$vux.toast.text("复制成功");
    },
    onError: function (e) {
        this.$vux.toast.text("复制失败");
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/css/reset";
  .letter{
    @include appcontent;
    padding-bottom: 0;
    img{
      width: 100%;
      height: 100%;
    }
    .vux-slider{
      height: 100%;
      background: #c9403b;
    }
    .bg{
      width: 100%;
      height: 100%;
      background: url('../../assets/img/lg5.png') no-repeat;
      background-size: 100% 100%;
      position: relative;
      &-con{
        position: absolute;
        bottom: 22%;
        height: 120*$r;
        left:0;
        right:0;
        margin:0 auto;
        width: 82%;
        img{
          width: 3.5rem;
        }
        div{
          display: flex;
          font-size: getREM(30);
          margin-top: .3rem;
          p{
            background: #fdf2cd;
            width: 4.5rem;
            padding: 0 8px;
            height: 1rem;
            line-height: 1rem;
            box-sizing: border-box;
            border-radius: 5px;
            color: #c9403b;
            box-shadow: 0 8px 5px -5px #ccc;
          }
          .copy{
            margin-left: .8rem;
            width: 1.5rem;
            height: 1rem;
            line-height: 1rem;
            text-align: center;
            background: #fcdb9a;
            color: #c9403b;
            border-radius: 5px;
            box-shadow: 0 8px 5px -5px #ccc;
          }
        }
      }
    }
    .bg1{
      background: url('../../assets/img/db5.png') no-repeat;
      background-size: 100% 100%;
    }
    .bg2{
      background: url('../../assets/img/yg5.png') no-repeat;
      background-size: 100% 100%;
    }
    .bg3{
      background: url('../../assets/img/kd5.png') no-repeat;
      background-size: 100% 100%;
    }
    .yytj{
      background: url('../../assets/img/yytj5.png') no-repeat;
      background-size: 100% 100%;
    }
    .ymlg{
      background: url('../../assets/img/ym5.png') no-repeat;
      background-size: 100% 100%;
    }
  }
</style>

