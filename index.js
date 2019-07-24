import Storage from './src/storage/Storage'

import ClickOut from './src/directives/outsider'
import Mask from './src/directives/mask/mask'
import Focus from './src/directives/focus'

import Request from './src/request/Request'

import Formatters from './src/utils/Formatters'
import { isDesktop, isTablet } from './src/utils/BootstrapBreakpoint'

import Field from './src/components/inputs/Field.vue'
import FieldsForm from './src/components/inputs/FieldsForm.vue'
import InputDate from './src/components/inputs/InputDate.vue'
import InputString from './src/components/inputs/InputString.vue'
import InputInteger from './src/components/inputs/InputInteger.vue'
import InputDecimal from './src/components/inputs/InputDecimal.vue'
import InputFile from './src/components/inputs/InputFile.vue'
import InputSearch from './src/components/inputs/InputSearch.vue'
import CheckBox from './src/components/inputs/CheckBox.vue'
import ComboBox from './src/components/inputs/ComboBox.vue'
import MultiSelect from './src/components/inputs/multiselect/MultiSelect.vue'
import Modal from 'bootstrap-vue/es/components/modal/modal'

import ModalPanel from './src/components/ModalPanel.vue'
import ModalConfirm from './src/components/ModalConfirm.vue'
import ConfirmInstall from './src/components/ConfirmInstall'


import RadioButton from './src/components/inputs/RadioButton.vue'
import Loading from './src/components/Loading.vue'
import AgiliteComponentsStore from './src/store/AgiliteComponents'
import CrashReport from './src/crashReport/crashReport'

import Capitalize from './src/filters/capitalize'

import Dropdown from './src/components/Dropdown.vue'
import CrudList from './src/components/crud/CrudList.vue'
import CrudEdit from './src/components/crud/CrudEdit.vue'
import Separator from './src/components/Separator.vue'

import ViewProcess from './src/components/proc/ViewProcess.vue'

export function install (Vue, config) {
  Vue.directive('click-out', ClickOut)
  Vue.directive('mask', Mask)
  Vue.directive('focus', Focus)
  
  Vue.component('Field', Field)
  Vue.component('FieldsForm', FieldsForm)
  Vue.component('InputFile', InputFile)
  Vue.component('InputSearch', InputSearch)
  Vue.component('InputDate', InputDate)
  Vue.component('InputString', InputString)
  Vue.component('InputInteger', InputInteger)
  Vue.component('InputDecimal', InputDecimal)
  Vue.component('Checkbox', CheckBox)
  Vue.component('Combobox', ComboBox)
  Vue.component('MultiSelect', MultiSelect)
  Vue.component('RadioButton', RadioButton)
  Vue.component('Loading', Loading)
  Vue.component('Modal', Modal)
  Vue.component('ModalPanel', ModalPanel)
  Vue.component('ModalConfirm', ModalConfirm)
  Vue.component('Separator', Separator)

  Vue.component('CrudList', CrudList)
  Vue.component('CrudEdit', CrudEdit)

  Vue.component('ViewProcess', ViewProcess)
  
  Vue.filter('capitalize', Capitalize)

  config.store.registerModule('agilite-components', AgiliteComponentsStore);

  Vue.use(CrashReport, config.crashReportConfig)
  Vue.use(Request)
  Vue.use(Storage)
  Vue.use(ConfirmInstall)
}

export {
  Formatters,
  InputDate,
  InputString,
  InputInteger,
  InputDecimal,
  InputFile,
  InputSearch,
  CheckBox,
  ComboBox,
  MultiSelect,
  RadioButton,
  Dropdown,
  isDesktop, 
  isTablet
}

const plugin = {
  install
}

export default plugin

let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}



