<template lang="pug">
  .wrapper(:class="{'selected': focused}" v-on="$listeners")
    .row.autocomplete-item
        .col
          span(v-if="showCheck")
            i.far(:class="{'fa-check-square': isItemSelected, 'fa-square': !isItemSelected}")
          span.pl-1 {{ itemLabel }}
</template>

<script>
export default {
  name: 'MultiSelectRow',
  props: {
    item: {
      required: true
    },
    showCheck: {
      type: Boolean,
      default: false
    },
    focused: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    itemLabel: function () {
      return this.item.label || this.item.value || this.item
    },
    isItemSelected: function () {
      return this.$parent.isValueSelected(this.item.value || this.item)
    }
  }
}
</script>

<style scoped>
    .autocomplete-item{
      padding: 2px 2px;
      margin: 0px 2px;
      cursor: pointer;
      font-weight: normal;
      border-top: 1px solid #ccc;
    }
    .wrapper:hover {
        background-color: #CCC;
    }
    .wrapper.selected{
      background-color: #d8d9d8;
    }
</style>
