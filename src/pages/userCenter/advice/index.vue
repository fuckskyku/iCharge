<template>
  <div id="index" class="context">
    <div class="energy flex">
      <div class="flex time">时间</div>
      <div class="flex line"></div>
      <div class="flex content">内容</div>
    </div>
    <div class="weui-cells weui-cells_after-title container">
      <div class="weui-cell weui-cell_access border10" @click="skip('adviceDetails',item.id)" v-for="(item,index) in tableData" :key="index">
        <div class="weui-cell__bd bd">{{item.createTime}}</div>
        <div class="weui-cell__ft ft">{{item.content}}</div>
      </div>
    </div>
    <button @click="skip('editAdvice')" class="btn">提交意见</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
      {
        id: 1,
        createTime: "1234567891",
        content: "首充6元"
      },
      { 
        id: 2,
        createTime: "1234567672",
        content: "充值2333元"
      },
      {
        id: 3,
        createTime: "1392567672",
        content: "充值6666元充值6666元充值6666元充值6666元充值6666元"
      }
    ],
      

    };
  },
  computed: {
  
  },
  mounted() {
    this.tableData.map((item,index)=>{
      item.createTime = this.ToTime(item.createTime)
    })
    
  },
  components: {

  },
  methods: {
    ToTime(timestamp) {
       //时间戳为10位需*1000，时间戳为13位的话不需乘1000
       console.log(timestamp)
      if(timestamp.length == 10){
        var date = new Date(timestamp * 1000);
      }else if(timestamp.length == 13){
        var date = new Date(timestamp);
      }
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
    skip(pramas,id) {
      console.log(id)
      id == undefined ? wx.navigateTo({
        url: "/pages/userCenter/"+ pramas + "/main"
      }) :  wx.navigateTo({
              url: "/pages/userCenter/"+ pramas + "/main?id=" + id
            });
    }
  },
  watch: {},

};
</script>

<style scoped lang="scss">
.context{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #f4f4f4;
  overflow: scroll;
}
.container{
  width: 100%;
  
  background: transparent;
  padding: 120rpx 0 150rpx 0;
  // position: absolute;
  // top: 0;
  // left: 0; 
}
.flex{
  display: flex;
  align-items: center;      //垂直居中
  justify-content: center;  //水平居中
}
.energy{
  height: 120rpx;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  color: #fff;
  font-size: 34rpx;
  background: linear-gradient(to right,#75D672,#14BF6D);
  img{
    width: 40rpx;
    height: 40rpx;
    margin: 0 20rpx;
    vertical-align: middle;
  }
  .time{
    width: 49%;
  }
  .line{
    height: 50rpx;
    width: 1px;
    background: #fff;
  }
  .content{
    width: 49%;
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
  position: fixed;
  bottom: 40rpx;
  left: 50%;
  margin-left: -260rpx;
}
.border10{
  border-bottom: 10rpx solid #f4f4f4;
  background: #fff;
}
.weui-cells:before {
  top: 0;
  border-top: none;
}
.weui-cells:after {
  top: 0;
  border-bottom: none;
}
.weui-cell:before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: none;
  color: #d9d9d9;
  left: 15px;
}
.bd{
  width: 50%;
  font-size: 32rpx;
  color: #999;
  text-align: center;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.ft{
  width: 50%;
  text-align: center;
  font-size: 32rpx;
  color: #333333;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
</style>
