<template>
  <div id="index">
    <div class="img_box"><img src="/static/img/cut/ic_right.png" alt=""></div>
    <div class="section">
      <h3 class="title">支付成功</h3>
      <p class="content">您已成功充值<span class="price">{{price}}</span>元</p>
      <p class="content">您当前的账户余额为<span class="price">{{form.balance}}</span>元</p>
      <p class="content">祝您使用愉快！</p>
    </div>
    <div class="fd">
      <button class="btn" @click="skip('userCenter/accountBalance')">查看订单</button>
      <button class="btn cancel" @click="skip('index')">回到首页</button>
    </div>
  </div>
</template>
<script>
import utils from "@/utils/index";
import { mapState, mapActions } from 'vuex'
import { getUcCenter } from '@/api/api' 

export default {
  data() {
    return {
      price: "",
      form: {}
    };
  },
  computed: {
  
  },
  onLoad () {
    this.price = this.$root.$mp.query.price
    var that = this
    setTimeout(()=>{
      getUcCenter({}).then(res=>{
        that.form = res.data.data
        console.log("充值后的余额",res.data.data)
      }
    )},2000)
  },
  onShow() {
    
  },
  mounted() {
    wx.showToast({
      title: '数据加载中',
      icon: 'loading',
      duration: 3000
    });
  },
  components: {

  },
  methods: {
    //页面路由跳转
    skip(type) {
      wx.redirectTo({
        url: "/pages/" + type + "/main"
      });
    }
  },
  watch: {

  },

};
</script>

<style scoped lang="scss">
@import "../../../../static/assets/scss/pay/paySuccess/index.scss";

</style>
