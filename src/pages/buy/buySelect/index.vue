<template>
  <div id="index">
   买电选择
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
    
  },
  watch: {

  },

};
</script>

<style scoped lang="scss">

.title{
  width: 100%;
  font-size: 34rpx;
  color: #B4B4B4;
  text-align: center;
  padding: 100rpx 0;
}
.loading{
  width: 66rpx;
  height: 66rpx;
  margin: 0 auto;
  img{
    width: 100%;
    height: 100%;
    transition: all 0.5s;
    animation-name: rotate;
    animation-duration: 0.5s;
    animation: rotate 0.5s infinite;
  }
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
