<template>
  <div class="form-group">
    <label :for="compId" v-if="showWrapper">{{ label }} <span class="text-danger" v-if="required">*</span> </label>
    <slot/>
    <span class="form-text">{{ validationError }}</span>
  </div>

</template>
<script>
export default {
  name: 'FormGroup',
  props: {
    label: {
      type: String,
      default: 'a'
    },
    validationError: {
      type: String
    },
    required: {
      type: Boolean,
      default: false
    },
    showWrapper: {
      type: Boolean,
      default: true
    },
    compId: null
  }
  
}
</script>

