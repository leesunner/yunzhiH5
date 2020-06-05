<template>
  <div class="buyPay">
    <div class="buyPay-con">提交成功,只差一步就购买成功啦！</div>
    <div class="buyPay-form">
      <img :src="data.pics"/>
      <div class="buyPay-form-ind">
        <p>{{data.name}}</p>
        <div class="buyPay-form-ind-text">
          <span class="color">赠送{{data.coin}}积分</span>
        </div>
      </div>
    </div>
    <div class="buyPay-bullet">
      <div class="buyPay-bullet-item">
        <p>应付金额</p>
        <div class="buyPay-bullet-item-right">
          <span class="color">{{data.price}}元</span>
        </div>
      </div>
    </div>
    <div class="buyPay-title">
      <span>选择支付方式</span>
      <span class="color">需要支付{{data.price}}元</span>
    </div>
    <div class="buyPay-account-con">
      <div class="buyPay-account" v-for="(item,index) in paylist" @click="choosen=index" :key="index">
        <div>
          <img :src="item.pic"/>
          <span>{{item.name}}</span>
        </div>
        <img :src="choosen===index?require('@/assets/img/ads-choosed.png'):require('@/assets/img/ads-choose.png')" v-if="!item.operate"/>
        <div style="display: flex;color: #f36c12" v-else
          v-clipboard:copy="item.operate" v-clipboard:success="onCopy" v-clipboard:error="onError">
          {{item.operate}} <img src="../../assets/img/yjtz.png" style="width:0.2rem;height:0.4rem;margin:0 0 0 0.4rem;"/>
        </div>
      </div>
    </div>
    <div class="buyPay-btn" @click="submit">确认购买</div>
    <!--支付成功弹窗-->
    <div class="buyPay-upView" v-show="payControl">
      <div :class="{'buyPay-upView-con':true,'show':payControlItem}">
        <div class="buyPay-upView-con-text">
          <img src="../../assets/img/exchangicon.png" v-if="coin"/>
          <img src="../../assets/img/sfs515.png" v-else/>
          <p>{{coin?'支付成功':'支付失败'}}</p>
          <p>{{coin?coin+'积分已到账':'如果未完成支付请重新支付'}}</p>
        </div>
        <img src="../../assets/img/gamsecloses.png" class="buyPay-upView-con-close" @click="payControl=!payControl,payControlItem=!payControlItem"/>
        <div class="buyPay-upView-con-btn" v-if="coin">
          <div @click="navigateTo('accountDetails')">充值记录</div>
          <div @click="navigateTo('type')">立即兑换</div>
        </div>
        <div class="buyPay-upView-con-btn" v-else>
          <div @click="getQQ">联系客服</div>
          <div @click="goContin">继续支付</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "exchang-pay",
    data(){
      return{
        choosen:0,
        payId:'',
        data:{},
        coin:'',
        dataPay:{},//兑换页面数据对象
        paylist:[],//支付列表
        coupons:[],
        payControl:false,
        payControlItem:false,
        sechargId:'',
        dataQQ:{
          qqCode:'',
          key:1
        },
      }
    },
    computed:{
      ...mapGetters([
        'getTicket'
      ])
    },
    created(){
      let that =this
      this.data = JSON.parse(this.$route.query.datas)
      if(this.appType!='H5') {//嵌入app时支付
        this.JsBridge.registerHandler("payResult", function (res) {
          //这里回调充值结果
          that.getPayResult()
        });
        this.getMsg()
      }else{
        let payResult =sessionStorage.getItem('payResultPage')
        if(payResult){
          let data = JSON.parse(payResult)
          that.$vux.loading.show({text: '支付中,请稍候'});
          sessionStorage.removeItem('payResultPage')//完成后删除缓存
          //这里回调充值结果
          that.getPayResult(data.regID)
        }else{
          this.getMsg()
        }
      }
    },
    methods:{
      getQQ(){
        let that = this
        that.dataQQ.qqCode = sessionStorage.getItem('QQ')
        if(this.appType=='H5'){//qq群
          window.location.href = 'https://pt.im/lq666666'
          // window.location.href = '//shang.qq.com/wpa/qunwpa?idkey=96288d511555e9906f6494bc0b3e5337634894388afa1f3f687a60cb9a87cafd'
        }else{
          //调取ios提供的方法
          let url = sessionStorage.getItem('potato');
          this.JsBridge.callHandler("potatoHandler", url, res=>{});
          // this.JsBridge.callHandler("qqHandler", that.josnStr(that.dataQQ), res=>{});
        }
      },
      goContin(){
        this.submit()
        setTimeout(function () {
          this.payControl=false
          this.payControlItem = false
        },30)
      },
      josnStr(data){
        return JSON.stringify(data)
      },
      getPayResult(val){//轮询支付结果
        let regId = ''
        if(!val){
          regId = this.sechargId
        }else{
          regId = val
        }
        let that = this
        let num = 0
        let patSet = setInterval(function () {
          this.$axios.post('/recharge/confirmPay?version=v2',{
            'recharge_order_id':regId
          }).then(res=>{
              num+=1
              if(res.data.code===1){
                that.$vux.loading.hide();
                that.coin = res.data.data.coin
                that.payControl = true
                setTimeout(function () {
                  that.payControlItem = true
                  that.getMsg()
                },30)
                clearInterval(patSet)
              }else{
                if(num>2){//4.5s
                  that.$vux.loading.hide();
                  that.payControl = true
                  setTimeout(function () {
                    that.payControlItem = true
                    that.getMsg()
                  },30)
                  clearInterval(patSet)
                }
              }
            }
          )
        }.bind(this),1500)
      },
      submit(){
        let that = this
        for(let i=0;i<this.paylist.length;i++){
          if(this.choosen==i){
            this.payId=this.paylist[i].payment_id
          }
        }
        if(!this.payId){
          this.$vux.toast.text('请选择一种支付方式')
          return
        }
        this.$axios.post('/recharge/createOrder?version=v2',{
          'Order[recharge_goods_id]': that.data.recharge_goods_id,
          'Order[pay_type]':this.payId,
        }).then((res)=>{
          if(res.data.code===1){
            this.sechargId = res.data.data.recharge_order_id//订单ID
            if(this.appType!='H5'){//嵌入app时支付
              that.$vux.loading.show({text: '支付中,请稍候'});
              this.JsBridge.callHandler("payList",res.data.data.url, function (res) {});
            }else{
              this.navigateTo('payGoodsMoney',{url:res.data.data.url,regID:that.sechargId})
            }
          }else{
            this.$vux.toast.text(res.data.msg)
          }
        })
      },
      getMsg(){
        let platform = 'h5'
        let type = 3
        if(this.appType !='H5'){
          if(this.getPhoneType()=='ios'){
            platform = 'iOS'
            type = 4
          }else{
            platform = 'Android'
            type = 5
          }
        }
        this.$axios.post('/site/payment?version=v2',{type:type,'fromin':this.$channel,'platform':platform}).then((res)=>{
          if(res.data.code===1){
            this.paylist = res.data.data.list
          }else{
            this.$vux.toast.text(res.data.msg)
          }
        })
      },
      onCopy: function (e) {
        this.$vux.toast.text("复制成功");
      },
      onError: function (e) {
        this.$vux.toast.text("复制失败");
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/reset.scss";
  .buyPay{
    &-con{
      padding: 19*$r 30*$r 20*$r 30*$r;
      font-family: 'PingFang-SC-Regular';
      font-size: 22*$r;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 1.7px;
      color: #999999;
    }
    &-form{
      height: 160*$r;
      @include flex-space;
      justify-content: flex-start;
      width: 100%;
      font-size: 24*$r;
      background-color: #ffffff;
      color: #4a4a4a;
      margin-bottom: 10*$r;
      img{
        width: 136*$r;
        height: 136*$r;
        margin-left: 30*$r;
        margin-right: 30*$r;
      }
      &-ind{
        width: 100%;
        height: 160*$r;
        padding-top: 26*$r;
        padding-right: 30*$r;
        &-text{
          color: #999999;
          margin-top: 34*$r;
        }
      }
    }
    &-bullet{
      margin-bottom: 10*$r;
      &-item{
        height: 87*$r;
        background-color: #ffffff;
        @include flex-space;
        padding: 0 30*$r;
        p{
          color: #4a4a4a;
        }
        &-right{
          color: #898989;
          @include flex-space;
          img{
            width: 12*$r;
            height: 22*$r;
            margin-left: 30*$r;
          }
        }
      }
      &-item:nth-child(1){
        border-bottom: solid 1px #ececec;
      }
    }
    &-title{
      padding: 26*$r 30*$r;
      @include flex-space;
      span:nth-child(1){
        color: #898989;
      }
    }
    &-account{
      height: 90*$r;
      @include flex-space;
      background-color: #ffffff;
      padding-right: 30*$r;
      border-bottom: solid 1px #f2f3f4;
      div{
        padding-left: 30*$r;
        color: #4a4a4a;
        @include flex-space;
        img{
          width: 36*$r;
          height: 36*$r;
          margin-right: 30*$r;
        }
      }
      img{
        width: 37*$r;
        height: 37*$r;
      }
    }
    &-btn{
      width: 92%;
      height: 86*$r;
      border-radius: 10*$r;
      background-color: #fb762a;
      color: #ffffff;
      font-size: 30*$r;
      line-height: 86*$r;
      text-align: center;
      margin: 40*$r auto;
    }
    .color{
      color:#fb762a;
    }
    &-upView{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.5);
      &-con{
        height: 518*$r;
        width: 80%;
        margin: 50% auto;
        position: relative;
        background-color: #ffffff;
        border-radius: 18*$r;
        transition: all 0.18s ease-in-out;
        transform: scale3d(0,0,0);
        opacity: 0;
        &-text{
          @include flex-align;
          height: 428*$r;
          img{
            width: 92*$r;
            height: 92*$r;
          }
          p:nth-child(2){
            margin-top: 33*$r;
            color: #3a3a3a;
          }
          p:nth-child(3){
            margin-top: 54*$r;
            color: #fb762a;
          }
        }
        &-close{
          width: 29*$r;
          height: 29*$r;
          position: absolute;
          top: 26*$r;
          right: 26*$r;
        }
        &-btn{
          height: 90*$r;
          border-top: solid 1px #f2f2f2;
          @include flex-space;
          div{
            text-align: center;
            line-height: 90*$r;
            width: 50%;
          }
          div:nth-child(1){
            border-right: solid 1px #f2f2f2;
            color: #898989;
          }
          div:nth-child(2){
            color: #fb762a;
          }
        }
      }
      .show{
        opacity: 1;
        transform: scale3d(1,1,1);
      }
    }
  }
</style>
