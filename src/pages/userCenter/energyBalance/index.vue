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
          staName: '咪师充电站',
          busyEnergy: '233.98',
          idleEnergy: '32.23', 
        }
      ]
    };
  },
  onShow() {
    
  },
  mounted() {
    console.log("this.$root.$mp.query",this.$root.$mp.query)
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
.index{
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #f4f4f4;
  overflow: scroll;
}
.container{
  padding: 10rpx 0 40rpx 0;

}
.record{
  background: #ffffff;
  position: relative;
  margin-bottom: 20rpx;
  .hd{
    padding: 24rpx 30rpx 0;
  }
  .bd{
    color: lightblue;//
    padding: 24rpx 0;
    display: flex;
    flex: 2;
    .bd_l{
      width: 100%;
      margin: 0 24rpx;
      background-image: url("http://pic.qiantucdn.com/58pic/28/33/02/94C58PICi94_1024.jpg!qtwebp324"); //http://pic.qiantucdn.com/58pic/27/72/66/57h58PICN7g_1024.jpg!qtwebp324
      background-size: cover;
    }
    .bd_r{
      width: 100%;
      margin: 0 24rpx;
      background: url("http://pic.qiantucdn.com/58pic/27/72/66/57h58PICN7g_1024.jpg!qtwebp324") no-repeat; //
      background-size: cover;
    }
    .title{
      font-size: 32rpx;
    }
    .subTitle{
      font-size: 40rpx;
      text-align: right;
    }
  }
  .bd>div{
    border-radius: 10rpx;
    padding: 20rpx;
  }
  
}


.loadmore{
  position: relative;
  .tips{
    // width: 50%;
    text-align: center;
    margin: 0 auto;
    font-size: 22rpx;
    color: #888888;
  }
  .line{
    width: 100rpx;
    height: 2rpx;
    background: #C7C7C7;  
    position: absolute;
    top: 50%;
  }
  .pl{
    left: 80rpx;
  }
  .pr{
    right: 80rpx;
  }
}

</style>

