<template>
  <div class="addAddress">
    <div class="addAddress-item">
      <label>收货人</label>
      <div class="addAddress-item-input">
        <x-input style="color: #4a4a4a;" placeholder="收货人姓名" v-model="user"></x-input>
      </div>
    </div>
    <div class="addAddress-item">
      <label>所在地区</label>
      <div class="addAddress-item-input" @click="pickerControls">
        <span v-text="address"></span>
        <img src="../../../assets/img/ads-d.png"/>
      </div>
    </div>
    <div class="addAddress-item">
      <label>联系方式</label>
      <div class="addAddress-item-input">
        <x-input style="color: #4a4a4a;" placeholder="请输入您的联系方式" v-model="userPhoneNum"></x-input>
      </div>
    </div>
    <div class="addAddress-item">
      <label>详细地址</label>
      <div class="addAddress-item-input">
        <x-input style="color: #4a4a4a;" placeholder="3-30字符，不包含特殊字符" v-model="addressArea"></x-input>
      </div>
    </div>
    <div class="addAddress-bottom" @click="choose">
      <div :class="addressDefault===1?'address-content-item-choosed':'address-content-item-choose'">
      </div>
      <span>设为默认</span>
    </div>
    <div class="addAddress-submit" @click="submit">保存</div>
    <!--picker弹出框-->
    <div class="addAddress-zc" v-show="pickerControl" @click="pickerControl=!pickerControl"></div>
    <div :class="{'addAddress-picker':true,'addAddress-picker-show':pickerControl}">
      <mt-picker v-if="data.length>0" :slots="data" @change="change" :visibleItemCount="3" :itemHeight="40" value-key="area_name" ref="picker">
      </mt-picker>
    </div>
  </div>
</template>

<script>

  export default {
    name: "add-address",
    data(){
      return{
        pickerControl:false,
        addressDefault:1,
        addressArea:'',
        userPhoneNum:'',
        user:'',
        dataValue:[],
        addressData:'',
        data:[
          {
            flex:1,
            values:[], //省份数组
          },
          //分隔符
          {
            divider: true,
            content: '',
            className: 'slot2'
          },
          //市
          {
            flex:1,
            values: [],
          },
          {
            divider: true,
            content: '',
            className: 'slot4'
          },
          //县
          {
            flex:1,
            values: [],
          }
        ],
        proviceData:[],
        cityData:[],
        control:false,
        address:'请选择所在地区'
      }
    },
    created(){
      if(this.$route.query.addressData){
        this.addressData = JSON.parse(this.$route.query.addressData)
        if(this.addressData){
          this.user = this.addressData.nickname
          this.userPhoneNum = this.addressData.phone
          this.address = this.addressData.area
          this.addressArea = this.addressData.address
          this.addressDefault = this.addressData.isdefault
        }
      }
    },
    methods:{
      pickerControls(){
        this.pickerControl = !this.pickerControl
        this.getProvince(1)//北京默认1
      },
      submit(){//保存收货信息

        this.$axios.post('/user/address_save?version=v2',{
          'user_address_id':this.addressData?this.addressData.user_address_id:'',
          nickname:this.user,
          phone:this.userPhoneNum,
          area:this.address,
          address:this.addressArea,
          isdefault:this.addressDefault
        }).then(res=>{
            if(res.data.code===1){
              if(this.addressData){
                this.$vux.toast.text('修改成功')
              }else{
                this.$vux.toast.text('添加成功')
              }
              this.$router.go(-1)
            }else{
              this.$vux.toast.text(res.data.msg)
            }
        })
      },
      change(picker,values){
        let that = this
        that.proviceData.forEach(function (item) {
          if(item.area_name ===values[0].area_name){
            that.getCity(item.area_id)
            that.cityData.forEach(function (items) {
              if(items.area_name ===values[1].area_name){
                that.getArea(items.area_id)
                if(that.control){
                  that.address = values[0].area_name+' '+values[1].area_name+' '+values[2].area_name
                }
              }
            })
          }
        })
      },
      choose(){
        this.addressDefault!=1?this.addressDefault=1:this.addressDefault=0
      },
      getProvince(i){//获取省
        this.$axios.post('/site/area?version=v2').then(res=>{
          if(res.data.code===1){
            this.proviceData = res.data.data.list
            this.$set( this.data[0],'values',res.data.data.list)
          }
        })
      },
      getCity(i){//获取市
        let that = this
        that.$axios.post('/site/area?version=v2',{'area_id':i}).then(res=>{
          if(res.data.code===1){
            that.cityData = res.data.data.list
            that.$refs.picker.setSlotValues(1,res.data.data.list)
          }
        })
      },
      getArea(i){//获取县/区
        let that = this
        that.$axios.post('/site/area?version=v2',{'area_id':i}).then(res=>{
          if(res.data.code===1){
            that.$refs.picker.setSlotValues(2,res.data.data.list)
            that.control = true
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/reset.scss";
  .addAddress{
    @include appcontent;
    padding-bottom: 0;
    &-con{
      position: relative;
      height: 100%;
    }
    &-item{
      padding: 0 32*$r 0 30*$r;
      @include flex-space;
      justify-content: flex-start;
      height: 104*$r;
      background-color: #FFFFFF;
      border-bottom: solid 1px #e2e2e2;
      label{
        margin-right: 30*$r;
        width: 104*$r;
        color: #4a4a4a;
      }
      &-input{
        width: 80%;
        @include flex-space;
        color: #898989;
        img{
          width: 14*$r;
          height: 14*$r;
        }
        input::-webkit-input-placeholder { /* WebKit, Blink, Edge */
          color: #898989!important;
        }
        input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
          color: #898989!important;
        }
        input::-moz-placeholder { /* Mozilla Firefox 19+ */
          color: #898989!important;
        }
        input:-ms-input-placeholder { /* Internet Explorer 10-11 */
          color: #898989!important;
        }
      }
    }
    .address-content-item-choose{
      width: 37*$r;
      height: 37*$r;
      background: url("../../../assets/img/ads-choose.png") no-repeat;
      background-size: 100% 100%;
    }
    .address-content-item-choosed{
      width: 37*$r;
      height: 37*$r;
      background: url("../../../assets/img/ads-choosed.png") no-repeat;
      background-size: 100% 100%;
    }
    &-bottom{
      margin-top: 5px;
      height: 75*$r;
      background-color: #ffffff;
      padding-left: 30*$r;
      @include flex-space;
      justify-content: flex-start;
      margin-bottom: 42*$r;
      span{
        margin-left: 23*$r;
        font-size: 26*$r;
      }
    }
    &-submit{
      width: 690*$r;
      height: 86*$r;
      background-color: #fb762a;
      border-radius: 10*$r;
      margin: 0 auto;
      color: #ffffff;
      text-align: center;
      line-height: 86*$r;
      font-size: 30*$r;
    }
    &-zc{
      background-color: #000000;
      opacity: 0.6;
      z-index: 999;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    &-picker{
      width: 100%;
      height: 180px;
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 1000;
      background-color: #ffffff;
      transform-origin: bottom;
      transform: translateY(180px);
      transition: all .15s ease-in-out;
      letter-spacing: 1.2px;
      opacity: 0.5;
      &-show{
        transform: translateY(0);
        opacity: 1;
        .v-modal{
          background: none;
        }
      }
    }
  }
</style>
