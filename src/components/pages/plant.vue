<template>
  <div class="plant">
    <img src="../../assets/img/plant1.png"/>
    <div class="download">
      <div class="download-left">
        <div>
          <img src="../../assets/img/plant4.png"/>
          <p>人人商城</p>
        </div>
        <div v-clipboard:copy="yyyg" v-clipboard:success="onCopy" v-clipboard:error="onError">
          <img class="btn" src="../../assets/img/plant2.png"/>
          <p>打开浏览器下载</p>
        </div>
      </div>
      <div class="download-left">
        <div>
          <img src="../../assets/img/plant3.png"/>
          <p>零钱兑宝</p>
        </div>
        <div v-clipboard:copy="lqdb" v-clipboard:success="onCopy" v-clipboard:error="onError">
          <img class="btn" src="../../assets/img/plant2.png"/>
          <p>打开浏览器下载</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      yyyg: 'http://t.cn/EJiGc4b',
      lqdb: 'http://t.cn/EtaM8GF'
    }
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
<style lang="less" scoped>
.plant{
  // position: relative;
  background: #01379d;
  img{
    width: 100%;
  }
  .download{
    position: absolute;
    bottom: 0.7rem;
    width: 100%;
    display: flex;
    align-items: center;
    img{
      width: 1.2rem;
    }
    .btn{
      width: 1.5rem;
    }
    .download-left{
      width: 50%;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      position: relative;
      div{
        text-align: center;
      }
      div:first-of-type{
        p{
          color: #ffffff;
          font-size: 0.4rem;
        }
      }
      div:last-of-type{
        margin-left: 10px;
        p{
          color: #fffc00;
          font-size: 0.3rem;
        }
      }
    }
    .download-left:first-of-type:after {
      content: '';
      width: 2px;
      height: 60%;
      background: rgba(255,255,255,0.4);
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
</style>


