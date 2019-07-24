<script>
import Fields from '@/metadata/Fields'
import Formatters from '@/agilite-components-vue/src/utils/Formatters'
export default {
  name: 'AbstractCrud',
  created: async function () {
    await this.start()
  },
  data: function () {
    return {
      result: {},
      isEditing: false,
      record: {},
      searchObject: null
    }
  },
  computed: {
    endpoint: function () {
      return '/api/crud/list'
    },
    name: function () {
      return ''
    }
  },
  methods: {
    start: async function () {
      let fieldsConfVisible = this.$local.getObject('crud_config_visible_' + this.name)
      if(fieldsConfVisible){
        this.fieldsToList.forEach(field => {
          let f = fieldsConfVisible.find(el => el.key == field.key)
          if(f) {
            field.visible = f.visible
          }
        });
      }
      await this.refresh()
    },

    //-------- List methods ---------
    refresh: async function (searchObject) {
      this.searchObject = searchObject
      let requestResult = await this.$request.post(`${this.endpoint}/${this.entityName}`, this.createCrudListRequest(searchObject))
      this.result = requestResult.data
      window.scroll(0, 0)
    },

    createCrudListRequest: function (searchObject) {
      let crudRequest = Object.assign({}, searchObject)
      crudRequest.fields = this.fieldsToList

      if(searchObject && searchObject.order) {
        crudRequest.orders = [
          {
            key: searchObject.order,
            desc: searchObject.sortDesc
          }
        ]
      }
      crudRequest.filters = this._createFilters()
      this.configureDefaultFilters(crudRequest.filters)
      return crudRequest;
    },

    _createFilters: function () {
      let filters = []
      if (this.fieldsToList) {
        this.fieldsToList.forEach(field => {
          if (field.filter) {
            let isBetween = field.type != "String"
            filters.push({
              oper: isBetween ? "between" : "like",
              key: field.key,
              type: field.type,
              values: [
                field.filter.inicial,
                field.filter.final
              ]
            })
          }
        });
      }
      
      return filters
    },

    configureDefaultFilters: function () {
    },

    createFieldToList: function (fieldName, obj) {
      let array = Fields[fieldName];
      let defaultValues = {
        key: array[Fields.NAME_INDEX],
        label: array[Fields.LABEL_INDEX],
        type: array[Fields.TYPE_INDEX],
        visible: true,
        hideable: true,
        sortable: true
      }

      if (defaultValues.type == 'Date') {
        defaultValues.formatter = Formatters.formatDate
      }

      if (defaultValues.type == 'Decimal') {
        defaultValues.formatter = (value) => Formatters.formatDecimal(value)
      }
      
      if (obj && obj.prefix) {
        defaultValues.key = obj.prefix + "." + defaultValues.key
      }
      return {...defaultValues, ...obj}
    },

    //-------- Edit methods ---------
    deleteRecord: async function (id) {
      this.$confirm('Confirma a exclusão do registro selecionado?', () => {
        this._delete(id)
      })
    },

    _delete: async function (id) {
      await this.$request.delete(`/api/crud/${this.entityName}/${id}`)

      this.refresh(this.searchObject)
      this.$snotify.success("Registro excluído com sucesso!");
    },

    closeEdit: function () {
      this.isEditing = false
    },

    create: function () {
      this.record = {sistema: 'aa'}
      this.isEditing = true
    },

    executeValidate: async function () {
      return await this._recursiveValidate(this.$children, true)
    },

    _recursiveValidate: async function (components, valid) {
      if(!components)return valid

      for (let i = 0; i < components.length; i++) {
        let comp = components[i]

        if (typeof comp.executeValidate === 'function') {
          valid = await comp.executeValidate() && valid
        }
        
        valid = await this._recursiveValidate(comp.$children, valid) && valid
      }
      return valid
    },

    parseToSave () {
    },

    save: async function () {
      let isValid = await this.executeValidate()
      if (!isValid) {
        this.$snotify.warning('Foram localizadas algumas falhas de validações nos valores informados.');
        return
      }

      this.parseToSave()
      await this.$request.post(`/api/crud/save/${this.entityName}`, this.record)
      
      this.refresh(this.searchObject)
      this.closeEdit()

      this.$snotify.success("Dados salvos com sucesso");
    },
    
    edit: async function (recordId) {
      let result =  await this.$request.post(`/api/crud/edit/${this.entityName}/${recordId}`)
      this.record = result.data
      this.isEditing = true
    }
  }
}
</script>

