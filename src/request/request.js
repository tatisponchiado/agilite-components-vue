import { base } from './base'

const Request = function (Vue) {
  return {
    get: async function (endpoint, params, opts) {
      let conf = this._createConfig('GET', endpoint, opts)
      if (params) {
        conf.params = params
      }
      return await this._go(conf)
    },
    post: async function (endpoint, body, opts) {
      let conf = this._createConfig('POST', endpoint, opts)
      if (body) {
        conf.data = body
      }
      return await this._go(conf)
    },
    put: async function (endpoint, body) {
      let conf = this._createConfig('PUT', endpoint, {})
      if (body) {
        conf.data = body
      }
      return await this._go(conf)
    },
    delete: async function (endpoint) {
      let conf = this._createConfig('DELETE', endpoint, {})
      return await this._go(conf)
    },
    _createConfig: function (met, url, opts) {
      return Object.assign({}, {
        method: met,
        url: url,
        loading: true
      }, opts);
    },
    _go: async function (config) {
      config.headers = { 'Authorization': this._getAutorization() }
      
      if(config.loading)Vue.prototype.$store.dispatch('showLoading')
      try{
        return await base.request(config)
      }finally{
        if(config.loading)Vue.prototype.$store.dispatch('hideLoading')
      }
    },
    _getAutorization: function () {
      return window.localStorage.getItem(process.env.VUE_APP_USER_HASH) || 'null'
    }
  }
}

export default function(Vue) {
  Vue.prototype.$request = Request(Vue)
}
