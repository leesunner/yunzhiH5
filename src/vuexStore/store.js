import vue from 'vue'
import vuex from 'vuex'
vue.use(vuex)

export default new vuex.Store({
  state:{
    redeemController:false,//立即兑换弹框控制
    userInfo:{},//用户信息
    ticket:'',//积分券
    winner:{},//中奖弹框
    interController:''//开奖定时器
  },
  getters:{
    getRedmControl(state){//立即兑换弹框控制
      return state.redeemController
    },
    getUserInfo(state){//用户信息
      return state.userInfo
    },
    getWinner(state){//中奖弹框
      return state.winner
    },
    getTicket(state){//获取积分券
      return state.ticket
    },
    getInterController(state){//开奖定时器
      return state.interController
    }
  },
  mutations:{
    setRedmControl(state,val){
      state.redeemController = val
    },
    setUserInfo(state,val){
      sessionStorage.setItem('userInfo',JSON.stringify(val))
      state.userInfo = val
    },
    setWinner(state,val){
      state.winner = val
    },
    setTicket(state,val){
      state.ticket = val
    },
    setInterController(state,val){//开奖定时器
      state.interController = val
    }
  },
  actions:{
    login(context){
       return new Promise(function (resolve,reject) {
         vue.prototype.$axios.post('user/index?version=v2').then(res=>{
           let data = res.data
           if(data.code===1){
             resolve(data.code)
             //提交用户信息到状态里面avatar,user_id, username
             context.commit('setUserInfo',data.data)
             context.commit('setWinner',data.win_msg)
           }else{
             resolve(-14)
             context.commit('setUserInfo', data.data)
             if(data.msg.indexOf('登录')==(-1)){
               vue.$vux.toast.text(data.msg)
             }
           }
         })
       })
    }
  },

})
