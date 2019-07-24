<template>
  <form-group 
    :label="label" 
    :compId="generatedId" 
    :validationError="errors.first(label)"
    :required="isRequired"
    :showWrapper="showWrapper">

    <div class="input-group input-group-custom m-input-date-wr mr-1">
      
      <input 
        class="m-input-date form-control"
        type="text"
        v-validate="validate"
        :data-vv-name="label"
        :id="generatedId"
        v-bind="$attrs"
        :value="formatedDate"
        v-mask="mask"
        v-on="inputListeners"
        >

      <div class="input-group-prepend">
        <div class="input-group-text click calendar-icon">
          <date-picker @input='datePickerInput' :initialDate="value"/>
        </div>
      </div>
    </div>
  </form-group>
</template>
<script>
import Formatters from '../../utils/Formatters'
import Parsers from '../../utils/Parsers'
import AbstractInput from './AbstractInput'
import FormGroup from './FormGroup.vue'
import DatePicker from '../DatePicker.vue'
export default {
  name: "InputDate",
  inject: ['$validator'], 
  mixins: [AbstractInput],
  components: {
    FormGroup,
    DatePicker
  },
  data() {
    return {
      formatedDate: this._processReceiveDate(this.value),
      error: null
    }
  },
  created: function () {
  },
  computed: {
    mask: function () {
      return '##/##/####'
    }
  },
  watch: {
    value: function (newValue) {
      this.formatedDate = this._processReceiveDate(newValue)
    }
  },
  methods: {
    datePickerInput: function (value) {
      this.change(value)
    },
    inputTransform: function (value) {
      this.formatedDate = value
    },
    emitInput: function () {
      //O InputDate não emite o evento input durante a digitação, emite apenas no Change
    },
    change: function (value) {
      if(!value){
        this.formated = ''
        this.$emit('input', null)
      }else{
        let parsedValue = Parsers.parseDatePtBr(value)
        this.formatedDate = Formatters.formatDate(parsedValue)
        this.$emit('input', Formatters.formatToIsoDate(parsedValue))
      }
    },
    _isValidToSendInput: function (value) {
      if (!value || value.length == this.mask.length) return true;
    },
    _processReceiveDate: function (value) {
      if (!value) return null
      let parsedDate = Date.parse(value)
      if (isNaN(parsedDate)) {
        this.$emit('input', null)
        return null;
      }
      return Formatters.formatDate(parsedDate)
    }
  }
};

</script>

<style lang="scss" scoped>
  .calendar-icon{
    background-color: transparent;
  }

  .input-date{
    min-width: 135px;
  }
</style>

