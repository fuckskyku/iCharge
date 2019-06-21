import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()


export default {
    config: {
        navigationBarTitleText: '我的',
        "enablePullDownRefresh": false,
        "navigationBarBackgroundColor":'#14BF6D',
        // "enablePullDownRefresh": true,
    }
}