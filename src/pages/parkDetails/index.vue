<template>
  <div id="index" class="context parent">
    <div class="child">
      <div class="title">{{form.code}}</div>
      <ul class="box">
        <li class="item">
          <div class="hd">绑定充电枪</div>
          <div class="fd">{{form.gunCode}}</div>
          <div class="line"></div>
        </li>
        <li class="item">
          <div class="hd">充电方式</div>
          <div
            class="fd"
          >{{form.chargeType == '1' ? '直流快充' : form.chargeType == '2' ? '交流快充' : form.chargeType == '3' ? '交流慢充' : '未知类型'}}</div>
          <div class="line"></div>
        </li>
        <li class="item">
          <div class="hd">充电接口</div>
          <div class="fd">{{form.chargeInterfaceTypeStr}}</div>
          <div class="line"></div>
        </li>
        <li class="item">
          <div class="hd">功率</div>
          <div
            class="fd"
          >{{form.powerMin >= '0' ? form.powerMin + 'kw' : form.powerMin == undefined ? '0kw': '' }}{{form.powerMax >= '0' ? '~' + form.powerMax + 'kw' : form.powerMax == undefined ? '~0kw' : ''}}</div>
          <div class="line"></div>
        </li>
        <li class="item">
          <div class="hd">电压</div>
          <div
            class="fd"
          >{{form.voltageMin >= '0' ? form.voltageMin + 'V' : form.voltageMin == undefined ? '0V' : ''}}{{form.voltageMax >= '0' ? '~' + form.voltageMax +'V' : form.voltageMax == undefined ? '~0V' : ''}}</div>
          <div class="line"></div>
        </li>
        <li class="item">
          <div class="hd">辅源类型</div>
          <div class="fd">{{form.auxiliaryType != null ? form.auxiliaryType + "V" : '暂无数据'}}</div>
        </li>
      </ul>
      <div class="footer">
        <div class="f_hd">
          <p class="price">
            <img src="/static/img/cut/ic_price.png" alt="">&nbsp;充电价格
          </p>
          <div class="info">
            <p><span style="font-weight:600;">{{form.price}}元/度</span>（含服务费）</p>
            <p v-if="form.priceStatus == 0">全天价格统一</p>
            <p v-if="form.priceStatus == 1">
              {{form.priceDesc}}全站实行时段电费
              <span
                class="introduce"
                @click="skip('electricChargeIntroduction',form.stationId)"
              >价格详情>></span>
            </p>
          </div>
          <div class="line"></div>
        </div>
        <div class="f_fd" v-if="token != ''">
          <p class="balance">
            <img src="/static/img/cut/ic_balance.png" alt="">&nbsp;账户余额
          </p>
          <div class="info flex">
            <div class="price" style="color:#16BF6D;">{{balance}}元</div>
            <div class="recharge" @click="skip('pay')">充值</div>
          </div>
        </div>
      </div>
      <button
        class="btn"
        v-if="confirm == 0"
        :disabled="dis"
        @click="select('0')"
        v-model="checkPark"
      >{{checkPark}}</button>
      <!-- 5分钟 -->
      <div v-if="confirm == 1">
        <div class="tip">
          <div class="lt">
            <img src="/static/img/cut/ic_tips.png" alt="">
          </div>
          <p class="tip_desc">请尽快达到停车位：{{form.code}}，并进行充电，15分钟后未开始充电，车位将取消锁定</p>
        </div>
        <!-- <div class="tip">
          <div class="lt"><img src="/static/img/cut/ic_tips.png" alt=""></div>
          <p class="tip_desc">请进入车位充电。超过五分钟未插入充电枪或取消充电，系统将开始扣除您的停车费。</p>
        </div>-->
        <!-- <div class="timeOut">剩<span v-model="M">{{M}}</span>分<span v-model="S">{{S}}</span>秒</div> -->
        <button class="btn cancel" @click="select('1')">取消充电</button>
      </div>
      <!-- end -->
      <!-- 插入电枪 -->
      <div v-if="confirm == 2">
        <div class="tip">
          <div class="lt">
            <img src="/static/img/cut/ic_tips.png" alt="">
          </div>
          <div class="tip_desc">
            <p style="color:#999999;margin:0 0 10rpx 0;">您当前已插入位于</p>
            <p>{{socketMsg.address}}停车场{{socketMsg.lotCode}}号充电桩。</p>
          </div>
        </div>
        <div class="insert_title">您确认要开始付费充电吗？</div>
        <button class="btn mg40_btn" @click="select('2',form.gunId,form.id)">确定并充电</button>
        <button class="btn cancel" @click="select('1')">不是我的车，我要重选车位</button>
      </div>
      <!-- 2 剩余电量小于等于10 -->
      <div v-if="confirm == 3">
        <div class="tip">
          <p style="color:#FF4E4D;font-size:24rpx;">* 账户余额需大于10元才能开始充电，请先充值</p>
        </div>
        <button class="btn" @click="skip('pay')">去充值</button>
      </div>
    </div>
    <!-- 1 尚未登录不能选择车位提示 -->
    <div v-if="token == ''" class="dialog" style="z-index:9999">
      <div>
        <ul class="tip_flex">
          <li>
            <img src="https://testapi.xmnewlife.com/car/images/cut/swdl.png" alt="">
          </li>
          <li>您当前尚未登录</li>
          <li>无法使用喵喵充电的产品服务</li>
        </ul>
      </div>
      <button class="btn cancel" @click="skip('loginSelect')">立即登录</button>
    </div>
    <!-- 3 提示当前有人在用 -->
    <div v-if="use == true" class="dialog" style="z-index:99">
      <div>
        <ul class="tip_flex">
          <li class="tip">您下手慢了，该车位已被其他用户抢先预定请重新选一个</li>
        </ul>
      </div>
      <button class="btn cancel" @click="reSkip('stationDetails')">重选车位</button>
    </div>
    <!-- 4 正在打开车闸 -->
    <div v-if="confirm == 4" class="dialog" style="z-index:19;background:rgba(0,0,0,0.6)">
      <div class="loading">
        <img src="https://testapi.xmnewlife.com/car/images/cut/ic_loading.gif" alt="">
      </div>
    </div>
  </div>
</template>
<script>
import utils from "@/utils/index";
import { mapState, mapActions } from "vuex";
import {
  stationDetail,
  bindingParking,
  chargeStatus,
  stopCharge,
  cancelBinding,
  chargeBegin,
  getClientList,
  getStationtInfo,
  getClientInfo,
  getUcCenter,
  chargeStart,
  chargeStop,
  getBalance,
  jumpToTruckSpaceDetail,
} from "@/api/api";

export default {
  data() {
    return {
      id: "",
      tableData: [],
      form: {},
      open: true,
      use: false,
      insert: false,
      confirm: 0,
      confirmInsert: false,
      confirmCancel: false,
      dis: false,
      settle: true, //超过5分钟是否已结算
      timer: "",
      balance: "",
      M: "5",
      S: "00",
      checkPark: "选定该车位",
      chargeObj: {},
      socketOpen: false,
      socketPath: '',
      socketMsg: '',
      errMsg: '',
    };
  },
  computed: {},
  onShow() {
    var that = this;
    // 终端详情
    this.id = this.$root.$mp.query.id;
    
    if (this.token != "") {
      this.getClientInfoFun();
      setTimeout(()=>{
        that.getClientInfoFun();
      },15*60*1000)
    }
    console.log("this.confirm", this.confirm ,"this.use",this.use);
    // this.countDown()//倒计时
    setTimeout(()=> {
      console.log("this.confirm1500", that.confirm,"this.use1500",this.use );
    },1500)
    
    //监听 WebSocket 连接打开事件
    wx.onSocketOpen(res => {
      console.log("监听 WebSocket 连接打开事件", res);
      // wx.closeSocket()
      that.socketOpen = true;
      that.sendSocketMessageFun();
    });
    // 监听 WebSocket 接受到服务器的消息事件
    wx.onSocketMessage(res => {
      // this.socketMsg = res.data
      if (
        res.data == undefined ||
        res.data == "连接成功" ||
        res == "" ||
        res.data == "undefined"
      ) {
        // this.socketMsg = res
        this.socketMsg = res + "1111";
        console.log( "监听 WebSocket 接受到服务器的消息事件1",this.socketMsg);
      } else {
        var obj ={};
        var req = res.data.split(",");
        req.forEach((item,index) => {
          item = item.replace('"/g', "");
          obj[index] = item.split(':')
        });
        var objTrue={};
        for (const key in obj) {
          //console.log(obj[key]);
          objTrue[obj[key][0].substring(1,obj[key][0].length-1)] = obj[key][1].replace(/\"/g, "");
        }
        this.socketMsg = objTrue
        if(this.socketMsg.insert == 'true' || this.socketMsg.insert == true) {
          that.insert = true
          that.confirm = 2
          console.log('insert',this.socketMsg.insert)
        }else{
          console.log('insert,this.socketMsg.insert')
        }
        console.log('监听 WebSocket 接受到服务器的消息事件2',this.socketMsg,typeof(this.socketMsg))
      }
    });
    // 监听 WebSocket 连接关闭事件
    wx.onSocketClose(res => {
      console.log("WebSocket 已关闭！", errMsg);
    });
  },
  updated() {
    // if (
    //   this.confirmCancel == true ||
    //   this.insert == true ||
    //   this.confirmInsert == true
    // ) {
    //   clearInterval(this.timer);
    //   wx.removeStorageSync("beforeTime");
    // }
  },
  created() {
    this.open = true;
    this.use = false;
    this.insert = false;
    this.confirm = 0;
    this.confirmInsert = false;
    this.confirmCancel = false;
    this.dis = false;
    this.settle = true;
  },
  onUnload() {
    // wx.closeSocket()
    console.log("销毁");
  },
  async onPullDownRefresh() {
    wx.setNavigationBarTitle({
      title: "刷新中"
    }); //动态设置当前页面的标题。
    wx.showNavigationBarLoading(); //在当前页面显示导航条加载动画。
    // this.onShow();//对onShow方法进行了重新加载
    if (this.token != "") {
      this.getClientInfoFun();
    }
    // this.countDown()//倒计时
    setTimeout(() => {
      wx.stopPullDownRefresh(); //停止当前页面下拉刷新。
      wx.setNavigationBarTitle({
        title: "车位详情"
      }); //动态设置当前页面的标题。
      wx.hideNavigationBarLoading(); //在当前页面隐藏导航条加载动画
    }, 1000);
  },
  components: {},
  methods: {
    // 初始化数据
    init() {
      var that = this
      if (this.insert == true) {
        this.confirm = 2;
      }
      // 获取车位状态
      chargeStatus({}).then(res => {
        console.log('获取充电状态'.res.data.data)
        if (res.data.code == 200) {
          
          if (res.data.data != "") {
            console.log('处于充电状态'.res.data.data)
            this.confirm = -1;
            if(res.data.data.status == 1) {
              this.confirm = -1;
              wx.redirectTo({
                url: "/pages/search/chargeMode/chargeing/main?gunId=" + that.form.gunId  + "&lotId=" + that.form.id + "&orderSn=" + res.data.data.orderSn
              });
            }
          } else {
            
          }
        } else {//未在充电状态
          // this.confirm = -1;
        }
      });
      console.log("this.balance", this.balance);
      if (this.balance < 10 || this.balance == 10) {
        this.confirm = 3;
      }
      // if(this.open == false){
      //   this.checkPark = "正在打开"
      //   this.confirm = 4
      // }else{
      //   this.checkPark = "选定该车位"

      // }
      // if(this.settle == true){
      //   clearInterval(this.timer)
      //   wx.removeStorageSync('beforeTime');
      // }
    },
    //getClientInfo
    getClientInfoFun() {
      getClientInfo({
        id: this.id
      }).then(res => {
        this.form = res.data.data;
        this.balance = this.form.balance.toFixed(4);
        this.form.price = this.form.price.toFixed(4);
        console.log("枪ID.gunId", this.form.gunId);
        console.log("车位详情：", res.data.data);
        jumpToTruckSpaceDetail().then(res => {
          console.log("回到车位详情：", res.data.data);
          if(res.data.code == 200) {
            console.log('用户有选定车位时重新进入该车位')
            //用户有选定车位时重新进入该车位
            if(this.form.gunId == res.data.data.gunId){
              this.confirm = 1
              // this.socketPath =
              // "ws://182.148.15.148:8990/api/websocket/" +
              // utils.wxGetStorage("userInfo").id +
              // "/" + this.form.gunId;
              this.socketPath =
              "wss://testapi.xmnewlife.com/api/websocket/" +
              utils.wxGetStorage("userInfo").id +
              "/" +
              this.form.gunId;
              if (this.token != "") {
                this.websocket(this.socketPath);
              }
            }else{//用户有选定车位时进入其它车位
              this.confirm = -1
              this.use = false;
            }
          }else{//用户未选择车位
            this.confirm = 0
            this.use = false;
            console.log("没有选车位回到车位详情：this.confirm", this.confirm );
          }
          this.init();
          console.log("this.confirm", this.confirm );
        })
        
      });
    },
    //倒计时
    countDown() {
      // console.log("timer",utils.wxGetStorage("timer"))
      if (this.confirmInsert == false || this.confirmCancel == false) {
        // wx.removeStorageSync('beforeTime');
        //若未插枪或取消充电到期时间未创建，此时创建到期时间戳
        if (utils.wxGetStorage("beforeTime") != false) {
          //已创建
          console.log(
            "timer",
            utils.wxGetStorage("beforeTime") + 1 * 60 * 5 * 1000 + 3000
          ); //到期时间戳 5分钟
          if (
            utils.wxGetStorage("beforeTime") + 1 * 60 * 1000 >
            Date.parse(new Date())
          ) {
            //若到期时间戳大于当前时间戳才执行倒计时，否则倒计时置0
            var timeout = utils.wxGetStorage("beforeTime") + 1 * 60 * 5 * 1000;
            this.timer = setInterval(() => {
              //倒计时
              // console.log(timeout - Date.parse(new Date()))   //结束时间减当前时间的时间戳   获得倒计时毫秒数
              let count = timeout - Date.parse(new Date());
              if (count <= 0) {
                clearInterval(this.timer);
                // wx.removeStorageSync('beforeTime');
                // console.log("countqingchu")
              }
              this.ToTime(count);
              // console.log("23433",this.ToTime(count))
            }, 1000);
          } else {
            let count = 0;
            this.ToTime(count);
            console.log("else", this.ToTime(count));
          }
        } else {
          //未创建
          utils.wxSetStorageSync("beforeTime", Date.parse(new Date()));
        }
      } else {
        //插枪或取消充电后清除倒计时
        clearInterval(this.timer);
        wx.removeStorageSync("beforeTime");
        console.log(this.confirmCancel);
      }
    },
    // 充电选择
    select(type) {
      var that = this;
      // 选定车位
      if (type == 0) {
        // this.confirm = 1  //显示5分钟倒计时
        // this.countDown() //倒计时
        bindingParking({
          id: this.id
        }).then(res => {
          if (res.data.code == 200) {
            if (res.data.data.status == 1 && res.data.data.isNeedCharge == 1) {
              //不需要充值车位可用
              this.confirm = 1;
              this.use = false;
            } else if (
              res.data.data.isNeedCharge == 0 &&
              res.data.data.status == 1
            ) {
              //需要充值车位可用
              this.confirm = 3;
              this.use = false;
            } else if (
              res.data.data.isNeedCharge == 0 &&
              res.data.data.status == 0
            ) {
              //需要充值车位不可用
              this.use = true;
            } else {
              this.use = true;
            }
            // this.socketPath =
            // "ws://182.148.15.148:8990/api/websocket/" +
            // utils.wxGetStorage("userInfo").id +
            // "/" +
            // that.form.gunId; 
            this.socketPath =
            "wss://testapi.xmnewlife.com/api/websocket/" +
            utils.wxGetStorage("userInfo").id +
            "/" +
            that.form.gunId;
            if (that.token != "") {
              that.websocket(this.socketPath);
            }
          } else if (res.data.code == 600204) {
            this.confirm = -1;
          }
        });
      }
      /* 取消充电 */

      if (type == 1) {
        wx.showModal({
          title: "取消充电",
          content: "是否取消充电？",
          confirmText: "确认",
          cancelText: "取消",
          success: function(res) {
            console.log("confirm", res);
            if (res.confirm) {
              cancelBinding({
                id: that.id
              }).then(res => {
                if(res.data.code == 200){
                  that.confirm = 0;
                }else{
                  utils.showDialog(res.data.message)
                }
              });
              wx.redirectTo({
                url: "/pages/stationDetails/main"
              });
            } else {
              console.log("用户点击辅助操作");
            }
          }
        });
        // clearInterval(this.timer)
        // wx.removeStorageSync('beforeTime');
        // this.M = 5;
        // this.S = '00'
      }
      if (type == 2) {
        wx.showModal({
          title: "开始充电",
          content: "是否开始充电？",
          confirmText: "确认",
          cancelText: "取消",
          success: function(res) {
            console.log("confirm", res);
            if (res.confirm) {
              that.confirm = 0;
              that.confirmInsert = true;
              chargeBegin({
                id: that.form.id,
                // orderSn: "",//确认充电时不传
                gunId: that.form.gunId,
                status: 1
              }).then(res => {
                console.log("229res", res.data);
                if(res.data.code == 200) {
                  utils.wxSetStorageSync("chargeInfo",res.data.data)
                  // that.chargeObj = res.data.data;
                  // if (that.$root.$mp.appOptions.query.chargeObj != undefined) {
                  //   that.$root.$mp.appOptions.query.chargeObj = "";
                  //   that.$root.$mp.appOptions.query.chargeObj = that.chargeObj;
                  // } else {
                  //   that.$root.$mp.appOptions.query.chargeObj = that.chargeObj;
                  // }
                  wx.redirectTo({
                    url: "/pages/search/chargeMode/chargeing/main?gunId=" + that.form.gunId  + "&lotId=" + that.form.id + "&orderSn=" + res.data.data.orderSn
                  });
                }else{
                  utils.showDialog(res.data.message)
                }
              });
            } else {
              console.log("用户点击辅助操作");
            }
          }
        });
        
        // console.log(
        //   "stationId",
        //   this.form.stationId,
        //   "GunId0",
        //   this.form.gunId
        // );
        
      }
      if (type == 3) {
        wx.redirectTo({
          url: "/pages/pay/main"
        });
      }
    },
    ToTime(timestamp) {
      // console.log(timestamp)
      var m = parseInt(timestamp / (60 * 1000));
      this.M = m;
      var s = (timestamp % (1000 * 60)) / 1000;
      if ((timestamp % (1000 * 60)) / 1000 < 10) {
        s = "0" + (timestamp % (1000 * 60)) / 1000;
      }
      this.S = s;
      return m + "分" + s + "秒";
    },
    skip(type, params) {
      // if(type == 'electricChargeIntroduction'){
      //   var chargePrice = ''
      //   console.log('params',params)
      //   stationDetail({
      //     id:params
      //   }).then(res =>{
      //     if(res.data.code == 200) {
      //       chargePrice = res.data.data.chargePrice
      //       // console.log("chargePrice",res.data.data,'params',params)
      //       var queryObj = JSON.stringify([{id:params},{chargePrice:chargePrice}])
      //       wx.navigateTo({
      //         url: "/pages/" + type + "/main?queryObj=" + queryObj
      //       });
      //     }
      //   })
      // }else{
      //   wx.redirectTo({
      //     url: "/pages/"  + type + "/main?id=" + params
      //   })
      // }
      wx.redirectTo({
        url: "/pages/" + type + "/main?id=" + params
      });
    },
    reSkip(type, params) {
      wx.redirectTo({
        url: "/pages/" + type + "/main?id=" + params
      });
    },
    sendSocketMessageFun(msg) {
      if (this.socketOpen) {
        wx.sendSocketMessage({
          data: msg, //需要发送的消息
          success: res => {
            console.log("消息发送成功", res);
          },
          fail: err => {
            console.log("消息发送错误！！" + err);
          }
        });
      } else {
        // socketMsgQueue.push(msg)
      }
    },
    websocket(url, data) {
      let SocketTask;
      const that = this;
      SocketTask = wx.connectSocket({
        url: url,
        header: { "content-type": "application/x-www-form-urlencoded" }, //java后端需要设置此项才能正常通信
        method: "post",
        success: res => {
          console.log("WebSocket connect", res);
        },
        fail: err => {
          console.log("出现错误啦！！" + err);
          wx.showToast({
            title: "网络异常！"
          });
        }
      });
    }
  },
  watch: {},
  computed: {
    ...mapState(["token"])
  }
};
</script>

<style scoped lang="scss">
@import "../../../static/assets/scss/parkDetails/index.scss";
</style>
