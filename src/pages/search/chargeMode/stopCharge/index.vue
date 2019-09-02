<template>
  <div id="index">
    <div class="stopCharge" >
      <div class="info"> 
        <div class="img"><img src="https://testapi.xmnewlife.com/car/images/cut/img_smile.png" alt=""></div>
        <div class="img" v-if="stopType == 2"><img src="https://testapi.xmnewlife.com/car/images/cut/img_smile.png" alt=""></div>
        <div class="img" v-if="stopType == 1"><img src="https://testapi.xmnewlife.com/car/images/cut/img_question.png" alt=""></div>
        <div class="img" v-if="stopType == 0"><img src="https://testapi.xmnewlife.com/car/images/cut/ic_right.png" alt=""></div>
        <div class="content">
          <div v-if="stopType == 2">您账户中，该时间段的电量已经用完，系统已停止充电，您可买电后继续启动充电。请尽快取走您的爱车，超过半小时未取走则开始收取停车费。</div>
          <div v-if="stopType == 1" class="mg">您已临时终止了充电，具体原因不明，可到现场查看。请尽快取走您的爱车，超过半小时未取走则开始收取停车费。</div>
          <div v-if="stopType == 0">已经为您的爱车充满电，请尽快将您的爱车取走。超过半小时未取走则开始计费。</div>
          <!-- <div v-if="stopType == 0">已经为您的爱车充满电，请尽快将您的爱车取走。超过半小时未取走则开始计费。</div> -->
        </div>
        <!-- <div class="timeOut">剩<span v-model="M">{{M}}</span>分<span v-model="S">{{S}}</span>秒</div> -->
        <button class="btn cancel" @click="skip('pay')" v-if="stopType == 2">去充值</button>
      </div>
      <div class="footer" :class="[style,{fd:stopType == 0 || stopType == 1 || stopType == 2}]">
        <button class="btn" @click="skip('search/chargeMode/countCharge')">查看充电情况</button>
        <button class="btn nav" @click="gps=true">导航去取车</button>
      </div>
    </div>
    <div class="dialog" v-if="gps == true" @click="gps=false">
      <div class="dialog_warp" style="">
        <div class="tip" style="pading: 52rpx;">您将打开手机地图APP导航去这个充电桩！</div>
        <div class="into" @click="moveTo(latitude,longitude)" style="">进入导航</div>
      </div>   
    </div>
  </div>
</template>
<script>
import utils from "@/utils/index";
import NumberAnimate from "@/utils/numberAnimate";
import { sendNoTokenSms } from '@/api/api'  
import { mapState, mapActions } from 'vuex'
import { getClientInfo, getUcCenter, chargeStop, getChargeLog } from '@/api/api'

export default {
  data() {
    return {
      id: "",
      chargeObj: {},
      longitude: "118.2223105431",                      //经度
      latitude: "24.7053898741",                        //纬度
      address: "",
      name: "", 
      stopType: -1,
      gps: false,                                   //状态说明  0：充滿正常結束   1：意外终止充电   2：充滿剩余余额不足  
      style: "footer",
      M: '00',
      S: '00',
      timer: '',
      settle: true,    //超过30分钟是否已结算
      confirmLeave: false
    };
  },
  computed: {
  
  },
  onShow() {
    console.log("this.$root.$mp.query",this.$root.$mp.query)
    this.id = this.$root.$mp.query.id 
    // if(this.$root.$mp.query.stopType == 2){
    //   this.stopType = 0
    //   wx.removeStorageSync('BT');
    // }else if(this.$root.$mp.query.stopType == 3) {
    //   this.stopType = 1
    // }
    getChargeLog({
      orderSn: utils.wxGetStorage('chargeInfo').orderSn,
    }).then(res=>{
      if(res.data.code == 200) {
        if(res.data.data != '') {
          this.chargeObj = res.data.data
          this.stopType = this.chargeObj.stopType 
          if(this.stopType == 1){
            wx.setNavigationBarTitle({
              title: '充电终止'
            })
          }else{
            wx.setNavigationBarTitle({
              title: '喵喵充电'
            })
          }
          this.chargeObj.actualAmount = this.chargeObj.actualAmount.toFixed(4)
          this.chargeObj.chargeTimePrice = this.chargeObj.chargeTimePrice.toFixed(4)
          this.chargeObj.couponPrice = this.chargeObj.couponPrice.toFixed(4)
          this.chargeObj.chargeAmount = this.chargeObj.chargeAmount.toFixed(4)
        }
      }
    })
    
    // this.countDown()
  },
  updated() {
    console.log(this.confirmLeave)
    if(this.confirmLeave == true){
      clearInterval(this.timer)
      wx.removeStorageSync('beforeTime');
    }
  },
  mounted() {
    
  },
  components: {

  },
  methods: {
    init() {
      if(this.settle == true){
        clearInterval(this.timer)
        wx.removeStorageSync('BT');
      }
    },
    navigation(longitude,latitude) {
      var that = this
      wx.openLocation({
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        scale: 17,
        address: that.address,
        name: that.name
      })
    },
    //倒计时
    countDown() {
      //wx.removeStorageSync('BT');
      console.log("BT",utils.wxGetStorage("BT"))
      if(this.confirmLeave == false){
        // wx.removeStorageSync('BT');
        //若未离开时未创建，此时创建到期时间戳
        if(utils.wxGetStorage("BT") != false){    //已创建
          console.log("到期时间戳 30分钟",utils.wxGetStorage("BT")+ 1*60*1000)   //到期时间戳 30分钟
          console.log("当前时间",Date.parse(new Date()))
          //若到期时间戳大于当前时间戳才执行倒计时，否则倒计时置0
          if(utils.wxGetStorage("BT")+1*60*1000> Date.parse(new Date()) ){   
            var timeout = utils.wxGetStorage("BT")+1*60*1000
            this.timer = setInterval(() => {  //倒计时
              let count = timeout - Date.parse(new Date())
              if(count <= 0){
                clearInterval(this.timer)
                // wx.removeStorageSync('BT');
                console.log("清除时间")
              }
              this.ToTime(count)
              console.log("23433",this.ToTime(count))
            },1000)
          }else{
            let count = 0
            this.ToTime(count)
            console.log('else',this.ToTime(count))
          }
        }else{ //未创建
          utils.wxSetStorageSync("BT",Date.parse(new Date()))   
          console.log("未创建BT1",utils.wxGetStorage("BT"))    
          //若到期时间戳大于当前时间戳才执行倒计时，否则倒计时置0
          if(utils.wxGetStorage("BT") + 1*60*1000 > Date.parse(new Date()) ){   
            var timeout = utils.wxGetStorage("BT") +1*60*1000
            this.timer = setInterval(() => {  //倒计时
              let count = timeout - Date.parse(new Date())
              if(count <= 0){
                clearInterval(this.timer)
                // wx.removeStorageSync('BT');
                console.log("清除时间")
              }
              this.ToTime(count)
              console.log("23433",this.ToTime(count))
            },1000)
          }else{
            let count = 0
            this.ToTime(count)
            console.log('else',this.ToTime(count))
          }
        }

      }else{ //离开充电桩后清除倒计时
        clearInterval(this.timer)
        wx.removeStorageSync('BT');
      }
    },
    ToTime(timestamp) {
      // console.log(timestamp)   
      var m = parseInt(timestamp / (60 * 1000));
      var s = (timestamp % (1000 * 60) / 1000)
      if((timestamp % (1000 * 60) / 1000) < 10){
        s = "0" + (timestamp % (1000 * 60) / 1000) 
      }
      this.M = m
      this.S = s
      return m + "分" + s + "秒";
    },
    moveTo() {
      wx.showModal({
        content: '您确定要现在就停止充电吗？',
        // confirmText: "取消",
        cancelText: "进入导航",
        showCancel: false,
        success: function (res) {
          console.log(res);
          if (res.confirm) {
            this.navigation(longitude,latitude)
            console.log('用户点击主操作')
          }
        }
      });     
    },
    skip(type) {
      wx.navigateTo({
        url: "/pages/" + type + "/main"
      });
    },
    submit(params) {
      wx.reLaunch({
        url: "/pages/search/chargeMode/countCharge/main?type=" + params
      });
    }
  },
  watch: {
    
  },
};
</script>

<style scoped lang="scss">
@import "../../../../../static/assets/scss/search/chargeMode/stopCharge/index.scss";

</style>
