<template>
  <div id="index">
    <div class="title">设置充电量</div>
    <form>
      <div class="input"><input type="number" class="deg" v-model="DEG" @input="dis()" @blur="verify()" placeholder-style="color:#D1D1D1" placeholder="请输入度数">度
        <div class="warning" v-if="warning == true">*{{INT!=true?'请输入纯数字':less==true?"一次性充电度数必须超过10度":''}}</div>
        <div class="warning" v-if="buy == true">*您当前剩余额度不足<span class="buy" @click="skip('buy')">立即买电</span> </div>
      </div>
      
      <button class="btn" :disabled="disabled" :class="[style,{disabled:disabled == true}]" @click="submit()">确 定</button>
    </form>
  </div>
</template>
<script>
import utils from "@/utils/index";
import { sendNoTokenSms } from '@/api/api'  
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      id: "",
      DEG: '',
      balance: 60,
      INT: true,
      less: false,
      disabled: true,
      warning: false,
      buy: false,
      style: 'btn',
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
    dis() {
      if(utils.number(this.DEG)){
        if(this.DEG != '' && this.DEG > 10){
          this.disabled = false;
        }else{
          this.disabled = true;
        }
         
        if(this.DEG <= 10){
          this.disabled = true
        }else{
          this.disabled = false
        }
        // 余额不足
        if(this.DEG >10 && this.DEG > this.balance){
          this.disabled = true
          return ;
        }else if(this.DEG >10 && this.DEG <= this.balance) {
          this.disabled = false
        }

      }

    },
    verify() {
      if(!utils.number(this.DEG)){
        // utils.showDialog("请输入整数数字！")
        this.warning = true
        this.buy = false
        this.INT = false
        console.log("0")
      }else{
        this.INT = true //是整数
        if(this.DEG != ''){
          this.disabled = false;
        }else{
          this.disabled = true;
        }
        if(this.DEG <= 10){
          this.less = true
          this.warning = true 
          this.disabled = true
        }else{
          this.warning = false
          this.disabled = false
        }
        // 余额不足
        if(this.DEG >10 && this.DEG > this.balance){
          this.buy = true
          this.disabled = true
          return ;
        }else if(this.DEG >10 && this.DEG <= this.balance) {
          this.disabled = false
          this.buy = false
        }
      }
      
    },
    submit() {
      console.log(111)
      if(!utils.number(this.DEG)){
        utils.showDialog("请输入整数数字！")
        return ;
      }
      // 余额不足
      if(this.DEG >10 && this.DEG > this.balance){
        this.buy = true
        return ;
      }else{
        this.buy = false
      }
      wx.redirectTo({
        url: "/pages/search/chargeMode/chargeing/main"
      })
    },
    skip(params) {
      wx.redirectTo({
        url: "/pages/"+ params + "/main"
      })
    }
  },
  watch: {
    
  },

};
</script>

<style scoped lang="scss">
@import "../../../../../static/assets/scss/search/chargeMode/setupCharge/index.scss";

</style>
