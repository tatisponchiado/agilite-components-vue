<template>
  <modal class="crud-config-modal" ref="modal" title="Selecione os campos que deseja visualizar" cancel-title="Fechar" ok-title="Salvar" @ok="salvar"> 
    <template slot="default">
      <div v-if="fields">
        <checkbox v-model="selecionaTodos" data-vv-name="todos"/>

        <div v-for="(field, index) in fields" :key="index"> 
          <checkbox v-model="field.visible" :disabled="!field.hideable" :label="label(field) | capitalize"/>
        </div>
      </div>
    </template>
  </modal>
</template>

<script>
export default {
  name: '',
  props: {
    fields: {
      type: Array
    }
  },
  data: function (){
    return {
      selecionaTodos: true
    }
  },
  watch: {
    selecionaTodos: function () {
      this.fields.forEach(field => {
        if (field.hideable) {
          field.visible = this.selecionaTodos
        }
      });
    }
  },
  methods: {
    show: function () {
      this.$refs.modal.show()
    },
    salvar: function () {
      this.$local.setObject('crud_config_visible_'+this.$route.params.name, this.fields)
    },
    label: function (field) {
      return field.label || field.key
    }
  }
}
</script>
<style lang="scss" scoped>
  .crud-config-modal {
    z-index: 9999;
    position: fixed;
    overflow: auto;
  }
</style>


