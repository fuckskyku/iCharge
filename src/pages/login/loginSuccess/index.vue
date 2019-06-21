<template>
  <div id="login" class="login">
    <div class="tip"><img src="https://testapi.xmnewlife.com/car/images/cut/ic_right.png" alt=""></div>
    <div class="title">登录成功</div>
    <div class="subTitle">登录成功!<span class="bright">{{countdown}}</span>秒后自动进入</div>
    <button class="btn" @click="into()">立即进入</button>
  </div>
</template>
<script>
import utils from "@/utils/index";
import { getUcCenter } from '@/api/api'  
import { mapState, mapActions } from 'vuex'
var timer = ""
export default {
  data() {
    return {
      msg: '',
      time: "12:01",
      countdown: 3,
      userInfo: {},
      isAgree: false,
      disabled: true,
      style: "btn"
    };
  },
  onLaunch() {

  },
  onShow() {
    var that = this
    // this.userInfo = utils.wxGetStorage("userInfo")
    getUcCenter({}).then(res =>{
      if(res.data.code == 200) {
        that.userInfo = res.data.data
        utils.wxSetStorageSync('userInfo',that.userInfo)
      }
      // that.userInfo = res.data.data
      // this.$set(this.userInfo,'userId',res.data.data.userId)
      // this.$set(this.userInfo,'nickName',res.data.data.nickName)
      // this.$set(this.userInfo,'avatar',res.data.data.avatarUrl)
      // this.$set(this.userInfo,'balance',res.data.data.balance)
      // this.$set(this.userInfo,'gender',res.data.data.gender)
      // this.$set(this.userInfo,'newNotice',res.data.data.noticeCount)
      // utils.wxSetStorageSync('userInfo',that.userInfo)
      // utils.wxSetStorageSync("close","open")
    })
  },
  mounted() {
    this.countdown = 3
    timer = setInterval(() => {
      console.log(this.countdown)
      this.countdown--
      if(this.countdown == 0){
        clearInterval(timer)
        wx.reLaunch({
          url: "/pages/index/main"
        });
      }
    },1000) 
  },
  methods: {
    into(){
      clearInterval(timer)
      wx.reLaunch({
        url: "/pages/index/main"
      });
    }
    
  },
  computed: {
    
  },
  components: {
    
  },
  
  watch: {},

};
</script>

<style scoped lang="scss">
@import "../../../../static/assets/scss/login/loginSuccess/index.scss";


</style>
