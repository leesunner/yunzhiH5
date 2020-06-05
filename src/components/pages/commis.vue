<template>
  <div class="commis">
    <h2 v-title="'我的佣金'"></h2>
    <div class="top" v-if="accountList">
      <h2 >可用佣金（元）</h2>
      <p @click="gocheck('yjusable',{})" class="pone">{{accountList.amount || 0}}</p>
      <ul>
        <li @click="gocheck('yqrecord',{})">
          <p class="p-top" @click="gocheck('yqrecord',{})">邀请好友</p>
          <p class="p-bot">{{accountList.invite_num || 0}}</p>
        </li>
        <li @click="gocheck('yqdetail',{})">
          <p class="p-top" @click="gocheck('yqdetail',{})">累计佣金(元)</p>
          <p class="p-bot">{{accountList.total_amount || 0}}</p>
        </li>
      </ul>
      <div class="topBod"></div>
    </div>
    <ul class="content">
      <li @click="gocheck('yjinteg',{})">
        <img src="../../assets/img/zrjf.png" alt="">
        <p  >转入积分</p>
      </li>
      <li @click="gocheck('yjout',{})">
        <img src="../../assets/img/yjtx.png" alt="">
        <p >佣金提现</p>
      </li>
      <div class="bod"></div>
    </ul>
    <ul class="box">
      <li v-for="(item,index) in topList " :key="index" @click="gocheck(item.url,item.params,accountList.master_user_id)" >
        {{item.num}}
        <span v-if="accountList.master_user_id&&(item.url == 'yjmaster')">&nbsp;：&nbsp;{{accountList.master_user_id}}</span>
        <img v-if="!accountList.master_user_id&&(item.url == 'yjmaster')" src="../../assets/img/yjtz.png" alt="">
        <img v-else-if="(item.url != 'yjmaster')" src="../../assets/img/yjtz.png" alt="">
      </li>
    </ul>
    <ul class="btm">
      <li>
        <div class="share" @click="getyq()">
            <span>
              <img src="../../assets/img/jman.png" alt="">
               &nbsp;分享邀请链接
           </span>
        </div>
      </li>
    </ul>
    <share-view :data="data"></share-view>
  </div>
</template>
<script>
  import shareView from '../public/shareView'
  export default {
    components:{shareView},
    data(){
      return{
        flag:false,
        data:{},
        accountList:[],//上方用户佣金信息List
        topList:[
          {num:"邀请记录",url:"yqrecord",params:{}},
          {num:"佣金明细",url:"yqdetail",params:{}},
          {num:"提现明细",url:"yjdeposit",params:{}},
          {num:"转入积分明细",url:"yjshift",params:{}},
          {num:"活动规则",url:"yjrule",params:{}},
          {num:"邀请人ID",url:'yjmaster',params:{}},
        ]
      }
    },
    created () {
      this.getCode();
    },
    mounted () {

    },
    methods:{
      gocheck(url,params,userId){//跳转不同路由
        if(userId && url=="yjmaster"){//存在就不跳转填写
          return false
        }else{
          this.$router.push({name:url,params:params})
        }

      },
      getCode(){//获取上方用户佣金账户信息
        const that =this;
        this.$axios.get("/UserCommission/userInfo?version=v2").then(function(res) {
          // console.log(res.data);
          if(res.data.code == 200){
            if(res.data.data.status == 1){
              that.accountList=res.data.data.data;
            }
          }else{
            that.$vux.toast.text(res.data.msg);
          }
        })
      },
      getyq:function(){//分享好友
        var that = this;
        this.$axios.post('/site/sharecon?version=v2', {type: 5}).then(function (response) {
          if(response.data.code==1){
            // that.$vux.loading.show({text: '请稍候'});
            that.data = response.data.data
            // that.JsBridge.callHandler("share", response.data.data, function (responseData) {
            //   if (responseData == 'success') {
            //     // that.$vux.loading.hide();
            //   }
            // });
          }
        });
      },
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/css/reset";
  .commis{
    width:100%;height: 100%;
    font-family:PingFangSC-Regular, sans-serif;
    background: #f0f0f0;
    padding-bottom:getREM(98);
    .top{
      background: -moz-linear-gradient(top, #fc9828, #e15f08);
      background: -o-linear-gradient(top, #fc9828, #e15f08);
      background: -webkit-gradient(top, #fc9828, #e15f08);
      background: -webkit-linear-gradient(top, #fc9828, #e15f08);
      width: 100%;color:#fff;
      border-bottom: getREM(20) solid #f0f0f0;position: relative;
      h2{
        height: getREM(106);
        line-height: getREM(106);
        font-size: getREM(28);
        color: #fff;
        text-align: center;
        // font-weight: 600
      }
      .pone{
        font-size: getREM(70);
        height: getREM(128);
        text-align: center;
        line-height: getREM(100);
      }
      ul{
        width: 100%;overflow: hidden;
        padding-bottom: getREM(40);
        li{
          float: left;
          width: 50%;
          text-align: center;
          .p-top{
            width: 100%;font-size: getREM(25)
          }
          .p-bot{
            width: 100%;
            font-size: getREM(28);
            line-height: getREM(36)
          }
        }
      }
      .topBod{
        position: absolute;
        left: 49.5%;
        bottom:getREM(47);
        background: #fff;
        width: 3px;
        height: getREM(50);
      }
    }
    .content{
      width: 100%;border-bottom:getREM(20) solid #f0f0f0;overflow: hidden;background: #fff;
      position: relative;
      li{
        float: left;width: 50%;height: getREM(200);
        display: table-cell;text-align: center;height: getREM(200);
        img{
          margin-top:getREM(20);
          width:getREM(120);
          height: getREM(120);

        }
        p{
          font-size: getREM(24);
          color: #333;
          // margin-bottom:getREM(40);
          line-height: getREM(40)
        }
      }
      .bod{
        position: absolute;
        top:getREM(35);
        left: 49.5%;
        width: 2px;
        height: getREM(120);
        background: #ededed;
      }
    }
    .box{
      width: getREM(750);position: relative;background: #fff;overflow: hidden;
      li{
        font-size: getREM(24);
        border-bottom:2px solid #f0f0f0;height: getREM(80);color:#333;
        width: getREM(710);
        float: right;
        // font-weight: 700;
        line-height:  getREM(80);
        img{
          width: getREM(14);
          height: getREM(24);
          float: right;
          vertical-align: middle;
          margin: getREM(28) getREM(41) getREM(28) 0;
        }
      }
      li:nth-child(6){
        border-bottom:0;
        span{
          color: #999999;
        }

      }

    }
    .btm{
      width: 100%;position: fixed;bottom: 0;right: 0;color:#fff;
      li{
        float: left;width: 100%;height: getREM(98);line-height:  getREM(98);display: table-cell;text-align: center;vertical-align: middle;
        font-size: getREM(28);
        .share{
          background-color: #f88e2a;
          span{
            position: relative;
            line-height:  getREM(98);img{
            position: absolute;
            left: 0;top: getREM(3);margin-left: getREM(-32);
          }
          }
        }
        .face{
          background-color: #f88e2a;
          span{
            position: relative;
            line-height:  getREM(98);img{
            position: absolute;
            left: 0;top: getREM(3);margin-left: getREM(-32);
          }
          }
        }
        img{
          width:getREM(32);
          height: getREM(32);
          text-align:top getREM(37);vertical-align: middle;


        }
      }
    }
    .shade{
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: rgba($color: #6c6c6c, $alpha: 0.7);
      .shadeBox{
        position: absolute;
        width: getREM(556);
        height: getREM(720);
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
      }
    }
    .yjcha{
      width: getREM(48);
      height: getREM(48);
      position: absolute;
      left: 0;
      // top: 63%;
      right: 0;
      bottom: 210*$r;
      margin: auto;
    }
  }
</style>

