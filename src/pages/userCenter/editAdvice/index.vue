<template>
  <div id="index" class="container">
    <div class="title">您的意见对我们很重要！</div>
    <div class="content">
      <textarea name="" id="" cols="30" rows="10" @input="validate" v-model="form.content" placeholder="请留下您的宝贵意见或建议，我们将努力改进" maxlength="300" placeholder-style="color:#999999" :value="form.content"></textarea>
    </div>
    <div class="tel"><input type="tel" @input="validate" v-model="tel" :value="tel" placeholder="请输入您的电话方便我们联系" placeholder-style="color:#999999"></div>
    <button @click="submit"  :disabled="disabled" :class="[style,{disabled: form.content == '' || tel == '' }]">提交</button>
  </div>
</template>
<script>
import utils from "@/utils/index";
import { login,sendNoTokenSms } from '@/api/api'  
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
  onLoad() {
    console.log(this.$root.$mp.query.id)
    this.$root.$mp.query.id != undefined ? this.id = this.$root.$mp.query.id : ''
  },
  mounted() {
    this.init()
    var that = this
    console.log(this.id)
    this.tableData = [
      {
        id: 1,
        createTime: "1234567891",
        content: "首充6元"
      },
      { 
        id: 2,
        createTime: "1234567672",
        content: "充值2333元"
      },
      {
        id: 3,
        createTime: "1392567672",
        content: "充值6666元充值6666元充值6666元充值6666元充值6666元"
      }
    ],
    
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
      console.log("form",this.form)
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
      console.log(timestamp)
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
        wx.showModal({
          title: '提示',
          content: '感谢您的反馈，我司会尽快处理，在合适的时间与您联系。',
          confirmText: "确定",
          showCancel: false,
          success: function (res) {
            console.log(res);
            if (res.confirm) {
              console.log('用户点击主操作')
              wx.reLaunch({
                url: "/pages/user/main"
              })
            }
          }
        });
        console.log("form.content",this.form.content,"tel",this.tel)
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
.title{
  padding: 30rpx;
  color: #333333;
  font-size: 32rpx;
}
.container{
  background: #f4f4f4;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  .content{
    margin: 30rpx;
    margin-top: 10rpx;
    background: #fff;
    padding: 32rpx;
  }
  textarea{
    width: 100%;
    font-size: 30rpx;
  }
  .time{
    padding: 20rpx;
    color: #999999;
    font-size: 28rpx;
    text-align: right;
  }
}
.tel{
  padding: 30rpx;
  margin: 0 30rpx;
  background: #ffffff;
  font-size: 30rpx;
}
.btn{
  width: 520rpx;
  height: 90rpx;
  line-height: 90rpx;
  border-radius: 90rpx;
  border: none;
  outline: none;
  background: linear-gradient(to right,#75D672,#14BF6D);
  color: #ffffff;
  margin-top: 214rpx;
}
.disabled{
  color: rgba(255, 255, 255, 0.5) !important;
}
</style>
