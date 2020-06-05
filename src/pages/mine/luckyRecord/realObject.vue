<template>
  <div class="invented">
    <div class="invented-head">
      <p class="invented-head-title">{{data.name}}</p>
      <div class="invented-head-con">
        <img class="invented-head-con-img" :src="data.pic"/>
        <div class="invented-head-con-text">
          <div class="invented-head-con-text-item">
            <span>商品期数：</span>
            <span class="color1">{{data.times_num}}</span>
          </div>
          <div class="invented-head-con-text-item">
            <label>幸运号码：</label>
            <span class="color3">{{data.winner_code}}</span>
          </div>
          <div class="invented-head-con-text-item">
            <label>本期参与：</label>
            <span class="color3">{{data.buy_count}}</span>
            <span>次</span>
          </div>
          <div class="invented-head-con-text-item">
            <label>揭晓时间：</label>
            <span>{{data.etime}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="invented-content" v-show="alreadyChoose!=2">
      <p class="invented-content-title">奖品跟踪</p>
      <div class="invented-content-con">
        <!--进度条最大值100%; 16,37,57,79,100-->
        <div class="invented-content-con-box" :style="alreadyChoose == 4?'height:93%':alreadyChoose == 5&&aliData.name?'height:94.5%':alreadyChoose == 5?'height:95.5%':alreadyChoose==1?'height:70.5%':''">
          <div class="invented-content-con-box-box">
            <div class="invented-content-con-box-line" :style="'height:'+ percent +'%;'"></div>
            <div class="invented-content-con-box-lineGray"></div>
          </div>
        </div>
        <!--进度条结束-->
        <div class="invented-content-con-item">
          <div class="invented-content-con-item-gress">
          </div>
          <div class="invented-content-con-item-text">
            <div class="invented-content-con-item-text-title">
              <span>恭喜中奖</span>
              <span>{{data.etime}}</span>
            </div>
          </div>
        </div>
        <div class="invented-content-con-item" v-if="alreadyChoose==1">
          <div :class="{'ytop':true,'invented-content-con-item-gress':percent>44,'quan':percent==44}">
          </div>
          <div class="invented-content-con-item-text">
            <div class="invented-content-con-item-text-title cert">
              <span :class="percent==44?'color3':''">实名认证</span>
            </div>
            <div class="invented-content-con-item-text-con">
              <img src="../../../assets/img/jjcert.png"/>
              <span v-if="data.has_auth===0">为了您的账号安全，请完成实名认证</span>
              <span v-else>您已完成实名认证</span>
              <div :class="{'certBtn':true,'certBtnDefault':data.has_auth!=1}" @click="goCert">{{data.has_auth===0?'去认证':'已认证'}}</div>
            </div>
          </div>
        </div>
        <!--正常实物发货流程-->
        <div v-if="alreadyChoose==3">
          <div class="invented-content-con-item">
            <div :class="{'ytop':true,'invented-content-con-item-gress':percent>37,'quan':percent==37}">
            </div>
            <div class="invented-content-con-item-text">
              <div class="invented-content-con-item-text-title cert">
                <span :class="percent==37?'color3':''">确认收货地址</span>
                <span v-if="data.utime">{{data.utime}}</span>
              </div>
              <div class="invented-content-con-item-text-con">
                <img src="../../../assets/img/jjcert.png"/>
                <div v-if="!data.user_address">
                  <span>请尽快确认收货地址</span>
                  <div class="certBtn certBtnDefault" @click="navigateTo('address',{'orderId':orderId,type:3})">确认收货地址</div>
                </div>
                <div class="address-info" v-else>
                  <p>收货信息</p>
                  <p>收货人：{{getAdressInfo(1)}}</p>
                  <p>联系方式：{{getAdressInfo(2)}}</p>
                  <p>详细地址：{{getAdressInfo(3)}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="invented-content-con-item">
            <div :class="{'ytop':true,'invented-content-con-item-gress':percent>53,'quan':percent==53}">
            </div>
            <div class="invented-content-con-item-text">
              <div class="invented-content-con-item-text-title cert">
                <span :class="percent==53?'color3':''">等待发货</span>
                <span v-if="data.express_time">{{data.express_time}}</span>
              </div>
              <div class="invented-content-con-item-text-con">
                <img src="../../../assets/img/jjcert.png"/>
                <div v-if="!data.express_time">
                  <span>48小时闪电发货(不含节假日)</span>
                </div>
                <div class="address-info" v-else>
                  <p>物流信息</p>
                  <p v-for="item in data.express_name.split(',')">{{item}}</p>
                  <div class="certBtn certBtnDefault" @click="goParas('express',{'name':data.express_name.split(',')[0].split(':')[1],'code':data.express_name.split(',')[1].split(':')[1]})">查询物流</div>
                </div>
              </div>
            </div>
          </div>
          <div class="invented-content-con-item">
            <div :class="{'ytop':true,'invented-content-con-item-gress':percent>78,'quan':percent==78}">
            </div>
            <div class="invented-content-con-item-text">
              <div class="invented-content-con-item-text-title cert">
                <span :class="percent==78?'color3':''">确认收货</span>
                <span v-if="data.end_time">{{data.end_time}}</span>
              </div>
              <div class="invented-content-con-item-text-con">
                <img src="../../../assets/img/jjcert.png"/>
                <span>{{percent<=78?'确认商品安全验收':'商品已确认收货'}}</span>
                <div :class="{'certBtn':true,'certBtnDefault':percent==78}" @click="confirmGoods">确认收货</div>
              </div>
            </div>
          </div>
          <div class="invented-content-con-item">
            <div :class="{'ytop':true,'invented-content-con-item-gress':percent==100&&data.is_comment==1,'quan':percent==100&&data.is_comment==0}">
            </div>
            <div class="invented-content-con-item-text">
              <div class="invented-content-con-item-text-title cert">
                <span :class="percent==100&&data.is_comment==0?'color3':''">晒单分享</span>
              </div>
              <div class="invented-content-con-item-text-con">
                <img src="../../../assets/img/jjcert.png"/>
                <span>晒单审核通过，将奖励2积分哦～</span>
                <div :class="{'certBtn':true,'certBtnDefault':percent==100&&data.is_comment==0}" @click="showOrder">{{percent==100&&data.is_comment==0?'去晒单':'已晒单'}}</div>
              </div>
            </div>
          </div>
        </div>
        <!--领取积分流程-->
        <div v-if="alreadyChoose==4">
          <div class="invented-content-con-item">
            <div :class="{'ytop':true,'invented-content-con-item-gress':percent>37,'quan':percent==37}">
            </div>
            <div class="invented-content-con-item-text">
              <div class="invented-content-con-item-text-title cert">
                <span :class="percent==37?'color3':''">确认领取</span>
              </div>
              <div class="invented-content-con-item-text-con">
                <img src="../../../assets/img/jjcert.png"/>
                <div v-if="!data.user_address">
                  <span>领取{{data.coins}}积分</span>
                </div>
              </div>
            </div>
          </div>
          <div class="invented-content-con-item">
            <div :class="{'ytop':true,'invented-content-con-item-gress':percent>63,'quan':percent==63}">
            </div>
            <div class="invented-content-con-item-text">
              <div class="invented-content-con-item-text-title cert">
                <span :class="percent==63?'color3':''">奖品审核</span>
              </div>
              <div class="invented-content-con-item-text-con">
                <img src="../../../assets/img/jjcert.png"/>
                <div>
                  <span>{{percent>63?'审核通过':'48小时内审核(不含节假日)'}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="invented-content-con-item">
            <div :class="{'ytop':true,'invented-content-con-item-gress':percent>83,'quan':percent==83}">
            </div>
            <div class="invented-content-con-item-text">
              <div class="invented-content-con-item-text-title cert">
                <span :class="percent==83?'color3':''">发放奖品</span>
                <span v-if="data.express_time">{{data.express_time}}</span>
              </div>
              <div class="invented-content-con-item-text-con">
                <img src="../../../assets/img/jjcert.png"/>
                <span>{{percent<=83?'审核通过即可获得奖品':data.coins+'积分已经发放,在[我的 - 账户明细]查看.'}}</span>
              </div>
            </div>
          </div>
        </div>
        <!--实物代售流程-->
        <div v-if="alreadyChoose==5">
          <div class="invented-content-con-item">
            <div :class="{'ytop5':true,'invented-content-con-item-gress':percent>25.5,'quan':percent==25.5}">
            </div>
            <div class="invented-content-con-item-text">
              <div class="invented-content-con-item-text-title cert">
                <p :class="percent==25.5?'color3':''">填写支付宝账号</p>
                <div class="invented-content-con-item-text-title" style="padding-left: 0">
                  <p>绑定后如需解绑或填写错误请加QQ联系客服：</p>
                  <div class="copyBtn">
                    <p :class="percent==25.5?'color3':''">3073810793</p>
                    <div v-clipboard:copy="3073810793" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</div>
                  </div>
                </div>
              </div>
              <div class="invented-content-con-item-text-con">
                <img src="../../../assets/img/jjcert.png"/>
                <div class="payAcount">
                  <div class="payAcount-item">
                    <label>支付宝</label>
                    <div  class="payAcount-item-input">
                      <input v-if="data.status_order==2&&!data.user_address_id&&!aliData.account" v-model="alipayAccount" placeholder="请输入手机号或邮箱" @change="testContent"/>
                      <input v-else-if="data.status_order==2&&!data.user_address_id&&aliData.account" :value="fillterAccount(alipayAccount)" placeholder="请输入手机号或邮箱" :readonly="aliData.account?true:false"/>
                      <input v-else-if="data.status_order==2&&data.user_address_id==3" :value="fillterAccount(alipayAccount)" placeholder="请输入手机号或邮箱" :readonly="aliData.account?true:false"/>
                      <input v-else :value="data.alipay_account.account" placeholder="请输入手机号或邮箱" :readonly="aliData.account?true:false"/>
                    </div>
                    <p v-if="errInfo" class="errInfo">支付宝错误,请填写正确的账号</p>
                  </div>
                  <div class="payAcount-item" :style="data.user_address_id?'border-bottom: none;padding-bottom:0;':''">
                    <label>姓名</label>
                    <div class="payAcount-item-input">
                      <input v-if="data.status_order==2&&!data.user_address_id&&!aliData.name" v-model="alipayName" placeholder="请输入真实姓名" @change="testName"/>
                      <input v-else-if="data.status_order==2&&!data.user_address_id&&aliData.name" :value="fillterName(alipayName)" placeholder="请输入真实姓名" :readonly="aliData.name?true:false"/>
                      <input v-else-if="data.status_order==2&&data.user_address_id==3" :value="fillterName(alipayName)" placeholder="请输入真实姓名" :readonly="aliData.name?true:false"/>
                      <input v-else :value="fillterName(data.alipay_account.name)" placeholder="请输入真实姓名" :readonly="aliData.name?true:false"/>
                    </div>
                    <p v-if="errName" class="errInfo">姓名必须是汉字</p>
                  </div>
                  <div class="payAcount-submit" @click="submitAlipay" v-if="!data.user_address_id">确认</div>
                </div>
              </div>
            </div>
          </div>
          <div class="invented-content-con-item">
            <div :class="{'ytop':true,'invented-content-con-item-gress':percent>73.5,'quan':percent==73.5}">
            </div>
            <div class="invented-content-con-item-text">
              <div class="invented-content-con-item-text-title cert">
                <span :class="percent==73.5?'color3':''">奖品审核</span>
              </div>
              <div class="invented-content-con-item-text-con">
                <img src="../../../assets/img/jjcert.png"/>
                <div>
                  <span>{{percent>73.5?'审核通过':'48小时内审核(不含节假日)'}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="invented-content-con-item">
            <div :class="{'ytop':true,'invented-content-con-item-gress':percent>99,'quan':percent==100}">
            </div>
            <div class="invented-content-con-item-text">
              <div class="invented-content-con-item-text-title cert">
                <span :class="percent==100?'color3':''">{{percent==100?'已发放奖品':'未发放奖品'}}</span>
                <span v-if="data.express_time">{{data.express_time}}</span>
              </div>
              <div class="invented-content-con-item-text-con">
                <img src="../../../assets/img/jjcert.png"/>
                <span>{{percent<100?getLevel(data.ulevel,data.submit_ulevel):'奖品已经发放,请去支付宝查看.'}}</span>
              </div>
            </div>
          </div>
        </div>
        <!--用户兑换选项-->
        <div v-if="alreadyChoose==1">
          <div class="invented-content-con-item">
            <div class="ytop quan">
            </div>
            <div class="invented-content-con-item-text">
              <div class="invented-content-con-item-text-title cert" @click="truthContro=true">
                <div class="titleContent">
                  <span class="color3">选择领取奖品方式(3选1)</span>
                  <img src="../../../assets/img/wenhao5d6f.png" class="qts">
                </div>
              </div>
              <div class="invented-content-con-item-text-con">
                <img src="../../../assets/img/jjcert.png"/>
                <!--3中选项-->
                <div class="invented-content-con-item-text-con-three">
                  <ul>
                    <li>
                      <div class="content">
                        <div class="content-title">
                          <span class="content-title-num">1</span>
                          <p class="content-title-induce">领取{{data.coins}}积分</p>
                          <span class="content-title-z color3">(8折发放)</span>
                          <span class="content-title-tj">推荐</span>
                        </div>
                        <p class="content-second">秒到</p>
                      </div>
                      <div class="btn" :class="data.has_auth?'':'gay'" @click="chooseGetMethod(1)">立即领取</div>
                    </li>
                    <li>
                      <div class="content">
                        <div class="content-title">
                          <span class="content-title-num">2</span>
                          <p class="content-title-induce">实物代售</p>
                          <span class="content-title-z color3">(当前等级{{data.ulevel}}级, {{data.ulevel<=6?7:data.ulevel==7?72:data.ulevel==8?75:data.ulevel==9?77:data.ulevel>=10?8:'7'}}折发放)</span>
                        </div>
                        <p class="content-second">审核时间24小时内</p>
                      </div>
                      <div class="btntext" :class="data.has_auth?'':'gay'" @click="goSell">确定</div>
                    </li>
                    <li>
                      <div class="content">
                        <div class="content-title">
                          <span class="content-title-num">3</span>
                          <p class="content-title-induce">领取实物商品</p>
                        </div>
                        <p class="content-second">发货时间72小时内</p>
                      </div>
                      <div class="btntext" :class="data.has_auth?'':'gay'" @click="chooseGetMethod(3)">确定</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--点击问好实物代售说明-->
    <div class="chooseBox" @touchmove.prevent v-if="truthContro" @click="truthContro=false">
      <div class="chooseBox-box">
        <div class="chooseBox-box-title">实物领取说明</div>
        <ul>
          <li style="text-align: left;padding-left: 12px;color: #fb762a;">
            1、领取积分
          </li>
          <li>
            发放积分 = 商品总需 × 8折
          </li>
          <li style="text-align: left;padding-left: 12px;color: #fb762a;">
            2、实物代售
          </li>
          <li>
            发放金额 = 商品总需 × 折扣
          </li>
          <li>
            等级0-6：<span class="color3">7折</span> 发放
          </li>
          <li>
            等级7：<span class="color3">72折</span> 发放
          </li>
          <li>
            等级8：<span class="color3">75折</span> 发放
          </li>
          <li>
            等级9：<span class="color3">77折</span> 发放
          </li>
          <li>
            等级10：<span class="color3">8折</span> 发放
          </li>
        </ul>
      </div>
    </div>
    <!--确认选择弹框-->
    <div class="chooseBox" @touchmove.prevent v-if="chooseGet">
      <div class="chooseBox-box">
        <div class="chooseBox-box-title">提示</div>
        <div class="chooseBox-box-content">
          <p>{{chooseGetText}}</p>
          <p>确认选择后无法更改</p>
          <div class="chooseBox-box-content-btn">
            <div @click="chooseGet=false">取消</div>
            <div @click="submitChoice">确定</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import clip from '@/assets/clipboard'
  export default {
    components: {},
    name: "invented-object",
    data(){
      return{
        percent:0,//进度0条控制器16,37,57,79,100
        data:[],
        orderId:'',//订单id
        chooseGet:false,
        chooseGetText:'',
        truthContro:false,
        chooseType:'',
        alreadyChoose:2,//初始2不显示任何
        alipayName:'',
        alipayAccount:'',
        errInfo:false,
        aliData:{},
        errName:false,
      }
    },
    created(){
      this.orderId = this.$route.query.id
      this.getAlipay()
    },
    methods:{
      goSell(){
        this.alreadyChoose = 5
        this.percent=25.5
      },
      getLevel(val,val2){
        let lv = '';
        if(this.data.user_address_id){
          lv = val2
        }else{
          lv = val
        }
        if(val<=6){
          return '等级 '+lv+', 7折发放'
        }
        if(val==7){
          return '等级 '+lv+', 72折发放'
        }
        if(val==8){
          return '等级 '+lv+', 75折发放'
        }
        if(val==9){
          return '等级 '+lv+', 77折发放'
        }
        if(val>=10){
          return '等级 '+lv+', 8折发放'
        }
      },
      chooseGetMethod(val){//选择领奖方式
        let that = this
        if(that.data.has_auth==1){
          this.chooseGet = true
          this.chooseType = val
          switch (val){
            case 1:
              this.chooseGetText = '确认领取'+that.data.coins+'积分?'
              break;
            case 2:
              this.chooseGetText = '确认进行实物代售?'
              break;
            case 3:
              this.chooseGetText = '确认领取实物商品?'
              break;
          }
        }else{
          this.$vux.toast.text('请先进行实名认证')
        }
      },
      submitChoice(){//提交领奖方式
        let that = this
        let type = ''
        switch (that.chooseType){
          case 1:
            type = 2
            break;
          case 2:
            type = 3
            break;
          case 3:
            that.navigateTo('address',{'orderId':that.orderId,type:3})
            break;
        }
        if(that.chooseType!=3){
          this.$axios.post('order/confirmAddress?version=v2',{order_id:that.orderId,address_id:type}).then( res=>{
            if(res.data.code==1){
              this.chooseGet=false
              this.getMsg();
            }else{
              this.$vux.toast.text(res.data.msg)
            }
          })
        }
      },
      onCopy(){
        this.$vux.toast.text('复制成功')
      },
      onError(){
        this.$vux.toast.text('复制失败,请稍后再试')
      },
      cliport(data){//复制全部卡密
        //下面过滤全部数据
      },
      cliportItem(data,e){//复制单个
        let str = "卡号:"+data.code+';密码:'+data.pass
        clip(str,e)
      },
      fillterName(val){
        return val.substr(0,1)+'**'
      },
      fillterAccount(val){
        if(val.length<=11){
          return val.substr(0,4)+'****'+val.substr(7,val.length-1)
        }else if(val.length>11){
          return val.substr(0,4)+'****'+val.substr(8,val.length-1)
        }
      },
      goCert(){//去实名认证
        if(this.data.has_auth===0){
          this.navigateTo('certification')
        }
      },
      confirmGoods(){//确认收货
        let that = this
        if(that.percent==78){
          this.$axios.post('/order/confirmReceive?version=v2',{order_id:that.orderId}).then((res)=>{
            if(res.data.code===1){
              this.getMsg()
            }else{
              this.$vux.toast.text(res.data.msg)
            }
          })
        }
      },
      showOrder(){// 去晒单
        if(this.data.is_comment===0){
          this.navigateTo('showContent',{data:JSON.stringify(this.data)})
        }
      },
      getAdressInfo(val){//过滤地址信息
        let arr = this.data.user_address.split(',')
        switch (val){
          case 1:
            return this.splitStr(arr[0])
            break;
          case 2:
            return this.splitStr(arr[1])
            break;
          case 3:
            return this.splitStr(arr[2])
            break;
        }
      },
      splitStr(str){
        let arr = str.split(':')
        return arr[1]
      },
      getMsg(){//获取订单详情
        let that =this
        this.$axios.post('user/prizeView?version=v2',{id:that.orderId}).then((res)=>{
          if(res.data.code===1){
            this.data = res.data.data
            if(that.data.has_auth===0){
              that.percent=44
            }else{
              if(that.data.user_address){
                //显示实物收货界面
                that.alreadyChoose = 3
              }else{
                if(that.data.user_address_id==2){
                  //显示积分界面
                  that.alreadyChoose = 4
                }else{
                  //显示填写实物代售界面
                  that.alreadyChoose = 5
                }
              }
              switch (that.data.status_order){
                case 2:
                  if(that.data.user_address_id){
                    //待发货
                    if(that.alreadyChoose == 3){
                      that.percent=53
                    }
                    if(that.alreadyChoose == 4){
                      that.percent=63
                    }
                    if(that.alreadyChoose == 5){
                      if(that.data.user_address_id==3&&that.aliData.name){
                        that.percent=73.5
                      }else{
                        that.percent=25.5
                      }
                    }
                  }else{
                    that.alreadyChoose = 1
                    that.percent=100//待确认
                  }
                  break;
                case 3:
                  if(that.alreadyChoose == 3){//待收货
                    that.percent=78
                  }
                  if(that.alreadyChoose == 4){
                    that.percent=100
                  }
                  if(that.alreadyChoose == 5){
                    that.percent=100
                  }
                  break;
                case 4:
                  if(that.alreadyChoose == 3){//待收货
                    that.percent=100//晒单
                  }
                  if(that.alreadyChoose == 4){
                    that.percent=100
                  }
                  if(that.alreadyChoose == 5){
                    that.percent=100
                  }
                  break;
              }
            }
          }else{
            this.$vux.toast.text(res.data.msg)
          }
        })
      },
      getAlipay(){//获取支付宝信息
        this.$axios.post('user/getAlipayAccount?version=v2').then(res=>{
          if(res.data.code==1){
            this.getMsg()
            if(res.data.data){
              this.aliData = res.data.data
              this.alipayName = res.data.data.name
              this.alipayAccount = res.data.data.account
            }
          }else{
            this.$vux.toast.text(res.data.msg)
          }
        })
      },
      testContent(){
        let ph = /^1[3-8]\d{9,9}$/,
          em = /^[a-zA-Z\d_.-]+@[a-zA-Z\d]+(\.[a-zA-Z\d]+)*\.[a-zA-Z\d]{2,6}$/;
        if(!(ph.test(this.alipayAccount)||em.test(this.alipayAccount))){
          this.errInfo = true
        }else{
          this.errInfo = false
        }
      },
      testName(){
        let han = /^[\u4e00-\u9fa5]+$/;
        if(!han.test(this.alipayName)){
          this.errName= true
        }else{
          this.errName= false
        }
      },
      submitAlipay(){
        if(this.aliData.name){
          this.chooseType = 2
          this.submitChoice()//直接提交实物代售
        }else{
          if(!this.alipayAccount){
            this.$vux.toast.text('账户不能为空')
            return
          }
          if(!this.alipayName){
            this.$vux.toast.text('姓名不能为空')
            return
          }
          let ph = /^1[3-8]\d{9,9}$/,
            em = /^[a-zA-Z\d_.-]+@[a-zA-Z\d]+(\.[a-zA-Z\d]+)*\.[a-zA-Z\d]{2,6}$/;
          if(!(ph.test(this.alipayAccount)||em.test(this.alipayAccount))){
            this.errInfo = true
            return
          }
          let han = /^[\u4e00-\u9fa5]+$/;
          if(!han.test(this.alipayName)){
            this.errName= true
            return
          }
          this.$axios.post('user/addAlipayAccount?version=v2',{account:this.alipayAccount,name:this.alipayName}).then(res=>{
            if(res.data.code==1){
              this.chooseType = 2
              this.getAlipay()
              this.submitChoice()
            }else{
              this.$vux.toast.text(res.data.msg)
            }
          })
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/reset.scss";
  .invented{
    @include ios-Scroll;
    @include appcontent;
    padding-bottom: 40*$r;
    color: #898989;
    &-head{
      width: 92%;
      height: 269*$r;
      padding: 26*$r 26*$r 16*$r 30*$r;
      background-color: #ffffff;
      border-radius: 10*$r;
      margin: 0 auto;
      margin-top: 20*$r;
      overflow: hidden;
      &-title{
        @include t-overflow(1);
        font-size: 30*$r;
        color: #4a4a4a;
      }
      &-con{
        @include flex-space;
        justify-content: flex-start;
        margin-top: 10*$r;
        &-img{
          width: 176*$r;
          height: 176*$r;
          margin-right: 24*$r;
        }
        &-text{
          height: 176*$r;
          &-item{
            color: #898989;
            line-height: 45*$r;
          }
        }
      }
    }
    &-content{
      width: 92%;
      margin: 0 auto;
      padding-top: 37*$r;
      background-color: #f5f5f5;
      &-title{
        color: #4a4a4a;
        font-size: 26*$r;
        margin-bottom: 22*$r;
      }
      &-con{
        padding-left: 26*$r;
        position: relative;
        &-box{
          position: absolute;
          width: 1px;
          height: 96%;
          left: 36*$r;
          top: 30*$r;
          &-box{
            position: relative;
            height: inherit;
          }
          &-line{
            position: absolute;
            width: 1px;
            transition: all 0.2s ease-in-out;
            background-color: #fb762a;
            z-index: 10;
          }
          &-lineGray{
            position: absolute;
            width: 1px;
            height: 100%;
            background-color: #e2e2e2;
            z-index: 8;
          }
        }
        &-item{
          @include flex-space;
          justify-content: flex-start;
          position: relative;
          .ytop{
            position: absolute;
            top:132*$r;
            width: 23*$r;
            height: 23*$r;
            background-color: #ffffff;
            border: solid 1px #e2e2e2;
            border-radius: 50%;
            z-index: 100;
          }
          .ytop5{
            position: absolute;
            top:206*$r;
            width: 23*$r;
            height: 23*$r;
            background-color: #ffffff;
            border: solid 1px #e2e2e2;
            border-radius: 50%;
            z-index: 100;
          }
          &-gress{
            width: 23*$r;
            height: 23*$r;
            background-color: #fb762a!important;
            border: solid 1px #fb762a!important;
            border-radius: 50%;
            position: absolute;
            z-index: 100;
            &-gray{
              width: 23*$r;
              height: 23*$r;
              border-radius: 50%;
              position: absolute;
              z-index: 100;
              border: solid 1px #e2e2e2;
              background-color: #f5f5f5;
            }
            &-color{
              border: solid 1px #fb762a;
              background-color: #f5f5f5;
            }
          }
          .quan{
            width: 23*$r;
            height: 23*$r;
            background-color: #ffffff;
            border: solid 1px #fb762a;
            border-radius: 50%;
            position: absolute;
            z-index: 100;
          }
          &-text{
            margin-left: 49*$r;
            width: 100%;
            &-title{
              padding-left: 13*$r;
              .copyBtn{
                @include flex-space;
                margin-bottom: 10*$r;
                div{
                  padding: 2*$r 10*$r;
                  background-color: #fb762a;
                  color: #ffffff;
                  border-radius: 6*$r;
                  font-size: 22*$r;
                }
              }
              .titleContent{
                @include flex-space;
                justify-content: flex-start;
              }
            }
            .cert{
              margin-top: 36*$r;
              margin-bottom: 21*$r;
            }
            &-con{
              padding: 33*$r 28*$r 33*$r 28*$r;
              background-color: #ffffff;
              border-radius: 4*$r;
              border: solid 1px #e2e2e2;
              position: relative;
              img{
                width: 10*$r;
                height: 17*$r;
                position: absolute;
                top: 35*$r;
                left: -10*$r;
              }
              .address-info{
                line-height: 40*$r;
                .certBtn{
                  position: absolute;
                  right: 0;
                  top: 18*$r;
                  padding: 0 18*$r;
                  background-color: #bdbdbd;
                  border-radius: 10*$r;
                  color: #FFFFFF;
                  text-align: center;
                  line-height: 60*$r;
                }
                position: relative;
                p:nth-child(1){
                  font-weight: 600;
                }
              }
              .certBtn{
                position: absolute;
                right: 35*$r;
                top: 18*$r;
                padding: 4*$r 18*$r;
                background-color: #bdbdbd;
                border-radius: 10*$r;
                color: #FFFFFF;
                text-align: center;
                line-height: 60*$r;
              }
              .certBtnDefault{
                background-color: #fb762a!important;
              }
              &-center{
                text-align: center;
                .fenline{
                  display: inline-block;
                  vertical-align: middle;
                  width: 2px;
                  height: 60*$r;
                  background-color: #bdbdbd;
                  margin: 0 37*$r;
                }
                .btnWay{
                  width: 184*$r;
                  height: 60*$r;
                  display: inline-block;
                  vertical-align: middle;
                  background-color: #bdbdbd;
                  border-radius: 10*$r;
                  color: #FFFFFF;
                  text-align: center;
                  line-height: 60*$r;
                  position: relative;
                  .gg{
                    position: absolute;
                    top: unset;
                    left: unset;
                    bottom: -8*$r;
                    right: -11*$r;
                    z-index: 6;
                    width: 22*$r;
                    height: 22*$r;
                  }
                }
              }
              &-three{
                ul{
                  li{
                    border-bottom: solid 1px #e1e1e1;
                    padding-bottom: 18*$r;
                    @include flex-space;
                    position: relative;
                    .content{
                      &-title{
                        @include flex-space;
                        justify-content: flex-start;
                        color: #666666;
                        &-num{
                          display: block;
                          width: 28*$r;
                          height: 28*$r;
                          border: solid 1px #666666;
                          text-align: center;
                          line-height: 28*$r;
                          border-radius: 50%;
                          font-size: 22*$r;
                        }
                        &-induce{
                          margin-right: 24*$r;
                          margin-left: 10*$r;
                        }
                        &-tj{
                          padding: 4*$r 8*$r;
                          background-color: #fb2a2a;
                          color: #ffffff;
                          border-radius: 8*$r;
                          font-size: 22*$r;
                          text-align: center;
                          line-height: 26*$r;
                          margin-left: 18*$r;
                        }
                      }
                      &-second{
                        color: #0099ff;
                        padding-left: 38*$r;
                      }
                    }
                    .btn{
                      padding: 12*$r 18*$r;
                      background-color: #fb762a;
                      color: #ffffff;
                      border-radius: 10*$r;
                      position: absolute;
                      right: 0;
                      top: 0;
                    }
                    .btntext{
                      padding: 12*$r 6*$r;
                      font-size: 26*$r;
                      letter-spacing: 2px;
                      text-decoration: underline;
                      color: #fb762a;
                      position: absolute;
                      right: 32*$r;
                      top: 18*$r;
                    }
                    .gay{
                      background-color: #bdbdbd;
                      color: #ffffff;
                    }
                  }
                  li:nth-child(2){
                    padding-top: 18*$r;
                  }
                  li:nth-last-child(1){
                    padding-top: 18*$r;
                    padding-bottom: 0;
                    border-bottom: none;
                  }
                }
              }
              .payAcount{
                &-item{
                  @include flex-space;
                  border-bottom: solid 1px #e1e1e1;
                  padding-bottom: 30*$r;
                  position: relative;
                  label{}
                  &-input{
                    height: 24px;
                    input{
                      border-width:0;
                      text-align:right;
                      outline: none;
                      height: inherit;
                      color: #898989;
                    }
                  }
                  .errInfo{
                    position: absolute;
                    bottom: 2px;
                    right: 10px;
                    color: #ff3333;
                  }
                }
                &-item:nth-child(2){
                  padding-top: 30*$r;
                }
                &-submit{
                  width: 124*$r;
                  height: 59*$r;
                  text-align: center;
                  line-height: 59*$r;
                  background-color: #fb762a;
                  color: #ffffff;
                  margin: 0 auto;
                  margin-top: 32*$r;
                  border-radius: 8*$r;
                }
              }
            }
            &-card{
              &-title{
                color: #4a4a4a;
                padding-left: 10*$r;
                position: relative;
                .ctrlc{
                  position: absolute;
                  top:0;
                  right: 0;
                }
              }
              &-con{
                background-color: #ffffff;
                border-radius: 4*$r;
                position: relative;
                border: solid 1px #e2e2e2;
                img{
                  width: 10*$r;
                  height: 17*$r;
                  position: absolute;
                  top: 35*$r;
                  left: -10*$r;
                }
                ul{
                  height: auto;
                  li{
                    width: 92%;
                    height: 156*$r;
                    background-color: #f5f5f5;
                    border-radius: 10*$r;
                    line-height: 108*$r;
                    margin: 21*$r auto;
                    .card-title{
                      height: 42*$r;
                      line-height: 44*$r;
                      background-color: #eeeeee;
                      font-size: 18*$r;
                      label{
                        padding: 6*$r 6*$r;
                        background-color: #ffffff;
                        border-radius: 6*$r;
                        margin-right: 40*$r;
                        margin-left: 30*$r;
                      }
                      span:nth-child(2){
                        margin-right: 80*$r;
                      }
                    }
                    .card-content{
                      height: 112*$r;
                      div{
                        height: 28*$r;
                        line-height: normal;
                        padding-left: 28*$r;
                      }
                      div:nth-child(1){
                        margin-top: 20*$r;
                        margin-bottom: 20*$r;
                      }
                    }
                  }
                }
              }
            }
          }
          .qts{
            position: initial;
            width: 24*$r;
            height: 24*$r;
            margin-left: 10*$r;
          }
        }
      }
    }
    .color1{
      color: #4a4a4a;
    }
    .color3{
      color: #fb762a;
    }
    .chooseBox{
      background-color: rgba(0,0,0,0.5);
      position: fixed;
      z-index: 999;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      &-box{
        width: 60%;
        background-color: #ffffff;
        border-radius: 16*$r;
        margin-left: 20%;
        margin-top: 50%;
        &-title{
          text-align: center;
          font-size: 28*$r;
          color: #666666;
          padding-top: 20*$r;
          padding-bottom: 20*$r;
          border-bottom: solid 1px #e1e1e1;
        }
        &-content{
          font-size: 28*$r;
          color: #666666;
          padding-top: 62*$r;
          overflow: hidden;
          p{
            text-align: center;
            margin-bottom: 8*$r;
          }
          &-btn{
            margin-top: 36*$r;
            @include flex-center;
            margin-bottom: 48*$r;
            div{
              width: 176*$r;
              height: 60*$r;
              border-radius: 30*$r;
              text-align: center;
              line-height:60*$r;
              background-color: #fb762a;
              color: #ffffff;
              font-size: 30*$r;
            }
            div:nth-child(1){
              background-color: #a3a3a3;
              margin-right: 34*$r;
            }
          }
        }
        ul{
          padding-top: 32*$r;
          padding-bottom: 32*$r;
          li{
            text-align: center;
            font-size: 28*$r;
            color: #666666;
          }
        }
      }
    }
  }
</style>
