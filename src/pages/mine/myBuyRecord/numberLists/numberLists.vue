<template>
  <div class="codeList">
    <div class="codeList-top">
      <img :src="datas.pic" class="codeList-top-img"/>
      <div class="codeList-top-con">
        <p>{{datas.name}}</p>
        <div class="codeList-top-con-text">
          <span v-if="type==2">他</span>
          <span v-else>我</span>已经参与:
          <span class="color">{{obj.buy_count}}</span>
          人次
        </div>
      </div>
    </div>
    <div>
      <p class="codeList-time">参与时间：{{obj.ptime}}</p>
    </div>
    <div>
      <p class="red">乐购号码：</p>
      <ul class="ul">
        <li v-for="(item,index) in obj.code" :key="index" class="item">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "number-lists",
    data(){
      return{
        datas:'',
        obj: '',
        codeData:[],
        time: '',
        type:'',
      }
    },
    created(){
      this.type = this.$route.query.type
      this.getNumbers()
    },
    methods:{
      getNumbers(){
        let that =this
        this.datas = JSON.parse(this.$route.query.data)
        let params = {}
        let url = ''
        if(this.$route.query.type===1){ // 自己参与
          let goodsId=this.datas.goods_id
          params = {
            id: goodsId
          }
          url = 'order/view?version=v2'
        }else if (this.$route.query.type===2) { // 查看参与号码
          let winnerId = this.$route.query.userid
          let goodsId=this.datas.goods_id
          params = {
            goods_id: goodsId,
            user_id: winnerId
          }
          url = 'tade/orderView?version=v2'
        } else { // 他参与
          let winnerId = this.datas.winner_id
          let goodsId=this.datas.goods_id
          params = {
            goods_id: goodsId,
            user_id: winnerId
          }
          url = 'tade/orderView?version=v2'
        }
        this.$axios.post(url, params).then(res=>{
          if (res.data.code == 1) {
            this.obj = res.data.data
          } else {
            that.$vux.toast.text(res.data.msg)
          }
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/reset.scss";
  .codeList{
    @include appcontent;
    padding-bottom: 0;
    background-color: #ffffff;
    &-top{
      @include flex-space;
      justify-content: flex-start;
      padding:30*$r 20*$r;
      border-bottom: solid 1px #f2f2f2;
      &-img{
        display: block;
        margin-right: 18*$r;
        width: 100*$r;
        height: 100*$r;
        border-radius: 8*$r;
      }
      &-con{
        height: 100*$r;
        p{
          font-weight: 600;
        }
        &-text{
          margin-top: 26*$r;
          color: #898989;
          .color{
            color: #fb762a;
          }
        }
      }
    }
    &-time{
      padding: 22*$r 20*$r;
      color: #898989;
    }
    .red{
      color: #fb762a;
      padding-left: 20*$r;
      margin-bottom: 10*$r;
    }
    .ul{
      @include flex-space;
      flex-wrap: wrap;
      justify-content: flex-start;
    }
    .item{
      width: 20%;
      text-align: center;
    }
  }
</style>
