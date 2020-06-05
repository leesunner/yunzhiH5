<template>
  <div class="detail">
    <h2 v-title="'佣金明细'"></h2>
    <header>
      <span>日期</span>
      <span>用户名</span>
      <span>金额(￥)</span>
      <span>来源</span>
      <span>佣金(￥)</span>
    </header>

    <ul class="time">
      <!-- <li class="time-left">
        <h3 ref="currentMonth">本月</h3>
        <p>累计佣金：{{timeCount | timeCount}}（元）</p>
      </li> -->
      <li class="time-right">
        <img src="../../assets/img/yjdate.png" alt="" @click="type=true">
      </li>
    </ul>
    <ul class="content"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="{usernum}">
      <li v-for="(item,index) in list" :key="index">
        <div class="data">
          <p>{{item.ctime}}</p>
          <!-- <p>{{item.ctime}}</p> -->
        </div>
        <span class="mobile">{{item.friend_user_name | mobile}}&nbsp;</span>
        <span class="money">{{item.amount}}&nbsp;</span>
        <span class="code">{{item.desc}}</span>
        <span class="msg" v-if="item.inc_dec==1">+{{item.commission}}</span>
        <span class="msg" v-if="item.inc_dec==2">-{{item.commission}}</span>
      </li>
    </ul>
    <p class="btm"  v-if="!hasNextPage">没有更多了</p>

    <div class="fog" ref="fog" v-if="type">
      <div class="box">
        <ul class="comfir">
          <li  @click="type=false">取消</li>
          <li  @click="areaTime()">确认</li>
        </ul>
        <p class="date">开始时间</p>
        <datetime-view v-model="value1" ref="datetime" :format="format"></datetime-view>
        <p class="date">结束时间</p>
        <datetime-view v-model="value2" ref="datetime" :format="format"></datetime-view>
      </div>

    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {

        list:[],//信息集合
        //日期选择器
        format: 'YYYY-MM-DD',
        value1:'',//开始时间
        value2:"",//结束时间
        type:false,
        current:"",//当前时间
        hasNextPage:'',//是否有下一页
        timeCount:"",////范围内收入 默认本月
        //日期选择器
        loading:false,
        page:'0',
        usernum:"10",
        limit:"10",

      }
    },
    created() {
      // this.getCode();
      this.getclean();
    },
    methods:{
      getDate(){//时间选择
        this.type=true;
        this.xzType=true;
      },
      getCode(){//获取参数
        const that =this;
        this.$axios.get("/UserCommission/userLog?version=v2",{params:{
            stime:that.value1,//开始时间
            etime:that.value2,//结束时间
            limit:that.limit,
            page:that.page,
            type:1
          }}).then(function (res) {
          if(res.data.code==200){
            that.timeCount=res.data.data.timeCommission;
            that.hasNextPage=res.data.data.hasNextPage;
            if(that.hasNextPage == 1){
              that.list=that.list.concat(res.data.data.list);
              that.loading=false;
            }else{
              that.list=that.list.concat(res.data.data.list);
              that.loading=true;
            }
            // console.log( that.list)
          }else{
            that.$vux.toast.text(res.data.msg);
          }
        })


      },
      areaTime(){
        const that =this;
        that.page=1;
        this.$refs.currentMonth.innerHTML="合计"
        this.$axios.get("/UserCommission/userLog?version=v2",{params:{
            stime:that.value1,//开始时间
            etime:that.value2,//结束时间
            limit:that.limit,
            page:that.page,
            type:1
          }}).then(function (res) {
          if(res.data.code==200){
            that.list = [];
            that.timeCount=res.data.data.timeCommission;
            that.hasNextPage=res.data.data.hasNextPage;
            that.list=that.list.concat(res.data.data.list);
            that.loading=false;
            that.type=false;
          }else{
            that.$vux.toast.text(res.data.msg);
          }
        })},
      loadMore(){//上拉触发事件
        this.loading=true,
          this.page++;console.log(this.page)
        this.getCode();

      },
      getclean(){//初始化日历起始时间为当前月第一天
        // this.type=true;
        let Data=new Date();
        // let myData=new Date(Data.getFullYear(),Data.getMonth(),1).toString();
        var year = Data.getFullYear().toString();
        var month =(Data.getMonth()+1).toString();
        var dateTime = year + "-" + month + "-" + "1";
        this.value1=dateTime;
      }

    },
    filters: {
      mobile:function (val) {
        if(val){
          let portion=val.substring(3,7);
          return val.replace(portion,"****")
        }
      },
      timeCount:(Val)=>{
        if(!Val){
          return "0"
        }else{
          return Val.toFixed(2);
        }
      }
    },
    watch: {
      value1:function(newVal,oldVal){
        this.current=newVal;
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/css/reset";
  .detail{
    width: 100%;font-family:PingFang SC;background: #f0f0f0;min-height:100%;
    header{
      width: 100%;height: getREM(70);background: #fff;
      border-bottom: 2px solid #d9d9d9;
      span{
        font-size:getREM(24);line-height: getREM(70);
      }
      span:nth-child(1){
        padding:0 getREM(70) 0 getREM(75);

      }
      span:nth-child(2){
        padding:0 getREM(55) 0 getREM(48);

      }
      span:nth-child(3){
        padding:0 getREM(0) 0 getREM(25);

      }
      span:nth-child(4){
        padding-right:getREM(18);
        padding-left:getREM(38);

      }
      span:nth-child(5){
        padding-left:getREM(38);

      }
    }
    .time{
      width: 100%;height: getREM(80);background: #f0f0f0;
      .time-left{
        width: getREM(610);
        float: left;

        h3{
          margin-left: getREM(40);
          height: getREM(40);
          font-size: getREM(24);
          line-height: getREM(32.2)
        }
        p{
          height: getREM(40);
          font-size: getREM(20);
          line-height: getREM(32.2);
          margin-left: getREM(40);    color:#aaa9a9;
        }

      }
      .time-right{
        float: right;
        padding-right: 55*$r;
        img{
          vertical-align: middle;
          width: getREM(35);
          height: getREM(33);
          margin-top:getREM(20);
        }
      }
    }
    .content{
      width: 100%;background: #fff;
      li{
        width: 100%;border-bottom: 2px solid #f0f0f0;height: getREM(80);
        color: #5a5858;
        .data{
          float: left;
          p{
            width: getREM(200);text-align:center;line-height: getREM(80);
            font-size: 22*$r;
          }
        }
        span{
          line-height: getREM(80);
          // margin:0 getREM(30);
          text-align: center;
          float: left;
          font-size: 22*$r;

        }
        .mobile{
          width: 185*$r;
          overflow: hidden;
        }
        .money{
          width: 120*$r;

        }
        .code{
          width: 115*$r;
          overflow: hidden;
          // white-space: nowrap;
          // text-overflow: ellipsis;
        }
        .msg{
          width: 125*$r;
        }

      }
    }
    .btm{
      text-align: center;margin:getREM(24);
    }
    .fog{

      min-height: 100% !important;
      // overflow: hidden;
      position: absolute;
      top:0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba($color: #797777, $alpha: 0.3);
      z-index: 9;
      .box{
        height: getREM(1150);
        background: #fff;
        position: absolute;
        top:150*$r;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 999;
        .comfir{
          li{
            float: left;
            width: 50%;
            text-align: center;
            height: getREM(85);
            line-height: getREM(85);
            color: #ff9933;
            font-size: getREM(30);
            font-weight: 600;
            border-bottom: 1px solid #f0f0f0;
          }
        }
      }
      .date{
        text-align: center;
        font-size: getREM(26);
        color: #797777;

      }
    }
  }
</style>


