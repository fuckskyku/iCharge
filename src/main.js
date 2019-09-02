import './utils/ald-stat'
import './utils/ald-stat-conf'
import '../static/weui/weui.wxss'

import Vue from 'vue'
import App from './App'

import store from './Store/store'
Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.$store = store;
const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
      'pages/testCode/main',
      '^pages/index/main',
      'pages/authorization/main',
      'pages/stationDetails/main',
      'pages/parkDetails/main',
      'pages/pay/main',
      'pages/pay/payDescription/main',
      'pages/pay/paySuccess/main',
      'pages/pay/paymentFailed/main',
      'pages/search/main',
      'pages/user/main',
      'pages/login/main',
      'pages/loginOut/main',
      'pages/loginSelect/main',
      'pages/login/loginSuccess/main',
      'pages/userCenter/personalInfo/main',
      'pages/userCenter/editPersonalInfo/main',
      'pages/userCenter/orders/main',
      'pages/userCenter/accountBalance/main',
      'pages/userCenter/balanceRefund/main',
      'pages/userCenter/accountBalanceDetails/main',
      'pages/userCenter/refundSchedule/main',
      'pages/userCenter/refundSuccess/main',
      'pages/userCenter/refundFailed/main',
      'pages/userCenter/coupons/main',
      'pages/userCenter/couponsDetails/main',
      'pages/userCenter/electricityRecord/main',
      'pages/userCenter/electricityRecordDetails/main',
      'pages/userCenter/energyBalance/main',
      'pages/userCenter/energyBalanceDetails/main',
      'pages/userCenter/advice/main',
      'pages/userCenter/editAdvice/main',
      'pages/userCenter/adviceDetails/main',
      'pages/userCenter/about/main',
      'pages/userCenter/inmail/main',
      'pages/userCenter/inMailDetails/main',
      'pages/search/navigate/main',
      'pages/search/chooseParking/main',
      'pages/search/chargeMode/selectChargeType/main',
      'pages/search/chargeMode/setupCharge/main',
      'pages/search/chargeMode/chargeing/main',
      'pages/search/chargeMode/stopCharge/main',
      'pages/search/chargeMode/countCharge/main',
      'pages/search/chargeMode/confirmCharge/main',
      'pages/search/chargeMode/fillCharge/main',
      'pages/search/chargeMode/fixedCharge/main',
      'pages/search/opening/main',
      'pages/search/opened/main',
      'pages/search/openedInsert/main',
      'pages/electricChargeIntroduction/main',

    ],
    "permission": {
      "scope.userLocation": {
        "desc": "你的位置信息将用于小程序位置接口的效果展示"
      }
    },
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#31C56E',
      navigationBarTitleText: '喵喵充电',
      navigationBarTextStyle: 'white',
      "disableScroll": true,
      enablePullDownRefresh: true,
    }
    , networkTimeout: {
      request: 10000,
      downloadFile: 10000
    },
    debug: false
  }
}
