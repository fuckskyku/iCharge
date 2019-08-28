<template>
  <div id="index" class="index">
    <div class="container">
      <div class="record" v-for="(item,index) in tableData" :key="index" @click="skip('energyBalanceDetails',item.staId)">
        <div class="hd">
          鹭景充电站
        </div>
        <div class="bd">
          <div class="bd_l">
            <div class="title">忙时剩余电量</div>
            <div class="subTitle">739.62度</div>
          </div>
          <div class="bd_r">
            <div class="title">闲时剩余电量</div>
            <div class="subTitle">139.62度</div>
          </div> 
        </div>
      </div>
      
    </div>
    <view class="weui-loadmore loadmore">
      <view class="tips">没有更多了</view>
      <div class="line pl"></div>
      <div class="line pr"></div>
    </view>    
  </div>
</template>
<script>
import card from "@/components/card"
export default {
  data() {
    return {
      id: '',
      tableData: [
        {
          staId: 1,
          staName: '鹭景充电站',
          busyEnergy: '239.62',
          idleEnergy: '49.62', 
        },
        {
          staId: 2,
          staName: '天华充电站',
          busyEnergy: '539.62',
          idleEnergy: '34.52', 
        },
        {
          staId: 3,
          staName: '喵喵充电站',
          busyEnergy: '233.98',
          idleEnergy: '32.23', 
        }
      ]
    };
  },
  onShow() {
    
  },
  mounted() {
    this.$root.$mp.query.id != undefined ? this.id = this.$root.$mp.query.id : this.id = ''
  },
  methods: {
    ToTime(timestamp) {
      //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      if(timestamp.length == 10){
        var date = new Date(timestamp * 1000);
      }else if(timestamp.length == 13){
        var date = new Date(timestamp);
      }
      var Y = date.getFullYear() + "-";
      var M = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1 + "-";
      var D = date.getDate() < 10 ? "0" + date.getDate() + " " : date.getDate() + " ";
      var h = date.getHours() < 10 ? "0" + date.getHours() + ":" : date.getHours() + ":";
      var m = date.getMinutes() < 10 ? "0" + date.getMinutes() + ":": date.getMinutes() + ":";
      var s = date.getSeconds() < 10 ? "0" + date.getSeconds(): date.getSeconds();
      return Y + M + D + h + m + s;
    },
    //页面路由跳转
    skip(type,pramas) {
      wx.navigateTo({
        url: "/pages/userCenter/" + type + "/main?id=" + pramas
      });
    },
  },
  computed: {
    
  },
  components: {
    card
  },
  
  watch: {},

};
</script>

<style scoped lang="scss">
@import "../../../../static/assets/scss/userCenter/energyBalance/index.scss";

</style>

