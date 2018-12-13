<template>
  <div id="index">
    <div class="stopCharge">
      <view class="weui-cells__title title">您已临时终止了充电，实际充电情况如下：</view>
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell weui-cell_access">
            <div class="weui-cell__bd bd">历史剩余电量</div>
            <div class="weui-cell__ft ft"><span>2333.33</span>度</div>
        </div>
        <div class="weui-cell weui-cell_access" >
          <div class="weui-cell__bd bd">本次实际用电量</div>
          <div class="weui-cell__ft ft"><span>133.33</span>度</div>
        </div>
        <div class="weui-cell weui-cell_access" >
          <div class="weui-cell__bd bd">本次最终消耗电量</div>
          <div class="weui-cell__ft ft tip"><span>131.44</span>度<img src="/static/img/cut/tips_icon.png" alt=""></div>
        </div>
        <div class="weui-cell weui-cell_access" >
          <div class="weui-cell__bd bd">当前剩余电量</div>
          <div class="weui-cell__ft ft"><span>131.73</span>度</div>
        </div>
      </div>
      <div class="subTitle">
        <p>请尽快取走您的爱车</p>
        <p>超过半小时未取走则开始计费</p>
      </div>
      <button class="btn" @click="submit()">确定</button>
      <button class="btn nav" @click="navigation(longitude,latitude)">导航去取车</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: "",
      longitude: "118.2223105431",    //经度
      latitude: "24.7053898741",     //纬度
      address: "福建省厦门市同安区洪塘镇苏店村小古宅",
      name: "古宅小卖部"
    };
  },
  computed: {
  
  },
  onLoad () {
    console.log("this.$root.$mp.query",this.$root.$mp.query)
    this.id = this.$root.$mp.query.id
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
    submit() {
      wx.navigateTo({
        url: "/pages/index/main"
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
.title{
  font-size: 30rpx;
  color: #333333;
  padding: 24rpx 30rpx;
  margin: 0;
}
.bd{
  font-size: 32rpx;
  color: #999;
}
.ft{
  font-size: 32rpx;
  color: #333333;
}
.tip{
  img{
    width: 32rpx;
    height: 32rpx;
    vertical-align: middle;
    margin-top: -4rpx;
    margin-left: 4rpx;
  } 
}
.subTitle{
  color: #14BF6D;
  font-size: 32rpx;
  text-align: center;
  margin: 54rpx 0;
}
.weui-cells:before {
  top: 0;
  border-top: none;
}
.weui-cells:after {
  top: 0;
  border-bottom: none;
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
  margin-top: 98rpx;
}
.nav{
  background: linear-gradient(to right,#FFC000,#FF8A00);
  margin-top: 42rpx;
}
</style>
