<template>
<div class="identify-con">
  <div class="identify">
    <div class="identify-top">
      <p v-for="(item,index) in tabList" :key="index" :class="active==index?'active':''" @click="tabChange(index)">{{item.name}}</p>
    </div>
    <div class="new" v-if="active == 0">
      <img src="../../assets/img/iden3.png"/>
      <div class="new-gif">
        <div>
          <img src="../../assets/img/iden4.gif" style="width:88%;"/>
          <img class="img img1" src="../../assets/img/iden6.png"/>
        </div>
        <div>
          <img src="../../assets/img/iden5.gif" style="width:88%;"/>
          <img class="img img2" src="../../assets/img/iden7.png"/>
          <img class="img img3" src="../../assets/img/iden13.png"/>
        </div>
      </div>
      <img src="../../assets/img/iden8.png"/>
      <div class="new-gif" style="padding-bottom: .8rem;">
        <div>
          <img src="../../assets/img/iden9.png" style="width: 83%;"/>
        </div>
        <div style="padding-top: .5rem;" v-clipboard:copy="url" v-clipboard:success="onCopy" v-clipboard:error="onError">
          <img class="A-g" src="../../assets/img/iden10.gif"/>
          <img class="A-qq" src="../../assets/img/iden11.png"/>
        </div>
      </div>
    </div>
    <div class="new" v-if="active == 1">
      <img src="../../assets/img/iden1.png"/>
      <p @click="toHome()" class="btn">立即领取</p>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      tabList: [
        {name: '真假平台对比'},
        {name: '新手指南'}
      ],
      active: 0,
      url: '3073810793'
    }
  },
  methods: {
    tabChange(index) {
      this.active = index
    },
    toHome() {
      this.navigateTo('type')
    },
    onCopy: function (e) {
        this.$vux.toast.text("复制成功");
    },
    onError: function (e) {
        this.$vux.toast.text("复制失败");
    }
  }
}
</script>
<style lang="less" scoped>
.identify-con{
  background: url('../../assets/img/iden2.png') #1b3dd1 no-repeat;
  background-size: 100%;
  padding: 4.5rem 0 1rem;
}
.identify{
  width: 90%;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 10px 10px 5px 5px;
  &-top{
    display: flex;
    p{
      width: 50%;
      text-align: center;
      font-size: 0.45rem;
      background: #f3f3f3;
      height: 1.3rem;
      line-height: 1.3rem;
      letter-spacing: 1px;
      color: #999999;
    }
    p:first-of-type{
      border-radius: 10px 0 0 0;
    }
    p:last-of-type{
      border-radius: 0 10px 0 0;
    }
    .active{
      background: #ffffff;
      color: #0066cc;
    }
  }
  .new{
    img{
      width: 100%;
    }
    &-gif{
      display: flex;
      align-items: top;
      padding: 0 .45rem;
      div{
        width: 50%;
        position: relative;
        text-align: center;
        img{
          width: 100%;
        }
        .img{
          position: absolute;
          width: .85rem;
        }
        .img1{
          top: 0;
          right: .5rem;
        }
        .img2{
          top: 0;
          left: .5rem;
        }
        .img3{
          bottom: 0;
          right: 0;
          width: .7rem;
        }
        .A-g{
          width: 1.2rem;
        }
        .A-qq{
          margin-left: .2rem;
        }
      }
    }
    .btn{
      position: fixed;
      bottom: 0;
      left: 0;
      background: #fff7e3;
      color: #3b5cee;
      height: 1.3rem;
      font-size: 0.5rem;
      letter-spacing: 1px;
      text-align: center;
      width: 100%;
      line-height: 1.3rem;
    }
  }
}
</style>


