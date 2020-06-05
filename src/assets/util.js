/**
 * 自定义全局函数
 */

export default {
  install(Vue, options) {
    //格式化时间
    Vue.prototype.dateFormat = function (timeStamp) {
      var date = new Date(timeStamp * 1000);
      var fmt = 'yyyy-MM-dd hh:mm';
      var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    };

    //格式化时间，提供格式
    Vue.prototype.dateFormat_f = function (fmt, timeStamp) {
      var date = new Date(timeStamp * 1000);
      var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S+": parseInt(date.getMilliseconds() / 10), //毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    }
    Vue.prototype.getPhoneType = function () { //判断系统类型
      let u = navigator.userAgent
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
      let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        //这个是安卓操作系统
        return 'Android'
      }
      if (isIOS) {
        //这个是ios操作系统
        return 'ios'
      }
    }
    Vue.prototype.upLoadImg = function (paras) { //图图片上传
      let base = Vue.prototype.$httpUrl
      return new Promise(function (resolve, reject) {
        $.ajax({
          //几个参数需要注意一下
          type: "POST", //方法类型
          dataType: "json", //返回的数据类型
          url: base + "/api/site/upload?version=v1",
          data: paras,
          cache: false,
          processData: false,
          contentType: false,
          success: function (res) {
            if (res.code === 1) {
              resolve(res.data)
            } else {
              Vue.$vux.toast.text(res.data.msg)
            }
          },
          error: function () {
            Vue.$vux.toast.text('服务器错误')
          }
        });
      })
    }
  }
}
