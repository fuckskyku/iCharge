<template>
  <div id="index">
      <div class="flex">
        <div class="logo"><img src="/static/img/hhhh.gif" alt=""></div>
        
        <div class="title">爱充电 1.0.0</div>
        <!-- <p class="sub_title">小手一抖，百元到手</p> -->
      </div>
      <ul class="info">
        <li class="title">咪师（厦门）科技有限公司</li>
        <li class="sub_title">联系我们： 400-5009-2333</li>
      </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {

    };
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
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 274rpx auto 0;
  img{
    width: 220rpx;
    height: 220rpx;
  }
  .title{
    font-size: 36rpx;
  }
  .sub_title{
    font-size: 28rpx;
    color: #999;
    // padding: 10rpx 0 0 0; 
  }
}
.logo{
  border-radius: 10rpx;
  overflow: hidden;
  img{
    vertical-align: middle;
  }
}
.info{
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: 34rpx;
  .title{
    font-size: 36rpx;
  }
  .sub_title{
    font-size: 28rpx;
    color: #999;
    padding: 0rpx 0 74rpx 0; 
  }
}
</style>
