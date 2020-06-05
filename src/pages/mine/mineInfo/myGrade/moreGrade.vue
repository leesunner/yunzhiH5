<template>
    <div id="title" class="myGrade">
      <div :class="{'myGrade-title':true,'myGrade-title-scrollContol':scrollContol}">
        <div class="myGrade-title-text">
          <span>等级</span>
          <span>特权</span>
        </div>
        <div class="myGrade-title-button" @click="navigateTo('rotary')" v-if="$appid!='yytj'">抽奖</div>
      </div>
      <div class="myGrade-grade">
        <ul>
          <li class="myGrade-grade-item myGrade-grade-item-bottom" v-for="(item,index) in data">
            <img :src="item.img"/>
            <div class="myGrade-grade-item-text">
              <div class="myGrade-grade-item-text-con">
                <ul>
                  <li v-for="items in item.desp">
                    <div class="myGrade-grade-item-text-con-indoc">{{items}}</div>
                  </li>
                </ul>
              </div>
              <div v-if="index>0&&item.button>0" :class="{'myGrade-title-button':true,'myGrade-title-button-control':item.finish==1}" @click="levelTicket(index,item.finish)">{{item.finish==1?'已领取':'领取'}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
    export default {
        name: "more-grade",
      data(){
          return{
            data:[
              {
                desp:[],
                img:require('@/assets/img/Lv.0@2x.png'),
              },
              {
                desp:[],
                img:require('@/assets/img/Lv.1@2x.png'),
              },
              {
                desp:[],
                img:require('@/assets/img/Lv.2@2x.png'),
              },
              {
                desp:[],
                img:require('@/assets/img/Lv.3@2x.png'),
              },{
                img:require('@/assets/img/Lv.4@2x.png'),
              },{
                desp:[],
                img:require('@/assets/img/Lv.5@2x.png'),
              },{
                desp:[],
                img:require('@/assets/img/Lv.6@2x.png'),
              },{
                desp:[],
                img:require('@/assets/img/Lv.7@2x.png'),
              },{
                desp:[],
                img:require('@/assets/img/Lv.8@2x.png'),
              },{
                desp:[],
                img:require('@/assets/img/Lv.9@2x.png'),
              },{
                desp:[],
                img:require('@/assets/img/Lv.10@2x.png'),
              },
            ],
            gradeNum:0,
            scrollContol:false,
          }
      },
      created(){
          this.gradeNum = this.$route.query.grade
         this.getMsg()
      },
      mounted(){
          let that = this
        this.$nextTick(function () {
          window.document.getElementById('title').addEventListener('scroll',function (e) {
            window.requestAnimationFrame(function () {//优化滚动性能
             // that.scrollup(e.target.scrollTop)
            })
          })
        })
      },
      methods:{
          levelTicket(val,control){//领取积分券
            if(control!=1){
              this.$axios.post('/prom/levelhb?version=v2',{lv:val}).then(res=>{
                if(res.data.code==1){
                  this.$vux.toast.text('领取成功')
                  this.getMsg()
                }else{
                  this.$vux.toast.text(res.data.code)
                }
              })
            }else{
              this.$vux.toast.text('您已领取')
            }
          },
        getMsg(){
            let that = this
          this.$axios.post('/user/levelvip?version=v2').then(res=>{
            if(res.data.code==1){
              let arr = res.data.data.list
              if(arr.length>0){
                arr.forEach(function (item,index) {
                  that.data[index].desp = item.desp
                  that.data[index].button = item.button
                  that.data[index].finish = item.finish
                })
              }

            }else{
              this.$vux.toast.text(res.data.code)
            }
          })
        },
        // scrollup(val){
        //     if(val>0){
        //       this.scrollContol = true
        //     }else{
        //       this.scrollContol = false
        //     }
        // }
      },
      destroyed(){
        window.removeEventListener('scroll',this.scrollup)
      }
    }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/reset.scss";
  .myGrade{
    @include appcontent;
    padding-bottom: 0;
    &-title{
      @include flex-space;
      height: 90*$r;
      width: 100%;
      padding-left: 41*$r;
      background-color: #ffffff;
      border-bottom: solid 5px #ebebeb;
      &-scrollContol{
        position: fixed;
        border-bottom: solid 1px #ebebeb;
      }
      &-text{
        @include flex-space;
        span{
          color: #898989;
          margin-right: 89*$r;
          font-size: 26*$r;
        }
      }
      &-button{
        width: 110*$r;
        height: 51*$r;
        background-color: #fb762a;
        border-radius: 5px;
        color:#ffffff;
        line-height: 51*$r;
        text-align: center;
        margin-right: 40*$r;
        &-control{
          background-color: #e5e5e5;
          color: #898989;
        }
      }
    }
    &-grade{
      background-color: #ffffff;
      &-item{
        padding: 31*$r 40*$r 31*$r 31*$r;
        @include flex-space;
        justify-content: flex-start;
        &-bottom{
          border-bottom: solid 1px #ebebeb;
        }
        img{
          width: 63*$r;
          height: 23*$r;
          margin-right: 80*$r;
        }
        &-text{
          @include flex-space;
          width: 90%;
          .myGrade-title-button{
            margin-right: 0!important;
          }
          &-con{
            color: #3a3a3a;
            &-indoc::before{
              content: '';
              display: inline-block;
              width: 6px;
              height: 6px;
              border-radius: 50%;
              vertical-align: middle;
              margin-right: 10*$r;
              background-color: #333333;
            }
          }
        }

      }
    }
  }
</style>
