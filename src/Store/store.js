import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex);
//数据
const state = {
  tasteType: '', //秘钥类型
  token: '',
  cookieId: '',
  judgeChargeType: '',//判断充电类型
  family: { studentId: '', parentId: '', studentName: '' /*addisFull: ''*/ },
  
}

//获取数据（或者说是自定义过滤计算）
const getters = {
  getTasteType: state => state.tasteType,
  gettoKen: state => state.token,
  getcookieId: state => state.cookieId,
  getjudgeChargeType: state => state.judgeChargeType,
  getFamily: state => state.family
}

//提交方法
const mutations = {
  //清空方法
  clearStore(state) {
    if (state) {
      state.tasteType = ''
      state.token = ''
      state.cookieId = ''
      state.judgeChargeType = ''
    }
  },
  tasteType(state, value) {
    state.tasteType = value;
  },
  token(state, value) {
    state.token = value;
  },
  userId(state, value) {
    state.userId = value;
  },
  cookieId(state, value) {
    state.cookieId = value;
  },
  judgeChargeType(state, value) {
    state.judgeChargeType = value;
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
  setToKen(state, value) {
    state.commit('token', value)
  },
  setCookieId(state, value) {
    state.commit('cookieId', value)
  },
  setjudgeChargeType(state, value) {
    state.commit("judgeChargeType", value);
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
