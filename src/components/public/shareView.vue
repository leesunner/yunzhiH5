<template>
  <div class="shareView" v-show="datas.share_list" @touchmove.prevent @click="moveInfo">
    <div :class="{'shareView-con':true,'shareView-tran':control}">
      <div class="shareView-list">
        <ul>
          <li v-for="(item,index) in iconList" @click.stop="shareItem(index)">
            <img :src="item.icon"/>
            <p>{{item.name}}</p>
          </li>
        </ul>
        <div class="shareView-list-out" @click.stop="moveInfo">取消分享</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "share-view",
    data(){
      return{
        iconList:[
          {
            icon:require('../../assets/img/qq@2x.png'),
            name:'QQ好友'
          },
          {
            icon:require('../../assets/img/QQkongjian@2x.png'),
            name:'QQ空间'
          },
          {
            icon:require('../../assets/img/weixin@2x.png'),
            name:'微信好友'
          },
          {
            icon:require('../../assets/img/pengyouquan@2x.png'),
            name:'微信朋友圈'
          }
        ],
        control:false,
        datas:{}
      }
    },
    props:['data'],
    methods:{
      moveInfo(){
        this.datas = {}
        this.control = false
      },
      getWXconfig(val){
        let that = this
        let base = window.location.href.split('#')[0]
        this.$axios.post('site/getShareSign?version=v2',{url:base}).then(res=>{
          if(res.data.code==1){
            let data = res.data.data
            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: 'wx69f6e47402306545', // 必填，公众号的唯一标识
              timestamp: data.timestamp, // 必填，生成签名的时间戳
              nonceStr: data.nonceStr, // 必填，生成签名的随机串
              signature: data.signature,// 必填，签名，见附录1
              jsApiList: ['onMenuShareQQ','onMenuShareQZone','onMenuShareAppMessage','onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            })
            wx.ready(function(){
              console.log('验证成功')
              // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            });
            wx.checkJsApi({
              jsApiList: ['onMenuShareQQ','onMenuShareQZone','onMenuShareAppMessage','onMenuShareTimeline'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
              success: function(res) {
                // 以键值对的形式返回，可用的api值true，不可用为false
                // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
              }
            });
          }
        })
      },
      shareItem(val){
        let that =this
        let data = this.datas
        switch (val){
          case 0:
            data.type = 24//QQ好友
            if(this.appType ==='H5') {
              wx.onMenuShareQQ({
                title: data.title, // 分享标题
                desc:data.content,
                link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: data.icon, // 分享图标
                success: function (res) {
                  // 用户点击了分享后执行的回调函数
                  that.$vux.toast.text('分享成功')
                },
                fail:function (res) {
                  that.$vux.toast.text('分享失败')
                },
              })
            }
            break;
          case 1:
            data.type = 6//QQ空间
            if(this.appType ==='H5') {
              wx.onMenuShareQZone({
                title: data.title, // 分享标题
                link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: data.icon, // 分享图标
                success: function (res) {
                  // 用户点击了分享后执行的回调函数
                  that.$vux.toast.text('分享成功')
                },
                fail:function (res) {
                  that.$vux.toast.text('分享失败')
                }
              })
            }
            break;
          case 2:
            data.type = 22//微信好友
            if(this.appType ==='H5') {
              wx.onMenuShareAppMessage({
                title: data.title, // 分享标题
                desc:data.content,
                link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: data.icon, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                  that.$vux.toast.text('分享成功')
                  // 用户点击了分享后执行的回调函数
                }
              });
            }
            break;
          case 3:
            data.type = 23//朋友圈
            if(this.appType ==='H5') {
              wx.onMenuShareTimeline({
                title: data.title, // 分享标题
                link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: data.icon, // 分享图标
                success: function (res) {
                  // 用户点击了分享后执行的回调函数
                  that.$vux.toast.text('分享成功')
                },
                fail:function (res) {
                  that.$vux.toast.text('分享失败')
                }
              })
            }
            break;
        }
        that.JsBridge.callHandler("shareInfo",JSON.stringify(data), function (res) {
          that.datas = {}
          that.control = false
          that.$emit('getResult',1)
        });
      }
    },
    watch:{
      data:{
        handler(val){
          this.datas = val
          if(this.appType ==='H5'){
            if(val.link){
              this.getWXconfig(val.link)
            }
          }
          setTimeout(function () {
            this.control = true
          }.bind(this),25)
        },
        deep:true
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/reset.scss";
  .shareView{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    z-index: 100;
    &-list{
      height: 310*$r;
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: #ffffff;
      &-out{
        height: 170*$r;
        text-align: center;
        line-height: 100%;
        color: #333333;
        font-size: 28*$r;
      }
    }
    &-con{
      width: 100%;
      height: 100%;
      position: relative;
      transition: all 0.25s ease-in-out;
      transform: translateY(200px);
      ul{
        height: 240*$r;
        @include flex-space;
        li{
          width: 25%;
          @include flex-align;
          img{
            width: 84*$r;
            height: 84*$r;
          }
          p{
            color: #333333;
          }
        }
      }
    }
    &-tran{
      transform: translateY(0);
    }
  }
</style>
