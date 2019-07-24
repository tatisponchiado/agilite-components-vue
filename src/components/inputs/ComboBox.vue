<template>
  <form-group 
    :label="label" 
    :compId="generatedId" 
    :validationError="errors.first(label)"
    :required="isRequired"
    :showWrapper="showWrapper">
    
    <select class="custom-select" :id="generatedId" @change="$emit('input', $event.target.value)">
      <option v-if="!isRequired" :value="null">Selecionar...</option>
      <option v-for="(option, idx) in options" :key="idx" :value="_getValue(option)" :selected="_getValue(option) === value">
        {{ _getText(option) }}
      </option>
    </select>
      
  </form-group>
</template>
<script>
import FormGroup from './FormGroup.vue'
import AbstractInput from './AbstractInput'
export default {
  name: 'Combobox',
  inject: ['$validator'], 
  mixins: [AbstractInput],
  props: {
    options:{
      type: Array
    }
  },
  components: {
    FormGroup
  },
  data() {
    return {
    }
  },
  computed: {
    _class: function () {
      return 'form-control'
    }
  },
  methods: {
    _getText: function (option) {
      if (option.label != undefined) {
        return option.label
      }
      else {
        return option
      }
    },
    _getValue: function (option) {
      if (option.value != undefined) {
        return option.value
      } 
      else if (option.label) {
        return option.label
      } 
      else {
        return option
      }
    }
  },
}
</script>


