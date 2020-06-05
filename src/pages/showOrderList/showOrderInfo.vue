<template>
  <div class="showOrderInfo">
    <div class="showOrderInfo-user">
      <div class="showOrderInfo-user-headImg" :style="'background-image: url('+data.avatar+')'"></div>
      <div class="showOrderInfo-user-info">
        <p>{{data.nickname}}</p>
        <p>{{data.ctime}}</p>
      </div>
    </div>
    <div class="showOrderInfo-goodInfo">
      <ul>
        <li>
          <div class="showOrderInfo-goodInfo-title">获奖商品</div>
          <div class="showOrderInfo-goodInfo-info">
            {{data.name}}
          </div>
        </li>
        <li>
          <div class="showOrderInfo-goodInfo-title">本期期数</div>
          <div class="showOrderInfo-goodInfo-info">
            第{{data.times_num}}期
          </div>
        </li>
        <li>
          <div class="showOrderInfo-goodInfo-title">本期参与</div>
          <div class="showOrderInfo-goodInfo-info">
            <span class="color">{{data.buy_count}}</span>人次
          </div>
        </li>
        <li>
          <div class="showOrderInfo-goodInfo-title">幸运号码</div>
          <div class="showOrderInfo-goodInfo-info">
            <span class="color">{{data.winner_code}}</span>
          </div>
        </li>
        <li>
          <div class="showOrderInfo-goodInfo-title">揭晓时间</div>
          <div class="showOrderInfo-goodInfo-info">
            {{data.etime}}
          </div>
        </li>
      </ul>
    </div>
    <div class="showOrderInfo-content">
      <div class="showOrderInfo-content-info" v-html="encodeURIs(data.content)"></div>
      <!--<ul>-->
        <!--<li v-for="item in getArr(data.pics)" :style="'background-image: url('+item+')'">-->
        <!--</li>-->
      <!--</ul>-->
    </div>
    <div class="showOrderInfo-disguss">
      <div class="showOrderInfo-disguss-top">
        <img src="../../assets/img/plIcons.png"/>
        <span>全部评论</span>
      </div>
      <ul v-if="control">
        <li v-for="item in data.comment_list">
          <div class="showOrderInfo-disguss-headImg" :style="'background-image: url('+item.avatar+')'"></div>
          <div class="showOrderInfo-disguss-content">
            <p class="showOrderInfo-disguss-content-name">{{item.nickname}}</p>
            <p class="showOrderInfo-disguss-content-time">{{item.ctime}}</p>
            <p class="showOrderInfo-disguss-content-con">{{item.content}}</p>
            <div class="showOrderInfo-disguss-content-dz" @click="setCommentLove(item.show_comment_id)">
              <img class="img" :src="item.i_loved?require('../../assets/img/ydzccccc.png'):require('../../assets/img/dzIcon.png')"/>
              <span :class="item.i_loved?'color':''">点赞({{item.love}})</span>
            </div>
          </div>
        </li>
      </ul>
      <p class="noUser" v-else>还没有用户评论哦～</p>
    </div>
    <div class="showOrderInfo-kkk"></div>
    <div class="showOrderInfo-btn">
      <div>
        <!--<input :style="'background-image: url('+require('../../assets/img/disguss.png')+')'" />-->
        <img src="../../assets/img/disguss.png" @click="showDZ=true"/>
      </div>
      <div @click="setLove">
        <img class="img" :src="data.i_loved?require('../../assets/img/ydzccccc.png'):require('../../assets/img/dzIcon.png')"/>
        <!--ydzccccc-->
        <span :class="data.i_loved?'color':''">点赞({{data.love}})</span>
      </div>
    </div>
    <div class="showOrderInfo-inputCon" @touchmove.prevent v-if="showDZ">
      <div class="showOrderInfo-inputCon-div">
        <div class="showOrderInfo-inputCon-input">
          <textarea placeholder="说点什么吧!" v-model="content"></textarea>
        </div>
        <div class="showOrderInfo-inputCon-btn">
          <div class="color" @click.stop="commitContent">确认</div>
          <div @click="showDZ=!showDZ">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "show-order-info",
    data(){
      return{
        data:{},
        showId:'',
        content:'',
        showDZ:false,
        control:false,
      }
    },
    created(){
      this.showId = this.$route.query.id
      this.getMsg()
    },
    methods: {
      getMsg() {
        this.$axios.post('/show/view?version=v2', {id: this.showId}).then(res => {
          if (res.data.code == 1) {
            this.data = res.data.data
            if(this.data.comment_list.length>0){
              this.control = true
            }
          } else {
            this.$vux.toast.text(res.data.msg)
          }
        })
      },
      commitContent(){//晒单评论
        this.$axios.post('/show/comment?version=v2', {
          'Comment[show_id]': this.showId,
          'Comment[content]':this.content,
        }).then(res => {
          if (res.data.code == 1) {
            this.showDZ=false
            this.getMsg()
            this.$vux.toast.text('评论成功')
          }else {
            this.$vux.toast.text(res.data.msg)
          }
        })
      },
      setLove(){//晒单点赞
        this.$axios.post('/show/love?version=v2', {show_id: this.showId}).then(res => {
          if (res.data.code == 1) {
            this.$vux.toast.text('成功点赞')
            this.getMsg()
          } else {
            this.$vux.toast.text(res.data.msg)
          }
        })
      },
      setCommentLove(val){//评论点赞
        this.$axios.post('/show/commentLove?version=v2', {'show_comment_id': val}).then(res => {
          if (res.data.code == 1) {
            this.$vux.toast.text('成功点赞')
            this.getMsg()
          } else {
            this.$vux.toast.text(res.data.msg)
          }
        })
      },
      getArr(val){
        if(val){
          let arr = val.split(',')
          return arr
        }else{
          return []
        }
      },
      encodeURIs(val){
        return decodeURIComponent(val)//解码
      },
    },
    filters:{

    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/reset.scss";
  .showOrderInfo{
    @include appcontent;
    padding-bottom: 0;
    background-color: #ffffff;
    &-user{
      padding: 18*$r 30*$r 28*$r 30*$r;
      @include flex-space;
      justify-content: flex-start;
      &-headImg{
        width: 118*$r;
        height: 118*$r;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        border-radius: 50%;
        margin-right: 30*$r;
      }
    }
    &-goodInfo{
      margin: 0 30*$r 20*$r 30*$r;
      background-color: #f9f9f8;
      padding: 25*$r 25*$r 22*$r 26*$r;
      li{
        @include flex-space;
        justify-content: flex-start;
        font-size: 26*$r;
        margin-bottom: 18*$r;
        .color{
          color:#fb762a;
        }
      }
      li:nth-last-child(1){
        margin-bottom: 0;
      }
      &-title{
        color: #3a3a3a;
        margin-right: 43*$r;
      }
      &-info{
        color: #898989;
      }
    }
    &-content{
      margin: 0 30*$r;
      li{
        height: 391*$r;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        margin-bottom: 29*$r;
      }
      &-info{
        color: #898989;
        font-size: 26*$r;
        margin-bottom: 37*$r;
      }
    }
    &-disguss{
      border-top: solid 5px #e8e8e8;
      border-bottom: solid 9px #f2f2f2;
      .noUser{
        padding: 40*$r 0;
        background-color: #f2f2f2;
        text-align: center;
        color: #898989;
      }
      &-top{
        height: 84*$r;
        border-bottom: solid 1px #f9f9f8;
        line-height: 84*$r;
        padding: 0 30*$r;
        img{
          width: 32*$r;
          height: 32*$r;
          margin-right: 12*$r;
          vertical-align: middle;
        }
        span{
          font-size: 26*$r;
          color: #3a3a3a;
          vertical-align: middle;
        }
      }
      ul{
        padding: 0 30*$r;
      }
      li{
        padding-top: 25*$r;
        padding-bottom: 25*$r;
        @include flex-space;
        justify-content: flex-start;
        align-items: inherit;
      }
      &-headImg{
        width: 80*$r;
        height: 80*$r;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        border-radius: 50%;
        margin-right: 21*$r;
      }
      &-content{
        width: 84%;
        position: relative;
        &-name{
          font-size: 26*$r;
          color: #3a3a3a;
        }
        &-time{
          font-size: 22*$r;
          color: #3a3a3a;
          margin-bottom: 20*$r;
        }
        &-con{
          font-size: 26*$r;
          color: #898989;
        }
        &-dz{
          position: absolute;
          top: 0;
          right: 0;
          img{
            width: 31*$r;
            height: 31*$r;
            vertical-align: middle;
          }
          span{
            color: #898989;
            font-size: 24*$r;
            vertical-align: middle;
          }
        }
      }
    }
    &-kkk{
      height: 103*$r;
    }
    &-btn{
      height: 103*$r;
      width: 100%;
      @include flex-space;
      position: fixed;
      bottom: 0;
      left: 0;
      background-color: #ffffff;
      box-shadow: 0 2px 2px 2px #f2f2f2;
      div{
        width: 50%;
        line-height: 103*$r;
        text-align: center;
        //input{
         // height: 32*$r;
          //width: 95*$r;
          //background-size: 100% 100%;
          //background-repeat: no-repeat;
          //border: none;
        //}
        img{
          height: 32*$r;
          width: 95*$r;
          margin: 0 auto;
          vertical-align: middle;
        }
        .img{
          width: 32*$r!important;
          height: 32*$r!important;
        }
        span{
          vertical-align: middle;
          color:#898989;
        }
      }
      div:nth-last-child(1){
        border-left: solid 1px #f2f2f2;
      }
    }
    &-inputCon{
      width: 100%;
      height: 100%;
      background-color: #ffffff;
      position: fixed;
      top: 0;
      left: 0;
      background-color: rgba(0,0,0,0.5);
      &-div{
        margin: 50% auto;
        width: 88%;
        background-color: #ffffff;
        border-radius: 10*$r;
      }
      &-input{
        //height: 68*$r;
        //line-height: 68*$r;
        //input{
          //border: none;
         // height: 58*$r;
          //padding-left: 25*$r;
        //}
        width: 100%;
        height: 220*$r;
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
          padding: 30*$r 30*$r 30*$r 30*$r;
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
      }
      &-btn{
        @include flex-space;
        border-top: solid 1px #ececec;
        div{
          width: 50%;
          height: 78*$r;
          line-height: 78*$r;
          text-align: center;
          font-size: 30*$r;
          color: #898989;
        }
        div:nth-last-child(1){
          border-left: solid 1px #f2f2f2;
        }
      }
    }
    .color{
      color: #fb762a!important;
    }
  }
</style>
