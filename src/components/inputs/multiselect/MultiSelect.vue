<template lang="pug">
  form-group(:label="label" 
    :compId="generatedId" 
    :validationError="error"
    :required="isRequired"
    :showWrapper="showWrapper")
    .div-autocomplete.input-group.div-compound-input(:class="{'inp-invalid': error}")
        .div-selected-itens.input-group-prepend(v-if="multiple" ref='divSelected') 
          selected-option(v-for='(item, idx) in selectedItems' :key="idx" :item='item' @remove='unSelectItem(idx)')
        input.form-control.text-search(
          :id="generatedId" 
          type="text" 
          ref="input" 
        v-bind="$attrs" 
          v-on="customListeners" 
          v-model="inputVal"
          :readonly='!isSelectEditable'
          :placeholder='computePlaceHolder'
          :class="{'text-min-editable': isSelectEditable, 'text-min-not-editable': !isSelectEditable}"
        )
        .autocomplete-commands.input-group-append
          span.input-group-text.loading-icon(v-if='isLoading')
            loading
          span.input-group-text.span-selected-itens.text-autocomplete-button.span-right(v-if='selectedItems.length > 1' @click="listarSelecionados")
            span.text-selected-count {{selectedItems.length}}
            i.fas.fa-tasks
          span.input-group-text.text-autocomplete-button.span-right(v-if='selectedItems.length > 0 && showClearButton' @click="clearSelectAndHide")
            i.fas.fa-times
          span.input-group-text.text-autocomplete-button.span-right.last(@click="onShowButtonClick")
            i.fas(:class="{'fa-angle-down':!isShowingDrop, 'fa-angle-up':isShowingDrop}")
    .autocomplete-wrapper.w-95
      .autocomplete-container.col-12(v-if='isShowingDrop')
        .autocomplete
          .itens-container(v-if='items && items.length > 0')
            multi-select-row(v-for="(reg, idx) in items" :key="idx" :item='reg' :focused='hoverIdx == idx' :showCheck='multiple' @click="toogleSelectItem(idx)")
          .itens-container(v-else)
            .text-center.mt-3.text-enter Nenhum item foi localizado
        div.row.text-center(v-if='isShowingSelecteds')
          .col.text-enter.small Exibindo registros selecionados
        div.row.text-center(v-if='multiple && items && items.length > 0 && !isShowingSelecteds')
          .col.text-enter.small Tecle Enter para selecionar
</template>

<script>

import FormGroup from '../FormGroup.vue'
import AbstractInput from '../AbstractInput'
import SelectedOption from './SelectedOption.vue'
import MultiSelectRow from './MultiSelectRow.vue'
import Loading from './Loading.vue'

var __req_id = 0
export default {
  name: 'MultiSelect',
  inject: ['$validator'], 
  mixins: [AbstractInput],
    components: {
    FormGroup,
    Loading,
    MultiSelectRow,
    SelectedOption
  },
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    delay: {
      type: Number,
      default: 300
    },
    url: {
      type: String,
      default: '/api/fk'
    },
    request: {
      type: Object,
      default: function () {
        return null            
      }
    },
    placeholder: {
      type: String
    },
    options: {
      type: Array,
      default: null
    },
    selectFirstOnLoad: {
      type: Boolean,
      default: false
    },
    showClearButton: {
      type: Boolean,
      default: true
    },
    parser: {
      type: Function,
      default: (value) => value
    },
    formatter: {
      type: Function,
      default: (label) => {
        if (!label)return undefined;
        return label.replace('$|$', '-')
      }
    }
  },
  data() {
    return {
      isShowingDrop: false,
      isLoading: false,
      isShowingSelecteds: false,
      hoverIdx: -1,
      inputVal: null,
      inputHasFocus: false,
      items: [],
      selectedItems: [],
      error: null
    }
  },
  created: function () {
    document.addEventListener('keydown', (event) => {
      if (event.keyCode == 27 || event.key == 'Escape') {
        this.hideDropdown()
      }
    })
  },
  mounted: function () {
    if (this.options) {
      this.startValues(this.options)
    }
    if(this.value != undefined){
      if (this.value.id != undefined) {
        this.findById(this.value.id)
      }
      else{
        this.showValue(this.value)
      }
    }
  },
  watch: {
    options: function (vals) {
      this.options = vals
      this.startValues(this.options)
    },
    value: function (val){
      if(this.error)this.error = null
      if(!this.request)this.showValue(val)
    }
  },
  computed: {
    customListeners () {
      let vm = this
      let outerBlur = this.$listeners.blur
      let outerFocus = this.$listeners.focus
      return Object.assign({},
        this.$listeners, 
        {
          blur: function () {
            vm.inputBlur()
            if(outerBlur)outerBlur()
          },
          focus: function () {
            vm.inputHasFocus = true
            if(outerFocus)outerFocus()
          },
          input: function () {
            vm.onInput()
          },
          keydown: function (event) {
            vm.onKeyDown(event)
          },
          click: function () {
            if (!vm.isSelectEditable)vm.onShowButtonClick()
          }
        } 
      )
    },
    isSelectEditable: function () {
      return this.request
    },
    isAutoSelectOnArrow: function () {
      return !this.multiple
    },
    computePlaceHolder: function () {
      if(!this.placeholder) return null
      if(this.multiple && this.selectedItems.length > 0) return null
      return this.placeholder
    }
  },
  methods: {
    executeValidate: function () {
      this.error = null
      if (this.isRequired) {
        if (this.value == null || this.value == undefined) {
          this.error = 'Este campo é requerido'
          return false
        }
      }
      return true
    },

    onInput: function () {
      this.findData(this.inputVal)
    },

    onKeyDown: function (event) {
      if (event.keyCode === 40) {
        //arrow down
        event.preventDefault()
        if (!this.isShowingDrop) {
          this.clearList()
          this.findData(this.inputVal, true, true)
        } else {
          this.moveSelectedOnArrow('n')
        }
      } else if (event.keyCode === 38) {
        //arrow up
        event.preventDefault()
        this.moveSelectedOnArrow('p')
      } else if(event.keyCode == 9){
        //esc
        this.hideDropdown()
      } else if(event.keyCode == 13){
        //enter
        this.toogleSelectItem(this.hoverIdx)
      }
    },

    onShowButtonClick: function () {
      this.$refs.input.focus()
      if (this.isShowingDrop) {
        this.hideDropdown()
      } else{
        this.findData(this.inputVal, true)
      }
    },

    listarSelecionados: function () {
      this.items = this.selectedItems.slice()
      this.isShowingSelecteds = true
      this.$refs.input.focus()
      this.showDropdown()
    },

    clearList: function () {
      this.items = []
    },

    showDropdown: function () {
      this.hoverIdx = -1
      this.isShowingDrop = true
    },

    hideDropdown: function () {
      this.isShowingDrop = false
      this.isShowingSelecteds = false
    },

    unSelectItem: function (idx) {
      this.selectedItems.splice(idx, 1)
      this.processSelect()
    },

    toogleSelectItem: function (idx) {
      if (!this.items[idx]) return

      if (this.multiple) {
        let itemSelectedIdx = this.indexOfSelected(this.convertValue(this.items[idx]))
        if (itemSelectedIdx >= 0){
          this.selectedItems.splice(itemSelectedIdx, 1)
          this.processSelect()
        } else {
          this.selectItemByIdx(idx)
        }
      } else {
        this.hideDropdown()
        this.selectItemByIdx(idx)
      }
    },

    isValueSelected: function(value) {
      return this.indexOfSelected(value) >= 0 
    },

    onChange(){
      let value = {}
      if (this.multiple) {
        value = this.selectedItems.map(i => i.value || i)
      }
      else{
        value = (this.selectedItems.length == 0 ? null : this.convertValue(this.selectedItems[0]))
      }
      value = this.parser(value)

      this.$emit('input', value)
      this.$emit('change')
    },

    clearSelectAndHide: function () {
      this.clearSelect()
      this.hideDropdown()
    },

    clearSelect: function () {
      this.selectedItems = []
      this.processSelect()
    },

    inputBlur: function () {
      this.inputHasFocus = false
      if (!this.inputVal && !this.multiple) {
        this.clearSelect()  
      } else {
        this.computeText()
      }
    },

    indexOfSelected: function (value) {
      return this.selectedItems.findIndex(registro => this.convertValue(registro) == value)
    },

    indexOfItem: function (value) {
      return this.items.findIndex(registro => this.convertValue(registro) == value)
    },

    convertValue: function (registro) {
      if(!registro)return registro
      return registro.hasOwnProperty('value') ? registro.value : registro
    },

    computeText: function () {
      this.inputVal = ''
      if(!this.multiple && this.selectedItems.length === 1) {
        let it = this.selectedItems[0]
        this.inputVal = it.option || it.label || it.value || it
      }
    },

    findData: function (query, ignoreDelay, selectFirst) {
      if (this.request) {
        __req_id++;
        let req_start = __req_id;
        setTimeout(() => {
          if (req_start === __req_id) {
            this.isLoading = true

            let findObject = {
              query: query,
              entityName: this.request.table,
              fields: this.request.columns
            }

            this.$request.post(`${this.url}/${findObject.entityName}`, findObject, {loading: false}).then(result => {
              if (req_start === __req_id) {
                this.showDropdown()
                this.setDataList(result.data)
                if (selectFirst && !this.multiple && result && result.length > 0) {
                  this.moveSelectedOnArrow('f')
                }
              }
            }).finally(() => {
              this.isLoading = false
            });
          }
        }, (ignoreDelay ? 0 : this.delay));
      } else {
        this.showDropdown()
        this.setDataList(this.options)
        if (selectFirst && !this.multiple &&  this.options && this.options.length > 0) {
          this.moveSelectedOnArrow('f')
        }
      }
    },

    findById: function (id) {
      let findObject = {
        entityName: this.request.table,
        fields: this.request.columns
      }
      this.$request.post(`${this.url}/${findObject.entityName}/${id}`, findObject, {loading: false}).then(result => {
        this.processStartValue(this.formatLabel(result.data))
      });
    },

    setDataList: function (dados) {
      this.items = dados.map(row => this.formatLabel(row))
    },

    formatLabel: function (row) {
      row.label = this.formatter(row.label)
      return  row
    },

    moveSelectedOnArrow: function (direction) {
      if(!this.items)return
      if (direction === 'f') {
        this.hoverIdx = 0
      } else if (direction === 'n') {
        this.hoverIdx++
        if (this.hoverIdx > this.items.length-1) {
          this.hoverIdx = 0
        }
      } else if (direction === 'p') {
        if (this.hoverIdx >= 0){
          this.hoverIdx--
          if (this.hoverIdx < 0)this.hoverIdx = this.items.length-1
        }
      }

      if(this.isAutoSelectOnArrow){
        this.selectItemByIdx(this.hoverIdx)
      }
    },

    selectItemByIdx: function (idx) {
      if (this.items.length <= idx) return
      if (this.items[idx]){
        if (this.multiple) {
          this.selectedItems.push(this.items[idx])
        } else {
          this.selectedItems = [this.items[idx]]
        }
      }
      this.processSelect()
    },

    processStartValue (value) {
      this.selectedItems = [value]
      this.computeText()
    },

    processSelect () {
      this.computeText()
      this.onChange()
    },

    startValues: function (vals) {
      this.items = vals ? vals : []

      if(this.selectFirstOnLoad){
        this.selectItemByIdx(0)
      }
    },

    showValue (value) {
      if (value != undefined) {
        this.unSelectItem()
        if (!this.request) {
          if (Array.isArray(value)){
            this.value.forEach(val => this.selectItemByIdx(this.indexOfItem(val)))
          } else {
            this.selectItemByIdx(this.indexOfItem(value))
          }
        } else {
          // let valuesToFind = Array.isArray(value) ? value.slice() : [value]
          // // TODO buscar por ids para exibir os selecionados que vieram do servidor
          // console.log('buscar por ids ' + valuesToFind) 
        }
      }
    }
  }
}
</script>
<style scoped>
  .div-autocomplete{
    background: #fff;
    border: 1px solid #c2c2c2;
    flex-wrap: nowrap;
  }
  .div-selected-itens{
    flex-wrap: nowrap;
    overflow: hidden;
  }
  span.text-autocomplete-button{
    border: none;
  }
  .text-min-editable {
    min-width: 45px;
  }
  .text-min-not-editable {
    min-width: 5px;
  }
  .text-search{
    background: transparent;
  }
  .text-search:read-only{
    background: transparent;
  }

  .autocomplete-wrapper {
    position: absolute;
    z-index: 1000;
    display: block;
    list-style: none;
    float: left;
    margin-top: -1px;
    min-width: calc(100% - 30px);
  }
  .autocomplete-container {
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.25);
    cursor: initial;
    user-select: text;
    z-index: 10001;
    user-select: none;
    min-width: 200px;
  }
  .autocomplete {
    min-height: 100px;
    max-height: 400px;
    position: relative;
    overflow-y: auto;
  }
  .autocomplete::-webkit-scrollbar-track{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: #F5F5F5;
  }
  .autocomplete::-webkit-scrollbar{
    width: 6px;
    background-color: #F5F5F5;
  }
  .autocomplete::-webkit-scrollbar-thumb{
    background-color: #888888;
  }
  .text-date:disabled{
    background-color: #FFF;
  }
  .loading-icon{
    border: 0;
    margin-left: -5px;
    z-index: 9;
    background: #FFF;
    padding: 0px 3px;
  }
  .clear-icon{
    border-left: 0;
    border-right: 0;
    margin-left: -5px;
    z-index: 9;
    background: #FFF;
    padding: 0px 3px;
    cursor: pointer;
  }
  .autocomplete-fechar-button {
    background-color: transparent;
    border: 1px solid transparent;
    box-shadow: none;
  }
  button {
    border-radius: 2px;
    cursor: pointer;
    display: inline-block;
    font-size: 16px;
    padding: 0 16px;
    outline: none;
    user-select: none;
  }
  .text-enter {
    color: #bbb;
  }
  .text-search {
    background: transparent;
    border: none;
  }
  .text-search:read-only{
    cursor: pointer;
  }
  span.text-selected-count{
    color: #3aaab7;
    font-size: 0.8rem;
    font-weight: 900;
    position: relative;
    right: -18px;
    top: 5px;
  }
  .inp-invalid {
    background: #f89c9b;
  }

</style>
