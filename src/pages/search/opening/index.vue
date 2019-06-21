<template>
  <div id="index">
    <!-- <div class="title">爱充电正在为您打开车闸！</div>
    <div class="loading"><img src="https://testapi.xmnewlife.com/car/images/cut/ic_loading.gif" alt=""></div> -->
    <view class="page__hd">
      <view class="page__desc title">爱充电正在为您打开车闸！</view>
    </view>
    <view class="page__bd">
      <view class="weui-loadmore">
        <!-- <view class="weui-loading"></view>
        <view class="weui-loadmore__tips"></view> -->
        <div class="loading"><img src="https://testapi.xmnewlife.com/car/images/cut/ic_loading.gif" alt=""></div>
      </view>
      <view class="weui-loadmore weui-loadmore_line">
        <view class="weui-loadmore__tips weui-loadmore__tips_in-line">空空如也</view>
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
    this.init()
  },
  onShow() {
    if(this.open == true){
      wx.navigateTo({
        url: "/pages/search/opened/main?id=" + this.id
      });
    }else{
      // setTimeout(() =>{
      //   this.open = true
      //   console.log(111)
      // },3000)
    }
  },
  mounted() {
   
    
  },
  components: {

  },
  methods: {
    init() {
      this.open = false
    }
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
@import "../../../../static/assets/scss/search/opening/index.scss";

</style>
