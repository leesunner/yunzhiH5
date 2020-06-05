<template>
    <div class="green">
        <header>
            <img src="../../assets/images/greentop.png" alt="">
        </header>
        <div class="content">
          <img src="../../assets/images/greenflow.png" alt="">
          <div class="content-btn" @click="shopp()">立即参与</div>
        </div>
        <!-- <div class="white"></div> -->
        <ul class="box">
          <!-- <router-link  to="peoplezx"  active-class="active" exact>
            <img src="../assets/images/greenIcon1.png" alt="" >
            <p>新人专享</p>
          </router-link>
          <router-link  to="xsinvteli" active-class="active" exact @click="go()">
            <img src="../assets/images/greenIcon2.png" alt="" >
            <p>邀请有礼</p>
          </router-link> -->
          <a href="javascript:void(0)" @click="go('peoplezx','one')" :class="{bar:one =='one'}">
            <img src="../../assets/images/greenIcon1.png" alt="" >
            <p>新人专享</p>
          </a>
          <a href="javascript:void(0)" @click="go('xsinvteli','two')" :class="{bar:one =='two'}">
            <img src="../../assets/images/greenIcon2.png" alt=""  >
            <p>邀请有礼</p>
          </a>
          <a href="javascript:void(0)">敬请期待</a>
        </ul>
         <div class="box-bottom"></div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
  data () {
    return {
      one:"one",

    }
  },
  created() {
    document.title="新人福利";
  },
  mounted() {
    let that = this
    this.pushHistory();
        window.onpopstate = () => {//监听返回事件
      // this.$router.push({
      //   name:"commis"
      // })  //输入要返回的上一级路由地址
      //     that.JsBridge.callHandler("toHome", function (responseData) {});
    }

    },
  methods:{
    shopp(){
     // this.JsBridge.callHandler("rechargeCount", function (responseData) {
     //            });
      this.navigateTo('type')
    },
    go(url,m){
       this.$router.push({name:url})
       this.one=m;
        //  window.scrollTo(0,0);
      //  this.$refs.one.style.background="#fff";
    } ,
    pushHistory(){
  let state = {
    title: '',
    url: ''
  }
  window.history.pushState(state, state.title, state.url)
}
  },

}
</script>
<style lang="scss" scoped>
@import "../../assets/css/reset";
.green{
  width: 100%;
  background-color: #6b3ae8;
  header{
    img{
      width: 100%;
    }
    // height: getREM(420);
  }
  .content{
    width: 711*$r;
    height: 341*$r;
    margin: auto;
    border-radius: 11*$r;
    background-color: #fff;
    overflow: hidden;
     transform: translate(0,-71*$r);
     img{
    width: 660*$r;
    margin: auto;
    margin-top:33*$r;
    display: block;
  }
  .content-btn{
    width: 243*$r;
    height: 66*$r;
    background-color: #fa7822;
    text-align: center;
    line-height: 66*$r;
    border-radius: 33*$r;
    color: #fff;
    font-size: 25*$r;
    margin:  37*$r auto;
  }
  }
  // .white{
  //   height: 67*$r;
  // }
  .bar{
    background-color: #fff;
      color: #000 !important;
      border-radius: 6*$r;
  }
  .box{
     height: 98*$r;
    a{
      float: left;
      width: 33%;
      height: 112*$r;
      display: table-cell;
      vertical-align: middle;
      text-align: center;
      font-size: 16*$r;
      color: #fff;
     text-decoration: none;
       transform: translate(0,1*$r);
      img{
        width: 66*$r;
      }
    }
    a:nth-of-type(3){
      line-height: 98*$r;
    }
    .active{
      background-color: #fff;
      color: #000;
      border-radius: 6*$r;

    }

  }.box-bottom{
      bottom: 0;
      height: 30*$r;

      background-color: #fff;
    }

}

</style>

