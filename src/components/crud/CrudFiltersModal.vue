<template>
  <modal class="crud-filters-modal" ref="modal" cancel-title="Fechar" ok-title="Filtrar" title="Filtrar registros" @ok="filtrar">
    <div v-if="fields">
      <div class="row" v-for="(field, index) in fields" :key="index">
        <div class="col-md-3 d-flex align-items-center">{{ label(field) | capitalize }}</div>
        <div class="col-md-9">
          <div v-if="!isBetween(field)">
            <div class="row">
              <div class="col-12">
                <component :is="component(field)" v-bind="properties(field)" v-model="filterValues[index].inicial" v-if="filterValues[index]"></component>
              </div>
            </div>
          </div>
          <div v-if="isBetween(field)">
            <div class="row">
              <div class="col-6">
                <component :is="component(field)" v-bind="properties(field)" v-model="filterValues[index].inicial" @change="changeValueOne(index)" v-if="filterValues[index]"></component>
              </div>
              <div class="col-6">
                <component :is="component(field)" v-bind="properties(field)" v-model="filterValues[index].final" v-if="filterValues[index]"></component>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>
<script>
export default {
  name: "CrudFiltersModal",
  props: {
    fields: {
      type: Array
    }
  },
  data: function() {
    return {
      filterValues: []
    };
  },
  methods: {
    show: function () {
      for (let i = 0; i < this.fields.length; i++) {
        this.$set(this.filterValues, i, this.fields[i].filter || {})
      }
      this.$refs.modal.show()
    },
    filtrar: function () {
      for (let i = 0; i < this.fields.length; i++) {
        let filter = null
        if (this.filterValues[i].inicial || this.filterValues[i].final) {
          filter = {
            inicial: this.filterValues[i].inicial,
            final: this.filterValues[i].final
          }
        }
        this.fields[i].filter = filter
      }

      this.$emit('onFilter')
    },
    label: function (field) {
      return field.label || field.key
    },
    component: function (field) {
      
      switch (field.type) {
        case 'Integer':
          return 'inputInteger'
        case 'Decimal':
          return 'inputDecimal'
        case 'Date':
          return 'inputDate'
        default:
          return 'inputString';
      }
    },
    properties: function (field) {
      return {
        showWrapper: false,
        label: this.label(field)
      }
    },
    changeValueOne: function (index) {
      if (!this.filterValues[index].final && this.filterValues[index].inicial) {
        let value = {
          inicial: this.filterValues[index].inicial,
          final: this.filterValues[index].inicial
        }
        this.$set(this.filterValues, index, value)
      }
    },
    isBetween: function (field){
      return field.type != "String"
    }
  }
};
</script>
<style lang="scss" scoped>
  .crud-filters-modal {
    z-index: 9999;
    position: fixed;
    overflow: auto;
  }
</style>



