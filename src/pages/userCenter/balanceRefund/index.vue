<template>
  <div id="refund" class="refund">
    <div class="header">
      <div class="lt">
        <p class="title"><span>￥</span>{{balance}}</p>
        <p class="sub_title">当前余额(元)</p>
      </div>
      <div class="rt">
        <p class="title"><span>￥</span>{{form.chargeBalance}}</p>
        <p class="sub_title">可退款金额(元)</p>
      </div>
      <div v-if="visibility == false && isShow == true" class="dialogBtn" @click="visibility = true">计算方式</div>
    </div>
    <div class="content">
      <div class="item">
        <div class="label">退款金额</div>
        <input class="amount" type="digit" @input="check()" placeholder="请输入退款金额,至少1元" placeholder-style="font-size:28rpx;" v-model="refundAmount" />
      </div>
      <div class="item">
        <div class="label">退款方式</div>
        <div class="wechat">
          <img src="/static/img/cut/account/wechat.png" alt="">
          微信
        </div>
      </div>
    </div>
    <button :disabled="disabled" :class="[style,{disabled: form.chargeBalance <= 0 || refundAmount < 1}]" @click="refund()">立即退款</button>
    <!-- <button @click="submit" :disabled="disabled" :class="[style,{disabled: form.content == '' || tel == '' }]">提交</button> -->
    <!-- <button class="btn" @click="skip('refundSchedule')">立即退款</button> -->
    <!-- diolog -->
    <div class="dialog" v-if="visibility">
      <div class="warp">
        <div class="head"><img @click="visibility = false" class="close" src="/static/img/cut/account/close.png" alt=""></div>
        <div class="section">
          <div class="context">
            <p>根据平台的充值和退款说明，充值时参加了充值优惠活动的部分不支持退款，未参加充值优惠活动时，实付多少退多少。</p>
            <!-- <p>您未参加充值优惠活动的充值记录中，共充值20元，实付19.5元。</p> -->
          </div>
          <p class="desc">您充值时参加了充值优惠活动的金额剩余情况：</p>
          <div class="table">
            <div class="item">
              <div class="cell">充值金额</div>
              <div class="cell">剩余金额</div>
              <div class="cell">充值时间</div>
            </div>
            <div v-for="(item,index) in tableData" :key="index" class="item">
              <div class="cell">{{item.price}}</div>
              <div class="cell">{{item.givePrice}}</div>
              <div class="cell">{{item.chargeTimestamp }}</div>
            </div>
            <!-- <div class="item">
              <div class="cell">50</div>
              <div class="cell">20</div>
              <div class="cell">2019-04-08 12:24</div>
            </div> -->
          </div>
          <div class="tip">
            可退款金额:<span>{{price}}-{{givePrice}}={{form.chargeBalance}}</span>
            <!-- <span>53.55-30-0.5=23</span> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import utils from "@/utils/index";
import { mapState, mapActions } from 'vuex'
import { createOrder, weiChatRefund, getUcCenter, getAccount, formulaMode, login } from '@/api/api'

export default {
  data() {
    return {
      id: '',
      refundAmount: '',
      disabled: true,
      style: 'btn',
      balance: '',
      form: {},
      tableData: [
        {charge:50,balance:20,time: '1548485700'},{charge:60,balance:20,time: '1548485700'},{charge:70,balance:20,time: '1548485700'}
      ],
      userInfo: {},
      givePrice: '',
      price: '',
      isShow: false,
      visibility: false,
    };
  },
  onShow() {
    this.refundAmount = ""
    getAccount().then(res => {
      if(res.data.code == 200) {
        this.balance = res.data.data.balance.toFixed(2) 
        this.form = res.data.data
        this.form.chargeBalance = this.form.chargeBalance.toFixed(2)
        if(res.data.data.balance == res.data.data.chargeBalance){
          this.isShow = false
        }else{
          this.isShow = true
        }
      }
    })
    formulaMode({}).then(res=> {
      if(res.data.code == 200) {
        if(res.data.data != '') {
          this.price = res.data.data.balance.toFixed(2) 
          this.givePrice = res.data.data.givePrice
          this.tableData = res.data.data.formulaModeOut
          this.tableData.map(item => {
            item.chargeTimestamp = this.ToTime(item.chargeTimestamp)
          })
        }
      }
    })
  },
  mounted() {
    var that = this
    this.userInfo = utils.wxGetStorage("userInfo")
    // 获取oppenId
    getUcCenter({}).then(res =>{
      if(res.data.code == 200){
        if(res.data.data != undefined && res.data.data != null) {
          that.userInfo = res.data.data
        } 
      }
    })
    // if(that.userInfo.openid == undefined || that.userInfo.openid == null || that.userInfo.openid == ''){
    //   wx.login({
    //     success(res) {
    //       if (res.code) {
    //         // 发起openid请求
    //         login({str: res.code}).then(res =>{
    //           that.$set(that.userInfo,'openid',res.data.data.openid)
    //           that.$set(that.userInfo,'sessionId',res.data.data.sessionKey)
    //           utils.wxSetStorageSync('userInfo',that.userInfo)
    //           // console.log("wxxxxxxxxxxxxxthis.userInfo",utils.wxGetStorage("userInfo"))
    //         })
    //       } else {
    //         console.log('登录失败！' + res.errMsg)
    //       }
    //     }
    //   })
    // }
  },
  methods: {
    ...mapActions([
      'setToKen',
      "setClearStore"
    ]),
    // 匹配只能输入一位小数点且精确到分
    check() {
      var reg = this.refundAmount.match(/\d+\.?\d{0,2}/);
      var radixPointReg = /^\.{2}$/;
      var txt = '';
      if (reg != null) {
        txt = reg[0];
      }
      this.refundAmount = txt
      if (radixPointReg.test(this.refundAmount)){
        this.refundAmount = this.refundAmount.substr(0, this.refundAmount.length - 1)
        this.disabled = true
      }else if(parseFloat(this.refundAmount) > parseFloat(this.form.chargeBalance)){
        this.refundAmount = ''
        utils.showDialog('超出可退款金额')
        this.disabled = true
      }else if(this.refundAmount < 1){
        this.refundAmount = ''
        utils.showDialog('退款金额至少1元')
        this.disabled = true
      }else{
        this.disabled = false
      }
    },
    refund() {
      var that = this
      if(parseFloat(this.refundAmount) > 0 && parseFloat(this.refundAmount) <= parseFloat(this.form.chargeBalance)) {
        wx.showModal({
          title: '余额退款',
          content: '您确定要退款吗?',
          confirmText: "确定",
          cancelText: "取消",
          success: function (res) {
            console.log(res);
            if (res.confirm) {
                // 生成用户退款订单
                wx.showToast({
                  title: '数据加载中',
                  icon: 'loading',
                  duration: 3000
                });
              createOrder({
                payType: 1,
                price: that.refundAmount
              }).then(res => {
                if(res.data.code == 200) {
                  var payObj = res.data.data
                  that.weiChatRefundFun(payObj)
                }else if(res.data.code == 600205){//用户未绑定openid
                  wx.showModal({
                    title: '退款失败',
                    content: res.data.message,
                    confirmText: "确认",
                    cancelText: "取消",
                    success: function (res) {
                      console.log(res);
                      if (res.confirm) {
                        wx.clearStorageSync();
                        that.setClearStore()
                        wx.reLaunch({
                          url: "/pages/loginSelect/main"
                        });
                      }else{
                        console.log('用户点击辅助操作')
                      }
                    }
                  });
                }else{
                  utils.showDialog(res.data.message)
                }
              })
            }else{
              //console.log('用户点击辅助操作')
            }
          }
        });
        
      }else{
        utils.showDialog('请正确输入退款余额!')
      }
      
    },
    // 通知微信服务端执行退款操作
    weiChatRefundFun(payObj) {
      if(this.userInfo.openid == '') {
        utils.showDialog('未绑定微信号')
        return ;
      }
      weiChatRefund({
        amount: payObj.totalPrice,
        openid: this.userInfo.openid,
        orderSn: payObj.orderSn 
      }).then(res =>{
        if(res.data.code == 200 && res.data.data.resultCode == "SUCCESS") {
          this.skip('refundSuccess',this.refundAmount)
        }else{
          // utils.showDialog('退款失败，请重新输入')
          this.skip('refundFailed',this.refundAmount)
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
      var m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes() ;
      var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m;
    },
    //页面路由跳转
    skip(type,pramas) {
      if(type == 'pay'){
        wx.redirectTo({
          url: "/pages/" + type + "/main"
        });
      }else{
        wx.redirectTo({
          url: "/pages/userCenter/" + type + "/main?price=" + pramas
        });
      }
      
    },
  },
  computed: {
    ...mapState(['token'])
  },
  components: {

  },
  
  watch: {},

};
</script>

<style scoped lang="scss">
@import "../../../../static/assets/scss/userCenter/balanceRefund/index.scss";
.disabled{
  color: rgba(255, 255, 255, 0.5) !important;
}
</style>

