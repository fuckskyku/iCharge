<template>
  <div id="login" class="login">
    <div class="tip"><img src="/static/img/cut/ic_right.png" alt=""></div>
    <div class="title">登录成功</div>
    <div class="subTitle">登录成功!<span class="bright">{{countdown}}</span>秒后自动进入</div>
    <button class="btn" @click="into()">立即进入</button>
  </div>
</template>
<script>
import utils from "@/utils/index";

export default {
  data() {
    return {
      msg: '',
      time: "12:01",
      countdown: 3,
      isAgree: false,
      disabled: true,
      style: "btn"
    };
  },
  onLaunch() {

  },
  created() {
    
    
  },
  mounted() {
    this.countdown = 3
    var timer = setInterval(() => {
      console.log(this.countdown)
      this.countdown--
      if(this.countdown == 0){
        clearInterval(timer)
        wx.navigateTo({
          url: "/pages/index/main"
        });
      }
    },1000) 
  },
  methods: {
    into(){
      wx.navigateTo({
        url: "/pages/index/main"
      });
    }
    
  },
  computed: {
    
  },
  components: {
    
  },
  
  watch: {},

};
</script>

<style scoped lang="scss">
.login{
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  .tip{
    width: 380rpx;
    height: 210rpx;
    margin: 124rpx auto 44rpx;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .title{
    padding: 40rpx 0;
    font-size: 40rpx;
    color: #14BF6D;
    text-align: center;
  }
  .subTitle{
    text-align: center;
    font-size: 30rpx;
    color: #B0B0B0;
    .bright{
      color: #FB910C;
    }
  }
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

</style>
