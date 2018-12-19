<template>
  <div id="index" class="container">
    <map 
      id="map" 
      :scale="14"
      :latitude="form.lat"
      :longitude="form.lng"
      :controls="controls" 
      @controltap="controltap" 
      @end="regionchange"
      @begin="regionchange"
      :markers="markers" 
      @markertap="markertap" 
      @regionchange="regionchange"
      show-location 
      style="width: 100%; height: 100%;">    
      <cover-view class="navigation">
        <cover-view style="height:60rpx;width:100%;"></cover-view> 
        <cover-view class=" weui-cells weui-cells_after-title">
          <cover-view class="weui-cell" @click="skip('search')">
            <cover-view class="weui-cell__hd">
                <cover-image :src="form.coverImg" class="wh60" style="width:60px; height: 60px;"/>
            </cover-view>
            <cover-view class="weui-cell__bd h120">
              <cover-view style="" class="title">{{form.staName}}</cover-view> 
              <cover-view class="" >
                <cover-image src="/static/img/cut/ic_address.png" style="width:8px; height: 10px;" class="font13 wh10"/>
                <cover-view class="font13 address" title="123" style="">{{form.staAdress}}</cover-view>
              </cover-view>
            </cover-view>
            <!-- <div class="weui-cell__fd">  
              <div><img src="/static/img/cut/site_icon.png" style="width:10px; height: 10px;">adasd</div>
            </div> -->
          </cover-view>
          <!-- 边框 -->
          <cover-view class="weui-cell" style="padding: 0 0 0 30rpx;">
            <cover-view class="weui-cell__bd" style="height:1px;background:#E5E5E5;">
            </cover-view>
          </cover-view>
          <!--  -->
          <cover-view class="weui-cell">
            <cover-view class="weui-cell__hd">
                <cover-image src="/static/img/cut/ic_charge.png" style="width:10px; height: 10px;"/>
            </cover-view>
            <cover-view class="weui-cell__bd font13">
              共<cover-view class="font13">{{form.totalClient}}</cover-view> 
              <cover-view class="font13">根充电桩</cover-view> 
              <cover-view style="color:#FFC000;margin-left:20rpx;" class="font13">{{form.freeClient}}</cover-view> 
              <cover-view class="font13">根闲置中</cover-view> 
            </cover-view>
            <cover-view class="weui-cell__fd">  
              <cover-view class="distance font13">
                <cover-image src="/static/img/cut/ic_navigation3.png" class="font13" style="width:10px; height: 10px;"/>
                <cover-view class="font13">{{form.distance / 1000}}</cover-view><cover-view class="font13">km</cover-view>
              </cover-view>
            </cover-view>
          </cover-view>
        </cover-view>
        <!--  -->
        <cover-view class="go gps" @click="gps=true"><cover-image src="/static/img/cut/go.png" class="go"/></cover-view>
      </cover-view>
      <cover-view class="dialog" v-if="gps == true" @click="gps=false">
        <cover-view class="dialog_warp" style="">
          <cover-view class="tip" style="pading: 52rpx;">您将打开手机地图APP导航去这个充电桩！</cover-view>
          <cover-view class="into" @click="moveToLocation" style="">进入导航</cover-view>
        </cover-view>   
      </cover-view>
    </map>
  </div>
</template>

<script>
import utils from "@/utils/index";
import { geStationtInfo } from "@/api/api";

export default {
  data() {
    return {
      id: "",
      gps: false,
      mapCtx: "",
      //地图属性
      latitude: '',
      longitude: '',
      //地图标记
      markers: [],
      polyline: [
        {
          points: [
            {
              longitude: this.latitude,
              latitude: this.latitude
            }, 
            {
              longitude: 118.10824860546873,
              latitude: 24.490206579127232
            }
          ],
          color:"#FF0000DD",
          width: 2,
          dottedLine: true
        }
      ],

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
          left: 10,
          top: wx.getSystemInfoSync().windowHeight - 180,
          width: 45,
          height: 45
        },
        clickable: true
      },
      ],
      //
      tableData: [
        { 
          id: 1,
          title: "咪师加油站附属充电桩",
          coverImg: "/static/img/cut/site_icon.png",
          address: '厦门市湖里区安岭路987号高新技术园汇...',
          distance: '1470',
          totalClient: "2333",
          freeClient: "3"
        }
      ],
      form: {}
    };
  },

  components: {
    
  },
  onShow() {
    this.init()
    //使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('map')
    this.geStationtInfoFun()
    console.log("from",this.form)
    this.latitude = this.form.lat
    this.longitude = this.form.lng
  },
  onLoad() {
    console.log("this.$root.$mp.query",this.$root.$mp.query)
    this.$root.$mp.query.id != undefined ? this.id = this.$root.$mp.query.id : this.id = ''
  },
  methods: {
    geStationtInfoFun() {
      var that = this
      let latitude = '';
      let longitude = '';
      console.log(this.id)
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success (res) {
          utils.wxSetStorageSync("latitude",res.latitude)
          utils.wxSetStorageSync("longitude",res.longitude)
        }
      })
      latitude = utils.wxGetStorage("latitude")
      longitude = utils.wxGetStorage("longitude")
      geStationtInfo({
        id: that.id,
        lat: latitude,
        lng: longitude
      }).then(res=>{
        
        that.form = res.data.data
        this.markers.push({
          iconPath: "/static/img/cut/ic_location2.png",
          id: that.form.staId,
          latitude: that.form.lat,
          longitude: that.form.lng,
          width: 33,
          height: 41,
        })
        console.log('that.form',that.form)
      })
      //end
      
    },
    init() {
      //初始化标记点
      // let marker = [
      //   {
      //     iconPath: "/static/img/cut/ic_location2.png",
      //     id: 1,
      //     latitude: 24.490206579127232,
      //     longitude: 118.10824860546873,
      //     width: 33,
      //     height: 41,
      //   },
      // ]
      this.markers = []
    },
    
    //视野发生变化时触发
    regionchange(e) {
      var that = this
      // console.log("regionchange:",e.type)
      if(e.type == "end"){
        //do something
      }
    },
    //标记点
    markertap(e) {
      var that = this
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success (res) {
          let distance = that.getDistance(res.latitude,res.longitude,form.latitude,form.longitude)
          // if(distance <= 1000){
            wx.navigateTo({
              url: "/pages/search/chooseParking/main?id=" + that.id
            });
          // }else{
          //   that.gps = true
          // }
        }
      })
      
      
      // console.log(e.mp)
      // //获取标记点的经纬度
      // let latitude = ""
      // let longitude = ""
      // this.markers.map(item => {
      //   if(e.mp.markerId == item.id){
      //     console.log(item.id)
      //     latitude = item.latitude
      //     longitude = item.longitude
      //     this.moveToLocation(latitude,longitude)
      //   }
      // })
      
    },
    moveToLocation(latitude,longitude) {
      latitude = 24.490206579127232
      longitude = 118.10824860546873
      wx.openLocation({
        latitude,
        longitude,
        scale: 18,
        name: "这是哪儿",   //地址标题
        address:"不知道阿aaa",  //详细地址
      })
    },
    //地图上显示控件
    controltap(e) {
      console.log(e)
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
        url: "/pages/" + type + "/chooseParking/main?id=" + this.id
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
        console.log(item,this.id)
        if(this.id == item.id){
          item.iconPath = '/static/img/cut/ic_location2.png'
        }
      })
      
    }else{
      this.form = {
          id: 2333,
          title: "库昊加油站附属充电桩",
          icon: "/static/img/cut/site_icon.png",
          address: '厦门市同安区洪塘镇苏店村小古宅里30号',
          distance: '30',
          totalClientClient: "3333",
          freeClient: "33"
        }
    }
  }
};
</script>

<style lang="scss">
.container{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.wh10{
  width:10px; 
  height: 10px;
}
.font13{
  font-size: 26rpx;
  display:inline-block;
  vertical-align: middle;
}
.weui-cells{
  border-top: 1px solid #f4f4f4;
  position: static;
  ._cover-image{
    margin-right: 5px;
    vertical-align: middle;
  }
}
.weui-cell{
  position: static;
}
.weui-cell__bd{
  font-size: 26rpx;
  color: #666666;
}
.h120{
  height: 120rpx;
}
.wh60{
  width: 60rpx;
  height: 60rpx;
}
.weui-cell__fd{
  font-size: 26rpx;
  font-size:24rpx;
}
.title{
  font-size: 40rpx;
  color: #333;
  margin: 10rpx 0;
}
.address{
  margin: 12rpx 0;
}
.distance{
  color: #777;
}
.navigation{
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
}
.line{
  height: 1px;
  background: #666666;
  border-color: #666666;
}
.go{
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
}
.gps{
  position: absolute;
  top: 0rpx;
  right: 40rpx;
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
  .dialog_warp{
    width: 74%;
    height: 290rpx;
    background:#fff;
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    margin:300rpx auto;
    text-align: center;
    border-radius: 10rpx;
  }
  .tip{
    width: 80%;
    padding: 42rpx 0 20rpx 0;
    white-space: normal;
    font-size: 36rpx;
    font-weight: 600;
    font-family: "幼圆";
    margin: 0 auto;
  }
  .into{
    font-size: 44rpx;
    color: #1EC172;
    padding: 46rpx 0;
  }
  
}

</style>
