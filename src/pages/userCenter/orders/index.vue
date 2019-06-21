<template>
  <div id="order" class="order">
    <div class="container">
      <div class="record" v-for="(item,index) in tableData" :key="index" @click="skip('orderDetails',item.id)">
        <div class="title">
          <div class="hd">购买电量</div>
          <div class="bd">+{{item.buyingPower}}度</div>
          <div class="fd">{{item.price}}元</div>
        </div>
        <div class="subTitle">
          <div class="hd">{{item.useTime}}</div>
          <div class="fd ">{{item.createTime}}</div>
        </div>
        <div class="underLine"></div>
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
          id: 1,
          buyingPower: '150',
          price: '103.86',
          useTime: '鹭景充电桩（忙时）',
          createTime: '1510818902',
        },
        {
          id: 2,
          buyingPower: '230',
          price: '233.98',
          useTime: '五缘充电桩（闲时）',
          createTime: '1541451902',
        },
        {
          id: 3,
          buyingPower: '100',
          price: '72.98',
          useTime: '睿通充电桩（忙时）',
          createTime: '1545186893',
        }
      ]
    };
  },
  onShow() {
    this.$root.$mp.query.id != undefined ? this.id = this.$root.$mp.query.id : this.id = ''
  },
  mounted() {
    this.tableData.map((item)=> {
      item.createTime = this.ToTime(item.createTime)
    })
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
@import "../../../../static/assets/scss/userCenter/orders/index.scss";


</style>

