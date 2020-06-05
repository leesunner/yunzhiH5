<template>
  <div class="guan-kefu">
    <div class="top">
      <img src="../../assets/img/ke01.png"/>
      <img class="btn btn1" src="../../assets/img/ke03.png" v-clipboard:copy="3073810793" v-clipboard:success="onCopy" v-clipboard:error="onError"/>
      <img class="btn btn2" src="../../assets/img/ke04.png" v-clipboard:copy="10994450" v-clipboard:success="onCopy" v-clipboard:error="onError"/>
    </div>
    <!--<div class="middle">-->
      <!--<p>聊天吐槽请<span>下载potato</span> （国外聊天软件）</p>-->
      <!--<p>下载地址：<span>https://pt.im/lq666666</span> <i v-clipboard:copy="link" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</i></p>-->
      <!--<p>下载成功后搜索<span>@lq666666</span><i v-clipboard:copy="url" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</i></p>-->
    <!--</div>-->
    <!--<img src="../../assets/img/ke02.png"/>-->
  </div>
</template>
<script>
export default {
  data() {
    return {
      link: 'https://pt.im/lq666666',
      url: '@lq666666'
    }
  },
  methods:{
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
.guan-kefu{
  background: #ffffff;
  img{
    width: 100%;
  }
  .top{
    position: relative;
    .btn{
      position: absolute;
      width: 2.5rem;
      right: 1rem;
    }
    .btn1{
      top: 8.2rem;
    }
    .btn2{
      top: 9.85rem;
    }
  }
  .middle{
    background: #ffffff;
    width: 90%;
    margin: 0 auto;
    p{
      height: 0.8rem;
      line-height: 0.8rem;
      font-size: 0.4rem;
      span{
        color: #3281f7;
      }
      i{
        font-style: normal;
        float: right;
        color: #2269e5;
        text-decoration: underline;
      }
    }
  }
}
</style>


