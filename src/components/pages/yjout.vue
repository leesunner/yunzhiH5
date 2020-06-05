<template>
  <div class="yjout">
    <h2 v-title="'佣金提现'"></h2>
    <ul class="top">
      <li>
        <label for="getmobile">支付宝</label>
        <input type="text" placeholder="输入手机号或邮箱" id="getmobile" v-model="mobile" @blur="getmobile()">
      </li>
      <li>
        <label for="usernum">姓名</label>
        <input type="text" placeholder="输入真实姓名"  id="usernum" v-model="usernum"   @blur="getUername()">
      </li>
      <li>
        <label for="getmoney">提现金额</label>
        <input type="tel" placeholder="输入大于20正整数" id="getmoney" v-model="money" @blur="getmoney()">
      </li>
    </ul>
    <div class="title">
      <span>佣金:</span>
      <span style="color:red;">￥{{accountList.amount}}　</span>
      <span>(需要满20元才可提现)</span>
    </div>
    <!-- <div class="btn" ref="btn" @click="btnStyle&&getSubmit()" :style="btnStyle ? btnBga : btnBgb" >提现</div> -->
    <div class="btn" ref="btn" @click="getSubmit()" >提现</div>
    <p class="hint">提示： &nbsp;提现到支付宝 , 每周5进行审核发放。</p>
  </div>
</template>
<script type="ec">
export default {
  data () {
    return {
      mobile:"",//手机号
      usernum:"",//姓名
      money:"",//提现金额
      accountList:{
        amount:"",//余额
      },//金额list
      btnType:{a:0,b:0,c:0},
      btnStyle:false,
      btnBga:"background:#ff9933",
      btnBgb:"background:#ccc"
    }
  },
  created () {
    this.getCode();
  },
  methods: {
    getmobile(){
               var reg = /^1[0-9]{1}[0-9]{9}$/;
         var reg1 = /[a-zA-Z0-9]{1,10}@[a-zA-Z0-9]{1,5}\.[a-zA-Z0-9]{1,5}/;
        if(reg.test(this.mobile) || reg1.test(this.mobile)){
             this.btnType.a =1
          }else{
             this.btnType.a =0
          }
    },
    getUername(){
        let nameReg=/[\u4e00-\u9fa5]/;
         if(nameReg.test(this.usernum)){
            this.btnType.b=1
            //  console.log(this.btnType)
          }else{
            this.btnType.b=0
          }
    },
    getCode(){//获取上方用户佣金账户信息
     const that =this;
      this.$axios.get("/UserCommission/userInfo?version=v2").then(function(res) {
        if(res.data.code == 200){
               console.log(res.data.data);
          if(res.data.data.status == 1){
            that.accountList=res.data.data.data;
            // console.log(that.accountList);
          }
        }else{
           that.$vux.toast.text(res.data.msg);
        }
      })
    },
    getmoney(){
      // console.log(newVal)
      // const rega=/^\d{3,}/;
      const regExp=/^[1-9]\d*$/;
      if(this.money >= 20 && regExp.test(this.money)){
          this.btnType.c =1
      }else{
        this.btnType.c =0
      }
    },
    getSubmit(){//提现提交
    const that =this;
    if(this.btnType.a == 0){
      let mobileCode="请您输入正确的支付宝账号";
      that.$vux.toast.text(mobileCode);
      return false;
    }else if(this.btnType.b == 0){
      let userName="请您输入正确的姓名";
       that.$vux.toast.text(userName);
         return false;
    }else if(this.btnType.c == 0){
       let moneyCode="提现金额应为大于20整数";
        that.$vux.toast.text(moneyCode);
          return false;
    }
    this.$axios.post('/UserCommission/extractRMB?version=v2',{
      alipay_account:that.mobile,
      name:that.usernum,
      amount:that.money,
    }).then(function(res) {
      if(res.data.code == 200){
            if(res.data.data.status == 1){
                that.getCode();
            }
           that.$vux.toast.text(res.data.data.message);
                setTimeout(() => {
                 that.$router.push({name:'commis'})
              }, 3000);

         }else{
           that.$vux.toast.text(res.data.msg);
         }
    })

    }
  },
   watch: {
    btnType:{
      handler: function (newVal){
      if(this.btnType.a == 1 && this.btnType.a == 1 && this.btnType.c == 1){
         this.btnStyle=true;
      }else{
         this.btnStyle=false;
      }
    } ,
     immediate: true,
      deep: true
    },
  }
}
</script>
<style lang="scss" scoped>
  @import "../../assets/css/reset";
  .yjout{
    width: 100%;background-color:#f0f0f0;height: 100%;
    .top{
      width: 100%;padding-left:getREM(40);background: #fff;font-size: getREM(24);
      li{
        overflow: hidden;
        height: getREM(82);
        line-height: getREM(82);
        label{
          float: left;
          width: 30%;
          color: #333;
          font-size: getREM(24);
          font-weight: 500;
        }
        input{
          //  overflow: hidden;
          float: right;
          text-align: right;
          width: 70%;
          display: block;
          // height: getREM(82);
          padding: 27*$r 0;
          // line-height: getREM(82);
          border: 0;
          padding-right: getREM(38);
          box-sizing: border-box;

        }

      }
      li:nth-child(1),li:nth-child(2){
        border-bottom: getREM(2) solid #f0f0f0;
      }
    }
    .title{
      padding: getREM(20) 0;
      margin-bottom:getREM(38) ;
      color: #333;font-size: getREM(22);
      text-align: right;
      margin-right: getREM(42);
      span{
        line-height: getREM(40);
      }
    }
    .btn{
      background-color: #ff9933;
      color: #fff;
      text-align: center;
      width: getREM(670);
      margin:auto;
      height: getREM(88);
      line-height: getREM(88);
      border-radius: getREM(12);
      font-size: getREM(27);
    }
    .hint{
      text-align: center;
      margin-top:getREM(40);
      color: #7d7d7d;
    }
  }
</style>

