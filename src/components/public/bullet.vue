<template>
  <div class="bullet-cl"  @click="goUrl">
    <div class="bullet-item">
      <img v-if="icon" class="bullet-item-icon" :src="icon"/>
      <div class="bullet-item-con">
        <div class="bullet-item-con-text">
          <p>{{title}}</p>
        </div>
        <img class="bullet-item-con-link" src="../../assets/img/yjtz.png" v-if="url!='certInfo'"/>
      </div>
      <div v-if="url=='ticket'||url=='certInfo'" class="bullet-item-num">{{num}}</div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "bullet",
    props:{
      url:String,
      para:{
        default:function () {
          return {}
        },
        type:Object,
      },
      icon:{
        default:'',
        type:String,
      },
      title:{
        default:'',
        type:String,
      },
      num:{
        default:'',
        type:String,
      },
    },
    computed:{
      ...mapGetters([//获取用户信息
        'getUserInfo'
      ])
    },
    methods:{
      goUrl(){
        // console.log(this.getUserInfo)
        let that = this
        if(this.url=='ticket'){
          this.para.nums = parseInt(that.num)
        }
        if(this.getUserInfo.user_id){
          if(this.url!='certInfo'){//实名认证 不能点击跳转
            if(this.para.title=='协议'){
              if(this.para.id==2){
                sessionStorage.setItem('paraRid',2)
              } else if(this.para.id==3){
                sessionStorage.setItem('paraRid',3)
              }else if(this.para.id==4){
                sessionStorage.setItem('paraRid',4)
              }
            }
            this.navigateTo(this.url,this.para)
          }
        }else{
          this.navigateTo('userLogin')
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/reset.scss";
  .bullet{
    &-cl{
      width: 100%;
      border-bottom: solid 1px #ececec;
      background-color: #ffffff;
    }
    &-item{
      height: 110*$r;
      width: 92%;
      margin: 0 30*$r;
      position: relative;
      @include flex-space;
      justify-content: flex-start;
      &-icon{
        width: 36*$r;
        height: 36*$r;
        margin-right: 26*$r;
        vertical-align: middle;
      }
      &-con{
        width: 100%;
        vertical-align: middle;
        @include flex-space;
        &-text{
          font-size: 28*$r;
          p{
            color: #323232;
          }
        }
        &-link{
          width: 12*$r;
          height: 22*$r;
        }
      }
      &-num{
        position: absolute;
        height: inherit;
        line-height: 114*$r;
        text-align: center;
        right: 25*$r;
        top: 0;
        color: #ec6822;
      }
    }
  }
</style>
