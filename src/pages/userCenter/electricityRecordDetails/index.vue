<template>
  <div id="index">
    <div class="container">
      <div class="section">
        <div class="record">
          <div class="hd">流水号</div><div class="fd">{{form.serialNumber}}</div>
        </div>
        <div class="record">
          <div class="hd">类型</div><div class="fd">{{form.orderType}}</div>
        </div>
        <div class="record">
          <div class="hd">桩站名称</div><div class="fd">{{form.stationName}}</div>
        </div>
        <div class="record">
          <div class="hd">时间</div><div class="fd">{{form.createTime}}</div>
        </div>
        <div class="record">
          <div class="hd">桩类型</div><div class="fd">{{form.type}}</div>
        </div>
        <div class="record">
          <div class="hd">充电时长</div><div class="fd">{{form.duration}}</div>
        </div>
        <div class="record">
          <div class="hd">使用电量</div><div class="fd">{{form.usePower}}</div>
        </div>
        <div class="record">
          <div class="hd">之前剩余电量</div><div class="fd">{{form.beforeDumpEnergy}}</div>
        </div>
        <div class="record">
          <div class="hd">剩余电量</div><div class="fd">{{form.dumpEnergy}}</div>
        </div>
        <div class="record">
          <div class="hd">使用车位</div><div class="fd">{{form.usedPark}}</div>
        </div>
      </div>
      
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: "",
      tableData: [],
      open: false,
      form: {
        serialNumber: '2018091200093443219',
        orderType: "买电",
        stationName: "瑞景充电桩站",
        createTime: "1545747925",
        type: "快充",
        duration: "1小时5分钟",
        usePower: "200度(忙时)",
        beforeDumpEnergy: "66.14度(忙时)",
        dumpEnergy: "2333度(忙时)",
        usedPark: "FD-002" 
      }
    };
  },
  computed: {
  
  },
  onLoad () {
    this.id = this.$root.$mp.query.id
  },
  mounted() {
    this.form.createTime = this.ToTime( this.form.createTime)
    // this.tableData.map(item => {
    //   if(item.id == this.id){
    //     this.form = item
    //     this.form.createTime = this.ToTime(item.createTime)
    //   }
    // })
  },
  components: {

  },
  methods: {
    ToTime(timestamp) {
      //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      if(timestamp.length == 10){
        var date = new Date(timestamp * 1000);
      }else if(timestamp.length == 13){
        var date = new Date(timestamp);
      }
      var Y = date.getFullYear() + "年";
      var M =(date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "月";
      var D = (date.getDate() < 10 ? "0" + date.getDate() + "日 ": date.getDate() + "日 ")
      var h = (date.getHours() < 10 ? "0" + date.getHours() + ":": date.getHours() + ":")
      var m = (date.getMinutes() < 10 ? "0" + date.getMinutes() + ":": date.getMinutes() + ":")
      var s = (date.getSeconds() < 10 ? "0" + date.getSeconds(): date.getSeconds())
      return Y + M + D + h + m + s;
    },
  },
  watch: {

  },

};
</script>

<style scoped lang="scss">
@import "../../../../static/assets/scss/userCenter/electricityRecordDetails/index.scss";



</style>
