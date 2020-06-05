<template>
  <div class="record">
    <h2 v-title="'提现明细'"></h2>
    <header>
      <span>申请时间</span>
      <span>累计佣金(￥)</span>
      <span>审核状态</span>
    </header>
    <ul class="time">
      <li class="time-left">
        <h3 ref="currentMonth">本月</h3>
        <p>提现金额：{{timeAmount || 0}}（元）</p>
      </li>
      <li class="time-right">
        <img src="../../assets/img/yjdate.png" alt="" @click="getDate()">
      </li>
    </ul>
    <ul class="content" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="{usernum}">
      <li v-for="(item,index) in list" :key="index">
        <span class="data">{{item.ctime}}</span>
        <span class="mobile">{{item.amount}}</span>
        <span class="code" v-if="item.status == 1" style="color:#333333">
          {{codetype(item.status)}}
        </span>
        <span class="code" v-if="item.status == 2" style="color:#0b9218">
          {{codetype(item.status)}}
        </span>
        <span class="code" @click="colse('maskBox'+index)" v-if="item.status == 3" style="color:red">
          {{codetype(item.status)}}
          <i v-if=" item.status == 3" class="say"><img src="../../assets/img/yjwen.png" alt=""></i>
        </span>
        <div class="maskBox" v-if="item.remark " :id="'maskBox'+index">
          <div class="mask">
            <h3>审核说明</h3>
            <ul>
              <li>{{item.remark}}</li>
              <!-- <li>提现日:　每周二</li>
                        <li>可提收入:　每周一00:00前的所有收入</li>
                        <li>单日提现限额:　15000元</li>
                        <li>到账时间:　最快2小时,　最长2天</li>
                        <li>提现次数：　每个提现日3次</li>
                        <li>银行卡要求:　只能提现到本人本地的储蓄卡</li> -->
            </ul>
            <i class="cha">
              <img src="../../assets/img/yjcha.png" alt="" @click="maskBox('maskBox'+index)">
            </i>
          </div>

        </div>
      </li>
    </ul>
    <p class="gd">没有更多了</p>

    <div class="fog" ref="fog" v-if="type">
      <div class="box">
        <ul class="comfir">
          <li @click="type=false">取消</li>
          <li @click="areaTime()">确认</li>
        </ul>
        <p class="date">开始时间</p>
        <datetime-view v-model="value1" ref="datetime" :format="format"></datetime-view>
        <p class="date">结束时间</p>
        <datetime-view v-model="value2" ref="datetime" :format="format"></datetime-view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      falg: '',
      type: false,
      list: [], ///信息集合
      //日期选择器
      format: 'YYYY-MM-DD',
      value1: '', //开始时间
      value2: '', //结束时间
      loading: false,
      page: '0',
      usernum: '10',
      limit: '10',
      hasNextPage: '', //是否有下一页
      timeAmount: '' //总收入
    };
  },
  created() {
    // this.getCode();
    this.getclean();
  },
  methods: {
    getCode() {
      //获取参数
      const that = this;
      this.$axios
        .get('/UserCommission/extractList?version=v2', {
          params: {
            type: '2',
            stime: that.value1, //开始时间
            etime: that.value2, //结束时间
            limit: that.limit,
            page: that.page
          }
        })
        .then(function(res) {
          if (res.data.code == 200) {
            that.hasNextPage = res.data.data.hasNextPage;
            that.timeAmount = res.data.data.timeAmount;

            if (that.hasNextPage == 1) {
              that.list = that.list.concat(res.data.data.list);
              that.loading = false;
            } else {
              that.list = that.list.concat(res.data.data.list);
              that.loading = true;
            }
            // console.log( that.list)
          } else {
            that.$vux.toast.text(res.data.msg);
          }
        });
    },
    getDate() {
      //时间选择
      this.type = true;
    },
    getclean() {
      //初始化日历起始时间为当前月第一天
      // this.type=true;
      let Data = new Date();
      // let myData=new Date(Data.getFullYear(),Data.getMonth(),1).toString();
      var year = Data.getFullYear().toString();
      var month = (Data.getMonth() + 1).toString();
      var dateTime = year + '-' + month + '-' + '1';
      this.value1 = dateTime;
    },
    codetype(code) {
      if (code == 1) {
        return '待审核';
      }
      if (code == 2) {
        return '审核通过';
      }
      if (code == 3) {
        return '未通过';
      }
    },
    loadMore() {
      (this.loading = true), this.page++;
      this.getCode();
    },
    areaTime() {
      const that = this;
      that.page = 1;
      this.$refs.currentMonth.innerHTML = '合计';
      this.$axios
        .get('/UserCommission/extractList?version=v2', {
          params: {
            type: '2',
            stime: that.value1, //开始时间
            etime: that.value2, //结束时间
            limit: that.limit,
            page: that.page
          }
        })
        .then(function(res) {
          if (res.data.code == 200) {
            that.list = [];
            console.log(res.data.data);
            that.timeAmount = res.data.data.timeAmount;
            that.hasNextPage = res.data.data.hasNextPage;
            that.list = that.list.concat(res.data.data.list);
            that.loading = false;
            that.type = false;
          } else {
            that.$vux.toast.text(res.data.msg);
          }
        });
    },
    colse(status) {
      document.getElementById(status).style.display = 'block';
    },
    maskBox(status) {
      document.getElementById(status).style.display = 'none';
    }
  }
};
</script>
<style lang="scss" scoped>
@import '../../assets/css/reset';
.record {
  width: 100%;
  font-family: PingFang SC;
  background: #f0f0f0;
  min-height: 100%;
  header {
    width: 100%;
    height: getREM(70);
    border-bottom: 2px solid #dcdcdc;
    background: #fff;
    span {
      font-size: getREM(24);
      font-weight: 600;
      line-height: getREM(70);
    }
    span:nth-child(1) {
      padding: 0 getREM(100) 0 getREM(98);
    }
    span:nth-child(2) {
      padding-right: getREM(115);
      padding-left: getREM(20);
    }
    span:nth-child(3) {
    }
  }
  .time {
    width: 100%;
    height: getREM(80);
    background: #f0f0f0;
    .time-left {
      width: getREM(610);
      float: left;

      h3 {
        margin-left: getREM(40);
        height: getREM(40);
        font-size: getREM(24);
        line-height: getREM(32.2);
      }
      p {
        height: getREM(40);
        font-size: getREM(20);
        line-height: getREM(32.2);
        margin-left: getREM(40);
        color: #aaa9a9;
      }
    }
    .time-right {
      float: right;
      padding-right: 55 * $r;
      img {
        vertical-align: middle;
        width: getREM(35);
        height: getREM(33);
        margin-top: getREM(20);
      }
    }
  }
  .content {
    width: 100%;
    background: #fff;
    height: 100%;
    li {
      height: getREM(76);
      border-bottom: 3px solid #f0f0f0;
      line-height: getREM(76);
      color: #333;
      font-size: getREM(21);
      span {
        float: left;
        text-align: center;
      }
      .data {
        padding: 0 getREM(100) 0 getREM(40);
      }
      .mobile {
        width: getREM(120);
      }
      .code {
        width: getREM(130);
        float: right !important;
        margin-right: getREM(55);
        .say {
          img {
            vertical-align: middle;
            width: getREM(22);
            height: getREM(22);
            margin: 0 0 getREM(5) getREM(5);
          }
        }
      }
    }
  }
  .gd {
    width: 100%;
    text-align: center;
    margin: getREM(19) 0;
  }
  .maskBox {
    display: none;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba($color: #000000, $alpha: 0.4);
    .mask {
      width: getREM(540);
      height: getREM(440);
      background-color: #fff;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      margin: auto;
      border-radius: getREM(26);
      z-index: 55;
      h3 {
        font-size: getREM(25);
        color: #333;
        text-align: center;
        line-height: getREM(100);
        border-bottom: 2px solid #ededed;
        font-weight: 700;
      }
      ul {
        width: 100%;
        color: #646262;
        padding-top: getREM(23.5);
        li {
          line-height: getREM(38);
          width: getREM(440);
          margin-left: getREM(48);
          font-size: getREM(22);
          border-bottom: 0;
        }
      }
      .cha {
        width: getREM(48);
        height: getREM(48);
        position: absolute;
        right: -45 * $r;
        top: -45 * $r;
        z-index: 999;
        img {
          width: getREM(48);
          height: getREM(48);
          display: block;
        }
      }
    }
  }
  .fog {
    height: 100%;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba($color: #797777, $alpha: 0.3);
    z-index: 9;
    .box {
      height: getREM(1150);
      background: #fff;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 999;
      .comfir {
        li {
          float: left;
          width: 50%;
          text-align: center;
          height: getREM(85);
          line-height: getREM(85);
          color: #ff9933;
          font-size: getREM(30);
          font-weight: 600;
          border-bottom: 1px solid #f0f0f0;
        }
      }
    }
    .date {
      text-align: center;
      font-size: getREM(26);
      color: #797777;
    }
  }
}
</style>

