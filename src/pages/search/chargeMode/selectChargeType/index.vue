<template>
  <div id="index">
    <div class="title">
      请选择您的充电方式
    </div>
    <div class="section">
      <div class="sel" @click="skip('chargeing')">
        <img src="/static/img/cut/img_6.png" alt="">
        <p>充满为止</p>        
      </div>
      <div class="line"></div>
      <div class="sel" @click="skip('setupCharge')">        
        <img src="/static/img/cut/img_7.png" alt="">
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

.title{
  width: 100%;
  font-size: 36rpx;
  color: #000;
  text-align: center;
  padding: 42rpx 0 0 0;
}
.sel{
  border-radius: 50%;
  margin: 100rpx 180rpx;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  img{
    width: 226rpx;
    height: 226rpx;
  }
}
.line{
  height: 2rpx;
  width: 94%;
  margin: 0 auto;
  background: #E5E5E5;
}

</style>
