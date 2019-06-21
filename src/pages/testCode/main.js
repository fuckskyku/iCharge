import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()


export default {
    config: {
        navigationBarTitleText: 'code码测试',
        "enablePullDownRefresh": false,
        "navigationBarBackgroundColor":'#14BF6D',
        "enablePullDownRefresh": true,
    }
}