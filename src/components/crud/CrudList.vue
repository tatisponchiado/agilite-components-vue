<template>
  <div class="task">
    <div class="task-header">
      <div>
        <h5>{{ title }}</h5>
      </div>
      <div>
        <slot name="task-header"></slot> 
      </div>
      <div>
        <button class="btn btn-success" v-if="newButtonTitle" @click="createItem">
          <i class="fas fa-plus"></i>
          {{ newButtonTitle }}
        </button>
      </div>
    </div> 
    <div class="crud-list-container">
      <div class="portlet">
        <div class="crud-list-tools">
          <slot name="crud-list-tools"></slot> 
          <div class="d-flex">
            <div class="d-flex mr-1">
              <button class="btn btn-secondary" @click="refresh">
                <i class="fas fa-sync"></i>
              </button>
            </div>
            <div class="div-busca">
              <input-search ref="inputSarch" placeholder="Busca rápida..." :autosearch="false" @onSearch="quickSearch"/>
            </div>
            <div class="d-flex ml-1">
              <button class="btn btn-secondary" @click="$refs.filters.show(fields)">
                <i class="fas fa-filter"></i>
              </button>
              <button class="btn btn-secondary btn-config" @click="$refs.config.show()">
                <i class="fas fa-cog"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="d-flex flex-wrap m-3 crud-list-filters-list centralize" v-if="isFiltered">
          <div class="text-center">
            <span class="badge badge-secondary">{{ result.count }} registro(s) encontrados</span>
          </div>
          <div class="ml-1 text-center">
            <a href="javascript:;" @click="clearFilters">Limpar filtros</a>
          </div>
        </div>

        <div class="crud-list-table mt-2">
          <b-table striped hover :responsive="false"
            :no-local-sorting="true" 
            :fields="visibleFields" 
            :items="result.items"
            stacked="md"
            class="btable"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            empty-text="Nenhum registro localizado"
            :show-empty="true"
            @row-clicked="editar">
            
            <template slot="acoes" slot-scope="row">
              <span @click.stop.prevent="$emit('deleteRecord', row.item.id)" class="ml-2"><i class="far fa-trash-alt"></i></span>
            </template>
          </b-table>
        </div>

        <div class="crud-list-footer">
          <div>
           <slot name="crud-list-footer"></slot> 
          </div>
          <div class="paginator">
            itens por página
            <select class="ml-1" v-model="resultPerPage" @change="resultPerPageChange">
              <option :value="15">15</option>
              <option :value="20">20</option>
              <option :value="30">30</option>
              <option :value="40">40</option>
              <option :value="50">50</option>
            </select>
            <span class="ml-2">{{ indexRegistroInicial }}-{{ indexRegistroFinal }} de {{ result.count }} itens</span>
            <a href="javascript:;" class="ml-3" @click="previousPage"><i class="fas fa-chevron-left"></i></a>
            <a href="javascript:;" class="ml-3" @click="nextPage"><i class="fas fa-chevron-right"></i></a>
          </div>
        </div>
      </div>
    </div>

    <crud-config-modal ref="config" :fields="fields"/>
    <crud-filters-modal ref="filters" :fields="fields" @onFilter="executeFilter"/>
  </div>
</template>
<script>
import {InputSearch} from '@/agilite-components-vue'
import CrudFiltersModal from './CrudFiltersModal.vue'
import CrudConfigModal from './CrudConfigModal.vue'
import bTable from 'bootstrap-vue/es/components/table/table'
export default {
  name: 'CrudList',
  components: {
    CrudFiltersModal,
    CrudConfigModal,
    InputSearch,
    bTable
  },
  props: {
    title: {
      type: String
    },
    newButtonTitle: {
      type: String
    },
    fields: {
      type: Array
    },
    result: {
      type: Object
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      resultPerPage: 30,
      page: 0,
      quickSearchTerm: null,
      sortBy: null,
      sortDesc: false,
      hasFilter: false
    }
  },
  watch: {
    order: function () {
      this.sortBy = this.result.order
    },
    sortBy: {
      immediate: false,
      handler: function () {
        this.refresh()
      }
    },
    sortDesc: function (){
      this.refresh()
    }
  },
  methods: {
    resultPerPageChange: function () {
      this.refresh();
    },
    quickSearch: function (search) {
      this.page = 0
      this.quickSearchTerm = search
      this.refresh()
    },
    previousPage: function () {
      if (this.page > 0) {
        this.page = this.page - 1;
      }
      this.refresh();
    },
    nextPage: function () {
      let lastIndex = (this.page * this.resultPerPage) + this.resultPerPage;
      if (lastIndex < this.result.count){
        this.page = this.page + 1;
      }
      this.refresh();
    },
    refresh: function () {
      this.$emit('refresh', {
        pageNumber: this.page,
        pageSize: this.resultPerPage,
        query: this.quickSearchTerm,
        order: this.sortBy,
        sortDesc: this.sortDesc,
      })
    },
    executeFilter: function () {
      this.page = 0
      this.hasFilter = true
      this.refresh()
    },
    clearFilters: function () {
      this.page = 0
      this.$refs.inputSarch.clear(true)
      this.quickSearchTerm = null
      this.fields.forEach(field => field.filter = null)
      this.hasFilter = false
      this.refresh()
    },
    editar: async function (item) {
      this.$emit('edit', item.id)
    },
    delete: function (id) {
      console.dir('excluir ' + id)
    },
    createItem: function () {
      this.$emit('createNewItem')
    }
  },
  computed: {
    visibleFields: function () {
      if(!this.fields)return null
      let result = []
      if(!this.readOnly) {
        result.push(
          {
            key: 'acoes',
            label: "",
            tdClass: "curd-list-acoes"
          }
        )
      }

      let colunas = result.concat(this.fields.filter(field => field.visible))
      return colunas;
    },
    indexRegistroInicial: function () {
      if (this.page == 0)return 1
      return  (this.page * this.resultPerPage) + 1;
    },
    indexRegistroFinal: function () {
      let lastIndex = (this.page * this.resultPerPage) + this.resultPerPage;

      if (lastIndex > this.result.count){
        return this.result.count;
      }
      else {
        return lastIndex;
      }
    },
    isFiltered: function () {
      return this.quickSearchTerm || this.hasFilter
    }
  }
}
</script>



