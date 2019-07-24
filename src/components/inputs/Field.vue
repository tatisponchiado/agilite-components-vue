<template>
  <div :class="colClass">
    <template v-if='_type == "String"'>
      <input-string :label="_label" :maxlength="_maxlength" :validate="_validate" v-model="model[_name]" v-mask="_mask" v-bind="$attrs"/>
    </template>

    <template v-if='_type == "Text"'>
      <input-string type="area" :label="_label" :maxlength="_maxlength" :validate="_validate" v-model="model[_name]" v-mask="_mask" v-bind="$attrs"/>
    </template>

    <template v-if='_type == "Integer"'>
      <input-integer :label="_label" :maxValue="_maxValue" :validate="_validate" v-model="model[_name]" v-bind="$attrs"/>
    </template>

    <template v-if='_type == "Boolean"'>
      <checkbox :label="_label" :validate="_validate" v-model="model[_name]" v-bind="$attrs"/>
    </template>

    <template v-if='_type == "Combobox"'>
      <combobox :label="_label" :validate="_validate" v-model="model[_name]" :options="_itens" v-bind="$attrs"/>
    </template>

    <template v-if='_type == "Date"'>
      <input-date :label="_label" :validate="_validate" v-model="model[_name]" v-bind="$attrs"/>
    </template>

    <template v-if='_type == "Decimal"'>
      <input-decimal :label="_label" :maxValue="_maxValue" :validate="_validate" v-model="model[_name]" v-bind="$attrs"/>
    </template>

    <template v-if="fkProperties">
      <multi-select :label="_label" :validate="_validate" v-model="model[_name]" :request="_request" :parser="_fkParseEntity"  v-bind="$attrs"/>
    </template>
  </div>
</template>

<script>
import Fields from '@/metadata/Fields'

export default {
  name: 'Field',
  props: {
    property: {
      type: String,
      required: true
    },
    type: {
      type: String
    },
    name: {
      type: String
    },
    maxlength: {
      type: Number
    },
    maxValue: {
      type: Number
    },
    validate: {
      type: String
    },
    label: {
      type: String
    },
    itens: {
      type: Array
    },
    propertyValue: {
      type: Array
    },
    fkProperties: {
      type: String,
      default: null
    },
    //Width of the column, use as in the bootstrap grid 0-12 
    w: {
      type: String
    },
    mask: {
    }
  },

  inject: ['model'],
  computed: {
    _type: function () {
      if (this.type) return this.type

      let prop = this._property
      if (prop[Fields.LIST_ITENS_INDEX]) {
        return 'Combobox'
      }
      else {
        return prop[Fields.TYPE_INDEX]
      }
    },
    _name: function () {
      return this.name || this._property[Fields.NAME_INDEX]
    },
    _label: function () {
      return this.label || this._property[Fields.LABEL_INDEX]
    },
    _maxlength: function () {
      if (this.mask) return null
      let maxLength = this.maxlength || this._property[Fields.SIZE_INDEX]
      if (maxLength === 0)return 'undefined'

      return maxLength
    },
    _maxValue: function () {
      let val = this.maxValue || this._property[Fields.MAX_VALUE_INDEX] || (Math.pow(10, this._maxlength)) - 1
      if (val === 0)return 'undefined'
      return val
    },
    _validate: function () {
      return this.validate || this._property[Fields.VALIDATES_INDEX]
    },
    _itens: function () {
      let arrayItens = this.itens || this._property[Fields.LIST_ITENS_INDEX]

      let result = []
      for (let i = 0; i < arrayItens.length; i++) {
        result.push({value: arrayItens[i][0], label: arrayItens[i][1]})
      }
      return result
    },
    _property: function () {
      return this.propertyValue || Fields[this.property]
    },
    _mask: function () {
      return this.mask
    },
    _fkFields: function () {
      if (!this.fkProperties) return null
      let properties = this.fkProperties.split(',')

      return properties
        .map(prop => Fields[prop])
        .map(prop => prop[Fields.NAME_INDEX])
        .join(',')
    },
    _fkEntityName: function () {
      return this._type
    },
    _request: function () {
      return {
        table: this._fkEntityName,
        columns: this._fkFields
      }
    },
    colClass: function () {
      if (this.w) {
        return `col-md-${this.w}`
      }
      return 'col-12'
    }
  },
  methods: {
    executeValidate: async function () {
      return await this.$validator.validate()
    },
    _fkParseEntity: function (value) {
      return {
        id: value
      }
    }
  }
}
</script>

