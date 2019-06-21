<template>
  <div id="index" class="container">
    <div class="content">
      <div>{{form.content}}</div>
    </div>
    <div class="time">{{form.createTime}}</div>
  </div>
</template>
<script>
import utils from "@/utils/index";
import { getsuggestiondetail } from "@/api/api";
import { mapState, mapActions } from 'vuex'

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
    this.$root.$mp.query.id != undefined ? this.id = this.$root.$mp.query.id : ''
  },
  mounted() {
    var that = this
    getsuggestiondetail({
      id: this.id
    }).then(res=>{
      this.form = res.data.data
      this.form.createTime = this.ToTime(this.form.createTime)
    })
  },
  components: {

  },
  methods: {
    ToTime(timestamp) {
       //时间戳为10位需*1000，时间戳为13位的话不需乘1000
       timestamp = timestamp + ''
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
@import "../../../../static/assets/scss/userCenter/adviceDetails/index.scss";


</style>
