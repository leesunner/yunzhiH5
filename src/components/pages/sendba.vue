<template>
  <div class="sendba">
    <div class="btn" @click="alert">立即寄售</div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        appVersion: ''
      }
    },
    created() {
      document.title="寄售宝正式入驻"
      this.appVersion = sessionStorage.getItem('appVersion')
      // this.$axios.get('/site/login?User[username]=13297092880&User[password]=123456&app=yyyg&User[remember]=2&User[set]=0&User[from]=AppStore&version=v2&device=53A6CF49-C976-48BA-9C6D-FE622D9B529B')
    },
    methods: {
      alert(){
        const that =this;
        this.$axios.get('/active/getZeroBuyGoodsList?version=v2').then(
          function (res) {
            let hef=window.location.host;
            let waistcoat=that.$route.params.app;//马甲包
            if(hef == 'localhost:8080'){
              hef='app.009899.cn'
            }
            if(res.data.code == 200){
              that.$axios.post('user/getOfMarket?version=v2', {app: waistcoat}).then(function(result){
                let url = result.data.data.url
                if (that.appType == 'H5') {
                  window.location = `https://${hef}/api/user/ofmarket?app=${waistcoat}`
                } else {
                    that.JsBridge.callHandler("payList",url,function (res) {
                    })
                }
              })
            }else if(res.data.code==-14){
              // console.log(res.data)
              // that.$vux.toast.text(res.data.msg);
              // that.JsBridge.callHandler("toLogin",null,function (res) {
              // })
              that.navigateTo('userLogin')
            }
          }
        )
      },
      /**
       *
       *  tomyRecord: function (data) {                     //跳我的乐购转乐购记录
            this.JsBridge.callHandler("tomyRecord", data, function (responseData) {
            });
          },
          tomyLucky:function (data) {                     //跳我的乐购幸运记录
            this.JsBridge.callHandler("tomyLucky", data, function (responseData) {
            });
          },
          tomyCount:function (data) {                     //跳我的账户明细
            this.JsBridge.callHandler("toCount", data, function (responseData) {
            });
          },
          tomySign:function (data) {                     //跳我的晒单
            this.JsBridge.callHandler("tomySign", data, function (responseData) {
            });
          },
          tomyIntegral:function (data) {                     //跳我的积分券
            this.JsBridge.callHandler("tomyIntegral", data, function (responseData) {
            });
          },
          tomyTeabag:function (data) {                     //跳我的茶叶和礼包
            this.JsBridge.callHandler("tomyTeabag", data, function (responseData) {
            });
          },
          tomyCity:function (data) {                     //跳我的收货地址
            this.JsBridge.callHandler("tomyCity", data, function (responseData) {
            });
          },
          tomyCenter:function (data) {                     //跳我的帮助中心
            this.JsBridge.callHandler("tomyCenter", data, function (responseData) {
            });
          },
          rechargeCount:function (data) {                     //跳转到充值
            this.JsBridge.callHandler("rechargeCount", data, function (responseData) {
            });
          },
       */
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/css/reset";
  .sendba{
    width: 100%;
    height:getREM(1530);
    background: url("../../assets/img/sendbaobg.png") no-repeat;
    background-size: 100% 100%;
    .btn{
      width: getREM(290);
      height: getREM(102);
      text-align: center;
      line-height: getREM(95);
      margin:auto;
      margin-top:getREM(460);
      font-size: getREM(30);
      color: #3786d1;
      background: url("../../assets/img/sendbabtn.png") no-repeat;
      background-size: 100% 100%;
    }
  }
</style>


