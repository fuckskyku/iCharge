<template>
  <div id="index" class="parent">
    <div class="child">
      <div class="info"  @click="UserPhoto()">
        <div class="hd">头像</div>
        <div class="fd"><img class="headImg" :src="avatar" alt=""><img class="right" src="https://testapi.xmnewlife.com/car/images/cut/right.png" alt=""></div>
      </div>
      <div class="info" @click="skip('editPersonalInfo',userInfo.nickName)">
        <div class="hd">昵称</div>
        <div class="fd">{{userInfo.nickName}}<img class="right" src="https://testapi.xmnewlife.com/car/images/cut/right.png" alt=""></div>
      </div>
      <div class="info">
        <picker @change="bindPickerChange($event)" :value="userInfo.gender" :range="array">
          <div class="hd">性别</div>
          <div class="fd">{{userInfo.gender == 0 ? '男' : userInfo.gender==1 ? '女' : '保密' }}<img class="right" src="https://testapi.xmnewlife.com/car/images/cut/right.png" alt=""></div> 
        </picker>
      </div>
    </div>
    <button @click="loginOut()" class="btn cancel">{{this.token == '' ? "注册登录" : "退出登录" }}</button>
  </div>
</template>
<script>
import utils from "@/utils/index";
import { mapState, mapActions } from 'vuex'
import { getUcCenter, editGender, editAvatar, GetQiniuToken, uploadSingleFile } from '@/api/api'  

export default {
  data() {
    return {
      userInfo: {},
      avatar: "/static/img/touxiang@3x.png",
      array: ['男','女','保密'],
      PhotoUrl: ''
    };
  },
  computed: {
  
  },
  mounted() {
    this.userInfo = utils.wxGetStorage("userInfo")
    this.userInfo.avatarUrl == '' ? '' : this.avatar = 'http://upload.mseenet.com/' + this.userInfo.avatarUrl;
  },
  components: {

  },
  methods: {
    ...mapActions([
      'setToKen',
      'setClearStore'
    ]),
    UserPhoto() {
      var _this = this
      let token = ''
      // GetQiniuToken({

      // }).then(res=>{
      //   //console.log("qiniu",res.data)
      //   token = res.data.data.token
      // })
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function(res) {
          //console.log("chooseImage success",res)
          var tempFilePaths = res.tempFilePaths
          //console.log("tempFilePaths[0]", tempFilePaths)
          var tempFilesSize = res.tempFiles[0].size;  //获取图片的大小，单位B
          if(tempFilesSize <= 6000000){   //图片小于或者等于6M时 可以执行获取图片
            wx.uploadFile({
              // url: 'https://upload.qiniup.com',//https://testapi.xmnewlife.com http://182.148.12.140:8990
              url: 'https://testapi.xmnewlife.com/api/minioRest/uploadSingleFile',
              // url: 'http://182.148.14.116:8990/api/minioRest/uploadSingleFile',
              filePath: tempFilePaths[0],
              name: 'file',
              header: { Authorization: 'Bearer ' + _this.token },
              // formData: {
              //   'key': tempFilePaths.split('//')[1]
              // },
              success: function(res) {
                console.log("uploadFile success",res) 
                // if(res.data.error){
                //   wx.showToast({
                //     title: "上传失败！",
                //     icon: 'none',
                //     mask: true,
                //   })
                //   setTimeout(() =>{
                //     wx.hideToast()
                //   },1500)
                // }
                // wx.showToast({
                //   title: "上传成功！",
                //   icon: 'none',
                //   mask: true,
                // })
                // setTimeout(() =>{
                //   wx.hideToast()
                // },2000)
                var data = JSON.parse(res.data)
                _this.userInfo.avatarUrl = data.data.url 
                // _this.userInfo.avatarUrl = 'http://upload.mseenet.com' + data.data.url 
                // _this.userInfo.avatarUrl = utils.formatImgUrl(data.key)http://upload.mseenet.com
                _this.PhotoUrl = _this.userInfo.avatarUrl 
                utils.wxSetStorageSync('userInfo', _this.userInfo)
                _this.userInfo.avatarUrl == '' ? '' : _this.avatar = 'http://upload.mseenet.com/' + _this.userInfo.avatarUrl;
                console.log("this.PhotoUrl",_this.PhotoUrl)
                _this.upLoad(_this.PhotoUrl)
              },
              fail: function (res) {
                wx.showToast({
                  title: "上传失败！",
                  icon: 'none',
                  mask: true,
                })
                setTimeout(() =>{
                  wx.hideToast()
                },1500)
                console.log("上传失败！",res)
              }
            })
          }else{
            wx.showToast({
              title:'上传图片不能大于6M!', 
              icon:'none'  
            })
            setTimeout(() =>{
              wx.hideToast()
            },1500)
          }
        }
      })
    },
    upLoad(url) {
      console.log("上传路径",url)
      editAvatar({
        str: url
      }).then(res=>{
        console.log("上传结果",res.data)
      })
    },
    bindPickerChange(e) {
      // this.userInfo.gender = e.mp.detail.value
      editGender({
        number: parseInt(e.mp.detail.value)
      }).then(res=>{
        //console.log(res.data)
        if(res.data.code == 200){
          this.userInfo.gender = e.mp.detail.value
        }
      })
    },
    loginOut() {
      var that = this
      wx.showModal({
        title: '提示',
        content: '确定退出登录吗？',
        success(res) {
          if (res.confirm) {
            that.setToKen('')
            that.setClearStore('state')
            wx.reLaunch({
              url: "/pages/index/main"
            });
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      
    },
    skip(type,params) {
      wx.navigateTo({
        url: "/pages/userCenter/" + type + "/main?nickName=" + params
      });
    },
  
  },
  computed: {
    ...mapState(['token'])
  },
  watch: {},

};
</script>

<style scoped lang="scss">
@import "../../../../static/assets/scss/userCenter/personalInfo/index.scss";

</style>
