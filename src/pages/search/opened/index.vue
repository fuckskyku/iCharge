<template>
  <div id="index" class="page">
    <!-- 选定车位后的提示 -->
    <div v-if="insert == false">
      <div class="title">
        您当前已选定位于
      </div>
      <view class="page__bd">
        <view class="weui-panel__bd">
          <view class="weui-media-box weui-media-box_appmsg item" hover-class="weui-cell_active">
            <view class="weui-media-box__hd weui-media-box__hd_in-appmsg">
                <img class="weui-media-box__thumb icon" src="https://testapi.xmnewlife.com/car/images/cut/ic_navigation.png" />
            </view>
            <view class="weui-media-box__bd weui-media-box__bd_in-appmsg">
              <view class="weui-media-box__desc address">福建省厦门市湖里区湖里高新技术园汇金湖里大厦附近宝龙停车场</view>
            </view>
          </view>
          <view class="weui-media-box weui-media-box_appmsg item" hover-class="weui-cell_active">
            <view class="weui-media-box__hd weui-media-box__hd_in-appmsg">
              <img class="weui-media-box__thumb icon" src="https://testapi.xmnewlife.com/car/images/cut/ic_park.png" />
            </view>
            <view class="weui-media-box__bd weui-media-box__bd_in-appmsg">
              <view class="weui-media-box__title">71号充电桩停车闸</view>
            </view>
          </view>
        </view>

      </view>
      <div class="footer">
        <ul>
          <li class="tip">请将车停入车位,并且插入充电器，开始充电。</li>
          <li class="tip_img"><img src="https://testapi.xmnewlife.com/car/images/cut/ic_tips.png" alt=""></li>
          <li class="tip_desc"><p>您有五分钟的时间插入充电枪，若无需充电，请手动点击取消充电使用并将车开出车位让其他用户使用。</p></li>
          <li class="tip_desc"><p>超过五分钟未插入充电器或取消充电，系统将开始扣除您账户上的电量。</p></li>
        </ul>
      </div>
      <button class="btn" @click="skip('chooseParking','')">取消充电</button>
    </div>
    <!-- 插入充电枪后的提示 -->
    <div v-if="insert == true">
      <div class="title">
        您当前已插入位于
      </div>
      <view class="page__bd">
        <view class="weui-panel__bd">
          <view class="weui-media-box weui-media-box_appmsg item" hover-class="weui-cell_active">
            <view class="weui-media-box__hd weui-media-box__hd_in-appmsg">
                <img class="weui-media-box__thumb icon" src="https://testapi.xmnewlife.com/car/images/cut/ic_navigation.png" />
            </view>
            <view class="weui-media-box__bd weui-media-box__bd_in-appmsg">
              <view class="weui-media-box__desc address">福建省厦门市湖里区湖里高新技术园汇金湖里大厦附近宝龙停车场</view>
            </view>
          </view>
          <view class="weui-media-box weui-media-box_appmsg item" hover-class="weui-cell_active">
            <view class="weui-media-box__hd weui-media-box__hd_in-appmsg">
              <img class="weui-media-box__thumb icon" src="https://testapi.xmnewlife.com/car/images/cut/ic_park.png" />
            </view>
            <view class="weui-media-box__bd weui-media-box__bd_in-appmsg">
              <view class="weui-media-box__title">71号充电桩停车闸</view>
            </view>
          </view>
        </view>

      </view>
      <div class="footer">
        <ul>
          <li class="tip">
            <p>您确认要开始充电吗？</p>
            <p>确认后将开始从您账户上扣除剩余电费。</p>
          </li>
          <!-- <li class="tip_img"><img src="https://testapi.xmnewlife.com/car/images/cut/ic_tips.png" alt=""></li>
          <li class="tip_desc"><p>您有五分钟的时间插入充电枪，若无需充电，请手动点击取消充电使用并将车开出车位让其他用户使用。</p></li>
          <li class="tip_desc"><p>超过五分钟未插入充电器或取消充电，系统将开始扣除您账户上的电量。</p></li> -->
        </ul>
      </div>
      <button class="btn" @click="skip('selectChargeType','chargeMode/')">确认并充电</button>
      <button class="btn cancel" @click="skip('chooseParking','')">不是我的车，我要重选车位</button>
    </div>
  </div>
</template>
<script>
import utils from "@/utils/index";

export default {
  data() {
    return {
      id: "",
      insert: false,
      confirmInsert: false,
      confirm: '',
      timer: '',
      info: [
        {
          id: '',
          parking: '',
          address: '',
          insert: false,
        }
      ]
    };
  },
  computed: {
  
  },
  onShow() {
    console.log("timer",utils.wxGetStorage("timer"))
    if(this.confirmInsert == false || this.confirm == false){
      // utils.removeStorageSync("beforeTime")  //test
      // wx.removeStorageSync('beforeTime');
      //若未插枪或取消充电到期时间未创建，此时创建到期时间戳
      if(utils.wxGetStorage("beforeTime") != false){    //已创建
        console.log("timer",utils.wxGetStorage("beforeTime")+1*60*1000)   //到期时间戳 5分钟
        if(utils.wxGetStorage("beforeTime")+1*60*1000 > Date.parse(new Date()) ){    //若到期时间戳大于当前时间戳才执行倒计时，否则倒计时置0
          var timeout = utils.wxGetStorage("beforeTime")+1*60*1000
          this.timer = setInterval(() => {  //倒计时
            // console.log(timeout - Date.parse(new Date()))   //结束时间减当前时间的时间戳   获得倒计时毫秒数
            let count = timeout - Date.parse(new Date())
            if(count <= 0){
              clearInterval(this.timer)
              // wx.removeStorageSync('beforeTime');
              console.log("countqingchu")
            }
            this.ToTime(count)
            console.log(this.ToTime(count))
          },1000)
        }else{
          let count = 0
          this.ToTime(count)
          console.log(this.ToTime(count))
        }
      }else{    //未创建
        utils.wxSetStorageSync("beforeTime",Date.parse(new Date()))       
      }
    }else{ //插枪或取消充电后清除倒计时
      clearInterval(this.timer)
      wx.removeStorageSync('beforeTime');
      console.log(this.confirm)
    }
  },
  onLoad() {
    //console.log("this.$root.$mp.query",this.$root.$mp.query)
    this.id = this.$root.$mp.query.id
  },
  updated() {
    //console.log(this.confirm)
    if(this.confirm == true || this.insert == true){
      clearInterval(this.timer)
      wx.removeStorageSync('beforeTime');
    }
  },
  mounted() {
    var that = this
    // setTimeout(() =>{
    //   this.insert = true
    // },3000)
  },
  components: {

  },
  methods: {
    ToTime(timestamp) {
      // console.log(timestamp)   
      var m = parseInt(timestamp / (60 * 1000));
      var s = (timestamp % (1000 * 60) / 1000)
      return m + "分" + s + "秒";
    },
    skip(params,type) {
      if(type == ''){
        this.confirm = true  //为true时为确认取消充电
        this.insert = true  //为true时为插入电枪
      }
      if(type == 'chargeMode/'){
        this.confirmInsert = true  //为true时为确认充电
      }
      // wx.redirectTo({
      //   url: "/pages/search/" + type + params + "/main?id=" + this.id
      // })
    }
  },
  watch: {},

};
</script>

<style scoped lang="scss">
@import "../../../../static/assets/scss/search/opened/index.scss";

</style>
