<template>
  <div class="chart">
    <ul class="chart-tab">
      <li :class="activeIndex==index?'chart-tab-active':''" v-for="(tab,index) in tabList" :key="index" @click="tabChange(index)">
        {{tab.name}}
      </li>
    </ul>
    <div class="tab-fixed"></div>
    <div class="content">
      <div class="content-con" v-show="activeIndex == 0">
        <!-- 查询条件 -->
        <div class="content-con-query">
          <span>查询</span>
          <ul>
            <li :class="queryIndex == index?'active':''" v-for="(query,index) in queryList" :key="'a'+index" @click="queryTab(index)">
              {{query.name}}
            </li>
          </ul>
        </div>
        <div class="content-con-data">
          <div>
            <p>
              <span>期数</span>
              <span>获奖者</span>
              <span>获奖号码</span>
              <span>总和值</span>
              <span>参与人次</span>
              <!--<span class="shengyu" @click="isunderStander=true">剩余人次<img src="../../assets/img/chart_01.png"/></span>-->
              <span>是否包尾</span>
            </p>
            <ul>
              <li v-for="(item,index) in dataList" :key="'b'+index">
                <span>{{item.times_num}}</span>
                <span><img :src="item.winner_avatar"></span>
                <span class="active">{{item.winner_code}}</span>
                <span>{{item.remainder}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.remainder_name}}</span>
                <span>{{item.total}}</span>
                <!--<span>{{item.remain_count}}</span>-->
                <span class="active">{{item.is_last==0?'非包尾':'包尾'}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="content-con" v-show="activeIndex == 1">
        <!-- 查询条件 -->
        <div class="content-con-query">
          <span>查询</span>
          <ul>
            <li :class="queryIndex == index?'active':''" v-for="(query,index) in queryList" :key="'a'+index" @click="queryTab(index)">
              {{query.name}}
            </li>
          </ul>
        </div>
        <div class="content-con-chart">
          <span>获奖号码+100000</span>
          <span>商品期数</span>
          <span>商品总需：{{all}}</span>
          <div><canvas id="chartY" width="20" height="400"> 你的浏览器不支持HTML5 canvas </canvas></div>
          <div>
            <canvas id="chart"> 你的浏览器不支持HTML5 canvas </canvas>
          </div>
        </div>
        <div class="content-con-tip">
          <span>非包尾参与</span>
          <span>包尾参与</span>
        </div>
        <div class="content-con-text">
          <p><span>商品期数：</span>指该商品的每期期数</p>
          <p><span>获奖号码：</span>表示该期商品对应的获奖号码</p>
        </div>
      </div>
    </div>
    <!-- 解释名词弹窗 -->
    <div class="content-con-popup" v-if="isunderStander" @click="isunderStander=false">
      <div>
        <p>剩余人次</p>
        <p style="text-align:left;">表示在剩余多少人次时买入中奖（比如，商品总需100人次，第一个用户参与10次且中奖，产生的10个号码中第5个号码为幸运号码，则剩余人次是96）。</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      baseId: '',
      activeIndex: 0,
      queryIndex: 0,
      tabList: [
        {name: '走势图'},{name: 'K线图'}
      ],
      queryList: [
        {name: '近30期', data: '30'},{name: '近50期', data: '50'},{name: '近100期', data: '100'}
      ],
      nper: 30,
      dataList: [],
      isunderStander: false,
      all: 0
    }
  },
  created() {
    this.baseId = this.$route.query.baseId;
    this.activeIndex = 0
    this.queryIndex = 0
    this.nper = 30
    this.goodsStatistics()
  },
  activated () {

  },
  methods: {
    /**
     * tab切换
     */
    tabChange(index) {
      this.activeIndex = index
      this.queryIndex = 0
      this.nper = 30
      if (index == 0) {
        this.goodsStatistics()
      } else {
        this.goodsTrendChart()
        // var chartData = [["2017/01", 50], ["2017/02", 60], ["2017/03", 100], ["2017/04",200], ["2017/05",350], ["2017/06",600]];

      }
    },
    queryTab(index) {
      this.queryIndex = index
      this.nper = this.queryList[index].data
      if (this.activeIndex == 0) {
        this.goodsStatistics()
      } else {
        this.goodsTrendChart()
      }

    },
    /**
     * 获取数据
     */
    goodsStatistics() {
      let that = this;
      this.dataList = []
      this.$axios.post('/goods/goodsStatistics?version=v2',{
        goods_base_id: that.baseId?that.baseId:that.$route.query.baseId,
        nper: that.nper
      }).then(function (res) {
        if (res.data.code == 1) {
          that.dataList = res.data.data
        } else {
          this.$vux.toast.text(res.data.msg);
        }
      })
    },
    goodsTrendChart() {
      let that = this;
      this.dataList = []
      this.$axios.post('/goods/goodsTrendChart?version=v2',{
        goods_base_id: that.baseId?that.baseId:that.$route.query.baseId,
        nper: that.nper
      }).then(function (res) {
        if (res.data.code == 1) {
          let chartData = res.data.data.list
          that.all = res.data.data.Y
          that.goChart(chartData,res.data.data.Y);
          that.goChartY(chartData,res.data.data.Y);
        }
      })
    },
    /**
     * 绘制图表方法
     */
    goChart(dataArr,maxY) {
      // 声明所需变量
      var canvas,ctx;
      // 图表属性
      var cWidth, cHeight, cMargin, cSpace;
      var originX, originY;
      // 折线图属性
      var tobalDots, dotSpace, maxValue, lastNumber;
      var totalYNomber;
      // 运动相关变量
      var ctr, numctr, speed;
      // 获得canvas上下文
      canvas = document.getElementById("chart");
      if(canvas && canvas.getContext){
        ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,canvas.width,canvas.height);
      }
      initChart(); // 图表初始化
      drawLineLabelMarkers(); // 绘制图表轴、标签和标记
      drawLineAnimate(); // 绘制折线图的动画
      //点击刷新图表
      canvas.onclick = function(){
        initChart(); // 图表初始化
        drawLineLabelMarkers(); // 绘制图表轴、标签和标记
        drawLineAnimate(); // 绘制折线图的动画
      };
      // 绘制图表初始化
      initChart();
      // 绘制图表轴、标签和标记
      drawLineLabelMarkers();

      function initChart(){
        // 图表信息
        cMargin = 30;
        cSpace = 60;
        canvas.width = dataArr.length*70+1000;
        canvas.height = 600;
        canvas.style.height = canvas.height/2 + 'px';
        canvas.style.width = canvas.width/2 + "px";
        cHeight = canvas.height - cMargin - cSpace;
        cWidth = canvas.width - cMargin - cSpace;
        originX = cMargin + cSpace;
        originY = cMargin + cHeight;
        // 折线图信息
        tobalDots = dataArr.length;
        dotSpace = parseInt( (cWidth-88)/tobalDots );
        if (maxY < 5) {
          maxValue = 5
        } else {
          maxValue = maxY
        }
        // maxValue += 0;
        totalYNomber = 5;
        lastNumber = maxValue%totalYNomber
        // 运动相关
        ctr = 1;
        numctr = 100;
        speed = 3;
        ctx.translate(0.5,0.5);  // 当只绘制1像素的线的时候，坐标点需要偏移，这样才能画出1像素实线
      }

      function drawLineLabelMarkers(){
        ctx.font = "24px Arial";
        ctx.lineWidth = 2;
        ctx.fillStyle = "#666666";
        ctx.strokeStyle = "#666666";
        // y轴
        // drawLine(originX, originY, originX, cMargin);
        // drawLine(originX, originY, originX, cMargin);
        // x轴
        drawLine(originX-90, originY, originX+cWidth, originY);
        // 绘制标记
        drawMarkers();
      }

      function drawLine(x, y, X, Y){
        // ctx.strokeStyle = "#ff0000"
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(X, Y);
        ctx.stroke();
        ctx.closePath();
      }

      function drawMarkers(){
        ctx.strokeStyle = "#E0E0E0"; // 网格线颜色
        // ctx.strokeStyle = "#ff0000";
        //绘制 y 轴 及中间横线
        var oneVal = parseInt(maxValue/totalYNomber);
        ctx.textAlign = "right";
        for(var i=0; i<=totalYNomber; i++){
          var markerVal =  i*oneVal;
          var xMarker = originX-5;
          var yMarker = parseInt( cHeight*(1-markerVal/maxValue) ) + cMargin;
          // ctx.fillText(markerVal, xMarker, yMarker+3, cSpace); // 文字
          if(i>0){
            drawLine(originX-80, yMarker, originX+cWidth, yMarker);
          }
        }
        // 绘制 x 轴 及中间竖线
        ctx.textAlign = "center";
        for(var i=0; i<tobalDots; i++){
          var markerVal = dataArr[i].times_num;
          var xMarker = originX+i*dotSpace;
          var yMarker = originY+1000;
          ctx.fillText(markerVal, xMarker+8, 570, cSpace); // 文字
          // if(i>0){
            drawLine(xMarker+20, originY-2, xMarker+20, cMargin);
          // }
        }
      }

      function drawLineAnimate(){
        let that = this;
        ctx.strokeStyle = "#666666";  //"#49FE79";

        //连线
        ctx.beginPath();
        for(var i=0; i<tobalDots; i++){
          var dotVal = dataArr[i].code_num;
          var barH = parseInt( cHeight*dotVal/maxValue* ctr/numctr );
          var y = originY - barH;
          var x = originX + dotSpace*i;
          if(i==0){
              ctx.moveTo( x+20, y );
          }else{
              ctx.lineTo( x+20, y );
          }
        }
        ctx.stroke();
        //绘制点
        for(var i=0; i<tobalDots; i++){
          var dotVal = dataArr[i].code_num;
          var dotValcricle = dataArr[i].code_num;
          var barH = parseInt( cHeight*dotVal/maxValue * ctr/numctr );
          var y = originY - barH;
          var x = originX + dotSpace*i;
          drawArc( x, y ,dataArr[i]);  //绘制点
          ctx.fillText(parseInt(dotValcricle*ctr/numctr), x+20, y-14); // 文字
        }
        if(ctr<numctr){
          ctr++;
          setTimeout(function(){
            ctx.clearRect(0,0,canvas.width, canvas.height);
            drawLineLabelMarkers();
            drawLineAnimate();
          }, speed);
        }
      }

      function drawArc( x, y, p ){
        if(p.is_last == 1){
          ctx.fillStyle = '#fb762a'
        }else{
          ctx.fillStyle = '#00a1de'
        }
        ctx.beginPath();
        ctx.arc( x+20, y, 6, 0, Math.PI*2 );
        ctx.fill();
        ctx.closePath();
      }
    },
    goChartY(dataArr,maxY) {
      // 声明所需变量
      var canvas,ctx;
      // 图表属性
      var cWidth, cHeight, cMargin, cSpace;
      var originX, originY;
      // 折线图属性
      var tobalDots, dotSpace, maxValue, lastNumber;
      var totalYNomber;
      // 运动相关变量
      var ctr, numctr, speed;
      // 获得canvas上下文
      canvas = document.getElementById("chartY");
      if(canvas && canvas.getContext){
        ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,canvas.width,canvas.height);
      }
      initChart(); // 图表初始化
      drawLineLabelMarkers(); // 绘制图表轴、标签和标记
      // 绘制图表初始化
      initChart();
      // 绘制图表轴、标签和标记
      drawLineLabelMarkers();

      function initChart(){
        // 图表信息
        cMargin = 30;
        cSpace = 60;
        canvas.width = 92;
        canvas.height = 600;
        canvas.style.height = canvas.height/2 + 'px';
        canvas.style.width = canvas.width/2 + "px";
        cHeight = canvas.height - cMargin - cSpace;
        cWidth = canvas.width - cMargin - cSpace;
        originX = cMargin + cSpace;
        originY = cMargin + cHeight;
        // 折线图信息
        tobalDots = dataArr.length;
        dotSpace = parseInt( cWidth );
        if (maxY < 5) {
          maxValue = 5
        } else {
          maxValue = maxY
        }
        // maxValue += 20;
        totalYNomber = 5;
        lastNumber = maxValue%totalYNomber
        // 运动相关
        ctr = 1;
        numctr = 100;
        speed = 3;
        ctx.translate(0.5,0.5);  // 当只绘制1像素的线的时候，坐标点需要偏移，这样才能画出1像素实线
      }

      function drawLineLabelMarkers(){
        ctx.font = "24px Arial";
        ctx.lineWidth = 2;
        ctx.fillStyle = "#666666";
        ctx.strokeStyle = "#666666";
        // y轴
        // drawLine(originX, originY, originX, cMargin);
        drawLine(originX, originY, originX, cMargin);
        // 绘制标记
        drawMarkers();
      }

      function drawLine(x, y, X, Y){
        // ctx.strokeStyle = "#ff0000"
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(X, Y);
        ctx.stroke();
        ctx.closePath();
      }

      function drawMarkers(){
        ctx.strokeStyle = "#E0E0E0"; // 网格线颜色
        // ctx.strokeStyle = "#ff0000";
        // 绘制 y 轴 及中间横线
        var oneVal = parseInt(maxValue/totalYNomber);
        ctx.textAlign = "right";
        for(var i=0; i<=totalYNomber; i++){
          var markerVal =  i*oneVal;
          var xMarker = originX-5;
          var yMarker = parseInt( cHeight*(1-markerVal/maxValue) ) + cMargin;
          ctx.fillText(markerVal, xMarker, yMarker, cSpace);
          if(i>0){
            drawLine(originX+2, yMarker, originX+cWidth, yMarker);
          }
        }
      }
      function drawLineAnimate(){
        let that = this;
        ctx.strokeStyle = "#666666";  //"#49FE79";

        //连线
        ctx.beginPath();
        for(var i=0; i<tobalDots; i++){
          var dotVal = dataArr[i].code_num;
          var barH = parseInt( cHeight*dotVal/maxValue* ctr/numctr );//
          var y = originY - barH;
          var x = originX + dotSpace*i;
          if(i==0){
              ctx.moveTo( x+20, y );
          }else{
              ctx.lineTo( x+20, y );
          }
        }
        ctx.stroke();
        //绘制点
        for(var i=0; i<tobalDots; i++){
          var dotVal = dataArr[i].code_num;
          var barH = parseInt( cHeight*dotVal/maxValue * ctr/numctr );
          var y = originY - barH;
          var x = originX + dotSpace*i;
          drawArc( x, y ,dataArr[i]);  //绘制点
          ctx.fillText(parseInt(dotVal*ctr/numctr), x+20, y-20); // 文字
        }
        if(ctr<numctr){
          ctr++;
          setTimeout(function(){
            ctx.clearRect(0,0,canvas.width, canvas.height);
            drawLineLabelMarkers();
            drawLineAnimate();
          }, speed);
        }
      }

      function drawArc( x, y, p ){
        if(p.is_last == 1){
          ctx.fillStyle = '#fb762a'
        }else{
          ctx.fillStyle = '#00a1de'
        }
        ctx.beginPath();
        ctx.arc( x+20, y, 6, 0, Math.PI*2 );
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/css/reset.scss";
.chart{
  @include appcontent;
  padding-bottom: 0;
  .tab-fixed{
    width: 100%;
    height: 91*$r;
  }
  &-tab{
      @include tabFixed;
      height: 81*$r;
      background-color: #ffffff;
      margin-bottom: 10*$r;
      padding: 0 23*$r;
      @include flex-space;
      li{
        width: 48%;
        height: inherit;
        line-height: 81*$r;
        text-align: center;
        color: #4a4a4a;
      }
      &-active{
        border-bottom: solid 2px #fb762a;
        color: #fb762a!important;
      }
    }
  .content{
    @include appcontent;
    position: relative;
    padding-bottom: 0;
    padding-top: 0;
    background: #ffffff;
    &-con{
      @include ios-Scroll;
      overflow: hidden;
      &-query{
        display: flex;
        align-items: center;
        padding: 0.3rem 0;
        background: #f2f2f2;
        justify-content: center;
        ul{
          display: flex;
          align-items: center;
          li{
            border-radius: 0.5rem;
            padding: 0.1rem 0.2rem;
            font-size: 0.35rem;
            margin: 0 0.2rem;
            color: #666666;
            background: #ffffff;
          }
          .active{
            border: 1px solid #fb762a;
            color: #fb762a;
          }
        }
      }
      &-data{
        overflow-y: scroll;
        div{
          background: #ffffff;
          width: 140%;
          p{
            display: flex;
            align-items: center;
            justify-content: space-around;
            padding: 0.1rem 0;
            border-bottom: 1px solid #f2f2f2;
            span{
              width: 20%;
              font-size: 0.33rem;
              text-align: center;
            }
            .shengyu{
              position: relative;
              img{
                position: absolute;
                right: 0;
                top: 0.1rem;
                width: 0.32rem;
              }
            }
          }
          ul{
            li{
              display: flex;
              align-items: center;
              justify-content: space-around;
              padding: 0.1rem 0;
              border-bottom: 1px solid #f2f2f2;
              span{
                width: 20%;
                text-align: center;
                img{
                  width: 0.5rem;
                  height: 0.5rem;
                  border-radius: 50%;
                }
              }
              .active{
                color: #fb762a;
              }
            }
          }
        }
      }
      &-chart{
        width: 100%;
        background: #ffffff;
        padding: 1rem 0 0.5rem;
        position: relative;
        display: flex;
        align-items: center;
        >span:first-of-type{
          position: absolute;
          color: #666666;
          i{
            font-style: normal;
            color: #ff0000;
          }
          top: 0.15rem;
          left: 0.3rem;
        }
        >span:nth-of-type(2){
          position: absolute;
          color: #666666;
          bottom: 0.1rem;
          left: 80%;
        }
        span:last-of-type{
          position: absolute;
          color: #666666;
          top: 0.68rem;
          left: 0.3rem;
        }
        div:firt-of-type{
          height: 100%;
        }
        div:last-of-type{
          overflow-x: scroll;
        }
      }
      &-tip{
        display: flex;
        align-items: center;
        justify-content: center;
        background: #ffffff;
        span{
          position: relative;
          padding-left: 20px;
          font-size: 0.3rem;
        }
        span:first-of-type{
          color: #00a1de;
          margin-right: 10px;
        }
        span:first-of-type:before{
          content: '';
          width: 10px;
          height:10px;
          background: #00a1de;
          border-radius: 5px;
          position: absolute;
          top: 0.1rem;
          left: 0.1rem;
        }
        span:last-of-type{
          color: #fb762a;
          margin-left: 10px;
        }
        span:last-of-type:before{
          content: '';
          width: 10px;
          height:10px;
          background: #fb762a;
          border-radius: 5px;
          position: absolute;
          top: 0.1rem;
          left: 0.1rem;
        }
      }
      &-text{
        padding: 0.5rem 0;
        width: 90%;
        margin: 0.5rem auto;
        background: #f2f2f2;
        p{
          font-size: 0.3rem;
          padding-left: 1rem;
          box-sizing: border-box;
          color: #666666;
          span{
            color: #4a4a4a;
          }
        }
      }
    }
  }
  .content-con-popup{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 1000;
    div{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 70%;
      height: 4rem;
      background: #ffffff;
      border-radius: 0.1rem;
      margin: auto;
      padding: 0.3rem;
      text-align: center;
      p:first-of-type{
        font-size: 0.4rem;
      }
      p:last-of-type{
        color: #666666;
        font-size: 0.35rem;
      }
    }
  }
}
</style>

