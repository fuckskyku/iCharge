import store from '@/Store/store'
//引用工具类
import utils from '../utils';
var Fly = require("flyio/dist/npm/wx") //wx.js is your downloaded code
var fly = new Fly(); //Create an instance of Fly

fly.interceptors.response.use(
  (response, promise) => {
    wx.showLoading({
      title: "加载中",
      mask: true,
    });
    // return
    if (typeof (response.data) == 'string' && response.data != '') {
      response.data = JSON.parse(response.data);
    }
    if (response.data.code == "414" || response.data.code == "412") {
      var url = '/pages/pages_one/logout/main'
      //token过期拦截
      // wx.removeStorageSync("token");
      //   ...mapActions(['setClearStore']),
      wx.clearStorageSync();
      wx.redirectTo({
        url: url
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
    });
    wx.hideLoading()
  }
)

// Set the base url


//fly.config.baseURL = "https://admin.school.mseenet.com"
fly.config.baseURL = "http://192.168.2.5:8099"

fly.config.headers = {
  'content-type': 'application/x-www-form-urlencoded'
}

fly.config.withCredentials = true;

export default {
  /**
   *   
   * @param {请求地址} url 
   * @param {请求参数}} param 
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
          "Authorization": "Bearer  " + store.state.token
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
          "Authorization": "Bearer  " + store.state.token
        }
      }).then(res => {
        resolve(res)
      })
    })
  },
  //这里是请求短信验证码专用接口请求
  getCode(url, param) {
    return new Promise((resolve, reject) => {
      fly.request(url, param, {
        method: 'get',
        headers: {
          "Cookie": "school_sesn_id=" + store.state.cookieId
        }
      }).then(res => {
        resolve(res)
      })
    })
  },
  postCode(url, param) {
    return new Promise((resolve, reject) => {
      fly.request(url, param, {
        method: 'post',
        headers: {
          "Cookie": "school_sesn_id=" + store.state.cookieId
        }
      }).then(res => {
        resolve(res)
      })
    })
  }
};
