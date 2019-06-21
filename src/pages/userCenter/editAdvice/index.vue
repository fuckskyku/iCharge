<template>
  <div id="index" class="container">
    <div class="title">您的意见对我们很重要！</div>
    <div class="content">
      <textarea name="" id="" cols="30" rows="10" @input="validate" v-model="form.content" placeholder="请留下您的宝贵意见或建议，我们将努力改进" maxlength="300" placeholder-style="color:#999999" :value="form.content"></textarea>
    </div>
    <div class="tel"><input type="tel" @input="validate" v-model="tel" :value="tel" placeholder="请输入您的电话方便我们联系" placeholder-style="color:#999999"></div>
    <button @click="submit" :disabled="disabled" :class="[style,{disabled: form.content == '' || tel == '' }]">提交</button>
  </div>
</template>
<script>
import utils from "@/utils/index";
import { addSuggestion } from '@/api/api'  
import { mapState,mapActions } from 'vuex'

export default {
  data() {
    return {
      tableData: [],
      id: '',
      tel: '',
      form: {},
      style: 'btn',
      disabled: true
    };
  },
  computed: {
  
  },
  onShow() {
    this.form = {};
    this.tel = '';
  },
  onLoad() {
    this.$root.$mp.query.id != undefined ? this.id = this.$root.$mp.query.id : ''
  },
  mounted() {
    
    var that = this
    this.tableData = [],
    
    this.tableData.map((item,index)=>{
      if(item.id == this.id){
        this.form = item
      }
    }) 
    if( this.id != ''){   
      this.tableData.map((item,index)=>{
        if(item.id == this.id){
          this.form = item
        }
      }) 
      this.form.createTime = this.ToTime(that.form.createTime)
    }else{
      this.form = {
        id: 66,
        createTime: "2018-12-14 11:11:30",
        content: ""
      }
    }
    
  },
  components: {

  },
  methods: {
    ToTime(timestamp) {
      //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      timestamp = timestamp + ""
      if(timestamp.length == 10){
        var date = new Date(timestamp * 1000);
      }else if(timestamp.length == 13){
        var date = new Date(timestamp);
      }
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
    validate() {
      if(!utils.required(this.form.content)){
        return
      }
      if(!utils.required(this.tel)) {
        return
      }
      this.disabled = false
    },
    verify(){
      if(!utils.required(this.form.content)){
        utils.showDialog('请留下您的宝贵意见或建议')
        this.disabled = true
        return
      }else{
        if (!utils.required(this.tel)) {
          utils.showDialog('请填写手机号码')
          this.disabled = true
          return
        }else{
          if (!utils.tel(this.tel)) {
            this.tel = ''
            this.disabled = true
            utils.showDialog('请填写正确的手机号码')
            return 
          }else{
            return true
          }
        }
      } 
    },
    submit() {
      if(this.verify()){
        addSuggestion({
          mobile: this.tel,
          content: this.form.content
        }).then(res=>{
          if(res.data.code == 200 ){
            wx.showModal({
              title: '提示',
              content: '感谢您的反馈，我司会尽快处理，在合适的时间与您联系。',
              confirmText: "确定",
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  wx.reLaunch({
                    url: "/pages/user/main"
                  })
                }
              }
            });
          }
        })
      }else{
        console.log("submitError")
      }
    },
    init() {
      this.tel = ''
      this.form = {}
    }
  },
  watch: {},

};
</script>

<style scoped lang="scss">
@import "../../../../static/assets/scss/userCenter/editAdvice/index.scss";

</style>
