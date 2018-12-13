<template>
  <div id="order" class="order">
    订单信息
  </div>
</template>
<script>
import card from "@/components/card"
export default {
  data() {
    return {
     
    };
  },
  onLaunch() {

  },
  created() {
    
  },
  methods: {
    //页面路由跳转
    skip(type) {
      wx.navigateTo({
        url: "/pages/" + type + "/main"
      });
    },
  },
  computed: {
    
  },
  components: {
    card
  },
  
  watch: {},

};
</script>

<style scoped lang="scss">
.order{
  width: 100%;
  height: 100%;
}

</style>

