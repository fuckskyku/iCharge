<template>
  <div id="index">
    <!-- <div class="title">爱充电正在为您打开车闸！</div>
    <div class="loading"><img src="https://testapi.xmnewlife.com/car/images/cut/ic_loading.png" alt=""></div> -->
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
@import "../../../../../static/assets/scss/search/chargeMode/confirmCharge/index.scss";

</style>
