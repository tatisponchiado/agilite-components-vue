const loadingStore = {
  state: {
    loading: 0,

    confirmVisible: false,
    confirmText: '',
    confirmAction: null
  },
  mutations: {
    _setLoading (state) {
      state.loading++
    },
    _setUnloading (state) {
      state.loading--
    },
    _showConfirm(state, object) {
      state.confirmVisible = true
      state.confirmText = object.text
      state.confirmAction = object.action
    },
    _hideConfirm(state){
      state.confirmVisible = false
      state.confirmText = ''
      state.confirmAction = null
    }
  },
  getters: {
    isLoading: state => {
      return state.loading
    },
    isConfirmVisible: state => {
      return state.confirmVisible
    },
    confirmText: state => {
      return state.confirmText
    },
    confirmAction: state => {
      return state.confirmAction
    }
  },
  actions: {
    showLoading (ctx) {
      ctx.commit("_setLoading")
    },
    hideLoading (ctx) {
      ctx.commit("_setUnloading")
    },
    showConfirm(ctx, object) {
      ctx.commit("_showConfirm", {text: object.text, action: object.action})
    },
    hideConfirm(ctx) {
      ctx.commit("_hideConfirm")
    }
  }
}

export default loadingStore;