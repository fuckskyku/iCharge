<template>
  <div id="index">
    <div class="head"><img src="/static/img/cut/banner.png" alt=""></div>
    <div class="section">
      <ul>
        <li class="money_box" v-for="(item,index) in tableData" :key="index" @click="pop(item)">
          <p class="title">{{item.originalPrice}}元</p>
          <!-- <p class="subTitle">支付：<span class="">{{item.finalPrice}}</span>元</p> -->
        </li>
      </ul>
      <div class="fd" @click="skip('pay/payDescription')"><img src="/static/img/cut/ic_problem.png" alt="" > 充值和退款说明</div>
    </div>
    <!-- 支付dialog -->
    <div class="dialog" v-if="dialog">
      <div class="pay_box">
        <ul class="flex">
          <li>
            <div class="hd">订单信息</div>
            <div class="fd">预先充值{{form.originalPrice}}元</div>
            <div class="line"></div>
          </li>
          <li>
            <div class="hd">价格</div>
            <div class="fd" v-if="couponObj.id != '' && couponObj.userCouponId != ''"><span class="price">{{form.originalPrice}}元</span> <span>{{payOut}}元</span></div>
            <div class="fd" v-if="couponObj.id == '' && couponObj.userCouponId == ''"><span>{{payOut}}元</span></div>
            <div class="line"></div>
          </li>
          <li>
            <div class="hd">优惠券</div>
            <div class="fd">{{couponObj.id == '' && couponObj.userCouponId == '' ? "无" : couponObj.price + '元' }}</div>
            <div class="line"></div>
          </li>
          <li>
            <div class="hd">付款方式</div>
            <div class="fd">微信支付</div>
            <div class="line"></div>
          </li>
          <li>
            <div class="hd">实付金额</div>
            <div class="fd" style="color:red;">{{payOut <= 0 ? 0.01 : payOut}}元</div>
            <div class="line"></div>
          </li>
          <li style="text-align: center;">
            <button class="btn cancel" @click="dialog=false">取消</button>
            <button class="btn" @click="pay()">确认支付</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import utils from "@/utils/index";
import { mapState, mapActions } from 'vuex'
import { 
  login,
  register,
  getUcCenter,
  getprechargvaluelist, 
  cancelOrder,
  getfavorablechargecouponbyuser,      //用户充值获取到的最大优惠券
  addpayorder,                         //支付下单      
  getpaysign,                          //获取微信支付数据签名验证字段列表
  unifiedOrder,                        //获取微信支付数据签名验证字段
  weiChatPayResult                     //微信支付统一下单成功后，查看支付是否成功接口
} from '@/api/api'  

export default {
  data() {
    return {
      id: "",
      payOut: '',
      userInfo: {},
      dialog: false,
      open: false,
      couponObj: {id:'',userCouponId:''},
      payObj: {},
      tableData: [],
      form: {},
    };
  },
  computed: {
  
  },
  onShow() {
    this.payOut = '';
    this.couponObj = {id:'',userCouponId:''};
    this.payObj = {};
    this.tableData = [];
    this.form = {}
    this.userInfo = {}
    this.dialog = false;
    // console.log('token1',this.token)
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
    wx.login({
      success(res) {
        if (res.code) {
          // 发起openid请求
          console.log('res.code',res.code)
          login({str: res.code}).then(res =>{
            //console.log("res.user",res.data.data)
            // that.$set(that.userInfo,'token',res.data.data.token)
            that.$set(that.userInfo,'openid',res.data.data.openid)
            that.$set(that.userInfo,'sessionId',res.data.data.sessionKey)
            // that.$set(that.userInfo,'mobile',res.data.data.mobile)
            utils.wxSetStorageSync('userInfo',that.userInfo)
            // that.setToKen(res.data.data.token)
            // console.log('token2',this.token)
            console.log("wxxxxxxxxxxxxxthis.userInfo",utils.wxGetStorage("userInfo"))
          })
        } else {
          //console.log('登录失败！' + res.errMsg)
        }
      }
    })
    //
    getprechargvaluelist({
    }).then(res=>{
      //console.log("fsdfsd",res.data)
      if(res.data.code == 200){
        this.tableData = res.data.data
      }
    })
  },
  onLoad () {
    //console.log("757575this.$root.$mp.query",this.$root.$mp.query)
    this.id = this.$root.$mp.query.id
  },
  mounted() {
    
  },
  components: {

  },
  methods: {
    ...mapActions([
      'setToKen'
    ]),
    init() {

    },
    pay() {
      var that = this
      addpayorder({
        couId: that.couponObj.id?that.couponObj.id:'',
        cuId: that.couponObj.userCouponId?that.couponObj.userCouponId:'',
        preId: that.form.id,
        payType: 1,
        OpenId: utils.wxGetStorage("userInfo").openid
      }).then( res=>{
        console.log("获取订单号",res.data)
        that.getpaysignFun(res.data.data)
      })
      
      
    },
    //获取微信支付数据签名验证字段列表
    getpaysignFun(params) {
      var that = this
      unifiedOrder({
        orderSn: params,
        openId: utils.wxGetStorage("userInfo").openid
      }).then(res => {
        if(res.data.code == 200 ){
          this.payObj = res.data.data
          console.log('微信支付统一下单成功后,获取微信支付数据签名验证字段列表',res.data.data)
          var payData =  that.payObj
          let appId = payData.appId+'';
          let timeStamp = payData.timestamp+'';
          let nonceStr = payData.nonceStr+'';
          let paySign = payData.signType+'';
          let prepayId = payData.prepayId+'';
          // console.log('appId:'+appId,'timeStamp:'+timeStamp,'nonceStr:'+nonceStr,'paySign:'+paySign,'prepayId:'+prepayId);
          wx.requestPayment({
            // 'appId':appId,
            // 'timeStamp':timeStamp,
            // 'nonceStr':nonceStr,
            // 'package':prepayId,
            // 'signType':'MD5',
            // 'paySign':paySign,
            // 'appId': String(payData.appId),
            'timeStamp': payData.timestamp,
            'nonceStr': payData.nonceStr,
            'package': payData.prepayId,
            'signType': 'MD5',
            'paySign': payData.sign,
            'success':function(res){
              that.dialog = false
              weiChatPayResult({
                str: payData.orderSn
              }).then(res =>{
                if(res.data.code == 200) {
                  console.log('支付结果',res.data.data)
                }
              })
              that.skip('pay/paySuccess',that.form.originalPrice)
            },
            'fail':function(res){
              console.log('支付失败结果',res)
              wx.showToast({
                title: '支付失败',
                image: '/static/img/cut/ic_wrong2.png',
                duration: 3000
              });
              that.dialog = false
              
              /* **************************************************************** */ 
              cancelOrder({
                orderSn: payData.orderSn,
                userCouponId: that.couponObj.userCouponId ? that.couponObj.userCouponId : 0
              }).then(res => {
                if(res.data.code == 200){
                  console.log("取消订单",res.data.data)
                }
              })
              that.skipTo('pay/paymentFailed',that.form.originalPrice)
            },
          });
          // setTimeout(()=>{
            
          // },600)
        }
      })
    },
    //支付弹窗
    pop(item) {
      this.dialog = true
      this.form = item
      getfavorablechargecouponbyuser({
        price: this.form.originalPrice 
      }).then(res =>{
        if(res.data.code == 200){
          if(res.data.data == null || res.data.data == ''){
            this.couponObj = {id:'',userCouponId:''}
            console.log("1kongkongruyrthis.couponObj",this.couponObj)
            this.payOut = this.form.originalPrice.toFixed(2)  //实付金额
          }else{
            this.couponObj = res.data.data
            console.log("1this.couponObj",this.couponObj)
            this.payOut = (this.form.originalPrice - this.couponObj.price).toFixed(2)  //实付金额
          }
        }
      });
      
    },
    //页面路由跳转
    skip(type,params) {
      wx.navigateTo({
        url: "/pages/" + type + "/main?price=" + params
      });
    },
    skipTo(type,params) {
      wx.navigateTo({
        url: "/pages/" + type + "/main?price=" + params
      });
    }
  },
  watch: {

  },
  computed: {
    ...mapState(['token','openId'])
  },
};
</script>

<style scoped lang="scss">
@import "../../../static/assets/scss/pay/index.scss";

</style>
