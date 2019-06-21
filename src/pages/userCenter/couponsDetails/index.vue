<template>
  <div id="coupons" class="coupons">
    <div class="content parent"> 
      <div class="child">
        <div :class="[recharge,{'charge': form.type != 1}]" :style="form.status == '1' ? 'background: url(https://testapi.xmnewlife.com/car/images/cut/coupons_details/img_d2.png) no-repeat;background-size: 100% 100%;' : form.status == '3' ? 'background: url(https://testapi.xmnewlife.com/car/images/cut/coupons_details/img_d3.png) no-repeat;background-size: 100% 100%;' : ''">
          <div class="hd">
            <div class="price" :style="form.status == '0' ? 'color:#14BF6D;' : 'color:#999999!important;'">￥<span>{{form.price}}</span></div>
            <div class="price_desc">订单金额满{{form.thresholdPrice}}元可用</div>
          </div>
          <div class="fd">
            <!-- <p :style="form.status == '0' && form.type == '1' ? 'padding: 20rpx 86rpx;' : 'padding: 28rpx 86rpx;'" >优惠券编号:<span>{{form.serialNumber}}</span></p> -->
            <p :style="form.status == '0' && form.type == '1' ? 'padding: 26rpx 10rpx 26rpx 86rpx;' : 'padding: 20rpx 10rpx 20rpx 86rpx;'" >优惠券类型:<span>{{form.type == '2' ? '充电券' : form.type == '1' ? '充值券' : form.type == '3' ? '充电券' : '未知类型'}}</span></p>
            <p :style="form.status == '0' && form.type == '1' ? 'padding: 26rpx 10rpx 26rpx 86rpx;' : 'padding: 20rpx 10rpx 20rpx 86rpx;'" >适用桩站: <span>{{form.stationName}}</span></p>
            <p :style="form.status == '0' && form.type == '1' ? 'padding: 26rpx 10rpx 26rpx 86rpx;' : 'padding: 20rpx 10rpx 20rpx 86rpx;'" >领取时间: <span>{{form.createTimestamp}}</span></p>
            <!-- <p :style="form.status == '0' && form.type == '1' ? 'padding: 26rpx 10rpx 26rpx 86rpx;' : 'padding: 20rpx 10rpx 20rpx 86rpx;'" >使用时间: <span class="c_rt">{{form.useEndTimestamp}}</span></p> -->
            <p :style="form.status == '0' && form.type == '1' ? 'padding: 26rpx 10rpx 26rpx 86rpx;' : 'padding: 20rpx 10rpx 20rpx 86rpx;'" v-if="form.useTime == '' && form.status != 3">使用时间: <span class="c_rt">{{form.useStartTimestamp}} 至 {{form.useEndTimestamp}}</span></p>
            <p :style="form.status == '0' && form.type == '1' ? 'padding: 26rpx 10rpx 26rpx 86rpx;' : 'padding: 20rpx 10rpx 20rpx 86rpx;'" v-if="form.useTime != ''">使用时间: <span class="c_rt">{{form.useTime}}</span></p>
            <p :style="form.status == '0' && form.type == '1' ? 'padding: 26rpx 10rpx 26rpx 86rpx;' : 'padding: 20rpx 10rpx 20rpx 86rpx;'" v-if="form.status == 3">过期时间: <span class="c_rt">{{form.useEndTimestamp}}</span></p>
            <button @click="gps()" class="btn" :style="form.status == '0' && form.type == '3' ? 'display:block;margin-top:36rpx;' : 'display:none;'">导航去充电</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import utils from "@/utils/index";
import { mapState, mapActions } from 'vuex'
import { getcoupondetail } from '@/api/api'  

export default {
  data() {
    return {
      id: '',
      type: 1,
      tabs: ["可用优惠券", "已用优惠券","过期优惠券"],
      activeIndex: 0,
      sliderOffset: 0,
      sliderLeft: 0,
      weui: 'weui-navbar__item',
      recharge: 'box',
      form: {}
    };
  },
  onShow() {
    this.$root.$mp.query.id != undefined ? this.id = this.$root.$mp.query.id : this.id = ''
    this.getcoupondetailFun(this.id)
    
  },
  onLoad() {
    
  },
  methods: {
    getcoupondetailFun(id) {
      getcoupondetail({
        id
      }).then(res =>{
        if(res.data.code == 200){
          this.form = res.data.data
          this.form.createTimestamp = this.ToTime(this.form.createTimestamp)
          this.form.useStartTimestamp = this.ToTime(this.form.useStartTimestamp)
          this.form.useEndTimestamp = this.ToTime(this.form.useEndTimestamp)
          this.form.useTime = this.ToTime(this.form.useTime)
        }
      })
    },
    ToTime(timestamp) {
      //时间戳为10位需*1000，时间戳为13位的话不需乘1000 
      timestamp = timestamp + ""
      if(timestamp.length == 10){
        var date = new Date(timestamp * 1000);
      }else if(timestamp.length == 13){
        var date = new Date(timestamp * 1000 / 1000);
      }
      var Y = date.getFullYear() + "-";
      var M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
      var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      var h = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":";
      var s = (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds());
      return Y + M + D + h + m + s;
    },
    ToDate(timestamp) {
      //时间戳为10位需*1000，时间戳为13位的话不需乘1000 
      timestamp = timestamp + ""
      if(timestamp.length == 10){
        var date = new Date(timestamp * 1000);
      }else if(timestamp.length == 13){
        var date = new Date(timestamp * 1000 / 1000);
      }
      var Y = date.getFullYear() + ".";
      var M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + ".";
      var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
      return Y + M + D;
    },
    //页面路由跳转
    skip(type,pramas) {
      wx.navigateTo({
        url: "/pages/userCenter/" + type + "/main?id=" + pramas
      });
    },
    gps() {
      wx.openLocation({
        latitude: Number(this.form.lat),
        longitude: Number(this.form.lng),
        name: this.form.stationName,
        address: this.form.address,
        scale: 18
      })
    }
  },
  computed: {
    
  },
  watch: {
    
  },

};
</script>

<style scoped lang="scss">
@import "../../../../static/assets/scss/userCenter/couponsDetails/index.scss";
.c_rt{
  display: inline-block;
  width: 360rpx;
  height: 80rpx;
  vertical-align: top;
}

</style>

