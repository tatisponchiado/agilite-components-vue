<template>
  <div class="custom-control custom-checkbox">
    <input 
      :id="generatedId"
      type="checkbox" 
      class="custom-control-input"
      @change="_change($event.target.checked)"
      :checked="_isChecked"
      :data-vv-name="label || 'checkbox'"
      v-bind="$attrs"
     >
    <label 
      class="custom-control-label" 
      :for="generatedId">{{ label }}</label>
  </div>
</template>
<script>
import AbstractInput from './AbstractInput'
export default {
  name: 'Checkbox',
  inject: ['$validator'], 
  mixins: [AbstractInput],
  props: {
    selectedValue: {
      default: true
    }
  },
  computed: {
    _isChecked: function () {
      if(Array.isArray(this.value)){
        return this.value.indexOf(this.selectedValue) >= 0
      }
      return this.value
    },
  },
  methods: {
    _change: function (checked) {
      if(Array.isArray(this.value)){
        if(checked) {
          this.value.push(this.selectedValue)
        }
        else {
          this.value.splice(this.value.indexOf(this.selectedValue), 1)
        }
        this.$emit('input', this.value)
        this.$emit('change', this.value)
      }
      else{
        this.$emit('input', checked)
        this.$emit('change', checked)
      }
    }
  },
}
</script>

