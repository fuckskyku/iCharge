<template>
  <div id="index" class="container">
    <map 
      id="map" 
      :scale="scale"
      :latitude="form.lat"
      :longitude="form.lng"
      :controls="controls" 
      @controltap="controltap" 
      @end="regionchange"
      :markers="markers" 
      @markertap="markertap" 
      @regionchange="regionchange"
      show-location 
      style="width: 100%; height: 100%;">    
      <cover-view class="navigation">
        <!-- <cover-view style="height:60rpx;width:100%;"></cover-view>  -->
        <cover-view class=" weui-cells weui-cells_after-title">
          <cover-view class="weui-cell" @click="skip('stationDetails')">
            <!-- <cover-view class="weui-cell__hd">
                <cover-image :src="form.coverImg==''?'https://testapi.xmnewlife.com/car/images/cut/site_icon.png':form.coverImg" class="wh60" style="width:60px; height: 60px;"/>
            </cover-view> -->
            <cover-view class="weui-cell__bd h120">
              <cover-view style="" class="title">{{form.name}}</cover-view> 
              <cover-view class="" >
                <cover-image src="https://testapi.xmnewlife.com/car/images/cut/ic_address.png" style="width:8px; height: 10px;" class="font13 wh10"/>
                <cover-view class="font13 address" title="123" style="">{{form.address}}</cover-view>
              </cover-view>
            </cover-view>
            <!-- <div class="weui-cell__fd">  
              <div><img src="https://testapi.xmnewlife.com/car/images/cut/site_icon.png" style="width:10px; height: 10px;">adasd</div>
            </div> -->
          </cover-view>
          <!-- 边框 -->
          <cover-view class="weui-cell" style="padding: 0 0 0 30rpx;">
            <cover-view class="weui-cell__bd" style="height:1px;background:#E5E5E5;">
            </cover-view>
          </cover-view>
          <!--  -->
          <cover-view class="weui-cell">
            <cover-view class="weui-cell__hd" style="position:relative;top:-2rpx">
                <cover-image src="https://testapi.xmnewlife.com/car/images/cut/ic_charge.png" style="width:10px; height: 10px;"/>
            </cover-view>
            <cover-view class="weui-cell__bd font13">
              <cover-view style="margin:0rpx 4rpx 0 0;display:inline-block;vertical-align:middle;position:relative;top:0rpx">共</cover-view>
              <cover-view class="font13" style="margin: 0 4rpx 6rpx 0;display:inline-block;vertical-align:middle;position:relative;top:4rpx">{{form.trickleChargeTotal + form.fastChargeTotal}}</cover-view> 
              <cover-view class="font13">根充电枪</cover-view> 
              <cover-view style="color:#FFC000;margin: 0 4rpx 0 12rpx;" class="font13">{{form.fastChargeLeft + form.trickleChargeLeft}}</cover-view> 
              <cover-view class="font13">根闲置中</cover-view> 
            </cover-view>
            <cover-view class="weui-cell__fd">  
              <cover-view class="distance font13">
                <cover-image src="https://testapi.xmnewlife.com/car/images/cut/ic_navigation3.png" class="font13" style="width:10px; height: 10px;"/>
                <cover-view class="font13">{{form.distance }}</cover-view><cover-view class="font13">{{distance < 1000 ? 'm' : 'km'}}</cover-view>
              </cover-view>
            </cover-view>
          </cover-view>
        </cover-view>
        
      </cover-view>
      <!-- 导航 -->
      <cover-view class="go gps" @click="gps=true"><cover-image src="https://testapi.xmnewlife.com/car/images/cut/go.png" class="beidou"/></cover-view>
      <cover-view class="dialog" v-if="gps == true" @click="gps=false">
        <cover-view class="dialog_warp" style="">
          <cover-view class="tip" style="pading: 52rpx;">您将打开手机地图APP导航去这个充电桩！</cover-view>
          <cover-view class="into" @click="moveToLocation(latitude,longitude)" style="">进入导航</cover-view>
        </cover-view>   
      </cover-view>
    </map>
  </div>
</template>

<script>
import utils from "@/utils/index";
import { getStationtInfo } from "@/api/api";

export default {
  data() {
    return {
      id: "",
      gps: false,
      mapCtx: "",
      distance: '',
      //地图属性
      latitude: '',
      longitude: '',
      scale: 14,
      //地图标记
      markers: [],
      controls: [
        {
          id: 2,
          iconPath: '/static/img/location.png',
          position: {
            left: 10,
            top: wx.getSystemInfoSync().windowHeight - 180,
            width: 45,
            height: 45
          },
          clickable: true
        },
      ],
      form: {}
    };
  },

  components: {
    
  },
  onShow() {
    this.$root.$mp.query.id != undefined ? this.id = this.$root.$mp.query.id : this.id = ''
    this.init()
    //使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('map')
    this.getStationtInfoFun()
    setTimeout(()=>{
      
    },200)
  },
  onLoad() {
    
  },
  methods: {
    getStationtInfoFun() {
      var that = this
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success (res) {
          utils.wxSetStorageSync("currLatitude",res.latitude)
          utils.wxSetStorageSync("currLongitude",res.longitude)
          getStationtInfo({
            stationId: that.id,
            // lat: res.latitude,
            // lng: res.longitude
            lat: utils.wxGetStorage("currLatitude"),
            lng: utils.wxGetStorage("currLongitude")
          }).then(res=>{
            that.form = res.data.data
            that.latitude = that.form.lat
            that.longitude = that.form.lng
            // console.log('that.form',that.form,"form.lat",that.latitude,"form.lng",that.longitude)
            wx.setNavigationBarTitle({
              title: that.form.name
            })
            that.distance = res.data.data.distance 
            if(that.distance >= 1000){
              that.form.distance = (that.form.distance/1000).toFixed(2)
            }else{
              that.form.distance = that.form.distance.toFixed(2)
            }
            that.markers.push({
              iconPath: "/static/img/cut/ic_location2_click.png",
              id: that.form.stationId,
              latitude: that.form.lat,
              longitude: that.form.lng,
              width: 33,
              height: 41,
            })
            
          })
        }
      })
      
      //end
      
    },
    init() {
      //初始化标记点
      this.markers = []
      this.form = {}
    },
    
    //视野发生变化时触发
    regionchange(e) {
      var that = this
      if(e.type == "end"){
        //do something
      }
    },
    moveToLocation(latitude,longitude) {
      var that = this
      wx.openLocation({
        latitude,
        longitude,
        scale: 18,
        name: that.form.staName,   //地址标题
        address: that.form.staAdress,  //详细地址
      })
    },
    //地图上显示控件
    controltap(e) {
      wx.createMapContext('map').moveToLocation()
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
        url: "/pages/" + type + "/main?id=" + this.id
      });
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
  },

  created () {
    //获取当前地理位置
    this.getLocation()
    //初始化
    this.init()
    //获取地图上下文
    this.mapCtx = wx.createMapContext("map");   
  },
  mounted() {
    
    if(this.id != ''){
      //检索marker标记点
      this.markers.map((item,index)=>{
        if(this.id == item.id){
          item.iconPath = '/static/img/cut/ic_location2_click.png'
        }
      })
      
    }else{
      this.form = {}
    }
  }
};
</script>

<style lang="scss">
@import "../../../../static/assets/scss/search/navigate/index.scss";


</style>
