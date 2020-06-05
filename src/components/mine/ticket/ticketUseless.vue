<template>
  <div class="ticketNum">
    <div class="ticketNum-con">
      <!-- <loadMore :bottomDistance='20' :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore1"> -->
         <ul>
          <li v-for="(item,index) in data" :key="index">
            <div :class="{'ticketItem':true,'ticketItem-gray':true}">
              <div class="ticketItem-top">
                <div class="ticketItem-top-lItem">
                  <p><span>{{item.coin}}</span><span>积分</span></p>
                  <p>{{item.use_limit!=0?'满'+item.use_limit+'元可以使用':'全额抵扣'}}</p>
                </div>
                <div class="ticketItem-top-cItem">
                  <p>{{item.name}}</p>
                  <p>{{item.etime}}到期</p>
                </div>
                <div class="ticketItem-top-rItem">
                  <!-- <img v-if="type===0&&time<item.stime_int" src="../../../assets/img/t1.png"/>
                  <img v-if="type===0&&time>=item.stime_int" src="../../../assets/img/t3.png"/> -->
                  <img v-if="item.status==0&&time<=item.etime_int" src="../../../assets/img/t2.png"/>
                  <img v-if="item.status==0&&time>item.etime_int" src="../../../assets/img/t4.png"/>
                  <img v-if="item.status==1" src="../../../assets/img/t5.png"/>
                </div>
              </div>
              <div class="ticketItem-center">
              </div>
              <div class="ticketItem-bottom">
                <p>{{item.use_type==1?'虚拟商品不支持使用':item.use_type==2?'实物商品不支持使用':'全部商品'}}</p>
                <div class="btn">去使用</div>
              </div>
            </div>
            <!-- <ticket :key="index" :item="item" :type="1" :time="time">
            </ticket> -->
          </li>
        </ul>
      <!-- </loadMore> -->
    </div>
  </div>
</template>

<script>
  import ticket from '@/components/mine/ticket/ticket'
  export default {
    name: "ticket-useless",
    components:{
      ticket
    },
    data(){
      return{
        data:[],
        time:0,
        page: 1,
        allLoaded: false
      }
    },
    created(){
      this.getMsg()
    },
    methods:{
      loadBottom: function(){//上拉加载更多
      if(!this.allLoaded){
        this.page++;
        this.getMsg();
        this.allLoaded=true; // 若数据已全部获取完毕
        this.$refs.loadmore1.onBottomLoaded();
      }
      },
      getMsg(){
        this.$axios.post('/user/coupons?version=v2',{
          type:1,
          page:this.page
        }).then(res=>{
          if(res.data.code===1){
            if (res.data.data.list.length > 0) {
              this.$nextTick(() => {
                this.data = this.data.concat(res.data.data.list);
                this.time = res.data.time;
                this.allLoaded=false;
              })
            } else {
              this.$vux.toast.text('内容加载完啦～');
              this.allLoaded=true;
            }
          }else{
            this.$vux.toast.text(res.data.msg);
            this.allLoaded=true;
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/reset.scss";
  .ticketNum{
    @include appcontent;
    position: relative;
    padding-top: 0;
    // @include ios-Scroll;
    // overflow: hidden;;
    &-con{
      @include ios-Scroll;
      overflow: hidden;
      background-color: #f2f2f2;
    }
  }
  .ticketItem{
    border-bottom:solid 5px #f5f5f5;
    width: 712*$r;
    margin: 0 auto;
    background-color: #ffffff;
    &-gray{//灰色主题
      -webkit-filter: grayscale(100%);
      filter:progid:DXImageTransform.Microsoft.BasicImage(graysale=1);
    }
    &-top{
      height: 150*$r;
      @include flex-space;
      &-lItem{
        width: 29.33333333333333%;
        margin-left: 40*$r;
        height: inherit;
        margin-top: 30*$r;
        p{
          color: #4a4a4a;
          span{
            font-size: 35*$r;
          }
          span:nth-child(1){
            font-size: 46*$r;
          }
        }
        P:nth-child(1){
          font-weight: bolder;
          color: #fb762a;
          margin-bottom: 22*$r;
        }
      }
      &-cItem{
        color: #999999;
        height: inherit;
        width: 52.33333333333333%;
        margin-top: 52*$r;
        text-align: center;
        p:nth-child(1){
          font-size: 35*$r;
          font-weight: 600;
          margin-bottom: 30*$r;
        }
      }
      &-rItem{
        width: 30.33333333333333%;
        height: inherit;
        margin-top: 33*$r;
        text-align: left;
        img{
          width: 112*$r;
          height: 112*$r;
          margin-left: 18%;
        }
      }
    }
    &-center{
      display: block;
      height: 25*$r;
      width: 100%;
      background: url("../../../assets/img/quangx.png") no-repeat;
      background-size: 100% 100%;
      background-color: #f5f5f5;
    }
    &-bottom{
      height: 48*$r;
      padding-left: 40*$r;
      color: #898989;
      @include flex-space;
      .btn{
        width: 115*$r;
        height: 40*$r;
        background-color: #fb762a;
        text-align: center;
        line-height: 40*$r;
        border-radius: 20*$r;
        color: #ffffff;
        margin-right: 20*$r;
      }
    }
  }
</style>
