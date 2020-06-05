<template>
  <div class="grade">
    <div class="grade-top">
      <div class="grade-top-headImg" :style="'background-image: url('+data.avatar+')'"></div>
      <div class="grade-top-headText">
        <span>等钱等级:</span>
        <img :src= "gradeImg" />
      </div>
      <div class="grade-top-headGrade">
        <div :class="{'grade-top-headGrade-item':true,'red':index<grade,'grade-top-headGrade-none':index==gradeData.length-1}" v-for="(item,index) in gradeData">
          <div :class="{'grade-top-headGrade-item-num1':true,'grade-top-headGrade-item-num':item!=0}">{{index}}</div>
        </div>
        <div class="grade-top-headGrade-line" :style="'width:'+ (100*grade/10)+'%'">
          <div class="line"></div>
        </div>
        <!--因为不知道接口会返这个等级图片所以上面是手搓的效果,如果要使用图片请打开下面的img-->
        <!--<img :src="data.levelpic"/>-->
      </div>
      <p class="grade-top-text">{{data.desp}}</p>
    </div>
    <div class="grade-now">
      <p class="grade-now-title">当前等级特权</p>
      <div class="grade-now-indoc">
        <p v-for="(item,index) in data.nowpriv">{{(index+1)+'.'+item}}</p>
        <div class="grade-now-indoc-button" v-if="data.ulevel>0" @click="navigateTo('moreGrade',{grade:grade})">领取礼包</div>
      </div>
    </div>
    <div class="grade-more">
      <div class="grade-more-top" @click="navigateTo('moreGrade',{grade:grade})">
        <span class="grade-more-top-title">了解等级特权</span>
        <div class="grade-more-top-more">
          <span>更多</span>
          <img src="../../../../assets/img/yjtz.png"/>
        </div>
      </div>
      <p>1.什么是经验值</p>
      <p>个人经验值就是在玩零钱乐购的时候,通过购买所获得的数值。</p>
      <p>2.如何获得经验值</p>
      <p>参与购买一人次增加1点经验值，不计使用积分券参与。</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "my-grade",
    data(){
      return{
        gradeData:[0,0,0,0,0,0,0,0,0,0,0],
        grade:0,//特权等级
        gradeImg:'',
        data:{}//我的特权信息
      }
    },
    created(){
      this.getMsg()
    },
    methods:{
      getMsg(){
        this.$axios.post('/user/mylevel?version=v2').then(res=>{
          this.data = res.data.data
          this.grade =this.data.ulevel//特权等级
          this.gradeImg = require('@/assets/img/Lv.'+this.grade+'@2x.png')
          this.gradeData[this.grade] = 1//通过等级控制0,1,来控制显示当前等级
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/reset.scss";
  .grade{
    @include appcontent;
    padding-bottom: 0;
    font-family: 'PingFang-SC-Medium';
    background-color: #ffffff;
    color: #898989;
    &-top{
      @include flex-align;
      padding-bottom: 86*$r;
      border-bottom: solid 10*$r #f9f9f8;
      &-headImg{
        width: 140*$r;
        height: 141*$r;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        border-radius: 50%;
        margin-top: 69*$r;
      }
      &-headText{
        margin-top: 39*$r;
        font-family: 'PingFang-SC-Bold';
        span{
          font-size: 28*$r;
          vertical-align: middle;
        }
        img{
          height: 24*$r;
          vertical-align: middle;
        }
      }
      &-headGrade{
        @include flex-space;
        justify-content: flex-start;
        width: 613*$r;
        margin-top: 35*$r;
        position: relative;
        &-item{
          width: 70*$r;
          height: 50*$r;
          border-bottom: solid 9*$r #ededed;
          margin-right: 1px;
          position: relative;
          &-num1{
            position: absolute;
            top: 0;
            height: 39*$r;
            width: 39*$r;
            left: -19.5*$r;
            text-align: center;
            margin-bottom: 2px;
            line-height: 39*$r;
          }
          &-num{
            background-color: #ed3f32;
            color: #ffffff;
            border-radius: 50%;
          }
        }
        .red{
          color: #ed3f32;
        }
        &-none{
          width: 0;
          height: 50*$r;
          border-bottom: none;
          margin-right: 0;
        }
        &-line{
          position: absolute;
          height: 9*$r;
          bottom: 0;
          left:0;
          border-radius: 6*$r;
          overflow: hidden;
          transition: all 0.2s ease-in-out;
          .line{
            width: 100%;
            height: inherit;
            background: linear-gradient(to right,#ed8d32,#eb432c);
          }
        }
      }
      &-text{
        margin-top: 14*$r;
      }
    }
    &-now{
      border-bottom: solid 10*$r #f9f9f8;
      padding-bottom: 34*$r;
      &-title{
        font-size: 28*$r;
        line-height: 135*$r;
        color: #4a4a4a;
        padding-left: 31*$r;
      }
      &-indoc{
        width: 92%;
        background-color: #f9f9f8;
        padding: 30*$r 0 31*$r 32*$r;
        margin: 0 auto;
        position: relative;
        &-button{
          position: absolute;
          right: 40*$r;
          top:25*$r;
          height: 44*$r;
          width: 119*$r;
          background-color: #fb7428;
          border-radius: 3px;
          line-height: 44*$r;
          text-align: center;
          color: #ffffff;
        }
      }
    }
    &-more{
      padding-left: 32*$r;
      &-top{
        @include flex-space;
        height: 92*$r;
        border-bottom: solid 3px #f9f9f8;
        &-title{
          font-size: 28*$r;
          color: #4a4a4a;
        }
        &-more{
          margin-right: 32*$r;
          height: 29*$r;
          @include flex-space;
          span{
            margin-right: 22*$r;
          }
          img{
            width: 15*$r;
            height: 29*$r;
          }
        }
      }
      p:nth-child(2){
        margin-top: 42*$r;
      }
      p:nth-child(4){
        margin-top: 40*$r;
      }
    }
  }
</style>
