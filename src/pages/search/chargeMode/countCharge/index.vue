<template>
  <div id="index">
    <div class="stopCharge">
      <div class="child">
        <view class="weui-cells__title title">{{chargeObj.stopType == 2 ? "您已临时终止了充电，实际充电情况如下：" : chargeObj.stopType == 3 ? "您已意外终止了充电，实际充电情况如下：":chargeObj.stopType == 4 ? "您的剩余余额已经用完，终止了充电，实际充电情况如下：" : ""}}</view>
        <div class="weui-cells weui-cells_after-title">
          <div class="weui-cell weui-cell_access">
            <div class="weui-cell__bd bd">充电时长</div>
            <div class="weui-cell__ft ft"><span>{{chargeObj.chargeTime}}</span></div>
          </div>
          <div class="weui-cell weui-cell_access" >
            <div class="weui-cell__bd bd">本次充入电量</div>
            <div class="weui-cell__ft ft"><span>{{chargeObj.chargeEnergy}}</span>度</div>
          </div>
          <div class="weui-cell weui-cell_access" >
            <div class="weui-cell__bd bd">充电价格</div>
            <!-- <div class="weui-cell__ft ft tip"><span>{{chargeObjEnd.price}}</span>元/度<img src="https://testapi.xmnewlife.com/car/images/cut/tips_icon.png" alt=""></div> -->
            <div class="weui-cell__ft ft tip"><span>{{chargeObj.chargeTimePrice}}</span>元/度</div>
          </div>
          <div class="weui-cell weui-cell_access" >
            <div class="weui-cell__bd bd">总费用</div>
            <div class="weui-cell__ft ft"><span>{{chargeObj.chargeAmount}}</span>元</div>
          </div>
          <div class="weui-cell weui-cell_access" >
            <div class="weui-cell__bd bd">使用优惠券</div>
            <div class="weui-cell__ft ft"><span>{{chargeObj.couponPrice}}</span>元</div>
          </div>
          <div class="weui-cell weui-cell_access" >
            <div class="weui-cell__bd bd">需要支付</div>
            <div class="weui-cell__ft ft"><span>{{chargeObj.actualAmount}}</span>元</div>
          </div>
        </div>
        <div class="subTitle">
          <p> <img src="https://testapi.xmnewlife.com/car/images/cut/recharge_end/ic_address2.png" alt=""> 您的爱车目前停留在</p>
          <p>{{chargeObj.address}}停车场{{chargeObj.lotCode}}号车位。</p>
        </div>
        <div class="subTitle_tip">请尽快取走您的爱车超过半小时未取走则开始收取停车费</div>
        <button class="btn" @click="submit()">朕知道了</button>
        <button class="btn nav" @click="navigation(chargeObj.lng,chargeObj.lat)">导航去取车</button>
      </div>
      
    </div>
  </div>
</template>
<script>
import utils from "@/utils/index";
import NumberAnimate from "@/utils/numberAnimate";
import { login,sendNoTokenSms } from '@/api/api'  
import { mapState, mapActions } from 'vuex'
import { getClientInfo, getChargeLog, getUcCenter, getchargespendlogdetail } from '@/api/api'

export default {
  data() {
    return {
      id: "",
      form: {},
      chargeObjEnd: {},
      chargeObj: {},
      longitude: "118.2223105431",    //经度
      latitude: "24.7053898741",     //纬度
      address: "",
      name: "",
      stopType: '0'                  //状态说明  0：手动临时结束   1：意外终止充电   2：剩余电量不足
    };
  },
  computed: {
  
  },
  onLoad () {
    console.log("this.$root.$mp.query",this.$root.$mp.query)
    this.id = this.$root.$mp.query.id
    // this.chargeObjEnd = this.$root.$mp.appOptions.query.chargeObjEnd
    // console.log('this.chargeObjEnd',this.chargeObjEnd)
    getChargeLog({
      orderSn: utils.wxGetStorage('chargeInfo').orderSn,
    }).then(res=>{
      if(res.data.code == 200) {
        if(res.data.data != '') {
          this.chargeObj = res.data.data
          if(chargeObj.stopType == 5) {
            wx.reLaunch({
              url: "/pages/search/chargeMode/stopCharge/main"
            });
          }
          this.chargeObj.actualAmount = this.chargeObj.actualAmount.toFixed(4)
          this.chargeObj.chargeTimePrice = this.chargeObj.chargeTimePrice.toFixed(4)
          this.chargeObj.couponPrice = this.chargeObj.couponPrice.toFixed(4)
          this.chargeObj.chargeAmount = this.chargeObj.chargeAmount.toFixed(4)
        }
      }
    })
    // getClientInfo({
    //   id: this.chargeObjEnd.clientId
    // }).then(res =>{
    //   this.form = res.data.data
    //   console.log('this.form',this.form)
    // })
  },
  mounted() {

  },
  components: {

  },
  methods: {
    navigation(longitude,latitude) {
      var that = this
      wx.openLocation({
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        scale: 17,
        address: that.chargeObj.address,
        name: that.chargeObj.stationName
      })
    },
    submit() {
      wx.reLaunch({
        url: "/pages/index/main"
      });
    }
  },
  watch: {

  },
};
</script>

<style scoped lang="scss">
@import "../../../../../static/assets/scss/search/chargeMode/countCharge/index.scss";

</style>
