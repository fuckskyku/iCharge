<template>
  <div id="index">
    <div class="chargeing">
      <img src="https://testapi.xmnewlife.com/car/images/cut/img_bg.png" alt="">
      <!-- <img src="https://testapi.xmnewlife.com/car/images/cut/chargeing.png" alt=""> -->
      <div class="charge_bg">
        <img src="https://testapi.xmnewlife.com/car/images/cut/c3.gif" alt="">
        <!-- <img src="/static/img/cut/img_round.png" alt="" class="rotate"> -->
      </div>
      <div class="energy">
        <div class="currEnergy" style="color:#14BF6D">{{currEnergy ? currEnergy : "0"}}%</div>
      </div>
      <div class="content" style="color:#14BF6D">
        <div class="title">当前已充电</div>
        <div class="subTitle" v-model="timeObj">{{timeObj}}</div>
      </div>
    </div>
    <div class="footer">
      <div class="info">
        <div class="energyInfo pdl20">
          <div>
            <p class="subTitle">本次已为您充电</p>
            <p class="subEnergy"><span>{{DEG ? DEG : "0"}}</span>度</p>
          </div>
        </div>
        <div class="vertical"></div>
        <div class="energyInfo pdr20">
          <div>
            <p class="subTitle">您的爱车当前电量</p>
            <p class="subEnergy"><span>{{currEnergy ? currEnergy : "0"}}</span>%</p>
          </div>
        </div>
      </div>
      <div class="address">
        <p><img src="/static/img/cut/ic_address2.png" alt="">您的爱车当前停在</p>
        <p>{{clientObj.address}}停车场{{clientObj.gunCode}}号充电桩。</p>
        <!-- <p>{{form.staName}}停车场{{form.clientCode}}号充电桩。</p> -->
      </div>
      <!-- <div class="address">您的爱车当前停在{{form.staName}}停车场{{form.clientCode}}号充电桩。</div> -->
      <div class="tip">充电完成后喵喵充电将对您进行提示</div>
      <button class="btn cancel" @click="submit('handle')">立刻停止充电</button>
    </div>
  </div>
</template>
<script>
import utils from "@/utils/index";
import NumberAnimate from "@/utils/numberAnimate";
import { sendNoTokenSms } from '@/api/api'  
import { mapState, mapActions } from 'vuex'
import { getClientInfo, getTimeData, jumpToTimeData, stopCharge } from '@/api/api'

export default {
  data() {
    return {
      gunId: "",
      lotId: '',
      orderSn: '',
      currEnergy: 0,                     //剩余电量
      DEG: 0,                            //度数
      timeObj: '',
      timers: '',                        //计时器
      hour: '0',
      minute: '00',
      clientObj: {},
      chargeObj: {},
      form: {},
      //动画参数
      currEnergyTimer: '',
      DEGTimer: '',
      currEnergyComplete:'',
      DEGComplete:'',
      socketOpen: false,
    };
  },
  computed: {
    ...mapState(["token"])
  },
  onLoad () {
    console.log("this.$root.$mp.query",this.$root.$mp.query) 
    this.lotId = this.$root.$mp.query.lotId
    this.gunId = this.$root.$mp.query.gunId        
    this.orderSn = this.$root.$mp.query.orderSn        
    this.chargeObj = this.$root.$mp.appOptions.query.chargeObj
    console.log("this.chargeObj",this.$root.$mp.appOptions.query.chargeObj)
    var that = this;
    var socketMsg = "";
    var errMsg = "";
      // let socketPath =
      // "ws://47.106.121.72:8990/websocket/" +
      // utils.wxGetStorage("userInfo").id +
      // "/" +
      // utils.wxGetStorage("chargeInfo").clientGunId;
      let socketPath =
      "ws://125.70.163.71:8990/api/websocket/" +
      utils.wxGetStorage("userInfo").id +
      "/" +
      utils.wxGetStorage("chargeInfo").clientGunId;
      that.websocket(socketPath);
    //监听 WebSocket 连接打开事件
    wx.onSocketOpen(res => {
      console.log("监听 WebSocket 连接打开事件", res);
      // wx.closeSocket()
      that.socketOpen = true;
      that.sendSocketMessageFun();
    });
    // var ss = '{"gunId":19,"insert":true,"status":1}';
    // console.log("监听 ss", JSON.parse(ss));
    // 监听 WebSocket 接受到服务器的消息事件
    wx.onSocketMessage(res => {
      // socketMsg = res.data
      if (
        res.data == undefined ||
        res.data == "连接成功" ||
        res == "" ||
        res.data == "undefined"
      ) {
        // socketMsg = res
        socketMsg = res + "1111";
        console.log(
          "监听 WebSocket 接受到服务器的消息事件1",
          socketMsg,
          typeof socketMsg
        );
      } else {
        var obj ={};
        var req = res.data.split(",");
        req.forEach((item,index) => {
          // item = item;
          // item = item.replace(/"/g, ""); // /Microsoft/g
          obj[index] = item.split(':')
        });
        var objTrue={};
        for (const key in obj) {
          //console.log(obj[key]);
          objTrue[obj[key][0].substring(1,obj[key][0].length-1)] = obj[key][1].replace(/\"/g, "");
        }
        socketMsg = objTrue
        if(socketMsg.stopType == 2 || socketMsg.stopType == 3 || socketMsg.stopType == 4 || socketMsg.stopType == 5) {
          wx.redirectTo({
            url: "/pages/search/chargeMode/countCharge/main?id=" + socketMsg.orderSn  //临时中止手动结束
          });
        }
        if(socketMsg.status == '3' || socketMsg.status == '2') {
          this.clientObj = socketMsg
          this.currEnergy = this.clientObj.percentage 
          this.timeObj = this.clientObj.chargeTime  
          this.DEG = this.clientObj.chargeEnergy  
          //  this.clientObj.address = this.clientObj.address.replace('"/g', "");
          // utils.wxSetStorageSync("chargeInfo",res.data.data)
          console.log('socketMsg',this.clientObj)
        }else{
          // console.log('insert,socketMsg.insert')
        }
        console.log('监听 WebSocket 接受到服务器的消息事件2',socketMsg,typeof(socketMsg))
      }
    });
    // 监听 WebSocket 连接关闭事件
    wx.onSocketClose(res => {
      console.log("WebSocket 已关闭！", errMsg);
    });
    // getClientInfo({
    //   id: this.id
    // }).then(res=>{
    //   this.form = res.data.data
    // })
    // this.animate()
    // if(this.currEnergy == 100){
    //   clearTimeout(this.timers)  //若电已充满清除计时器  
    // }
    // this.clock()
  },
  mounted() {
    // 获取充电数据
    if(utils.wxGetStorage("index") == true) {
      this.jumpToTimeDataFun()
    }
    getTimeData({
      gunId: utils.wxGetStorage('chargeInfo').clientGunId,
      lotId: utils.wxGetStorage('chargeInfo').clientGunId,
      orderSn: utils.wxGetStorage('chargeInfo').orderSn
    }).then(res =>{
      if(res.data.code == 200) {
        this.clientObj = res.data.data
        console.log('获取充电数据',this.clientObj)
        this.currEnergy = this.clientObj.percentage 
        this.timeObj = this.clientObj.chargeTime  
        this.DEG = this.clientObj.chargeEnergy  
        if(res.data.data.status == 1) {//离线
          
        }else if(res.data.data.status == 2) {//空闲中(暂定此状态包含完成状态)
          wx.redirectTo({
            url: "/pages/search/chargeMode/countCharge/main?id=" + res.data.data.orderSn  //临时中止手动结束
          });
        }else if(res.data.data.status == 3) {//连接中
          
        }else if(res.data.data.status == 4) {//充电中

        }else if(res.data.data.status == 5) {//被预约
          wx.redirectTo({
            url: "/pages/parkDetails/main?id=" + res.data.data.id  //预约结束
          });
        }else if(res.data.data.status == 6) {//排队中

        }
      }else{

      }
    })
    
  },
  components: {

  },
  methods: {
    ...mapActions([
      'setChargeing'
    ]),
    jumpToTimeDataFun() {
      utils.wxSetStorageSync("index",false)
      jumpToTimeData({
        clientGunId: utils.wxGetStorage('chargeInfo').clientGunId,
        clientId: utils.wxGetStorage('chargeInfo').clientId,
        parkingLotId: utils.wxGetStorage('chargeInfo').parkingLotId,
        id: utils.wxGetStorage('chargeInfo').id,
        orderId: utils.wxGetStorage('chargeInfo').orderId,
        orderSn: utils.wxGetStorage('chargeInfo').orderSn,
        stationId: utils.wxGetStorage('chargeInfo').stationId,
        status: utils.wxGetStorage('chargeInfo').status,
      }).then(res=> {
        if(res.data.code == 200) {
          utils.wxSetStorageSync("chargeInfo",res.data.data)
          utils.wxSetStorageSync("index",false)

        }else{

        }
      })
    },
    animate() { 
      //当前电量
      let currEnergy = 100;
      this.currEnergyTimer = new NumberAnimate({
        from: currEnergy,//开始时的数字
        speed: 1000*60,// 总时间
        refreshTime: 500,// 刷新一次的时间
        decimals: 2,// //#region 小数点后的位数
        onUpdate:()=>{// 更新回调函数   
          this.currEnergy = this.currEnergyTimer.tempValue
        },
        onComplete:()=>{// 完成回调函数
          this.currEnergyComplete = " 完成了"      
        }
      });
      //充入度数
      let DEG = 20.22;
      this.DEGTimer = new NumberAnimate({
        from: DEG,//开始时的数字
        speed: 1000*60,// 总时间
        refreshTime: 500,// 刷新一次的时间
        decimals: 2,// //#region 小数点后的位数
        onUpdate:()=>{// 更新回调函数   
          this.DEG = this.DEGTimer.tempValue
        },
        onComplete:()=>{// 完成回调函数
          this.DEGComplete = " 完成了"      
        }
      });
    },
    clock() {
      var that = this
      var second =  ''
      if(utils.wxGetStorage("startTime") == false){  //开始充电时首次创建开始时间戳
        utils.wxSetStorageSync("startTime",Date.parse(new Date()))     
        console.log("1122",utils.wxGetStorage("startTime")) 
        this.timers = setInterval(()=> {
          second = Date.parse(new Date()) - utils.wxGetStorage("startTime")  //时间毫秒数 = 当前时间 - 开始时间 
          that.timeObj = that.ToTime(second);  //转化成 'x时x分'
        },1000);                                                   
      }else{  //已存在开始时间时
        if(this.currEnergy == 100){ //电量满时清空计时器
          clearTimeout(that.timers)
          wx.removeStorageSync('startTime');
        }else{ //电量未满时继续计时
          this.timers = setInterval(()=>{
            second =  Date.parse(new Date()) - utils.wxGetStorage("startTime")
            that.timeObj = that.ToTime(second);
          },1000);   
        }       
      }
    },
    ToTime(timestamp) {
      var minutes = parseInt((timestamp % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = (timestamp % (1000 * 60)) / 1000;
      if((timestamp % (1000 * 60)) / 1000 < 10){
        seconds = "0" + (timestamp % (1000 * 60)) / 1000;
      }
      this.hour = minutes
      this.minute = seconds
      return minutes + " 小时 " + seconds + " 分钟";
      // var m = parseInt(timestamp / 60 % 60)
      // var h = parseInt(timestamp / 60 / 60)
      // if((parseInt(timestamp / 60 % 60)) < 10){
      //   m = "0" + (timestamp % (1000 * 60) / 1000) 
      // }
      // this.hour = h
      // this.minute = m
      // return m + "小时" + s + "分钟";
    },
    submit(type) {
      var that = this
      wx.showModal({
        title: '提示',
        content: '您确定要现在就停止充电吗？',
        confirmText: "取消",
        cancelText: "确定",
        // showCancel: false,
        success: function (res) {
          console.log(res);
          if (res.confirm) {
            console.log('取消')
          }else{
            that.currEnergyTimer = ''
            that.DEGTimer = ''
            stopCharge({
              gunId: utils.wxGetStorage('chargeInfo').clientGunId, 
              id: utils.wxGetStorage('chargeInfo').clientGunId,
              status: 2, 
              orderSn: utils.wxGetStorage('chargeInfo').orderSn
            }).then(res=>{
              console.log("结束充电chargeObjEnd",res.data.data)
              // that.clientObj = res.data.data
              // if(that.$root.$mp.appOptions.query.chargeObjEnd != undefined) {
              //   that.$root.$mp.appOptions.query.chargeObjEnd = ''
              //   that.$root.$mp.appOptions.query.chargeObjEnd = res.data.data
              //   that.$set(that.$root.$mp.appOptions.query.chargeObjEnd,'clientId',that.gunId)
              // }else{
              //   that.$root.$mp.appOptions.query.chargeObjEnd = res.data.data
              //   that.$set(that.$root.$mp.appOptions.query.chargeObjEnd,'clientId',that.gunId)
              // }
              if(type == 'handle'){
                wx.redirectTo({
                  url: "/pages/search/chargeMode/countCharge/main?id=" + utils.wxGetStorage('chargeInfo').clientGunId //临时中止手动结束
                });
              }
            })
          }
        }
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
  watch: {
    /* 当电量充满时取消计时器并自动跳转至天子充电页面 */
    currEnergy(val,oldval) {
      var that = this
      if(val == 100){
        console.log("电充满啦",utils.wxGetStorage("startTime"))
        setTimeout(()=>{
          clearTimeout(that.timers)
          wx.removeStorageSync('startTime');
          console.log(utils.wxGetStorage("startTime"))
        },500) 
        stopCharge({
          OrderId: that.chargeObj.orderId,
        }).then(res=>{
          console.log("chargeObjEnd",res.data.data)
          that.form = res.data.data
          if(that.$root.$mp.appOptions.query.chargeObjEnd != undefined) {
            that.$root.$mp.appOptions.query.chargeObjEnd = ''
            that.$root.$mp.appOptions.query.chargeObjEnd = res.data.data
            that.$set(that.$root.$mp.appOptions.query.chargeObjEnd,'clientId',that.id)
          }else{
            that.$root.$mp.appOptions.query.chargeObjEnd = res.data.data
            that.$set(that.$root.$mp.appOptions.query.chargeObjEnd,'clientId',that.id)
          }    
          wx.redirectTo({
            url: "/pages/search/chargeMode/stopCharge/main?stopType=2"
          });   
        })
        console.log(utils.wxGetStorage("startTime"))
      }
    }
  },

};
</script>

<style scoped lang="scss">
@import "../../../../../static/assets/scss/search/chargeMode/chargeing/index.scss";

</style>
