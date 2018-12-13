<template>
  <div id="user" class="user">
    <!-- <button open-type="getUserInfo" lang="zh_CN" bindgetuserinfo="onGotUserInfo">获取用户信息</button> -->
    <!-- 用户信息 -->
    <div class="userInfo">
      <img class="back" src="/static/img/cut/img_5.png" alt="">
      <div class="info">
        <div class="headImg"><open-data class="openImg" type="userAvatarUrl"></open-data></div>
        <div class="nickName">您好，<open-data type="userNickName"></open-data></div>
      </div>
      
    </div>
    <!-- <div class="userinfo">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
      <div style="height:1px;width:100%;background:#ccc;"></div>
      <div class="energy">剩余电量:<span style="font-size:40rpx;color:#FF6600;">{{dumpEnergy}}</span><span style="font-size:36rpx;color:#555;">度</span></div>
    </div> -->
    <!--  -->
    <div class="account-info">
      <ul class="account-list">
        <li @click="skip('buy')" style="border-bottom: 20rpx solid #F4F4F4;">剩余电量<div class="dumpEnergy"><span class="dump">{{dumpEnergy}} <span style="color:#999;">度</span></span><img  src="/static/img/cut/right.png" alt=""></div></li>
        <li @click="skip('orders')"><img class="img" style="width:40rpx;height:48rpx;" src="/static/img/cut/ic_order.png" alt="">订单记录<img class="right" src="/static/img/cut/right.png" alt=""></li>
        <li @click="skip('about')"><img class="img" style="width:46rpx;height:48rpx;" src="/static/img/cut/ic_us.png" alt="">关于我们<img class="right" src="/static/img/cut/right.png" alt=""></li>
        <li @click="skip('clause')"><img class="img" style="width:46rpx;height:48rpx;" src="/static/img/cut/ic_falv.png" alt="">法律条款<img class="right" src="/static/img/cut/right.png" alt=""></li>
        <li @click="skip('inmail')"><img class="img" style="width:48rpx;height:56rpx;" src="/static/img/cut/ic_letter.png" alt="">站内信<img class="right" src="/static/img/cut/right.png" alt=""></li>
        <li @click="skip('advice')" style="border: none;"><img class="img" style="width:48rpx;height:52rpx;" src="/static/img/cut/ic_Opinion.png" alt="">意见反馈<img class="right" src="/static/img/cut/right.png" alt=""></li>
      </ul>
    </div>
    <button @click="skip('index')" class="btn cancel">首页</button>
    <!-- 自定义弹框开始 -->
    <!-- <div v-if="showModel" class="model">
      <div class="modelTitle">
        获取微信授权信息
      </div>
      <div class="modelBody">微信登录需要获取您的用户信息，请前往设置</div>
      <div class="btns">
        <button open-type="getUserInfo" class="agree" :bindgetuserinfo="bindAgreeChange" lang="zh_CN">去设置</button>
      </div>
    </div>
    <div v-if="showModel" class="mask"></div> -->
    <!-- 自定义弹框结束 -->
  </div>
</template>
<script>
import card from "@/components/card"
import utils from "@/utils/index";
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      userInfo: {},
      showModel: true,
      dumpEnergy: "2333"
    };
  },
  onShow(){
    
  },
  created() {
    this.getUserInfo()
    utils.wxSetStorageSync('userInfo', this.userInfo)
    console.log(utils.wxGetStorage("userInfo"))
  },
  onLoad() {
    console.log(this.$root.$mp.appOptions)
    this.$root.$mp.appOptions.query.userInfo = []
    this.$root.$mp.appOptions.query.userInfo.push(this.userInfo)
    console.log(this.$root.$mp.appOptions.query,this.userInfo)
    if(this.token==""){
      wx.reLaunch({
        url: "/pages/login/main"
      });
    }else{

    }
  },
  methods: {
    bindTimeChange(e) {
      this.time =  e.mp.detail.value
      console.log(this.time)
    },
    bindAgreeChange(e) {  
      this.isAgree = !!e.mp.detail.value.length   
      console.log(this.isAgree)
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: (res) => {
          console.log("res",res)
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
              console.log(this.userInfo)
            }
          })
        }
      })
    },
    //页面路由跳转
    skip(type) {
      if(type == "index" || type == "buy"){
        wx.navigateTo({
          url: "/pages/" + type + "/main"
        });
      }else{
        wx.navigateTo({
          url: "/pages/userCenter/" + type + "/main"
        });
      }
      
    },
  },
  computed: {
    ...mapState(['token'])
  },
  components: {
    card
  },
  
  watch: {},

};
</script>

<style scoped lang="scss">
.user{
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: #F4F4F4;
}
.userInfo{
  height: 220rpx;
  .back{
    width: 100%;
    height: 220rpx;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }
  .info{
    position: relative;
    z-index: 11;
    margin-top: 34rpx 0 0 40rpx;
  }
  .headImg{
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
    border: 6rpx solid #8CDFA2;
    overflow: hidden;
    display: inline-block;
    vertical-align: middle;
    margin: 0 34rpx;
    
  }
  .nickName{
    color: #fff;
    display: inline-block;
    vertical-align: middle;
    font-size: 36rpx;
  }
  .userinfo-avatar{
    
  }
  .userinfo-nickname{
    
  }
}
.account-info{
  // border: 1px solid #666;
  .account-list{
    li{
      position: relative;
      width: 100%;
      height: 100rpx;
      line-height: 100rpx;
      font-size: 34rpx;
      background: #fff;
      padding: 0 40rpx 0;
      border-bottom: 1px solid #E5E5E5;
      .img{
        width: 44rpx;
        height: 60rpx; 
        display: inline-block;
        vertical-align: middle;
        margin: -6rpx 34rpx 0 0;
      }
      .right{
        position: absolute;
        top: 50%;
        right: 120rpx;
        width: 16rpx;
        height: 24rpx;
      }
      .dumpEnergy{
        height: 100rpx;
        position: absolute;
        top: 50%;
        right: 120rpx;
        margin-top: -14rpx;
        margin-top: -50rpx;
        img{
          width: 16rpx;
          height: 24rpx;
        }
      }
      .dump{
        font-size: 34rpx;
        color: #FFC000;
        margin-right: 40rpx;
      }
    }
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
  margin-top: 178rpx;
}
.cancel{
  background: transparent;
  color: #14BF6D;
  border: 1px solid #14BF6D;
}
</style>

