<template>
  <div id="index">
    <div class="img_box"><img src="/static/img/cut/ic_right.png" alt=""></div>
    <div class="section">
      <h3 class="title">退款成功</h3>
      <p class="content">您已成功退款<span class="price">{{price}}</span>元</p>
      <p class="content">您当前的账户余额为<span class="price">{{form.balance}}</span>元</p>
      <p class="content">到账查询，请打开微信：我-钱包-零钱-零钱明细</p>
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
    this.price = parseFloat(this.$root.$mp.query.price).toFixed(2)
    var that = this
    setTimeout(() =>{
      getUcCenter({
      }).then(res=>{
        that.form = res.data.data
        that.form.balance = parseFloat(that.form.balance).toFixed(2)
        console.log("this.price",this.price,"that.form.balance",that.form.balance)
      })
    },2000)
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
