<template>
  <div id="index" class="container">
    <map 
      id="map" 
      :scale="14"
      :latitude="latitude"
      :longitude="longitude"
      :controls="controls" 
      @controltap="controltap" 
      @end="regionchange"
      @begin="regionchange"
      :markers="markers" 
      @markertap="markertap" 
      @regionchange="regionchange"
      show-location 
      style="width: 100%; height: 100%;">
      <!-- 搜一搜 -->
      <cover-view class="place_info_search">
        <cover-view class="search" @click="skip('search')">
          <cover-image class="img_search" src="/static/img/cut/ic_search.png" alt="" />
        </cover-view>
      </cover-view>
      <!-- <cover-view class="place_info_search" @click="skip('search')">搜一搜</cover-view> -->
      <!-- 用户中心 -->
      <cover-view class="place_info_user">
        <cover-view class="userCenter" @click="skip('user')">
          <cover-image class="img_user" src="/static/img/cut/ic_user.png" alt="" />
        </cover-view>
      </cover-view>
      <!-- 首次引导 -->
      <cover-view class="dialog tip" @click="steps()" v-if="show == true">
        <cover-view class="tip">
          <cover-image class="img_back" src="/static/img/cut/img_1.png" alt="" />
          <cover-view class="tip_text">《爱充电》是专注于在新能源车主寻找充电桩时提供最佳方案的小程序，并为车主打开充电桩位置上的车闸。</cover-view>
          <cover-view class="tip_text">《爱充电》将结合距离长短、当前使用状态，<cover-view class="light">一键为您搜附近充电桩最佳方案。</cover-view></cover-view>
          <!-- 搜一搜 -->
          <cover-image class="img_search" src="/static/img/cut/ic_search.png" alt="" /> 
        </cover-view>
      </cover-view>
      <!-- 提示 -->
      <cover-view class="dialog" @click="steps()" v-if="tip == true">
        <cover-view class="place_info_btn" v-if="longCome == true">
          <cover-image class="img_back" src="/static/img/cut/long_come.png" alt="" />
          <cover-view class="tip_bg"><button @click="skip('index')" class="tip_btn">立刻充</button></cover-view>
        </cover-view> 
        <cover-view class="place_info_btn" v-if="arrive == true">
          <cover-image class="img_back" src="/static/img/cut/arrive.png" alt="" />
          <cover-view class="tip_bg"><button @click="skip('index')" class="tip_btn">立刻打开</button></cover-view>
          <!-- <cover-view class="tip_bg"><cover-view class="tip_btn" @click="skip('index')">立刻打开</cover-view></cover-view> -->
        </cover-view>   
      </cover-view>  
    
    </map>
      
  </div>
</template>

<script>
import utils from "@/utils/index";

export default {
  data() {
    return {
      show: false,
      tip: false,
      step: 1,
      arrive: false,
      longCome: false,
      mapCtx: "",
      //地图属性
      latitude: '',
      longitude: '',
      lat: '',
      log: '',
      //地图标记
      markers: [],
      controls: [{
        id: 1,
        iconPath: '/static/img/position.png', //地图中心定位
        position: {
          left: wx.getSystemInfoSync().windowWidth / 2 - 5.5,
          top: wx.getSystemInfoSync().windowHeight / 2 - 28,
          width: 11,
          height: 28
        },
        clickable: false
      },
      {
        id: 2,
        iconPath: '/static/img/location.png',
        position: {
          left: wx.getSystemInfoSync().windowWidth - 63,
          top: wx.getSystemInfoSync().windowHeight - 180,
          width: 45,
          height: 45
        },
        clickable: true
      },
      ],
      centerLocation: {}
      //
    };
  },

  components: {
    
  },
  onHide() {
    this.init()
  },
  onReady() {
    //使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('map')
    
  },
 
  methods: {
    init() {
      //初始化标记点
      let marker = [
        {
          iconPath: "/static/img/cut/ic_location.png",
          id: 0,
          latitude: 24.500204093431726,
          longitude: 118.16043366406248,
          width: 33,
          height: 41,
          title: "这是哪儿",
          // label: {
          //   content: "我是气泡label",
          //   color: '#FF0000',
          //   bgColor: "#ffffff",
          //   fontSize: 16,
          //   padding: 10,
          //   display: 'ALWAYS',
          //   borderRadius: 5,
          //   anchorX: 40,
          //   anchorY: 0
          // }
        },
        {
          iconPath: "/static/img/cut/ic_location.png",
          id: 1,
          latitude: 24.490206579127232,
          longitude: 118.10824860546873,
          width: 33,
          height: 41,
          title: "我在哪儿",
          // callout: {
          //   content: "我是气泡",
          //   color: '#FF0000',
          //   bgColor: "#ffffff",
          //   fontSize: 16,
          //   padding: 10,
          //   display: 'ALWAYS',
          //   borderRadius: 5
          // }
        },
      ]
      this.markers = marker
    },
    // //创建地图
    // createMap() {
    //   var qqmapsdk;
    //   var QQMapWX = require("../../utils/qqmap-wx-jssdk.min.js")
    //   var varMarkers = [];
    //   qqmapsdk = new QQMapWX({
    //     key: "AVABZ-EIPWP-7RTDK-L6UQ3-SHYET-V5B6V"
    //   })
    //   qqmapsdk.search({
    //     keyword: '充电桩',
    //     success: function(res) {
    //       console.log(res.status, res.message);
    //     },
    //     fail: function(res) {
    //       console.log(res.status, res.message);
    //     },
    //     complete: function(res) {
    //       console.log(res.status, res.message);
    //     }
    //   })
    // },
    //获取地图中心经纬度
    getCenterLocationFun() {
      var that = this
      this.mapCtx.getCenterLocation({
        success: function(res){
          var distance = that.getDistance(res.latitude, res.longitude, that.lat, that.log)
          if(res.latitude == that.latitude && res.longitude == that.longitude || distance < 1){
            return;
          }
          // console.log('res.latitude',res.latitude,'res.longitude',res.longitude)
          //通过经纬度计算距离 当距离小于1公里时， 标记点变化
          // console.log(distance)
          
          // that.moveToLocation(res.latitude,res.longitude) 
        }
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    },
    //视野发生变化时触发
    regionchange(e) {
      var that = this
      // console.log("regionchange:",e.type)
      if(e.type == "end"){
        this.getCenterLocationFun()
      }
    },
    //标记点
    markertap(e) {
      console.log(e.mp)
      //获取标记点的经纬度
      let latitude = ""
      let longitude = ""
      this.markers.map(item => {
        if(e.mp.markerId == item.id){
          console.log(item.id)
          latitude = item.latitude
          longitude = item.longitude
          // this.moveToLocation(latitude,longitude)
          wx.navigateTo({
            url: "/pages/search/navigate/main?id=" + item.id
          });
        }
      })
    
    },
    //地图上显示控件
    controltap(e) {
      console.log(e)
      if(e.mp.controlId == 1){
        console.log(e.mp.controlId)
      }else if(e.mp.controlId == 2){
        wx.createMapContext('map').moveToLocation()
      }
    },
    //获取当前位置
    getLocation() {
      var that = this;
      //获取当前的地理位置、速度
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success (res) {
          that.latitude = res.latitude
          that.longitude = res.longitude
        }
      })
      //end
    },
    //页面路由跳转
    skip(type) {
      wx.navigateTo({
        url: "/pages/" + type + "/main"
      });
    },
    //移动到当前定位点
    moveToLocation(latitude,longitude) {
      var that = this;
      wx.openLocation({
        latitude,
        longitude,
        scale: 18,
        name: "这是哪儿",   //地址标题
        address:"不知道阿aaa",  //详细地址
      })
    },
    Distance() {

    },
    getDistance(lat1, lng1, lat2, lng2) {
      lat1 = lat1 || 0;
      lng1 = lng1 || 0;
      lat2 = lat2 || 0;
      lng2 = lng2 || 0;
      var rad1 = lat1 * Math.PI / 180.0;
      var rad2 = lat2 * Math.PI / 180.0;
      var a = rad1 - rad2;
      var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
      var r = 6378137;      
      return (r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))).toFixed(0)
    },
    //引导步骤
    steps() {
      // this.step++ 
      // console.log(this.step)
      // if(this.step == 4){
      //   this.show = false
      // }
      this.show = false
      this.tip = false
    }
  },

  created () {
    //获取当前地理位置
    this.getLocation()
    //初始化
    this.init()
    //获取地图上下文
    this.mapCtx = wx.createMapContext("map");   
  }
};
</script>

<style lang="scss">
.place_info_search{
  width: 180rpx;
  height: 180rpx;
  position: fixed;
  background: transparent;
  bottom: 4.05%;
  left: 50%;
  margin-left: -90rpx;
  z-index: 99;
  .search{
    width: 180rpx;
    height: 180rpx;
    line-height: 180rpx;
    // position: fixed;
    // bottom: 4.05%;
    // left: 50%;
    // margin-left: -90rpx;
    // z-index: 99;
    border-radius: 50%;
    text-align: center;
    .img_search{
      width: 180rpx;
      height: 180rpx;
      vertical-align: middle;
    }
  }
}

  
.place_info_user{
  position: absolute;
  bottom: 7.42%;
  right: 4%;
  width: 100rpx;
  height: 100rpx;
  .userCenter{
    width: 100rpx;
    height: 100rpx;
    line-height: 100rpx;
    // position: fixed;
    // bottom: 7.42%;
    // right: 4%;
    // z-index: 99;
    border-radius: 50%;
    .img_user{
      width: 100rpx;
      height: 100rpx;
      margin: 0 auto;
      // vertical-align: middle;
    }
  }
}

page{
  width: 100%;
  height: 100%;
}
.tip{
  text-align: center;
}
.container{
  // position: absolute;
  // top: 0;
  // left: 0;
  width: 100%;
  height: 100%;
}
/*弹出层*/
.dialog{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
  .tip{
    
    .img_search{
      width: 180rpx;
      height: 180rpx;
      // margin: 80rpx auto 0;
      position: fixed;
      bottom: 166rpx;
      left: 50%;
      margin-left: -90rpx;
      z-index: 99;
    }
  }
  .tip_text{
    width: 80%;
    line-height: 50rpx;
    font-size: 32rpx;
    text-align: left;
    text-indent: 2em;
    background: transparent;
    white-space: normal;
    margin: 20rpx auto 0;
    color: #fff;
    .light{
      display: inline;
      color: #FFE416;
    }
  }
  .img_back{
    width: 500rpx;
    margin: 50rpx auto;
  }
  .place_info_btn{
    width: 100%;
    height: 100%;
    
    .img_back{
      width: 648rpx;
      height: 340rpx;
      margin: 140rpx auto 0;
      position: relative;
    }
    .tip_bg{
      width: 648rpx;
      height: 200rpx;
      line-height: 200rpx;
      text-align: center;
      margin: 0 auto;
      background: #fff;
      border-radius: 10rpx;
      margin-top: -10rpx;
      // -webkit-border-radius: 0 0 10rpx 10rpx;
      // -ms-border-radius: 0 0 10rpx 10rpx;
      // -moz-border-radius: 0 0 10rpx 10rpx;
      // border-bottom-left-radius: 10rpx;
      // border-bottom-right-radius: 10rpx;
      .tip_btn{
        width: 520rpx;
        height: 90rpx;
        line-height: 90rpx;
        color: #fff;
        border-radius: 90rpx;
        display: inline-block;
        vertical-align: middle;
        background: #75D672;
        // background: linear-gradient(to right, #75D672 , #14BF6D); /* 标准的语法 */
      }
    }
    
    
  }
  //
  
}
</style>
