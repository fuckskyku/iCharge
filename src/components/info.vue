<template>
  <div id="info">
  
      <address class="address" @click="redirectTo()">
      
        <wxParse :content="detail.content" @preview="preview" @navigate="navigate" v-if="detail.content" />
        <div v-else>
          <span>暂时没有内容哦~</span>
        </div>
      
      </address>
  </div>
</template>

<script>
import wxParse from 'mpvue-wxparse'  //解析富文本
import utils from '@/utils/index'

export default {
  props: ['detail'],
  data() {
    return {
     
    }
  },
  computed: {
   
  },
  mounted() {
    
  },

  methods: {
    redirectTo() {
      wx.redirectTo({
        url: '/pages/search/main'
      })
    }
      
    
  },
  components: {
    wxParse
  }
}
</script>

<style lang="scss" scoped>
@import url('~mpvue-wxparse/src/wxParse.css');

</style>
