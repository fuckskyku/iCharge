<template>
  <div id="coupons" class="coupons parent">
    <!-- tabs -->
    <div class="section child">
      <view class="page__bd">
        <view class="weui-tab">
          <view class="weui-navbar">
              <block v-for="(item,index) in tabs" :key="index">
                  <view :id="index" :class="[weui,{'weui-bar__item_on':activeIndex == index}]" @click="tabClick($event)">
                      <view class="weui-navbar__title">{{item}}</view>
                  </view>
              </block>
              <view class="weui-navbar__slider" v-bind:style="'left:'+sliderLeft+'px; transform: translateX('+sliderOffset+'px);-webkit-transform: translateX('+sliderOffset+'px);'"></view>
          </view>
          <view class="weui-tab__panel">
            <!-- 可用优惠券 -->
            <view class="weui-tab__content" :hidden="activeIndex != 0">
              <div class="content">
                <!-- 空空如也 -->
                <div v-if="empty" class="empty">
                  <img src="/static/img/cut/empty.png" alt="">
                  空空如也~
                </div>
                <div :class="[recharge,{'charge': item.type != 1}]" v-for="(item,index) in tabelData" :key="index" v-if="!empty" @click="skip('couponsDetails',item.id)">
                  <div class="up">
                    <div class="lt">
                      <p>￥<span class="price">{{item.price}}</span>满{{item.thresholdPrice}}元可用</p>
                    </div>
                    <div class="rt">
                      <div class="hd">{{item.typeName}}</div>
                      <div class="fd">{{item.useEndTimestamp}}</div>
                    </div>
                  </div>
                  <div class="down">
                    说明：{{item.type == 1 ? '充值' : '充电'}}券仅在{{item.type == 1 ? '充值' : '充电'}}时使用
                  </div>
                </div>
              </div>
            </view>
            <!-- 已用优惠券 -->
            <view class="weui-tab__content" :hidden="activeIndex != 1">
              <div class="content">
                <!-- 空空如也 -->
                <div v-if="empty" class="empty">
                  <img src="/static/img/cut/empty.png" alt="">
                  空空如也~
                </div>
                <div :class="[recharge,{'charge': item.type != 1 }]"  v-for="(item,index) in tabelData" :key="index" v-if="!empty" @click="skip('couponsDetails',item.id)">
                  <img class="img_mark" src="https://testapi.xmnewlife.com/car/images/cut/coupons/ic_used.png" alt="">
                  <div class="up">
                    <div class="lt" style="color:#999999;">
                      <p>￥<span class="price">{{item.price}}</span>满{{item.thresholdPrice}}元可用</p>
                    </div>
                    <div class="rt">
                      <div class="hd">{{item.typeName}}</div>
                      <div class="fd">{{item.useEndTimestamp}}</div>
                    </div>
                  </div>
                  <div class="down">
                    说明：{{item.type == 1 ? '充值' : '充电'}}券仅在{{item.type == 1 ? '充值' : '充电'}}时使用
                  </div>
                </div>
              </div>
            </view>
            <!-- 过期优惠券 -->
            <view class="weui-tab__content" :hidden="activeIndex != 2">
              <div class="content">
                <!-- 空空如也 -->
                <div v-if="empty" class="empty">
                  <img src="/static/img/cut/empty.png" alt="">
                  空空如也~
                </div>
                <div :class="[recharge,{'charge': item.type != 1}]" v-for="(item,index) in tabelData" :key="index" v-if="!empty" @click="skip('couponsDetails',item.id)">
                  <img class="img_mark" src="https://testapi.xmnewlife.com/car/images/cut/coupons/ic_expired.png" alt="">
                  <div class="up">
                    <div class="lt" style="color:#999999;">
                      <p>￥<span class="price">{{item.price}}</span>满{{item.thresholdPrice}}元可用</p>
                    </div>
                    <div class="rt">
                      <div class="hd">{{item.typeName}}</div>
                      <div class="fd">{{item.useEndTimestamp}}</div>
                    </div>
                  </div>
                  <div class="down">
                    说明：{{item.type == 1 ? '充值' : '充电'}}券仅在{{item.type == 1 ? '充值' : '充电'}}时使用
                  </div>
                </div>
              </div>
            </view>
          </view>
        </view>
      </view>
    </div>
  </div>
</template>
<script>
import utils from "@/utils/index";
import { mapState, mapActions } from 'vuex'
import { getcouponlistbyuser, checkToken } from '@/api/api'  

export default {
  data() {
    return {
      id: '',
      type: 0,
      tabs: ["可用优惠券", "已用优惠券","过期优惠券"],
      activeIndex: 0,
      sliderOffset: 0,
      sliderLeft: 0,
      weui: 'weui-navbar__item',
      tabelData: [],
      empty: false,
      recharge: 'box',
    };
  },
  onShow() {
    this.$root.$mp.query.id != undefined ? this.id = this.$root.$mp.query.id : this.id = ''
    if(this.activeIndex == 0) {
      this.getcouponlistbyuserFun(0)
    }
    if(this.activeIndex == 1) {
      this.getcouponlistbyuserFun(1)
    }
    if(this.activeIndex == 2) {
      this.getcouponlistbyuserFun(2)
    }
  },
  onLoad() {
    var that = this;
    var sliderWidth = 20; // 需要设置底部slider的宽度，用于计算中间位置
    wx.getSystemInfo({
      success: function(res) {
        that.sliderLeft = (res.windowWidth / that.tabs.length - sliderWidth) / 2,
        that.sliderOffset = res.windowWidth / that.tabs.length * that.activeIndex
      }
    });
  },
  methods: {
    //获取我的优惠券列表
    getcouponlistbyuserFun(type) {
      getcouponlistbyuser({
        // status: this.type,
        pageSize: 100,
        pageNo: 1,
        status: type
      }).then(res =>{
        if(res.data.code == 200) {
          if(res.data.data.data != ''){
            this.empty = false
            this.tabelData = res.data.data.data;
            console.log('tabelData',this.tabelData)
            this.tabelData.forEach(item => {
              item.useEndTimestamp = this.ToTime(item.useEndTimestamp)
            });
          }else{
            this.empty = true
          }
        }else{

        }
      })
    },
    ToTime(timestamp) {
      //时间戳为10位需*1000，时间戳为13位的话不需乘1000 
      timestamp = timestamp + ""
      if(timestamp.length == 10){
        var date = new Date(timestamp * 1000000 / 1000 );
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
    //页面路由跳转
    skip(type,pramas) {
      wx.navigateTo({
        url: "/pages/userCenter/" + type + "/main?id=" + pramas
      });
    },
    //tab切换
    tabClick(e) {
      this.type = parseInt(e.currentTarget.id)
      this.getcouponlistbyuserFun(this.type)
      this.sliderOffset = e.currentTarget.offsetLeft
      this.activeIndex = e.currentTarget.id
    }
  },
  computed: {
    
  },
  watch: {

  },

};
</script>

<style scoped lang="scss">
@import "../../../../static/assets/scss/userCenter/coupons/index.scss";

</style>

