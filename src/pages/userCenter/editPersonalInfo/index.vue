<template>
  <div id="index" class="parent">
    <div class="child">
      <div class="info" >
        <div class="hd">
          <input type="text" maxlength="11" v-model="nickName"/>
          <div class="clearabled" @click="clear"><img src="/static/img/cut/account/ic_delete.png" alt=""></div>
          
      </div>
      </div>
      <button @click="onSubmit" class="btn cancel">确定</button>
    </div>
  </div>
</template>
<script>
import utils from "@/utils/index";
import { editNickName } from '@/api/api'  

export default {
  data() {
    return {
      nickName: '',
      userInfo: {}
    };
  },
  computed: {
  
  },
  mounted() {
    this.nickName = this.$root.$mp.query.nickName
    this.userInfo = utils.wxGetStorage('userInfo')
  },
  components: {

  },
  methods: {
    clear() {
      this.nickName = ""
    },
    onSubmit() {
      if(!utils.required(this.nickName)) {
        utils.showDialog("昵称不能为空")
        return ;
      }else{
        var reg = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/;
        if(!reg.test(this.nickName)){
          utils.showDialog('请输入11位字符：支持中文、英文、数字')
        }else{
          // utils.showDialog(this.nickName)
          editNickName({
            str: this.nickName
          }).then(res =>{
            if(res.data.code == 200) {
              wx.navigateTo({
                url: "/pages/user/main" 
              });
            }
          })
        }
      }
    },
  },
  watch: {},

};
</script>

<style scoped lang="scss">
@import "../../../../static/assets/scss/userCenter/editPersonalInfo/index.scss";
.clearabled{
  
  
}
</style>
