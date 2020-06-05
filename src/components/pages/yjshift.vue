<template>
  <div class="shift">
    <h2 v-title="'转入积分明细'"></h2>
    <ul class="top">
      <li >申请时间</li>
      <li>转入积分(个)</li>
      <li>审核状态</li>
    </ul>
    <ul class="time">
      <li class="time-left">
        <h3 ref="currentMonth">本月</h3>
        <p>提积分：{{timeCount || 0}}（个）</p>
      </li>
      <li class="time-right">
        <img src="../../assets/img/yjdate.png" alt="" @click="type=true,getclean()">
      </li>
    </ul>
    <ul class="content" v-for="(item,index) in list" :key="index"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="{usernum}">
      <li>
        {{item.ctime}}
      </li>
      <li>
        {{item.amount}}
      </li>
      <li v-if="item.status == 1" style="color:#333333">
        {{item.status | codeType}}
      </li>
      <li v-if="item.status == 2" style="color:#0b9218">
        {{item.status | codeType}}
      </li>
      <li v-if="item.status == 3" style="color:red">
        {{item.status | codeType}}
      </li>
    </ul>
    <div class="fog" ref="fog" v-if="type">
      <div class="box">
        <ul class="comfir">
          <li  @click="type=false,xzType=false">取消</li>
          <li  @click="areaTime()">确认</li>
        </ul>
        <p class="date">开始时间</p>
        <datetime-view v-model="value1" ref="datetime" :format="format"></datetime-view>
        <p class="date">结束时间</p>
        <datetime-view v-model="value2" ref="datetime" :format="format"></datetime-view>
      </div>

    </div>
    <p class="btm"  v-if="!hasNextPage">没有更多了</p>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        list:[],
        loading:false,
        format: 'YYYY-MM-DD',
        page:'1',
        usernum:"10",
        limit:"10",
        timeCount:"",////范围内收入 默认本月
        hasNextPage:'',//是否有下一页
        format: 'YYYY-MM-DD',
        value1:'',//开始时间
        value2:"",//结束时间
        type:false,
      }
    },
    created () {

    },
    mounted () {
      this.getCode();
      this.getclean();
    },
    methods:{
      getCode(){//获取参数
        const that =this;
        this.$axios.get("/UserCommission/extractList?version=v2",{params:{
            stime:that.value1,//开始时间
            etime:that.value2,//结束时间
            limit:that.limit,
            page:that.page,
            type:1
          }}).then(function (res) {
          console.log(res.data);
          if(res.data.code==200){
            that.timeCount=res.data.data.timeAmount;
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
        this.$axios.get("/UserCommission/extractList?version=v2",{params:{
            stime:that.value1,//开始时间
            etime:that.value2,//结束时间
            limit:that.limit,
            page:that.page,
            type:1
          }}).then(function (res) {
          if(res.data.code==200){
            that.list = [];
            console.log(res.data.data)
            that.timeCount=res.data.data.timeAmount;
            that.hasNextPage=res.data.data.hasNextPage;
            that.list=that.list.concat(res.data.data.list);
            that.loading=false;
            that.type=false;
          }else{
            that.$vux.toast.text(res.data.msg);
          }
        })},
      loadMore(){//触发无限滚动函数
        this.loading=true,
          this.page++;console.log(this.page)
        this.getCode();
      },
      getclean(){//初始化日历起始时间为当前月第一天
        let Data=new Date();
        // let myData=new Date(Data.getFullYear(),Data.getMonth(),1).toString();
        var year = Data.getFullYear().toString();
        var month =(Data.getMonth()+1).toString();
        var dateTime = year + "-" + month + "-" + "1";
        this.value1=dateTime;
      }

    },
    filters: {
      codeType:(Val)=>{
        console.log(Val)
        if(Val == 1){
          return "待审核"
        }else if(Val == 2){
          return "审核通过"
        }else if(Val == 3){
          return "未通过"
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/css/reset";
  .shift{
    width:100%;
    font-family:PingFangSC-Regular, sans-serif;
    min-height:100%;
    background: #f0f0f0;
    .top{
      background: #fff;
      width: 100%;
      height:getREM(80);
      border-bottom: 2px solid #f0f0f0;font-size: getREM(22);
      li{
        width: 33.3%;float: left;text-align: center;line-height: getREM(80);
        font-weight:600;
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
      width: 100%;
      height:getREM(80);background: #fff;
      border-bottom: 2px solid #f0f0f0;font-size: getREM(22);
      li{
        width: 33.3%;float: left;text-align: center;line-height: getREM(80);

      }
    }
    .btm{
      width: 100%;text-align: center;margin:getREM(24) 0;
    }
    .fog{
      // height:100%;
      min-height: 100% !important;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba($color: #797777, $alpha: 0.3);
      z-index: 9;overflow: hidden;
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

