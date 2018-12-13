<template>
  <div id="index">
    <div class="weui-cells weui-cells_after-title" v-for="(item,index) in tableData" :key="index">      
      <div class="weui-cell" @click="skip('navigate',item.id)">
          <div class="weui-cell__hd">
              <img :src="item.icon==null?icon:item.icon" style="width:40px; height: 40px;">
          </div>
          <div class="weui-cell__bd">
            <div class="title">{{item.title}}</div>
            <div><img src="/static/img/cut/ic_address.png" style="width:8px; height: 10px;" class="icon">{{item.address}}</div>
          </div>
          <!-- <div class="weui-cell__fd">  
            <div><img src="/static/img/cut/site_icon.png" style="width:10px; height: 10px;">adasd</div>
          </div> -->
      </div>
      <div class="weui-cell">
          <div class="weui-cell__hd">
              <img src="/static/img/cut/ic_charge.png" style="width:10px; height: 10px; margin-top: -10rpx;" class="icon">
          </div>
          <div class="weui-cell__bd">共<span>{{item.total}}</span> 根充电桩<span style="color:#FFC000;margin-left:20rpx;">{{item.inIdle}}</span> 根闲置中</div>
          <div class="weui-cell__fd">  
            <div class="distance">
              <img src="/static/img/cut/ic_navigation3.png" class="icon" style="width:10px; height: 10px;">
              <span>{{item.distance}}</span>km
            </div>
          </div>
      </div>
    </div>
    <!-- item end -->
  </div>
</template>
<script>
export default {
  data() {
    return {
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
  mounted() {

  },
  components: {

  },
  methods: {
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

.weui-cells{
  border-top: 20rpx solid #f4f4f4;
  position: static;
  img{
    margin-right: 5px;
    vertical-align: middle;
  }
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
</style>
