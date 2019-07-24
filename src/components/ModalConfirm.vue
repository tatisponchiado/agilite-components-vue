<template>
  <div v-if="visible">
    <div class="confirm-wrapper" >
      <div class="container d-flex centralize">
        <div class="portlet" v-click-out="hideConfirm" @keydown.esc="hideConfirm" >
          <div class="modal-panel-header d-flex justify-content-between">
            Confirma?
          </div>
          <h4> {{ body }}</h4>
          <div class="d-flex justify-content-end buttons">
            <button class="btn btn-success" @click="okAction">Sim</button>
            <button class="btn btn-warning" @click="hideConfirm" v-focus>Não</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ModalConfirm',
  data: function () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      visible: 'isConfirmVisible',
      confirmAction: 'confirmAction',
      body: 'confirmText'
    })
  },
 
  methods: {
    ...mapActions(['hideConfirm']),
    okAction: function () {
      let confirmAction = this.confirmAction
      this.hideConfirm()
      confirmAction()
    }
  }
}
</script>

<style lang="scss" scoped>
.confirm-wrapper {
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
.portlet {
  max-width: 600px;
}
.buttons button {
  margin-right: 10px;
  padding: 8px 40px;
}
</style>


