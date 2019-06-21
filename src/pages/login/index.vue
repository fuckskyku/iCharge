<template>
  <div id="login" class="login">
    <div class="title"><img src="/static/img/LOGO.png" alt="" style="width:100%;height:100%"></div>
    <!-- <div class="title"><open-data type="userAvatarUrl"></open-data></div> -->
    <div class="subTitle">手机号验证登录</div>
    <form>
      <!-- 手机号 -->
      <div class="context">
        <img src="https://testapi.xmnewlife.com/car/images/cut/login_03.png" class="m1" alt="">
        <input class="tel" v-model="mobile" @blur="verificationTel()" @input="verify()" type="tel" pattern="[0-9]*" placeholder="请输入手机号"  placeholder-style="color:#B3B3B3">
        <div class="line"></div>
      </div>
      <!-- 验证码 -->
      <div class="context">
        <img src="https://testapi.xmnewlife.com/car/images/cut/login_06.png" class="m2" alt="">
        <input class="weui-input margin26" v-model="Code" @change="verificationCode()" @input="verify()" type="number" placeholder="请输入验证码"  placeholder-style="color:#B3B3B3">
        <button type="button" :disabled="dis" class="code_btn" :class="[style2,{dis:dis == true}]" @click="getCodes()" value="获取验证码">{{codeMsg}}</button>
        <div class="line"></div>
      </div>
      <button class="btn" :disabled="disabled" :class="[style,{disabled:disabled == true}]" @click="submit()">确 定</button>
    </form>
    <button class="btn cancel reset"  @click="reset()">返回首页</button>
  </div>
</template>
<script>
import utils from "@/utils/index";
import { register, login, checkToken, getPhoneCode, mobileLogin ,GetSession } from '@/api/api'  
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
       //登录帐号
      mobile: "",
      Code: "",  //验证码
      codeMsg: "获取验证码",
      msg: '',
      isClick: false,
      disabled: true,
      dis: false,
      flag: false,
      err: 0,
      style: "btn",
      style2: "code_btn"
    };
  },
  onLoad() {
    
  },
  onShow() {
    this.Code = ''
    this.mobile = ''
  },
  created() {
    
  },
  methods: {
    ...mapActions([
      'setToKen',
      'setCanIUse',
      'setUserId'
    ]),
    reset() {
      var url = '/pages/index/main'
      wx.reLaunch({
        url: url
      });
    },
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
      //console.log(this.codeMsg)
      if (!utils.required(this.mobile)) {
        utils.showDialog('请填写手机号码')
        return
      }
      if (!utils.tel(this.mobile)) {
        utils.showDialog('您填写的手机号码不正确')
        return
      }
      var miao = 60;
      getPhoneCode({
        mobile: this.mobile,
        smsType: "carMobileLogin"
      }).then(res => {
        if(res.data.code == 200){
          utils.showDialog("验证码已发送，请查收短信")
          console.log(res.data.data)
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
        }else{ //60s内重复发送
          utils.showDialog(res.data.message)
        }
      })
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
      
      if(this.Code == ''){ 
        utils.showDialog('请先获取验证码')
        return
      }else{
        // if(this.Code != '') {
        this.login()
        // }
      }
    },
    //登录
    login() {
      //console.log(this.mobile,this.Code)
      mobileLogin({
        mobile: this.mobile,
        code: this.Code, 
      }).then(res=> {
        console.log('登录',res.data)
        if(res.data.code == 200){
          //存储token
          utils.wxSetStorageSync("token",res.data.data.token)
          this.setToKen(res.data.data.token)
          // this.setUserId(res.data.data.userId)
          utils.wxSetStorageSync('userInfo', res.data.data)
          var url = '/pages/login/loginSuccess/main'
          wx.reLaunch({
            url: url
          });
        }else{
          utils.showDialog(res.data.message)
          return
        }
      })
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
          //console.log(res);
          if (res.confirm) {
            //console.log('用户点击主操作')
          }
        }
      });
    }
  },
  computed: {
    ...mapState(['token','userId'])
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
@import "../../../static/assets/scss/login/index.scss";


</style>
