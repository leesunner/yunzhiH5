<template>
  <div class="showOrderList">
    <loadMore :bottomDistance='20' :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
      <div>
        <div class="showOrderList-item" v-for="item in data">
          <div class="showOrderList-item-headImg" :style="'background-image: url('+item.avatar+')'">
          </div>
          <div class="showOrderList-item-content" @click="navigateTo('showOrderInfo',{id:item.show_id})">
            <div class="showOrderList-item-content-go" @click.stop="goParas('productView',{'id':item.latest_goods_id,'guid':2})">
              <span>试试手气</span><span> ></span>
            </div>
            <p class="showOrderList-item-content-name">{{item.nickname}}</p>
            <div class="showOrderList-item-content-content">{{item.content|encodeURIs}}</div>
            <ul>
              <li v-for="items in getArr(item.pics)" :style="'background-image: url('+items+')'"></li>
            </ul>
            <div class="showOrderList-item-content-bottom">
              <span class="showOrderList-item-content-bottom-time">{{item.ctime}}</span>
              <div class="showOrderList-item-content-bottom-btn">
                <ul>
                  <li @click.stop="setLove(item.show_id)">
                    <img src="../../assets/img/dzIcon.png"/>
                    <span>点赞({{item.love}})</span>
                  </li>
                  <li @click.stop="getyq(item.show_id)">
                    <img src="../../assets/img/shareBtn.png"/>
                  </li>
                  <li>
                    <img src="../../assets/img/disguss.png"/>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </loadMore>
    <share-view :data="shareInfo"></share-view>
  </div>
</template>

<script>
  import shareView from '../../components/public/shareView'
  export default {
    name: "show-order-list",
    components:{shareView},
    data(){
      return{
        data:[],
        shareInfo:{},
        page:1,
        allLoaded:false,
      }
    },
    created(){
      this.getList(1)
    },
    methods:{
      getList(val){
        this.$axios.post('/show/pics?version=v2',{page:this.page}).then(res=>{
          if(res.data.code==1){
            if(val==1){
              if(res.data.data.list.length>0) {
                this.data = this.data.concat(res.data.data.list)
              }else{
                this.$vux.toast.text("加载完啦～");
                this.allLoaded=true;
              }
            }else{
              this.data =res.data.data.list
            }
          }else{
            this.$vux.toast.text(res.data.msg)
          }
        })
      },
      setLove(val){
        this.$axios.post('/show/love?version=v2',{show_id:val}).then(res=>{
          if(res.data.code==1){
            this.$vux.toast.text('点赞成功')
            this.getList(2)
          }else{
            this.$vux.toast.text(res.data.msg)
          }
        })
      },
      getyq(val){//分享好友
        var that = this;
        this.$axios.post('/site/sharecon?version=v2', {type: 4,id:val}).then(res=>{
          if(res.data.code==1){
            // that.$vux.loading.show({text: '请稍候'});
            that.shareInfo = res.data.data
            let url = that.$httpUrl;
            if (that.$appid == 'lqlg') {
              that.shareInfo.icon =url+'/web/icons/lqlgIcons.png'
            }
            if (that.$appid == 'yyyg') {
              that.shareInfo.icon = url+'/web/icons/loginImg.png'
            }
            if (that.$appid == 'yytj') {
              that.shareInfo.icon = url+'/web/icons/loginyytj.png'
            }
            if (that.$appid == 'lqdb') {
              that.shareInfo.icon = url+'/web/icons/loginlqdb.png'
            }
            if (that.$appid == 'yytg') {
              that.shareInfo.icon = url+'/web/icons/yytg1.png'
            }
            if (that.$appid == 'kdlg') {
              that.shareInfo.icon = url+'/web/icons/kdlg.png'
            }
          }
        });
      },
      loadBottom: function(){//上拉加载更多
        this.page++;
        this.getList(1);
        this.allLoaded=true; // 若数据已全部获取完毕
        this.$refs.loadmore.onBottomLoaded();
      },
      getArr(val){
        let arr = val.split(',')
        return arr
      },
    },
    filters:{
      encodeURIs(val){
        return decodeURIComponent(val)//解码
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/reset.scss";
  .showOrderList{
    @include appcontent;
    padding-bottom: 0;
    &-item{
      padding: 43*$r 30*$r 24*$r 30*$r;
      background-color: #ffffff;
      border-bottom: solid 1px #f2f2f2;
      @include flex-space;
      align-items: stretch;
      &-headImg{
        width: 118*$r;
        height: 118*$r;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        border-radius: 50%;
        margin-right: 20*$r;
      }
      &-content{
        width: 82%;
        position: relative;
        &-go{
          color: #fb762a;
          font-size: 24*$r;
          position: absolute;
          top: 0;
          right: 0;
          span{
            vertical-align: middle;
          }
        }
        &-name{
          font-size: 30*$r;
          color: #3a3a3a;
        }
        &-content{
          color: #898989;
          font-size: 24*$r;
          height: 66*$r;
          @include t-overflow(2);
        }
        ul{
          @include flex-space;
          flex-wrap: wrap;
          justify-content: flex-start;
          margin-top: 20*$r;
          li{
            width: 31.3333333333%;
            height: 180*$r;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            margin-right: 8*$r;
          }
        }
        &-bottom{
          height: 50*$r;
          margin-top: 24*$r;
          line-height: 50*$r;
          @include flex-space;
          color: #898989;
          &-time{
            color: #727dc9;
            font-size: 24*$r;
          }
          &-btn{
            height: 30*$r;
            width: 80%;
            ul{
              @include flex-space;
              height: 30*$r;
              margin-top: 0;
              li{
                width: 33.33333333333%;
                height: 30*$r;
                margin-right: 0;
                text-align: right;
                line-height: 0;
                img{
                  height: 30*$r;
                  vertical-align: middle;
                }
                span{
                  vertical-align: middle;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
