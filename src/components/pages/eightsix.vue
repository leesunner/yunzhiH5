<template>
  <div class="eightsix">
      <header>
        <img src="../../assets/img/eigBg.png" alt="">
      </header>
      <div class="lunb" id="banner">
        <swiper height="80px" auto direction="vertical" :show-dots="false" loop>
                  <swiper-item v-for="(log,index) in cont" :key="index">
                    <p class="log-p"><img src="../../assets/img/laba.png" alt=""> <span>{{log.nickname}}</span> 领取了<span>{{log.coin}}积分券</span></p>
                  </swiper-item>
        </swiper>
      </div>
      <p class="hd">
        活动期间,　幸运号码尾数逢(6/8)　中奖用户加送积分劵一份
      </p>
      <ul class="content" v-for="(item ,index) in list" :key="index">
        <li>
          <img class="img" :src="item.img" alt="">
          <div class="right">
            <p>
              <img src="../../assets/img/sj.png" alt="">
              <span>逢6 奖</span>
              <span style="color:red">￥66</span>
            </p>
            <p>
              <img src="../../assets/img/sj.png" alt="">
              <span>逢8 奖</span>
              <span style="color:red">￥88</span>
            </p>
            <img class="btn" src="../../assets/img/tabtn.png" alt="" v-if="flag == 2" @click="isfn && check(item.id)">
            <img class="btn" src="../../assets/img/tabtn1.png" alt="" v-if="flag == 1" @click="isfn && check(item.id)">
          </div>
        </li>
      </ul>
      <ul class="gcBottom">
        <li>活动规则</li>
        <li>1.活动时间:2018年9月22-10月7日</li>
        <li>2.活动期间,幸运号码尾号逢 (6/8),中奖用户加送积分券一份。</li>
        <li>3.积分券在商品揭晓后及时派发,积分券有效期3天哦~</li>
      </ul>
  </div>
</template>
<script>
  import { Swiper, SwiperItem } from "vux";
  export default{

    name:"eightsix",
    components:{ Swiper, SwiperItem},
    data(){
      return{
        goodId:"",
        flag:"",
        isfn:true,
          cont:[],

        list: [
          {
            id: '465',img:require("../../assets/img/tata8.png"),
          },
          {
            id:"461",img:require("../../assets/img/tata1.png"),
          },
          {
            id: '400',img:require("../../assets/img/tata2.png"),
          },
          {
            id: '457',img:require("../../assets/img/tata3.png"),
          },
          {
            id: '453',img:require("../../assets/img/tata4.png"),
          },
          {
            id:"454",img:require("../../assets/img/tata5.png"),
          },
          {
            id: '455',img:require("../../assets/img/tata6.png"),
          },
          {
            id: '458',img:require("../../assets/img/tata7.png"),
          }
        ]


      }
    },
    methods:{
      check(id) {
        var that=this;
        this.$axios.get('/goods/baseGoodsDetail',{params:{
          id:id,
          version:'v1'
        }}).then(function (res) {
            console.log(res.data)
            if(that.flag == 1){
              const ass="活动即将开始";
              that.$vux.toast.text(ass);
            }else{
               if(res.data.code == 1){
              that.goodId=res.data.data.goods_id;
              that.$router.push({name:'productView',params:{id:that.goodId,guid:'2'}})

            }
            }

        })
      },
      getDaycount(){//中奖名单
      var that=this;
      this.$axios.get("/active/winningStartingSchoolCoupon?version=v2").then(function (res) {
         const newdata=new Date();
            const olddata=new Date(2018,8,22);
            if(olddata>newdata){
              document.getElementById("banner").style.display="none";
            }
        console.log(res.data.data.list);
        that.cont=res.data.data.list;
      })
    },
      jjks(){
          var that=this;
         const newdata=new Date();
         const olddata=new Date(2018,8,22);
         if(olddata > newdata){
           that.flag=1;
          //  that.isfn=false;
         }else{
            that.flag=2;

         }
      }
      ,
       getjl:function () {
                this.$axios.post("/active/zhongQiuLog?version=v2",{type:4}).then(function (res) {
                  // console.log(res);
                })
            }
    },
    created() {
      document.title="最燃开学季",
      this.getjl();
      this.jjks();
      this.getDaycount()
    },


  }
</script>
<style lang="scss" scoped>
  @import "../../assets/css/reset";
  .eightsix{
    width: 100%;background-color: #753fd1;
    header{
      width: 100%;height:getREM(583);
      img{
        width:100%;height: 100%;

      }
    }
    .lunb{
      width:getREM(521);border-radius: getREM(12);background-color: #6837a8;height: getREM(48);margin: auto;font-size: getREM(23);
      color:#fff;overflow: hidden;
      .log-p{
        text-align: center;line-height: getREM(48);
        img{
          width: getREM(35);height:getREM(35);display: inline;vertical-align:middle;
        }
      }
    }
    .hd{
      width: getREM(600);margin: auto;font-size: get(REM);text-align: center;margin: auto;padding:getREM(25) 0;
      color:#fff;
    }
    .content{
      width: getREM(689);background:url("../../assets/img/eightkm.png") no-repeat;background-size: 100% 100%;margin:auto;
      li{
        width:getREM(593) ;margin:auto;height:getREM(316);padding-top:getREM(40);
        margin-bottom: getREM(35);

        .img{
          float: left;height:getREM(256);width: getREM(256);
        }
        p{
          height: getREM(80);line-height: getREM(20);vertical-align: middle;
          img{
            display: inline;vertical-align: middle;
          }
        }
        .right{
          float: right;height:getREM(296);font-size:getREM(30);
          .btn{
            width:getREM(249);height: getREM(61);
          }
        }
        }
    }
    .gcBottom{
      font-size: getREM(24);color:#fff;padding:getREM(29) 0 getREM(48) getREM(48);
      li{
        height:getREM(48);line-height:getREM(48);
      }
    }


  }
</style>
