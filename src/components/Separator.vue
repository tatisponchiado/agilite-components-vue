<template>
  <div class="multi-separator">
    <h5>{{ text }}</h5>
    <div></div>
  </div>
</template>
<script>
export default {
  name: 'Separator',
  props: ['text']
}
</script>

<style lang="scss" scoped>

.multi-separator {
  margin-top: 20px;

  h5 {
    color: #5c5edc;
  }
  
  div{
    margin: 0px 0px 20px;
    border-top: solid 1px rgba($color: #5c5edc, $alpha: 0.3);
  }
}
</style>
