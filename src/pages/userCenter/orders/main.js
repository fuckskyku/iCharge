import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()


export default {
    config: {
        navigationBarTitleText: '订单记录',
        "enablePullDownRefresh": false,
        "navigationBarBackgroundColor":'#FFEA55',
    }
}