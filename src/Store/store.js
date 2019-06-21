import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex);
//数据
const state = {
  tasteType: '', //秘钥类型
  APPid: 'wx875dcc460cfe82ae',     //
  AppSecret: '88d8aa84e75f5976daf009191eece704',     //
  code: '',  //登录凭证
  token: '',
  readNum: '0',
  userId: '',
  timer: '0',
  canIUse: true,
  firstInto: true,//首次登录提示
  isLong: false,//判断充电类型
  sessionId: '',
  openId: '',
  chargeing: '',
  family: { gunId: '', parentId: '', studentName: '' /*addisFull: ''*/ },
}

//获取数据（或者说是自定义过滤计算）
const getters = {
  getTasteType: state => state.tasteType,
  getAPPid: state => state.APPid,
  getAppSecret: state => state.AppSecret,
  getCode: state => state.code,
  gettoKen: state => state.token,
  getreadNum: state => state.readNum,
  getuserId: state => state.userId,
  gettimer: state => state.timer,
  getcanIUse: state => state.canIUse,
  getfirstInto: state => state.firstInto,
  getisLong: state => state.isLong,
  getsessionId: state => state.sessionId,
  getOpenId: state => state.openId,
  getChargeing: state => state.chargeing,
  getFamily: state => state.family
}

//提交方法
const mutations = {
  //清空方法
  clearStore(state) {
    if (state) {
      state.tasteType = ''
      state.code = ''
      state.token = ''
      state.readNum = ''
      state.userId = ''
      state.canIUse = ''
      state.firstInto = ''
      state.isLong = ''
      state.timer = ''
      state.openId = ''
      state.chargeing = ''
      state.sessionId = ''
    }
  },
  tasteType(state, value) {
    state.tasteType = value;
  },
  code(state, value) {
    state.code = value;
  },
  token(state, value) {
    state.token = value;
  },
  readNum(state, value) {
    state.readNum = value;
  },
  userId(state, value) {
    state.userId = value;
  },
  timer(state, value) {
    state.timer = value;
  },
  canIUse(state, value) {
    state.canIUse = value;
  },
  firstInto(state, value) {
    state.firstInto = value;
  },
  isLong(state, value) {
    state.isLong = value;
  },
  sessionId(state, value) {
    state.sessionId = value;
  },
  openId(state, value) {
    state.openId = value;
  },
  chargeing(state, value) {
    state.chargeing = value;
  },
  family(state, obj) {
    obj.forEach((item) => {
      Vue.set(state.family, item.key, item.value);
    })
  },

};

//提交拦截
const actions = {
  //清空方法
  setClearStore(state) {
    state.commit('clearStore');
  },
  setTasteType(state, value) {
    state.commit('tasteType', value);
  },
  setAPPid(state, value) {
    state.commit('APPid', value);
  },
  setAppSecret(state, value) {
    state.commit('AppSecret', value);
  },
  setToKen(state, value) {
    state.commit('token', value)
  },
  setReadNum(state, value) {
    state.commit('readNum', value)
  },
  setUserId(state, value) {
    state.commit('userId', value)
  },
  setTimer(state, value) {
    state.commit('timer', value)
  },
  setCanIUse(state, value) {
    state.commit('canIUse', value)
  },
  setFirstInto(state, value) {
    state.commit('firstInto', value)
  },
  setIsLong(state, value) {
    state.commit("isLong", value);
  },
  setSessionId(state, value) {
    state.commit("sessionId", value);
  },
  setOpenId(state, value) {
    state.commit("openId", value);
  },
  setChargeing(state, value) {
    state.commit("chargeing", value);
  },
  setFamily(state, obj) {
    state.commit("family", obj);
  },

}

export default new Vuex.Store({
  state,
  getters,
  actions,
  plugins: [createPersistedState({
    storage: {
      getItem: key => wx.getStorageSync(key),
      setItem: (key, value) => wx.setStorageSync(key, value),
      removeItem: key => { }
    }
  })],
  mutations,
  // plugins: [vuexLocal.plugin]
})

// export default Store
