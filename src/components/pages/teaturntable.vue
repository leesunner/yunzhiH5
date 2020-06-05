<template>
  <div class="tea">
    <div class="seven-head">
      <div :class="{'seven-head-con':true,'seven-head-con-ending':ending,'seven-head-con-end':end}">
        <div class="seven-head-con-time" v-if="!end">
          <span class="span">{{times.day}}</span>
          <span class="ss">天</span>
          <span class="span2">{{times.hour}}</span>
          <span class="ss">时</span>
          <span class="span2">{{times.m}}</span>
          <span class="ss">分</span>
          <span class="span2">{{times.s}}</span>
          <span class="ss">秒</span>
        </div>
      </div>
    </div>
    <div class="both"></div>
    <div class="mygift">
      <div class="mygift-content">
        <div class="mygift-top">
          <img src="../../assets/img/mygifta.png" alt="">
          <span @click="getZx()"></span>
        </div>
        <ul class="mygift-bottom">
          <li v-for="(item,index) in goodsList" :key="index">
            <span>拥有【{{item.name}}】</span>
            <span>{{item.count}}个,&nbsp;</span>
            <span>可兑换抽奖机会{{item.num}}次</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="banner">
      <swiper auto height="50px" direction="vertical" :show-dots="false">
        <swiper-item v-for="(log,index) in list" :key="index">
          <p class="log-p">恭喜<span>{{log.nickname}}**</span>通过回收获得了<span>{{log.prize_name}}</span></p>
        </swiper-item>
      </swiper>
    </div>
    <div class="wheel">
      <div class="wheel-btn">
        <div class="wheel-pointer" @click="click_flag == true && getturn()">
          <p>立即抽奖</p>
          <p>剩余<span>{{retaynum || 0}}</span>次</p>
        </div>
      </div>
      <div class="wheel-content" :style="{transform:rotate_angle,transition:rotate_transition}"></div>
    </div>
    <div class="myteabtn">
      <img src="../../assets/img/myteabtn.png" alt="" @click="getmyjl(),mytype=1">
      <img src="../../assets/img/swdhhhhh.png" alt="" @click="getmyjl(),mytype=3">
    </div>

    <div class="zcbox" ref="zcbox" @click="flag()">
      <div :class="{'box':mytype!=3,'boxbg':aflag&&mytype!=3}" ref="box">
        <div class="box-content" id="boxContent" @click.stop="msg()" v-if="mytype == 1">
          <h3 >我的获奖记录</h3>
          <h4>获奖商品</h4>
          <h4>获奖时间</h4>
          <ul class="box-content-middle">
            <li v-for="(item,index) in awardList" :key="index">
              <span>{{item.ctime}}</span>
              <span>{{item.prize_name}}</span>
            </li>
          </ul>
          <div class="box-btn-content">
            <div class="pagebtn"  @click="getmyrecode(mypage = mypage*1-1) ">上一页</div>
            <div class="pagebtn" @click="getmyrecode(mypage = mypage*1+1)">下一页</div>
          </div>
        </div>
        <div class="box-dh" @click.stop="msg()" v-if="mytype == 3">
          <p class="box-dh-title"><span>*</span>活动结束后，统一发放奖励</p>
          <div class="box-dh-info">
            <img @click="chooseType(1)" :src="dhType==1?require('@/assets/img/wgcy.png'):require('@/assets/img/ygzc.png')"/>
            <div class="box-dh-info-con">
              <ul>
                <li>
                  <label>收货人姓名：</label>
                  <x-input v-model="userInfo.name" :readonly="userInfo.type===1?true:false" placeholder="输入姓名"></x-input>
                </li>
                <li>
                  <label>收货人电话：</label>
                  <x-input v-model="userInfo.phone" :max=11 :readonly="userInfo.type===1?true:false" placeholder="输入电话号"></x-input>
                </li>
                <li>
                  <label>收货地址：</label>
                  <x-input v-model="userInfo.address" :readonly="userInfo.type===1?true:false"  placeholder="信息确认后将无法修改！"></x-input>
                </li>
              </ul>
            </div>
          </div>
          <div class="box-dh-info">
            <img class="box-dh-info-img" :src="dhType==2?require('@/assets/img/wgcy.png'):require('@/assets/img/ygzc.png')" @click="chooseType(2)"/>
            <div class="box-dh-info-ji">
              <div>
                <label>ID：</label>
                <span>{{userInfo.user_id}}</span>
              </div>
              <div>
                <label>等级：</label>
                <span>{{userInfo.ulevel}}级</span>
              </div>
              <div>
                <label>折扣：</label>
                <span>{{userInfo.discount?userInfo.discount:0}}折</span>
              </div>
            </div>
          </div>
          <div class="box-dh-info">
            <img class="box-dh-info-kf" :src="dhType==3?require('@/assets/img/wgcy.png'):require('@/assets/img/ygzc.png')" @click="chooseType(3)"/>
            <div class="box-dh-info-qq">
              添加客服云哥QQ号：{{userInfo.qq}}
            </div>
          </div>
          <div class="box-dh-submit" @click="submitReal"></div>
        </div>
        <div class="turenArw"  v-if="mytype == 2">
          <h3>恭喜您中奖啦  ！！</h3>
          <img :src='getturnList.img' alt="">
          <p>{{getturnList.name}}</p>
          <div class="turenArwBtn">立即收下</div>
        </div>
      </div>
    </div>
    <div class="teaturnGz">
      <img class="teaturnGz-top" src="../../assets/img/teatgzTop.png" alt="">
      <ul>
        <li><span>1</span> 购买的茶叶如不想要了,可在活动时间范围内直接兑换成</li>
        <li><span class="teaturnGz-span"></span> “幸运转盘”的抽奖机会。抽奖机会将按照茶叶的种类</li>
        <li style="margin-bottom: 12px;"><span class="teaturnGz-span"></span>来兑换相对应的抽奖次数</li>
        <li><span>2</span> 抽奖获得的积分劵即时发放，您可在“我的乐购-我的</li>
        <li style="margin-bottom: 12px;"><span class="teaturnGz-span"></span>积分劵”中查看，积分劵为即刻起3天内有效；</li>
        <li><span>3</span> 领取实物奖励时，需要在“实物兑换方式”内选取相对</li>
        <li><span class="teaturnGz-span"></span>应的领取方式并填写您的个人收货信息，信息填写后将</li>
        <li style="margin-bottom: 12px;"><span class="teaturnGz-span"></span> 无法修改。活动结束后，奖励将按照勾选的信息统一发放；</li>
        <li><span>4</span> 本活动最终解释权归乐购运营团队所有。</li>
      </ul>
    </div>
    <img src="../../assets/img/teatrunEWM.png" alt="" class="ewm">
    <P class="teaturnGz-ss">扫一扫添加QQ群</P>
  </div>
</template>
<script>
  import { Swiper,SwiperItem } from 'vux';
  export default {
    components:{Swiper,SwiperItem},
    data () {
      return {
        goodsList:"",//我的礼盒
        prize_list:null, // 转盘列表
        retaynum:"",//可抽奖次数
        // lottery_ticket: 0, //抽奖次数
        // toast_control: false, //抽奖结果弹出框控制器
        // toast_rule: false, // 规则弹框
        // toast_prize: false, // 中奖弹框
        // toast_noPrize: false,
        mytype:"",//遮罩层类型选择
        hasPrize: false, //是否中奖
        start_rotating_degree: 0, //初始旋转角度
        rotate_angle: 0, //将要旋转的角度
        // start_rotating_degree_pointer: 0, //指针初始旋转角度
        // rotate_angle_pointer: 0, //指针将要旋转的度数
        rotate_transition: "transform 6s ease-in-out", //初始化选中的过度属性控制
        rotate_transition_pointer: "transform 12s ease-in-out", //初始化指针过度属性控制
        click_flag: true, //是否可以旋转抽奖
        mypage:"1",//当前获奖页码
        limit:"6",
        page:"",
        myhasNextPage:"1",//获奖页码是否有下一页
        awardList:"",//获奖记录集合
        zcbox:false,//遮罩层显影
        list:[],
        ending:false,//距离活动结束控制变量
        end:false,//活动已结束控制变量
        getturnList:"",//转盘抽奖信息集合.
        aflag:false,//判断box的动态背景class
        control:false,//控制抽奖按钮
        times:{//时间控制器
          day:0,
          hour:0,
          m:0,
          s:0
        },
        userInfo:{},//兑换实物的用信息
        dhType:'',
      }
    },
    created() {
      document.title="茶叶回收大作战！";
      this.getcode();
      this.getmyReal()
    },
    mounted() {

    },
    methods: {
      getcode(){//获取回收茶叶信息 **
        const that=this;
        this.$axios.get('/active/getUserTeaRecoverInfo?version=v2').then(function (res) {
          if(res.data.code == 200){
            that.goodsList=res.data.data.goodsList;
            that.list=res.data.data.userLotteryLog;
            that.prize_list=res.data.data.prizeList;
            that.retaynum=res.data.data.recover_lottery_num;
            that.getMsg(res.data.data.stime,res.data.data.etime,res.data.data.time)
            if(res.data.data.goodsList.length == 0){
              // let sg="回收7月1-10月10购买茶叶哦";
              that.$refs.zxbtn.style.backgroundColor="#bdbdbd";
              // that.$vux.toast.text(sg)
            }
          }else{
            that.$vux.toast.text(res.data.msg)
          }
        })
      },
      getZx(){
        const that=this;
        this.$axios.post('/active/teaExchangeLotteryNum?version=v2').then(function (res) {
          console.log(res.data);
          if(res.data.code == 200){
            that.getcode();
            that.$vux.toast.text(res.data.msg)
          }else{
            that.$vux.toast.text(res.data.msg)
          }
        })
      },
      getmyrecode(mypage){//我的获奖记录加减
        const that =this;
        // this.$refs.zcbox.style.display="block";

        if(this.myhasNextPage > 0  && that.awardList.length == that.limit){//判断是否有下一页
          if(mypage == false){

            that.mypage=1;
            return ""
          }
          this.$axios.get('/active/getUserTeaLotteryPrize?version=v2',{params:{
              limit:that.limit,
              page:that.mypage
            }}).then((res)=>{
            // console.log(res.data)
            if(res.data.code == 200){
              that.myhasNextPage=res.data.data.hasNextPage;
              that.awardList=res.data.data.list;
              that.page=res.data.data.page;
            }else{
              that.$vux.toast.text(res.data.msg)
            }
          })
        }else if(that.page >= 2){

          if(that.mypage > that.page){
            that.mypage=that.page
          }
          if(that.mypage == that.awardList.length){
            that.mypage=that.page-1;
          }
          this.$axios.get('/active/getUserTeaLotteryPrize?version=v2',{params:{
              limit:that.limit,
              page:that.mypage
            }}).then((res)=>{
            //  console.log(that.mypage)
            if(res.data.data.list.length != 0){
              if(res.data.code == 200 && res.data.data.list.length != 0){
                that.myhasNextPage=res.data.data.hasNextPage;
                that.awardList=res.data.data.list;
                that.page=res.data.data.page;

              }else{
                that.$vux.toast.text(res.data.msg)
              }
            }

          })

        }

      },
      submitReal(){//提交实物兑换信息
        if(!this.dhType){
          this.$vux.toast.text('请选择兑换方式')
          return
        }
        if(this.dhType===1){
          if(!this.userInfo.name){
            this.$vux.toast.text('请输入姓名')
            return
          }
          if(!(this.userInfo.phone||this.userInfo.phone.length==11)){
            this.$vux.toast.text('请输入正确的电话号')
            return
          }
          if(!this.userInfo.address){
            this.$vux.toast.text('请输入地址')
            return
          }
        }
        this.$axios.get('/active/teaExchange?version=v2',{params:{
            type:this.dhType,
            phone:this.userInfo.phone,
            name:this.userInfo.name,
            address:this.userInfo.address
          }}).then(res=>{
          if(res.data.code!=1){
            this.$vux.toast.text(res.data.msg)
          }
          this.getmyReal()
          this.flag()
        })
      },
      chooseType(val){//选中提交的方式
        this.dhType = val
      },
      getmyReal(){//获取用户兑换实物的信息
        this.$axios.get('/active/teaExchangeInfo?version=v2').then(res=>{
          if(res.data.code){
            this.userInfo = res.data.data
            this.dhType = res.data.data.type
          }
        })
      },
      getmyjl(){//我的获奖记录
        const that= this;
        that.aflag=true;
        that.mypage=1;
        this.$refs.zcbox.style.display="block";
        this.$axios.get('/active/getUserTeaLotteryPrize?version=v2',{params:{
            limit:that.limit,
            page:1
          }}).then((res)=>{
          // console.log(res.data)
          if(res.data.code == 200){
            that.myhasNextPage=res.data.data.hasNextPage;
            that.awardList=res.data.data.list;
            that.page=res.data.data.page;
          }else{
            that.$vux.toast.text(res.data.msg)
          }
        })
      },
      flag(){
        this.$refs.zcbox.style.display="none";
      },
      msg(){//阻止父元素事件
        return ""
      },
      getturn(){//点击转盘抽奖结果
        const that =this ;
        that.aflag=false;
        // that.rotating(1, 1)
        if(!that.control){
          that.control = true
          this.$axios.post('/active/teaLottery?version=v2').then(function (res) {
            if(res.data.code == 200){
              if(that.retaynum > 0){
                that.retaynum=that.retaynum-1;
              }
              that.getturnList=res.data.data;
              console.log(that.getturnList)
              const ii =that.prize_list.map(item=>item.key).indexOf(that.getturnList.key)
              //此方法为处理奖品数
              that.rotating(String(ii), 1)

            }else{
              that.control = false
              that.$vux.toast.text(res.data.msg)
            }
          })
        }
      },

      rotating(index, prize_coin) {
        if (!this.click_flag) return;
        var type = 0; // 默认为 0  转盘转动 1 箭头和转盘都转动(暂且遗留)
        var during_time = 5; // 默认为1s
        var random = Math.floor(Math.random() * 7);
        var result_index = index || random; // 最终要旋转到哪一块，对应prize_list的下标
        var result_angle = [337.5, 292.5, 247.5, 202.5, 67.5 , 112.5, 157.5, 22.5]; //最终会旋转到下标的位置所需要的度数
        var rand_circle = 6; // 附加多转几圈，2-3
        this.click_flag = false; // 旋转结束前，不允许再次触发
        if (type == 0) {
          // 转动盘子
          var rotate_angle =
            this.start_rotating_degree +
            rand_circle * 360 +
            result_angle[result_index] -
            this.start_rotating_degree % 360;
          this.start_rotating_degree = rotate_angle;
          this.rotate_angle = "rotate(" + rotate_angle + "deg)";
          // 转动指针
          // this.rotate_angle_pointer = "rotate("+this.start_rotating_degree_pointer + 360*rand_circle+"deg)";
          // this.start_rotating_degree_pointer =360*rand_circle;
          var that = this;
          // 旋转结束后，允许再次触发
          setTimeout(function() {
            that.click_flag = true;
            that.$refs.zcbox.style.display="block";
            that.mytype = 2;
            that.control =false
            // that.game_over(index, prize_coin);
          }, during_time * 1000 + 1500); // 延时，保证转盘转完
        } else {
          //
        }
      },
      getMsg(st,et,t){
        let that = this
        let timex = 0;
        if(t<st){
          timex =  parseInt((st-t)*1000)//时间毫秒差(距离活动开始)
        }else{
          if(t<et){
            this.ending = true
            timex = (et-t)*1000//时间毫秒差(距离活动结束)
          } else {
            this.end = true
          }
        }
        let day = parseInt(timex/(24*3600*1000))//天
        let hours = Math.floor(timex%(24*3600*1000)/(3600*1000))//小时
        let minutes= Math.floor(timex%(24*3600*1000)%(3600*1000)/(60*1000))//分钟
        let seconds = Math.floor(timex%(24*3600*1000)%(3600*1000)%(60*1000)/1000)//秒
        let _day = day,_hours = hours,_minutes = minutes,_seconds = seconds;
        if(timex<=0){
          that.changTime(0,0,0,0)
        }else{
          that.setInt = setInterval(function () {//倒计时算法
            if(_seconds>0){
              _seconds-=1
            }else{
              if(_minutes>0){
                _seconds = 59
                _minutes-=1
              }else{
                if(_hours>0){
                  _minutes=59
                  _hours-=1
                }else {
                  if(_day>0){
                    _day-=1
                    _hours=23
                    _minutes=59
                  }else{
                    clearInterval(that.setInt)
                    _hours=0
                    _minutes=0
                    _seconds=0
                  }
                }
              }
            }
            that.changTime(_day,_hours,_minutes,_seconds)//读取时间
          },1000)
        }
      },
      changTime(day,hours,minutes,seconds){
        let that = this
        if(day<10){
          that.times.day = '0'+day
        }else{
          that.times.day = day
        }
        if(hours<10){
          that.times.hour = '0'+hours
        }else{
          that.times.hour = hours
        }
        if(minutes<10){
          that.times.m = '0'+minutes
        }else{
          that.times.m = minutes
        }
        if(seconds<10){
          that.times.s = '0'+seconds
        }else{
          that.times.s = seconds
        }
      },

      // game_over(index, prize_coin) {
      //     this.toast_control = true;
      //     this.toast_prize = true;
      // },
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/css/reset";
  .tea{
    width: 100%;
    height: getREM(3010);
    background: url("../../assets/img/tea1.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    z-index: 10;
    img{
      vertical-align: middle;
    }
    .seven-head {
      height: 55*$r;
      background-color: #ffebad;
      padding-top: 11*$r;
      &-con {
        height: 33*$r;
        background: url("../../assets/img/regsktea.png") no-repeat;
        background-size: contain;
        background-position: center center;
        &-time{
          color: #ff706b;
          width: 600*$r;
          height: 33*$r;
          line-height: 33*$r;
          margin: 0 auto;
          .span{
            color:#000000;
            margin-left: 49%;
          }
          .span1{
            margin-left: 1%;
          }
          .span2{
            color:#000000;
            margin-left: 0;
          }
          .ss{
            margin: 0 0.5%;
            font-size: 14px;
          }
        }
        &-ending{
          background: url("../../assets/img/cending.png") no-repeat;
          background-size: contain;
          background-position: center center;
        }
        &-end{
          background: url("../../assets/img/cyend.png") no-repeat;
          background-size: contain;
          background-position: center center;
        }
      }
    }
    .both{
      width: 100%;
      height: getREM(415);
    }
    .mygift{
      height: getREM(500);
      background: url("../../assets/img/teagifta.png") no-repeat;
      background-size: 100% 100%;
      overflow: hidden;
      position: relative;
      margin-top: -0.8rem;
      .mygift-content{
        width: getREM(580);
        margin: auto;
        height: 71%;
        margin-top:14%;
        padding-top: 12*$r;
        position: relative;
        .mygift-top{
          margin-bottom: getREM(18);
          img{
            width: getREM(340);
            height: getREM(74);
            margin: auto;
            display: block;
          }
          span{
            position: absolute;
            top: getREM(5);
            right: -30*$r;
            width:getREM(142);
            height: getREM(78);
            display: block;
            background: url("../../assets/img/btnyj.png") no-repeat;
            background-size: 100% 100%;
          }
        }
        .mygift-bottom{
          font-size: getREM(21);
          li{
            overflow: hidden;
            line-height: getREM(50);
            span{
              float: left;
              line-height: getREM(50);
            }
            span:nth-child(1){
              width: getREM(280)
            }
            span:nth-child(2){
              width: getREM(80)
            }
            span:nth-of-type(3){
              color:red;
              width: getREM(220);

            }
          }

        }
      }
    }
    .banner{
      width: 90%;
      margin: auto;
      margin-top:getREM(-30);
      height: getREM(67);
      border-radius: getREM(35);
      background-color: #ebdebc;
      overflow: hidden;
      background:url("../../assets/img/tealb.png") no-repeat getREM(20)  center   #ebdebc;
      background-size: getREM(28) getREM(28);
      .log-p{
        line-height: getREM(67);
        padding-top:getREM(3);
        text-align: center;
        margin-left: getREM(10);
        text-overflow:ellipsis;white-space:nowrap;overflow:hidden;
        font-size: getREM(21);
        span{
          color: red;
          line-height: getREM(67);
        }
      }
    }
    .wheel{
      width: getREM(733);
      height: getREM(736);
      margin:auto;
      position: relative;
      overflow: hidden;
      .wheel-content{
        width: 100%;
        height: 100%;
        background: url("../../assets/img/teadial1.png") no-repeat;
        background-size: 100% 100%;
        position: absolute;

      }
      .wheel-btn{
        width: getREM(187);
        height: getREM(228);
        position: absolute;
        left:50%;
        top:50%;
        transform: translate(-50%,-60%); z-index: 1;
        .wheel-pointer{
          width: 100%;
          height: 100%;
          background: url("../../assets/img/teabtn.png") no-repeat;
          background-size: 100% 100%;
          padding-top:50%;
          p{
            text-align: center
          }
          p:nth-child(1){
            color:#000;
            font-size: getREM(28);
            font-weight: 600;
          }
          p:nth-child(2){
            font-size: getREM(20);
            span{
              color: red;
            }
          }

        }
      }
    }
    .myteabtn{
      @include flex-space;
      padding: 0 5%;
      img{
        height: 110*$r;
      }
    }
    .zcbox{
      display: none;
      width: 100%;
      height: 100%;
      background: rgba($color: #000000, $alpha: 0.5);
      position: absolute;
      z-index: 40;
      left:0;
      right: 0;
      top: 0;
      .boxbg{
        background: url("../../assets/img/teaarawdbgmy.png") no-repeat center !important;
        background-size: getREM(594) getREM(710) !important;
      }
      .box{
        width: 100%;
        height: getREM(1197);
        background: url("../../assets/img/teaarawdbg.png") no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: 27%;
        z-index: 15;
        &-dh{
          position: absolute;
          top: 35%;
          right: 0;
          left: 0;
          margin: 0 auto;
          z-index: 15;
          width: 656*$r;
          height: 866*$r;
          background: url("../../assets/img/dhtczc.png") no-repeat;
          background-size: 100% 100%;
          &-title{
            margin-top: 90*$r;
            color: #898989;
            text-align: center;
          }
          &-info{
            img{
              display: block;
              margin-top: 41*$r;
              margin-left: 32*$r;
              width: 30*$r;
              height: 30*$r;
              margin-bottom: 20*$r;
            }
            &-img{
              margin-top: 30*$r!important;
              margin-bottom: 18*$r!important;
            }
            &-con{
              height: 238*$r;
              li{
                height: 67*$r;
                line-height: 68*$r;
                @include flex-space;
                justify-content: flex-start;
                margin-bottom: 17*$r;
                padding-left: 88*$r;
                .weui-cell{
                  width: 66%!important;
                  @include t-overflow(1);
                }
              }
            }
            &-ji{
              height: 68*$r;
              @include flex-space;
              justify-content: flex-start;
              padding-left: 92*$r;
              div{
                width: 155*$r;
                margin-right: 46*$r;
              }
            }
            &-kf{
              margin-top: 38*$r!important;
              margin-bottom: 18*$r!important;
            }
            &-qq{
              padding-left: 88*$r;
            }
          }
          &-submit{
            width: 240*$r;
            height: 120*$r;
            margin: 0 auto;
          }
        }
        .box-content,.turenArw{
          width: getREM(482);
          height: getREM(700);
          position: absolute;
          top: 22%;
          z-index: 800 !important;
          left:getREM(134);
          overflow: hidden;
          h3{
            font-size: getREM(33);
            text-align: center;
            font-weight: 600;
            margin-top: getREM(50);
          }
          h4{
            font-size: getREM(27);
            font-weight: 600;
            float: left;
            margin:getREM(70) 0 getREM(20) 0;

          }
          h4:nth-child(1){
            width: 60%
          }
          h4:nth-child(2){
            width: 40%;
            float: right;
          }
          .box-content-middle{
            width: 100%;
            overflow: hidden;
            li{
              width: 100%;
              overflow: hidden;
              font-size: getREM(21);
              line-height: getREM(50);
              span:nth-child(1){
                float: left;
                width: 60%;
              }
              span:nth-child(2){
                float: right;
                width: 40%;
                color: #ababab;
              }
            }
          }
          .box-btn-content{
            position: absolute;
            width: 100%;
            bottom: getREM(50);
            padding: 0 getREM(15);
            .pagebtn{
              width: getREM(200);
              height: getREM(69);
              background: url("../../assets/img/box-btn.png") no-repeat;
              background-size: 100% 100%;
              float: left;
              font-size: getREM(24);
              color: #000;
              text-align: center;
              line-height: getREM(69);
            }
            .pagebtn:nth-child(2){
              float: right;
            }
          }

        }
        .box-content{

        }

        .turenArw{
          h3{
            font-size: getREM(33);
            text-align: center;
            font-weight: 600;
            margin-top: getREM(50);
            padding-left: getREM(80);
          }
          img{
            width: getREM(360);
            height: getREM(360);
            padding-top:getREM(60);
            display: block;
            margin: auto;
          }
          p{
            text-align:center;
            font-size: getREM(22);
            color: #3a3a3a;
            margin-bottom: getREM(50);
            font-weight: 500;
          }
          .turenArwBtn{
            width: getREM(200);
            height: getREM(69);
            margin: auto;
            font-size: getREM(24);
            text-align: center;
            font-weight: 600;
            line-height: getREM(69);
            background: url("../../assets/img/box-btn.png") no-repeat;
            background-size: 100% 100%;
          }
        }
      }

    }
    .teaturnGz{
      width: getREM(702);
      height: getREM(620);
      margin: auto;
      background: url("../../assets/img/teatrun-gzbg.png") no-repeat;
      background-size: 100% 100%;
      overflow: hidden;
      margin-top:getREM(50);
      .teaturnGz-top{
        width: getREM(340);
        height: getREM(74);
        margin: auto;
        display: block;
        margin-top: getREM(50);
      }
      ul{
        margin-top: getREM(30);
        li{
          padding-left: 6%;
          span{
            display: block;
            color:#fff;
            background-color: #7aca4d;
            width: getREM(33);
            height: getREM(33);
            line-height: getREM(33);
            border-radius: 50%;
            text-align: center;
            float: left;
            margin-top:getREM(3.5);
            margin-right: getREM(8);

          }
          .teaturnGz-span{
            background-color: #fff;
          }
          width: 100%;
          line-height: getREM(40);
          font-size: getREM(22);
          color: #000;
        }
      }
    }
    .ewm{
      width: getREM(255);
      height: getREM(255);
      margin: auto;
      display: block;
      margin-top: getREM(50);
    }
    .teaturnGz-ss{
      font-size: getREM(30);
      font-weight: 600;
      text-align: center;
      margin-top: getREM(24);
    }


  }
</style>

