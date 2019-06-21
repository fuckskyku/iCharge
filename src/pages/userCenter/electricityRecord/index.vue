<template>
  <div id="index">
    <div class="container">
      <div class="section">
        <div class="record" v-for="(item,index) in tableData" :key="index" @click="skip('electricityRecordDetails',item.id)">
          <div class="hd">
            <div class="top">使用电量</div>
            <div class="down">{{item.address}}({{item.status}})</div>
          </div>
          <div class="fd">
            <div class="top">-{{item.useEnergy}}度</div>
            <div class="down">{{item.createdTime}}</div>
            </div>
        </div>
      </div>
      <div class="footer">
        <view class="weui-loadmore loadmore">
          <view class="tips">没有更多了</view>
          <div class="line pl"></div>
          <div class="line pr"></div>
        </view>   
      </div>
    </div>
    
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: "",
      open: false,
      tableData: [],
      form: {}
    };
  },
  computed: {
  
  },
  onLoad() {
    this.id = this.$root.$mp.query.id
  },
  mounted() {
    this.tableData = [
      {
        id: '1',
        useEnergy: 155,
        createdTime: '1434014790',
        address: "睿通充电桩",
        status: '闲时'
      },
      {
        id: '2',
        useEnergy: 233,
        createdTime: '1546275661',
        address: "五缘充电桩",
        status: '忙时'
      },
      {
        id: '3',
        useEnergy: 999,
        createdTime: '1541005261',
        address: "怪兽充电桩",
        status: '闲时'
      },
      {
        id: '4',
        useEnergy: 666,
        createdTime: '1545670861',
        address: "金州充电桩",
        status: '闲时'
      },
      {
        id: '5',
        useEnergy: 888,
        createdTime: '1545747925',
        address: "搞起充电桩",
        status: '闲时'
      },

    ];
    this.tableData.map((item,index) =>{
      item.createdTime = this.ToTime(item.createdTime)
    })
  },
  components: {

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
      var M =(date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
      var D = (date.getDate() < 10 ? "0" + date.getDate() + " ": date.getDate() + " ")
      var h = (date.getHours() < 10 ? "0" + date.getHours() + ":": date.getHours() + ":")
      var m = (date.getMinutes() < 10 ? "0" + date.getMinutes() + ":": date.getMinutes() + ":")
      var s = (date.getSeconds() < 10 ? "0" + date.getSeconds(): date.getSeconds())
      return Y + M + D + h + m + s;
    },
    //页面路由跳转
    skip(type,pramas) {
      wx.navigateTo({
        url: "/pages/userCenter/" + type + "/main?id=" + pramas
      });
           
    },
  },
  watch: {

  },

};
</script>

<style scoped lang="scss">
@import "../../../../static/assets/scss/userCenter/electricityRecord/index.scss";

</style>
