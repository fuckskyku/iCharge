import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default{    
    config:{
        "navigationBarTitleText":"喵喵充电",
        "enablePullDownRefresh": false,
        "backgroundTextStyle":"dark",
        "disableScroll": true,
    }
}