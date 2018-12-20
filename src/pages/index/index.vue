<template>
  <div id="index" class="container">
    <map 
      id="map" 
      :scale="13"
      :latitude="latitude"
      :longitude="longitude"
      :controls="controls" 
      subkey="5IQBZ-KXN6S-GQ3OV-6V2ZK-BSYCS-5DFZK"
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
          <cover-view class="tip_bg"><button @click="skip('search/navigate')" class="tip_btn">立刻打开</button></cover-view>
          <!-- <cover-view class="tip_bg"><cover-view class="tip_btn" @click="skip('index')">立刻打开</cover-view></cover-view> -->
        </cover-view>   
      </cover-view>  
      
    </map>
      
  </div>
</template>

<script>
import utils from "@/utils/index";
import { geStationtList } from "@/api/api";

export default {
  data() {
    return {
      id: "",
      show: false,
      tip: false,
      step: 1,
      arrive: false,
      longCome: false,
      mapCtx: "",
      //地图属性
      latitude: '',  //地图中心经纬度
      longitude: '',
      scale: 13,
      lat: '',
      log: '',
      //地图标记
      markers: [],
      form: {},
      controls: [{
          id: 1,
          iconPath: '/static/img/position.png', //地图中心定位
          position: {left: wx.getSystemInfoSync().windowWidth / 2 - 5.5,top: wx.getSystemInfoSync().windowHeight / 2 - 28,width: 11,height: 28},
          clickable: false
        },
        {
          id: 2,
          iconPath: '/static/img/location.png',
          position: {left: wx.getSystemInfoSync().windowWidth - 63,top: wx.getSystemInfoSync().windowHeight - 180,width: 45,height: 45},
          clickable: true
        },
      ],
      centerLocation: {}
      //
    };
  },

  components: {
    
  },
  onShow() {
    this.init()
    var that = this
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success(res) {
        that.latitude = res.latitude
        that.longitude = res.longitude
        console.log(that.latitude,res.longitude)
        that.geStationtListFun(that.latitude,that.longitude,undefined)
      }
    })
  },
  methods: {
    geStationtListFun(lat,lng,wolaile) {
      console.log(lat,lng,wolaile)
      geStationtList({
        distance: 10 * 1000,
        lat: lat,
        lng: lng,
      }).then(res => {
        this.markers = []
        console.log("geStationtList",res.data)
        if(res.data.code == 200){
          // var msg = `距离指定位置10公里共${res.data.data.totalCount}座充电桩`
          // utils.showDialog(msg)
          var obj = res.data.data.list
          obj.map((item,index) => {
            this.markers.push({
              iconPath: "/static/img/cut/ic_location.png",
              id: item.staId,
              width: 33,
              height: 41,
              latitude: item.lat,
              longitude: item.lng,
              title: item.staName,
              distance: item.distance
            })
          })      
          if(wolaile != undefined){
            var num = []
            this.markers.map((item,index) =>{
              if(item.distance < 10000){
                num.push(item.distance)
                console.log("daola",item.title)  
              }
            }) 
            console.log("item.distance",num)
            if(num != []){
              var min = Math.min.apply(Math, num);//取最小距离
              console.log("min",min)
              this.markers.map((item,index) =>{
                if(item.distance == min){
                  console.log("我是最近的哈哈哈",item.title)
                  this.id = item.id
                  // this.scale = 18
                  item.iconPath = "/static/img/cut/ic_location2.png"
                }
              }) 
            }
          }
        }
        //进入小程序页面时判断当前位置附近是否有桩站
        if (wolaile == undefined){
          var num = []
          this.markers.map((item,index) =>{
            if(item.distance < 10000){
              num.push(item.distance)
              console.log("daola",item.title)  
            }
          }) 
          console.log("item.distance",num)
          if(num != []){
            var min = Math.min.apply(Math, num);   //取最小距离
            console.log("min",min)
            this.markers.map((item,index) =>{
              if(item.distance == min){
                console.log("我是最近的哈哈哈",item.title)
                this.id = item.id
                this.tip = true                   //当前的位置在桩站范围时才弹出      
                this.arrive = true
                item.iconPath = "/static/img/cut/ic_location2.png"
              }
            }) 
          }
          //end
        }        
        // console.log("this.markers",this.markers)
      })
    },
    init() {
      //初始化标记点
      let marker = [
        {iconPath: "/static/img/cut/ic_location.png",id: 0,latitude: 24.500204093431726,longitude: 118.16043366406248,width: 33,height: 41,title: "这是哪儿",
        },
        {iconPath: "/static/img/cut/ic_location.png",id: 1,latitude: 24.490206579127232,longitude: 118.10824860546873,width: 33,height: 41,title: "我在哪儿",
        },
        {iconPath: "/static/img/cut/ic_location.png",id: 2,latitude: 24.490206579127232,longitude: 118.10824860546873,width: 33,height: 41,title: "我在哪儿",
        }
      ]
      this.markers = marker
      //使用 wx.createMapContext 获取 map 上下文
      this.mapCtx = wx.createMapContext('map')
    },
    
    //获取地图中心经纬度
    getCenterLocationFun() {
      var that = this
      let latitude,longitude;
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success(res) {
          latitude = res.latitude
          longitude = res.longitude
          that.mapCtx.getCenterLocation({
            success: function(res){
              var distance = that.getDistance( latitude, longitude, res.latitude, res.longitude)
              if(res.latitude == that.latitude && res.longitude == that.longitude || distance < 1){
                return;
              }
              console.log('distance',distance)
              // console.log("fdsfsdfsfs",that.latitude,that.longitude)
              // console.log('res.latitude',res.latitude,'res.longitude',res.longitude)
              //通过经纬度计算距离 当距离小于1公里时， 标记点变化
              // console.log(distance)
                  that.latitude = res.latitude
                  that.longitude = res.longitude
                  that.geStationtListFun(res.latitude,res.longitude,"laodi")
                  
              // that.moveToLocation(res.latitude,res.longitude) 
            }
          })
        }
      })
      
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    },
    //视野发生变化时触发
    regionchange(e) {
      var that = this
      
      if(e.type == "end"){
        console.log("regionchange:",e.type)
      
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
          this.lat = item.latitude
          this.log = item.longitude
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
        var that = this
        wx.getLocation({
          type: 'gcj02', //返回可以用于wx.openLocation的经纬度
          success(res) {
            that.latitude = res.latitude
            that.longitude = res.longitude
            that.geStationtListFun(res.latitude,res.longitude)
          }
        })
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
      console.log(this.id,2333)
      wx.navigateTo({
        url: "/pages/" + type + "/main?id=" + this.id
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
      this.arrive = false
      this.longCome = false
    },
    //百度转腾讯地图经纬度
    bMapTransQQMap(lng,lat){        
      let x_pi = 3.14159265358979324 * 3000.0 / 180.0;        
      let x = lng - 0.0065;        
      let y = lat - 0.006;        
      let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);        
      let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);        
      let lngs = z * Math.cos(theta);        
      let lats = z * Math.sin(theta);        
      return {lng: lngs,lat: lats} 
    }
  },

  created () {
    //获取当前地理位置
    // this.getLocation()
    //初始化
    // this.init()
    // //获取地图上下文
    // this.mapCtx = wx.createMapContext("map");   
  },
  mounted() {
    
    
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
/*
                        ::
                      :;J7, :,                        ::;7:
                      ,ivYi, ,                       ;LLLFS:
                      :iv7Yi                       :7ri;j5PL
                     ,:ivYLvr                    ,ivrrirrY2X,
                     :;r@Wwz.7r:                :ivu@kexianli.
                    :iL7::,:::iiirii:ii;::::,,irvF7rvvLujL7ur
                   ri::,:,::i:iiiiiii:i:irrv177JX7rYXqZEkvv17
                ;i:, , ::::iirrririi:i:::iiir2XXvii;L8OGJr71i
              :,, ,,:   ,::ir@mingyi.irii:i:::j1jri7ZBOS7ivv,
                 ,::,    ::rv77iiiriii:iii:i::,rvLq@huhao.Li
             ,,      ,, ,:ir7ir::,:::i;ir:::i:i::rSGGYri712:
           :::  ,v7r:: ::rrv77:, ,, ,:i7rrii:::::, ir7ri7Lri
          ,     神兽保佑iiir;r::        ,永无BUG::,, ,iv7Luur:
        ,,     i78MBBi,:,:::,:,  :7FSL: ,iriii:::i::,,:rLqXv::
        :      iuMMP: :,:::,:ii;2GY7OBB0viiii:i:iii:i:::iJqL;::
       ,     ::::i   ,,,,, ::LuBBu BBBBBErii:i:i:i:i:i:i:r77ii
      ,       :       , ,,:::rruBZ1MBBqi, :,,,:::,::::::iiriri:
     ,               ,,,,::::i:  @arqiao.       ,:,, ,:::ii;i7:
    :,       rjujLYLi   ,,:::::,:::::::::,,   ,:i,:,,,,,::i:iii
    ::      BBBBBBBBB0,    ,,::: , ,:::::: ,      ,,,, ,,:::::::
    i,  ,  ,8BMMBBBBBBi     ,,:,,     ,,, , ,   , , , :,::ii::i::
    :      iZMOMOMBBM2::::::::::,,,,     ,,,,,,:,,,::::i:irr:i:::,
    i   ,,:;u0MBMOG1L:::i::::::  ,,,::,   ,,, ::::::i:i:iirii:i:i:
    :    ,iuUuuXUkFu7i:iii:i:::, :,:,: ::::::::i:i:::::iirr7iiri::
    :     :rk@Yizero.i:::::, ,:ii:::::::i:::::i::,::::iirrriiiri::,
     :      5BMBBBBBBSr:,::rv2kuii:::iii::,:i:,, , ,,:,:i@petermu.,
          , :r50EZ8MBBBBGOBBBZP7::::i::,:::::,: :,:,::i;rrririiii::
              :jujYY7LS0ujJL7r::,::i::,::::::::::::::iirirrrrrrr:ii:
           ,:  :@kevensun.:,:,,,::::i:i:::::,,::::::iir;ii;7v77;ii;i,
           ,,,     ,,:,::::::i:iiiii:i::::,, ::::iiiir@xingjief.r;7:i,
        , , ,,,:,,::::::::iiiiiiiiii:,:,:::::::::iiir;ri7vL77rrirri::
         :,, , ::::::::i:::i:::i:i::,,,,,:,::i:i:::iir;@Secbone.ii:::
*/