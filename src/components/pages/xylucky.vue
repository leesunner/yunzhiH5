<template>
    <div class="lucky">
        <h2 v-title="'幸运计算公式'"></h2>
        <div class="top">
            <div class="hjmobile">
              <p>获奖</p>
              <p>号码</p>
            </div>
            <p class="dh">=</p>
            <ul class="top-content">
              <div>
                <span>数值&nbsp;</span><span class="span">A</span>&nbsp;<span>+ 数值 </span>&nbsp;<span class="span">B</span>
              </div>
              <p>奖品所需人次</p>
              <p>(取余数)</p>
            </ul>
            <div class="top-right">
              <span>+</span>100001
            </div>
        </div>
        <ul class="sion">
          <li class="sionl1">
            <p class="sionTop">数值A</p>
            <p>=	截止该商品开奖时间点前最后100条全站参与记录</p>
            <p>=	<span class="yellow">{{detail.time_total}}</span>
            <img src="../../assets/img/xyarrows.png" alt="">
              <span class="span"  @click="go(falg)">展开</span>

            </p>
          </li>
          <ul class="zkTop" v-if="falg">
            <li class="zkyh">参与时间</li>
            <li class="zkyh">用户</li>
            <div v-for="(item,index) in list" :key="index">
              <li>{{item.ptime_date}}<span>{{item.ptime_time}}</span></li>
              <li>{{item.nickname}}</li>
            </div>
          </ul>
          <li class="sionl2">
            <p class="sionTop">数值B</p>
            <p>=	最近一期中国福利彩票“老时时彩”<span style="color:#e8330f">(欢乐生肖)</span>的开奖结果</p>
            <p>=	<span class="yellow" ref="result" v-if="detail.publish_expect">{{detail.publish_code || '正在等待开奖'}}&nbsp;</span>
                  <span class="yellow" ref="result" v-if="detail.publish_expect == null">{{detail.publish_code == "00000"?detail.publish_code :"00000"}}&nbsp;</span>
                  <span v-if="detail.publish_expect">（第{{detail.publish_expect}}期）</span>&nbsp;
                  <a class="bquery" @click="openUrl()">开奖查询</a>
                  <!-- @click="$router.push({name: 'luckyquery', params: {id: id}})" -->
                  </p>
          </li>
          <!-- <li class="notice">
            <h4>重大通知：</h4>
            <p>根据重庆时时彩官方消息，“重庆时时彩”将更名为“欢乐生肖”。目前重庆时时彩<span>官方在调整新玩法的数据，近期不开奖。</span></p>
            <p>平台内时时彩开奖将默认取“老时时彩”<span>开奖结果00000</span>，实时开奖</p>
          </li> -->
        </ul>
        <ul class="content">
          <li class="h3">老时时彩规则如下：</li>
          <li>
            (<span>1</span>)23:00到上午8:00，由于老时时彩不开奖，默认“老时时彩开奖结果”为“00000”，即数值B=00000；(如该时间段老时时彩开奖，则取老时时彩数据)
          </li>
          <li>
            (<span>2</span>)如遇福彩中心通讯故障，无法获取“老时时彩”开奖结果，最后一个号码分配时间距离故障时间大于24小时，
              亦默认“老时时彩”开奖结果为00000；
          </li>
          <li>
            (<span>3</span>)最后一个兑换号认购时间距离“老时时彩”最近下一期开奖大于24小时，默认“老时时彩”开奖结果为00000
          </li>
        </ul>
        <div class="bod"></div>
        <div class="hjhm">
            <h3>计算结果</h3>
            <p class="p">获奖号码:
              <span ref="hjnum">{{winner_code || "正在等待开奖"}}</span>
            </p>
            <ul class="hj-bottom" v-show="detail.winner_code">
              <li class="hj-li1">
                <p class="p1">{{detail.time_total}} + <span class="hjred">{{ detail.publish_code || "00000"}}</span></p>
                <p class="p2">{{detail.join_re}}</p>
                <p class="p3">(余数:  <span class="hjred">{{detail.mod}}</span>)</p>
              </li>
              <li class="hj-right">
                 <span>+ {{detail.base_num}} = </span><span class="hjred">&nbsp;{{detail.winner_code}}</span>
              </li>
            </ul>
        </div>
        <div class="bod"></div>
        <ul class="rule">
          <h3>注意</h3>
          <li>1. 最后一个兑换号认购时间距离“老时时彩”最近下一期开奖大于24小时，默认“老时时彩”开奖结果为 00000；</li>
          <li>2. 夜间非“老时时彩”	开奖时间段，默认“老时时彩”开奖结果为 00000；</li>
          <li>3. 如遇福彩中心通讯故障，无法获取“老时时彩”开奖结果，最后一个号码分配时间距离故障时间大于24小时，亦默认“老时时彩”开奖结果为 00000。				</li>
        </ul>
    </div>
</template>
<script>
export default {
  data () {
    return {
      falg:false,
      detail:{
        publish_code:"",
        publish_expect:"",
      },//B值信息集合
      id:"",
      list:"",
      nickname:"",
      ptime_date:"",
      ptime_time:"",
      time_total:"",//100跳参与记录总和
      winner_code:"",//开奖号码
      publish_code:"",//时时彩开奖码
      idpush:"https://kjh.55128.cn/k/kjls/gpc-chongqingssc.html",//时时彩跳转地址
      lastTime:"",
      falg:"",
      appVersion: ''
    }
  },
  created () {
    // document.title="幸运码计算公式";
    let xyluckyId = sessionStorage.getItem('xyluckyId');
    if (xyluckyId) {
      this.id=xyluckyId
      this.gocode(this.id);
      sessionStorage.removeItem('xyluckyId')
    } else {
      this.id=this.$route.params.id;
      this.gocode(this.id);
    }
    this.appVersion = sessionStorage.getItem('appVersion');
  },
  mounted(){
    this.$nextTick(() => {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    })
  },
watch:{
    lastTime:function(newVal,oldVal){
      console.log(newVal)
      if(newVal != "" && (new Date() < new Date(newVal)) && this.lastTime != ""){
          // this.winner_code="正在等待开奖";
          // this.detail.publish_code ="正在等待开奖";
      }
    }
    // $route:{
    //   handler(val,oldval){
    //     console.log(val);//新路由信息
    //     console.log(oldval);//老路由信息
    //   },
    //   // 深度观察监听
    //   deep: true
    // }
  },
  methods:{
    gocode(id){
      var that=this;
      this.$axios.post("/goods/calculation?version=v2",{id:id}).then(function(res){
          console.log(res.data);
          if(res.data.code == 1){
              that.list=res.data.data.list;
              that.detail=res.data.data.detail;
              that.lastTime=res.data.data.last_time;
              that.winner_code=res.data.data.detail.winner_code;
          }else if(res.data.code == -3){
              window.history.go(-1)
          }
          else{
            that.$vux.toast.text(res.data.msg)
          }
      })
    },
    go(flag){
      this.falg=!flag
    },
    openUrl() {
      let that = this;
      if (that.appType == 'H5') {
        window.location.href = that.idpush;
      } else {
        if (that.appVersion == '1.0.9') {
          that.JsBridge.callHandler("honoredTime",that.idpush,function (res) {})
        } else {
          that.JsBridge.callHandler("payList",that.idpush, function (res) {});
          //window.location.href = that.idpush;
        }
      }
    }
  },


}
</script>

<style lang="scss" scoped>
@import "../../assets/css/reset";
.lucky{
  width: 100%;background-color: #fff;height: 100%;
  .top{
    width: 100%;background-color: #f7f7f7;font-size: getREM(25);
    overflow: hidden;;
    .hjmobile{
      width: getREM(100);
      height: getREM(100);
      float: left;
      color: #fff;
      background-color: #fb762b;
      margin:getREM(51) 0 getREM(49) getREM(64);
      border-radius: getREM(11);
      padding:getREM(14) 0;
      p{
        text-align: center;line-height: getREM(36);
      }
    }
    .dh{
      float: left;
      width: getREM(16);
      height: getREM(100);
      margin:getREM(51) getREM(10) 0 getREM(19);
      line-height: getREM(100);
    }
    .top-content{
      padding:getREM(5) 0;
      width: getREM(320);
      height: getREM(156);
      border: 2px dashed #acacac;
      border-radius: getREM(11);
      float: left;
      margin: getREM(20) 0;

      div{    display: flex;justify-content: center; align-items: center;
      font-size: getREM(26);
        width: 270*$r;
        margin: 0 getREM(21);
        text-align: center;
        height: getREM(52);
        line-height: getREM(52);
        border-bottom:2px solid #999;
        .span{
          display: inline-block;
          width: getREM(32);
          height:getREM(32) ;
          line-height:getREM(32) ;
          border-radius: 50%;
          color: #fff;
          background-color: #fb762b;
          border-radius: 999px;

        }
      }
      p{
          text-align: center;
        }
    }
    .top-right{
      height: getREM(156);
      margin: getREM(20) 0;
      float: left;
      line-height: getREM(156);
      color: #fb762b;
      font-size: getREM(30);
      span{
        padding:0 getREM(16) 0 getREM(24);
      }
    }
  }
  .sion{
    width: 100%;background-color: #fff;
    font-size: getREM(23);
    color: #666666;
    li{
      width: 100%;
      // height: getREM(35);
      line-height: getREM(38);
      padding-left:getREM(19);
      .span{
        float: right;
        color: #1795e9;

        font-weight: 700;
        line-height: getREM(50)

      }
      img{
          vertical-align: middle;float: right;margin-right: getREM(50);
          width:getREM(14);height:getREM(24);margin-top:getREM(12);
        }
    }
    .yellow{
      color: #ff6633;font-weight: 700;
    }
    .sionTop{
      padding-top:8*$r;
    }
    .sionl1{
      border-bottom: 2px solid #f7f7f7;padding-top: getREM(5);padding-bottom: getREM(20);
    }
    .sionl2{
      .bquery{
        color:#1895e9;
      }
    }
    .notice{
      h4{
        color: #e8330f;
        font-weight: bold;
      }
      p{
        color: #000000;
        text-indent: 2em;
        span{
          color: #e8330f;
        }
      }
    }
    .zkTop{
      width: 100%;overflow: hidden;
      li{
        float: left;line-height: getREM(60);
      }

      .zkyh{
         border-bottom: 2px solid #f7f7f7;
         font-weight: 600;
         color: #1795e9 !important;
         font-size: getREM(26);
      }
      li:nth-child(1){
        // color: #919191;
        color: #acacac;
        width: 65% !important;

      }
      li:nth-child(2){
         width: 35% !important;
         overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
      }
    }
  }

  .content{
    margin: getREM(14) getREM(20);background-color: #fff1e9;
    color: #fb762b;
    padding: getREM(22);

    .h3{
          font-size: getREM(25);
          font-weight: 700;
        }
    li{
       font-size: getREM(23);
      line-height: getREM(38);
      span{
        font-weight: 600;
      }
    }
  }
  .bod{
    width: 100%;background-color: #f7f7f7;
    height: getREM(10);
    border-bottom: getREM(2)  solid #e3e3e3;
    border-top: getREM(2) solid #e3e3e3;
  }
  .hjhm{
    width: 100%;background-color: #fff; font-size: getREM(22);margin-bottom: getREM(18);
    h3{
     font-weight: 700;text-align: left;margin-left: getREM(19);
     line-height: getREM(37);
     margin-top:getREM(10);
     color: #676767;


    }
    .p{
        text-align: center;padding-bottom: getREM(20);
        span{color: #fb762b; margin-left: getREM(17)};
         color: #737373;
         font-weight: 600;
         font-size: getREM(26);
      }
      .hj-bottom{
        height: getREM(154);
        width: getREM(528);
        border: 3px dashed #fb762b;
        border-radius: getREM(14);
        padding-top:getREM(6);
        padding-left: getREM(33);
        margin: auto;
        .hj-li1{
          // width: getREM(240);

        }
        li{
          float: left;
          .p1{
            // width: getREM(240);
            line-height: getREM(35);
            margin-top:getREM(14);
            border-bottom: 2px solid #999999;
          }
          .p2{
              width: getREM(232);
            text-align: center
          }
          .p3{
              width: getREM(232);
            text-align: center;
          }
        }
        .hj-right{
          // width: getREM(250);
          line-height: 100%;height: 100%;margin-left:getREM(10);
          span{

            margin-top:getREM(50);float: left;
          }
        }
        .hjred{
          color:#fb762b;

        }
      }
  }
  .rule{
    width: 100%;padding-left:getREM(26);box-sizing: border-box;font-size: getREM(24);padding-right:getREM(34);
    color:#676767;
    margin-bottom: 30*$r;
    h3{
      color:#676767;margin-top:getREM(26);font-weight: 600;padding-bottom:getREM(11);
      li{
        line-height: getREM(34);color: #959595;
      }
    }
  }

}

</style>

