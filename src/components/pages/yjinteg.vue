<template>
    <div class="integ">
        <h2 v-title="'转入积分'"></h2>
        <div class="content">
            <ul class="top">
              <li>转入积分</li>
              <p>*转入正整数</p>
            </ul>
            <input type="tel" class="money"  placeholder="0" v-model="price" >
            <ul class="btm">
              <li>钱包余额<span>￥{{accountList.amount}}</span></li>
              <li @click="allShift()">全部转入</li>
            </ul>
        </div>
        <div class="btn" ref="btn" @click="btnType==true && getprice()">确认</div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      btnType:false,//点击按钮是否生效
      price:"",
      accountList:{
        total_amount:"",//钱包总额
        amount:"",//账户金额
        },
    }
  },
  created () {
    this.getCode();
  },
  methods: {
      getprice(){//余额转积分提交
        const that =this;
        let regExp=/^[1-9]\d*$/;
        if(regExp.test(this.price)){
          this.$axios.post("/UserCommission/extractCoin?version=v2",{amount:that.price}).then(function (res) {
            console.log(res.data)
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
    getCode(){//获取上方用户佣金账户信息
     const that =this;
      this.$axios.get("/UserCommission/userInfo?version=v2").then(function(res) {
        if(res.data.code == 200){
              //  console.log(res.data.data);
          if(res.data.data.status == 1){
            that.accountList=res.data.data.data;
            // console.log(that.accountList);
          }
        }else{
           that.$vux.toast.text(res.data.msg);
        }
      })
    },
    allShift(){//全部转入
      this.price=parseInt(this.accountList.amount);
      // this.accountList.total_amount=(this.accountList.total_amount*10000-Math.floor(this.accountList.total_amount)*10000)/10000;
    }

  }
  ,
  watch: {
      price:function (newVal,oldVal) {
        // console.log(newVal)
        // console.log(Math.ceil(this.accountList.amount))
        // if(newVal >= Math.ceil(this.accountList.amount)){
        //     this.price=oldVal
        // }else{
        //   //
        // }

         let regExp=/^[1-9]\d*$/;
        if(regExp.test(newVal)){
          this.$refs.btn.style.backgroundColor="#ff9933";
          this.btnType=true;
        }else{
          this.$refs.btn.style.backgroundColor="#ccc";
          this.btnType=false;
        }
      }

  },
  computed: {

  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/css/reset";
.integ{
  width: 100%;background: #f0f0f0;height: 100%;
  .content{
  background: #fff;margin: getREM(33) getREM(40) getREM(62) getREM(40);
  height: getREM(400);
  .top{
    width: 100%;padding:getREM(65) 0 0 getREM(60);
    li{
      height: getREM(50);
      float: left;
    }
    li:nth-child(1){
      font-size: getREM(30); color:#333;font-weight: 700;
    }
    p{
      font-size: getREM(20); color:#cc0000;
      height: getREM(40);padding-top:getREM(10);
  }

  }
  .money{
   width: getREM(550);margin:getREM(60) 0 0 getREM(60);height: getREM(150);border: 0;
   font-size: getREM(80);color:#333;border-bottom: 2px solid #ededed;

  }
  input::-webkit-input-placeholder{
          color:#cccccc;
        }
        input::-moz-placeholder{   /* Mozilla Firefox 19+ */
            color:#cccccc;
        }
        input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
          color:#cccccc;
        }
        input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
           color:#cccccc;
        }
  .btm{
    margin-left:getREM(60);overflow: hidden;width: getREM(550);
    li{
      height: getREM(59);
      line-height: getREM(59);
      font-size: getREM(22);
    }
    li:nth-child(1){
      float: left;
      color:#333;
      span{
        color: red;
      }
    }
    li:nth-child(2){
      float: right;
      color: #ff9933;

    }
  }
}
.btn{
  width: getREM(670);
  height: getREM(88);
  line-height: getREM(88);
  text-align: center;
  color: #fff;
  font-weight: 500;
  background-color: #ccc;
  margin: auto;
  border-radius: getREM(12);
  font-size: getREM(26);
}
}
</style>

