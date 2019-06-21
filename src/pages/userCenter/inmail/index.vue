<template>
  <div id="index" class="context">
    <!-- 空空如也 -->
    <div v-if="empty" class="empty" style="margin-top:60rpx;">
      <img src="/static/img/cut/empty.png" alt="">
      空空如也~
    </div>
    <div class="container" v-if="!empty">
      <div class="box" v-for="(item,index) in tableData" :key="index" @click="toDetails(item)"> 
        <div class="hd">
          <div class="title">{{item.title}}</div>
          <div class="subTitle">{{item.createTime}}</div>
        </div>
        <div class="fd">
          <div class="btn" v-if="item.status == 0" :class="[style,{cancel: item.status == 1}]">{{item.status == "0" ? "未读" : "已读"}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import utils from "@/utils/index";
import { getNoticeList, updateStatus } from '@/api/api'  
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      tableData: [],
      style: "btn", 
      empty: false,
    };
  },
  computed: {
  
  },
  onShow() {
    var that = this
    getNoticeList({}).then(res=> {
      if(res.data.code == 200){
        if(res.data.data != ''){
          this.empty = false
          this.tableData = res.data.data.data
          
          this.tableData.map((item,index)=>{
            // console.log("this.tableData",this.tableData)
            item.createTime = that.ToTime(item.createTime)
          })
          
        }else{
          this.empty = true
        }
      }
    })
    
  },
  components: {

  },
  methods: {
    ...mapActions([
      'setIsRead'
    ]),
    toDetails(item) {
      updateStatus({
        noticeId: item.id
      }).then(res =>{
        if(res.data.code == 200){
          utils.wxSetStorageSync('mailDetail', item)
          this.skip('inMailDetails',item.id)
        }
      })
    },
    ToTime(timestamp) {
      //时间戳为10位需*1000，时间戳为13位的话不需乘1000 
      timestamp = timestamp + ""
      if(timestamp.length == 10){
        var date = new Date(timestamp * 1000);
      }else if(timestamp.length == 13){
        var date = new Date(timestamp);
      }
      var Y = date.getFullYear() + "-";
      var M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
      var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      var h = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":";
      var s = (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds());
      return Y + M + D + h + m + s;
    },
    skip(type,pramas) {
      wx.navigateTo({
        url: "/pages/userCenter/"+ type + "/main?id=" + pramas
      });
    }
  },
  computed: {
    ...mapState(['isRead' ])
  },
  watch: {},

};
</script>

<style scoped lang="scss">
@import "../../../../static/assets/scss/userCenter/inmail/index.scss";

</style>
