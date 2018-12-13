import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()


export default {
    config: {
        navigationBarTitleText: '选车位',
        "enablePullDownRefresh": false,
        "navigationBarBackgroundColor":'#14BF6D',
        
    }
}