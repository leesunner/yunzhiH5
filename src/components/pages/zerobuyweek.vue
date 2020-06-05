<template>
  <div class="zerobuyweek">
    <div class="seven-head">
      <div :class="{'seven-head-con':true,'seven-head-con-ending':ending,'seven-head-con-end':end}">
        <div class="seven-head-con-time" v-if="!end">
          <span class="span">{{times.day}}</span>
          <span class="ss">天</span>
          <span class="span2">{{times.hour}}</span>
          <span class="ss">时</span>
          <span class="span2">{{times.m}}</span>
          <span class="ss">分</span>
          <span class="span2">{{times.s}}</span>
          <span class="ss">秒</span>
        </div>
      </div>
    </div>
    <div class="zerobuyweek-back">
      <div class="zerobuyweek-back-top">
        <div class="zerobuyweek-back-top-btn">
          <div class="item" @click="navigateTo('luckyRecord')">我的奖品</div>
          <div class="item" @click="getyq">{{hasVal?'已领取资格':'分享领取资格'}}</div>
        </div>
      </div>
      <div class="zerobuyweek-back-center">
        <ul>
          <li @click="navigateTo('rechargList',{typeName:'gamePeck'})"></li>
          <li>
            <img :src="item1.pics" class="proimg">
            <div class="progress">
              <mt-progress class="faster-progress-color" :value="getPercent(item1)" :bar-height="4"></mt-progress>
              <div class="progress-text">
                <span>总需: {{item1.join_re}}</span>
                <span>剩余: {{item1.join_le}}</span>
              </div>
            </div>
            <div class="btn" @click="navigateTo('productView',{},{id:item1.goods_id,guid:2})">点击查看</div>
          </li>
          <li @click="navigateTo('rechargList',{typeName:'teaPeck'})"></li>
          <li>
            <img :src="item2.pics" class="proimg">
            <div class="progress">
              <mt-progress class="faster-progress-color" :value="getPercent(item2)" :bar-height="4"></mt-progress>
              <div class="progress-text">
                <span>总需: {{item2.join_re}}</span>
                <span>剩余: {{item2.join_le}}</span>
              </div>
            </div>
            <div class="btn" @click="navigateTo('productView',{},{id:item2.goods_id,guid:2})">点击查看</div>
          </li>
        </ul>
      </div>
    </div>
    <share-view :data="data" @getResult="getResult()"></share-view>
  </div>
</template>

<script>
  import shareView from '../public/shareView';
  import {mapGetters} from 'vuex'
  export default {
    components:{shareView},
    name: "zerobuyweek",
    data(){
      return{
        data:'',
        ending:false,//距离活动结束控制变量
        end:false,//活动已结束控制变量
        times:{//时间控制器
          day:0,
          hour:0,
          m:0,
          s:0
        },
        setInt:'',
        item1:'',
        item2:'',
        hasVal:'',
      }
    },
    computed:{
      ...mapGetters([
        'getUserInfo'
      ]),
    },
    created(){
      if(this.getUserInfo.idx) {
        this.getMsg()
      }else{
        this.navigateTo('userLogin')
      }
    },
    methods:{
      getyq(){//分享好友
        var that = this;
        this.$axios.post('/site/sharecon?version=v2', {type: 5}).then(function (res) {
          if(res.data.code==1){
            that.data = res.data.data
            if(that.getPhoneType()=='ios'){//因为ios没做回调只能采取这种方式
              setTimeout(function () {
                that.getCallBack()
              },600)
            }
          }
        });
      },
      getCallBack(){
        let that = this
        this.$axios.post('site/sharecallback?version=v2', {type: 5,user_id:that.getUserInfo.user_id,share_type:5}).then(function (res) {
          that.getMsg()
        })
      },
      getResult(val){
        this.getCallBack()
      },
      getPercent(item){
        let num = item.join_ed/item.join_re
        return num*100
      },
      getMsg(){
        this.$axios.post('active/getZeroBuyGoodsList?version=v2',{}).then(res=>{
          if(res.data.code==200){
            this.control = true
            this.item1 = res.data.data.list[0];
            this.item2 = res.data.data.list[1];
            this.hasVal = res.data.data.has_quota
            this.getTime(res.data.data.stime,res.data.data.etime,res.data.timestamp)
          }else{
            this.$vux.toast.text(res.data.msg)
          }
        })
      },
      getTime(st,et,t){
        let that = this
        let timex = 0;
        if(t<st){
          timex =  parseInt(st-t)//时间秒差(距离活动开始)
        }else{
          if(t<et){
            this.ending = true
            timex = et-t//时间秒差(距离活动结束)
          } else {
            this.end = true
          }
        }
        let day = parseInt(timex/(24*3600))//天
        let hours = Math.floor(timex%(24*3600)/(3600))//小时
        let minutes= Math.floor(timex%(24*3600)%3600/60)//分钟
        let seconds = Math.floor(timex%(24*3600)%3600%60)//秒
        let _day = day,_hours = hours,_minutes = minutes,_seconds = seconds;
        if(timex<=0){
          that.changTime(0,0,0,0)
        }else{
          that.setInt = setInterval(function () {//倒计时算法
            if(_seconds>0){
              _seconds-=1
            }else{
              if(_minutes>0){
                _seconds = 59
                _minutes-=1
              }else{
                if(_hours>0){
                  _minutes=59
                  _hours-=1
                }else {
                  if(_day>0){
                    _day-=1
                    _hours=23
                    _minutes=59
                  }else{
                    clearInterval(that.setInt)
                    _hours=0
                    _minutes=0
                    _seconds=0
                  }
                }
              }
            }
            that.changTime(_day,_hours,_minutes,_seconds)//读取时间
          },1000)
        }
      },
      changTime(day,hours,minutes,seconds){
        let that = this
        if(day<10){
          that.times.day = '0'+day
        }else{
          that.times.day = day
        }
        if(hours<10){
          that.times.hour = '0'+hours
        }else{
          that.times.hour = hours
        }
        if(minutes<10){
          that.times.m = '0'+minutes
        }else{
          that.times.m = minutes
        }
        if(seconds<10){
          that.times.s = '0'+seconds
        }else{
          that.times.s = seconds
        }
      },
    },
    beforeDestroy(){
      let that = this
      clearInterval(that.setInt)
    },
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/reset.scss";
  .zerobuyweek{
    height: 100%;
    .seven-head {
      height: 55*$r;
      background-color: #ffebad;
      padding-top: 11*$r;
      &-con {
        height: 33*$r;
        background: url("../../assets/img/regsktea.png") no-repeat;
        background-size: contain;
        background-position: center center;
        &-time{
          color: #ff706b;
          width: 95%;
          height: 33*$r;
          line-height: 33*$r;
          margin: 0 auto;
          .span{
            color:#000000;
            margin-left: 49%;
          }
          .span1{
            margin-left: 1%;
          }
          .span2{
            color:#000000;
            margin-left: 0;
          }
          .ss{
            margin: 0 0.5%;
            font-size: 14px;
          }
        }
        &-ending{
          background: url("../../assets/img/cending.png") no-repeat;
          background-size: contain;
          background-position: center center;
        }
        &-end{
          /*background: url("../../assets/img/cyend.png") no-repeat;*/
          /*background-size: contain;*/
          /*background-position: center center;*/
        }
      }
    }
    &-back{
      height: 1516*$r;
      background: url("../../assets/img/zerobuyzt.jpg") no-repeat;
      background-size: 100% 100%;
      &-top{
        height: 414*$r;
        position: relative;
        &-btn{
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          @include flex-space;
          .item{
            height: 84*$r;
            width: 36.5%;
            border-radius: 40*$r;
            text-align: center;
            line-height: 84*$r;
            font-size: 26*$r;
          }
          .item:nth-child(2){
            margin-right: 9%;
            background-color: #e54229;
            color: #ffffff;
            background: url("../../assets/img/zebuybtnbac.png") no-repeat;
            background-size: 100% 100%;
          }
          .item:nth-child(1){
            margin-right: 0;
            margin-left: 9%;
            background-color: #ffffff;
            color: #e54229;
          }
        }
      }
      &-center{
        height: 788*$r;
        position: relative;
        overflow: hidden;
        ul{
          display: block;
          height: 86%;
          width: 90%;
          margin: 0 auto;
          margin-top: 15%;
          @include flex-space;
          flex-wrap: wrap;
          li{
            width: 50%;
            height: 50%;
            position: relative;
            .proimg{
              display: block;
              margin: 0 auto;
              width: 236*$r;
              height: 236*$r;
            }
            .progress{
              position: absolute;
              top: 182*$r;
              left: 0;
              right: 0;
              margin: 0 auto;
              width: 80%;
              .faster-progress-color{
                margin: 0 auto;
                width: 80%;
                height: 20*$r;
                margin-top: 6*$r;
              }
              &-text{
                font-size: 20*$r;
                color: #898989;
                @include flex-space;
                margin: 0 auto;
                width: 80%;
              }
            }
            .btn{
              width: 202*$r;
              height: 56*$r;
              line-height: 56*$r;
              text-align: center;
              border: solid 1px #f97683;
              color: #f97683;
              border-radius: 34*$r;
              margin: 0 auto;
              margin-top: 10*$r;
            }
          }
          li:nth-child(4){
            .proimg{
              margin-top: 10*$r;
            }
          }
        }
      }
    }
  }
</style>
