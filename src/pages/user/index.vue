<template>
  <div id="user">
    <div class="user" v-if="token!=''">
      <!-- 用户信息 -->
      <div class="userInfo">
        <img class="back" src="https://testapi.xmnewlife.com/car/images/cut/img_5.png" alt="">
        <div class="info" @click="skip('personalInfo')">
          <div class="headImg">
            <!-- <open-data type="userAvatarUrl" v-if="userInfo.avatarUrl == '' "></open-data> -->
            <img :src="avatar" alt="">
          </div>
          <div class="nickName">您好，{{userInfo.nickName}}</div>
        </div>
      </div>
      <!-- <div class="userInfo">
        <img class="back" src="https://testapi.xmnewlife.com/car/images/cut/img_5.png" alt="">
        <div class="info" @click="skip('personalInfo')">
          <div class="headImg"><img :src="userInfo.avatarUrl" alt=""></div>
          <div class="nickName" >您好，{{userInfo.nickName}}</div>
        </div>
      </div>-->

      <div class="account-info">
        <ul class="account-list">
          <div class="account" style="border-bottom: 20rpx solid #F4F4F4;">
            <div class="balance" @click="skip('accountBalance')">账户余额
              <span class="dump">{{userInfo.balance}} 元</span>
            </div>
            <div class="dumpEnergy">
              <div @click="skip('pay')" class="recharge">充值</div>
            </div>
          </div>
          <li @click="skip('coupons')">
            <img
              class="img"
              style="width:50rpx;height:42rpx;"
              src="/static/img/cut/ic_coupon.png"
              alt=""
            >优惠券
            <img class="right" src="https://testapi.xmnewlife.com/car/images/cut/right.png" alt="">
          </li>
          <li @click="skip('about')">
            <img
              class="img"
              style="width:50rpx;height:48rpx;"
              src="https://testapi.xmnewlife.com/car/images/cut/ic_us.png"
              alt=""
            >关于我们
            <img class="right" src="https://testapi.xmnewlife.com/car/images/cut/right.png" alt="">
          </li>
          <!-- <li @click="skip('clause')"><img class="img" style="width:52rpx;height:48rpx;" src="https://testapi.xmnewlife.com/car/images/cut/ic_falv.png" alt="">法律条款<img class="right" src="https://testapi.xmnewlife.com/car/images/cut/right.png" alt=""></li> -->

          <li @click="skip('inmail')">
            <img
              class="img"
              style="width:52rpx;height:56rpx;"
              src="https://testapi.xmnewlife.com/car/images/cut/ic_letter.png"
              alt=""
            >站内信
            <span
              class="letterTip"
              v-if="readNum > '0' && readNum != '' && readNum != null && readNum != undefined"
            >{{readNum}}</span>
            <img class="right" src="https://testapi.xmnewlife.com/car/images/cut/right.png" alt="">
          </li>
          <li @click="skip('editAdvice')" style="border: none;">
            <img
              class="img"
              style="width:56rpx;height:48rpx;"
              src="https://testapi.xmnewlife.com/car/images/cut/ic_Opinion.png"
              alt=""
            >意见反馈
            <img class="right" src="https://testapi.xmnewlife.com/car/images/cut/right.png" alt="">
          </li>
        </ul>
      </div>
      <button @click="skip('index')" class="btn cancel" style="margin-top: 60rpx;">首页</button>
      <!-- <button @click="loginOut()" class="btn cancel">{{this.token == '' ? "注册登录" : "退出登录" }}</button> -->
    </div>
  </div>
</template>
<script>
import utils from "@/utils/index";
import { mapState, mapActions } from "vuex";
import {
  getSuggestionList,
  //  getnewnoticecount,
  getUcCenter
} from "@/api/api";
export default {
    data() {
    return {
      userInfo: {

      },
      avatar: "/static/img/touxiang@3x.png",
      showModel: true,
      dumpEnergy: "2333",
      letterTip: '99',
      tabelData: [],
      readNum: '0'
    };
  },
  onShow(){
    var that = this
    this.readNum = 0
    if(this.token==""){
      wx.reLaunch({
        url: "/pages/loginSelect/main"
      });
    }else{
      this.userInfo = utils.wxGetStorage("userInfo");
      getUcCenter({

      }).then(res =>{
        if(res.data.code == 200){ 
          //console.log('res.data.data',res.data.data)
          this.userInfo = utils.wxGetStorage("userInfo")
          this.userInfo.avatarUrl = res.data.data.avatarUrl
          this.userInfo.nickName = res.data.data.nickName
          this.userInfo.newNotice = res.data.data.noticeCount 
          this.$set(this.userInfo,"balance",res.data.data.balance.toFixed(2))
          this.$set(this.userInfo,"gender",res.data.data.gender)
          this.readNum = res.data.data.noticeCount 
          utils.wxSetStorageSync("userInfo",this.userInfo)
          if(utils.wxGetStorage("userInfo").avatarUrl != "") {
            this.avatar = 'http://upload.mseenet.com/' + utils.wxGetStorage("userInfo").avatarUrl
          }
          //console.log('this.readNum',this.readNum,"this.userInfo",utils.wxGetStorage("userInfo"))
        }
      })
    }  
  },
  methods: {
    ...mapActions([
      'setToKen',
      'setClearStore'
    ]),
    bindTimeChange(e) {
      this.time =  e.mp.detail.value
      console.log(this.time)
    },
    bindAgreeChange(e) {  
      this.isAgree = !!e.mp.detail.value.length   
      console.log(this.isAgree)
    },
    loginOut() {
      var that = this
      wx.showModal({
        title: '提示',
        content: '确定退出登录吗？',
        success(res) {
          if (res.confirm) {
            that.setToKen('')
            that.setClearStore('state')
            wx.reLaunch({
              url: "/pages/index/main"
            });
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      
    },
    //页面路由跳转
    skip(type,params) {
      if(type == "index" || type == "pay"){
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
   
  },
  
  watch: {},
};
</script>

<style scoped lang="scss">
@import "../../../static/assets/scss/user/index.scss";
</style>

