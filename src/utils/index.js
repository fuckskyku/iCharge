export function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

//微信异步缓存存储
/**
 * 
 * @param {存储的key}}}} key 
 * @param {存储的value}} data 
 * @param {存储成功执行的函数回调}} fn 
 */


export function wxSetStorage(key, data, fn) {
  wx.setStorage({
    key: key,
    data: data,
    success: function (res) {
      if (res.errMsg == "setStorage:ok") {
        if (fn == null) {
          return;
        } else {
          fn();
        }
      }
    },
    fail: function () {
      console.log("保存失败")
    }
  })
}

/**
 * 
 * @param {存储key} key 
 * @param {存储value} data 
 * 微信同步存储数据
 */
export function wxSetStorageSync(key, data) {
  wx.setStorageSync(key, data);
}

//微信同步缓存获取
/**
 * 
 * @param {获取值的key} keyval 
 */
export function wxGetStorage(keyval) {
  if (wx.getStorageSync(keyval) == "") {
    return false
  } else {
    return wx.getStorageSync(keyval)
  }
}


/**
 *
 * @param {移除key} key
 * 微信同步从本地缓存中移除指定 key
 */
export function removeStorageSync(key) {
  wx.removeStorageSync(key);
}


//提示弹出框
/**
 * 
 * @param {弹出的标题} keyval 
 */
export function showDialog(keyval, fn) {
  wx.showToast({
    title: keyval,
    icon: 'none',
    duration: 3000,
    mask: true
  })
  if (fn != null) {
    setTimeout(() => {
      fn();
    }, 3000)
  }
}

//替换图片路径
export function formatImgUrl(imgUlr) {
  if (imgUlr != "" && imgUlr != "undefined" && imgUlr) {
    if (this.url(imgUlr)) {
      return imgUlr;
    } else {
       return "http://upload.mseenet.com" + imgUlr;
    }
  }
  return '';
}

/**
 * 格式化时间 
 * @param {String} date 原始时间格式
 * 格式后的时间：yyyy-mm-dd hh:mm:ss
 **/
export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('-')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}
export function formatTimeMin(dateTimeStamp) {
  var date = new Date(dateTimeStamp);
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()


  const t1 = [year, month, day].map(formatNumber).join('-')
  const t2 = [hour, minute].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

//格式化 转成日期部分
export function formatTimeDate(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const t1 = [year, month, day].map(formatNumber).join('-')

  return `${t1}`
}
//格式化 转成日期部分+星期几
export function formatTimeDateDay(dateTimeStamp) {
  var date=this.transLocalTime(dateTimeStamp);
  var weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const day1 = weekDay[date.getDay()]
  const t1 = [year, month, day].map(formatNumber).join('-')

  return `${t1} ${day1}`
}


export function transLocalTime(t) {
  return new Date(t);
}

//时间转化为几分钟前
export function formatTimeDiff(dateTimeStamp) {
  var result = "";
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var halfamonth = day * 15;
  var month = day * 30;
  var now = new Date().getTime();
  var diffValue = now - dateTimeStamp;
  if (diffValue < 0) {
    return;
  }
  var monthC = diffValue / month;
  var weekC = diffValue / (7 * day);
  var dayC = diffValue / day;
  var hourC = diffValue / hour;
  var minC = diffValue / minute;
  if (monthC >= 1) {
    result = "" + parseInt(monthC) + "月前";
  } else if (weekC >= 1) {
    result = "" + parseInt(weekC) + "周前";
  } else if (dayC >= 1) {
    result = "" + parseInt(dayC) + "天前";
  } else if (hourC >= 1) {
    result = "" + parseInt(hourC) + "小时前";
  } else if (minC >= 1) {
    result = "" + parseInt(minC) + "分钟前";
  } else
    result = "刚刚";
  return result;
}




/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * 例子：
 * (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * (new Date()).format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */
Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
/**
 * 将String类型解析为Date类型.
 * parseDate('2006-1-1')
 * parseDate('2006-1-1 15:14:16')
 * parseDate('2006-1-1 15:14:16.254')
 */
export function parseDate(str) {
  if (typeof str == 'string') {
    var results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) *$/);
    if (results && results.length > 3)
      return new Date(parseInt(results[1]), parseInt(results[2]) - 1, parseInt(results[3]));
    results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2}) *$/);
    if (results && results.length > 6)
      return new Date(parseInt(results[1]), parseInt(results[2]) - 1, parseInt(results[3]), parseInt(results[4]), parseInt(results[5]), parseInt(results[6]));
    results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2})\.(\d{1,9}) *$/);
    if (results && results.length > 7)
      return new Date(parseInt(results[1]), parseInt(results[2]) - 1, parseInt(results[3]), parseInt(results[4]), parseInt(results[5]), parseInt(results[6]), parseInt(results[7]));
  }
  return null;
}


/**
 * 验证必填元素
 */
export function required(value, param) {
  if (!this.depend(param)) {
    return 'dependency-mismatch'
  } else if (typeof value === 'number') {
    value = value.toString()
  } else if (typeof value === 'boolean') {
    return !0
  }

  return value.length > 0
}
/**
 * 验证电子邮箱格式
 */
export function email(value) {
  return this.optional(value) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)
}
/**
 * 验证手机格式
 */
export function tel(value) {
  return this.optional(value) || /^1[3456789]\d{9}$/.test(value)
}
/**
 * 验证URL格式
 */
export function url(value) {
  return this.optional(value) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value)
}
/**
 * 验证日期格式
 */
export function date(value) {
  return this.optional(value) || !/Invalid|NaN/.test(new Date(value).toString())
}
/**
 * 验证ISO类型的日期格式
 */
export function dateISO(value) {
  return this.optional(value) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value)
}
/**
 * 验证十进制数字
 */
export function number(value) {
  return this.optional(value) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value)
}
/**
 * 验证整数
 */
export function digits(value) {
  return this.optional(value) || /^\d+$/.test(value)
}
/**
 * 验证身份证号码
 */
export function idcard(value) {
  return this.optional(value) || /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value)
}
/**
 * 验证两个值的内容是否相同
 */
export function equalTo(value, param) {
  return (this.optional(value) && this.optional(param)) || value == param
}
/**
 * 验证是否包含某个值
 */
export function contains(value, param) {
  return this.optional(value) || value.indexOf(param) >= 0
}
/**
 * 验证最小长度
 */
export function minlength(value, param) {
  return this.optional(value) || value.length >= param
}
/**
 * 验证最大长度
 */
export function maxlength(value, param) {
  return this.optional(value) || value.length <= param
}
/**
 * 验证一个长度范围[min, max]
 */
export function rangelength(value, param) {
  return this.optional(value) || (value.length >= param[0] && value.length <= param[1])
}
/**
 * 验证最小值
 */
export function min(value, param) {
  return this.optional(value) || value >= param
}
/**
 * 验证最大值
 */
export function max(value, param) {
  return this.optional(value) || value <= param
}
/**
 * 验证一个值范围[min, max]
 */
export function range(value, param) {
  return this.optional(value) || (value >= param[0] && value <= param[1])
}
/**
 * 判断规则依赖是否存在
 */
export function depend(param) {
  switch (typeof param) {
    case 'boolean':
      param = param
      break
    case 'string':
      param = !!param.length
      break
    case 'function':
      param = param()
    default:
      param = !0
  }
  return param
}

/**
 * 判断输入值是否为空
 */
export function optional(value) {
  return !this.required(value) && 'dependency-mismatch'
}

/**
 * 数组对象对比
 */
export function arrCompare(property){
  return function(a,b){
      var value1 = a[property];
      var value2 = b[property];
      return value1 - value2;
  }
}

export default {
  formatNumber,
  formatTime,
  formatTimeMin,
  formatTimeDate,
  formatTimeDateDay,
  wxSetStorage,
  wxGetStorage,
  wxSetStorageSync,
  showDialog,
  formatImgUrl,
  formatTimeDiff,
  transLocalTime,
  parseDate,
  /* 验证 */
  required,
  tel,
  email,
  url,
  date,
  dateISO,
  number,
  digits,
  idcard,
  equalTo,
  contains,
  minlength,
  maxlength,
  rangelength,
  min,
  max,
  range,
  depend,
  optional,  
  /* 验证 结束*/
  arrCompare,

}
