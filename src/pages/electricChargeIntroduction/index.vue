<template>
  <div id="index" class="context parent">
    <div class="child">
      <h1 class="title">{{name}}</h1>
      <p class="price">基础电价：{{price}} 元/度</p>
      <div class="content" v-for="(item,index) in tableData">
        <p class="line"><span class="sub_title">时段{{index + 1}}</span> <span style="margin-left:30rpx;font-size:34rpx;">{{item.price}} 元/度（不含服务费）</span></p>
        <div class="desc">
          <div class="lt">
            <p v-for="(list,i) in item.times" :key="i">{{list}}</p>
          </div>
          <div class="rt">{{item.increase > 0 ? '在基础电价上上涨' + item.increase + '%' : item.increase < 0 ? '在基础电价上下调' + item.increase + '%' : '全天一致的电价'}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import utils from "@/utils/index";
import { mapState, mapActions } from 'vuex'
import { getPriceList, getStationtInfo } from '@/api/api'  

export default {
  data() {
    return {
      id: '',
      price: '',
      tableData: [],
      name: '',
      empty: false
    };
  },
  computed: {
  
  },
  mounted() {
    console.log("this.$root.$mp.query12223434",this.$root.$mp.query)
    // if (this.$root.$mp.query.queryObj != undefined) {
    //   var queryObj = JSON.parse(this.$root.$mp.query.queryObj)
    //   if(queryObj[0].id != '' && queryObj[1].chargePrice != '') {
    //     this.id = queryObj[0].id
    //     this.price = queryObj[1].chargePrice.toFixed(4)
    //   }
    //   console.log("this.id ",this.id ,'this.price',this.price)
    // }
    this.id = this.$root.$mp.query.id
    this.getPriceListFun()
    getStationtInfo({
      stationId: this.id,
    }).then(res =>{
      if(res.data.code == 200){
        this.name = res.data.data.name
      }
    })
  },
  components: {

  },
  methods: {
    getPriceListFun() {
      getPriceList({
        id: this.id
      }).then(res =>{
        console.log('res.data.sdasdad',res.data)
        if(res.data.code == 200) {
          this.tableData = res.data.data
          this.tableData.map((item,index)=>{
            item.price = item.price.toFixed(4)
            // item.times = ["8:00-12:00","12:00-14:00"]
            // item.times = item.times.split(',')
          })
          this.price = res.data.data[0].chargePrice.toFixed(4)
          // console.log('this.tableData',res.data.data[0].chargePrice)
        }
      })
    },
    ToTime(timestamp) {
       //时间戳为10位需*1000，时间戳为13位的话不需乘1000
       timestamp = timestamp + ""
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
@import "../../../static/assets/scss/electricChargeIntroduction/index.scss";
.price{
  background: #ffffff;
  padding: 30rpx;
  font-size: 34rpx;
}
.content{
  margin-bottom: 12rpx;
  // border-bottom: 10rpx solid #e6e6e6;
}
.content:last-child{
  margin-bottom: 80rpx;
}
</style>
