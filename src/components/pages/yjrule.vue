<template>
    <div class="rule">
        <ul>
          <li>
              <h5>1</h5>.好友需通过您发送的链接页面上成功注册才能建立邀请关系。
          </li>
          <li>
            <h5>2</h5>.邀请好友成功后，好友购买游戏/茶叶礼包您可获得3%返利，好友获得活动抽奖商品领取后，您还能获得商品7折的2%返利（领取积分不返利）。
          </li>

          <li>
            举个栗子：
          </li>
          <li>好友购买游戏/茶叶礼包1000元, 您可以获得<span>1000x3%=30.00元</span></li>
          <li>好友参与1000次获得了苹果手机, 领取后, 您可以获得</li>
          <li><span>11366 (苹果手机总人次) ×70%×2%=159.12元；</span></li>
          <li>
            <h5>3</h5>.返利提现必须要<span>满20元</span>,每周5客服审核后发放周5零点前提现的金额。
          </li>
          <li>
            <h5>4</h5>.活动解释权归乐购运营团队所有
          </li>
        </ul>
    </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  created () {
    document.title="活动规则";
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/reset";
    .rule{
      width: 100%;background: #fff;height: 100%;
      color: #333333;
      ul{
        width: 87%;margin: auto;margin-top:getREM(20);
        li{
          white-space:normal;
          // height: getREM(49);
          line-height: getREM(49);
          h5{
            float: left;
            width: getREM(25);
            height: getREM(25);
            // background: #333;
            // border-radius: 50%;
            // color: #fff;
            text-align: center;
            line-height:  getREM(25);
            margin-top:getREM(13);
            font-size: getREM(26)
          }
          span{
            color: #dd6f01;
          }
        }
      }
    }
</style>
