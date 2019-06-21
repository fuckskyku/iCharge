import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()


export default {
    config: {
        navigationBarTitleText: '个人信息',
        "enablePullDownRefresh": false,
        "navigationBarBackgroundColor":'#14BF6D',
        "navigationBarTextStyle": 'white',
    }
}