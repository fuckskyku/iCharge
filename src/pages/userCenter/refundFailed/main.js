import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()


export default {
    config: {
        navigationBarTitleText: '退款',
        "enablePullDownRefresh": false,
        "navigationBarBackgroundColor":'#ffffff',
        "navigationBarTextStyle": 'black',
    }
}