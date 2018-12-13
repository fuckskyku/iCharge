<template>
  <div id="index">

    <div class="head">
      <img src="/static/img/cut/img_8.png" alt="">
      <!-- <ul class="flex info">
        <li style="font-size:32rpx;color: rgba(255, 255, 255, 0.8);">请先查看好</li>
        <li style="font-size:40rpx;">合适的车位</li>
        <li style="color: rgba(255, 255, 255, 0.6);">—</li>
        <li style="font-size:34rpx;color: rgba(255, 255, 255, 0.8);">然后在爱充电小程序选择</li>
        <li style="font-size:40rpx;">您要进行充电的车位</li>
      </ul> -->
    </div>
    <div class="section">
      <form>
        <ul class="item">
          <li v-for="(item,index) in info" :key="index" class="parking"><button @click="check(index)" :class="[item.style,{checked:current == index}]">{{item.num}}</button></li>
        </ul>
      </form>  
    </div>
    <button class="btn" @click="submit()">选定此桩</button>

    <!-- 1 尚未登录不能选择车位提示 -->
    <div v-if="login == false" class="dialog" style="z-index:9999">
      <div>
        <ul class="tip_flex"> 
          <li><img src="/static/img/cut/swdl.png" alt=""></li>
          <li>您当前尚未登录</li>
          <li>无法使用爱充电的产品服务</li>
        </ul>
      </div>
      <button class="btn cancel" @click="skip('login')">立即登录</button>
    </div>

    <!-- 2 桩站故障提示 -->
    <div v-if="fault == true" class="dialog" style="z-index:999">
      <div>
        <ul class="tip_flex"> 
          <li><img src="/static/img/cut/zhz.png" alt=""></li>
          <li class="tip">该设备目前状态异常，无法进入和充电</li>
          <li>您可以联系场地管理员解决</li>
          <li class="tip">或者另外寻找其他充电桩</li>
        </ul>
      </div>
      <button class="btn cancel" @click="skip('index')">返回首页</button>
    </div>
    
    <!-- 3 剩余电量小于等于10 -->
    <div v-if="dumpEnergy < 10 || dumpEnergy == 10" class="dialog" style="z-index:99">
      <div>
        <ul class="tip_flex"> 
          <li><img src="/static/img/cut/dlbz.png" alt=""></li>
          <li class="tip">您当前账户中剩余电量不足<span style="color:#FFCD33;">（必须超过10度电）</span></li>
          <li>无法进入和充电</li>
        </ul>
      </div>
      <button class="btn cancel" @click="skip('login')">立即买电</button>
    </div>
    
    <!-- 4 提示当前有人在用 -->
    <div v-if="use == true" class="dialog" style="z-index:19">
      <div>
        <ul class="tip_flex"> 
          <li><img src="/static/img/cut/cwybx.png" alt=""></li>
          <li class="tip">您下手慢了，该车位已被其他用户抢先预定请重新选一个</li>
        </ul>
      </div>
      <button class="btn cancel" @click="use=false">重选车位</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fault: false,
      login: true,
      use: false,
      dumpEnergy: 11,
      id: "",
      current: '-1', //当前选中的车位
      info: [
        {id: '1',checked: false,num: 'FD-001号',disabled: true,style:'disabled'},{id: '2',checked: false,num: 'FD-002号',disabled: false,style:'enabled'},{id: '3',checked: false,num: 'FD-003号',disabled: false,style:'enabled'},{id: '4',checked: false,num: 'FD-004号',disabled: false,style:'enabled'}
      ]
    };
  },
  computed: {
  
  },
  onLoad () {
    console.log("this.$root.$mp.query",this.$root.$mp.query)
    this.id = this.$root.$mp.query.id
    // if(this.login == false){
    //   wx.setNavigationBarTitle({
    //     title: 'iCharge',
    //     success: function(res) {
    //       // success
    //     }
    //   })
    //   wx.setNavigationBarColor({
    //       frontColor:'#000000',//前景颜色值，包括按钮、标题、状态栏的颜色，仅支持 #ffffff 和 #000000 (微信小程序官方规定)
    //       backgroundColor:'75D672'//背景颜色值，有效值为十六进制颜色
    //     })
    // }
  },
  mounted() {
    
  },
  components: {

  },
  methods: {
    check(index){
      if(this.info[index].disabled != true){
        this.current = index
      }  
    },
    //页面路由跳转
    skip(type) {
      wx.navigateTo({
        url: "/pages/" + type + "/main"
      });
    },
    submit() {
      if(this.current != '-1'){
        //do something
        console.log("submit",this.info[this.current].id)
        //current 查找选中车位的ID
        // this.info[this.current].id
        wx.navigateTo({
          url: "/pages/search/opening/main?id=" + this.info[this.current].id
        });

      }else{
        console.log("err submit")
        wx.showModal({
          content: '请先选择车位！',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              //用户点击确定
              console.log('用户点击确定')
            }
          }
        });
    

      }
    }
  },
  watch: {},

};
</script>

<style scoped lang="scss">
.head{
  width: 100%;
  height: 300rpx;
  background: #14BF6D; 
  img{
    width: 100%;
    height: 100%;
  }
}
.flex{
  width: 90%;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 40rpx auto 0;
  color: #ffffff;
  
}
.info{
  width: 90%;
  height: 300rpx;
  margin: 0 auto;
  align-items: stretch;
  font-size: 34rpx;
}
.btn{
  width: 520rpx;
  height: 90rpx;
  line-height: 90rpx;
  border-radius: 90rpx;
  border: none;
  outline: none;
  background: linear-gradient(to right,#75D672,#14BF6D);
  color: #ffffff;
  margin-top: 80rpx;
}
.cancel{
  background: #fff;
  color: #14BF6D;
  border: 1px solid #14BF6D;
}
.item{
  margin: 20rpx 0;
  // display: flex;
  .parking{
    display: inline-block;
    width: 28%;
    height: 80rpx;
    line-height: 80rpx;
    margin: 20rpx 20rpx 0;
    button{
      font-size: 30rpx;
      outline: none;
    }
    .enabled{
      border: 1rpx solid #14BF6D;
      color: #14BF6D;
      background: #ffffff;
    }
    .disabled{
      border: 1rpx solid #B0B0B0;
      color: #B0B0B0;
      background: #EAEAEA;
    }
    .checked{
      border: 1rpx solid #14BF6D;
      color: #ffffff;
      background: #14BF6D;
    }
    // flex-direction: column;
    // justify-content: center;
    // align-items: center;
  }
}
.dialog{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #ffffff;
}
.tip_flex{
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #B0B0B0;
  font-size: 30rpx;
  img{
    width: 288rpx;
    height: 284rpx;
    margin-top: 100rpx;
    margin-bottom: 20rpx;
  }
  .tip{
    margin: 20rpx;
  }
}
</style>
