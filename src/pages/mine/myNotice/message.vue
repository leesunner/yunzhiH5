<template>
  <div class="message">
    <div class="message">
      <div class="message-content">
        <ul>
          <li v-for="(item,index) in msgData" @click="goDetail(item.notice_id)">
            <div class="message-content-title">
              <span v-show="item.is_read===0"></span>
              <div :class="{'black':item.is_read!=0}">{{item.title}}</div>
              <img src="../../../assets/img/goto.png" alt=""/>
            </div>
            <div class="message-content-text">
              {{item.content}}
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="message-foot">
      <div class="message-foot-con">
        <div @click="emptyMsg">
          <img src="../../../assets/img/emDel.png" alt=""/>
          <span>清空消息</span>
        </div>
        <div @click="allReadMsg">
          <img src="../../../assets/img/alread.png" alt=""/>
          <span>全部已读</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    data(){
      return{
        msgData:[]
      }
    },
    created(){
      this.getMsg()
    },
    methods:{
      ...mapActions([
        'login'
      ]),
      getMsg(){//获取消息列表
        let that = this
        this.$axios.post('notice/lists?version=v2',{}).then(res=>{
          if(res.data.code==1){
            that.msgData = res.data.data.list
            this.login()
          }
        })
      },
      emptyMsg(){//清空消息列表
        let that = this
        this.$axios.get('notice/clear?version=v2').then(res=>{
          that.getMsg()
        })
      },
      allReadMsg(){//标记为已读
        let that = this
        this.$axios.get('notice/readAll?version=v2').then(res=>{
          that.getMsg()
        })
      },
      goDetail(id){//查看详情
        this.login();
        this.$router.push({
          name:'messageDetail',
          query:{
            id:id
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/reset.scss";
  .message{
    @include appcontent;
    padding-bottom: 0;
    &-position{
      border-bottom: 0.2rem solid #f5f5f5;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      margin: auto;
      z-index: 999;
      height: 80*$r;
    }
    &-content{
      width: initial;
      height: initial;
      background-color: #fff;
      border-bottom: solid 1px #f2f2f2;
      ul{

        li{
          padding: 23*$r 30*$r 23*$r 30*$r;
          border-bottom: solid 1px #f2f2f2;
        }
        li:nth-last-child{
          border-bottom: none;
        }
      }
      &-title{
        position: relative;
        span{
          position: absolute;
          top: -4px;
          left: -4px;
          display: block;
          width: 8*$r;
          height: 8*$r;
          background-color: #f12f2b;
          border-radius: 50%;
        }
        div{
          display: inline-block;
          width: 70%;
          font-size: 14px;
        }
        img{
          float: right;
          margin-top: 10.5*$r;
          width: 12*$r;
          height: 23*$r;
        }
        .black{
          color: #a1a1a1;
        }
      }
      &-text{
        color:#a1a1a1;
      }
    }
    &-foot{
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 90*$r;
      background-color: #fff;
      &-con{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 90*$r;
        div{
          width: 50%;
          height: initial;
          line-height: 90*$r;
          text-align: center;
          span{
            vertical-align: middle;
          }
          img{
            vertical-align: middle;
            display: inline-block;
            width: 32*$r;
            height: 32*$r;
            margin-right: 20*$r;
          }
        }
      }
    }
  }
</style>
