<template>
  <div id="order" class="order">
    <div class="container">
      <div class="record">
        <div class="subTitle">
          <div class="hd">流水号：</div>
          <div class="fd ">{{form.moneySn}}</div>
        </div>
        <div class="underLine"></div>
      </div> 
      <div class="record">
        <div class="subTitle">
          <div class="hd">类型：</div>
          <div class="fd ">{{form.typeName}}</div>
        </div>
        <div class="underLine"></div>
      </div>  
      <div class="record">
        <div class="subTitle">
          <div class="hd">金额：</div>
          <div class="fd ">{{form.amount + "元"}}</div>
          <!-- <div class="fd ">{{form.finalPrice+"元"}} <span style="text-decoration:line-through">原价{{form.ogrinalPrice+"元"}}</span></div> -->
        </div>
        <div class="underLine"></div>
      </div> 
      <div class="record">
        <div class="subTitle">
          <div class="hd">之前剩余金额：</div>
          <div class="fd ">{{form.userOldBalance}}元</div>
        </div>
        <div class="underLine"></div>
      </div> 
      <div class="record">
        <div class="subTitle">
          <div class="hd">剩余金额：</div>
          <div class="fd ">{{form.userNowBalance}}元</div>
        </div>
        <div class="underLine"></div>
      </div> 
      
      <div class="record">
        <div class="subTitle">
          <div class="hd">时间：</div>
          <div class="fd ">{{form.createTimestamp}}</div>
        </div>
        <div class="underLine"></div>
      </div> 
      <div class="record">
        <div class="subTitle">
          <div class="hd">优惠券减免：</div>
          <div class="fd ">{{form.couponPrice}}元</div>
        </div>
        <div class="underLine"></div>
      </div> 
      <div class="record">
        <div class="subTitle">
          <div class="hd">实付金额：</div>
          <div class="fd ">{{form.totalPrice}}元</div>
        </div>
        <div class="underLine"></div>
      </div> 
      <div class="record">
        <div class="subTitle">
          <div class="hd">支付方式：</div>
          <div class="fd ">{{form.payTypeName}}</div>
        </div>
        <div class="underLine"></div>
      </div> 
    </div>
  </div>
</template>
<script>
import utils from "@/utils/index";
import { mapState, mapActions } from 'vuex'
import { refundDetail } from '@/api/api'

export default {
  data() {
    return {
      id: '',
      form: {},
      tableData: []
    };
  },
  
  onShow() {
    this.$root.$mp.query.id != undefined ? this.id = this.$root.$mp.query.id : this.id = ''
    this.refundDetailFun()
  },
  mounted() {
    // this.tableData.map((item)=> {
    //   item.createTime = this.ToTime(item.createTime)
    // })
  },
  methods: {
    refundDetailFun() {
      refundDetail({
        id: this.id
      }).then(res =>{
        if(res.data.code == 200){
          this.form = res.data.data
          this.form.createTimestamp  = this.ToTime(this.form.createTimestamp )
          this.form.amount = this.form.amount.toFixed(2)
          this.form.userOldBalance = this.form.userOldBalance.toFixed(2)
          this.form.userNowBalance = this.form.userNowBalance.toFixed(2)
          this.form.couponPrice = this.form.couponPrice.toFixed(2)
          this.form.totalPrice = this.form.totalPrice.toFixed(2)
        }
      })
    },
    ToTime(timestamp) {
      //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      timestamp = timestamp + ""
      if(timestamp.length == 10){
        var date = new Date(timestamp * 1000);
      }else if(timestamp.length == 13){
        var date = new Date(timestamp* 1000 / 1000);
      }
      var Y = date.getFullYear() + "-";
      var M = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) + "-" : date.getMonth() + 1 + "-";
      var D = date.getDate() < 10 ? "0" + date.getDate() + " " : date.getDate() + " ";
      var h = date.getHours() < 10 ? "0" + date.getHours() + ":" : date.getHours() + ":";
      var m = date.getMinutes() < 10 ? "0" + date.getMinutes() + ":": date.getMinutes() + ":";
      var s = date.getSeconds() < 10 ? "0" + date.getSeconds(): date.getSeconds();
      return Y + M + D + h + m + s;
    },
    //页面路由跳转
    skip(type) {
      wx.navigateTo({
        url: "/pages/" + type + "/main"
      });
    },
  },
  computed: {
    
  },
  components: {

  },
  
  watch: {},

};
</script>

<style scoped lang="scss">
@import "../../../../static/assets/scss/userCenter/orderDetails/index.scss";

</style>

