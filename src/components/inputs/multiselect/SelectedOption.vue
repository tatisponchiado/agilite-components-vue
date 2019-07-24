<template lang="pug">
  .multi-select
    div.selected.d-flex
      div
        .small.selected-label {{ texto }}
      div.remove(@click='$emit("remove", item)')
        .span
          i.fas.fa-times
</template>

<script>
  export default {
    name: 'SelectedOption',
    props: ['item'],
    computed: {
      texto: function () {
        return this.item.option || this.item.label || this.item.value || this.item
      }
    }
  }
</script>

<style scoped>
  .selected {
    overflow: hidden;
    white-space: nowrap;
    margin-top: 3px;
    margin-left: 1px;
    padding: 2px;
    border: 1px #BBB solid;
    border-radius: 2px;
  }
  .selected-label{
    padding-top: 3px;
    max-width: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .remove{
    cursor: pointer;
    margin-left: 2px;
  }
</style>
