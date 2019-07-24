var MultiSession = {
}

MultiSession.impl = function (storageType) {
  return {
    set: function(key, value){
      storageType.setItem(key, value);
    },
    get: function(key){
      return storageType.getItem(key)
    },
    setObject: function(key, value){
      storageType.setItem(key, JSON.stringify(value))
    },
    getObject: function(key){
      return JSON.parse(storageType.getItem(key))
    },
    remove: function(key){
      let val = this.get(key)
      storageType.removeItem(key)
      return val
    },
    removeObject: function(key){
      let val = this.getObject(key)
      storageType.removeItem(key)
      return val
    },
    clear: function () {
      storageType.clear()
    }
  }
}

export default function(Vue) {
    Vue.prototype.$session = MultiSession.impl(window.sessionStorage)
    Vue.prototype.$local = MultiSession.impl(window.localStorage)
}
