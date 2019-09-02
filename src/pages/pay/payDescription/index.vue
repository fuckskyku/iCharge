<template>
  <div id="index" class="index">
    <div class="title">充值和退款说明</div>
    <div class="desc">
      <div class="sub_title">
        充电前请先预存金额到您的账户，后续您在《喵喵充电》小程序消费（充电）时，都只能使用账户余额。              
      </div>
      <div class="sub_title" style="margin-top:40rpx">
        预存金额时，<span style="color:#FFC000">多充多送</span>，您在《喵喵充电》消费的金额越多，越有机会得到优惠券，可用于在预充值时抵扣金额。                                         
      </div>
      <div class="sub_title" style="margin-top:40rpx">
        使用了充值优惠券后，如果您对余额申请退款，在退款时，对充值时使用了充值优惠券的部分不予退款，只能进行消费。比如您使用了满100省10的充值优惠券，在支付时，您可以享受10元的优惠金额，只需支付90元，实得100元。申请退款时，这100不支持退款。                                         
      </div>
      <div class="sub_title" style="margin-top:40rpx">
        余额使用原则：优先使用不支持退款的部分。
      </div>
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
    
  },
  watch: {

  },

};
</script>

<style scoped lang="scss">
@import "../../../../static/assets/scss/pay/payDescription/index.scss";

</style>
