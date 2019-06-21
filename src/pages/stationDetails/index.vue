<template>
  <div id="index" class="stationDetails parent">
    <div class="child">
      <div class="header">
        <div class="hd flex">
          <p class="title">
            {{stationInfo.address}}
          </p>
          <div class="gps" @click="gps=true">
            导航
          </div>
        </div>
        <div class="bd">
          <img src="https://testapi.xmnewlife.com/car/images/cut/ic_navigation3.png" alt="" style="width:20rpx;height:20rpx;">
          距离{{stationInfo.distance}}{{distance < 1000 ? "米" : "公里" }}
        </div>
        <div class="fd flex"> 
          <div class="quick"><span style="color:#14BF6D">快充：</span>闲<span style="color:#FFCD33">{{stationInfo.fastChargeLeft }}</span>/{{stationInfo.fastChargeTotal }} 总</div>
          <span style="color:#cccccc;">|</span>
          <div class="slow"><span style="color:#14BF6D">慢充：</span>闲<span style="color:#FFCD33">{{stationInfo.trickleChargeLeft }}</span>/{{stationInfo.trickleChargeTotal }} 总</div>
        </div>
      </div>
      <!-- tabs -->
      <div class="section">
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
              <!-- 车位列表 -->
              <view class="weui-tab__content" :hidden="activeIndex != 0">
                <!-- 空空如也 -->
                <div v-if="empty" class="empty">
                  <img src="/static/img/cut/empty.png" alt="">
                  空空如也~
                </div>
                <ul class="item card_content" v-if="!empty">
                  <li v-for="(item,index) in tableData" :key="index" class="parking"  @click="skip('parkDetails',item.gunId,item)" :class="['parking',{'parking_disabled':item.status != 1}]">
                  <!-- <li v-for="(item,index) in tableData" :key="index" class="parking"  @click="skip('parkDetails',item.gunId,item)" :class="['parking',{'parking_disabled':item.status != 1}]"> -->
                    <div class="parkNum parkNum_disabled">{{item.code}}号</div>
                    <div class="park_info park_info_disabled">
                      <div class="left">
                        <p>{{item.chargeType == '1' ? '直流快充' : item.chargeType == '2' ? '交流快充' : item.chargeType == '3' ? '交流慢充' : '未知类型'}}</p>
                        <!-- <p>{{item.chargeInterfaceType}}</p> -->
                        <p>{{item.chargeInterfaceType == 1 ? '国标2011' : item.chargeInterfaceType == '2' ? '国标2015' : item.chargeInterfaceType == '3' ? '特斯拉' : '未知类型'}}</p>
                      </div>
                      <div class="right">
                        <p>{{item.clientPower}}</p>
                        <p class="price">{{item.price}}元</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </view>
              <!-- 电站详情 -->
              <view class="weui-tab__content" :hidden="activeIndex != 1">
                <ul class="section_content">
                  <li>
                    <div class="lt">
                      充电价格
                    </div>
                    <div class="rt">
                      <p>{{form.price}}元/度（含服务费）</p>
                      <p style="color: #999999;">{{form.timePriceDescription}}<span @click="skip('electricChargeIntroduction',stationInfo.stationId)" style="color:#3366FF;" v-if="form.isTimePrice == 1">价格详情</span></p>
                      <p style="color: #999999;">基础电费：{{form.chargePrice}}元/度</p>
                      <p style="color: #999999;">服务费：{{form.servicePrice}}元/度</p>
                    </div>
                    <div class="line"></div>
                  </li>
                  <li>
                    <div class="lt">
                      停车场收费情况
                    </div>
                    <div class="rt">
                      <p>{{form.parkingFee}}</p>
                    </div>
                    <div class="line"></div>
                  </li>
                  <!-- <li>
                    <div class="lt">
                      充电车位停留过久收费
                    </div>
                    <div class="rt">
                      <p>选定车位五分钟不进行充电则扣账户余额；充电完成半小时不开走扣账户余额。</p>
                    </div>
                    <div class="line"></div>
                  </li> -->
                  <li>
                    <div class="lt">
                      现场管理公司
                    </div>
                    <div class="rt">
                      <p>{{form.managers}}</p>
                    </div>
                    <div class="line"></div>
                  </li>
                  <li>
                    <div class="lt">
                      联系电话
                    </div>
                    <div class="rt">
                      <p>{{form.tel}}</p>
                    </div>
                  </li>
                </ul>
              </view>
            </view>
          </view>
        </view>
      </div>
    </div>
    <!-- dialog -->
    <div class="dialog" v-if="gps == true" @click="gps=false">
      <div class="dialog_warp" style="">
        <div class="tip" style="pading: 52rpx;">您将打开手机地图APP导航去这个充电桩！</div>
        <div class="into" @click="moveTo(stationInfo.lat,stationInfo.lng)" style="">进入导航</div>
      </div>   
    </div>
    <!-- 优惠券入口 -->
    <div class="coupons" @click="showCoupon()" v-if="coupons == false && coupons2 == true">
      <img src="/static/img/cut/ic_coupon2.png" alt="">
    </div>
    <!-- 优惠券 -->
    <div class="dialog2" style="z-index:99999999" v-if="coupons == true && coupons2 == false">
      <div class="dialog_box" style="">
        <div class="dialog_box_hd">
          <img src="https://testapi.xmnewlife.com/car/images/cut/img_hand.png" class="img_head"/>
          <img src="/static/img/cut/coupons/ic_close.png" class="close" @click="close()"/>
        </div>
        <div class="dialog_box_fd">
            <!-- 充电券 -->
            <div v-if="electroList!=''" style="margin-bottom: 12rpx;">
              <img v-if="electroList != ''" src="https://testapi.xmnewlife.com/car/images/cut/img_chongdian.png" class="img_title"/>
              <div class="warp_fd">
                <div class="box" v-for="(item,index) in electroList" :key="index"> 
                  <img src="/static/img/cut/coupons/img_bg2.png" class="img_bg"/>
                  <div class="h_hd">
                    <div class="box_lt">
                      <div class="center"><div style="display:inline;">￥</div><div class="price">{{item.price}}</div></div>
                    </div>
                    <div class="box_rt">
                      <div class="center">
                        <div class="">
                          充电时满{{item.thresholdPrice}}元可用
                        </div>
                        <div class="time" style="width:280rpx;">
                          {{item.useStartTime}} ~ {{item.useEndTime}}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="h_fd"><img @click="doubleClick(item)" src="https://testapi.xmnewlife.com/car/images/cut/coupons/img_orange.png" class="img_rt"/></div>
                </div>
              </div>  
            </div>
            
          </div> 
        </div>
      <!-- 优惠券领取成功消息提示 -->
      <div class="couponsTip_dialog" v-if="receiveCode == 200" style="height:180rpx;">
        <!-- <img src="https://testapi.xmnewlife.com/car/images/cut/coupons/img_smile.png" class="img_tip"/> -->
        <div class="title_tip">
          您已成功领取这张券
        </div>
        <div class="subTitle_tip">
          <div style="height:40rpx;">
            <div style="display:inline;">在</div><div class="light_tip">我的账户—优惠券</div> <div style="display:inline;">中查看</div>
          </div>
          <div>
            <div style="display:inline;">可在</div> <div class="light_tip">充电</div> <div style="display:inline;">时使用</div>
          </div>
        </div>
      </div>
      <!-- 优惠券领取失败消息提示 -->
      <!-- <div class="couponsTip_dialog" v-if="receiveCode != 200 && receiveCode != 0" style="height: 240rpx;"> -->
      <div class="couponsTip_dialog" v-if="receiveCode != 200 && receiveCode != 0" style="height: 92rpx;width:566rpx;">
        <!-- <img src="https://testapi.xmnewlife.com/car/images/cut/coupons/img_sad.png" class="img_tip"/> -->
        <div class="title_tip">
          {{receiveDesc}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import utils from "@/utils/index";
import { mapState, mapActions } from 'vuex'
import { getClientList, getStationCouponlist, StationAutoListNoToken, jumpToTruckSpaceDetail, getStationtInfo, stationDetail, getClientInfo, getcouponlist, receivecoupon } from '@/api/api'  
var timer = '';

export default {
  data() {
    return {
      tabs: ["车位列表", "电站详情"],
      activeIndex: 1,
      sliderOffset: 0,
      sliderLeft: 0,
      weui: 'weui-navbar__item',
      empty: false,
      gps: false,
      distance: '',
      id: "",
      current: '-1', //当前选中的车位
      info: [
        {id: '1',checked: false,num: 'FD-001号',disabled: true,style:'disabled'},{id: '2',checked: false,num: 'FD-002号',disabled: false,style:'enabled'},{id: '3',checked: false,num: 'FD-003号',disabled: false,style:'enabled'},{id: '4',checked: false,num: 'FD-004号',disabled: false,style:'enabled'}
      ],
      tableData: [],
      stationInfo: {},
      form: {},
      chargeList: [],
      electroList: [],
      isRun: true,
      receiveCode: '0',
      receiveDesc: '',
      couponsObj: {},
      coupons: false,
      coupons2: false,
      couType: "",       
    };
  },
  computed: {
  
  },
  onLoad() {
    var that = this;
    var sliderWidth = 36; // 需要设置底部slider的宽度，用于计算中间位置
    wx.getSystemInfo({
      success: function(res) {
        that.sliderLeft = (res.windowWidth / that.tabs.length - sliderWidth) / 2,
        that.sliderOffset = res.windowWidth / that.tabs.length * that.activeIndex
      }
    });
  },
  onShow() {
    // console.log("token",this.token)
    
    var that = this
    console.log("stationDetailsQuery",this.$root.$mp.query)
    if(this.$root.$mp.query.id){
      this.id = this.$root.$mp.query.id
    }
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success (res) {
        utils.wxSetStorageSync("currLatitude",res.latitude)
        utils.wxSetStorageSync("currLongitude",res.longitude)
        that.stationDetailFun()
      }
    })
    if(this.activeIndex == 0){
      this.getClientListFun()
    }
    if(this.token != '') {
      that.getcouponlistFun(0)
    }else{
      that.StationAutoListNoTokenFun(0)
    }
  },
  destroyed() {
    console.log("监听页面销毁")
  },
  onHide() {
    clearInterval(timer)
    console.log('yemianyc')
  },
  mounted() {
    this.getClientListFun()
    timer = setInterval(()=>{
      that.getClientListFun()
    },10*60*1000)
  },
  components: {

  },
  methods: {
    ...mapActions([
      'setToKen',
      'setFirstInto'
    ]),
    showCoupons(item) {
      this.receivecouponFun(item)
    },
    showCoupon() {
      this.coupons = true
      this.coupons2 = false
    },
    close() {
      var that = this
      that.coupons = false
      that.coupons2 = true
    },
    //领取优惠券
    receivecouponFun(item) {
      console.log('item',item)
      var that = this
      receivecoupon({
        limitNumber: item.limitNumber,
        id: item.id
      }).then(res =>{
        console.log("res领取优惠券",res.data)
        // this.getcouponlistFun2(0)
        that.receiveCode = res.data.code
        that.receiveDesc = res.data.message
      })
    },
    //优惠券列表
    getcouponlistFun(type) {
      var that = this
      console.log('denglu优惠券')
      getStationCouponlist({
        stationId: this.id,
        "pageNo": 1,
        "pageSize": 1000
      }).then(res=>{
        console.log('denglu优惠券res.data.data',res.data.data)
        if(res.data.code == 200){
          if(res.data.data != '') {
            this.electroList = res.data.data.generalElectro
            res.data.data.pointElectro.map(item => {
              this.electroList.push(item)
            })
            this.electroList.forEach(item => {
              item.useStartTime = this.ToTime(item.useStartTimestamp)
              item.useEndTime = this.ToTime(item.useEndTimestamp)
            }); 
            if(res.data.data.generalElectro == '' && res.data.data.pointElectro == '') {
              that.coupons = false
              that.coupons2 = false
              console.log("优惠券数据为空时关闭弹窗")
            }else if(res.data.data.generalElectro != '' || res.data.data.pointElectro != ''){
              that.coupons = false
              that.coupons2 = true
            }
          }else{//数据为空
            if(res.data.data.generalElectro == '' && res.data.data.pointElectro == '') {
              that.coupons = false
              that.coupons2 = false
              console.log("新优惠券数据为空时关闭弹窗")
            }else if(res.data.data.generalElectro != '' || res.data.data.pointElectro != ''){
              that.coupons = false
              that.coupons2 = true
            }
          }
        }
        //console.log('this.chargeList',total,count,this.chargeList,"this.electroList",this.electroList)
      })
    },
    getcouponlistFun2(type) {
      var that = this
      //console.log('denglu优惠券')
      getStationCouponlist({
        stationId: this.id,
        "pageNo": 1,
        "pageSize": 1000
      }).then(res=>{
        // console.log('res.data.data',res.data.data)
        if(res.data.code == 200){
          console.log('lqdenglu优惠券res.data.data',res.data.data)
          if(res.data.data != '') {
            this.electroList = res.data.data.generalElectro
            res.data.data.pointElectro.map(item => {
              this.electroList.push(item)
            })
            this.electroList.forEach(item => {
              item.useStartTime = this.ToTime(item.useStartTimestamp)
              item.useEndTime = this.ToTime(item.useEndTimestamp)
            }); 
            if(res.data.data.generalElectro == '' && res.data.data.pointElectro == '') {
              that.coupons = false
              that.coupons2 = false
            }
          }
        }
        //console.log('this.chargeList',total,count,this.chargeList,"this.electroList",this.electroList)
      })
    },
    StationAutoListNoTokenFun(type) {
      
      var that = this
      StationAutoListNoToken({
        stationId: this.id,
        "pageNo": 1,
        "pageSize": 1000
      }).then(res=>{
        // console.log('res.data.data',res.data.data)
        if(res.data.code == 200){
          if(res.data.data != '') {
            this.electroList = res.data.data.generalElectro
            res.data.data.pointElectro.map(item => {
              this.electroList.push(item)
            })
            this.electroList.forEach(item => {
              item.useStartTime = this.ToTime(item.useStartTimestamp)
              item.useEndTime = this.ToTime(item.useEndTimestamp)
            }); 
            if(res.data.data.generalElectro == '' && res.data.data.pointElectro == '') {
              this.coupons = false
              this.coupons2 = false
              console.log("优惠券数据为空时关闭弹窗")
            }else{
              this.coupons = false
              this.coupons2 = true
              console.log('StationAutoListNoTokenFun优惠券this.coupons2',this.coupons2)
            }
          }
        }
        //console.log('this.chargeList',total,count,this.chargeList,"this.electroList",this.electroList)
      })
    },
    //限制连续点击时间为3s
    // doubleClick(item) {
    //   var _this = this;
    //   if(this.isRun){
    //     this.showCoupons(item);
    //     this.isRun = false
    //     setTimeout(()=>{
    //       this.isRun = true
    //       this.receiveCode = 0
    //       this.receiveDesc = ''
    //     },3000)
    //   }
    // },
    doubleClick(item) {
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
      }
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
    },
    //时间转换
    ToTime(timestamp) {
      //时间戳为10位需*1000，时间戳为13位的话不需乘1000 
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
    // 获取桩站信息
    stationDetailFun() {
      getStationtInfo({
        stationId: this.id,
        lat: utils.wxGetStorage("currLatitude"),
        lng: utils.wxGetStorage("currLongitude")
      }).then(res =>{
        if(res.data.code == 200) {
          this.stationInfo = res.data.data
          this.distance = res.data.data.distance
          if(this.distance >= 1000){
            this.stationInfo.distance = (this.stationInfo.distance/1000).toFixed(2) 
          }else{
            this.stationInfo.distance = this.stationInfo.distance.toFixed(2) 
          }
          wx.setNavigationBarTitle({
            title: this.stationInfo.name
          })
          wx.setNavigationBarColor({
            frontColor:'#000000',//前景颜色值，包括按钮、标题、状态栏的颜色，仅支持 #ffffff 和 #000000 (微信小程序官方规定)
            backgroundColor:'#ffffff'//背景颜色值，有效值为十六进制颜色
          })
          console.log('this.chargePrice',res.data.data)
        }
      })
      stationDetail({
        id: this.id,
        lat: utils.wxGetStorage("currLatitude"),
        lng: utils.wxGetStorage("currLongitude")
      }).then(res=>{
        if(res.data.code == 200 ){
          this.form = res.data.data
          this.form.price = this.form.price.toFixed(4)
          this.form.chargePrice = this.form.chargePrice.toFixed(4)
          this.form.servicePrice = this.form.servicePrice.toFixed(4)
          // console.log(this.form)
        }
        
      })
    },
    // 车位与电枪信息
    getClientListFun() {
      var that = this
      // console.log("12213",this.id)
      getClientList({
        id: that.id,
        // keyword: this.keyword
      }).then(res=>{
        if(res.data.code == 200){
          if(res.data.data != null){
            that.empty = false
            that.tableData = res.data.data
            console.log("车位与电枪信息",that.tableData)
            var cardObj = {}
            //最低功率或最高功率没有时不显示
            
            if(this.token != "") {
              jumpToTruckSpaceDetail().then(res => {
                if(res.data.code == 200) {
                  cardObj = res.data.data
                }
                console.log('cardObj已选定车位信息',cardObj)
                that.tableData.map((item,index)=>{
                  item.price = item.price.toFixed(4) 
                  if(cardObj.gunId == item.gunId) { //匹配用户当前选中车位取消置灰
                    item.status = 1
                    console.log('cardObj.gunId',cardObj.gunId)
                  }
                  if(item.powerMin  == 0 || item.powerMin  == ''){
                    item.clientPower = item.powerMax  + 'kw'
                  }
                  if(item.powerMax  == 0 || item.powerMax  == '' ){
                    item.clientPower = item.powerMin  + 'kw'
                  }
                  if(item.powerMin  != 0 && item.powerMax  != 0 && item.powerMin  != '' && item.powerMax  != '') {
                    item.clientPower = item.powerMin  + '~' + item.powerMax  + 'kw'
                  }
                })
              })
            }else{
              that.tableData.map((item,index)=>{
                item.price = item.price.toFixed(4) 
                if(item.powerMin  == 0 || item.powerMin  == ''){
                  item.clientPower = item.powerMax  + 'kw'
                }
                if(item.powerMax  == 0 || item.powerMax  == '' ){
                  item.clientPower = item.powerMin  + 'kw'
                }
                if(item.powerMin  != 0 && item.powerMax  != 0 && item.powerMin  != '' && item.powerMax  != '') {
                  item.clientPower = item.powerMin  + '~' + item.powerMax  + 'kw'
                }
              })
            }
            console.log('res.data.data.list',that.tableData)
          }else{
            that.empty = true
            that.tableData = []
            // console.log('res.data.data.list',that.tableData)
          }
        }
      })
      //end
    },
    moveTo(latitude,longitude) {
      wx.openLocation({
        latitude,
        longitude,
        scale: 18,
        address: this.stationInfo.address,
        name: this.stationInfo.name
      })
    },
    //页面路由跳转
    skip(type,params,clientObj) {
      if(clientObj) {
        // console.log('type',type,'params',params,'clientObj',clientObj)
        if(clientObj.status == 1){
          wx.navigateTo({
            url: "/pages/" + type + "/main?id=" + params
          });
          // console.log("this.$root.$mp.appOptions.query.clientObj",this.$root.$mp.appOptions.query.clientObj)
          // if(this.$root.$mp.appOptions.query.clientObj != undefined){
          //   this.$root.$mp.appOptions.query.clientObj = ''
          //   this.$root.$mp.appOptions.query.clientObj = clientObj
          // }else{
          //   this.$root.$mp.appOptions.query.clientObj = clientObj
          // } 
        }else{
          // jumpToTruckSpaceDetail({}).then(res=> {
          //   if(res.data.code == 200) {
          //     wx.navigateTo({
          //       url: "/pages/" + type + "/main?id=" + params
          //     });
          //   }else{
          //     // utils.showDialog('该车位已被占用,')
          //   }
          // })
        }
      }else{
        
        // var queryObj = JSON.stringify([{id:params},{chargePrice:this.form.chargePrice}])
        wx.navigateTo({
          url: "/pages/" + type + "/main?id=" + params + "&chargePrice" + this.form.chargePrice
        });
      }
      
    },
    //tab切换
    tabClick(e) {
      console.log("e",e.currentTarget)
      if(this.activeIndex == 0){
        this.getClientListFun()
      }
      this.sliderOffset = e.currentTarget.offsetLeft
      this.activeIndex = e.currentTarget.id
    }
  },
  watch: {

  },
  computed: {
    ...mapState(['token'])
  },
};
</script>


<style scoped lang="scss">
@import "../../../static/assets/scss/stationDetails/index.scss";


</style>
