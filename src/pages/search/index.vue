<template>
  <div id="index" class="index">
    <div class="container">
      <div class="weui-cells weui-cells_after-title" v-for="(item,index) in tableData" :key="index">      
        <div class="weui-cell" @click="skip('navigate',item.staId)">
            <div class="weui-cell__hd">
                <img :src="item.coverImg==''?icon:item.coverImg" style="width:40px; height: 40px;">
            </div>
            <div class="weui-cell__bd">
              <div class="title">{{item.staName}}</div>
              <div><img src="/static/img/cut/ic_address.png" style="width:8px; height: 10px;" class="icon">{{item.staAdress}}</div>
            </div>
            <!-- <div class="weui-cell__fd">  
              <div><img src="/static/img/cut/site_icon.png" style="width:10px; height: 10px;">adasd</div>
            </div> -->
        </div>
        <div class="weui-cell">
            <div class="weui-cell__hd">
                <img src="/static/img/cut/ic_charge.png" style="width:10px; height: 10px; margin-top: -10rpx;" class="icon">
            </div>
            <div class="weui-cell__bd">共<span>{{item.totalClient}}</span> 根充电桩<span style="color:#FFC000;margin-left:20rpx;">{{item.freeClient}}</span> 根闲置中</div>
            <div class="weui-cell__fd">  
              <div class="distance">
                <img src="/static/img/cut/ic_navigation3.png" class="icon" style="width:10px; height: 10px;">
                <span>{{item.distance}}</span>km
              </div>
            </div>
        </div>
      </div>
      <!-- item end -->
      <view class="weui-loadmore loadmore">
        <view class="tips">没有更多了</view>
        <div class="line pl"></div>
        <div class="line pr"></div>
      </view> 
    </div> 
  </div>
</template>
<script>
import utils from "@/utils/index";
import { geStationtList } from "@/api/api";

export default {
  data() {
    return {
      latitude: '',
      longitude: '',
      icon: "/static/img/cut/site_icon.png",
      tableData: [
        { 
          id: 1,
          title: "咪师加油站附属充电桩",
          icon: "/static/img/cut/site_icon.png",
          address: '厦门市湖里区安岭路987号高新技术园汇...',
          distance: '1.47',
          total: "2333",
          inIdle: "3"
        },
        {
          id: 2,
          title: "睿通加油站附属充电桩",
          icon: "/static/img/cut/site_icon.png",
          address: '厦门市湖里区安岭路987号高新技术园汇...',
          distance: '10.47',
          total: "1222",
          inIdle: "23"
        },
        {
          id: 3,
          title: "鹭景加油站附属充电桩",
          icon: "/static/img/cut/site_icon.png",
          address: '厦门市湖里区安岭路987号高新技术园汇...',
          distance: '2.33',
          total: "3444",
          inIdle: "53"
        },
      ]
    };
  },
  computed: {
  
  },
  onShow() {
    var that = this
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success(res) {
        that.latitude = res.latitude
        that.longitude = res.longitude
        console.log(that.latitude,res.longitude)
        that.geStationtListFun(that.latitude,that.longitude)
      }
    })
  },
  mounted() {

  },
  components: {

  },
  methods: {
    geStationtListFun(lat,lng) {
      console.log(lat,lng)
      geStationtList({
        distance: 10 * 1000,
        lat: lat,
        lng: lng,
      }).then(res => {
        console.log("geStationtList",res.data)
        if(res.data.code == 200){
          // var msg = `距离指定位置10公里共${res.data.data.totalCount}座充电桩`
          // utils.showDialog(msg)
          this.tableData = res.data.data.list
          this.tableData.map((item) => {
            item.distance = (item.distance/1000).toFixed(2)
          })  
        }
      })
    },
    //页面路由跳转
    skip(type,param) {
      // this.$root.$mp.query = param
      wx.navigateTo({
        url: "/pages/search/" + type + "/main?id=" + param
      });

    },
  
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
  padding: 0 0 40rpx 0;

}
.weui-cells{
  border-top: 20rpx solid #f4f4f4;
  position: static;
  img{
    margin-right: 5px;
    vertical-align: middle;
  }
}
.weui-cells:first-child{
  border-top: 10rpx solid #f4f4f4;
}
.weui-cell__hd{
  
}
.weui-cell__bd{
  font-size: 26rpx;
  color: #666666;
}
.weui-cell__fd{
  font-size: 26rpx;
  font-size:24rpx;

}
.title{
  font-size: 34rpx;
  color: #333;
}
.distance{
  color: #777;
}
.icon{
  margin-top: -6rpx;
}

.weui-loadmore {
  margin:2.5em auto;
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
