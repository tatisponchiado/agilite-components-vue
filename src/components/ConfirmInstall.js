export default function (Vue) {
  Vue.prototype.$confirm = (text, action) => {
    Vue.prototype.$store.dispatch('showConfirm', {text: text, action: action})
  }
}