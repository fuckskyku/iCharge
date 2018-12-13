<template>
    <div id="scope">
        <img v-for="(item,index) in zong" :key="index" :src="(index<scope)?sel:nor">
    </div>
</template>
<!-- 评分插件 -->
<script>
export default {
  props: ['scope'],
  data() {
    return {
      zong: [1, 2, 3, 4, 5],
      nor: '/static/img/Star_nor@2x.png',
      sel: '/static/img/Star_sel@2x.png'
    }
  },
  mounted() {}
}
</script>

<style lang="scss">
#scope {
  display: inline-block;
  img {
    width: 24rpx;
    height: 23rpx;
    margin-right: 10rpx;
  }
  img:last-child {
    margin-right: 0;
  }
}
</style>

