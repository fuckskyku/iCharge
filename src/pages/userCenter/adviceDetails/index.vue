<template>
  <div id="index" class="container">
    <div class="content">
      <div>{{form.content}}</div>
    </div>
    <div class="time">{{form.createTime}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      id: '',
      form: {}
    };
  },
  computed: {
  
  },
  onLoad() {
    console.log(this.$root.$mp.query.id)
    this.$root.$mp.query.id != undefined ? this.id = this.$root.$mp.query.id : ''
  },
  mounted() {
    var that = this
    console.log(this.id)
    this.tableData = [
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
    
    this.tableData.map((item,index)=>{
      if(item.id == this.id){
        this.form = item
      }
    }) 
    if( this.id != ''){
      
      this.tableData.map((item,index)=>{
        if(item.id == this.id){
          this.form = item
        }
      }) 
      this.form.createTime = this.ToTime(that.form.createTime)
      console.log("form",this.form)
    }else{
      this.form = {
        id: 66,
        createTime: "2018-12-14 11:11:30",
        content: "咪师为您汇总了2018年12月份的财务报告，请前往查阅：2018年12月份账户报告"
      }
    } 
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
  
  },
  watch: {},

};
</script>

<style scoped lang="scss">
.container{
  background: #f4f4f4;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  .content{
    margin-top: 10rpx;
    background: #ffffff;
    color: #333333;
    font-size: 34rpx;
    padding: 32rpx;
    text-indent: 2em;
  }
  .time{
    padding: 20rpx;
    color: #999999;
    font-size: 28rpx;
    text-align: right;
  }
}

</style>
