<template>
  <div id="order" class="order">
    <div class="header">
      <div class="bg">
        <p class="balance_tip">账户余额（元）</p>
        <p class="balance">{{balance}}</p>
        <div class="recharge" @click="skip('pay')">充值</div>
        <div class="refund" @click="skip('balanceRefund')" v-if="balance > 0">退款</div>
      </div>
    </div>
    <!-- 空空如也 -->
    <div v-if="empty" class="empty" style="margin-top:60rpx;">
      <img src="/static/img/cut/empty.png" alt="">
      空空如也~
    </div>
    <div class="container" v-if="!empty">
      <div class="record" v-for="(item,index) in tableData" :key="index" @click="skip('orderDetails',item)">
        <div class="title">
          <div class="hd">{{item.typeStr}}</div>
          <!-- <div class="bd">+{{item.buyingPower}}度</div> -->
          <div class="fd" :style="item.type=='1'?'color:#FFC000;':'color:#333333;'">{{ item.type == '1' ? '+' + item.amount + '元' : '-' + item.amount + '元'}}</div>
        </div>
        <div class="subTitle">
          <div class="hd">{{'剩余金额:'+ item.userNowBalance + '元'}}</div>
          <div class="fd ">{{item.createTimestamp}}</div>
        </div>
        <div class="underLine"></div>
      </div>
      
    </div>
    <view class="weui-loadmore loadmore" v-if="!empty">
      <view class="tips">我是有底线的</view>
      <div class="line pl"></div>
      <div class="line pr"></div>
    </view>    
  </div>
</template>
<script>
import utils from "@/utils/index";
import { mapState, mapActions } from 'vuex'
import { getUcCenter, getchargespendloglist } from '@/api/api'

export default {
  data() {
    return {
      id: '',
      balance: '',
      tableData: [],
      empty: false
    };
  },
  onShow() {
    console.log("this.$root.$mp.query",this.$root.$mp.query)
    this.$root.$mp.query.id != undefined ? this.id = this.$root.$mp.query.id : this.id = ''
    // getUcCenter().then(res=>{
      
    // })
    this.getchargespendloglistFun()
  },
  mounted() {
    
  },
  methods: {
    getchargespendloglistFun() {
      getchargespendloglist({
        
      }).then(res=>{
        // console.log(res.data.data.list)
        this.balance = res.data.data.price.toFixed(2)
        if(res.data.data != null && res.data.data.list != ''){
          this.empty = false
          this.tableData = res.data.data.list
          this.tableData.map((item)=> {
            item.createTimestamp = this.ToTime(item.createTimestamp)
            item.userNowBalance = item.userNowBalance.toFixed(2)
            item.amount = item.amount.toFixed(2)
          })
        }else{
          this.empty = true
        }
        
      })
    },
    ToTime(timestamp) {
      //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      timestamp = timestamp + ''
      if(timestamp.length == 10){
        var date = new Date(timestamp * 1000);
      }else if(timestamp.length == 13){
        var date = new Date(timestamp * 1000 / 1000);
      }
      var Y = date.getFullYear() + "-";
      var M = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) + "-" : date.getMonth() + 1 + "-";
      var D = date.getDate() < 10 ? "0" + date.getDate() + " " : date.getDate() + " ";
      var h = date.getHours() < 10 ? "0" + date.getHours() + ":" : date.getHours() + ":";
      var m = date.getMinutes() < 10 ? "0" + date.getMinutes() + ":": date.getMinutes() + ":";
      var s = date.getSeconds() < 10 ? "0" + date.getSeconds(): date.getSeconds();
      return Y + M + D + h + m + s;
    },
    //页面路由跳转
    skip(type,pramas) {
      
      if(type == 'pay'){
        wx.navigateTo({
          url: "/pages/" + type + "/main"
        });
      }else if(type == 'balanceRefund'){
        wx.navigateTo({
            url: "/pages/userCenter/balanceRefund/main"
          });
      }else{
        if(pramas.type == 1) {//充值
          wx.navigateTo({
            url: "/pages/userCenter/orderDetails/main?id=" + pramas.id
          });
        }else if(pramas.type == 2){//充电
          wx.navigateTo({
            url: "/pages/userCenter/accountBalanceDetails/main?id=" + pramas.id
          });
        }else if(pramas.type == 3){
          wx.navigateTo({
            url: "/pages/userCenter/refundDetails/main?id=" + pramas.id
          });
        }
      }
      
    },
  },
  computed: {
    
  },
  components: {

  },
  
  watch: {},

};
</script>

<style scoped lang="scss">
@import "../../../../static/assets/scss/userCenter/accountBalance/index.scss";

</style>

