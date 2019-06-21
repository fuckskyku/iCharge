<template>
  <div id="index" class="index">
    <div class="container">
      <div class="empty" v-if="empty">
        <img src="https://testapi.xmnewlife.com/car/images/cut/img_search.png" alt="">
        <p class="desc">附近10公里范围内没有桩站~</p>
      </div>
      <div class="item" v-for="(item,index) in tableData" :key="index"  @click="skip('stationDetails',item.stationId)" v-if="!empty">
        <div class="hd">
          <div class="lt">
            <img :src="item.coverImg == 0 || item.coverImg == '' ? icon : 'http://upload.mseenet.com' + item.coverImg" alt="">
          </div>
          <div class="rt">
            <p class="title">
              {{item.name}}
              <img src="https://testapi.xmnewlife.com/car/images/cut/Coupon_03.png" class="icon coupon" v-if="item.isCoupon == 1">
              <img src="https://testapi.xmnewlife.com/car/images/cut/Coupon_07.png" class="icon coupon" v-if="item.isSale">
            </p>
            <p class="sub_title" style="padding-left:18rpx;">
              <img src="https://testapi.xmnewlife.com/car/images/cut/ic_address.png" style="width:8px; height: 10px;margin-left:-20rpx;" class="icon">
              {{item.address}}
            </p>
          </div>
        </div>
        <div class="fd">
            <div class="lt">
              <img src="https://testapi.xmnewlife.com/car/images/cut/ic_charge.png" class="icon" style="width:10px; height: 10px;">
              共<span>{{item.chargeGun}}</span> 根充电枪<span style="color:#FFC000;margin-left:20rpx;">{{item.freeGun}}</span>&nbsp;根闲置中
            </div>
            <div class="rt">
              <div class="distance">
                <img src="https://testapi.xmnewlife.com/car/images/cut/ic_navigation3.png" class="icon" style="width:10px; height: 10px;">
                <span>&nbsp;{{item.distance}}</span>{{item.dis < 1000 ? 'm' : 'km'}}
              </div>
            </div>
        </div>
      </div>
      
      <!-- item end -->
      <view class="weui-loadmore loadmore" v-if="!empty">
        <view class="tips">我是有底线的</view>
        <div class="line pl"></div>
        <div class="line pr"></div>
      </view> 
    </div> 
  </div>
</template>
<script>
import utils from "@/utils/index";
import { stationtList } from "@/api/api";

export default {
  data() {
    return {
      latitude: '',
      longitude: '',
      icon: "https://testapi.xmnewlife.com/car/images/cut/site_icon.png",
      tableData: [],
      distance: '',
      empty: false
    };
  },
  computed: {
  
  },
  onShow() {
    var that = this
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success(res) {
        that.latitude = res.latitude
        that.longitude = res.longitude
        that.getStationtListFun(that.latitude,that.longitude)
      }
    })  
  },
  mounted() {

  },
  components: {

  },
  methods: {
    getStationtListFun(lat,lng) {
      stationtList({
        distance: 10000 * 1000, 
        lat: lat,
        lng: lng
      }).then(res => {
        if(res.data.code == 200){
          if(res.data.data != ''){
            this.empty = false
            this.tableData = res.data.data
            this.tableData.map((item) => {
              item.dis = item.distance
              if(item.distance < 1000){
                item.distance = item.distance.toFixed(2)
              }
              if(item.distance >= 1000){
                item.distance = (item.distance/1000).toFixed(2)
              }
            })
          }else{
            this.empty = true
          }
        }
      })
    },
    //页面路由跳转
    skip(type,param) {
      if(type == 'stationDetails') {
        wx.navigateTo({
          url: "/pages/" + type + "/main?id=" + param
        });
      }else{
        wx.navigateTo({
          url: "/pages/search/" + type + "/main?id=" + param
        });
      }
      
    },
  },
  watch: {},

};
</script>

<style scoped lang="scss">
@import "../../../static/assets/scss/search/index.scss";

</style>
