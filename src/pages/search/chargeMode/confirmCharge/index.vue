<template>
  <div id="index">
    <!-- <div class="title">爱充电正在为您打开车闸！</div>
    <div class="loading"><img src="/static/img/cut/ic_loading.png" alt=""></div> -->
    <view class="page__hd">
      <!-- <view class="page__title">Loadmore</view> -->
      <view class="page__desc title">爱充电正在为您打开车闸！</view>
    </view>
    <view class="page__bd">
        <view class="weui-loadmore">
            <view class="weui-loading"></view>
            <view class="weui-loadmore__tips"></view>
        </view>
        <view class="weui-loadmore weui-loadmore_line">
            <view class="weui-loadmore__tips weui-loadmore__tips_in-line">暂无数据</view>
        </view>
       
    </view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: "",
      open: false
    };
  },
  computed: {
  
  },
  onLoad () {
    console.log("this.$root.$mp.query",this.$root.$mp.query)
    this.id = this.$root.$mp.query.id
  },
  mounted() {
    setTimeout(() =>{
      this.open = true
    },3000)
    
  },
  components: {

  },
  methods: {
    
  },
  watch: {
    open(v1,v2) {
      if(v1 == true){
        wx.navigateTo({
          url: "/pages/search/opened/main?id=" + this.id
        });
    }
    }
  },

};
</script>

<style scoped lang="scss">

.title{
  width: 100%;
  font-size: 34rpx;
  color: #B4B4B4;
  text-align: center;
  padding: 100rpx 0;
}
.loading{
  width: 66rpx;
  height: 66rpx;
  margin: 0 auto;
  img{
    width: 100%;
    height: 100%;
    transition: all 0.5s;
    animation-name: rotate;
    animation-duration: 0.5s;
    animation: rotate 0.5s infinite;
  }
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
