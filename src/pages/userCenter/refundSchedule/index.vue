<template>
  <div id="index" class="refundSchedule">
    <div class="header">
      <icon class="icon" type="success" size="40" />
      <p class="title">您的退款申请提交成功</p>
    </div>
    <div class="content">
      <div class="list">
        <div class="lt">退款金额</div>
        <div class="rt">0.00元</div>
      </div>
      <div class="list">
        <div class="lt">退款方式</div>
        <div class="rt">微信</div>
      </div>
      <div class="list">
        <div class="lt">收款账号</div>
        <div class="rt">12345648</div>
      </div>
    </div>
    <div class="desc">
      <div class="list">
        <div class="lt">到账查询</div>
      </div>
      <div class="list">
        <div class="lt">微信：<span>我-钱包-零钱-零钱明细</span></div>
      </div>
    </div>
    <button class="btn" @click="skip('user')">我知道了</button>
  </div>
</template>
<script>
import utils from "@/utils/index";
import { mapState, mapActions } from 'vuex'
import { getUcCenter } from '@/api/api'  

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
    skip(type,params) {
      wx.navigateTo({
        url: "/pages/" + type + "/main"
      });
    },
  
  },
  computed: {
    ...mapState(['token'])
  },
  watch: {},

};
</script>

<style scoped lang="scss">
@import "../../../../static/assets/scss/userCenter/refundSchedule/index.scss";

</style>
