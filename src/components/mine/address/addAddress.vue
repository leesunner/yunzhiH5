<template>
  <div class="address">
    <div class="address-content" v-if="contolData.length>0">
      <div class="address-content-item"  v-for="(item,index) in contolData" :key="index">
        <img class="address-content-item-emit" @click="navigateTo('addAddress',{'addressData':JSON.stringify(item)})" src="../../../assets/img/ads-emit.png"/>
        <div class="address-content-item-text" @click="choose(index, $route.query.type)">
          <div class="address-content-item-text-content">
            <div class="address-content-item-text-top">
              <span>{{item.nickname}}</span>
              <span>{{item.phone}}</span>
            </div>
            <div class="address-content-item-text-down">
              <span class="def" v-if="item.isdefault===1">【默认】</span>
              <span>{{item.area+' '+item.address}}</span>
            </div>
          </div>
          <div class="address-content-item-text-img" v-if="$route.query.type!=1" :class="item.isdefault===1?'address-content-item-choosed':'address-content-item-choose'">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "add-address",
    props:{
      data:{
        default:[],
        type:Array
      }
    },
    data(){
      return{
        contolData:[],
      }
    },
    watch:{
      data:{
        handler(newVal,oldVal){
          let that = this
          that.contolData = newVal
          newVal.forEach(function (item) {
            if(item.isdefault===1){
              that.$route.query.addressId=item.user_address_id
            }
          })
        },
        deep:true
      }
    },
    methods:{
      choose(index, type){
        let data = this.contolData
        if (type != '1') {
          if(data[index].default===1){
            this.$set(data[index],'isdefault',0)
          }else{
            this.$set(data[index],'isdefault',1)
            this.$route.query.addressId=data[index].user_address_id
            for(let item in data){
              if(item!=index){//只能选中一个默认地址
                data[item].isdefault = 0
              }
            }
          }
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/reset.scss";
  .address{
    &-add{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100*$r;
      background-color: #fb762a;
      color: #ffffff;
      text-align: center;
      line-height: 100*$r;
      font-size: 30*$r;
    }
    &-content{
      font-family: PingFang-SC-Regular;
      font-size: 26px;
      width: 100%;
      padding: 0 30*$r;
      background-color: #FFFFFF;
      &-item{
        height: 212*$r;
        border-bottom: solid 5px #f5f5f5;
        @include flex-space;
        justify-content: flex-start;
        &-emit{
          width: 33*$r;
          height: 33*$r;
        }
        &-text{
          margin-left: 23*$r;
          margin-right: 17*$r;
          width: 650*$r;
          display: flex;
          &-content{
            width: 580*$r;
          }
          &-img{
            margin-left: 50*$r;
          }
          &-top{
            font-size: 28*$r;
            color: #4a4a4a;
            @include flex-space;
          }
          &-down{
            font-size: 26*$r;
            color: #898989;
            .def{
              color: #fb6815;
            }
          }
        }
        &-choose{
          width: 37*$r;
          height: 37*$r;
          background: url("../../../assets/img/ads-choose.png") no-repeat;
          background-size: 100% 100%;
        }
        &-choosed{
          width: 37*$r;
          height: 37*$r;
          background: url("../../../assets/img/ads-choosed.png") no-repeat;
          background-size: 100% 100%;
        }
      }
      &-item:nth-last-child(1){
        border-bottom: none;
      }
    }
    .icon-ing{
      display: inline-block;
    }
  }
</style>
