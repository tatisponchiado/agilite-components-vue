<template>
  <div class="modal-panel-wrapper">
    <div class="container">
      <div class="portlet" @keydown.esc="$emit('close')">
        <div class="modal-panel-header d-flex justify-content-between  align-items-center">
          <div class="d-flex  align-items-center">
            <div class="salvar"><slot name="header-options"></slot></div>
            <div class="header-text ml-1">{{ header }}</div>
          </div>
          <div class="voltar">
            <i class="fa fa-times" @click="$emit('close')"></i>
          </div>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ModalPaneç',
  props: ['header']

}
</script>

<style lang="scss" scoped>
.modal-panel-wrapper {
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
}
.modal-body {
  max-height: calc(100vh - 150px);
  overflow: auto;
}
.modal-panel-header{
  border-bottom: 1px #ccc solid;
  margin: -20px -20px 20px -20px;
  padding: 10px 10px 10px 20px;

}
.header-text{
  font-size: 1.2rem;
}


.voltar i {
  margin-right: 5px;
  font-size: 1.8rem;
}
</style>
