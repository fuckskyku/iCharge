<template>
  <div id="user"> 
    <button @click="getCode()">获取code码</button>
    {{code}}
    <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">微信快速登录</button>
  </div>
</template>
<script>
import utils from "@/utils/index";
import { mapState, mapActions } from 'vuex'
import { getSuggestionList,
//  getnewnoticecount, 
 getUcCenter } from '@/api/api'  

export default {
  data() {
    return {
      code: ''
    };
  },
  onShow(){
    
    
  },
  methods: {
    getCode() {
      var that = this
      wx.login({
        success(res) {
          if (res.code) {
            that.code = res.code
            console.log('code:', that.code)
            发起网络请求
            wx.request({
              url: 'https://test.com/onLogin',  //测试接口
              data: {
                code: res.code
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    },
    //手机号授权
    getPhoneNumber(e) { 
      console.log("e.mp.detail",e.mp.detail)
      var that = this
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
      console.log('encryptedData',e.mp.detail.encryptedData,'IV',e.mp.detail.iv)
        // 调用login请求api转换登录凭证
        // login({
        //   code: that.code
        // }).then(res =>{
        //   if(res.data.code == 200){
        //     //调用register进行账号区分
        //     register({
        //       OpenId: res.data.data.openId,
        //       SessionId: res.data.data.sessionId,
        //       EncryptedData: encryptedData,
        //       Iv: IV
        //     }).then(res=>{
        //       if(res.data.code == 200){
        //         console.log("register成功",res.data.data)
        //         console.log(that.token)
        //       }else{
        //         console.log("register",res.data.message)
        //       }
        //     })
        //   }
        // })
      }
      /* 登录有效期检查 */
      wx.checkSession({
        success: function (res) {
          //session_key 未过期，并且在本生命周期一直有效
          console.log('su',res)
        },
        fail: function (res) {
          // session_key 已经失效，需要重新执行登录流程
          console.log('los',res)
          //wx.login() //重新登录
        }
      });
    },
  },
  computed: {
    ...mapState(['token'])
  },
  components: {
   
  },
  
  watch: {},

};
</script>

<style scoped lang="scss">
@import "../../../static/assets/scss/user/index.scss";

</style>

