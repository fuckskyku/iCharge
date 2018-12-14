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
      'pages/welcome/main',
      'pages/index/main',
      'pages/search/main',
      'pages/user/main',
      'pages/login/main',
      'pages/login/loginSuccess/main',
      'pages/userCenter/orders/main',
      'pages/userCenter/advice/main',
      'pages/userCenter/editAdvice/main',
      'pages/userCenter/adviceDetails/main',
      'pages/userCenter/about/main',
      'pages/userCenter/inmail/main',
      'pages/userCenter/inMailDetails/main',
      '^pages/search/navigate/main',
      'pages/search/chooseParking/main',
      'pages/search/chargeMode/selectChargeType/main',
      'pages/search/chargeMode/setupCharge/main',
      'pages/search/chargeMode/chargeing/main',
      'pages/search/chargeMode/stopCharge/main',
      'pages/search/opening/main',
      'pages/search/opened/main',
      //协议
      'pages/useAgreement/main'
    ],

    // tabBar: {
    //   "list": [{
    //     "pagePath": "pages/index/main",
    //     "text": "首页",
    //     "iconPath": '/static/img/tab/tab_school_nor@3x.png',
    //     "selectedIconPath": '/static/img/tab/tab_school_sel@3x.png',
    //   }, {
    //     "pagePath": "pages/welcome/main",
    //     "text": "我的",
    //     "iconPath": '/static/img/tab/tab_me_nor@3x.png',
    //     "selectedIconPath": '/static/img/tab/tab_me_sel@3x.png',
    //   }]
    // },

    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#31C56E',
      navigationBarTitleText: '咪师校园',
      navigationBarTextStyle: 'white',
      "disableScroll": true
      // enablePullDownRefresh: true
    }
    , networkTimeout: {
      request: 10000,
      downloadFile: 10000
    },
    debug: false
  }
}
