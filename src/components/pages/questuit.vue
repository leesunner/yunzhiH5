<template>
    <div class="quest">
      <h2 v-title="'有奖调查'"></h2>
      <div class="top">
        <img src="../../assets/images/questTop1.png" alt="">
      </div>
      <div class="content">
          <p class="p1">尊敬的用户：</p>
          <h3 class="p2">
            诚邀您参加此次问卷调查，您的意见和建议都对于我们改善app有非常重要的意义，请您放心填写，我们会严格保密，对于填写的用户我们将发放2积分，作为奖励。
          </h3>
          <ul>
            <li v-for="(item,Aindex) in list" :key="Aindex">
              <h3 :class="item.type ==1 ? 'radio':'box'">No.{{item.number}} {{item.title}}</h3>
              <div v-for="(conList,index) in item.answer" :key="index" class="contentList">
                <input :type="myType(item.type)" :id="conList.questionnaire_answer_id" :name="conList.questionnaire_question_id"  @change="go(conList.questionnaire_question_id,conList.questionnaire_answer_id,conList.content,item.type,item.is_required)" >
                <label :for="conList.questionnaire_answer_id">{{conList.content}}</label>
              </div>
              <textarea v-if="item.type==3"  class="result" name="" id="" cols="30" rows="10" @change="go(item.questionnaire_question_id,'',areaVal,item.type,item.is_required)" v-model="areaVal"></textarea>
            </li>
            <button class="btn" @click="getSubmit()" v-if="btnFlag">提交</button>
          </ul>
      </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      list:[],
       myVal:[

       ],
      //  type:"",//单选框类型
      areaVal:"",
      radioNum:0,//单选num
      checkboxNum:0,//复选num
      btnFlag:false,
    }
  },
  created() {
    this.getCode();
  },
  mounted() {

  },
  methods: {
    myType(type){//动态绑定选框
      // console.log(type)
      if(type == 1){
        return "radio"
      }else if(type == 2){
       return "checkbox"
      }else if(type == 3){
       return "1"
      }
    },
    getCode(){//获取问卷内容
      const that =this;
      this.$axios.get('/active/getQuestionnaire?version=v2',{params:{
        questionnaire_id:1
      }}).then(
        function (res) {
          if(res.data.code == 200){
            if(res.data.data.status == 1){
              console.log(res.data.data.list)
              that.list=res.data.data.list;
              that.btnFlag=true;
            }
          }else{
            // else if(res.data.code==-14){
    //         that.$vux.toast.text(res.data.msg);
    //         that.JsBridge.callHandler("toLogin",null,function (res) {
    //         })
    //       }
            that.$vux.toast.text(res.data.msg)
          }
      })
    },

    go(a,b,c,d,e){
      let dataList ={questionnaire_question_id:a,questionnaire_answer_id:b,questionnaire_answer_content:c,is_required:e}//点击新生成一个对象
      console.log(d)
        const aaa =this.myVal.map(item => item.questionnaire_question_id);//questionnaire_question_id对应数组
        const bbb=aaa.indexOf(a);//a 在数组里面存不存

        console.log(aaa,a,bbb)
        if(d == 1){//d==type //表单类型 1 单选 2多选
            if(bbb==-1){///不存在就生成对应对象
            this.myVal.push(dataList);
            this.radioNum=this.radioNum+1;
        }else if(bbb>=0){//相等就替换

            this.myVal[bbb]=dataList;
        }
        }else if(d == 2 ){//多选
            let bList=this.myVal.map(item => item.questionnaire_answer_id).indexOf(b);//questionnaire_answer_id:存不存在
            if(bList == -1){
               this.myVal.push(dataList);
               this.checkboxNum=this.checkboxNum+1;
            }else{
               this.myVal.splice(bList,1);
               this.checkboxNum=this.checkboxNum-1;
            }
            //  this.myVal.push(dataList);
        }else if(d==3){
                  if(bbb==-1){///不存在就生成对应对象
            this.myVal.push(dataList);

        }else if(bbb>=0){//相等就替换

            this.myVal[bbb]=dataList;
        }
        }
      console.log(this.myVal)
    },
    getSubmit(){
      const that =this;
      let requireNum=[];
      this.list.map(element =>{
      requireNum.push(element.is_required)
      // console.log(requireNum)
      });
      let radListnum=document.getElementsByClassName("radio").length;//单选框数目
      if(this.radioNum ==radListnum && this.checkboxNum>0){
        let List =JSON.stringify(that.myVal)
        this.$axios.post("/active/postQuestionnaire?version=v2",{data:List}).then(function (res) {
          // console.log(res.data)
          // console.log(that.myVal)
          if(res.data.code==200){
              that.$vux.toast.text(res.data.data.message);
              if(res.data.data.status == 1) {
                that.navigateTo('home')
              }
          }else{
            that.$vux.toast.text(res.data.msg)
          }
        })
      }else{
        const qusMsg="您没有完成问卷";
        that.$vux.toast.text(qusMsg);
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/css/reset";
.quest{
   input {outline:none;}
  width: 100%;
  background-color: #f4f4f4;
  .top{
    background-color: #bee9fa ;
    background: url("../../assets/images/questTopbg.jpg") no-repeat;
    background-size: 100% 100%;
      img{
    width: 300*$r;
    display: block;
    margin: auto;
  }
  }
  .content{
    width: 90%;
    margin: auto;
    .p1{
      font-size: 32*$r;
      font-weight: 600;
    }
    .p2{
      text-indent: 50*$r;
      font-size: 28*$r;
      font-weight: 600;
    }
    ul{
      li{
        margin-top:20*$r;
        overflow: hidden;
        h3{
          width: 100%;
          line-height: 50*$r;
          // float: left;
          font-size: 28*$r;
          font-weight: 600;
        }
        .contentList{
          // float: left;
          // overflow: hidden;
          line-height: 50*$r;
          padding-left: 10*$r;
          font-size: 26*$r;
          color: rgb(97, 95, 95);
        }
      }

    }
    .result{
        resize: none;
        width:98%;
        height: 250*$r;
      }
      .btn{
        margin:50*$r auto;
        width: 280*$r;
        height: 80*$r;
        display: block;
        border: 0;
        background-color: #fb762a;
        border-radius: 15*$r;
        color: #fff;
        font-size: 30*$r;
      }
  }

}
</style>


