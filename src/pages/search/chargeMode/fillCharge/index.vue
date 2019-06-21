<template>
  <div id="index">
    <div class="stopCharge">
      <view class="weui-cells__title title">{{accident == true ? "您已意外终止了充电，实际充电情况如下：" : "您的剩余电量已经用完，终止了充电，实际充电情况如下："}}</view>
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
          <div class="weui-cell__ft ft tip"><span>131.44</span>度<img src="https://testapi.xmnewlife.com/car/images/cut/tips_icon.png" alt=""></div>
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
      name: "古宅小卖部",
      accident: true
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
      wx.reLaunch({
        url: "/pages/index/main"
      });
    }
  },
  watch: {

  },
};
</script>

<style scoped lang="scss">
@import "../../../../../static/assets/scss/search/chargeMode/fillCharge/index.scss";

</style>
