<template>
  <div id="index" class="context parent">
    <div class="child">
      <div class="bg">
        <img src="https://testapi.xmnewlife.com/car/images/cut/authorization.png" alt="">
      </div>
      <p class="content">喵喵充电小程序需要您事先授权定位权限才能正常为您提供服务</p>
      <button class="btn" open-type="openSetting" @opensetting="handler" @click="authorization()">立即授权</button>
    </div>
  </div>
</template>
<script>
import utils from "@/utils/index";
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      id: '',
      tableData: [],
      staName: ''
    };
  },
  computed: {
  
  },
  onShow() {
    wx.getSetting({
      success(res) {
        //console.log('res.authSetting',res.authSetting)
        if (res.authSetting['scope.userLocation']) {
          //console.log("已授权")
          wx.reLaunch({
            url: '/pages/index/main'
          })
        }else{
          wx.showModal({
            content: '获取用户位置失败，请开启定位功能',
            confirmColor: '#576B95',
            showCancel: false,
            success(res) {
              if (res.confirm) {

              }
            }
          })
        }
      }
    })
  },
  mounted() {
   
  },
  components: {

  },
  methods: {
    handler(e) {
      var that = this;
      console.log("dasdasdasdas",e)
      // if (!e.detail.authSetting['scope.userLocation']){

      // }
    },
    authorization() {
      
      // wx.getSetting({
      //   success(res) {
      //     console.log('res.authSetting',res.authSetting)
      //     if (!res.authSetting['scope.userLocation']) {
      //       wx.authorize({
      //         scope: 'scope.userLocation',
      //         success(res) {
      //           console.log('123455678',res)
      //         }
      //       })
      //     }
      //   }
      // })
    },
    skip(pramas,id) {
      console.log(id)
      id == undefined ? wx.navigateTo({
        url: "/pages/userCenter/"+ pramas + "/main"
      }) :  wx.navigateTo({
              url: "/pages/userCenter/"+ pramas + "/main?id=" + id
            });
    }
  },
  watch: {},

};
</script>

<style scoped lang="scss">
@import "../../../static/assets/scss/authorization/index.scss";

</style>
