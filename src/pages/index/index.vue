<template>
  <div id="index" class="container">
    <map 
      id="map" 
      :scale="12"
      :latitude="latitude"
      :longitude="longitude"
      :controls="controls" 
      @controltap="controltap" 
      @end="regionChangeEnd"
      :markers="markers" 
      @markertap="markertap" 
      @regionchange="regionchange"
      show-location 
      @click="showMenu=true;navigation=false;showMenus()"
      style="width: 100%; height: 100%;">
      <!-- 搜一搜 -->
      <cover-view class="place_info_search" v-if="showMenu == true && show == false">
        <cover-view class="search" @click="skip('search')">
          <cover-image class="img_search" src="https://testapi.xmnewlife.com/car/images/cut/ic_search.png" alt="" />
        </cover-view>
      </cover-view>
      <!-- 用户中心 -->
      <cover-view class="place_info_user"  v-if="showMenu == true">
        <cover-view class="userCenter" @click="skip('user')">
          <cover-image class="img_user" src="https://testapi.xmnewlife.com/car/images/cut/ic_user.png" alt="" />
        </cover-view>
      </cover-view>
      
      <!-- 提示 -->
      <cover-view class="dialog" @click="steps()" v-if="tip == true">
        <cover-view class="place_info_btn" v-if="longCome == true">
          <cover-image class="img_back" src="https://testapi.xmnewlife.com/car/images/cut/long_come.png" alt="" />
          <cover-view class="tip_bg"><button @click="skip('search')" class="tip_btn">立刻充</button></cover-view>
        </cover-view> 
        <cover-view class="place_info_btn" v-if="arrive == true">
          <cover-image class="img_back" src="https://testapi.xmnewlife.com/car/images/cut/arrive.png" alt="" />
          <cover-view class="tip_bg"><button @click="skip('search/navigate',id)" class="tip_btn">立刻打开</button></cover-view>
        </cover-view>   
      </cover-view>  
      <!-- 导航详情 -->
      <cover-view class="navigation" v-if="navigation == true">
        <cover-view style="height:60rpx;width:100%;"></cover-view> 
        <cover-view class=" weui-cells weui-cells_after-title">
          <cover-view class="weui-cell" @click="skip('stationDetails',form.stationId)">
            <cover-view class="weui-cell__bd h120">
              <cover-view style="" class="title">
                {{form.name}}
                <cover-image v-if="form.isCoupon == 1" src="/static/img/cut/Coupon_03.png" style="width:16px; height: 16px;margin:-6rpx 0 0 8rpx" class="font13 wh10"></cover-image>  
              </cover-view> 
              <cover-view class="" >
                <cover-view class="font13 address" title="123" style="">{{form.price != '' ? form.price+'元/度起' : "-暂无价格-"}}</cover-view>
                <cover-image v-if="form.isBenefit" src="/static/img/cut/Coupon_07.png" style="width:16px; height: 16px; margin:-4rpx 0 0 16rpx" class="font13 wh10"></cover-image>
                <!--  -->
                <cover-view style="float:right;margin-top:10rpx" class="distance font13">
                  <cover-image src="https://testapi.xmnewlife.com/car/images/cut/ic_navigation3.png" class="font13" style="width:10px; height: 10px;"/>
                  <cover-view class="font13">{{form.distance }}</cover-view><cover-view class="font13">{{distance < 1000 ? 'm' : 'km'}}</cover-view>
                </cover-view>
                <!--  -->
              </cover-view>
            </cover-view>
            
          </cover-view>
          <!-- 边框 -->
          <cover-view class="weui-cell" style="padding: 0 0 0 30rpx;position:relative;left:-15px;width:100%;">
            <cover-view class="weui-cell__bd" style="height:1px;background:#E5E5E5;">
            </cover-view>
          </cover-view>
          <!-- 桩站信息 -->
          <cover-view class="weui-cell">
            <cover-view class="warpper">
              <cover-view class="quick">
                <cover-view class="sta_btn">快充</cover-view>
                <cover-view style="color:#FFCD33;" class="c_text">{{form.fastChargeLeft}}</cover-view><cover-view class="c_text width10"> / </cover-view><cover-view class="c_text">{{form.fastChargeTotal}}</cover-view>
              </cover-view>
              <cover-view style="color:#E5E5E5;height:60rpx;width:2rpx;background:#e6e6e6;"></cover-view>
              <cover-view class="slow">
                <cover-view class="sta_btn">慢充</cover-view>
                <cover-view style="color:#FFCD33;" class="c_text">{{form.trickleChargeLeft }}</cover-view><cover-view class="c_text width10"> / </cover-view><cover-view class="c_text">{{form.trickleChargeTotal}}</cover-view>
              </cover-view>
            </cover-view>
          </cover-view>
        </cover-view>
        <!-- 导航 -->
        <cover-view class="go gps" @click="gps=true"><cover-image src="https://testapi.xmnewlife.com/car/images/cut/go.png" class="go"/></cover-view>
      </cover-view>
      <cover-view class="dialog2" v-if="gps == true" @click="gps=false">
        <cover-view class="dialog_warp" style="">
          <cover-view class="tip" style="pading: 52rpx;">您将打开手机地图APP导航去这个充电桩！</cover-view>
          <cover-view class="into" @click="moveToLocation(form.lat,form.lng)" style="">进入导航</cover-view>
        </cover-view>   
      </cover-view>
      <!-- 优惠券 -->
      <cover-view style="width:100rpx;height:100rpx;position: absolute;right: 30rpx;bottom: 220rpx;" @click="showCoupon()" v-if="coupons2 == true && coupons == false && navigation == false">
        <cover-image src="/static/img/cut/ic_coupon2.png" style="width:100%; height: 100%;vertical-align: middle;"/>
      </cover-view>
      <cover-view class="dialog2" v-if="coupons == true">
        <cover-view class="dialog_box" style="">
          <cover-view class="dialog_box_hd">
            <cover-image src="https://testapi.xmnewlife.com/car/images/cut/img_hand.png" class="img_head"/>
            <cover-image  style="top: 40rpx;" src="/static/img/cut/coupons/ic_close.png" class="close" @click="close()"/>
          </cover-view>
          <cover-view class="dialog_box_fd"  >
              <!-- 充值券 -->
              <cover-view v-if="chargeList!=''" style="margin-bottom: 6rpx;">
                <cover-image v-if="chargeList!=''" src="https://testapi.xmnewlife.com/car/images/cut/img_chongzhi.png" class="img_title"/>
                <cover-view class="warp_hd">
                  <!--  -->
                  <cover-view class="box" v-for="(item,index) in chargeList" :key="index"> 
                    <cover-image src="/static/img/cut/coupons/img_bg2.png" class="img_bg"/>
                    <cover-view class="h_hd">
                      <cover-view class="box_lt">
                        <cover-view class="center"><cover-view style="display:inline-block;vertical-align:middle;">￥</cover-view><cover-view style="display:inline-block;vertical-align:middle;" class="price">{{item.price}}</cover-view></cover-view>
                      </cover-view>
                      <cover-view class="box_rt">
                        <cover-view class="center">
                          <cover-view class="">
                            充值时满{{item.thresholdPrice}}元可用
                          </cover-view>
                          <cover-view class="time">
                            {{item.useStartTime}} ~ {{item.useEndTime}}
                          </cover-view>
                        </cover-view>
                      </cover-view>
                    </cover-view>
                    <cover-view class="h_fd"><cover-image @click="doubleClick(item)" src="https://testapi.xmnewlife.com/car/images/cut/coupons/img_orange.png" class="img_rt"/></cover-view>
                    <!-- <cover-view class="h_fd"><cover-image @click="doubleClick(item)" :src="item.takeStatus == 0 ? '/static/img/cut/coupons/img_orange2.png' : 'https://testapi.xmnewlife.com/car/images/cut/coupons/img_orange.png'" class="img_rt"/></cover-view> -->
                  </cover-view>
                  <!--  -->
                </cover-view>  
              </cover-view>
              <!-- 充电券 -->
              <cover-view style="margin-bottom: 12rpx;" v-if="electroList != ''">
                <cover-image v-if="electroList != ''" src="https://testapi.xmnewlife.com/car/images/cut/img_chongdian.png" class="img_title"/>
                <cover-view class="warp_fd">
                  <cover-view class="box" v-for="(item,index) in electroList" :key="index"> 
                    <cover-image src="/static/img/cut/coupons/img_bg2.png" class="img_bg"/>
                    <cover-view class="h_hd">
                      <cover-view class="box_lt">
                        <cover-view class="center"><cover-view style="display:inline-block;vertical-align:middle;">￥</cover-view><cover-view style="display:inline-block;vertical-align:middle;" class="price">{{item.price}}</cover-view></cover-view>
                      </cover-view>
                      <cover-view class="box_rt">
                        <cover-view class="center">
                          <cover-view class="">
                            充电时满{{item.thresholdPrice}}元可用
                          </cover-view>
                          <cover-view class="time">
                            {{item.useStartTime}} ~ {{item.useEndTime}}
                          </cover-view>
                        </cover-view>
                      </cover-view>
                    </cover-view>
                    <cover-view class="h_fd"><cover-image @click="doubleClick(item)" src="https://testapi.xmnewlife.com/car/images/cut/coupons/img_orange.png" class="img_rt"/></cover-view>
                    <!-- <cover-view class="h_fd"><cover-image @click="doubleClick(item)" :src="item.takeStatus == 0 && token != '' ? '/static/img/cut/coupons/img_orange2.png' : 'https://testapi.xmnewlife.com/car/images/cut/coupons/img_orange.png'" class="img_rt"/></cover-view> -->
                  </cover-view>
                </cover-view>  
              </cover-view>
            </cover-view> 
          </cover-view>
        <!-- 优惠券领取成功消息提示 -->
        <cover-view class="couponsTip_dialog" v-if="receiveCode == 200" style="height:180rpx;">
          <cover-view class="title_tip">
            您已成功领取这张券
          </cover-view>
          <cover-view class="subTitle_tip">
            <cover-view>
              <cover-view style="display:inline;">在</cover-view><cover-view class="light_tip">我的账户—优惠券</cover-view> <cover-view style="display:inline;">中查看</cover-view>
            </cover-view>
            <cover-view style="height:40rpx;">
              <cover-view style="display:inline;">可在</cover-view> <cover-view class="light_tip">{{couType == 1?'充值': '充电'}}</cover-view> <cover-view style="display:inline;">时使用</cover-view>
            </cover-view>
          </cover-view>
        </cover-view>
        <!-- 优惠券领取失败消息提示 -->
        <!-- <cover-view class="couponsTip_dialog cd" v-if="receiveCode != 200 && receiveCode != 0" style="height: 156rpx;"> -->
        <cover-view class="couponsTip_dialog cd" v-if="receiveCode != 200 && receiveCode != 0" style="height: 92rpx !important;width:558rpx;">
          <cover-view class="title_tip">
            {{receiveDesc}}
          </cover-view>
        </cover-view>
      </cover-view>
      <!-- 充电中 -->
      <cover-view class="charging" @click="toCharging()" v-if="token != '' && charging == true">
        <cover-view class="power">
          <cover-image class="charge_bg" src="/static/img/cut/charge_bg.png" alt="" />
          <cover-image class="battery_warp" src="/static/img/cut/ischargeing.png" alt="" />
          <cover-view class="text">
            充电中
          </cover-view>
          <!-- <cover-view class="battery"></cover-view> -->
          <cover-image class="battery" src="/static/img/cut/lighting.png" alt="" />
          <!-- <cover-view class="battery" :animation="animation"></cover-view> -->
        </cover-view>
      </cover-view>
      <!-- 首次引导 -->
      <cover-view class="dialog tip" style="z-index:9999999999999999" @click="steps()" v-if="show == true">
        <cover-view class="tip" style="z-index:9999999999">
          <cover-image class="img_back" src="https://testapi.xmnewlife.com/car/images/cut/img_1.png" alt="" style="margin:130rpx auto 0" />
          <cover-view class="tip_text">一键为您搜附近充电桩最佳方案</cover-view>
          <!-- 首次引导 搜一搜 -->
          <cover-view class="search_warp"><cover-image class="img_search_warp" src="https://testapi.xmnewlife.com/car/images/cut/ic_search.png" alt="" @click="skip('search')" style="z-index:99999999;"/> </cover-view>
        </cover-view>
      </cover-view>
    </map>  
  </div>
</template>

<script>
import utils from "@/utils/index";
import { getStationtList, jumpToTimeData, chargeStatus, getStationtInfo, checkToken, getCouponlistNoToken, getcouponlist, receivecoupon, getPriceList } from "@/api/api";
import { mapState, mapActions } from 'vuex'
var timer = '';

export default {
  data() {
    return {
      id: "",
      receiveCode: '0',
      receiveDesc: '',
      charging:false,
      getSuccess: true,
      getErr: false,
      show: false,   //首次进入的弹窗
      tip: false,   //附近有桩站时的弹窗arrive  30天没来的弹窗longCome
      gps: false,  //导航弹窗
      navigation: false, //控制桩站详情窗口
      step: 1,    //步骤引导
      arrive: false,       //附近有桩站时的提示 
      longCome: false,    //30天没来的提示
      showMenu: true,     //点击标记,地图控件的显示隐藏
      coupons: false,      //控制优惠券弹窗
      coupons2: false,     //优惠券悬浮窗
      couType: "",       
      isRun: true,    //连续点击间隔控制
      mapCtx: "",
      //地图属性
      latitude: '24.5007390705',  //初始化地图中心经纬度
      longitude: '118.1416511536',
      scale: 13,
      lat: '',
      log: '',
      distance: '',
      //地图标记
      markers: [],
      form: {},
      controls: [
        {id: 1,iconPath: '/static/img/position.png', /*地图中心定位*/ position: {left: wx.getSystemInfoSync().windowWidth / 2 - 5.5,top: wx.getSystemInfoSync().windowHeight / 2 - 28,width: 11,height: 28},clickable: false},
        {id: 2,iconPath: '/static/img/location.png',  /*返回原地*/position: {left: 12,top: wx.getSystemInfoSync().windowHeight - 90,width: 50,height: 50},clickable: true},
      ],
      centerLocation: {},
      chargeList: [],
      electroList: []
      //
    };
  },
  components: {
    
  },
  onShow() {   
    this.init()
    var that = this
    //实例化一个动画 
    // var animation = wx.createAnimation({
    //   duration:2500,                 //动画持续时间，单位 ms
    //   timingFunction: 'linear',     //动画的效果
    //   delay: 0,                   //动画延迟时间
    // })
    // this.animation = animation
    // var next = true
    // setInterval(()=>{
    //   if (next) {
    //     //根据需求实现相应的动画
    //     animation.height("28rpx").step({})
    //     next = !next;
    //   } else {
    //     animation.height("0rpx").step({})
    //     next = !next;
    //   }
    //   that.animation = animation.export()
    // },2500)
    //30天未登录提示
    if(utils.wxGetStorage("longTime") == false){//首次登录创建存储30天后的时间毫秒数
      utils.wxSetStorageSync("longTime",Date.parse(new Date()) + 30*24*60*60*1000)
      //console.log('30天后',utils.wxGetStorage("longTime"),'现在',Date.parse(new Date()))
    }else{  //老用户判断30天登录情况
      var timeout = utils.wxGetStorage("longTime");
      // console.log(Date.parse(new Date()))
      //当前时间毫秒数大于存储的时间
      if(Date.parse(new Date()) >= timeout){
        this.tip = true
        this.longCome = true
      }else{
        this.tip = false
        this.longCome = false
      }
      //每次使用更新一次到期时间
      utils.wxSetStorageSync("longTime",Date.parse(new Date()) + 30*24*60*60*1000)
    }
    if(this.token == ''){
      //首次进入判断
      if(this.firstInto == false){
        this.show = false
        this.getCouponlistNoTokenFun(1)
      }else{
        this.show = true
        this.setFirstInto(false)
      }
      // wx.showToast({
      //   title:'您尚未登录，请先登录',
      //   icon:'none',
      //   mask: false,
      //   duration: 3000,
      // });
    }else{
      //首次进入判断
      if(this.firstInto == false){
        this.show = false
        this.getcouponlistFun(1)
      }else{
        this.show = true
        this.setFirstInto(false)
      }
      this.chargeStatusFun()
      
    } 
  },
  methods: {
    ...mapActions([
      'setToKen',
      'setFirstInto',
      'setTimer',
      'setChargeing'
    ]),
    chargeStatusFun() {
      chargeStatus({}).then(res=>{
        if(res.data.code == 200) {
          if(res.data.data != '') {
            utils.wxSetStorageSync("chargeInfo",res.data.data)
            if(res.data.data.status == 1 ) {
              this.charging = true
              this.setChargeing(true)
              utils.wxSetStorageSync("index",true);
              // wx.reLaunch({
              //   url: '/pages/search/chargeMode/chargeing/main'
              // })
            }else{
              // this.charging = true
            }
          }else{
            // wx.reLaunch({
            //   url: '/pages/search/chargeMode/chargeing/main'
            // })
          }
        }else{
          this.charging = false
        }
      })
    },
    receivecouponFun(item) {
      console.log('item',item)
      var that = this
      wx.hideLoading()
      receivecoupon({
        limitNumber: item.limitNumber,
        id: item.id
      }).then(res =>{
        console.log("res领取优惠券",res.data)
        if(utils.wxGetStorage("newCoupons") == true) {
          // this.getcouponlistFun2(0)
        }else{
          this.getcouponlistFun2(0)
        }
        that.receiveCode = res.data.code
        that.receiveDesc = res.data.message
        if(res.data.code != 200) {
          
          
          // utils.showDialog(that.receiveDesc)
        }

      })
    },
    //限制连续点击时间为3s
    doubleClick(item) {
      this.couType = item.type
      if(this.token == ''){
        // wx.showToast({
        //   title:'您尚未登录，请登陆后领取！',
        //   icon:'none',
        //   mask: true,
        //   duration: 3000,
        // });
        wx.navigateTo({
            url: "/pages/loginSelect/main"
          });
        return
      }else{
        var _this = this;
        if(this.isRun){
          this.showCoupons(item);
          this.isRun = false
          setTimeout(()=>{
            this.isRun = true
            this.receiveCode = 0
            this.receiveDesc = ''
          },3000)
        }
      } 
      
    },
    //有token获取新优惠券
    getcouponlistFun(type) {
      var that = this
      getcouponlist({
        autoIndex: type,
        "pageNo": 1,
        "pageSize": 1000
      }).then(res=>{
        // console.log('res.data.data',res.data.data)
        if(res.data.code == 200){
          if(res.data.data != ''){
            // console.log('res.data.data1',res.data.data)
            this.chargeList = res.data.data.generalCharge
            this.chargeList.forEach(item => {
              item.useStartTime = this.ToTime(item.useStartTimestamp)
              item.useEndTime = this.ToTime(item.useEndTimestamp)
            }); 
            this.electroList = res.data.data.generalElectro
            res.data.data.pointElectro.map(item => {
              this.electroList.push(item)
            })
            this.electroList.forEach(item => {
              item.useStartTime = this.ToTime(item.useStartTimestamp)
              item.useEndTime = this.ToTime(item.useEndTimestamp)
            }); 
            if(res.data.data.generalCharge == '' && res.data.data.generalElectro == '' && res.data.data.pointElectro == '') {
              utils.wxSetStorageSync("newCoupons",false)
              this.coupons = false
              console.log("优惠券数据为空时关闭弹窗与悬浮窗")
              this.getcouponlistFun2(0)
            }else{
              utils.wxSetStorageSync("newCoupons",true)
              this.coupons = true
              this.coupons2 = false
            }
            // console.log('this.coupons',this.coupons,"this.coupons2",this.coupons2)
          }else{ //优惠券数据为空时关闭弹窗与悬浮窗
            if(res.data.data.generalCharge == '' && res.data.data.generalElectro == '' && res.data.data.pointElectro == '') {
              this.coupons = false
              //this.getcouponlistFun2(0)
              //console.log("优惠券数据为空时关闭弹窗与悬浮窗")
            }else{
              this.coupons = true
              this.coupons2 = false
            }
          }
        }
        //console.log('this.chargeList',total,count,this.chargeList,"this.electroList",this.electroList)
      })
    },
    getcouponlistFun2(type) {
      var that = this
      getcouponlist({
        autoIndex: type,
        "pageNo": 1,
        "pageSize": 1000
      }).then(res=>{
        // console.log('res.data.data',res.data.data)
        if(res.data.code == 200){
          if(res.data.data != ''){
            // console.log('res.data.data1',res.data.data)
            this.chargeList = res.data.data.generalCharge
            this.chargeList.forEach(item => {
              item.useStartTime = this.ToTime(item.useStartTimestamp)
              item.useEndTime = this.ToTime(item.useEndTimestamp)
            }); 
            this.electroList = res.data.data.generalElectro
            res.data.data.pointElectro.map(item => {
              this.electroList.push(item)
            })
            this.electroList.forEach(item => {
              item.useStartTime = this.ToTime(item.useStartTimestamp)
              item.useEndTime = this.ToTime(item.useEndTimestamp)
            }); 
            if(res.data.data.generalCharge == '' && res.data.data.generalElectro == '' && res.data.data.pointElectro == '') {
              this.coupons = false
              this.coupons2 = false
              console.log("优惠券数据为空时关闭弹窗与悬浮窗")
            }else{
              this.coupons2 = true
            }
          }else{ //优惠券数据为空时关闭弹窗与悬浮窗
            if(res.data.data.generalCharge == '' && res.data.data.generalElectro == '' && res.data.data.pointElectro == '') {
              this.coupons = false
              this.coupons2 = false
              console.log("优惠券数据为空时关闭弹窗与悬浮窗")
            }else{
              this.coupons2 = true
            }
          }
        }
        //console.log('this.chargeList',total,count,this.chargeList,"this.electroList",this.electroList)
      })
    },
    //无token获取新优惠券
    getCouponlistNoTokenFun(type) {
      var that = this
      getCouponlistNoToken({
        autoIndex: type,
        "pageNo": 1,
        "pageSize": 1000
      }).then(res=>{
        if(res.data.code == 200){
          if(res.data.data != ''){
            // console.log('res.data.data1',res.data.data)
            if(res.data.data.generalCharge == '' && res.data.data.generalElectro == '' && res.data.data.pointElectro == '') {
              this.coupons = false
              this.getCouponlistNoTokenFun2(0)
              console.log("getCouponlistNoTokenFun新优惠券数据为空时关闭弹窗")
              utils.wxSetStorageSync("newCoupons",false)
            }else{
              utils.wxSetStorageSync("newCoupons",true)
              this.chargeList = res.data.data.generalCharge
              this.chargeList.forEach(item => {
                item.useStartTime = this.ToTime(item.useStartTimestamp)
                item.useEndTime = this.ToTime(item.useEndTimestamp)
              }); 
              this.electroList = res.data.data.generalElectro
              res.data.data.pointElectro.map(item => {
                this.electroList.push(item)
              })
              this.electroList.forEach(item => {
                item.useStartTime = this.ToTime(item.useStartTimestamp)
                item.useEndTime = this.ToTime(item.useEndTimestamp)
              }); 
              this.coupons = true
              this.coupons2 = false
              console.log("getCouponlistNoTokenFun新优惠券数据不为空时弹窗",this.electroList)
            }
            // console.log('this.coupons',this.coupons,"this.coupons2",this.coupons2)
          }else{ //优惠券数据为空时关闭弹窗与悬浮窗
            this.coupons = false
            // this.getCouponlistNoTokenFun2(0)
            // console.log("新优惠券数据为空时关闭弹窗调用")
          }
        }
        //console.log('this.chargeList',total,count,this.chargeList,"this.electroList",this.electroList)
      })
    },
    getCouponlistNoTokenFun2(type) {
      console.log("getCouponlistNoTokenFun2")
      var that = this
      getCouponlistNoToken({
        autoIndex: type,
        "pageNo": 1,
        "pageSize": 1000
      }).then(res=>{
        // console.log('res.data.data',res.data.data)
        if(res.data.code == 200){
          if(res.data.data != ''){
            // console.log('res.data.data1',res.data.data)
            this.chargeList = res.data.data.generalCharge
            this.chargeList.forEach(item => {
              item.useStartTime = this.ToTime(item.useStartTimestamp)
              item.useEndTime = this.ToTime(item.useEndTimestamp)
            }); 
            this.electroList = res.data.data.generalElectro
            res.data.data.pointElectro.map(item => {
              this.electroList.push(item)
            })
            this.electroList.forEach(item => {
              item.useStartTime = this.ToTime(item.useStartTimestamp)
              item.useEndTime = this.ToTime(item.useEndTimestamp)
            }); 
            if(res.data.data.generalCharge == '' && res.data.data.generalElectro == '' && res.data.data.pointElectro == '') {
              this.coupons = false
              this.coupons2 = false
              console.log("优惠券数据为空时关闭弹窗与悬浮窗")
            }else{
              this.coupons2 = true
            }
            // console.log('this.coupons',this.coupons,"this.coupons2",this.coupons2)
          }else{ //优惠券数据为空时关闭弹窗与悬浮窗
            if(res.data.data.generalCharge == '' && res.data.data.generalElectro == '' && res.data.data.pointElectro == '') {
              this.coupons = false
              this.coupons2 = false
              console.log("优惠券数据为空时关闭弹窗与悬浮窗")
            }else{
              this.coupons2 = true
            }
          }
        }
        //console.log('this.chargeList',total,count,this.chargeList,"this.electroList",this.electroList)
      })
    },
    getStationtInfoFun(id,lat,lng) {
      var that = this
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success(res) {
          getStationtInfo({
          stationId: id,
          // lat,
          // lng
          lat: res.latitude,
          lng: res.longitude
        }).then(res=>{
          that.form = res.data.data
          console.log('this.form',that.form)
          that.distance = res.data.data.distance
          that.form.price = that.form.price.toFixed(4)
          // that.form.price = that.formatnumber(that.form.price,4)
          // if(res.data.data.price != '') {
          //   var price = this.formatnumber(res.data.data.price,4)
          //   console.log(res.data.data.price,'price',price)
          //   // this.$set(that.form, 'electricityPrice', res.data.data.price.toFixed(4))
          // }else{
          //   // this.$set(that.form, 'electricityPrice', '--暂无价格--')
          //   // console.log('price',price)
          // }
          if(that.distance >= 1000){
            that.form.distance = (that.form.distance/1000).toFixed(2)
          }else{
            that.form.distance = that.form.distance.toFixed(2)
          }
          that.lat = that.form.lat
          that.log = that.form.lng
        })
        },
      })
      //end
    },
    getStationtListFun(lat,lng,wolaile) {
      //console.log(lat,lng,wolaile)
      getStationtList({
        distance: 10000 * 1000,
        lat,
        lng,
        // pageSize: 1000
      }).then(res => {
        this.markers = []
        // var msg = ''
        // if(res.data.data == null){
        //   msg = `距离指定位置10公里共0座充电桩`
        // }else{
        //   msg = `距离指定位置10公里共${res.data.data.totalCount}座充电桩`
        // }
        if(res.data.code == 200){
          // wx.showToast({
          //   title: msg,
          //   icon: 'none',
          //   duration: 1000,
          //   mask: false
          // })
          // console.log("新接口",res.data.data)
          var obj = res.data.data
          obj.map((item,index) => {
            this.markers.push({
              iconPath: "/static/img/cut/ic_location.png",
              id: item.stationId,
              width: 33,
              height: 41,
              latitude: item.lat,
              longitude: item.lng,
              distance: item.distance
            })
          })      
          if(wolaile != 0){
            var num = []
            this.markers.map((item,index) =>{
              if(item.distance < 100){
                num.push(item.distance)
                //console.log("daola",item.title)  
              }
            }) 
            //console.log("item.distance",num)
            if(num != []){
              var min = Math.min.apply(Math, num);//取最小距离
              //console.log("min",min)
              this.markers.map((item,index) =>{
                if(item.distance == min){
                  //console.log("我是最近的哈哈哈",item.title)
                  this.id = item.id
                  // this.scale = 18
                  item.iconPath = "/static/img/cut/ic_location2_click.png"
                }
              }) 
            }
          }
        }
        //进入小程序页面时判断当前位置附近是否有桩站
        if (wolaile == 0){
          var num = []
          this.markers.map((item,index) =>{
            if(item.distance < 100){
              num.push(item.distance)
              //console.log("daola",item.title)  
            }
          }) 
          //console.log("item.distance2",num)
          if(num != []){
            var min = Math.min.apply(Math,num);   //取最小距离
            //console.log("min",min)
            this.markers.map((item,index) =>{
              if(item.distance == min){
                //console.log("我是最近的哈哈哈",item.title)
                this.id = item.id
                this.tip = true                   //当前的位置在桩站范围时才弹出      
                this.arrive = true
                item.iconPath = "/static/img/cut/ic_location2.png"
              }
            }) 
          }
          //end
        }        
      })
    },
    init() {
      this.show= false,   //首次进入的弹窗
      this.tip= false,   //附近有桩站时的弹窗arrive  30天没来的弹窗longCome
      this.gps= false,  //导航弹窗
      this.navigation= false, //控制桩站详情窗口
      this.arrive= false,       //附近有桩站时的提示 
      this.longCome= false,    //30天没来的提示
      this.showMenu = true
      var that = this
      //初始化标记点
      let marker = []
      this.markers = marker
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success(res) {
          that.latitude = res.latitude
          that.longitude = res.longitude
          // utils.wxSetStorageSync("currLatitude",res.latitude)
          // utils.wxSetStorageSync("currLongitude",res.longitude)
          that.getStationtListFun(that.latitude,that.longitude,0)
        },
        fail(res) {
          //用户取消授权
          wx.reLaunch({
            url: '/pages/authorization/main'
          })
        }
      })
      
      //使用 wx.createMapContext 获取 map 上下文
      this.mapCtx = wx.createMapContext('map')
    },
    //获取地图中心经纬度
    getCenterLocationFun() {
      var that = this
      let latitude = that.latitude   //该变量保存当前位置纬度
      let longitude = that.longitude //该变量保存当前位置经度
      // let latitude = utils.wxGetStorage('currLatitude');   //该变量保存当前位置纬度
      // let longitude = utils.wxGetStorage('currLongitude'); //该变量保存当前位置经度
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success(res) {
          that.mapCtx.getCenterLocation({
            success: function(res){
              var distance = that.getDistance(res.latitude, res.longitude,latitude, longitude)
              if(res.latitude == that.latitude && res.longitude == that.longitude || distance < 2500){
                return;
              }
              console.log('distance',distance)
              //通过经纬度计算距离 当距离小于2.5公里时,标记点变化
              utils.wxSetStorageSync('currLatitude',res.latitude)
              utils.wxSetStorageSync('currLongitude',res.longitude)
              that.getStationtListFun(res.latitude,res.longitude,"laodi")
              that.latitude = res.latitude
              that.longitude = res.longitude 
              return;
            }
          })
        }
      })
      /* 获取地图中心经纬度end */
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    },
    //视野发生变化时触发
    regionChangeEnd(e) {
      var that = this
      if(e.type == "end"){
        that.getCenterLocationFun()
      }
    },
    //标记点
    markertap(e) {
      this.showMenu = false
      this.navigation = true
      //获取标记点的经纬度
      let latitude = ""
      let longitude = ""
      this.markers.map(item => {
        if(e.mp.markerId != item.id && item.iconPath == "/static/img/cut/ic_location_click.png"){
          item.iconPath = "/static/img/cut/ic_location.png"
        }
        if(e.mp.markerId == item.id ){
          // getPriceList({
          //   staId: item.id
          // }).then(res =>{      
          //   if(res.data.data == null) {
          //     this.$set(that.form, 'electricityPrice', '-暂无价格-')
          //   }
          //   else{
          //     var priceObj = res.data.data.list
          //     priceObj.forEach(item =>{
          //       this.$set(that.form, 'electricityPrice', item.electricityPrice)
          //     })
          //   }
          // })

          

          item.iconPath = "/static/img/cut/ic_location_click.png"
          this.lat = item.latitude
          this.log = item.longitude
          this.getStationtInfoFun(item.id,this.lat,this.log) 
        }
      })
    },
    //地图上显示控件
    controltap(e) {
      if(e.mp.controlId == 1){
      }else if(e.mp.controlId == 2){
        wx.createMapContext('map').moveToLocation()
        var that = this
        wx.getLocation({
          type: 'gcj02', //返回可以用于wx.openLocation的经纬度
          success(res) {
            that.latitude = res.latitude
            that.longitude = res.longitude
            that.getStationtListFun(res.latitude,res.longitude)
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
    skip(type,id) {
      wx.navigateTo({
        url: "/pages/" + type + "/main?id=" + id
      });
    },
    //移动到当前定位点
    moveToLocation(latitude,longitude) {
      //console.log('latitude',latitude,'longitude',longitude)
      var that = this
      wx.openLocation({
        latitude,
        longitude,
        scale: 18,
        name: that.form.name,   //地址标题
        address: that.form.address,  //详细地址
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
      this.show = false
      this.tip = false
      this.arrive = false
      this.longCome = false
      this.getCouponlistNoTokenFun(1)
    },
    ToTime(timestamp) {
      //时间戳为10位需*1000，时间戳为13位的话不需乘1000 
      // console.log(timestamp)
      timestamp = timestamp + ""
      if(timestamp.length == 10){
        var date = new Date(timestamp * 1000);
      }else if(timestamp.length == 13){
        var date = new Date(timestamp * 1000 / 1000);
      }
      var Y = date.getFullYear() + ".";
      var M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + ".";
      var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      var h = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":";
      var s = (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds());
      return Y + M + D;
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
    },
    showMenus() {
      this.markers.map(item => {
        item.iconPath = "/static/img/cut/ic_location.png"
      })
    },
    showCoupons(item) {
      this.receivecouponFun(item)
    },
    showCoupon() {
      // utils.wxSetStorageSync("close","open")
      utils.wxSetStorageSync("newCoupons",false)
      if(this.token != '') {
        this.getcouponlistFun2(0)
      }else{
        this.getCouponlistNoTokenFun2(0)
      }
      this.coupons = true
    },
    toCharging() {
      if(utils.wxGetStorage('chargeInfo').status == 1) {
        this.skip('search/chargeMode/chargeing');
      }else{
        // this.skip('search/chargeMode/countCharge');
        // this.skip('search/chargeMode/chargeing');
      }
    },
    close() {
      var that = this
      that.coupons = false
      that.coupons2 = true 
      // utils.wxSetStorageSync("close","close")
    },
    // 小数点补零  val为初始值 num为保留位数
    formatnumber(value, num){
      var a, b, c, i;
      a = value.toString();
      b = a.indexOf(".");
      c = a.length;
      if (num == 0) {
        if (b != -1) {
          a = a.substring(0, b);
        }
      } else {//如果没有小数点
        if (b == -1) {
          a = a + ".";
          for (i = 1; i <= num; i++) {
            a = a + "0";
          }
        } else {//有小数点，超出位数自动截取，否则补0
          a = a.substring(0, b + num + 1);
          for (i = c; i <= b + num; i++) {
            a = a + "0";
          }
        }
      }
      return a;
    },
    isShow(val,val2) {
      console.log('wxGetStorage',utils.wxGetStorage(val))
      let start = Date.now();
      let stop = utils.wxGetStorage(val);
      if (start - stop > val2) {
        
      } else {
        
      }
    }
  },
  watch: {
    show(val,oval) {
      console.log('val',val,'oval',oval)
      if(val == true){
        this.showMenu = false
      }else{
        this.showMenu = true
      }
    }
  },
  computed: {
    ...mapState(['token','firstInto','timer','chargeing'])
  },
};
</script>

<style lang="scss">
@import "../../../static/assets/scss/index/index.scss";

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