<template>
    <div class="awardRotate" id="rotary">
        <div class="banner-img">
            <img src="../../../static/image/rotary-banner.png" alt="">
        </div>
        <img src="../../assets/img/demo1.png" id="shan-img" alt="">
        <div class="banner">
            <div class="zhuanpan">
                <div class="turnplate">
                    <canvas class="item" id="wheelcanvas" width="422px" height="422px"></canvas>
                    <img class="pointer" src="../../assets/img/turnplate-pointer.png" @click="pointer"/>
                </div>
            </div>
        </div>
        <p style="text-align:center;line-height:35px;color: #fff;background: #f67a00;">您今天还有{{lottory_num}}次抽奖机会</p>

        <div style="background:#f67a00;padding: 15px;">
            <div class="text-block log-block" v-if="lottory_list!= null && lottory_list!= ''">
                <swiper auto height="25px" direction="vertical" :show-dots="false">
                    <swiper-item v-for="(log,index) in lottory_list" :key="index">
                        <p class="log-p"><span>恭喜 {{log.nickname}}</span><span>{{'获得'+ log.lottory_name}}</span></p>
                    </swiper-item>
                </swiper>
            </div>
        </div>
        <div class="banner-img">
            <img src="../../../static/image/rotary-rule.png" alt="">
        </div>

        <!-- 中奖弹窗 -->
        <div v-show="resultBox" >
            <div class="result-mode" @click="resultBox = false"></div>
            <div class="result-block">
                <p style="font-size:20px;color:#898989;line-height:40px;">恭喜你!</p>
                <p style="color: #3a3a3a;font-size:16px;">抽中{{resultTxt}}</p>
                <div class="check-btn" @click="check">立即查看</div>
                <p class="text">中奖积分券请在<i>“我的积分券”</i>中查看</p>
            </div>
        </div>

        <!-- 分享弹窗 -->
        <div v-show="shareBox">
            <div class="result-mode"></div>
            <div class="share-block" @click="share">
                <img src="../../../static/image/shareBox.png" alt="">
                <div @click.stop="shareBox = false" class="rotary-choice">
                    <img src="../../../static/image/rotary-choise.png" alt="">
                </div>
            </div>

        </div>
      <share-view :data="shareData"></share-view>
    </div>
</template>

<script type="text/ecmascript-6">
    import $ from 'jquery';
    import myfun from '../../assets/awardRotate';
    import shareView from '../public/shareView'
    import { Swiper,SwiperItem } from 'vux';
    /*    import 'mint-ui/lib/style.css'*/
    export default {
        name: 'rotary',
        components:{Swiper,SwiperItem,myfun,shareView},
        data () {
            return {
              shareData:'',
                msg: '',
                turnplate: {
                    restaraunts: [],
                    colors: [],
                    outsideRadius: 192,
                    textRadius: 155,
                    insideRadius: 68,
                    startAngle: 0,
                    bRotate: false,
                },
                lottory_num:0,              //抽奖次数
                resultTxt:"",               //中奖结果
                resultBox:false,           //中奖弹窗
                shareBox:false,             //分享弹窗
                lottory_list:[],              //抽奖记录数组
            }
        },
        created () {
            document.title = '幸运大转盘';
            let that = this
            this.$nextTick(() => {
                this.turnplate.restaraunts = ['18元 积分', '满 10减1 积分券','满 3减1 积分券','满 5减1 积分券', '2元 积分','58元 积分'];
                this.turnplate.colors = ['#ffe78d', '#fef1ad', '#ffe78d', '#fef1ad', '#ffe78d', '#fef1ad'];
                this.rotateTimeOut();
                this.rotateFn();
                $(document).ready(function () {
                    // 解决转盘图片不加载
                    that.drawRouletteWheel()
                })
            })
            this.$axios.post('/active/getLottoryNum?version=v2').then(function (response) {
                if(response.data.code==1){
                    that.lottory_num = response.data.data.lottory_num;
                }
            });
            this.$axios.post('/active/getLottoryList?version=v2').then(function (response) {
                if(response.data.code==1){
                    that.lottory_list = response.data.data;
                }
            });
        },
        methods: {
            rotateTimeOut: function () {
                $('#wheelcanvas').rotate({
                    angle: 0,
                    animateTo: 2160,
                    duration: 8000,
                    callback: function () {
                        /* Toast({message: '网络超时，请检查您的网络设置！', position: 'middle'})*/
                        /*this.$vux.toast.text("网络超时，请检查您的网络设置！");*/
                    }
                })
            },
            rotateFn: function (item, txt) {
                var angles = item * (360 / this.turnplate.restaraunts.length) - (360 / (this.turnplate.restaraunts.length * 2))
                if (angles < 270) {
                    angles = 270 - angles
                } else {
                    angles = 360 - angles + 270
                }
                var bRotateT = this.turnplate.bRotate
                var that = this;
                this.$nextTick(() => {
                    $('#wheelcanvas').stopRotate()
                    $('#wheelcanvas').rotate({
                        angle: 0,
                        animateTo: angles + 1800,
                        duration: 4000,
                        callback: function () {
                            if(txt!=null){
                                that.result(txt);
                            }
                            if (bRotateT) {
                                bRotateT = false
                            } else {
                                bRotateT = true
                            }
                        }
                    })
                });
                this.turnplate.bRotate = bRotateT
            },
            pointer:function () {
                var that = this;
                    this.$axios.post('/active/getLottory?version=v2').then(function (response) {
                        if(response.data.code==1){
//                            if(response.data.data.lottory_num>0){
                                that.lottory_num = response.data.data.lottory_num;
                                that.lottory_id = response.data.data.lottory_id;

                                //转盘转动
                                that.turnplate.bRotate = !that.turnplate.bRotate;
                                // 获取随机数(奖品个数范围内)
                                /*Math.floor(Math.random() * (this.turnplate.restaraunts.length - 1 + 1) + 1)*/
                                var item = response.data.data.lottory_id;
                                // 奖品数量等于10,指针落在对应奖品区域的中心角度[252, 216, 180, 144, 108, 72, 36, 360, 324, 288]
                                that.rotateFn(item, that.turnplate.restaraunts[item - 1]);
//                            }else{
//                                that.$vux.toast.text("抽奖机会已用完");
//                            }
                        } else if (response.data.code==-3) {
                            that.shareBox = true;
                        } else { //今天抽奖机会用完
                             that.$vux.toast.text(response.data.msg);
                        }
                    });

                    // if (this.turnplate.bRotate) return

            },
            drawRouletteWheel () {
                var canvas = document.getElementById('wheelcanvas')
                if (canvas.getContext) {
                    // 根据奖品个数计算圆周角度
                    var arc = Math.PI / (this.turnplate.restaraunts.length / 2)
                    var ctx = canvas.getContext('2d')
                    // 在给定矩形内清空一个矩形
                    ctx.clearRect(0, 0, 422, 422)
                    // strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
                    ctx.strokeStyle = '#FFBE04'
                    // font 属性设置或返回画布上文本内容的当前字体属性
                    ctx.font = '16px Microsoft YaHei'
                    for (var i = 0; i < this.turnplate.restaraunts.length; i++) {
                        var angle = this.turnplate.startAngle + i * arc;
                        ctx.fillStyle = this.turnplate.colors[i];
                        ctx.beginPath()
                        //  arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
                        ctx.arc(211, 211, this.turnplate.outsideRadius, angle, angle + arc, false);
                        ctx.arc(211, 211, this.turnplate.insideRadius, angle + arc, angle, true);
                        ctx.stroke()
                        ctx.fill()
                        // 锁画布(为了保存之前的画布状态)
                        ctx.save()

                        // ----绘制奖品开始----
                        ctx.fillStyle = '#E5302F'
                        var text = this.turnplate.restaraunts[i]
                        var lineHeight = 17;
                        // translate方法重新映射画布上的 (0,0) 位置
                        ctx.translate(211 + Math.cos(angle + arc / 2) * this.turnplate.textRadius, 211 + Math.sin(angle + arc / 2) * this.turnplate.textRadius)

                        // rotate方法旋转当前的绘图
                        ctx.rotate(angle + arc / 2 + Math.PI / 2)

                        /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
                        if (text.indexOf('M') > 0) { // 流量包
                            var texts = text.split('M')
                            for (var j = 0; j < texts.length; j++) {
                                ctx.font = j === 0 ? 'bold 20px Microsoft YaHei' : '16px Microsoft YaHei'
                                if (j === 0) {
                                    ctx.fillText(texts[j] + 'M', -ctx.measureText(texts[j] + 'M').width / 2, j * lineHeight)
                                } else {
                                    ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * lineHeight)
                                }
                            }
                        } else if (text.indexOf('M') === -1 && text.length > 6) { // 奖品名称长度超过一定范围
                            text = text.substring(0, 6) + '||' + text.substring(6)
                            var textst = text.split('||')
                            for (var ji = 0; ji < textst.length; ji++) {
                                ctx.fillText(textst[ji], -ctx.measureText(textst[ji]).width / 2, ji * lineHeight)
                            }
                        } else {
                            // 在画布上绘制填色的文本。文本的默认颜色是黑色
                            // measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
                            ctx.fillText(text, -ctx.measureText(text).width / 2, 0)
                        }

                        // 添加对应图标
                        if (text.indexOf('18元 积分')>-1 || text.indexOf('58元 积分')>-1) {
                            var img = document.getElementById('shan-img')
                            ctx.drawImage(img, -25, 20)
                        } else if (text.indexOf('谢谢参与') >= 0) {
                            img = document.getElementById('sorry-img')
                            ctx.drawImage(img, -15, 10)
                        }
                        // 把当前画布返回（调整）到上一个save()状态之前
                        ctx.restore();
                        // 绘制奖品结束
                    }
                }
            },
            result:function(txt){              // 结果弹窗
                this.resultBox = true;
                this.resultTxt = txt ;
            },
            share:function(){               // 进入页面分享后才能抽奖，调用移动端分享
                var that = this;
                this.$axios.post('/site/sharecon?version=v2', {type: 2}).then(function (response) {
                    if(response.data.code==1){
                      that.shareData = response.data.data
                        // that.$vux.loading.show({text: '请稍候'});
                        // that.JsBridge.callHandler("share", response.data.data, function (responseData) {
                        //     if (responseData == 'success') {
                        //         that.$vux.loading.hide();
                        //         that.shareBox = false;
                        //     }
                        // });
                    }
                });
            },
            check:function(){               // 中奖查看积分券 ，调用移动端页面
                var that = this;
                // that.$vux.loading.show({text: '请稍候'});
                // that.JsBridge.callHandler("checkScore",'abc', function (responseData) {
                //     if (responseData == 'success') {
                //         that.$vux.loading.hide();
                //     }
                // });
              this.navigateTo('ticket')
            }
        }
    }
</script>

<style>
    #rotary .banner-img img{width:100%;}
    .awardRotate{ background: #f67a00; height :100%; margin: 0 auto;}
    select,input,img,select{vertical-align:middle;}
    /* 大转盘样式 */
    .banner{display:block;width:90%;margin-left:auto;margin-right:auto;}
    .banner .turnplate{display:block;width:100%;position:relative;margin:0 auto;}
    .banner .turnplate canvas.item{width:100%;}
    .banner .turnplate img.pointer{position:absolute;width:31%;height:40.5%;left:35%;top:24%;}
    #rotary .zhuanpan{background:url("../../../static/image/zhuanpan.png")no-repeat;background-size:100% 100%;width:80%;padding: 4px 13px 10px;margin:0 auto;}
    /* 结果弹窗 */
    #rotary .result-mode{width:100%;height:100%;background:#000;position:fixed; top:0;bottom:0;z-index:9;visibility: visible;text-align:center;opacity:.7;}
    #rotary .result-block{background:#fff;z-index:10;width:55%;position:fixed; left:0;right:0; top:0;margin:50% auto; padding:15px;overflow:hidden;text-align:center;border-radius:5px;}
    #rotary .result-block .check-btn{background:#f67a00;display:inline-block; padding:4px 20px;border-radius:15px; color:#fff;margin:10px 0}
    #rotary .result-block .text{ color:#999;}
    #rotary .result-block .text i{ color:#f67a00;font-style:normal;}

    #rotary .share-block{z-index:10;width:80%;position:fixed; left:0;right:0; top:0;margin:40% auto; padding:15px;overflow:hidden;text-align:center;}
    #rotary .share-block img{width:100%;}
    #rotary .rotary-choice{position:absolute;width:35px;height:35px; right:40px; top:40px;z-index:11;}
    #rotary .rotary-choice img{width:100%;}

    /* 中奖记录滚动 */
    #rotary .text-block{padding:10px 15px;border-radius:4px; color:#e8e8e8;line-height:25px;opacity:.9;border:1px solid #E25C00;background:url("../../../static/image/laba.png")no-repeat left 15px center #EB6200;background-size:20px 20px;}
    #rotary .text-block img{width:60%;margin:0 auto;display:block;}
    #rotary .log-p{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;line-height:25px;text-align:center;}
    #rotary .log-p span{margin-right:10px;}
    #rotary .log-p span:last-child{margin-right:0;}
</style>
