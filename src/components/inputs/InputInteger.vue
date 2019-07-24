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
export default {
  name: 'InputInteger',
  inject: ['$validator'], 
  mixins: [AbstractInput],
  props: {
    maxValue: {
      type: Number,
      default: 999999999
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
      if (this.formatedValue != newValue) {
        this.formatedValue = this.formatValue(newValue)
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
      if(!value )return value
      return value.replace(/[^0-9]+/g, '')
    },
    acceptInput: function (value) {
      return value <= this.maxValue
    },
    emitInput: function (value) {
      this.formatedValue = value
      this.$emit('input', (!value && value !== 0) ? null : Number(value))
    },
    formatValue: function (value) {
      if (!value && value !== 0) return value
      value = (value+'').replace(/[^0-9]+/g, '')
      if (value > this.maxValue) return this.maxValue
      return value
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
      return value
    },
  }
}
</script>

