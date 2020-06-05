<template>
  <div class="qxyq">
    <img src="../../assets/img/yqTop.png" alt="">
    <img src="../../assets/img/yqBtn.png" alt="" @click="getyq()">
    <img src="../../assets/img/yqBoottom.png" alt="">
    <share-view :data="shareData"></share-view>
  </div>
</template>
<script>
  import shareView from '../public/shareView'
  export default {
    components:{shareView},
    name:"midinvite",
    data(){
      return{
        shareData:''
      }

    },
    created() {
      document.title="邀请得红包",
        this.getjl();

    },
    mounted () {

    },
    methods:{
      getyq:function(){
        var that = this;
        this.$axios.post('/site/sharecon?version=v2', {type: 5}).then(function (response) {

          if(response.data.code==1){
            that.shareData = response.data.data
            // that.$vux.loading.show({text: '请稍候'});
            // // console.log(response.data.data)
            // that.JsBridge.callHandler("share", response.data.data, function (responseData) {
            //     if (responseData == 'success') {
            //         that.$vux.loading.hide();
            //     }
            // });
          }
        });
      },
      getjl:function () {//中秋活动用户访问记录
        this.$axios.post("/active/zhongQiuLog?version=v2",{type:3}).then(function (res) {
          //   console.log(res);
        })
      },
      // toLogin(){
      //           this.JsBridge.callHandler("toLogin",null,function (res) {
      //      if (responseData == 'success') {

      //        }
      // })
      // }

    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/css/reset";
  .qxyq{
    width: 100%;position: relative;
    img{
      display: block
    }
    img:nth-child(1){
      width: 100%;
    }
    img:nth-child(2){
      position: absolute;width: getREM(370);height: getREM(111);top:getREM(777);left: 0;right: 0;margin: auto;

    }
    img:nth-child(3){
      width: 100%;
    }
  }
</style>

