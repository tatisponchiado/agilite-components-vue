<template>
  <form-group 
    :label="label" 
    :compId="generatedId" 
    :validationError="errors.first(label)"
    :required="isRequired"
    :showWrapper="showWrapper">

    <textarea
      v-if='type == "area"'
      class="form-control"
      v-validate="validate"
      :data-vv-name="label" 
      :id="generatedId"
      v-bind="$attrs"
      :value="formatedValue"
      v-on="inputListeners"
      />

    <input 
      v-else
      type="text"
      v-validate="validate" 
      :data-vv-name="label" 
      :id="generatedId"
      :class="_class"
      v-bind="$attrs"
      :value="formatedValue"
      v-on="inputListeners">
  </form-group>
</template>
<script>
import FormGroup from './FormGroup.vue'
import AbstractInput from './AbstractInput'
export default {
  name: 'InputString',
  inject: ['$validator'], 
  mixins: [AbstractInput],
  props: {
    type:{
      type: String,
      default: 'text',
      validator: value => {
        return ['text', 'area'].indexOf(value) >= 0
      }
    }
  },
  components: {
    FormGroup
  },
  data() {
    return {
      formatedValue: this.value
    }
  },
  watch: {
    value: function (newValue) {
      if (this.formatedValue != newValue) {
        this.formatedValue = newValue
      }
    }
  },
  methods: {
    emitInput: function (value) {
      this.formatedValue = value
      this.$emit('input', value)
    }
  },
  computed: {
    _class: function () {
      return 'form-control'
    }
  }
}
</script>

