<template>
  <div id="index">
    <div class="chargeing">
      <img src="/static/img/cut/chargeing.png" alt="">
      <div class="energy">
        <div class="currEnergy">{{currEnergy}}%</div>
        <div class="title">正在充电中</div>
      </div>
      <div class="content">
        <div class="title">当前已充电</div>
        <div class="subTitle">{{duration}}</div>
      </div>
    </div>
    <div class="footer">
      <div class="info">
        <div class="energyInfo pdl20">
          <div>
            <p class="subTitle">本次已为您充电</p>
            <p class="subEnergy"><span>{{DEG}}</span>度</p>
          </div>
        </div>
        <div class="vertical"></div>
        <div class="energyInfo pdr20">
          <div>
            <p class="subTitle">您的爱车当前电量</p>
            <p class="subEnergy"><span>{{currEnergy}}</span>%</p>
          </div>
        </div>
      </div>
      <div class="address">您的爱车当前停在福建省厦门市湖里区湖里高新技术园汇金湖里大厦附近宝龙停车场71号充电桩。</div>
      <div class="tip">充电完成后爱停车将对您进行提示</div>
      <button class="btn cancel" @click="submit()">立刻停止充电</button>
    </div>
  </div>
</template>
<script>
import utils from "@/utils/index";
import { login,sendNoTokenSms } from '@/api/api'  
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      id: "",
      currEnergy: 52,                    //剩余电量
      DEG: 52,                          //度数
      duration: '2小时33分钟'           //毫秒
    };
  },
  computed: {
  
  },
  onLoad () {
    console.log("this.$root.$mp.query",this.$root.$mp.query)
    this.id = this.$root.$mp.query.id
  },
  mounted() {

    
  },
  components: {

  },
  methods: {
    submit() {
      wx.showModal({
        title: '提示',
        content: '您确定要现在就停止充电吗？',
        confirmText: "取消",
        cancelText: "确定",
        // showCancel: false,
        success: function (res) {
          console.log(res);
          if (res.confirm) {
            console.log('用户点击主操作')
          }else{
            console.log('用户点击辅助操作')
            wx.navigateTo({
              url: "/pages/search/chargeMode/countCharge/main"
            });
          }
        }
      });     
    }
  },
  watch: {
    
  },

};
</script>

<style scoped lang="scss">
.chargeing{
  width: 100%;
  height: 640rpx;
  position: relative;
  img{
    height: 100%;
    width: 100%;
  }
  .energy{
    width: 340rpx;
    height: 340rpx;
    position: absolute;
    // top: 70rpx;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    // margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #14BF6D;
    .currEnergy{
      font-size: 72rpx;
    }
    .title{
      font-size: 30rpx;
    }
  }
}
.content{
  height: 100rpx;
  width: 340rpx;
  text-align: center;
  position: absolute;
  bottom: 94rpx;
  left: 50%;
  margin-left: -170rpx;
  .title{
    color: #F1FFF2;
    font-size: 28rpx;
  }
  .subTitle{
    color: #ffffff;
    font-size: 46rpx;
  }
}
.footer{
  .info{
    width: 100%;
    height: 160rpx;
    display: flex;
    flex: 3;
    align-items: center;
    align-content: center;
    // text-align: center;
    padding: 10rpx 0;
    .vertical{
      height: 100rpx;
      width: 3px;
      background: #c7c7c7;
    } 
    .energyInfo{
      width: 100%;
      height: 100%;
      padding: 0 23rpx;
      div{
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content:center;
        align-items: center;
        align-content: center;
        height: 100%;
        // border: 1px solid #849289;
        // box-shadow:  0px 0px 10rpx #849289; 
        border-radius: 10rpx;
      }
    }
    .pdl20{
      padding-left: 46rpx;
    }
    .pdr20{
      padding-right: 46rpx;
    }
       
    .subTitle{
      font-size: 30rpx;
    color: #999999;
    }
    .subEnergy{
      color: #14BF6D;
      font-size: 46rpx;
    } 
  }
  .address{
    width: 84%;
    margin: 0 auto;
    color: #999999;
    font-size: 28rpx;
    text-align: center;
    // margin: 0 0 50rpx 0;
  }
  .tip{
    color: #14BF6D;
    font-size: 32rpx;
    text-align: center;
    margin: 40rpx 0 46rpx 0;
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
  margin-top: 50rpx;
}
.cancel{
  background: #fff;
  color: #14BF6D;
  border: 1px solid #14BF6D;
}
</style>
