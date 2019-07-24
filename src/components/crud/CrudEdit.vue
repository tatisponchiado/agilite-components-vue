<template>
  <div class="crud-edit">
    <modal-panel :header="title" @close="$emit('cancel')">
      <div slot="header-options">
        <button class="btn btn-success btn-action" @click="$emit('save')">
          <i class="far fa-save"></i>Salvar
        </button>
      </div>
      
      <slot></slot>
    </modal-panel>
  </div>
</template>
<script>
export default {
  name: "CrudEdit",
  props: {
    title: {
      type: String
    }
  },
};
</script>
<style lang="scss" scoped>
  .btn-action {
    i {
      margin-right: 5px;
    }
  }
  
</style>



