export default {
  props: {
    label: {
      type: String
    },
    validate: {
      type: String
    },
    id: {
      type: String
    },
    showWrapper: {
      type: Boolean,
      default: true
    },
    wrapperClass: {
      type: String,
      default: ''
    },
    value: null
  },
  computed: {
    generatedId: function () {
      return this.id ? this.id : 'id_' + this._uid
    },
    isRequired: function () {
      return (this.validate && this.validate.indexOf('required') >= 0) == true
    },
    inputListeners: function () {
      var vm = this
      return Object.assign({},
        this.$listeners,
        {
          input: function (event) {
            let val = vm.inputTransform(event.target.value)
            if (vm.acceptInput(val)) {
              vm.emitInput(val)
            }
          },
          change: function (event) {
            vm.change(event.target.value)
          }
        }
      )
    }
  },
  methods: {
    acceptInput: function () {
      return true;
    },
    inputTransform: function (value) {
      return value;
    },
    emitInput: function (value) {
      this.$emit('input', value)
    },
    change: function () {
      this.$emit('change')
    }
  }
}
