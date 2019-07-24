<template>
  <div>
    <form-group 
      :label="label" 
      :compId="generatedId" 
      :validationError="errors.first(label)"
      :required="isRequired"
      :showWrapper="showWrapper">

      <input 
        type="text"
        v-validate="validate" 
        :data-vv-name="label" 
        :id="generatedId"
        :class="_class"
        v-bind="$attrs"
        :value="formatedValue"
        v-on="inputListeners">

    </form-group>
  </div>
</template>
<script>

import FormGroup from './FormGroup.vue'
import AbstractInput from './AbstractInput'
import Formatters from '../../utils/Formatters'
export default {
  name: 'InputDecimal',
  inject: ['$validator'], 
  mixins: [AbstractInput],
  props: {
    maxValue: {
      type: Number,
      default: 999999999
    },
    decimalDigits: {
      type: Number,
      default: 2
    },
    maxDecimalDigits: {
      type: Number,
      default: 2
    }
  },
  components: {
    FormGroup
  },
  data() {
    return {
      formatedValue: this._processReceiveValue(this.value)
    }
  },
  watch: {
    value: function (newValue) {
      if (this._flatValue(this.formatedValue) != this._flatValue(newValue)) {
        this.formatedValue = this._processReceiveValue(newValue)
        this.emitInput(this.formatedValue)
      }
    }
  },
  computed: {
    _class: function () {
      return 'form-control text-right'
    }
  },
  methods: {
    inputTransform: function (value) {
      if (!value )return value
      value = value.replace(/[^0-9,]+/g, '')
      if (value.indexOf(',') == 0)return '0' + value
      return value
    },

    acceptInput: function (value) {
      if (!value) return true
      value = this._toNumber(value)
      if (isNaN(value)) return false;
      if (Number(value) > this.maxValue) return false;

      if (value.indexOf('.') > 0){
        let decimalPart = value.substring(value.indexOf('.')+1)
        if (decimalPart.length > this.maxDecimalDigits)return false
      }
      return true;
    },

    emitInput: function (value) {
      this.formatedValue = this._toString(value)
      this.$emit('input', value ? Number(this._toNumber(this.formatedValue)) : null)
    },

    change: function (value) {
      if (!value && value !== 0) return null
      this.formatedValue = Formatters.formatDecimal(this._toNumber(value), this.decimalDigits, this.maxDecimalDigits)
    },

    _flatValue: function (value) {
      if (!value && value !== 0) return ''
      return (value+'').replace(/[^0-9]/g, '')
    },
    
    _toNumber: function (value) {
      if (!value && value !== 0) return null
      return (value+'').replace(/\./g, '').replace(',', '.')
    },

    _toString: function (value) {
      if (!value && value !== 0) return null
      let valueEndWithDecimalPoint = (value + '').endsWith(',')
      value = this._toNumber(value)
      if (isNaN(value)) return null;
      if (Number(value) > this.maxValue) value = this.maxValue
      return Formatters.formatDecimal(value, 0, this.maxDecimalDigits) + (valueEndWithDecimalPoint ? ',' : '')
    },

    _processReceiveValue: function (value) {
      if (!value && value !== 0) return null
      if (isNaN(value)) {
        this.$emit('input', null)
        return null
      }
      if (Number(value) > this.maxValue) {
        value = this.maxValue
        this.$emit('input', value)
      } 
      return Formatters.formatDecimal(value, 2, this.maxDecimalDigits)
    },

    _convertSeparators(value){
      return (value+'').replace(/\./g, '').replace(',', '.')
    }
  }
}
</script>

