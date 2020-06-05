<template>
  <div class="tickets">
    <div @click="getTicketInfo(item)" v-for="(item,index) in data" :key="index">
      <ticket :ticketData="item" :type="0" :time="time" v-if="time>=item.stime_int">
      </ticket>
    </div>
  </div>
</template>

<script>
  import ticket from '@/components/mine/ticket/ticket'
  import {mapMutations} from 'vuex'
  export default {
    name: "tickets",
    components:{
      ticket
    },
    data(){
      return{
        data:[],
        time:0,
      }
    },
    created(){
      this.getMsg()
    },
    methods:{
      getTicketInfo(data){
        this.setTicket(data)
        this.$router.go(-1)
      },

      getMsg(){
        let para= this.$route.query.data
        this.$axios.post('/order/cart?version=v2',{data:para}).then((res)=>{
          if(res.data.code===1){
            this.time = res.data.time
            this.data = res.data.data.coupons
          }else{
            this.$vux.toast.text(res.data.msg)
          }
        })
      },
      ...mapMutations([
        'setTicket'
      ]),
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/reset.scss";
  .tickets{
    @include appcontent;
    padding-bottom: 0;
  }
</style>
