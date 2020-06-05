<template>
  <div class="master">
    <h2 v-title="'邀请人ID'"></h2>
    <label for="masterID"  class="top">
      <input id="masterID" type="tel" placeholder="请输入邀请人ID" v-model="masterID">
    </label>
    <button type="submit" class="btn" @click="submit">确认</button>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        masterID:""
      }
    },
    created() {

    },
    mounted() {

    },
    methods:{
      submit(){//若没有师父则可以拜师

        const that =this;
        if(!this.masterID){
          let masterCode="请填写邀请人ID";
          that.$vux.toast.text(masterCode);
          return false;
        }
        this.$axios.post('/UserCommission/bindMaster?version=v2',{master_user_id:that.masterID}).then(function (res) {
          if(res.data.code == 200){
            if(res.data.data.status == 1){
              that.$vux.toast.text(res.data.data.message)
              that.$router.push({
                name:'commis'
              })
            }else{
              that.$vux.toast.text(res.data.data.message)
              // console.log(res.data)
            }
          }else{
            that.$vux.toast.text(res.data.msg)
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/css/reset";
  .master{
    width: 100%;
    height: 100%;
    background-color: #f0f0f0;
    width: 100%;
    .top{
      display: block;
      margin-top: 20*$r;
      height: 99*$r;
      width: 100%;

      input{
        box-sizing: border-box;
        border:0;
        padding-left: 40*$r;
        -webkit-user-select:auto;
        width: 100%;
        height: 99*$r;
        font-size: 28*$r;

      }
    }.btn{
       width: 694*$r;
       height: 70*$r;
       border-radius: 12*$r;
       background-color: #fe9c2a;
       border: 0;
       display: block;
       margin: auto;
       margin-top:33*$r;
       color: #fff;
       font-size: 27*$r;
     }
  }
</style>

