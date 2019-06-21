<script>
import utils from "@/utils/index";
import { mapState, mapActions } from 'vuex'
// let SocketTask;
// let socketPath = 'ws://182.148.14.116:8990/websocket/' + utils.wxGetStorage("userInfo").id ;
export default {
  data() {
    return {
      val: '',
      socketOpen: false
    };
  },
  computed: {
  
  },
  // created() {
  //   var that = this;
  //   var socketMsgQueue = []
  //   var socketMsg = ''
  //   var errMsg = ''
  //   if(this.token != ''){
  //       that.websocket(socketPath, this.val)
  //   }
  //   //监听 WebSocket 连接打开事件
  //   wx.onSocketOpen(res=> {
  //       console.log('监听 WebSocket 连接打开事件',res)
  //       // wx.closeSocket()
  //       this.socketOpen = true
  //       that.sendSocketMessage()
  //       // for (let i = 0; i < socketMsgQueue.length; i++) {
  //       //     that.sendSocketMessage(socketMsgQueue[i])
  //       // }
  //       socketMsgQueue = []
  //   })
  //   // 监听 WebSocket 接受到服务器的消息事件
  //   wx.onSocketMessage(res =>{
  //       socketMsg = res
  //       console.log('监听 WebSocket 接受到服务器的消息事件',socketMsg)
  //   })
  //   // 监听 WebSocket 连接关闭事件
  //   wx.onSocketClose(res =>{
  //       errMsg = res
  //       console.log('WebSocket 已关闭！',errMsg)
  //   })
  // },
  onShow() {
    
  },
  components: {

  },
  methods: {
    ...mapActions([
      'setIsRead'
    ]),
    sendSocketMessage(msg) {
      if (this.socketOpen) {
          wx.sendSocketMessage({
            data: 'mdzz', //需要发送的消息
            success: res => {
            console.log('消息发送成功', res);
            },
            fail: err => {
              console.log('消息发送错误！！' + err);
            }
          })
      } else {
        socketMsgQueue.push(msg)
      }
    },
    websocket(url, data) {
      const that = this;
      SocketTask = wx.connectSocket({
        url: url,
        header: { 'content-type': 'application/x-www-form-urlencoded' },  //java后端需要设置此项才能正常通信
        method: 'post',
        success: res => {
            console.log('WebSocket connect', res);
        },
        fail: err => {
          console.log('出现错误啦！！' + err);
          wx.showToast({
              title: '网络异常！',
          })
        }
      })
    },
  },
  computed: {
    ...mapState(['isRead' ])
  },
  watch: {},

};
</script>

<style>

</style>
