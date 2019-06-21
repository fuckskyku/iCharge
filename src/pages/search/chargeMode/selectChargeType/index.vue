<template>
  <div id="index">
    <div class="title">
      请选择您的充电方式
    </div>
    <div class="section">
      <div class="sel" @click="skip('chargeing')">
        <img src="https://testapi.xmnewlife.com/car/images/cut/img_6.png" alt="">
        <p>充满为止</p>        
      </div>
      <div class="line"></div>
      <div class="sel" @click="skip('setupCharge')">        
        <img src="https://testapi.xmnewlife.com/car/images/cut/img_7.png" alt="">
        <p>充固定电量</p>
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
    console.log("this.$root.$mp.query",this.$root.$mp.query)
    this.id = this.$root.$mp.query.id
  },
  mounted() {
    
  },
  components: {

  },
  methods: {
    skip(params) {
      wx.redirectTo({
        url: "/pages/search/chargeMode/" + params + "/main?id=" + this.id
      })
    }
  },
  watch: {

  },

};
</script>

<style scoped lang="scss">
@import "../../../../../static/assets/scss/search/chargeMode/selectChargeType/index.scss";


</style>
