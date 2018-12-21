<template>
  <div id="index">
    <div class="stopCharge" >
      <div class="info">
        <div class="img" v-if="stopType == 2"><img src="/static/img/cut/img_smile.png" alt=""></div>
        <div class="img" v-if="stopType == 1"><img src="/static/img/cut/img_question.png" alt=""></div>
        <div class="img_charge" v-if="stopType == 0 || stopType == 3 "><img src="/static/img/cut/stop_charge_02.png" alt=""></div>
        <div class="content">
          <div v-if="stopType == 2">您账户中，该时间段的电量已经用完，系统已停止充电，您可买电后继续启动充电。请尽快取走您的爱车，超过半小时未取走则开始计费。</div>
          <div v-if="stopType == 1" class="mg">您已临时终止了充电，具体原因不明，可到现场查看。请尽快取走您的爱车，超过半小时未取走则开始计费。</div>
          <div v-if="stopType == 0 || stopType == 3">已按您的设置为您的爱车充电100度，请尽快将您的爱车取走。超过半小时未取走则开始计费。</div>
        </div>
        <button class="btn cancel" @click="submit()" v-if="stopType == 2">去买电</button>
      </div>
      <div class="footer" :class="[style,{fd:stopType == 0 || stopType == 3}]">
        <button class="btn" @click="submit(stopType)">查看充电情况</button>
        <button class="btn nav" @click="gps=true">导航去取车</button>
      </div>
    </div>
    <div class="dialog" v-if="gps == true" @click="gps=false">
      <div class="dialog_warp" style="">
        <div class="tip" style="pading: 52rpx;">您将打开手机地图APP导航去这个充电桩！</div>
        <div class="into" @click="moveTo(latitude,longitude)" style="">进入导航</div>
      </div>   
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: "",
      longitude: "118.2223105431",                      //经度
      latitude: "24.7053898741",                        //纬度
      address: "福建省厦门市同安区洪塘镇苏店村小古宅",
      name: "古宅小卖部", 
      stopType: 0,
      gps: false,                                   //状态说明  0：充滿正常結束   1：意外终止充电   2：充滿剩余电量不足  3.固定充電
      style: "footer"
    };
  },
  computed: {
  
  },
  onShow() {
    console.log("this.$root.$mp.query",this.$root.$mp.query)
    this.id = this.$root.$mp.query.id 
    if(this.stopType == 1){
      wx.setNavigationBarTitle({
        title: '充电终止'
      })
    }else{
      wx.setNavigationBarTitle({
        title: '爱充电'
      })
    }
  },
  onLoad () {
    
    
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
        address: that.address,
        name: that.name
      })
    },
    moveTo() {
      wx.showModal({
        content: '您确定要现在就停止充电吗？',
        // confirmText: "取消",
        cancelText: "进入导航",
        showCancel: false,
        success: function (res) {
          console.log(res);
          if (res.confirm) {
            this.navigation(longitude,latitude)
            console.log('用户点击主操作')
          }
        }
      });     
    },
    submit(params) {
      wx.navigateTo({
        url: "/pages/search/chargeMode/countCharge/main?type=" + params
      });
    }
  },
  watch: {
    
  },
};
</script>

<style scoped lang="scss">
.stopCharge{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #F4F4F4;
}
.info{
  text-align: center;
  background: #fff;
  overflow: hidden;
  .img{
    width: 300rpx;
    height: 160rpx;
    margin: 70rpx auto 0;
    img{
      width: 100%;
      height: 100%;
      vertical-align: middle;
    }
  }
  .img_charge{
    width: 100%;
    height: 680rpx;
    margin: 0;
    img{
      width: 100%;
      height: 100%;
      vertical-align: middle;
    }
  }
  .content{
    font-size: 30rpx;
    color: #333333;
    padding: 0 30rpx;
    margin: 0;
    text-align: left;
    text-indent: 2em;
    view{
      margin:40rpx auto 50rpx;
    }
  }
}
.footer{
  margin-top: 98rpx;
}
.fd{
  margin-top: 40rpx;
}
.btn{
  width: 520rpx;
  height: 90rpx;
  line-height: 90rpx;
  border-radius: 90rpx;
  border: none;
  outline: none;
  background: linear-gradient(to right,#75D672,#14BF6D);
  color: #ffffff;
  
}
.cancel{
  width: 260rpx;
  border: 1px solid #14BF6D;
  background: #ffffff;
  color:#14BF6D;
  margin: 30rpx auto 54rpx;
}
.nav{
  background: linear-gradient(to right,#FFC000,#FF8A00);
  margin-top: 42rpx;
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
