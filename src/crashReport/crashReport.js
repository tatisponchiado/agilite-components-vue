import bugsnag from '@bugsnag/js'
import bugsnagVue from '@bugsnag/plugin-vue'

const CrashReport = function (Vue, Bugsnag) {
  return {
    report: function (error) {
      Bugsnag.notify(error, {
        severity: 'warning',
        user: { id: '1', name: 'Agilite', email: 'teste@teste.com' },
        metaData: {
          protocolo: error.protocolo
        }
      })
    }
  }
}

export default function(Vue, config) {
  const bugsnagClient = bugsnag(config.key)
  bugsnagClient.use(bugsnagVue, Vue)

  Vue.prototype.$crash = CrashReport(Vue, bugsnagClient)
}
