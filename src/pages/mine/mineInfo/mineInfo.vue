<template>
    <div class="mine-info">
      <div class="mine-info-datum">
        <span class="mine-info-datum-title">头像</span>
        <div  class="mine-info-datum-go">
          <div>
            <form id="#form1">
              <input id="image" @change="getPhotos($event)" type="file" accept="image/*"  name="pic[]" class="mine-info-datum-go-img"/>
              <span v-if="!getUserInfo.avatar">点击上传头像</span>
              <div class="mine-info-datum-go-img" v-else :style="'background-image: url('+getUserInfo.avatar+')'"></div>
            </form>
          </div>
          <img class="mine-info-link" src="../../../assets/img/yjtz.png"/>
        </div>
      </div>
      <div class="mine-info-item" @click="navigateTo('myNickName')">
        <span class="mine-info-datum-title">昵称</span>
        <div  class="mine-info-datum-go">
          <div>{{getUserInfo.nickname}}</div>
          <img class="mine-info-link" src="../../../assets/img/yjtz.png"/>
        </div>
      </div>
      <div class="mine-info-item" @click="navigateTo('myGrade')">
        <span class="mine-info-datum-title">我的等级</span>
        <div  class="mine-info-datum-go">
          <div>{{getUserInfo.ulevel}}级</div>
          <img class="mine-info-link" src="../../../assets/img/yjtz.png"/>
        </div>
      </div>
    </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex'
    export default {
        name: "mine-info",
      data(){
          return{
            file:'',
          }
      },
      computed:{
        ...mapGetters([//获取用户信息
          'getUserInfo'
        ])
      },
      methods:{
        ...mapActions([
          'login'
        ]),
        uplosdImg(file){
          //使用form表单提交图片文件流
          let that = this
          let paras = new FormData()
          paras.append('pic[]',file)
          this.upLoadImg(paras).then(res=>{
            that.submit(res.pic)
          })
        },
        submit(val){
          let that = this
          this.$axios.post('/user/infoSave?version=v2',{'User[avatar]':val}).then(res=>{
            if(res.data.code==1){
              that.login()
            }
          })
        },
        getPhotos(e){//添加拍照
          this.file = e.target.files|| e.dataTransfer.files
          if(this.file[0].type.indexOf("image")>-1) {
            this.imgPreview(this.file[0])
          }else{
            this.$vux.toast.text('图片格式不对!')
          }
          // let that = this
          // if(this.getPhoneType() == 'Android'){
          //   that.JsBridge.callHandler("openImages",'55655',function (res) {
          //     if (res == 1) {
          //       console.log(res)
          //       this.file = e.target.files|| e.dataTransfer.files
          //       if(this.file[0].type.indexOf("image")>-1) {
          //         this.imgPreview(this.file[0])
          //       }else{
          //         this.$vux.toast.text('图片格式不对!')
          //       }
          //     } else {
          //       console.log('error')
          //     }
          //   })
          // } else {
          //   this.file = e.target.files|| e.dataTransfer.files
          //   if(this.file[0].type.indexOf("image")>-1) {
          //     this.imgPreview(this.file[0])
          //   }else{
          //     this.$vux.toast.text('图片格式不对!')
          //   }
          // }

        },
        //将base64转换为file
        dataURLtoFile(dataurl) {
          var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          //图片名称
          let imgName = 'shareImg'+parseInt(Math.random()*10000000000)+'.jpg'
          return new File([u8arr],imgName ,{type: mime});
        },
        imgPreview (file) {
          let that= this;
          // 看支持不支持FileReader
          if (!file || !window.FileReader) return;
          if (/^image/.test(file.type)) {
            // 创建一个reader
            let reader = new FileReader();
            // 将图片2将转成 base64 格式
            reader.readAsDataURL(file);
            // 读取成功后的回调
            reader.onload = function () {
              let result = this.result;
              let img = new Image()
              img.src = result
              //判断图片是否大于100K,是就直接上传，反之压缩图片
              if (this.result.length <= (100 * 1024)) {
                that.uplosdImg(file)//上传图片;
              }else {
                img.onload = function () {
                  let data = that.compress(img);
                  //调用
                  let  f = that.dataURLtoFile(data);
                  that.uplosdImg(f)//上传图片
                }
              }
            }
          }
        },
        compress(img) {//过滤图片信息
          let canvas = document.createElement("canvas");
          let ctx = canvas.getContext('2d');
          //瓦片canvas
          let tCanvas = document.createElement("canvas");
          let tctx = tCanvas.getContext("2d");
          let initSize = img.src.length;
          let width = img.width;
          let height = img.height;
          //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
          let ratio;
          if ((ratio = width * height / 4000000) > 1) {
            console.log("大于400万像素")
            ratio = Math.sqrt(ratio);
            width /= ratio;
            height /= ratio;
          } else {
            ratio = 1;
          }
          canvas.width = width;
          canvas.height = height;
          //        铺底色
          ctx.fillStyle = "#fff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          //如果图片像素大于100万则使用瓦片绘制
          let count;
          if ((count = width * height / 1000000) > 1) {
            console.log("超过100W像素");
            count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
            //            计算每块瓦片的宽和高
            let nw = ~~(width / count);
            let nh = ~~(height / count);
            tCanvas.width = nw;
            tCanvas.height = nh;
            for (let i = 0; i < count; i++) {
              for (let j = 0; j < count; j++) {
                tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
                ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
              }
            }
          } else {
            ctx.drawImage(img, 0, 0, width, height);
          }
          //进行最小压缩
          let ndata = canvas.toDataURL('image/jpeg', 0.1);
          tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
          return ndata;
        },
      },
    }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/reset.scss";
.mine-info{
  @include appcontent;
  font-family: PingFang-SC-Regular;
  padding-bottom: 0;
  span{
    font-size: 28*$r;
  }
  &-datum{
    @include flex-space;
    background-color: #ffffff;
    height: 140*$r;
    padding-left: 33*$r;
    padding-right: 30*$r;
    margin-bottom: 10*$r;
    &-title{
      color: #4a4a4a !important;
    }
    &-go{
      @include flex-space;
      color: #898989;
      div{
        margin-right: 20*$r;
        position: relative;
      }
      &-img{
        display: block;
        width: 80*$r;
        height: 80*$r;
        margin-right: 0!important;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        border-radius: 50%;
        border: none;
      }
      #image{
        position: absolute;
        display: block;
        top: 0;
        right: 20*$r;
        width: 160*$r;
        height: 80*$r;
        opacity: 0;
        z-index: 10;
      }
    }
  }
  &-item{
    @include flex-space;
    background-color: #ffffff;
    height: 110*$r;
    border-bottom: solid 1px #ececec;;
    padding-left: 33*$r;
    padding-right: 30*$r;
  }
  &-link{
    width: 12*$r;
    height: 22*$r;
  }
}
</style>
