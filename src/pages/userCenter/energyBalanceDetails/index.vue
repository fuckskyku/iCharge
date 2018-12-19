<template>
  <div id="index" class="index">
    <div class="container">
      <div class="record">
        <div class="cell ">
          <div class="title">桩站全称</div>          
          <div class="subTitle">{{form.staName}}</div>
          <div class="underLine"></div>
        </div>
        <div class="cell ">
          <div class="title">具体地址</div>          
          <div class="subTitle">{{form.address}}</div>
          <div class="underLine"></div>
        </div>
        <div class="cell ">
          <div class="title">桩的类型</div>          
          <div class="subTitle"><span>{{form.fastNum}}根快充桩</span><span style="margin-left: 134rpx;">{{form.slowNum}}根慢充桩</span></div>
          <div class="underLine"></div>
        </div>
        <div class="cell ">
          <div class="title">桩的状态</div>          
          <div class="subTitle">快充：<span>在用{{form.fastUse}}根</span><span style="margin-left: 62rpx;">在用{{form.fastIdle}}根</span></div>
          <div class="subTitle">慢充：<span>在用{{form.slowUse}}根</span><span style="margin-left: 62rpx;">在用{{form.slowIdle}}根</span></div>
          <div class="underLine"></div>
        </div>
        <div class="cell ">
          <div class="title">忙时剩余电量</div>          
          <div class="subTitle">{{form.busyEnergy}}度</div>
          <div class="underLine"></div>
        </div>
        <div class="cell ">
          <div class="title">闲时剩余电量</div>          
          <div class="subTitle">{{form.idleEnergy}}度</div>
          <div class="underLine"></div>
        </div>
        <div class="cell ">
          查看买电记录
          <img src="/static/img/cut/right.png" alt="">
        </div>
        <div class="cell ">
          查看用电记录
          <img src="/static/img/cut/right.png" alt="">
        </div>
      </div>
      <button class="btn" @click="submit()">买电</button>
      <button class="btn nav" @click="navigation(longitude,latitude)">导航去充电</button>
    </div>
  </div>
</template>
<script>
import card from "@/components/card"
export default {
  data() {
    return {
      id: '',
      form: {
        id: '2',
        staName: '鹭景加油站附属充电桩站',
        address: '厦门市-湖里区-安岭路987号高新技术园五华产业园裕隆国际一层',
        latitude: '',
        longitude: '',
        fastNum: '21',
        slowNum: '26',
        fastUse: '17',
        fastIdle: '4',
        slowUse: '23',
        slowIdle: '3',
        busyEnergy: '311.27',
        idleEnergy: '26.35'
      },
      tableData: []
    };
  },
  onShow() {
    
    
  },
  mounted() {
    console.log("this.$root.$mp.query",this.$root.$mp.query)
    this.$root.$mp.query.id != undefined ? this.id = this.$root.$mp.query.id : this.id = ''
    wx.setNavigationBarTitle({
      title: '当前页面'
    })
  },
  methods: {
    ToTime(timestamp) {
      //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      if(timestamp.length == 10){
        var date = new Date(timestamp * 1000);
      }else if(timestamp.length == 13){
        var date = new Date(timestamp);
      }
      var Y = date.getFullYear() + "-";
      var M = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1 + "-";
      var D = date.getDate() < 10 ? "0" + date.getDate() + " " : date.getDate() + " ";
      var h = date.getHours() < 10 ? "0" + date.getHours() + ":" : date.getHours() + ":";
      var m = date.getMinutes() < 10 ? "0" + date.getMinutes() + ":": date.getMinutes() + ":";
      var s = date.getSeconds() < 10 ? "0" + date.getSeconds(): date.getSeconds();
      return Y + M + D + h + m + s;
    },
    //页面路由跳转
    skip(type,pramas) {
      wx.navigateTo({
        url: "/pages/userCenter/" + type + "/main?id=" + pramas
      });
    },
    navigation(longitude,latitude) {
      var that = this
      wx.openLocation({
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        scale: 17,
        address: that.form.address,
        name: that.form.staName
      })
    },
    submit() {
      wx.navigateTo({
        url: "/pages/buy/main"
      });
    }
  },
  computed: {
    
  },
  components: {
    card
  },
  
  watch: {},

};
</script>

<style scoped lang="scss">
.index{
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #f4f4f4;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
.container{
  padding: 10rpx 0 40rpx 0;

}
.record{

}
.cell{
  background: #ffffff;
  padding: 30rpx 24rpx;
  position: relative;
  .title{
    color: #999999;
    font-size: 30rpx;
    padding-bottom: 10rpx;
  }
  .subTitle{
    color: #333333;
    font-size: 34rpx;
  }
  .underLine{
    width: 96%;
    height: 2rpx;
    background: #f4f4f4;
    position: absolute;
    right: 0;
    bottom: 0;
  }
  img{
    position: absolute;
    right: 24rpx;
    top: 50%;
    height: 26rpx;
    width: 15rpx;
    margin-top: -13rpx;
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
  margin-top: 98rpx;
}
.nav{
  background: linear-gradient(to right,#FFC000,#FF8A00);
  margin-top: 42rpx;
}


</style>

