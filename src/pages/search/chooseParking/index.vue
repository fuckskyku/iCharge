<template>
  <div id="index">

    <div class="head">
      <img src="https://testapi.xmnewlife.com/car/images/cut/img_8.png" alt="">
    </div>
    <!-- 空空如也 -->
    <div v-if="empty" class="empty">
      <img src="/static/img/cut/empty.png" alt="">
      空空如也~
    </div>
    <div class="section">
      <form>
        <ul class="item" v-if="!empty">
          <li v-for="(item,index) in tableData" :key="index" class="parking"><button @click="check(index)" :class="[item.style,{checked:current == index}]">{{tableData==""?"空空如也":item.parking}}</button></li>
        </ul>
      </form>  
    </div>
    <button class="btn" @click="submit()" v-if="!empty">选定此桩</button>

    <!-- 1 尚未登录不能选择车位提示 -->
    <div v-if="token == ''" class="dialog" style="z-index:9999">
      <div>
        <ul class="tip_flex"> 
          <li><img src="https://testapi.xmnewlife.com/car/images/cut/swdl.png" alt=""></li>
          <li>您当前尚未登录</li>
          <li>无法使用爱充电的产品服务</li>
        </ul>
      </div>
      <button class="btn cancel" @click="skip('login')">立即登录</button>
    </div>

    <!-- 2 桩站故障提示 -->
    <div v-if="fault == true" class="dialog" style="z-index:999">
      <div>
        <ul class="tip_flex"> 
          <li><img src="https://testapi.xmnewlife.com/car/images/cut/zhz.png" alt=""></li>
          <li class="tip">该设备目前状态异常，无法进入和充电</li>
          <li>您可以联系场地管理员解决</li>
          <li class="tip">或者另外寻找其他充电桩</li>
        </ul>
      </div>
      <button class="btn cancel" @click="skip('index')">返回首页</button>
    </div>
    
    <!-- 3 剩余电量小于等于10 -->
    <div v-if="dumpEnergy < 10 || dumpEnergy == 10" class="dialog" style="z-index:99">
      <div>
        <ul class="tip_flex"> 
          <li><img src="https://testapi.xmnewlife.com/car/images/cut/dlbz.png" alt=""></li>
          <li class="tip">您当前账户中剩余电量不足<span style="color:#FFCD33;">（必须超过10度电）</span></li>
          <li>无法进入和充电</li>
        </ul>
      </div>
      <button class="btn cancel" @click="skip('login')">立即买电</button>
    </div>
    
    <!-- 4 提示当前有人在用 -->
    <div v-if="use == true" class="dialog" style="z-index:19">
      <div>
        <ul class="tip_flex"> 
          <li><img src="https://testapi.xmnewlife.com/car/images/cut/cwybx.png" alt=""></li>
          <li class="tip">您下手慢了，该车位已被其他用户抢先预定请重新选一个</li>
        </ul>
      </div>
      <button class="btn cancel" @click="use=false">重选车位</button>
    </div>
  </div>
</template>
<script>
import utils from "@/utils/index";
import { getClientList } from "@/api/api";

export default {
  data() {
    return {
      fault: false,
      login: true,
      use: false,
      empty: false,
      dumpEnergy: 11,
      id: "",
      keyword: '',
      current: '-1', //当前选中的车位
      info: [
        {id: '1',checked: false,num: 'FD-001号',disabled: true,style:'disabled'},{id: '2',checked: false,num: 'FD-002号',disabled: false,style:'enabled'},{id: '3',checked: false,num: 'FD-003号',disabled: false,style:'enabled'},{id: '4',checked: false,num: 'FD-004号',disabled: false,style:'enabled'}
      ],
      tableData: []
    };
  },
  computed: {
  
  },
  onShow() {
    console.log("this.$root.$mp.query11",this.$root.$mp.query)
    this.id = this.$root.$mp.query.id
    this.getClientListFun()
    
  },
  onLoad () {
  
  },
  mounted() {
    
  },
  components: {

  },
  methods: {
    getClientListFun() {
      var that = this
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success (res) {
          utils.wxSetStorageSync("currLatitude",res.latitude)
          utils.wxSetStorageSync("currLongitude",res.longitude)
        }
      })
      getClientList({
        staId: that.id,
      }).then(res=>{
        if(res.data.code == 200){
          if(res.data.data != null){
            that.empty = false
            that.tableData = res.data.data.list
            that.tableData.map((item)=>{
              item.checked = false
              if(item.clientState == 1){
                item.disabled = false
                item.style = 'enabled'
              }
              if(item.clientState == 2){
                item.disabled = true
                item.style = 'disabled'
              }
            })
            //console.log('res.data.data.list',that.tableData)
          }else{
            that.empty = true
            that.tableData = []
            //console.log('res.data.data.list',that.tableData)
          }
        }
      })
      //end
      
    },
    check(index){
      if(this.tableData[index].disabled != true){
        this.current = index
      }  
    },
    //页面路由跳转
    skip(type) {
      wx.navigateTo({
        url: "/pages/" + type + "/main"
      });
    },
    submit() {
      if(this.current != '-1'){
        //do something
        console.log("submit",this.tableData[this.current].clientId)
        //current 查找选中车位的ID
        wx.navigateTo({
          url: "/pages/search/opening/main?id=" + this.tableData[this.current].clientId
        });

      }else{
        console.log("err submit")
        wx.showModal({
          content: '请先选择车位！',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              //用户点击确定
            }
          }
        });
    

      }
    }
  },
  watch: {},

};
</script>

<style scoped lang="scss">
@import "../../../../static/assets/scss/search/chooseParking/index.scss";

</style>
