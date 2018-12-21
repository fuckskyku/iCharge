<template>
  <div id="index" class="context">
    <div class="container">
      <div class="box" v-for="(item,index) in tableData" :key="index" @click="skip('inMailDetails',item.id)"> 
        <div class="hd">
          <div class="title">{{item.title}}</div>
          <div class="subTitle">{{item.createTime}}</div>
        </div>
        <div class="fd">
          <div class="btn" :class="[style,{cancel: item.status == 1}]">{{item.statusName}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          status: 0,
          statusName: '未读',
          createTime: "1234567891",
          title: "咪师感恩十年回馈大礼包！",
          content: "尊敬的谷歌公司:咪师为您汇总了2018年10月份的财务报告，请前往查阅：2018年10月份账户报告注：以上信息仅供参考，最终以平台实际信息为准。"
        },
        { 
          id: 2,
          status: 0,
          statusName: '未读',
          createTime: "1234567672",
          title: "咪师感恩十年回馈大礼包！咪师感恩十年回馈大礼包！",
          content: "尊敬的百度公司:咪师为您汇总了2018年11月份的财务报告，请前往查阅：2018年11月份账户报告注：以上信息仅供参考，最终以平台实际信息为准。"
        },
        {
          id: 3,
          status: 0,
          statusName: '未读',
          createTime: "1392567672",
          title: "咪师感恩十年回馈大礼包咪师感恩十年回馈大礼包！！",
          content: "尊敬的space公司:咪师为您汇总了2018年12月份的财务报告，请前往查阅：2018年12月份账户报告注：以上信息仅供参考，最终以平台实际信息为准。"
        }
      ],
      style: "btn" 

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
      var M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
      var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      var h = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":";
      var s = (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds());
      return Y + M + D + h + m + s;
    },
    skip(pramas,id) {
      console.log(id)
      if(this.tableData != ''){
        this.tableData.map(item=>{
          if(item.id == id){
            item.status = 1
            item.statusName = '已读'
            console.log('item',item)
          }
        })
      }
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
  padding: 10rpx 0 150rpx 0;
}
.btn{
  width: 80rpx;
  height: 40rpx;
  line-height: 40rpx;
  border-radius: 40rpx;
  text-align: center;
  background: linear-gradient(to right,#FFC000,#FF8A00);
  color: #ffffff;
  font-size: 26rpx;
  margin: 0 auto;
}
.cancel{
  width: 80rpx;
  height: 40rpx;
  line-height: 40rpx;
  border-radius: 40rpx;
  text-align: center;
  background: #CFCFCF;
  color: #ffffff;
  font-size: 26rpx;
  margin: 0 auto;
}
.border10{
  border-bottom: 10rpx solid #f4f4f4;
  background: #fff;
}
.box{
  padding: 30rpx;
  display: inline-block;
  text-align: left;
  display: flex;
  align-items: center;
  background: #ffffff;
  margin-bottom: 30rpx;
  .hd{
    width: 80%;
    flex-direction: column;
    .title{
      width: 96%;
      text-align: left;
      color: #333333;
      font-size: 32rpx;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    .subTitle{
      color: #999999;
      font-size: 28rpx;
    }
  }
  .fd{
    width: 20%;
    font-size: 26rpx;
    color: #ffffff;
    .tip{

    }
  }
}
</style>
