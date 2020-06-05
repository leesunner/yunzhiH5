<template>
  <div class="showContent">
    <div class="showContent-title">
      <img :src="data.pic"/>
      <span>{{data.name}}</span>
    </div>
    <div class="showContent-input">
      <textarea placeholder="亲，商品的感觉怎么样？说说您的获奖感言吧!" v-model="text"></textarea>
      <p>至少输入8个字</p>
    </div>
    <div class="showContent-photos" v-if="photoList.length>0">
      <div class="showContent-photos-item" v-for="(item,index) in photoList" :style="'background-image:url('+item+')'">
        <img src="../../../assets/img/order-close.png" @click="deleteFile(index)"/>
      </div>
    </div>
    <div class="showContent-takePhone">
      <form id="#form1">
        <input type="file" id='image' name="pic[]" accept="image/*" @change="getPhotos($event)"/>
        <img src="../../../assets/img/order-phone.png"/>
      </form>
      <div class="showContent-takePhone-text">
        <p>{{photoList.lenght>0?'继续上传':'点击拍照上传'}}</p>
        <p>为保证晒图的真实，请至少上传2张高清实拍商品图哦</p>
      </div>
    </div>
    <div class="showContent-btn" @click="submitInfo">提交</div>
  </div>
</template>

<script>
  import qs from 'qs'
  export default {
    name: "show-appraise",
    data(){
      return{
        data:{},
        text:'',
        photoList:[],//图片显示
        files:[],//上传的图片文件
        file:''
      }
    },
    created(){
      this.data = JSON.parse(this.$route.query.data)
    },
    methods:{
      submitInfo(){//提交晒单
        if(this.text.length<8){
          this.$vux.toast.text('输入文字过少')
          return
        }
        if(this.files.length<2){
          this.$vux.toast.text('请至少上传2张图片')
          return
        }
        let arr = []
        this.files.forEach(function (item) {
          arr.push(item)
        })
        let pics = arr.join(',')
        this.$axios.post('/show/create?version=v2',{
          content:this.text,
          goods_id:this.data.goods_id,
          pics:pics
        }).then((res)=>{
          if(res.data.code==1){
            this.navigateTo('showSuccess')
          }else{
            this.$vux.toast.text(res.data.msg)
          }
        })
      },
      getPhotos(e){//添加拍照
        let that = this
        that.file =e.target.files|| e.dataTransfer.files
        if(that.file[0].type.indexOf("image")>-1) {
          that.imgPreview(that.file[0])//图片转换及压缩
        }else{
          that.$vux.toast.text('图片格式不对!')
        }
      },
      uplosdImg(file){
        //使用form表单提交图片文件流
        let that = this
        let paras = new FormData()
        paras.append('pic[]',file)
        // this.$axios.defaults.headers['Content-Type'] = 'multipart/form-data';
        // this.$axios.post('site/upload?version=v1',paras).then((res)=>{
        //   if(res.data.code===1){
        //     console.log(res.data)
        //     this.photoList.push(res.data.pic_url);//显示的文件
        //     this.files.push(res.data.pic);//提交的文件
        //   }else{
        //     this.$vux.toast.text(res.data.msg)
        //   }
        // })
        this.upLoadImg(paras).then(res=>{
          that.photoList.push(res.pic_url[0]);//显示的文件
          that.files.push(res.pic);//提交的文件
        })
      },
      deleteFile(i){//删除图片
        this.photoList.splice(i,1)
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
      rotateImg (img, direction,canvas) {//图片旋转
        //最小与最大旋转方向，图片旋转4次后回到原方向
        const min_step = 0;
        const max_step = 3;
        if (img == null)return;
        //img的高度和宽度不能在img元素隐藏后获取，否则会出错
        let height = img.height;
        let width = img.width;
        let step = 2;
        if (step == null) {
          step = min_step;
        }
        if (direction == 'right') {
          step++;
          //旋转到原位置，即超过最大值
          step > max_step && (step = min_step);
        } else {
          step--;
          step < min_step && (step = max_step);
        }
        //旋转角度以弧度值为参数
        let degree = step * 90 * Math.PI / 180;
        let ctx = canvas.getContext('2d');
        switch (step) {
          case 0:
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0);
            break;
          case 1:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, 0, -height);
            break;
          case 2:
            canvas.width = width;
            canvas.height = height;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, -height);
            break;
          case 3:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, 0);
            break;
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/reset.scss";
  .showContent{
    @include appcontent;
    padding-bottom: 0;
    background-color: #ffffff;
    &-title{
      @include flex-space;
      padding: 13*$r 30*$r 14*$r 44*$r;
      justify-content: flex-start;
      img{
        width: 96*$r;
        height: 96*$r;
        margin-right: 33*$r;
      }
      span{
        color: #4a4a4a;
        font-size: 26*$r;
      }
    }
    &-input{
      width: 690*$r;
      height: 316*$r;
      background-color: #f9f9f9;
      border-radius: 10*$r;
      border: solid 1px #f0f0f0;
      font-size: 26*$r;
      margin: 0 auto;
      overflow: hidden;
      position: relative;
      textarea{
        border: none;
        color: #4a4a4a;
        width: 91.5%;
        height: 67%;
        background-color: #f9f9f9;
        padding: 30*$r 30*$r 80*$r 30*$r;
      }
      textarea::-webkit-input-placeholder {
        /* WebKit browsers */
        color: #898989;
      }
      textarea:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: #898989;
      }
      textarea::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #898989;
      }
      textarea:-ms-input-placeholder {
        /* Internet Explorer 10+ */
        color: #898989;
      }
      p{
        color: #898989;
        position: absolute;
        bottom: 25*$r;
        right: 32*$r;
      }
    }
    &-photos{
      padding: 0 30*$r 0 30*$r;
      margin-top: 52*$r;
      @include flex-space;
      justify-content: flex-start;
      flex-wrap: wrap;
      &-item{
        width: 93*$r;
        height: 93*$r;
        margin-right: 25*$r;
        position: relative;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        img{
          position: absolute;
          width: 42*$r;
          height: 42*$r;
          right: -21*$r;
          top: -21*$r;
        }
      }
    }
    &-takePhone{
      @include flex-space;
      justify-content: flex-start;
      padding-left: 30*$r;
      padding-right: 30*$r;
      margin-top: 60*$r;
      margin-bottom: 40*$r;
      position: relative;
      #image{
        position: absolute;
        display: block;
        top: 0;
        left: 30*$r;
        width: 93*$r;
        height: 93*$r;
        background: url("../../../assets/img/order-phone.png") no-repeat;
        background-size: 100% 100%;
        opacity: 0;
        z-index: 10;
      }
      img{
        position: relative;
        display: block;
        width: 93*$r;
        height: 93*$r;
      }
      &-text{
        margin-left: 30*$r;
        p:nth-child(1){
          font-size: 26*$r;
          color: #4a4a4a;
          margin-bottom: 22*$r;
        }
        p:nth-child(2){
          font-family: 'PingFang-SC-Regular';
          font-size: 22*$r;
          color: #898989;
        }
      }
    }
    &-btn{
      width: 690*$r;
      height: 88*$r;
      background-color: #fb762a;
      border-radius: 10*$r;
      text-align: center;
      color: #ffffff;
      font-size: 30*$r;
      line-height: 88*$r;
      margin: 0 auto;
    }
  }
</style>
