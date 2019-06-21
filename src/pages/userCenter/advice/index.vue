<template>
  <div id="index" class="context">
    <div class="energy flex">
      <div class="flex time">时间</div>
      <div class="flex line"></div>
      <div class="flex content">内容</div>
    </div>
    <!-- 空空如也 -->
    <div v-if="empty" class="empty" style="margin-top:220rpx;">
      <img src="/static/img/cut/empty.png" alt="">
      空空如也~
    </div>
    <div class="weui-cells weui-cells_after-title container"   v-if="!empty">
      <div class="weui-cell weui-cell_access border10" @click="skip('adviceDetails',item.id)" v-for="(item,index) in tableData" :key="index">
        <div class="weui-cell__bd bd">{{item.createTime}}</div>
        <div class="weui-cell__ft ft">{{item.content}}</div>
      </div>
    </div>
    <button @click="skip('editAdvice')" class="btn">提交意见</button>
  </div>
</template>
<script>
import utils from "@/utils/index";
import { mapState, mapActions } from 'vuex'
import { getSuggestionList, addSuggestion } from '@/api/api'  

export default {
  data() {
    return {
      tableData: [],
      empty: false

    };
  },
  computed: {
  
  },
  mounted() {
    getSuggestionList({}).then(res=>{
      if(res.data.code == 200){
        if(res.data.data.data != null && res.data.data.data != '' ){
          this.empty = false
          this.tableData = res.data.data.data
          this.tableData.map((item,index)=>{
            item.createTime = this.ToTime(item.createTime)
          })
        }else{
          this.empty = true
        }
      }else{
        utils.showDialog(res.data.message)
      }
    })
    
    
  },
  components: {

  },
  methods: {
    ToTime(timestamp) {
       //时间戳为10位需*1000，时间戳为13位的话不需乘1000
       timestamp = timestamp + ""
      if(timestamp.length == 10){
        var date = new Date(timestamp * 1000);
      }else if(timestamp.length == 13){
        var date = new Date(timestamp * 1000 / 1000);
      }
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() < 10 ? "0" + date.getDate() + " " : date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    },
    skip(pramas,id) {
      id == undefined ? wx.navigateTo({
        url: "/pages/userCenter/"+ pramas + "/main"
      }) :  wx.navigateTo({
              url: "/pages/userCenter/"+ pramas + "/main?id=" + id
            });
    }
  },
  watch: {},

};
</script>

<style scoped lang="scss">
@import "../../../../static/assets/scss/userCenter/advice/index.scss";

</style>
