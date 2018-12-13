import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()


export default {
    config: {
        navigationBarTitleText: '意见反馈',
        "enablePullDownRefresh": false,
        "navigationBarBackgroundColor":'#FFEA55',
    }
}