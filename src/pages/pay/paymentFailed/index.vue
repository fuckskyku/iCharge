<template>
  <div id="index">
    <div class="img_box"><img src="/static/img/cut/ic_wrong.png" alt=""></div>
    <div class="section">
      <h3 class="title">支付失败</h3>
      <p class="content">请重试！</p>
    </div>
    <div class="fd">
      <button class="btn" @click="skipTo('pay')">重试</button>
      <!-- <button class="btn cancel" @click="skip('userCenter/accountBalance')">查看订单</button> -->
    </div>
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
    this.id = this.$root.$mp.query.id
  },
  mounted() {
    
  },
  components: {

  },
  methods: {
    skip(type) {
      wx.navigateTo({
        url: "/pages/" + type + "/main"
      });
    },
    skipTo(type,params) {
      
      wx.navigateBack({
        delta: 1
      })
    }
  },
  watch: {

  },

};
</script>

<style scoped lang="scss">
@import "../../../../static/assets/scss/pay/paymentFailed/index.scss";

</style>
