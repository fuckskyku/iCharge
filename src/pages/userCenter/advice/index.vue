<template>
  <div id="index">
    <view class="page__hd">
      <div class="page__title">意见反馈</div>   
    </view>
    <view class="page__bd">
      <div class="flex">
      <div>时间</div>
      <div>内容</div>
    </div>
    </view>
    <view class="page__fd">
      <!-- 按钮 -->
      <div class="weui-btn-area">
        <button class="weui-btn" type="primary" href="javascript:">提交意见</button>
      </div>
    </view>
    
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
  
  },
  mounted() {

  },
  components: {

  },
  methods: {
    
  
  },
  watch: {},

};
</script>

<style scoped lang="scss">
.flex{
  width: 80%;
  height: 500rpx;
  display: flex;
  flex: 1;
  // flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 40rpx auto 0;
  img{
    width: 120rpx;
    height: 180rpx;
  }
  .sub_title{
    font-size: 28rpx;
    color: #999;
    padding: 40rpx 0;
  }
}
</style>
