<template>
  <div id="login" class="login">
    <div class="title"><open-data type="userAvatarUrl"></open-data></div>
    <div class="subTitle">手机号验证登录</div>
    <form>
      <!-- 手机号 -->
      <div class="context">
        <img src="/static/img/cut/login_03.png" class="m1" alt="">
        <input class="tel" v-model="mobile" @blur="verificationTel()" @input="verify()" type="tel" pattern="[0-9]*" placeholder="请输入手机号"  placeholder-style="color:#B3B3B3">
        <div class="line"></div>
      </div>
      <!-- 验证码 -->
      <div class="context">
        <img src="/static/img/cut/login_06.png" class="m2" alt="">
        <input class="weui-input margin26" v-model="Code" @change="verificationCode()" @input="verify()" type="number" placeholder="请输入验证码"  placeholder-style="color:#B3B3B3">
        <button type="button" :disabled="dis" class="code_btn"  @click="getCodes()" value="获取验证码">{{codeMsg}}</button>
        <div class="line"></div>
      </div>
      <button class="btn" :disabled="disabled" :class="[style,{disabled:disabled == true}]" @click="submit()">确 定</button>
    </form>
  </div>
</template>
<script>
import utils from "@/utils/index";
import { login,sendNoTokenSms } from '@/api/api'  
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
       //登录帐号
      mobile: "",
      Code: "",
      codeMsg: "获取验证码",
      msg: '',
      isClick: false,
      disabled: true,
      dis: false,
      flag: false,
      err: 0,
      style: "btn",
    };
  },
  onLaunch() {

  },
  created() {
    
    
  },
  methods: {
    ...mapActions([
      'setToKen',
    ]),

    // 失去焦点提示
    verificationCode(){
      if (!utils.required(this.Code)) {
        utils.showDialog('请输入验证码')
        return
      }
    },
    verificationTel() {
      if (!utils.required(this.mobile)) {
        utils.showDialog('请填写手机号码')
        return
      }
      if (!utils.tel(this.mobile)) {
        utils.showDialog('您填写的手机号码不正确')
        return
      }
      
    },
    //点击获取短信验证码
    getCodes() {
      var that = this
      this.isClick = true
      console.log(this.codeMsg)
      // this.dis = true
      if (!utils.required(this.mobile)) {
        utils.showDialog('请填写手机号码')
        return
      }
      if (!utils.tel(this.mobile)) {
        utils.showDialog('您填写的手机号码不正确')
        return
      }
      var miao = 10;
      utils.showDialog("验证码已发送，请查收短信")
      var timehandler = setInterval(function() {
        that.codeMsg = miao + "秒后再获取";
        that.dis = true;
        miao--;
        if (timehandler != null && miao <= 0) {
          clearInterval(timehandler);
          that.dis = false;
          that.codeMsg = "获取短信验证码";
        }
      }, 1000);
      
      // sendNoTokenSms({
      //   mobile: this.mobile,
      // }).then(res => {
      //   utils.showDialog(res.data.message)
      //   //console.log(res)
      // })
    },
    //提交登录
    submit(){
      if (!utils.required(this.mobile)) {
        utils.showDialog('请填写手机号码')
        return
      }
      if (!utils.tel(this.mobile)) {
        utils.showDialog('您填写的手机号码不正确')
        return
      }
      if(this.Code == 1234 && this.isClick == true) {
        this.login()
      }
      if (this.Code != 1234 && this.Code != '') {
        this.msg = "验证码错误"
        this.dialog()
        utils.showDialog("验证码错误")
        // utils.wxSetStorageSync("err",utils.wxGetStorage(err)++)
        console.log(utils.wxGetStorage(err))
      }else if(this.Code == 1234 && this.isClick == false){ 
        utils.showDialog('请先获取验证码')
      }
    },
    //登录
    login() {
      
      // 缓存测试
      // utils.wxSetStorageSync('userInfo', this.mobile)
      console.log(utils.wxGetStorage("userInfo"))
      console.log("this.token",this.token)
      this.setToKen(true)
      console.log(this.token)
      var url = '/pages/login/loginSuccess/main'
      
      wx.reLaunch({
        url: url
      });
      // login({
      //   mobile: this.mobile,
      //   code: this.Code
      // }).then(res => {
      //   if (res.data.code != 200) {
      //     utils.showDialog(res.data.message)
      //     return
      //   }
        
      //   this.initData()
      //   this.setToKen(res.data.data.token)
      //   this.setUserId(res.data.data.id)
      //   this.setJudgeUserType(res.data.data.userType)
      //   utils.wxSetStorageSync('students', res.data.data.students)
      //   wx.reLaunch({
      //     url: url
      //   })
      // })
    },
    verify() {
      if(this.mobile != '' && this.Code != "" ){
        this.disabled = false;
      }else{
        this.disabled = true;
      }
    },
    // 弹出框
    dialog() {
      wx.showModal({
        title: '提示',
        content: this.msg,
        showCancel: false,
        confirmText: "确定",
        success: function (res) {
          console.log(res);
          if (res.confirm) {
            console.log('用户点击主操作')
          }
        }
      });
    }
  },
  computed: {
    ...mapState(['token'])
  },
  components: {
    
  },
  
  watch: {
    err(newV,v) {
      if(newV == 3){
        this.flag = true
      }
    }
  },

};
</script>

<style scoped lang="scss">
.content{
  width: 70%;
  margin: 0 auto;
}
.border_b{
  border-bottom: 1px solid #ccc; 
}
.login{
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  .title ,.subTitle{
    margin: 40rpx auto;
    text-align: center;
    font-size: 52rpx;
  }
  .title{
    width: 180rpx;
    height: 180rpx;
    background: #D8D8D8;
    border-radius: 10rpx;
    overflow: hidden;
    .headImg{
      width: 100%;
      height: 100%;
      vertical-align: middle;
    }
  }
  .subTitle{
    background: none;
    font-size: 38rpx;
    border: none;
    color: #AAAAAA;
  }
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
  margin-top: 80rpx;
}
.cancel{
  background: #fff;
  color: #14BF6D;
  border: 1px solid #14BF6D;
}
.disabled{
  color: rgba(255, 255, 255, 0.5) !important;
}
.weui-vcode-btn{
  border: none !important;
  background: transparent !important;
}
.context{
  width: 72%;
  height: 92rpx;
  display: flex;
  margin: 0 auto;
  position: relative;
  padding: 20rpx 50rpx 0 50rpx;
  align-items: center;
  // border: 1px solid #ccc;
  img{
    width: 60rpx;
    height: 60rpx;
    vertical-align: middle;
    margin-top: 4rpx;
  }
  .m1{
    width: 40rpx;
    height: 54rpx;
    margin-left: 6rpx;
  }
  .m2{
    width: 66rpx;
    height: 50rpx;
  }
  .tel{
    width: 100%;
    display: inline-block;
    vertical-align: middle;
    color: #333;
    margin-left: 26rpx; 
  }
  .margin26{
    margin-left: 26rpx; 
  }
  button::after{
    border: none;
    
  }
  .code_btn{
    width: 280rpx;
    padding: 0;
    font-size: 26rpx;
    color: #14BF6D;
    outline: none;
    background: transparent;
  }
}

.line{
  width: 460rpx;
  height: 1px;
  background: #D1D1D1;
  position: absolute;
  bottom: 0;
  right: 60rpx;
}
</style>
