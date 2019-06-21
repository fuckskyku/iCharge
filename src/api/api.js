import fly from './apiConfig'
import { Z_FULL_FLUSH } from 'zlib';

/* 充电桩小程序接口抛出 */ 

//测试接口
export const GetSession = param => {
    return fly.get('/api/charge/GetSession', param)
}
export const testsss = param => {
    return fly.get('/api/noToken/generalizeStation/car/createToekn', param)
}
//获取电站列表
// export const getStationtList = param => {
//     return fly.get('/api/charge/getStationtList', param)
// }
export const getStationtList = param => {
    return fly.postJson('/api/noToken/clientHome/car/mapStation', param)
}

// 搜一搜显示桩站列表
export const stationtList = param => {
    return fly.postJson('/api/noToken/clientHome/car/stationList', param)
}

//获取电站信息 
// export const getStationtInfo = param => {
//     return fly.get('/api/charge/getStationtInfo', param)
// }
export const getStationtInfo = param => {
    return fly.postJson('/api/noToken/clientHome/car/stationDetail', param)
}

//用户端充电站详情
export const stationDetail = param => {
    return fly.postJson('/api/noToken/clientStation/car/stationDetail', param)
}

//获取电站终端列表  
// export const getClientList = param => {
//     return fly.get('/api/charge/getClientList', param)
// }
export const getClientList = param => {
    return fly.postJson('/api/noToken/clientStation/car/truckSpaceList', param)
}

//验证用户
export const checkToken = param => {
    return fly.post('/api/charge/checkToken', param)
}

//注册
// export const register = param => {
//     return fly.post('/api/charge/register', param)
// }
export const register = param => {
    return fly.postJson('/api/login/car/weiChatRegisterLogin', param)
}

//登录
// export const login = param => {
//     return fly.post('/api/charge/login', param)
// }
export const login = param => {
    return fly.postJson('/api/login/car/carWeiChatGetLoginParam', param)
}

//发送手机验证码
// export const getPhoneCode = param => {
//     return fly.get('/api/charge/getPhoneCode', param)
// }
export const getPhoneCode = param => {
    return fly.postJson('/api/noToken/sms/sendNoTokenSms', param)
}

//验证码登录
// export const mobileLogin = param => {
//     return fly.post('/api/charge/mobileLogin', param)
// }
export const mobileLogin = param => {
    return fly.postJson('/api/login/car/smsCodeLogin', param)
}

//获取个人中心
// export const getUcCenter = param => {
//     return fly.getHeader('/api/charge/getUcCenter', param)
// }
export const getUcCenter = param => {
    return fly.postJson('/api/carOwner/car/info', param)
}

//获取我的意见建议列表
// export const getSuggestionList = param => {
//     return fly.getHeader('/api/charge/getSuggestionList', param)
// }
export const getSuggestionList = param => {
    return fly.postJson('/api/suggestion/car/pageList', param)
}

//提交意见建议
// export const addSuggestion = param => {
//     return fly.postHeader('/api/charge/addSuggestion', param)
// }
export const addSuggestion = param => {
    return fly.postJson('/api/suggestion/car/save', param)
}

//获取站内信列表 
// export const getNoticeList = param => {
//     return fly.getHeader('/api/charge/getNoticeList', param)
// }
export const getNoticeList = param => {
    return fly.postJson('/api/notice/car/pageList', param)
}

//获取站内信详情
export const getnoticedetail = param => {
    return fly.getHeader('/api/charge/getnoticedetail', param)
}

//获取我的站内信未读总数
// export const getnewnoticecount = param => {
//     return fly.getHeader('/api/charge/getnewnoticecount', param)
// }

//更新已读状态
export const updateStatus = param => {
    return fly.postJson('/api/notice/car/updateStatus', param)
}

//获取预充值列表
// export const getprechargvaluelist = param => {
//     return fly.get('/api/charge/getprechargvaluelist', param)
// }
export const getprechargvaluelist = param => {
    return fly.postJson('/api/preCharge/car/userPageList', param)
}

//获取优惠券列表
// export const getcouponlist = param => {
//     return fly.post('/api/charge/getcouponlist', param)
// }
export const getcouponlist = param => {
    return fly.postJson('/api/userCoupon/car/pageList', param)
}

//获取桩站详情展示的可领优惠券列表
export const getStationCouponlist = param => {
    return fly.postJson('/api/userCoupon/car/StationAutoList', param)
}

//获取桩站详情展示的可领优惠券列表
export const getCouponlistNoToken = param => {
    return fly.postJson('/api/noToken/userCoupon/car/pageList', param)
}

//领取优惠券
// export const receivecoupon = param => {
//     return fly.getHeader('/api/charge/receivecoupon', param)
// }
export const receivecoupon = param => {
    return fly.postJson('/api/userCoupon/car/take', param)
}

//获取我的优惠券列表
// export const getcouponlistbyuser = param => {
//     return fly.getHeader('/api/charge/getcouponlistbyuser', param)
// }
export const getcouponlistbyuser = param => {
    return fly.postJson('/api/userCoupon/car/couponList', param)
}

//获取我的优惠券详情
// export const getcoupondetail = param => {
//     return fly.get('/api/charge/getcoupondetail', param)
// }
export const getcoupondetail = param => {
    return fly.postJson('/api/userCoupon/car/detail', param)
}

//获取电站电价列表
// export const getPriceList = param => {
//     return fly.get('/api/charge/getPriceList', param)
// }
export const getPriceList = param => {
    return fly.postJson('/api/noToken/clientStation/car/timePriceDetail', param)
}

//用户充值获取到的最大优惠券 
// export const getfavorablechargecouponbyuser = param => {
//     return fly.postHeader('/api/charge/getfavorablechargecouponbyuser', param)
// }
export const getfavorablechargecouponbyuser = param => {
    return fly.postJson('/api/appletWeiChatPay/car/getMaxUsableCoupon', param)
}

//支付下单
// export const addpayorder = param => {
//     return fly.postHeader('/api/charge/addpayorder', param)
// }
export const addpayorder = param => {
    return fly.postJson('/api/appletWeiChatPay/car/createOrder', param)
}

//获取微信支付数据签名验证字段列表
export const getpaysign = param => {
    return fly.get('/api/wx/getpaysign', param)
}

//修改头像
// export const editAvatar = param => {
//     return fly.postHeader('/api/charge/editAvatar', param)
// }
export const editAvatar = param => {
    return fly.postJson('/api/carOwner/car/updateAvatarUrl', param)
}

//修改性别 
// export const editGender = param => {
//     return fly.postHeader('/api/charge/editGender', param)
// }
export const editGender = param => {
    return fly.postJson('/api/carOwner/car/updateGender', param)
}

//修改昵称 
// export const editNickName = param => {
//     return fly.postHeader('/api/charge/editNickName', param)
// }
export const editNickName = param => {
    return fly.postJson('/api/carOwner/car/updateNickName', param)
}

//开始充电
export const chargeStart = param => {
    return fly.postHeader('/api/charge/chargeStart', param)
}

//结束充电
export const chargeStop = param => {
    return fly.postHeader('/api/charge/chargeStop', param)
}

//获取用户资金流水列表 
// export const getchargespendloglist = param => {
//     return fly.getHeader('/api/charge/getchargespendloglist', param)
// }
export const getchargespendloglist = param => {
    return fly.postJson('/api/userAccount/car/rechargeAccountList', param)
}

//获取资金流水详情 
// export const getchargespendlogdetail = param => {
//     return fly.getHeader('/api/charge/getchargespendlogdetail', param)
// }

//用户充电消费详情
export const getchargespendlogdetail = param => {
    return fly.postJson('/api/userAccount/car/chargeDetail', param)
}

//获取七牛token
export const GetQiniuToken = param => {
    return fly.get('/api/charge/GetQiniuToken', param)
}

//获取终端信息 
// export const getClientInfo = param => {
//     return fly.getHeader('/api/charge/getClientInfo', param)
// }
export const getClientInfo = param => {
    return fly.postJson('/api/clientStation/car/truckSpaceDetail', param)
}

//取消车位操作及返回结果 
export const cancelBinding = param => {
    return fly.postJson('/api/clientStation/car/cancelBinding', param)
}

//选定车位操作及返回结果   
export const bindingParking = param => {
    return fly.postJson('/api/clientStation/car/bindingParking', param)
}

//获取意见反馈详情
// export const getsuggestiondetail = param => {
//     return fly.getHeader('/api/charge/getsuggestiondetail', param)
// }
export const getsuggestiondetail = param => {
    return fly.postJson('/api/suggestion/car/info', param)
}

//获取用户余额
// export const getBalance = param => {
//     return fly.getHeader('/api/charge/getBalance', param)
// }
export const getBalance = param => {
    return fly.postJson('/api/userAccount/car/rechargeAccountList', param)
}

//用户充电消费详情  /api/userAccount/car/chargeDetail
export const chargeDetail = param => {
    return fly.postJson('/api/userAccount/car/chargeDetail', param)
}

// 用户账户充值详情 
export const rechargeDetail = param => {
    return fly.postJson('/api/userAccount/car/rechargeDetail', param)
}

//用户退款记录详情
export const refundDetail = param => {
    return fly.postJson('/api/userAccount/car/refundDetail', param)
}

//车主端 微信支付统一下单
export const unifiedOrder = param => {
    return fly.postJson('/api/appletWeiChatPay/car/unifiedOrder', param)
}

//车主端 微信支付统一下单成功后，查看支付是否成功接口
export const weiChatPayResult = param => {
    return fly.postJson('/api/appletWeiChatPay/car/weiChatPayResult', param)
}

//上传单个文件
export const uploadSingleFile = param => {
    return fly.postJson('/api/minioRest/uploadSingleFile', param)
}

//生成用户退款订单
export const createOrder = param => {
    return fly.postJson('/api/weiChatRefund/car/createOrder', param)
}

//通知微信服务端执行退款操作
export const weiChatRefund = param => {
    return fly.postJson('/api/weiChatRefund/car/weiChatRefund', param)
}

//获取用户资金信息
export const getAccount = param => {
    return fly.postJson('/api/weiChatRefund/car/getAccount', param)
}

//退款金额计算方式
export const formulaMode = param => {
    return fly.postJson('/api/weiChatRefund/car/formulaMode', param)
}

//首页查看充电状态
export const chargeStatus = param => {
    return fly.postJson('/api/clientStation/car/chargeStatus', param)
}

//手动停止充电
export const stopCharge = param => {
    return fly.postJson('/api/clientStation/car/stopCharge', param)
}

//插入充电枪后操作
export const plugInGun = param => {
    return fly.postJson('/api/clientStation/car/plugInGun', param)
}

//跳转到充电中
export const jumpToTimeData = param => {
    return fly.postJson('/api/clientStation/car/jumpToTimeData', param)
}

//开始充电
export const chargeBegin = param => {
    return fly.postJson('/api/clientStation/car/chargeBegin', param)
}

// //插入充电枪后操作
// export const autoStopCharge = param => {
//     return fly.postJson('/api/clientStation/car/autoStopCharge', param)
// }

//获取充电数据
export const getTimeData = param => {
    return fly.postJson('/api/clientStation/car/getTimeData', param)
}

//取消订单
export const cancelOrder = param => {
    return fly.postJson('/api/appletWeiChatPay/car/cancelOrder', param)
}

//跳转到用户选定车位界面
export const jumpToTruckSpaceDetail = param => {
    return fly.postJson('/api/clientStation/car/jumpToTruckSpaceDetail', param)
}

//查看充电结束后数据
export const getChargeLog = param => {
    return fly.postJson('/api/clientStation/car/getChargeLog', param)
}

//查看充电结束后数据
export const StationAutoListNoToken = param => {
    return fly.postJson('/api/noToken/userCoupon/car/StationAutoList', param)
}
