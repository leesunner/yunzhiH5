<template>
  <div class="record">
      <h2 v-title="'邀请记录'"></h2>
      <header>
        <span>日期</span>
        <span>用户名</span>
        <span>状态</span>
      </header>
      <ul class="time">
          <li class="time-left">
            <h3 ref="currentMonth">本月</h3>
            <p>总人数：{{timeCount}}（人）</p>
          </li>
          <li class="time-right">
            <img src="../../assets/img/yjdate.png" alt="" @click="getDate()">
          </li>
      </ul>

        <ul class="content" v-if="list"
          v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="{usernum}"
                            >
          <li v-for="(item,index) in list" :key="index" >
              <span class="data">{{item.ctime}}</span>
              <span class="mobile">{{item.friend_username | mobile}}</span>
              <span class="code" v-if="item.status == 1" style="color:#000">{{statusNum(item.status)}}</span>
              <span class="code" v-if="item.status == 2" style="color:#d20909">{{statusNum(item.status)}}</span>
              <span class="code" v-if="item.status == 3" style="color:#0b9218">{{statusNum(item.status)}}</span>
          </li>
        </ul>
      <p class="gd" v-if="!hasNextPage">没有更多了</p>
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

  </div>
</template>
<script>
export default {
    data(){
      return{
        type:false,
        xzType:false,
        list:[],//参数集合
        hasNextPage:'',//是否有下一页
        timeCount:"",//总人数
        //日期选择器
         format: 'YYYY-MM-DD',
         value1:'',//开始时间
         value2:"",//结束时间
         loading:false,
         page:'0',
         usernum:"10",
         limit:"10",

      }
    },
    created() {
      // this.getCode();

    },
    mounted() {
       this.getclean();
    },
    methods:{
        getDate(){//时间选择
            this.type=true;

        },
        getCode(){//获取参数
          const that =this;

                      this.$axios.get("/UserCommission/userInvite?version=v2",{params:{
                stime:that.value1,//开始时间
                etime:that.value2,//结束时间
                limit:that.limit,
                page:that.page
          }}).then(function (res) {
            console.log(res.data);
            if(res.data.code==200){
                  that.timeCount=res.data.data.timeCount;
                  that.hasNextPage=res.data.data.hasNextPage;

                if(that.hasNextPage == 1){
                  that.list=that.list.concat(res.data.data.list);
                  that.loading=false;
                }else{
                     that.list=that.list.concat(res.data.data.list);
                   that.loading=true;
                }
                console.log( that.list)

            }else{
               that.$vux.toast.text(res.data.msg);
            }
          })


        },
        areaTime(){
            const that =this;
            that.page=1;
            this.$refs.currentMonth.innerHTML="合计";
            this.$axios.get("/UserCommission/userInvite?version=v2",{params:{
                stime:that.value1,//开始时间
                etime:that.value2,//结束时间
                limit:that.limit,
                page:that.page
          }}).then(function (res) {
            if(res.data.code==200){
                   that.list = [];
                   console.log(res.data.data)
                  that.timeCount=res.data.data.timeCount;
                  that.hasNextPage=res.data.data.hasNextPage;
                that.list=that.list.concat(res.data.data.list);
                 that.loading=false;
                  that.type=false;
            }else{
               that.$vux.toast.text(res.data.msg);
            }
          })
              // if(that.value1 && that.type==true){
              //       that.list = [];
              //       that.list=that.list.concat(res.data.data.list);
              //       that.type=false;

              //       return ""

              //   }
        }
        ,
         loadMore(){
          this.loading=true,
          this.page++;console.log(this.page)
          this.getCode();


        },
        statusNum(status){
          if(status == 1){

            return '未注册'
          }else if(status == 2){

            return '未消费'
          }else if(status == 3){

            return '已消费'
          }
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

      }
    }
}
</script>
<style lang="scss" scoped>
@import "../../assets/css/reset";
.record{
  width: 100%;font-family:PingFang SC;background: #f0f0f0;
 min-height:100%;
  header{
    width: 100%;height: getREM(70);border-bottom: 2px solid #dcdcdc;background: #fff;
    span{
      font-size:getREM(24);font-weight: 600;line-height: getREM(70);
    }
    span:nth-child(1){
      padding: 0 getREM(165) 0 getREM(124);
    }
    span:nth-child(2){
       padding-right: getREM(200);
    }
    span:nth-child(3){
       padding-right: getREM(51);
    }
  }
  .time{
    width: 100%;height: getREM(80);background: #f0f0f0;
    .time-left{
      width: getREM(510);
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
         margin-left: getREM(40);
          color:#aaa9a9;
      }

    }
    .time-right{
      float: right;

      img{
         vertical-align: middle;
         width: getREM(35);
         height: getREM(33);
         margin-top:getREM(20);
         margin-right: getREM(90)
      }
    }
  }
  .content{

    width:100%;background: #fff;

    height: 100%;
  // max-height: 600*$r;

    // overflow: hidden;
    li{
      height: getREM(76);border-bottom: 3px solid #f0f0f0;
      line-height: getREM(76);color:#333;font-size:getREM(21);

      span{
        float: left;
        text-align: center;
      }
      .data{
       width: 33%
      }
      .mobile{
        width: 33%
      }
      .code{
        width: 24%;
        margin-left: 7.5%;
      }
    }
  }
  .gd{
    width: 100%;text-align: center;margin:getREM(19) 0;
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
          top:150*$r;
          height: getREM(1150);
         background: #fff;
        position: absolute;
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

