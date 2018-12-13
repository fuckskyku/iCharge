var Fly = require("flyio/dist/npm/wx") //wx.js is your downloaded code
var fly = new Fly(); //Create an instance of Fly

//引用工具类
import utils from '../utils';


//fly.config.baseURL = "https://admin.retailer.mseenet.com/"
fly.config.baseURL = ""


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
          "Authorization": "Bearer  " + utils.wxGetStorage('token')
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
          "Authorization": "Bearer  " + utils.wxGetStorage('token')
        }
      }).then(res => {
        resolve(res)
      })
    })
  }
};
