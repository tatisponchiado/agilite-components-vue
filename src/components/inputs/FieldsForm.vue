<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FieldsForm',
  props: {
    model: {
      type: Object,
    }
  },
  provide: function () {
    return {
      model: this.model
    }
  }
}
</script>

