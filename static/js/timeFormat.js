class timeFormat{
  constructor(time){
    this.seconds='00'
    this.minute='00'
    this.millisecond = '00'
    this.hours='00'
    if(typeof time!='number'){
      throw '你传递的参数不是一个number类型标准毫秒差'
      return false
    }
    if(time>0){
      this.setTime(time)
    }
  }
  setTime(time){//
    let timex = time//时间毫秒差
    let hours = Math.floor(timex%(24*3600*1000)/(3600*1000))//小时
    let minutes= Math.floor(timex%(24*3600*1000)%(3600*1000)/(60*1000))//分钟
    let seconds = Math.floor(timex%(24*3600*1000)%(3600*1000)%(60*1000)/1000)//秒
    let millisecond = Math.floor(seconds%1000)//毫秒
    let _hours = hours,_minutes = minutes,_seconds = seconds,_millisecond = millisecond;
    let intTime = setInterval(function () {
      if(_millisecond>0){
        _millisecond-=1
      }else{
        if(_seconds>0){
          _millisecond = 59
          _seconds-=1
        }else{
          if (_minutes > 0) {
            _seconds = 59
            _minutes -= 1
          } else {
            if (_hours > 0) {
              _minutes = 59
              _hours -= 1
            } else {
              clearInterval(intTime)
              _minutes = 0
              _seconds = 0
              _millisecond = 0
            }
          }
        }
      }//倒计时算法
    this.changTime(_hours,_minutes,_seconds,_millisecond)//读取时间
  }.bind(this),17)//bind用于改变this指向问题
}
changTime(hours,minutes,seconds,millisecond) {
  if (hours < 10) {
    this.hours = '0' + hours
  } else {
    this.hours = hours
  }
  if (minutes < 10) {
    this.minute = '0' + minutes
  } else {
    this.minute = minutes
  }
  if (seconds < 10) {
    this.seconds = '0' + seconds
  } else {
    this.seconds = seconds
  }
  if (millisecond < 10) {
    this.haomiao = '0' + millisecond
  } else {
    this.haomiao = millisecond
  }
}
getFormatTime(){
    console.log('定时器加载...')
    return  this.minute + ':' + this.seconds+ ':' +this.haomiao
  }
}
export default timeFormat
