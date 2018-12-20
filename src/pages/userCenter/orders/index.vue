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
    console.log("this.$root.$mp.query",this.$root.$mp.query)
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
.order{
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
  .title{
    display: flex;
    flex: 3;
    padding: 30rpx;
    .hd{
      font-size: 34rpx;
      color: #333333;
      text-align: left;
      width: 100%;
    }
    .bd{
      color: #FFC000;
      font-size: 36rpx;
      text-align: center;
      width: 100%;
    }
    .fd{
      width: 100%;
      font-size: 34rpx;
      color: #333333;
      text-align: right;
    }
  }
  .subTitle{
    display: flex;
    flex: 2;
    padding: 0 30rpx 30rpx;
    font-size: 24rpx;
    color: #666666;
    .hd{
      width: 100%;
      text-align: left;
    }
    .fd{
      width: 100%;
      text-align: right;
    }
  }
  .underLine{
    width: 96%;
    height: 2rpx;
    background: #f4f4f4;
    position: absolute;
    right: 0;
    bottom: 0;
  }
  
}
.record:last-child .underLine{
  background: transparent;
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

