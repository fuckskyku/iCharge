<template>
  <div id="index" class="page">
    <!-- 插入充电枪后的提示 -->
    <div>
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
export default {
  data() {
    return {
      id: "",
      insert: false,
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
  onLoad () {
    console.log("this.$root.$mp.query",this.$root.$mp.query)
    this.id = this.$root.$mp.query.id
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
    skip(params,type) {
      wx.redirectTo({
        url: "/pages/search/" + type + params + "/main?id=" + this.id
      })
    }
  },
  watch: {},

};
</script>

<style scoped lang="scss">
@import "../../../../static/assets/scss/search/openedInsert/index.scss";

</style>
