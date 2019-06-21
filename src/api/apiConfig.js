import store from '@/Store/store'
//引用工具类
import utils from '../utils';
var Fly = require("flyio/dist/npm/wx") //wx.js为您下载的源码文件
var fly = new Fly(); //创建fly实例

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  (response, promise) => {
    // wx.showLoading({
    //   title: "加载中",
    //   mask: true,
    //   duration: 2000,
    // });
    // return
    // console.log("response",response)
    fly.config.headers = {
      Authorization: "Bearer " + store.state.token
    }
    if(store.state.token){
      if(store.state.chargeing == true) {
        // wx.redirectTo({
        //   url: "/pages/search/chargeMode/countCharge/main?id=" + that.gunId
        // });
      }
      if(store.state.sessionId) {
        /* 登录有效期检查 */
        // wx.checkSession({
        //   fail: function (res) {
        //     // session_key 已经失效，需要重新执行登录流程
        //     // console.log('los',res)
        //     wx.clearStorageSync();
        //     store.dispatch('setClearStore')
        //   }
        // });
      }
      
    }else{
      // wx.clearStorageSync();
      // store.dispatch('setClearStore')
      
    }
    if (typeof (response.data) == 'string' && response.data != '') {
      response.data = JSON.parse(response.data);
    }
    if (response.data.code == "600001" ) {
      //token过期拦截
      // wx.removeStorageSync("token");
      store.dispatch('setClearStore')
      wx.clearStorageSync();
      wx.redirectTo({
        url: "/pages/index/main"
      });
    }
    
    wx.hideLoading()
    // response.data=Mock.mock(response.data)
    // Do something with response data .
    // Just return the data field of response
  },
  (err, promise) => {
    // Do something with response error
    //promise.resolve("ssss")
    wx.showToast({
      title:'网络不给力，请稍后再试！',
      icon:'none',
      mask: true,
      duration: 3000,
    });
    // wx.hideLoading()
  }
)

// Set the base url
// fly.config.baseURL = "http://10.10.101.15:8990"
// fly.config.baseURL = "http://182.148.15.148:8990"
// fly.config.baseURL = "http://182.148.12.140:8990"
// fly.config.baseURL = "http://10.10.101.224:8992"
// fly.config.baseURL = "https://charge.xmnewlife.com/" 
fly.config.baseURL = "https://testapi.xmnewlife.com"
fly.config.headers = {
  'content-type': 'application/x-www-form-urlencoded',
}


//跨域请求是否发送第三方cookie
fly.config.withCredentials = true;

export default {
  /**
   *   
   * @param {请求地址} url 
   * @param {请求参数} param 
   * 
   * 两个不带头部的请求方式
   */
  get(url, param) {
    return new Promise((resolve, reject) => {
      fly.request(url, param, {
        method: 'get'
      }).then(res => {
        resolve(res)
      })
    })
  },
  //post请求
  post(url, param) {
    return new Promise((resolve, reject) => {
      fly.request(url, param, {
        method: 'post'
      }).then(res => {
        resolve(res)
      })
    })
  },

  /**
   * 
   * @param {请求地址} url 
   * @param {请求参数} param 
   * 带头部参数的请求方式
   */
  getHeader(url, param) {
    return new Promise((resolve, reject) => {
      fly.request(url, param, {
        method: 'get',
        headers: {
          Authorization: "Bearer " + store.state.token
        }
      }).then(res => {
        resolve(res)
      })
    })
  },
  postHeader(url, param) {
    return new Promise((resolve, reject) => {
      fly.request(url, param, {
        method: 'post',
        headers: {
          Authorization: "Bearer " + store.state.token
        }
      }).then(res => {
        resolve(res)
      })
    })
  },
  postJson(url, param) {
    return new Promise((resolve, reject) => {
      fly.request(url,param,{
        method: "post",
        headers: { Authorization: "Bearer " + store.state.token, "Content-Type": "application/json" },
      }).then(res => {
        resolve(res);
      });
    });
  },
};
