<template>
  <div class="parent">
    <div id="index" class="container child">
    <!-- 空空如也 -->
    
      <div v-if="empty" style="font-size: 34rpx;color: #777;text-align:center;padding:80rpx 0;">-- 空空如也 --</div>
    <div class="title" v-if="!empty"><div>{{form.title}}</div></div>
    <div class="content"  v-if="!empty">
      <!-- <div>尊敬的用户：</div> -->
      <!-- <div>{{form.remark}}</div> -->
      <!-- <rich-text :nodes="form.content"></rich-text> -->
      <wxParse :content="form.content"/>
    </div>
    <div class="time"  v-if="!empty">{{form.createTime}}</div>
    
    
  </div>
  </div>
  
</template>
<script>
import utils from "@/utils/index";
import { mapState, mapActions } from 'vuex'
import { getnoticedetail } from '@/api/api'  
import wxParse from 'mpvue-wxparse'

export default {
  data() {
    return {
      id: '',
      form: {},
      empty: false,
      article: '<div>我是HTML代码</div>'
    };
  },
  computed: {
  
  },
  onLoad() {
    // this.$root.$mp.query.id != undefined ? this.id = this.$root.$mp.query.id : ''
    if(utils.wxGetStorage("mailDetail")){
      this.form = utils.wxGetStorage("mailDetail")
      this.form.content = this.form.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto"')
      // this.form.content = this.form.content.replace(/\ /gi, '&nbsp;')
      // this.form.createTime = this.ToTime(this.form.createTime)
       this.empty = false
    }else{
      this.empty = true
    }
    // getnoticedetail({
    //   id: this.id
    // }).then(res =>{
    //   if(res.data.code == 200){
    //     if(res.data.data == null){
    //       this.empty = true
    //     }else{
    //       this.empty = false
    //       this.form = res.data.data
    //       this.form.createTime = this.ToTime(res.data.data.createTime)
    //     }
    //   }
    // })
  },
  mounted() {
    var that = this
    
  },
  components: {
    wxParse
  },
  methods: {
    ToTime(timestamp) {
      //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      timestamp = timestamp + ''
      if(timestamp.length == 10){
        var date = new Date(timestamp * 1000);
      }else if(timestamp.length == 13){
        var date = new Date(timestamp * 1000 / 1000);
      }
      var Y = date.getFullYear() + "-";
      var M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
      var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      var h = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":";
      var s = (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds());
      return Y + M + D + h + m + s;
    },
  },
  watch: {},

};
</script>

<style scoped lang="scss">
@import "../../../../static/assets/scss/userCenter/inMailDetails/index.scss";

</style>
