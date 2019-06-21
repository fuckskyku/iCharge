<template>
  <div>
    <div class="dialog">
      <div class="banner"><img src="https://testapi.xmnewlife.com/car/images/cut/img_car.png" alt=""></div>
      <div class="dialog_warp">
        <!-- <button
          style="background:#0BBB08;color:#ffffff;width:692rpx;height:92rpx;line-height:92rpx;font-size:36rpx;"
          open-type="getUserInfo"
          @getuserinfo="bindGetUserInfo"
          @click="getUserInfo()"
        >
          微信用户快速登录
        </button>    -->
        <button class="weChat_login" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" @click="getUserInfo()">
          微信用户快速登录
        </button>   
        <div style="height:10px;"></div>
        <button class="tel_login" @click="skip('login')">
          输入手机号注册登录
        </button> 
        <button class="btn cancel reset"  @click="skip('index')">返回首页</button>
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import utils from "@/utils/index";
import { register, login, checkToken } from '@/api/api'

export default {
  data() {
    return {
      height: ""
    };
  },
  onShow() {
    // 高度自适应
    var _this = this;
    // 查看是否授权
    wx.getSetting({
      success(res) {
        console.log("查看是否授权",res)
        if (res.authSetting['scope.userInfo']) {
          console.log('用户已经授权过')
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          // 调用登录接口        
        }else{
          console.log('用户还未授权过')
        }
      },
    })
  },
  methods: {
    ...mapActions([
      'setToKen',
      'setCanIUse',
      'setSessionId',
      'setOpenId'
    ]),
    getUserInfo() {
      console.log('getUserInfo事件首先触发')
      // 判断小程序的API，回调，参数，组件等是否在当前版本可用。  为false 提醒用户升级微信版本
      if(wx.canIUse('button.open-type.getUserInfo')){
        // 用户版本可用
        //获取code码
        wx.login({
          success: (res) => {
            this.code = res.code
            console.log("获得code码",res)
          }
        })
      }else{
          console.log('请升级微信版本')
      }
    },
    //用户信息授权
    bindGetUserInfo(e) {
      var that = this
      // console.log(e.mp.detail.rawData)
      if (e.mp.detail.rawData){
        //用户按了允许授权按钮
        var APPID = this.APPid
        var SECRET = this.AppSecret
        var IV = e.mp.detail.iv
        var encryptedData = e.mp.detail.encryptedData
        console.log(e.mp.detail)
        console.log('用户按了允许授权按钮')
        // 查看是否授权
        wx.getSetting({
          success(res) {
            // console.log("查看是否授权",res)
            if (res.authSetting['scope.userInfo']) {
              // console.log('用户已经授权过')
              // console.log("this.code",that.code)
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称
              
              // 调用login请求api转换登录凭证
              login({
                code: that.code
              }).then(res =>{
                console.log('login data',res.data)
                if(res.data.code == 200){
                  console.log("login用户存在",res.data)
                }
                if( res.data.code == 403){
                  console.log("login不存在",res.data)
                  //调用register进行注册
                  register({
                    Type: 'USERINFO',
                    OpenId: res.data.data.openId,
                    SessionId: res.data.data.sessionId,
                    EncryptedData: encryptedData,
                    Iv: IV
                  }).then(res=>{
                    if(res.data.code == 200){
                      console.log("注册成功",res.data)
                      that.setToKen(res.data.data.token)
                      console.log(that.token)
                    }
                  })
                }
                that.setCanIUse(false)
              })
            }else{
              console.log('用户还未授权过') 
              
            }
          },
        })
      }else {
        //用户按了拒绝按钮
        console.log('用户按了拒绝按钮')
        console.log(e.mp.detail)
        wx.showToast({
          title: "请先同意授权才能进行登录",
          icon: 'none',
          duration: 2000
        });
      }
    },
    //手机号授权
    getPhoneNumber(e) { 
      console.log("e.mp.detail",e.mp.detail)
      var that = this
      var APPID = this.APPid
      var SECRET = this.AppSecret
      var IV = e.mp.detail.iv
      var encryptedData = e.mp.detail.encryptedData
      // 调用登录接口
      //console.log("this.code",that.code)
      //console.log("e.mp.detail.errMsg",e.mp.detail.errMsg)
      if (e.mp.detail.errMsg == 'getPhoneNumber:fail user deny' || e.mp.detail.errMsg  == 'getPhoneNumber:user deny') { //用户拒绝授权
        wx.showToast({
          title: "请先同意授权才能进行登录",
          icon: 'none',
          duration: 2000
        });
      }else{ //用户允许授权
        // 调用login请求api转换登录凭证
        login({
          str: that.code
        }).then(res =>{
          if(res.data.code == 200){
            console.log("login用户存在",res.data.data)
            that.setSessionId(res.data.data.sessionKey)
            var openId = res.data.data.openId
            console.log('openId1',openId)
            //调用register进行账号区分
            register({
              openId: res.data.data.openid,
              sessionId: res.data.data.sessionKey,
              encryptedData: encryptedData,
              iv: IV
            }).then(res=>{
              if(res.data.code == 200){
                // console.log("register成功",res.data.data)
                var userObj = res.data.data
                // console.log('openId2',openId,'userObj',userObj)
                that.$set(userObj,'openId',openId)
                that.setToKen(res.data.data.token)
                that.setOpenId(openId)
                // console.log(this.openId)
                utils.wxSetStorageSync('userInfo', res.data.data)
                // console.log(that.token)
                wx.navigateTo({
                  url: "/pages/login/loginSuccess/main"
                });
              }else{
                console.log("register",res.data.message)
              }
            })
          }else{

          }
          // if( res.data.code != 200){
          //   console.log("login不存在",res.data)
          //   //调用register进行注册
          //   register({
          //     openId: res.data.data.openId,
          //     sessionId: res.data.data.sessionKey,
          //     encryptedData: encryptedData,
          //     iv: IV
          //   }).then(res=>{
          //     if(res.data.code == 200){
          //       console.log("注册成功",res.data)
          //       that.setToKen(res.data.data.token)
          //       utils.wxSetStorageSync('userInfo', res.data.data)
          //       wx.navigateTo({
          //         url: "/pages/login/loginSuccess/main"
          //       });
          //     }
          //   })
          // }
        })
      }
      /* 登录有效期检查 */
      wx.checkSession({
        success: function (res) {
          //session_key 未过期，并且在本生命周期一直有效
          // console.log('su',res)
        },
        fail: function (res) {
          // session_key 已经失效，需要重新执行登录流程
          // console.log('los',res)
        }
      });
    },
    //页面路由跳转
    skip(type,id) {
      wx.navigateTo({
        url: "/pages/" + type + "/main"
      });
    },
  },
  computed: {
    ...mapState(['token','canIUse','APPid','AppSecret','openId'])
  },
  components: {
    
  },
};
</script>

<style lang='scss' scoped>
@import "../../../static/assets/scss/loginSelect/index.scss";

</style>
