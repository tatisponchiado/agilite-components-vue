<template>
  <div class="custom-control custom-radio">
    <input 
      :id="generatedId"
      type="radio" 
      class="custom-control-input"
      @change="_change($event.target.checked)"
      :checked="_isChecked"
      v-validate="validate" 
      :data-vv-name="label"
     >
    <label 
      class="custom-control-label" 
      :for="generatedId">{{ label }}</label>
  </div>
</template>
<script>
import AbstractInput from './AbstractInput'
export default {
  name: 'RadioButton',
  inject: ['$validator'], 
  mixins: [AbstractInput],
  props: {
    selectedValue: {
      default: true
    }
  },
  computed: {
    _isChecked: function () {
      return this.value == this.selectedValue
    },
  },
  methods: {
    _change: function (checked) {
      if(checked){
        this.$emit('input', this.selectedValue)
      }
    }
  },
}
</script>

