<template>
  <div id="order" class="order">
    <div class="container">
      <div class="record">
        <div class="subTitle">
          <div class="hd">流水号</div>
          <div class="fd ">{{form.seralNumber}}</div>
        </div>
        <div class="underLine"></div>
      </div> 
      <div class="record">
        <div class="subTitle">
          <div class="hd">类型</div>
          <div class="fd ">{{form.type}}</div>
        </div>
        <div class="underLine"></div>
      </div> 
      <div class="record">
        <div class="subTitle">
          <div class="hd">资金备注</div>
          <div class="fd ">{{form.remark}}</div>
        </div>
        <div class="underLine"></div>
      </div> 
      <div class="record">
        <div class="subTitle">
          <div class="hd">资金金额</div>
          <div class="fd ">{{form.sum}}</div>
        </div>
        <div class="underLine"></div>
      </div> 
      <div class="record">
        <div class="subTitle">
          <div class="hd">支付方式</div>
          <div class="fd ">{{form.pay}}</div>
        </div>
        <div class="underLine"></div>
      </div> 
      <div class="record">
        <div class="subTitle">
          <div class="hd">时间</div>
          <div class="fd ">{{form.createTime}}</div>
        </div>
        <div class="underLine"></div>
      </div> 
      <div class="record">
        <div class="subTitle">
          <div class="hd">桩站名称</div>
          <div class="fd ">{{form.staName}}</div>
        </div>
        <div class="underLine"></div>
      </div> 
      <div class="record">
        <div class="subTitle">
          <div class="hd">电量</div>
          <div class="fd ">{{form.energy}}</div>
        </div>
        <div class="underLine"></div>
      </div> 
      <div class="record">
        <div class="subTitle">
          <div class="hd">之前剩余电量</div>
          <div class="fd ">{{form.beforeEnergy}}</div>
        </div>
        <div class="underLine"></div>
      </div> 
      <div class="record">
        <div class="subTitle">
          <div class="hd">剩余电量</div>
          <div class="fd ">{{form.dumpEnergy}}</div>
        </div>
        <div class="underLine"></div>
      </div> 
      
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
        seralNumber: '2018091200093443219',
        type: '买电',
        remark: '购买充电电量',
        sum: '109元',
        pay: '微信 ',
        createTime: '2017-11-16 15:55:02',
        staName: '鹭景充电桩站',
        energy: '200度',
        useTime: '(忙时)',
        beforeEnergy: '63.78度',
        dumpEnergy: '263.78度'
      },
      tableData: []
    };
  },
  onHide() {
    
  },
  onShow() {
    console.log("this.$root.$mp.query",this.$root.$mp.query)
    this.$root.$mp.query.id != undefined ? this.id = this.$root.$mp.query.id : this.id = ''
    this.tableData = []
  },
  mounted() {
    // this.tableData.map((item)=> {
    //   item.createTime = this.ToTime(item.createTime)
    // })
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
    skip(type) {
      wx.navigateTo({
        url: "/pages/" + type + "/main"
      });
    },
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
.order{
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #f4f4f4;
  overflow: scroll;
}
.container{
  padding: 10rpx 0 40rpx 0;

}
.record{
  background: #ffffff;
  position: relative;
  .title{
    display: flex;
    flex: 3;
    padding: 30rpx;
    .hd{
      font-size: 34rpx;
      color: #333333;
      text-align: left;
      width: 100%;
    }
    .bd{
      color: #FFC000;
      font-size: 36rpx;
      text-align: center;
      width: 100%;
    }
    .fd{
      width: 100%;
      font-size: 34rpx;
      color: #333333;
      text-align: right;
    }
  }
  .subTitle{
    display: flex;
    flex: 2;
    padding: 30rpx;
    font-size: 32rpx;
    .hd{
      width: 100%;
      text-align: left;
      color: #999999;
    }
    .fd{
      width: 100%;
      text-align: right;
      color: #333333;
    }
  }
  .underLine{
    width: 96%;
    height: 2rpx;
    background: #f4f4f4;
    position: absolute;
    right: 0;
    bottom: 0;
  }
  
}
.record:last-child .underLine{
  background: transparent;
}

.loadmore{
  position: relative;
  .tips{
    // width: 50%;
    text-align: center;
    margin: 0 auto;
    font-size: 22rpx;
    color: #888888;

  }
  .line{
    width: 100rpx;
    height: 2rpx;
    background: #C7C7C7;  
    position: absolute;
    top: 50%;
  }
  .pl{
    left: 80rpx;
  }
  .pr{
    right: 80rpx;
  }
}

</style>

